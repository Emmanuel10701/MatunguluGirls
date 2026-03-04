export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { prisma } from "../../../libs/prisma";

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const format = url.searchParams.get('format') || 'json'; // json | array | csv | phones | phones-array
    const form = url.searchParams.get('form');
    const stream = url.searchParams.get('stream');
    const dataType = url.searchParams.get('dataType') || 'emails'; // emails | phones | both

    // Build where clause
    const where = {};

    // Handle different data types with appropriate filters
    if (dataType === 'emails' || dataType === 'both') {
      where.email = {
        not: null,
        not: ''
      };
    }

    if (dataType === 'phones' || dataType === 'both') {
      where.parentPhone = {
        not: null,
        not: ''
      };
    }

    if (form && form !== 'all') where.form = form;
    if (stream && stream !== 'all') where.stream = stream;

    const students = await prisma.databaseStudent.findMany({
      where,
      select: {
        admissionNumber: true,
        firstName: true,
        lastName: true,
        form: true,
        stream: true,
        email: true,
        parentPhone: true // ADDED parent phone
      },
      orderBy: [
        { form: 'asc' },
        { lastName: 'asc' },
        { firstName: 'asc' }
      ]
    });

    // ========== PARENT PHONES ARRAY FORMAT ==========
    if (format === 'phones-array' || (format === 'array' && dataType === 'phones')) {
      const phones = students
        .map(s => s.parentPhone)
        .filter(Boolean)
        .map(phone => {
          // Basic phone normalization (remove spaces, ensure format)
          let cleaned = phone.replace(/\s+/g, '').replace(/-/g, '');
          
          // Ensure it starts with 254 or 0
          if (cleaned.startsWith('+254')) {
            cleaned = '0' + cleaned.slice(4);
          } else if (cleaned.startsWith('254')) {
            cleaned = '0' + cleaned.slice(3);
          } else if (!cleaned.startsWith('0') && cleaned.length === 9) {
            cleaned = '0' + cleaned;
          }
          
          return cleaned;
        })
        .filter(phone => phone.length >= 10); // Basic validation

      return NextResponse.json({
        success: true,
        count: phones.length,
        phones,
        filters: { form, stream, dataType }
      });
    }

    // ========== BOTH EMAILS AND PHONES ARRAY ==========
    if (format === 'both-array') {
      const emails = students
        .map(s => s.email)
        .filter(Boolean);

      const phones = students
        .map(s => s.parentPhone)
        .filter(Boolean)
        .map(phone => {
          let cleaned = phone.replace(/\s+/g, '').replace(/-/g, '');
          if (cleaned.startsWith('+254')) {
            cleaned = '0' + cleaned.slice(4);
          } else if (cleaned.startsWith('254')) {
            cleaned = '0' + cleaned.slice(3);
          } else if (!cleaned.startsWith('0') && cleaned.length === 9) {
            cleaned = '0' + cleaned;
          }
          return cleaned;
        })
        .filter(phone => phone.length >= 10);

      return NextResponse.json({
        success: true,
        count: {
          emails: emails.length,
          phones: phones.length,
          total: students.length
        },
        emails,
        phones,
        filters: { form, stream, dataType: 'both' }
      });
    }

    // ========== ARRAY FORMAT (emails only - backward compatible) ==========
    if (format === 'array') {
      const emails = students
        .map(s => s.email)
        .filter(Boolean);

      return NextResponse.json({
        success: true,
        count: emails.length,
        emails
      });
    }

    // ========== CSV FORMAT ==========
    if (format === 'csv') {
      // Determine which columns to include based on dataType
      let headers = ['Admission Number', 'First Name', 'Last Name', 'Form', 'Stream'];
      if (dataType === 'emails' || dataType === 'both') headers.push('Email');
      if (dataType === 'phones' || dataType === 'both') headers.push('Parent Phone');
      
      let csvContent = headers.join(',') + '\n';

      students.forEach(s => {
        const row = [
          s.admissionNumber ?? '',
          `"${s.firstName ?? ''}"`,
          `"${s.lastName ?? ''}"`,
          s.form ?? '',
          s.stream ?? ''
        ];
        
        if (dataType === 'emails' || dataType === 'both') {
          row.push(`"${s.email || ''}"`);
        }
        if (dataType === 'phones' || dataType === 'both') {
          // Format phone for CSV
          let phone = s.parentPhone || '';
          row.push(`"${phone}"`);
        }
        
        csvContent += row.join(',') + '\n';
      });

      const filename = dataType === 'both' 
        ? `student-contacts-${new Date().toISOString().split('T')[0]}.csv`
        : dataType === 'phones'
        ? `student-phones-${new Date().toISOString().split('T')[0]}.csv`
        : `student-emails-${new Date().toISOString().split('T')[0]}.csv`;

      return new NextResponse(csvContent, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="${filename}"`
        }
      });
    }

    // ========== DEFAULT JSON (with all data) ==========
    return NextResponse.json({
      success: true,
      count: students.length,
      data: students.map(s => ({
        ...s,
        // Add normalized versions if needed
        normalizedPhone: s.parentPhone ? (() => {
          let cleaned = s.parentPhone.replace(/\s+/g, '').replace(/-/g, '');
          if (cleaned.startsWith('+254')) return '0' + cleaned.slice(4);
          if (cleaned.startsWith('254')) return '0' + cleaned.slice(3);
          if (!cleaned.startsWith('0') && cleaned.length === 9) return '0' + cleaned;
          return cleaned;
        })() : null
      })),
      stats: {
        total: students.length,
        withEmail: students.filter(s => s.email).length,
        withPhone: students.filter(s => s.parentPhone).length,
        withBoth: students.filter(s => s.email && s.parentPhone).length
      },
      filters: { form, stream, dataType },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error fetching student data:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to fetch student data',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}
// app/staff/[id]/page.jsx
import StaffProfilePage from '../../../../components/staffseo.jsx';

// Import static data or use empty array as fallback
let STAFF_DATA = [];

// Try to import local data if it exists
try {
  // Option 1: Import from a local JSON file in your project
  // STAFF_DATA = require('@/data/staff.json');
  
  // Option 2: Use hardcoded data as fallback
  STAFF_DATA = [
    // Add some sample staff data here if needed
    // { id: '1', name: 'John Doe', position: 'Teacher', department: 'Mathematics', bio: '...', image: '/male.png' }
  ];
} catch (error) {
  console.log('No local staff data found, using empty array');
  STAFF_DATA = [];
}

export async function generateMetadata({ params }) {
  const { id } = params;
  
  // Find staff from local data - this works at build time
  const staff = STAFF_DATA.find(s => s.id === id);
  
  if (!staff) {
    // Return generic metadata that works for all staff pages
    return {
      title: "Staff Profile | Matungulu Girls High School",
      description: "Meet our dedicated educators and staff members at Matungulu Girls High School. Professional educators committed to excellence.",
      openGraph: {
        title: "Staff Profile | Matungulu Girls High School",
        description: "Professional educators dedicated to student success at Matungulu Girls High School",
        images: [
          {
            url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://matungulu-girls.vercel.app'}/MatG.jpg`,
            width: 1200,
            height: 630,
            alt: 'Matungulu Girls High School Staff - Strive to Excel'
          }
        ],
        siteName: 'Matungulu Girls High School',
      },
      twitter: {
        card: 'summary_large_image',
        title: "Staff Profile | Matungulu Girls High School",
        description: "Professional educators dedicated to student success",
        images: [`${process.env.NEXT_PUBLIC_SITE_URL || 'https://matungulu-girls.vercel.app'}/MatG.jpg`],
      },
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://matungulu-girls.vercel.app'}/staff/${id}`,
      }
    };
  }

  const title = `${staff.name} - ${staff.position} | Matungulu Girls High School`;
  const description = staff.bio 
    ? staff.bio.substring(0, 160) 
    : `Meet ${staff.name}, a dedicated ${staff.position} at Matungulu Girls High School specializing in ${staff.department}.`;
  
  // Fix the image URL
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://matungulu-girls.vercel.app';
  const imageUrl = staff.image 
    ? staff.image.startsWith('http') 
      ? staff.image 
      : staff.image.startsWith('/')
        ? `${baseUrl}${staff.image}`
        : `${baseUrl}/images/staff/${staff.image}`
    : `${baseUrl}/MatG.jpg`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `Professional portrait of ${staff.name}, ${staff.position} at Matungulu Girls High School`
        }
      ],
      type: 'profile',
      siteName: 'Matungulu Girls High School',
      profile: {
        firstName: staff.name?.split(' ')[0] || '',
        lastName: staff.name?.split(' ').slice(1).join(' ') || '',
        username: staff.email || undefined,
      }
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
      site: '@MatunguluGirlsHS',
    },
    robots: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
    alternates: {
      canonical: `${baseUrl}/staff/${id}`,
    },
    keywords: `${staff.name}, ${staff.position}, ${staff.department}, Matungulu Girls High School, teaching staff, Kenyan education, ${staff.expertise?.join(', ') || ''}`,
  };
}

// FIXED: Remove the fetch from generateStaticParams to avoid build errors
export async function generateStaticParams() {
  // If you have local data, use it
  if (STAFF_DATA.length > 0) {
    return STAFF_DATA.map((staff) => ({
      id: staff.id.toString(),
    }));
  }
  
  // Otherwise return empty array (dynamic rendering)
  // Or comment this out completely if you don't have static data
  return [];
  
  // ALTERNATIVE: If you want to fetch from API but avoid build errors:
  // try {
  //   const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://matungulu-girls.vercel.app';
  //   const res = await fetch(`${baseUrl}/api/staff`, { next: { revalidate: 3600 } });
  //   
  //   if (res.ok) {
  //     const data = await res.json();
  //     return data.staff?.map((staff) => ({ id: staff.id.toString() })) || [];
  //   }
  // } catch (error) {
  //   console.log('Failed to fetch staff for static generation:', error);
  //   return [];
  // }
}

// IMPORTANT: For dynamic data fetching on the client
export const dynamic = 'force-dynamic'; // Force dynamic rendering
// OR use revalidation if you want ISR:
// export const revalidate = 3600; // Revalidate every hour

// JSON-LD Structured Data for better SEO
export function generateJsonLd(staff) {
  if (!staff) return null;
  
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://matungulu-girls.vercel.app';
  
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": staff.name,
    "jobTitle": staff.position,
    "worksFor": {
      "@type": "EducationalOrganization",
      "name": "Matungulu Girls High School",
      "url": baseUrl,
      "description": "A leading girls' high school in Kenya committed to academic excellence and holistic development.",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Matungulu",
        "addressRegion": "Machakos County",
        "addressCountry": "KE"
      }
    },
    "description": staff.bio || `Dedicated educator at Matungulu Girls High School specializing in ${staff.department}.`,
    "image": staff.image || `${baseUrl}/MatG.jpg`,
    "url": `${baseUrl}/staff/${staff.id}`,
    "email": staff.email,
    "telephone": staff.phone,
    "knowsAbout": staff.expertise || [],
    "alumniOf": staff.qualifications || [],
    "memberOf": {
      "@type": "OrganizationRole",
      "member": {
        "@type": "Organization",
        "name": staff.department || "Academic Department"
      }
    }
  };
}

export default function Page({ params }) {
  // Pass staff data to client component if available from static data
  const staff = STAFF_DATA.find(s => s.id === params.id);
  
  return (
    <>
      {/* Add JSON-LD structured data for this staff member */}
      {staff && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateJsonLd(staff))
          }}
        />
      )}
      <StaffProfilePage id={params.id} />
    </>
  );
}
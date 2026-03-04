'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { 
  FiHome, FiFileText, FiDollarSign, FiBook, FiRefreshCw, 
  FiUsers, FiActivity, FiHelpCircle, FiX, FiTrash2, FiMessageCircle,
  FiMapPin, FiPhone, FiMail, FiCalendar, FiAward, FiStar,
  FiGrid, FiBriefcase, FiUser, FiInfo, FiImage, FiLogIn, FiDownload
} from 'react-icons/fi';
import { MdMessage, MdSchool } from 'react-icons/md';

const iconMap = {
  'home': FiHome, 'file': FiFileText, 'dollar': FiDollarSign, 'book': FiBook,
  'refresh': FiRefreshCw, 'users': FiUsers, 'activity': FiActivity, 
  'help': FiHelpCircle, 'close': FiX, 'trash': FiTrash2, 'message': FiMessageCircle,
  'school': MdSchool, 'colored-message': MdMessage, 'map': FiMapPin,
  'phone': FiPhone, 'mail': FiMail, 'calendar': FiCalendar, 'award': FiAward,
  'star': FiStar, 'grid': FiGrid, 'briefcase': FiBriefcase, 'user': FiUser,
  'info': FiInfo, 'image': FiImage, 'login': FiLogIn, 'download': FiDownload
};

const SafeIcon = ({ name, ...props }) => {
  const IconComponent = iconMap[name] || FiHelpCircle;
  return <IconComponent {...props} />;
};

// Student Portal content for Facilities section
const studentPortalContent = `🎓 STUDENT PORTAL

Our comprehensive Student Portal provides a centralized platform for:

**Academic Management:**
• Track academic progress and grades
• Access assignment submissions and feedback
• View exam schedules and timetables
• Monitor attendance records

**Learning Resources:**
• Digital library access
• Download course materials
• Access past papers and revision resources
• E-learning platform integration

**Fees Management:**
• View real-time fee statements
• Make secure online payments
• Download payment receipts
• Track payment history

**Academic Announcements:**
• Real-time school notifications
• Assignment deadlines
• Exam date updates
• Event announcements

**Student Resources:**
• Career guidance materials
• Scholarship opportunities
• Club and activity information
• Counseling session bookings

**Guidance & Counselling:**
• Schedule counseling appointments
• Access mental health resources
• Career guidance sessions
• Personal development tools

**24/7 Access:** Available anytime, anywhere for all registered students`;

// Static categories as fallback
const staticCategories = {
  general: {
    name: "Overview",
    icon: 'school',
    content: `Matungulu Girls School

**A Public County School in Machakos**

Quick Facts:
• Established: 1956
• Location: Matungulu, Machakos County
• Students: 1000+
• Staff: 50+

School Type:
• Public County School
• Mixed Girls Boarding
• Competency-Based Curriculum (CBE)

Contact:
• Phone: +254 729 370 590
• Email: matungulugirls@gmial.com
• Address: P.O. Box 363 – 90131 Tala, Kenya

Hours:
• Mon-Fri: 7:30 AM - 5:00 PM
• Sat: 8:00 AM - 1:00 PM

Learn more by selecting other categories!`,
    links: [
      { label: 'About', path: '/pages/AboutUs', icon: 'info' },
      { label: 'Overview', path: '/pages/overview', icon: 'grid' }
    ]
  },
  admissions: {
    name: "Admissions",
    icon: 'file',
    content: `📋 ADMISSIONS

Requirements:
• KCPE: 250+ Marks
• Age: 13-16 years
• Good conduct
• Transfer students considered

Documents:
1. KCPE certificate
2. Birth certificate
3. School reports
4. Passport photos
5. Medical report

Steps:
1. Collect admission form
2. Submit required documents
3. Academic assessment
4. Parent/guardian interview
5. Admission confirmation

**Competency-Based Curriculum:**
• STEM Pathway
• Social Sciences Pathway
• Arts & Sports Science Pathway

**Technology Partnership:**
• CDF partnership
• Matungulu Girls  Church support
• Fully equipped computer lab
• Internet access for all students`,
    links: [
      { label: 'Admissions', path: '/pages/admissions', icon: 'file' },
      { label: 'Apply Now', path: '/pages/apply-for-admissions', icon: 'user' }
    ]
  },
  fees: {
    name: "Fees",
    icon: 'dollar',
    content: `💰 FEES STRUCTURE

**School Fees (Per Term):**
• Boarding School: KES 25,000 - 30,000
• Activities: KES 2,000 - 3,000

**Fee Distribution:**
• Tuition fees
• Activity fees
• Laboratory charges
• Library fees
• Sports facilities

**Payment Options:**
• Bank Transfer
• M-Pesa payments
• Cash payments at bursar's office
• Installment plans available

**Awards:**
• Academic excellence scholarships
• Sports scholarships
• Needy student support
• County government bursaries

**Affordable quality education with flexible payment options!**`,
    links: [
      { label: 'Student Portal', path: '/pages/StudentPortal', icon: 'book' },
            { label: 'Student Fees', path: '/pages/fees', icon: 'help' }

    ]
  },
  academics: {
    name: "Academics",
    icon: 'book',
    content: `📚 ACADEMICS

**Curriculum:** Competency-Based Education (CBE)

**Learning Pathways:**
1. STEM (Science, Technology, Engineering, Mathematics)
2. Social Sciences
3. Arts & Sports Science

**Form 1 & 2 (Core Subjects):**
• English • Kiswahili
• Mathematics • Integrated Sciences
• Creative Arts • Business Studies
• Computer Studies • Life Skills Education

**Special Features:**
• CDF partnership
• Fully equipped computer laboratory
• Science laboratories
• Modern library
• Career guidance programs
• Remedial classes

**Examination System:**
• Continuous Assessment Tests (CATs)
• End of Term examinations
• Mock examinations
• KCSE national examinations

**Quality holistic education for all students!**`,
    links: [
      { label: 'Academics', path: '/pages/academics', icon: 'book' },
      { label: 'Guidance & Counselling', path: '/pages/Guidance-and-Councelling', icon: 'users' }
    ]
  },
  facilities: {
    name: "Facilities",
    icon: 'users',
    content: studentPortalContent,
    links: [
      { label: 'Gallery', path: '/pages/gallery', icon: 'image' },
      { label: 'Student Portal', path: '/pages/StudentPortal', icon: 'grid' }
    ]
  },
  activities: {
    name: "Activities",
    icon: 'activity',
    content: `⚽ CO-CURRICULAR ACTIVITIES

**Sports:**
• Football • Basketball • Volleyball
• Athletics • Netball
• Table Tennis • Swimming

**Clubs & Societies:**
1. Science & Technology Club
2. Drama & Music Club
3. Environmental Club
4. Debate & Public Speaking Club
5. Christian Union
6. Scouts & Guides
7. Journalism Club

**Competitions:**
• Music Festivals
• Science & Engineering Fairs
• Sports championships
• Academic contests
• Drama festivals

**Leadership Development:**
• Student Council
• Class Prefects system
• Club leadership positions
• Peer counseling program

**Talent Development:**
• Art exhibitions
• Music performances
• Drama productions
• Sports tournaments`,
    links: [
      { label: 'News & Events', path: '/pages/eventsandnews', icon: 'calendar' },
      { label: 'Sports', path: '/pages/sports', icon: 'activity' }
    ]
  },
  achievements: {
    name: "Achievements",
    icon: 'award',
    content: `SCHOOL ACHIEVEMENTS

**Academic Excellence:**
• Consistent improvement in KCSE results
• High university placement rate
• Subject specialization awards
• STEM program recognition

**Sports Achievements:**
• County sports champions
• Regional athletics medals
• Basketball tournament winners
• Sportsmanship awards

**Talent Development:**
• Music festival winners
• Drama competition finalists
• Art exhibition participants
• Public speaking champions

**Community Recognition:**
• Environmental conservation awards
• Community service recognition
• Clean school initiatives
• Leadership development programs

**Technology Partnership:**
• Digital learning implementation
• Computer literacy excellence`,
    links: [
      { label: 'News & Events', path: '/pages/eventsandnews', icon: 'calendar' },
    ]
  },
  contact: {
    name: "Contact",
    icon: 'phone',
    content: `📞 CONTACT US

**Contact Information:**
• Phone: +254 729 370 590
• Email: katwanyaaschool@yahoo.com
• Admissions: katwanyaaschool@yahoo.com

**Physical Address:**
Matungulu Girls High School
Matungulu Sub-County
Machakos County
P.O. Box 363 – 90131 Tala, Kenya

**Office Hours:**
• Monday-Friday: 8:00 AM - 5:00 PM
• Saturday: 8:00 AM - 1:00 PM
• Sunday: Closed

**Visit Us:** We welcome parents, guardians, and visitors during office hours.`,
    links: [
      { label: 'Contact', path: '/pages/contact', icon: 'phone' },
      { label: 'Staff Directory', path: '/pages/staff', icon: 'users' },
      { label: 'Careers', path: '/pages/career', icon: 'briefcase' },
      { label: 'Admin Login', path: '/pages/adminLogin', icon: 'login' }
    ]
  }
};

// Helper function to format dynamic content
const buildDynamicCategories = (schoolData, documentData) => {
  if (!schoolData) return staticCategories;

  // Format fee distribution for display - UPDATED to handle array of objects
  const formatFeeDistribution = (distribution) => {
    if (!distribution) return '';
    
    // Check if it's an array of objects (from API response)
    if (Array.isArray(distribution)) {
      return distribution
        .map(item => {
          const name = item.name || item.key || 'Item';
          const amount = item.amount || item.value || 0;
          return `• ${name}: KES ${amount.toLocaleString()}`;
        })
        .join('\n');
    } 
    // Handle object format (fallback)
    else if (typeof distribution === 'object') {
      return Object.entries(distribution)
        .map(([key, value]) => `• ${key}: KES ${value.toLocaleString()}`)
        .join('\n');
    }
    
    return '';
  };

  return {
    general: {
      name: "Overview",
      icon: 'school',
      content: `${schoolData.name}

**Motto:** ${schoolData.motto || 'Strive to Excel'}

**Vision:**
${schoolData.vision || 'To be a center of excellence in holistic education'}

**Mission:**
${schoolData.mission || 'To provide quality education that nurtures intellectual, moral, and physical development'}

**About Our School:**
${schoolData.description || 'A public county school committed to academic excellence and holistic development'}

Quick Facts:
• Students: ${schoolData.studentCount || '1000+'}
• Staff: ${schoolData.staffCount || '50+'}
• Academic Term: ${schoolData.openDate ? new Date(schoolData.openDate).toLocaleDateString() : 'Jan'} - ${schoolData.closeDate ? new Date(schoolData.closeDate).toLocaleDateString() : 'Dec'}

**School Philosophy:**
We provide a supportive learning environment that promotes intellectual growth, moral values, and holistic development through qualified staff and modern facilities.`,
      links: staticCategories.general.links
    },
    admissions: {
      name: "Admissions",
      icon: 'file',
      content: `📋 ADMISSIONS INFORMATION

**Admission Period:**
• Opens: ${schoolData.admissionOpenDate ? new Date(schoolData.admissionOpenDate).toLocaleDateString() : 'January'}
• Closes: ${schoolData.admissionCloseDate ? new Date(schoolData.admissionCloseDate).toLocaleDateString() : 'March'}

**Admission Fee:** ${schoolData.admissionFee ? `KES ${schoolData.admissionFee.toLocaleString()}` : 'Contact for details'}
**Admission Capacity:** ${schoolData.admissionCapacity || 'Limited slots available'}

${documentData?.admissionFeePdf ? `**Download Admission Fee Structure:** ${documentData.admissionFeePdfName || 'Admission Fees'}` : ''}

${documentData?.admissionFeeDistribution ? `**Admission Fee Distribution:**
${formatFeeDistribution(documentData.admissionFeeDistribution)}` : ''}

**Required Documents:**
${schoolData.admissionDocumentsRequired && schoolData.admissionDocumentsRequired.length > 0 
  ? schoolData.admissionDocumentsRequired.map(doc => `• ${doc}`).join('\n')
  : '• KCPE Certificate\n• Birth Certificate\n• School Reports\n• Passport Photos\n• Medical Report'}

**Contact Admissions:**
• Email: ${schoolData.admissionContactEmail || 'katwanyaaschool@yahoo.com'}
• Phone: ${schoolData.admissionContactPhone || '+254 729 370 590'}
• Location: ${schoolData.admissionLocation || 'Kambusu, Matungulu, Machakos County'}
• Office Hours: ${schoolData.admissionOfficeHours || 'Mon-Fri: 8:00 AM - 5:00 PM'}

**Admission Requirements:**
${schoolData.admissionRequirements || '• KCPE: 250+ Marks\n• Age: 13-16 years\n• Good conduct\n• Transfer students considered'}

**Apply through our website for seamless admission processing.**`,
      links: [
        ...staticCategories.admissions.links,
        ...(documentData?.admissionFeePdf ? [{ 
          label: 'Download Fees', 
          action: 'download', 
          url: documentData.admissionFeePdf,
          icon: 'download' 
        }] : [])
      ]
    },
    fees: {
      name: "Fees",
      icon: 'dollar',
      content: `💰 FEE STRUCTURE

**School Fees (Per Term):**
${documentData?.feesDayDistributionJson ? `**Day Fee Distribution:**
${formatFeeDistribution(documentData.feesDayDistributionJson)}` : ''}



${documentData?.feesBoardingDistributionJson ? `**Boarding Fee Distribution:**
${formatFeeDistribution(documentData.feesBoardingDistributionJson)}` : ''}

**Payment Information:**
• Detailed fee structure available for download
• Multiple payment options available
• Contact bursar for payment plans

Please Note: All fees are subject to review as per school policies.`,
      links: [
        ...staticCategories.fees.links,
        ...(documentData?.feesDayDistributionPdf ? [{ 
          label: 'Download Day Fees', 
          action: 'download', 
          url: documentData.feesDayDistributionPdf,
          icon: 'download' 
        }] : []),
        ...(documentData?.feesBoardingDistributionPdf ? [{ 
          label: 'Download Boarding Fees', 
          action: 'download', 
          url: documentData.feesBoardingDistributionPdf,
          icon: 'download' 
        }] : [])
      ]
    },
    academics: {
      name: "Academics",
      icon: 'book',
      content: `📚 ACADEMIC PROGRAM

**Subjects Offered:**
${schoolData.subjects && schoolData.subjects.length > 0 
  ? schoolData.subjects.map(subject => `• ${subject}`).join('\n')
  : `• English • Kiswahili • Mathematics
• Integrated Sciences • Creative Arts
• Business Studies • Computer Studies
• Life Skills Education`}

**Academic Departments:**
${schoolData.departments && schoolData.departments.length > 0 
  ? schoolData.departments.map(dept => `• ${dept}`).join('\n')
  : `• Languages Department
• Mathematics Department
• Sciences Department
• Humanities Department`}

${documentData?.curriculumPDF ? `**Curriculum:**
• Download curriculum details: ${documentData.curriculumPdfName || 'School Curriculum'}
• Year: ${documentData.curriculumYear || 'Current'}
• Term: ${documentData.curriculumTerm || 'All Terms'}` : '**Curriculum:** Comprehensive Competency-Based Curriculum (CBE)'}

**Academic Support:**
• Regular assessments and evaluations
• Remedial classes
• Career guidance programs`,
      links: [
        ...staticCategories.academics.links,
        ...(documentData?.curriculumPDF ? [{ 
          label: 'Download Curriculum', 
          action: 'download', 
          url: documentData.curriculumPDF,
          icon: 'download' 
        }] : [])
      ]
    },
    facilities: {
      name: "Facilities",
      icon: 'users',
      content: studentPortalContent,
      links: staticCategories.facilities.links
    },
    activities: staticCategories.activities,
    achievements: {
      name: "Achievements",
      icon: 'award',
      content: `🏆 SCHOOL ACHIEVEMENTS

**Academic Excellence:**
• Consistent academic improvement
• Subject specialization achievements
• High university placement rate

${documentData?.kcseResultsPdf ? `**KCSE Examination Results:**
• Download KCSE results: ${documentData.kcsePdfName || 'KCSE Results'}
• Year: ${documentData.kcseYear || 'Latest'}
• Description: ${documentData.kcseDescription || 'National Examination Results'}` : '**Examination Results:** Available upon request'}

**Sports Achievements:**
• County and regional championships
• Athletics medals
• Sportsmanship awards  


**Student Success:**
• Holistic development focus
• Talent nurturing programs
• Leadership development initiatives`,
      links: [
        ...staticCategories.achievements.links,
        ...(documentData?.kcseResultsPdf ? [{ 
          label: 'Download KCSE Results', 
          action: 'download', 
          url: documentData.kcseResultsPdf,
          icon: 'download' 
        }] : []),
       
      ]
    },
    contact: {
      name: "Contact",
      icon: 'phone',
      content: `📞 CONTACT INFORMATION

**School Contacts:**
• Phone: ${schoolData.admissionContactPhone || '+254 729 370 590'}
• Email: ${schoolData.admissionContactEmail || 'katwanyaaschool@yahoo.com'}
• Location: ${schoolData.admissionLocation || 'Kambusu, Matungulu, Machakos County'}
• Website: ${schoolData.admissionWebsite || 'Contact office for details'}

**Office Hours:**
${schoolData.admissionOfficeHours || 'Monday-Friday: 8:00 AM - 5:00 PM\nSaturday: 8:00 AM - 1:00 PM'}

**Administration:**
• Comprehensive administrative support
• Dedicated staff team
• Efficient communication channels

**Visit Us:**
We welcome parents and guardians for consultations during office hours.`,
      links: staticCategories.contact.links
    }
  };
};

// Format message content
const formatMessage = (content) => {
  return content
    .split('\n')
    .map((line, index) => {
      if (line.startsWith('**') && line.endsWith('**')) {
        return (
          <div key={index} className="font-bold text-sm text-white mb-1 mt-2 first:mt-0">
            {line.replace(/\*\*/g, '')}
          </div>
        );
      }
      else if (line.endsWith(':') && !line.startsWith('•') && !line.startsWith('*')) {
        return (
          <div key={index} className="font-semibold text-blue-300 mt-2 mb-1 text-xs">
            {line}
          </div>
        );
      }
      else if (line.startsWith('•')) {
        return (
          <div key={index} className="flex items-start ml-1 mb-0.5">
            <span className="text-blue-300 mr-1 text-xs">•</span>
            <span className="text-gray-100 text-xs">{line.substring(1).trim()}</span>
          </div>
        );
      }
      else if (/^\d+\./.test(line)) {
        return (
          <div key={index} className="flex items-start ml-1 mb-0.5">
            <span className="text-orange-500 mr-1 text-xs font-semibold">
              {line.match(/^\d+/)[0]}.
            </span>
            <span className="text-gray-100 text-xs">{line.replace(/^\d+\.\s*/, '')}</span>
          </div>
        );
      }
      else if (line.startsWith('*') && line.endsWith('*')) {
        return (
          <div key={index} className="text-gray-300 italic text-xs mt-1">
            {line.replace(/\*/g, '')}
          </div>
        );
      }
      else if (line.trim()) {
        return (
          <div key={index} className="text-gray-100 text-xs mb-1">
            {line}
          </div>
        );
      }
      else {
        return <div key={index} className="h-2" />;
      }
    });
};

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [messages, setMessages] = useState([]);
  const [showCategories, setShowCategories] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [schoolData, setSchoolData] = useState(null);
  const [documentData, setDocumentData] = useState(null);
  const [hasFetchedData, setHasFetchedData] = useState(false);
  const [isFetchingData, setIsFetchingData] = useState(false);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const chatContainerRef = useRef(null);
  const router = useRouter();

  // Fetch school data and document data from APIs
  useEffect(() => {
    const fetchAllData = async () => {
      if (hasFetchedData || isFetchingData) return;
      
      setIsFetchingData(true);
      try {
        // Fetch school data
        const schoolResponse = await fetch('/api/school');
        if (schoolResponse.ok) {
          const schoolData = await schoolResponse.json();
          if (schoolData.success && schoolData.school) {
            setSchoolData(schoolData.school);
          }
        }

        // Fetch document data
        const documentsResponse = await fetch('/api/schooldocuments');
        if (documentsResponse.ok) {
          const documentsData = await documentsResponse.json();
          if (documentsData.success && documentsData.document) {
            setDocumentData(documentsData.document);
          }
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
        // Silently fall back to static content
      } finally {
        setHasFetchedData(true);
        setIsFetchingData(false);
      }
    };

    fetchAllData();
  }, [hasFetchedData, isFetchingData]);

  // Get categories based on data availability
  const getCategories = () => {
    if (schoolData || documentData) {
      return buildDynamicCategories(schoolData, documentData);
    }
    return staticCategories;
  };

  const categories = getCategories();

  // Handle responsive behavior
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    const handleResize = () => {
      checkMobile();
      if (chatContainerRef.current) {
        const chatRect = chatContainerRef.current.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        if (chatRect.right > viewportWidth - 10) {
          chatContainerRef.current.style.right = '10px';
        }
        if (chatRect.bottom > viewportHeight - 10) {
          chatContainerRef.current.style.bottom = '10px';
        }
      }
    };

    checkMobile();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const chatData = localStorage.getItem('MatG_chat');
    if (chatData) {
      const { messages: savedMessages, timestamp } = JSON.parse(chatData);
      const fourHoursAgo = Date.now() - (4 * 60 * 60 * 1000);
      
      if (timestamp > fourHoursAgo) {
        setMessages(savedMessages);
      } else {
        localStorage.removeItem('MatG_chat');
        setMessages([getWelcomeMessage()]);
      }
    } else {
      setMessages([getWelcomeMessage()]);
    }
  }, [schoolData, documentData]);

  const getWelcomeMessage = () => {
    const schoolName = schoolData?.name || 'Matungulu Girls School';
    const motto = schoolData?.motto ? `\n\n${schoolData.motto}✨` : '\n\nStrive to Excel✨';
    const studentCount = schoolData?.studentCount || '1000+';
    const staffCount = schoolData?.staffCount || '50+';
    
    return {
      id: 1,
      role: 'assistant',
      content: `WELCOME TO ${schoolName.toUpperCase()}!${motto}

Hello! I'm MatG, your assistant.

About Our School:
• Public Extra County School (Girl's Boarding)
• Established: 1956
• Location: Kinyui, Matungulu, Machakos County
• Students: ${studentCount} | Teachers: ${staffCount}
• Competency-Based Curriculum (CBE)

${schoolData ? 'For the most current information, choose a category below! 👇' : 'Choose a category below to learn more! 👇'}`,
      links: [
        { label: 'Home', path: '/', icon: 'home' },
        { label: 'About', path: '/pages/AboutUs', icon: 'info' },
        { label: 'Contact', path: '/pages/contact', icon: 'phone' }
      ],
      timestamp: new Date().toISOString()
    };
  };

  useEffect(() => {
    if (messages.length > 0) {
      const chatData = {
        messages: messages,
        timestamp: Date.now()
      };
      localStorage.setItem('MatG_chat', JSON.stringify(chatData));
    }
  }, [messages]);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Stream message display like Gemini - smooth reveal
  const streamMessage = (message, assistantMessageId, onComplete) => {
    setIsLoading(true);
    setIsFetching(false);
    
    let index = 0;
    const chunkSize = 3; // Display 3 characters at a time for smooth effect
    
    const streamInterval = setInterval(() => {
      if (index < message.length) {
        const chunk = message.slice(index, index + chunkSize);
        
        setMessages(prev => prev.map(msg => 
          msg.id === assistantMessageId 
            ? { ...msg, content: msg.content + chunk }
            : msg
        ));
        
        index += chunkSize;
        
        // Auto-scroll to bottom
        if (messagesContainerRef.current) {
          const container = messagesContainerRef.current;
          const isAtBottom = 
            container.scrollHeight - container.scrollTop <= container.clientHeight + 100;
          
          if (isAtBottom) {
            setTimeout(() => scrollToBottom(), 10);
          }
        }
      } else {
        clearInterval(streamInterval);
        setIsLoading(false);
        onComplete();
        setTimeout(() => {
          setShowCategories(true);
          scrollToBottom();
        }, 300);
      }
    }, 20); // Adjust speed - lower = faster
  };

  const handleCategoryClick = (categoryKey) => {
    const category = categories[categoryKey];
    
    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: `Selected: ${category.name}`,
      timestamp: new Date().toISOString()
    };

    const assistantMessage = {
      id: Date.now() + 1,
      role: 'assistant',
      content: '', // Start with empty content
      links: category.links,
      timestamp: new Date().toISOString(),
      isGenerating: true
    };

    setMessages(prev => [...prev, userMessage, assistantMessage]);
    setShowCategories(false);
    setIsFetching(true); // Show fetching state

    // Simulate API delay before streaming
    setTimeout(() => {
      setIsFetching(false);
      setMessages(prev => prev.map(msg => 
        msg.id === assistantMessage.id 
          ? { ...msg, isGenerating: true }
          : msg
      ));
      
      // Stream the response
      streamMessage(category.content, assistantMessage.id, () => {
        setMessages(prev => prev.map(msg => 
          msg.id === assistantMessage.id 
            ? { ...msg, isGenerating: false, links: category.links }
            : msg
        ));
      });
    }, 600); // Brief delay before showing response
  };

  const clearChat = () => {
    localStorage.removeItem('MatG_chat');
    setMessages([getWelcomeMessage()]);
    setShowCategories(true);
  };

  const handleLinkClick = (link) => {
    if (link.action === 'download' && link.url) {
      // Open download in new tab
      window.open(link.url, '_blank');
    } else if (link.path) {
      // Navigate to internal page
      router.push(link.path);
      setIsOpen(false);
    }
  };

  return (
    <div 
      ref={chatContainerRef}
      className="fixed bottom-4 right-4 sm:bottom-10 sm:right-6 z-50"
      style={{
        maxWidth: 'calc(100vw - 32px)',
        maxHeight: 'calc(100vh - 32px)'
      }}
    >
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-emerald-900/95 via-teal-900/95 to-slate-900/95 text-white rounded-full p-4 shadow-lg transition-all hover:scale-100 active:scale-95"
          aria-label="Open chat assistant"
          style={{
            transform: 'translateZ(0)',
            willChange: 'transform'
          }}
        >
          <SafeIcon name="colored-message" className="w-6 h-6" />
        </button>
      )}

      {isOpen && (
        <div 
          className="bg-gradient-to-br from-slate-800 to-blue-900 rounded-lg shadow-xl flex flex-col border border-white/10"
          style={{
            width: isMobile ? 'calc(100vw - 32px)' : '500px',
            height: isMobile ? 'calc(100vh - 100px)' : '600px',
            maxWidth: '500px',
            maxHeight: '600px',
            overflow: 'hidden',
            transform: 'translateZ(0)',
            willChange: 'transform'
          }}
        >
          {/* Header with logo */}
          <div className="bg-gradient-to-r from-emerald-900/95 via-teal-900/95 to-slate-900/95 text-white p-3 sm:p-4 flex-shrink-0">
            <div className="flex justify-between items-center gap-2">
              
              {/* LEFT: Branding Section */}
              <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center shadow-lg bg-white shrink-0 overflow-hidden border border-white/20">
                  <img
                    src="/MatG.jpg"
                    alt="Logo"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="min-w-0 flex flex-col">
                  <h3 className="text-sm sm:text-base font-black text-white truncate leading-tight">
                    {schoolData?.name || 'Matungulu Girls High School'}
                  </h3>
                  <p className="text-blue-200 text-[10px] sm:text-xs truncate opacity-80 font-medium">
                    {schoolData?.motto || 'Strive to Excel'}
                  </p>
                </div>
              </div>

              {/* RIGHT: Action Buttons */}
              <div className="flex items-center space-x-1 sm:space-x-2 shrink-0">
                {/* Fetching Indicator */}
                {isFetching && (
                  <div className="flex items-center px-2 sm:px-3 py-1 bg-emerald-500/20 rounded-lg border border-emerald-500/30">
                    <div className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
                      <span className="text-[10px] sm:text-xs text-emerald-300 font-medium whitespace-nowrap">
                        Fetching data...
                      </span>
                    </div>
                  </div>
                )}
                
                {/* Clear Button */}
                <button
                  onClick={clearChat}
                  className="p-2 sm:p-2.5 hover:bg-white/10 active:bg-white/20 rounded-xl transition-all"
                  title="Clear chat"
                >
                  <SafeIcon name="trash" className="w-4 h-4 sm:w-5 sm:h-5 opacity-80 hover:opacity-100" />
                </button>

                {/* Close Button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 sm:p-2.5 bg-white/10 hover:bg-white/20 active:scale-90 rounded-xl transition-all border border-white/10"
                  aria-label="Close chat"
                >
                  <SafeIcon name="close" className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>

            </div>
          </div>

          {/* Messages Container */}
          <div 
            ref={messagesContainerRef}
            className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-2 sm:space-y-3 bg-slate-800/50"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: 'rgba(255, 255, 255, 0.2) transparent',
              WebkitOverflowScrolling: 'touch',
              overscrollBehavior: 'contain'
            }}
          >
       <style jsx>{`
  @keyframes fade-in {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .animate-fade-in {
    animation: fade-in 0.3s ease-out;
  }
`}</style>
            
{messages.map((message) => (
  <div
    key={message.id}
    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
  >
    <div
      className={`max-w-[95%] w-full rounded-lg px-3 py-2 sm:px-4 sm:py-3 ${
        message.role === 'user'
          ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-none'
          : 'bg-slate-700/80 text-white rounded-bl-none'
      }`}
      style={{
        wordBreak: 'break-word',
        overflowWrap: 'break-word'
      }}
    >
      {/* Show fetching state */}
      {message.isGenerating && message.content === '' ? (
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
          <span className="text-xs text-gray-300">Generating response...</span>
        </div>
      ) : (
        <div className="text-xs sm:text-sm leading-relaxed text-white w-full">
          {formatMessage(message.content)}
        </div>
      )}
      
      {/* Links Section - only show when not generating */}
      {message.links && message.role === 'assistant' && !message.isGenerating && message.content && (
        <div className="mt-2 sm:mt-3 pt-2 border-t border-white/20 w-full animate-fade-in">
          <p className="text-xs text-blue-300 mb-2 font-medium flex items-center gap-1">
            <SafeIcon name="star" className="w-3 h-3 flex-shrink-0" />
            Quick Links:
          </p>
          <div className="flex flex-wrap gap-2">
            {message.links.map((link, index) => (
              <button
                key={index}
                onClick={() => handleLinkClick(link)}
                className={`inline-flex items-center gap-1 text-xs px-2 py-1.5 rounded transition-all font-medium whitespace-nowrap flex-shrink-0 ${
                  link.action === 'download'
                    ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white'
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white'
                }`}
              >
                {link.icon && <SafeIcon name={link.icon} className="w-3 h-3" />}
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
      
      <p className={`text-xs mt-1 sm:mt-2 ${message.role === 'user' ? 'text-blue-100' : 'text-gray-400'}`}>
        {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </p>
    </div>
  </div>
))}

            <div ref={messagesEndRef} style={{ height: '1px' }} />
          </div>

          {/* Categories Section */}
          {showCategories && (
            <div className="border-t border-white/10 bg-slate-700/80 p-3 sm:p-4 flex-shrink-0 animate-fade-in">
              <div className="w-full">
                <p className="text-xs text-blue-300 font-medium mb-2 flex items-center gap-1">
                  <SafeIcon name="help" className="w-3 h-3 flex-shrink-0" />
                  What would you like to know?
                </p>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 w-full">
                  {Object.entries(categories).map(([key, category]) => (
                    <button
                      key={key}
                      onClick={() => handleCategoryClick(key)}
                      className="flex flex-col items-center justify-center space-y-1 px-2 py-2 sm:px-2 sm:py-3 rounded text-xs font-medium transition-all text-gray-300 hover:bg-slate-600/80 hover:text-white border border-white/10 w-full min-h-[60px] sm:min-h-[70px]"
                      aria-label={`Learn about ${category.name}`}
                      style={{
                        transform: 'translateZ(0)',
                        willChange: 'transform'
                      }}
                    >
                      <SafeIcon name={category.icon} className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span className="truncate w-full text-center text-[11px] sm:text-xs">{category.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
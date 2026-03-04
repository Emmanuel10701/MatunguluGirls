'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiStar, 
  FiBook, 
  FiTarget, 
  FiUsers,
  FiCalendar,
  FiArrowLeft,
  FiShare2,
  FiPrinter,
  FiAward,
  FiBriefcase,
  FiTool,
  FiCheckCircle,
  FiActivity,
  FiGlobe,
  FiHome,
  FiX,
   
} from 'react-icons/fi';
import { SiGmail } from 'react-icons/si';
import { FaGraduationCap, FaChalkboardTeacher, FaUserTie, FaWhatsapp, FaFacebook, FaInstagram } from 'react-icons/fa';

export default function StaffProfilePage() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;
  
  const [staff, setStaff] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);

  // School description - mobile shortened version
  const schoolDescription = "Matungulu Girls High School provides exceptional education through trained professionals dedicated to holistic student development and academic excellence.";

// In the transformStaffData function, update the image handling:
const transformStaffData = (apiData) => {
  if (!apiData) return null;
  
  // Ensure arrays exist
  const expertise = Array.isArray(apiData.expertise) ? apiData.expertise : [];
  const responsibilities = Array.isArray(apiData.responsibilities) ? apiData.responsibilities : [];
  const achievements = Array.isArray(apiData.achievements) ? apiData.achievements : [];
  
  // Generate skills safely
  const skills = expertise.slice(0, 4).map((skill, index) => ({
    name: skill || `Skill ${index + 1}`,
    level: 75 + (index * 5)
  }));

  // FIXED: Proper image URL handling
  const getImageUrl = (imagePath) => {
    if (!imagePath || typeof imagePath !== 'string') {
      return '/male.png'; // Default fallback
    }
    
    // Handle Cloudinary URLs
    if (imagePath.includes('cloudinary.com')) {
      return imagePath;
    }
    
    // Handle local paths that already start with /
    if (imagePath.startsWith('/')) {
      return imagePath;
    }
    
    // Handle external URLs
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    
    // Handle base64 images
    if (imagePath.startsWith('data:image')) {
      return imagePath;
    }
    
    // If it's just a filename, return as is (Next.js will handle it from public folder)
    return imagePath;
  };

  return {
    id: apiData.id || 'unknown',
    name: apiData.name || 'Professional Educator',
    position: apiData.position || 'Dedicated Teacher',
    department: apiData.department || 'Academic Department',
    email: apiData.email || '',
    phone: apiData.phone || '',
    image: getImageUrl(apiData.image), // Use the helper function
    bio: apiData.bio || `A committed educator at Matungulu Girls High School with a passion for student success and educational excellence.`,
    expertise: expertise,
    responsibilities: responsibilities,
    achievements: achievements,
    quote: apiData.quote || 'Education is the most powerful weapon which you can use to change the world.',
    joinDate: apiData.joinDate
      ? new Date(apiData.joinDate).getFullYear().toString() 
      : '2020',
    officeHours: 'Monday - Friday: 8:00 AM - 4:00 PM',
    location: apiData.department ? `${apiData.department} Department` : 'Main Academic Building',
    skills: skills.length > 0 ? skills : [
      { name: 'Pedagogy', level: 92 },
      { name: 'Curriculum', level: 85 },
      { name: 'Mentorship', level: 88 },
      { name: 'Tech Skills', level: 80 }
    ]
  };
};

  useEffect(() => {
    const fetchStaffData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`/api/staff/${id}`);
        
        if (!response.ok) {
          throw new Error(`Staff member not available (${response.status})`);
        }
        
        const data = await response.json();
        
        if (data.success && data.staff) {
          const transformedData = transformStaffData(data.staff);
          setStaff(transformedData);
        } else {
          throw new Error('Unable to load staff information');
        }
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchStaffData();
  }, [id]);

  // SEO Head Component
  const SeoHead = () => {
    if (!staff) return null;
    
    const profileTitle = `${staff.name} - ${staff.position} at Matungulu Girls High School`;
    const profileDescription = staff.bio || `Meet ${staff.name}, ${staff.position} at Matungulu Girls High School. ${schoolDescription}`;
    const profileUrl = typeof window !== 'undefined' ? window.location.href : `https://katwanyaahighschool.edu.ke/staff/${staff.id}`;
    
    return (
      <>
        <title>{profileTitle}</title>
        <meta name="title" content={profileTitle} />
        <meta name="description" content={profileDescription} />
        <meta name="keywords" content={`${staff.name}, ${staff.position}, Matungulu Girls High School, teacher profile, ${staff.department}`} />
        <meta name="author" content="Matungulu Girls High School" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="profile" />
        <meta property="og:url" content={profileUrl} />
        <meta property="og:title" content={profileTitle} />
        <meta property="og:description" content={profileDescription} />
        <meta property="og:image" content={staff.image} />
        <meta property="og:site_name" content="Matungulu Girls High School" />
        <meta property="profile:first_name" content={staff.name.split(' ')[0]} />
        <meta property="profile:last_name" content={staff.name.split(' ').slice(1).join(' ')} />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={profileUrl} />
        <meta property="twitter:title" content={profileTitle} />
        <meta property="twitter:description" content={profileDescription} />
        <meta property="twitter:image" content={staff.image} />
        <meta property="twitter:site" content="@KatwanyaaHS" />
        
        {/* Structured Data for Google */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": staff.name,
              "jobTitle": staff.position,
              "worksFor": {
                "@type": "EducationalOrganization",
                "name": "Matungulu Girls High School",
                "description": schoolDescription,
                "url": "https://katwanyaahighschool.edu.ke"
              },
              "description": profileDescription,
              "url": profileUrl,
              "image": staff.image,
              "alumniOf": staff.expertise?.length > 0 ? staff.expertise : undefined,
              "knowsAbout": staff.expertise,
              "memberOf": staff.department
            })
          }}
        />
      </>
    );
  };

const ShareModal = () => {
  const [copied, setCopied] = useState(false);
  if (!showShareModal || !staff) return null;

  const profileUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = `Check out ${staff.name}'s profile - ${staff.position} at Matungulu Girls High School `;
  
  const handleCopy = async () => {
    await navigator.clipboard.writeText(profileUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const channels = [
    { 
      name: 'WhatsApp', 
      icon: <FaWhatsapp />, 
      color: 'bg-[#25D366]', 
      link: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + profileUrl)}` 
    },
    { 
      name: 'Facebook', 
      icon: <FaFacebook />, 
      color: 'bg-[#1877F2]', 
      link: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(profileUrl)}` 
    },
    { 
      name: 'Instagram', 
      icon: <FaInstagram />, 
      color: 'bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]', 
      action: handleCopy 
    },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setShowShareModal(false)} />
      
      {/* Modal Card */}
      <div className="relative bg-white w-full max-w-sm rounded-lg shadow-3xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tighter uppercase">Share</h3>
              <p className="text-xs font-bold text-slate-400 tracking-widest uppercase">Professional Profile</p>
            </div>
            <button onClick={() => setShowShareModal(false)} className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all">
              <FiX size={20} />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {channels.map((ch) => (
              <a 
                key={ch.name}
                href={ch.link || '#'}
                target={ch.link ? "_blank" : "_self"}
                onClick={ch.action}
                className="group flex items-center gap-4 p-2 pr-6 rounded-xl bg-slate-50 border border-slate-100 hover:border-blue-200 hover:bg-blue-50 transition-all"
              >
                <div className={`w-12 h-12 ${ch.color} rounded-md flex items-center justify-center text-white text-xl shadow-lg group-hover:scale-110 transition-transform`}>
                  {ch.icon}
                </div>
                <div className="flex-1">
                  <span className="block font-black text-slate-900 text-sm uppercase tracking-tight">{ch.name}</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase leading-none">
                    {ch.name === 'Instagram' ? 'Copy Link to Post' : `Share to ${ch.name}`}
                  </span>
                </div>
                <FiShare2 className="text-slate-300 group-hover:text-blue-500 transition-colors" />
              </a>
            ))}
          </div>

          {/* Smart Link Bar */}
          <div className="mt-8 relative">
            <input 
              readOnly 
              value={profileUrl} 
              className="w-full bg-slate-100 border-none rounded-xl py-4 pl-5 pr-16 text-xs font-bold text-slate-500 focus:ring-2 ring-blue-500"
            />
            <button 
              onClick={handleCopy}
              className={`absolute right-2 top-2 bottom-2 px-4 rounded-md font-black text-[10px] uppercase tracking-widest transition-all ${
                copied ? 'bg-emerald-500 text-white' : 'bg-slate-900 text-white hover:bg-blue-600'
              }`}
            >
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>
        
        <div className="bg-slate-50 p-4 text-center">
          <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">Matungulu Girls High School</p>
        </div>
      </div>
    </div>
  );
};

if (loading) {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
      {/* Dynamic Brand Logo Loader */}
      <div className="relative mb-12">
        {/* Animated Rings */}
        <div className="absolute inset-0 rounded-[1rem] border-2 border-blue-600/20 animate-ping" />
        <div className="absolute inset-0 rounded-[1rem] border-4 border-slate-900/5 animate-pulse" />
        
        {/* Central Icon */}
        <div className="relative w-24 h-24 bg-slate-900 rounded-[1rem] flex items-center justify-center shadow-2xl rotate-3">
          <FaGraduationCap className="text-white text-4xl animate-bounce" />
        </div>
      </div>

      {/* Loading Text with Modern Letter Spacing */}
      <div className="space-y-3">
        <h2 className="text-xs font-black tracking-[0.3em] text-slate-900 uppercase">
          Opening the profile
        </h2>
        <div className="flex items-center justify-center gap-1">
          {[0, 1, 2].map((i) => (
            <div 
              key={i} 
              className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce" 
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest max-w-[200px] leading-relaxed">
          Matungulu Girls High School  Professional Directory
        </p>
      </div>

      {/* Subtle Progress Bar */}
      <div className="mt-12 w-48 h-1 bg-slate-100 rounded-full overflow-hidden">
        <div className="h-full bg-slate-900 w-1/3 rounded-full animate-[loading_1.5s_infinite_ease-in-out]" />
      </div>

      <style jsx>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
      `}</style>
    </div>
  );
}

  if (error || !staff) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 flex items-center justify-center p-4">
        <div className="text-center max-w-md w-full p-8 bg-white rounded-xl shadow-lg">
          <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-red-200 rounded-xl flex items-center justify-center mx-auto mb-6">
            <FaUserTie className="text-2xl text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Profile Unavailable</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            We're unable to retrieve this staff member's profile at the moment.
          </p>
          <button 
            onClick={() => router.push('/pages/staff')}
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-shadow w-full"
          >
            Return to Staff Directory
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <SeoHead />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 font-sans">
        {/* MOBILE Header - Optimized for small screens */}
        <div className="bg-white/90 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-40 sm:bg-white/80">
          <div className="max-w-7xl mx-auto px-4 h-14 sm:h-16 flex items-center justify-between">
            <button
              onClick={() => router.push('/pages/staff')}
              className="flex items-center gap-1 text-gray-700 hover:text-blue-600 group transition-all duration-300"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-50 sm:bg-gradient-to-br sm:from-blue-50 sm:to-blue-100 rounded-lg sm:rounded-xl flex items-center justify-center group-hover:bg-blue-100">
                <FiArrowLeft className="text-blue-600 sm:text-blue-600" size={16} />
              </div>
              <span className="font-medium text-sm hidden sm:block">Back to Directory</span>
            </button>
            
            {/* School Logo/Name - Mobile Optimized */}
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-600 rounded flex items-center justify-center">
                <FaGraduationCap className="text-white text-xs sm:text-sm" />
              </div>
              <span className="font-bold text-gray-800 text-xs sm:text-sm hidden xs:block sm:hidden md:block">
                Matungulu Girls High School
              </span>
              <span className="font-bold text-gray-800 hidden sm:block md:hidden">KHS</span>
              <span className="font-bold text-gray-800 hidden md:block lg:hidden">Katwanyaa</span>
              <span className="font-bold text-gray-800 hidden lg:block">Matungulu Girls High School</span>
            </div>

            <div className="flex gap-1 sm:gap-2">
              <button 


className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 sm:bg-gradient-to-br sm:from-gray-100 sm:to-gray-50 rounded-lg sm:rounded-xl flex items-center justify-center text-gray-600 hover:text-blue-600"
                title="Share Profile"
              >
                <FiShare2 size={14} />
              </button>
              <button 
                onClick={() => window.print()}
                className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 sm:bg-gradient-to-br sm:from-gray-100 sm:to-gray-50 rounded-lg sm:rounded-xl flex items-center justify-center text-gray-600 hover:text-blue-600"
                title="Print Profile"
              >
                <FiPrinter />
              </button>
            </div>
          </div>
        </div>
{/* COMPLETE PROFILE SECTION - Fully Responsive & Zoom-Friendly */}
<div className="w-full max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
  
  {/* Main Profile Card */}
  <div className="bg-white rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-lg sm:shadow-xl overflow-hidden">
    
    {/* Header with Pattern - Responsive height */}
    <div className="relative h-28 sm:h-36 lg:h-48 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600">
      {/* Abstract Pattern - scales with container */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-40 sm:w-60 lg:w-80 h-40 sm:h-60 lg:h-80 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-60 sm:w-80 lg:w-96 h-60 sm:h-80 lg:h-96 bg-white rounded-full translate-x-1/3 translate-y-1/3"></div>
      </div>
      
      {/* School Badge - responsive sizing */}
      <div className="absolute top-2 sm:top-3 lg:top-4 right-2 sm:right-3 lg:right-4 bg-white/10 backdrop-blur-md px-2 sm:px-3 lg:px-4 py-1 sm:py-1.5 lg:py-2 rounded-full border border-white/20">
        <span className="text-white text-[10px] sm:text-xs lg:text-sm font-medium tracking-wide whitespace-nowrap">
          🏫 Matungulu Girls High School
        </span>
      </div>
    </div>
    
    {/* Profile Content - Responsive padding */}
    <div className="relative px-4 sm:px-5 lg:px-8 pb-6 sm:pb-7 lg:pb-10">
      
      {/* Profile Image - Dramatic Overlap with responsive sizing */}
      <div className="relative -mt-10 sm:-mt-12 lg:-mt-16 mb-4 sm:mb-5 lg:mb-8 flex flex-wrap items-end justify-between gap-4">
        <div className="relative flex items-center gap-3 sm:gap-4">
          <div className="relative shrink-0">
            <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-28 lg:h-28 rounded-lg sm:rounded-xl lg:rounded-2xl border-2 sm:border-3 lg:border-4 border-white shadow-lg sm:shadow-xl lg:shadow-2xl overflow-hidden bg-white">
              <Image
                src={staff.image || '/male.png'}
                alt={staff.name}
                width={112}
                height={112}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            {/* Status Indicator with Pulse - responsive sizing */}
            <div className="absolute -bottom-0.5 -right-0.5 sm:-bottom-1 sm:-right-1">
              <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5 lg:h-3 lg:w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-full w-full bg-green-500 border-1 sm:border-2 border-white"></span>
              </span>
            </div>
          </div>
          
          {/* Mobile: Name next to image */}
          <div className="lg:hidden">
            <h1 className="text-base sm:text-lg font-bold text-gray-900 leading-tight">
              {staff.name}
            </h1>
            <p className="text-xs sm:text-sm text-blue-600 font-medium">{staff.position}</p>
          </div>
        </div>
        
        {/* Action Icons - responsive */}
        <div className="flex gap-1.5 sm:gap-2 w-full sm:w-auto justify-end">
          {staff.email && (
            <a href={`mailto:${staff.email}`} 
               className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 bg-blue-50 rounded-lg sm:rounded-xl flex items-center justify-center text-blue-600 hover:bg-blue-100 transition-all hover:scale-110">
              <FiMail size={14} className="sm:hidden" />
              <FiMail size={16} className="hidden sm:block lg:hidden" />
              <FiMail size={18} className="hidden lg:block" />
            </a>
          )}
          {staff.phone && (
            <a href={`tel:${staff.phone}`} 
               className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 bg-green-50 rounded-lg sm:rounded-xl flex items-center justify-center text-green-600 hover:bg-green-100 transition-all hover:scale-110">
              <FiPhone size={14} className="sm:hidden" />
              <FiPhone size={16} className="hidden sm:block lg:hidden" />
              <FiPhone size={18} className="hidden lg:block" />
            </a>
          )}
          <button                  onClick={() => setShowShareModal(true)}
 className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 bg-purple-50 rounded-lg sm:rounded-xl flex items-center justify-center text-purple-600 hover:bg-purple-100 transition-all hover:scale-110">

            <FiShare2 size={14} className="sm:hidden" />
            <FiShare2 size={16} className="hidden sm:block lg:hidden" />
            <FiShare2 size={18} className="hidden lg:block" />
          </button>
        </div>
      </div>

      {/* Desktop: Name & Title - Hidden on mobile */}
      <div className="hidden lg:block mb-6">
        <div className="flex items-center gap-4 mb-2">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            {staff.name}
          </h1>
          <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full whitespace-nowrap">
            {staff.joinDate} Present
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xl font-medium text-blue-600">{staff.position}</span>
          <span className="text-gray-300 text-xl">•</span>
          <div className="flex items-center gap-2">
            <FiMapPin className="text-gray-400" size={16} />
            <span className="text-gray-600 font-medium">{staff.department} Department</span>
          </div>
        </div>
      </div>

      {/* Tablet: Name & Title */}
      <div className="hidden sm:block lg:hidden mb-4">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <h1 className="text-xl font-bold text-gray-900">{staff.name}</h1>
          <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-semibold rounded-full">
            Since {staff.joinDate}
          </span>
        </div>
        <p className="text-base font-medium text-blue-600">{staff.position}</p>
        <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
          <FiMapPin size={12} /> {staff.department} Department
        </p>
      </div>

      {/* Quote Card - Responsive */}
      {staff.quote && (
        <div className="relative mb-5 sm:mb-6 lg:mb-8">
          <div className="absolute -left-1 -top-1 sm:-left-2 sm:-top-2 text-3xl sm:text-4xl lg:text-6xl text-blue-200 font-serif">"</div>
          <div className="relative pl-5 sm:pl-6 lg:pl-8 pr-3 sm:pr-4 py-2 sm:py-3 lg:py-4 bg-gradient-to-r from-blue-50 to-transparent rounded-xl sm:rounded-2xl">
            <p className="text-gray-700 text-xs sm:text-sm lg:text-base italic leading-relaxed font-light">
              {staff.quote}
            </p>
          </div>
        </div>
      )}

      {/* Bio - Responsive text */}
      <p className="text-gray-600 leading-relaxed mb-5 sm:mb-6 lg:mb-8 text-xs sm:text-sm lg:text-base border-l-2 sm:border-l-3 lg:border-l-4 border-blue-200 pl-3 sm:pl-4 py-1">
        {staff.bio}
      </p>

      {/* Stats Grid - Responsive */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 lg:gap-4 mb-6 sm:mb-8 lg:mb-10">
        <div className="bg-gradient-to-br from-blue-50 to-white rounded-lg sm:rounded-xl p-2 sm:p-3 lg:p-4 border border-blue-100">
          <FiCalendar className="text-blue-500 mb-1 sm:mb-2" size={16}  />
          <FiCalendar className="text-blue-500 mb-1 sm:mb-2 hidden sm:block lg:hidden" size={18} />
          <FiCalendar className="text-blue-500 mb-2 hidden lg:block" size={20} />
          <p className="text-base sm:text-lg lg:text-2xl font-bold text-gray-900">{staff.joinDate}</p>
          <p className="text-[8px] sm:text-[10px] lg:text-xs text-gray-500 uppercase tracking-wide">Joined</p>
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 to-white rounded-lg sm:rounded-xl p-2 sm:p-3 lg:p-4 border border-purple-100">
          <FiStar className="text-purple-500 mb-1 sm:mb-2" size={16}/>
          <FiStar className="text-purple-500 mb-1 sm:mb-2 hidden sm:block lg:hidden" size={18} />
          <FiStar className="text-purple-500 mb-2 hidden lg:block" size={20} />
          <p className="text-base sm:text-lg lg:text-2xl font-bold text-gray-900">{staff.expertise?.length || 0}</p>
          <p className="text-[8px] sm:text-[10px] lg:text-xs text-gray-500 uppercase tracking-wide">Expertise</p>
        </div>
        
        <div className="bg-gradient-to-br from-green-50 to-white rounded-lg sm:rounded-xl p-2 sm:p-3 lg:p-4 border border-green-100">
          <FiBriefcase className="text-green-500 mb-1 sm:mb-2" size={16}  />
          <FiBriefcase className="text-green-500 mb-1 sm:mb-2 hidden sm:block lg:hidden" size={18} />
          <FiBriefcase className="text-green-500 mb-2 hidden lg:block" size={20} />
          <p className="text-base sm:text-lg lg:text-2xl font-bold text-gray-900">{staff.responsibilities?.length || 0}</p>
          <p className="text-[8px] sm:text-[10px] lg:text-xs text-gray-500 uppercase tracking-wide">Roles</p>
        </div>
        
        <div className="bg-gradient-to-br from-amber-50 to-white rounded-lg sm:rounded-xl p-2 sm:p-3 lg:p-4 border border-amber-100">
          <FiAward className="text-amber-500 mb-1 sm:mb-2" size={16} />
          <FiAward className="text-amber-500 mb-1 sm:mb-2 hidden sm:block lg:hidden" size={18} />
          <FiAward className="text-amber-500 mb-2 hidden lg:block" size={20} />
          <p className="text-base sm:text-lg lg:text-2xl font-bold text-gray-900">{staff.achievements?.length || 0}</p>
          <p className="text-[8px] sm:text-[10px] lg:text-xs text-gray-500 uppercase tracking-wide">Awards</p>
        </div>
      </div>

      {/* Main Content Grid - Responsive */}
      <div className="grid lg:grid-cols-2 gap-5 sm:gap-6 lg:gap-8">
        
        {/* Left Column */}
        <div className="space-y-5 sm:space-y-6 lg:space-y-8">
          
          {/* Expertise - Responsive Tags */}
          <div>
            <h3 className="text-[10px] sm:text-xs lg:text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2 sm:mb-3 lg:mb-4 flex items-center gap-2">
              <span className="w-4 sm:w-6 lg:w-8 h-0.5 bg-blue-400 rounded-full"></span>
              Areas of Expertise
            </h3>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {staff.expertise?.map((item, i) => (
                <span 
                  key={i}
                  className="px-2 sm:px-3 lg:px-4 py-1 sm:py-1.5 lg:py-2 bg-white text-gray-700 text-[10px] sm:text-xs lg:text-sm rounded-lg sm:rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-blue-200 hover:-translate-y-0.5 transition-all cursor-default"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Skills - Modern without percentages */}
          {staff.skills && staff.skills.length > 0 && (
            <div>
              <h3 className="text-[10px] sm:text-xs lg:text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2 sm:mb-3 lg:mb-4 flex items-center gap-2">
                <span className="w-4 sm:w-6 lg:w-8 h-0.5 bg-purple-400 rounded-full"></span>
                Professional Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {staff.skills.slice(0, 4).map((skill, i) => (
                  <span key={i} className="px-2 sm:px-3 py-1 sm:py-1.5 bg-purple-50 text-purple-700 text-[10px] sm:text-xs rounded-lg border border-purple-200">
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-5 sm:space-y-6 lg:space-y-8">
          
          {/* Responsibilities - Responsive List */}
          <div>
            <h3 className="text-[10px] sm:text-xs lg:text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2 sm:mb-3 lg:mb-4 flex items-center gap-2">
              <span className="w-4 sm:w-6 lg:w-8 h-0.5 bg-green-400 rounded-full"></span>
              Key Responsibilities
            </h3>
            <div className="space-y-1.5 sm:space-y-2">
              {staff.responsibilities?.map((item, i) => (
                <div key={i} className="flex items-start gap-2 p-2 sm:p-2.5 lg:p-3 bg-gray-50 rounded-lg sm:rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 bg-green-100 rounded-lg flex items-center justify-center text-green-600 shrink-0 mt-0.5">
                    <FiCheckCircle size={10} className="sm:hidden" />
                    <FiCheckCircle size={12} className="hidden sm:block lg:hidden" />
                    <FiCheckCircle size={14} className="hidden lg:block" />
                  </div>
                  <span className="text-gray-700 text-[10px] sm:text-xs lg:text-sm leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements - Responsive Cards */}
          <div>
            <h3 className="text-[10px] sm:text-xs lg:text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2 sm:mb-3 lg:mb-4 flex items-center gap-2">
              <span className="w-4 sm:w-6 lg:w-8 h-0.5 bg-amber-400 rounded-full"></span>
              Notable Achievements
            </h3>
            <div className="space-y-1.5 sm:space-y-2">
              {staff.achievements?.map((item, i) => (
                <div key={i} className="bg-white border border-amber-100 rounded-lg sm:rounded-xl p-2 sm:p-2.5 lg:p-3 hover:border-amber-200 transition-all">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600 font-bold text-[10px] sm:text-xs shrink-0">
                      {i + 1}
                    </div>
                    <span className="text-gray-700 text-[10px] sm:text-xs lg:text-sm font-medium">{item}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Contact Bar - Responsive */}
      <div className="mt-5 sm:mt-6 lg:mt-10 pt-4 sm:pt-5 lg:pt-6 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 lg:gap-4">
          {staff.email && (
            <a href={`mailto:${staff.email}`} className="flex items-center gap-1 sm:gap-1.5 lg:gap-2 text-gray-600 hover:text-blue-600 transition-colors text-[10px] sm:text-xs lg:text-sm">
              <FiMail size={12} className="sm:hidden" />
              <FiMail size={14} className="hidden sm:block lg:hidden" />
              <FiMail size={16} className="hidden lg:block" />
              <span className="hidden sm:inline">{staff.email}</span>
              <span className="sm:hidden">Email</span>
            </a>
          )}
          {staff.phone && (
            <a href={`tel:${staff.phone}`} className="flex items-center gap-1 sm:gap-1.5 lg:gap-2 text-gray-600 hover:text-green-600 transition-colors text-[10px] sm:text-xs lg:text-sm">
              <FiPhone size={12} className="sm:hidden" />
              <FiPhone size={14} className="hidden sm:block lg:hidden" />
              <FiPhone size={16} className="hidden lg:block" />
              <span className="hidden sm:inline">{staff.phone}</span>
              <span className="sm:hidden">Call</span>
            </a>
          )}
        </div>
        <div className="flex items-center gap-1.5 text-[8px] sm:text-[10px] lg:text-xs text-gray-400">
          <span className="whitespace-nowrap">Updated 2024</span>
          <span className="w-0.5 h-0.5 sm:w-1 sm:h-1 bg-gray-300 rounded-full"></span>
          <span className="whitespace-nowrap">Matungulu Girls High School</span>
        </div>
      </div>
    </div>
  </div>
</div>

{/* MODERN BRAND FOOTER - Zoom & Mobile Optimized */}
<footer className="mt-12 sm:mt-20 border-t border-slate-100 bg-white/50 backdrop-blur-sm relative overflow-hidden">
  {/* Sublte Decorative Background Gradient */}
  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-50/50 pointer-events-none" />

  <div className="max-w-7xl mx-auto px-6 py-10 sm:py-16 relative z-10">
    <div className="flex flex-col items-center justify-center space-y-6">
      
      {/* Brand Mark */}
      <div className="flex flex-col items-center group cursor-default">
        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-slate-900 rounded-[1.5rem] flex items-center justify-center shadow-2xl shadow-blue-900/20 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500">
          <FaGraduationCap className="text-white text-xl sm:text-2xl" />
        </div>
        
        <div className="mt-6 text-center">
          <h4 className="font-black text-slate-900 text-sm sm:text-lg uppercase tracking-[0.3em] leading-none mb-2">
            Matungulu Girls High School
          </h4>
          <div className="flex items-center justify-center gap-2">
            <div className="h-px w-4 bg-blue-600/30" />
            <span className="text-[10px] sm:text-xs font-bold text-blue-600 uppercase tracking-widest">
              Mixed High School
            </span>
            <div className="h-px w-4 bg-blue-600/30" />
          </div>
        </div>
      </div>

      {/* Meta Information */}
      <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-slate-400">
        <p className="text-[10px] sm:text-xs font-black uppercase tracking-tighter">
          Excellence in Education
        </p>
        <div className="w-1 h-1 rounded-full bg-slate-200" />
        <p className="text-[10px] sm:text-xs font-black uppercase tracking-tighter">
          Professional Staff Directory
        </p>
        <div className="w-1 h-1 rounded-full bg-slate-200" />
        <p className="text-[10px] sm:text-xs font-black uppercase tracking-tighter text-slate-300">
          © {new Date().getFullYear()} Matungulu Girls High School
        </p>
      </div>

      {/* Modern Interaction: Quick Action */}
      <div className="pt-4">
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="px-6 py-2 rounded-full border border-slate-200 text-slate-500 text-[10px] font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all active:scale-95"
        >
          Back to Top
        </button>
      </div>
    </div>
  </div>
</footer>
      </div>

      {/* Share Modal */}
      <ShareModal />
    </>
  );
}
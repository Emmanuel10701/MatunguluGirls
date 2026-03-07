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
  FiRefreshCw
} from 'react-icons/fi';
import { IoSchoolOutline, IoSparkles } from 'react-icons/io5';
import { FaGraduationCap, FaChalkboardTeacher, FaUserTie, FaWhatsapp, FaFacebook, FaInstagram, FaLeaf } from 'react-icons/fa';

export default function StaffProfilePage() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;
  
  const [staff, setStaff] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);

  // School description
  const schoolDescription = "Matungulu Girls High School provides exceptional education through trained professionals dedicated to holistic student development and academic excellence.";

  const transformStaffData = (apiData) => {
    if (!apiData) return null;
    
    const expertise = Array.isArray(apiData.expertise) ? apiData.expertise : [];
    const responsibilities = Array.isArray(apiData.responsibilities) ? apiData.responsibilities : [];
    const achievements = Array.isArray(apiData.achievements) ? apiData.achievements : [];
    
    const skills = expertise.slice(0, 4).map((skill, index) => ({
      name: skill || `Skill ${index + 1}`,
      level: 75 + (index * 5)
    }));

    const getImageUrl = (imagePath) => {
      if (!imagePath || typeof imagePath !== 'string') {
        return '/male.png';
      }
      
      if (imagePath.includes('cloudinary.com')) {
        return imagePath;
      }
      
      if (imagePath.startsWith('/')) {
        return imagePath;
      }
      
      if (imagePath.startsWith('http')) {
        return imagePath;
      }
      
      if (imagePath.startsWith('data:image')) {
        return imagePath;
      }
      
      return imagePath;
    };

    return {
      id: apiData.id || 'unknown',
      name: apiData.name || 'Professional Educator',
      position: apiData.position || 'Dedicated Teacher',
      department: apiData.department || 'Academic Department',
      email: apiData.email || '',
      phone: apiData.phone || '',
      image: getImageUrl(apiData.image),
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

  const SeoHead = () => {
    if (!staff) return null;
    
    const profileTitle = `${staff.name} - ${staff.position} at Matungulu Girls High School`;
    const profileDescription = staff.bio || `Meet ${staff.name}, ${staff.position} at Matungulu Girls High School. ${schoolDescription}`;
    const profileUrl = typeof window !== 'undefined' ? window.location.href : `https://matungulu-girls.vercel.app/staff/${staff.id}`;
    
    return (
      <>
        <title>{profileTitle}</title>
        <meta name="title" content={profileTitle} />
        <meta name="description" content={profileDescription} />
        <meta name="keywords" content={`${staff.name}, ${staff.position}, Matungulu Girls High School, teacher profile, ${staff.department}`} />
        <meta name="author" content="Matungulu Girls High School" />
        
        <meta property="og:type" content="profile" />
        <meta property="og:url" content={profileUrl} />
        <meta property="og:title" content={profileTitle} />
        <meta property="og:description" content={profileDescription} />
        <meta property="og:image" content={staff.image} />
        <meta property="og:site_name" content="Matungulu Girls High School" />
        <meta property="profile:first_name" content={staff.name.split(' ')[0]} />
        <meta property="profile:last_name" content={staff.name.split(' ').slice(1).join(' ')} />
        
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={profileUrl} />
        <meta property="twitter:title" content={profileTitle} />
        <meta property="twitter:description" content={profileDescription} />
        <meta property="twitter:image" content={staff.image} />
        <meta property="twitter:site" content="@MatunguluGirlsHS" />
        
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
                "url": "https://matungulu-girls.vercel.app",
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
        name: 'Copy Link', 
        icon: <FiShare2 />, 
        color: 'bg-emerald-600', 
        action: handleCopy 
      },
    ];

    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setShowShareModal(false)} />
        
        <div className="relative bg-white w-full max-w-sm rounded-lg shadow-3xl overflow-hidden animate-in zoom-in-95 duration-200">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Share Profile</h3>
                <p className="text-xs text-slate-500">Share this staff profile</p>
              </div>
              <button onClick={() => setShowShareModal(false)} className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors">
                <FiX size={16} />
              </button>
            </div>

            <div className="space-y-2">
              {channels.map((ch) => (
                <a 
                  key={ch.name}
                  href={ch.link || '#'}
                  target={ch.link ? "_blank" : "_self"}
                  onClick={ch.action}
                  className="flex items-center gap-3 p-3 rounded-lg border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50 transition-colors"
                >
                  <div className={`w-10 h-10 ${ch.color} rounded-lg flex items-center justify-center text-white text-lg`}>
                    {ch.icon}
                  </div>
                  <span className="flex-1 font-medium text-slate-700">{ch.name}</span>
                  {ch.name === 'Copy Link' && copied && (
                    <span className="text-xs text-emerald-600">Copied!</span>
                  )}
                </a>
              ))}
            </div>
          </div>
          
          <div className="bg-slate-50 p-4 border-t border-slate-100">
            <p className="text-xs text-center text-slate-400">Matungulu Girls High School • Strive to Excel</p>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
        <div className="relative mb-8">
          <div className="w-20 h-20 bg-emerald-100 rounded-xl flex items-center justify-center">
            <FaGraduationCap className="text-emerald-700 text-3xl animate-pulse" />
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Loading Profile</h2>
          <div className="flex items-center justify-center gap-1">
            {[0, 1, 2].map((i) => (
              <div key={i} className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.1}s` }} />
            ))}
          </div>
          <p className="text-xs text-slate-400 mt-2">Matungulu Girls High School</p>
        </div>
      </div>
    );
  }

  if (error || !staff) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <FaUserTie className="text-2xl text-red-600" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Profile Unavailable</h2>
          <p className="text-slate-600 mb-6">Unable to retrieve this staff member's profile.</p>
          <button 
            onClick={() => router.push('/pages/staff')}
            className="px-6 py-2.5 bg-emerald-600 text-white rounded-lg font-medium text-sm"
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
      <div className="min-h-screen bg-white">
        
        {/* Header */}
        <div className="bg-white border-b border-slate-200 sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            <button
              onClick={() => router.push('/pages/staff')}
              className="flex items-center gap-2 text-slate-600 hover:text-emerald-600 transition-colors"
            >
              <FiArrowLeft size={18} />
              <span className="text-sm font-medium hidden sm:block">Back to Directory</span>
            </button>
            
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                <IoSchoolOutline className="text-emerald-700 text-sm" />
              </div>
              <span className="font-bold text-slate-800 text-sm hidden sm:block">Matungulu Girls High School</span>
            </div>

            <div className="flex gap-2">
              <button 
                onClick={() => setShowShareModal(true)}
                className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-slate-600 hover:bg-emerald-100 hover:text-emerald-600 transition-colors"
                title="Share Profile"
              >
                <FiShare2 size={14} />
              </button>
              <button 
                onClick={() => window.print()}
                className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-slate-600 hover:bg-emerald-100 hover:text-emerald-600 transition-colors"
                title="Print Profile"
              >
                <FiPrinter size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-6">
          
          {/* Profile Card */}
          <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
            
            {/* Header with Pattern */}
            <div className="relative h-24 bg-gradient-to-r from-emerald-900 to-teal-800">
              <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:20px_20px]" />
              <div className="absolute top-2 right-3 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20">
                <span className="text-white text-xs font-medium">Matungulu Girls High School</span>
              </div>
            </div>
            
            {/* Profile Content */}
            <div className="relative px-4 pb-6">
              
              {/* Profile Image */}
              <div className="relative -mt-12 mb-4 flex items-end justify-between">
                <div className="relative flex items-center gap-4">
                  <div className="relative shrink-0">
                    <div className="w-20 h-20 rounded-lg border-4 border-white shadow-lg overflow-hidden bg-white">
                      <Image
                        src={staff.image || '/male.png'}
                        alt={staff.name}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                        priority
                      />
                    </div>
                    <div className="absolute -bottom-1 -right-1">
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-full w-full bg-green-500 border border-white"></span>
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <h1 className="text-lg font-bold text-slate-900">{staff.name}</h1>
                    <p className="text-sm text-emerald-600 font-medium">{staff.position}</p>
                  </div>
                </div>
              </div>

              {/* Quote */}
              {staff.quote && (
                <div className="mb-4 p-3 bg-emerald-50 rounded-lg border-l-3 border-emerald-600">
                  <p className="text-sm text-slate-700 italic">"{staff.quote}"</p>
                </div>
              )}

              {/* Bio */}
              <p className="text-sm text-slate-600 leading-relaxed mb-5 border-l-2 border-emerald-200 pl-3 py-1">
                {staff.bio}
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
                <div className="bg-slate-50 rounded-lg p-3">
                  <FiCalendar className="text-emerald-600 mb-1" size={16} />
                  <p className="text-lg font-bold text-slate-900">{staff.joinDate}</p>
                  <p className="text-[10px] text-slate-500 uppercase">Joined</p>
                </div>
                
                <div className="bg-slate-50 rounded-lg p-3">
                  <FiStar className="text-emerald-600 mb-1" size={16} />
                  <p className="text-lg font-bold text-slate-900">{staff.expertise?.length || 0}</p>
                  <p className="text-[10px] text-slate-500 uppercase">Expertise</p>
                </div>
                
                <div className="bg-slate-50 rounded-lg p-3">
                  <FiBriefcase className="text-emerald-600 mb-1" size={16} />
                  <p className="text-lg font-bold text-slate-900">{staff.responsibilities?.length || 0}</p>
                  <p className="text-[10px] text-slate-500 uppercase">Roles</p>
                </div>
                
                <div className="bg-slate-50 rounded-lg p-3">
                  <FiAward className="text-emerald-600 mb-1" size={16} />
                  <p className="text-lg font-bold text-slate-900">{staff.achievements?.length || 0}</p>
                  <p className="text-[10px] text-slate-500 uppercase">Awards</p>
                </div>
              </div>

              {/* Main Content Grid */}
              <div className="grid lg:grid-cols-2 gap-5">
                
                {/* Left Column */}
                <div className="space-y-5">
                  
                  {/* Expertise */}
                  <div>
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <span className="w-4 h-0.5 bg-emerald-400 rounded-full"></span>
                      Areas of Expertise
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {staff.expertise?.map((item, i) => (
                        <span key={i} className="px-3 py-1.5 bg-white text-slate-700 text-xs rounded-lg border border-slate-200">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Skills */}
                  {staff.skills && staff.skills.length > 0 && (
                    <div>
                      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                        <span className="w-4 h-0.5 bg-emerald-400 rounded-full"></span>
                        Professional Skills
                      </h3>
                      <div className="flex flex-wrap gap-1.5">
                        {staff.skills.slice(0, 4).map((skill, i) => (
                          <span key={i} className="px-3 py-1.5 bg-emerald-50 text-emerald-700 text-xs rounded-lg border border-emerald-200">
                            {skill.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Column */}
                <div className="space-y-5">
                  
                  {/* Responsibilities */}
                  <div>
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <span className="w-4 h-0.5 bg-emerald-400 rounded-full"></span>
                      Key Responsibilities
                    </h3>
                    <div className="space-y-1.5">
                      {staff.responsibilities?.map((item, i) => (
                        <div key={i} className="flex items-start gap-2 p-2 bg-slate-50 rounded-lg">
                          <div className="w-4 h-4 bg-emerald-100 rounded flex items-center justify-center text-emerald-600 shrink-0 mt-0.5">
                            <FiCheckCircle size={10} />
                          </div>
                          <span className="text-xs text-slate-600">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Achievements */}
                  <div>
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <span className="w-4 h-0.5 bg-emerald-400 rounded-full"></span>
                      Notable Achievements
                    </h3>
                    <div className="space-y-1.5">
                      {staff.achievements?.map((item, i) => (
                        <div key={i} className="bg-white border border-amber-100 rounded-lg p-2">
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 bg-amber-100 rounded flex items-center justify-center text-amber-600 font-bold text-[10px]">
                              {i + 1}
                            </div>
                            <span className="text-xs text-slate-600">{item}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer Contact Bar */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-3">
                  {staff.email && (
                    <a href={`mailto:${staff.email}`} className="flex items-center gap-1.5 text-slate-600 hover:text-emerald-600 transition-colors text-xs">
                      <FiMail size={14} />
                      <span className="hidden sm:inline">{staff.email}</span>
                      <span className="sm:hidden">Email</span>
                    </a>
                  )}
                  {staff.phone && (
                    <a href={`tel:${staff.phone}`} className="flex items-center gap-1.5 text-slate-600 hover:text-emerald-600 transition-colors text-xs">
                      <FiPhone size={14} />
                      <span className="hidden sm:inline">{staff.phone}</span>
                      <span className="sm:hidden">Call</span>
                    </a>
                  )}
                </div>
                <div className="flex items-center gap-2 text-[10px] text-slate-400">
                  <span>Matungulu Girls High School</span>
                  <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                  <span>Strive to Excel</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-8 border-t border-slate-100 bg-white py-6">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col items-center justify-center space-y-4">
              
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mb-3">
                  <FaGraduationCap className="text-emerald-700 text-lg" />
                </div>
                <h4 className="font-bold text-slate-900 text-sm">Matungulu Girls High School</h4>
                <p className="text-xs text-slate-500 mt-1">Strive to Excel</p>
              </div>

              <div className="flex items-center gap-4 text-xs text-slate-400">
                <p>Professional Staff Directory</p>
                <div className="w-1 h-1 bg-slate-300 rounded-full" />
                <p>© {new Date().getFullYear()}</p>
              </div>

              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="px-4 py-2 rounded-full border border-slate-200 text-slate-500 text-xs font-medium hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-colors"
              >
                Back to Top
              </button>
            </div>
          </div>
        </footer>
      </div>

      <ShareModal />
    </>
  );
}
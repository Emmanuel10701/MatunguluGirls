'use client';
import { useState, useEffect } from 'react';
import { 
  FiMail, 
  FiPhone, 
  FiAward,
  FiBookOpen,
  FiBriefcase,
  FiUsers,
  FiStar,
  FiChevronRight,
  FiMapPin,
  FiCalendar,
  FiShield,
  FiUser,
  FiCheck,
  FiMenu,
  FiX,
  FiArrowLeft,
  FiHeart,
  FiClock,
  FiGlobe,
  FiLinkedin,
  FiTwitter,
  FiTrendingUp
} from 'react-icons/fi';
import { 
  Loader2,
  GraduationCap,
  Target,
  Trophy,
  Users,
  BookOpen,
  Crown,
  Medal,
  Building2,
  Layers,
  Sparkles,
  Shield
} from "lucide-react";

// Helper function for image URLs
const getImageUrl = (imagePath) => {
  if (!imagePath || typeof imagePath !== 'string') {
    return null;
  }
  
  const trimmedPath = imagePath.trim();
  if (!trimmedPath) {
    return null;
  }
  
  if (trimmedPath.includes('cloudinary.com')) {
    return trimmedPath;
  }
  
  if (trimmedPath.startsWith('/') || trimmedPath.startsWith('http')) {
    return trimmedPath;
  }
  
  if (trimmedPath.startsWith('data:image')) {
    return trimmedPath;
  }
  
  return trimmedPath;
};

const ModernStaffLeadership = () => {
  const [staff, setStaff] = useState([]);
  const [principal, setPrincipal] = useState(null);
  const [featuredStaff, setFeaturedStaff] = useState(null);
  const [academicsDeputy, setAcademicsDeputy] = useState(null);
  const [adminDeputy, setAdminDeputy] = useState(null);
  const [teachers, setTeachers] = useState([]);
  const [supportStaff, setSupportStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [viewMode, setViewMode] = useState('principal');
  const [activeTab, setActiveTab] = useState('featured');

  // Check for mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Fetch staff data from API
  useEffect(() => {
    const fetchStaff = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/staff');
        const data = await response.json();

        if (data.success && Array.isArray(data.staff)) {
          const allStaff = data.staff;
          setStaff(allStaff);

          // Find Principal (Priority 1)
          const foundPrincipal = allStaff.find(s => 
            s.id === 1 || 
            s.position?.toLowerCase().includes('chief principal') || 
            s.role?.toLowerCase().includes('principal') ||
            s.position?.toLowerCase() === 'principal'
          ) || allStaff[0];

          setPrincipal(foundPrincipal);
          setFeaturedStaff(foundPrincipal);

          // Find Deputies (Priority 2)
          const allDeputies = allStaff.filter(s => 
            s.role?.toLowerCase().includes('deputy') || 
            s.position?.toLowerCase().includes('deputy')
          );

          const foundAcademicsDeputy = allDeputies.find(s => 
            s.position?.toLowerCase().includes('academics') ||
            s.department?.toLowerCase().includes('academics')
          );

          const foundAdminDeputy = allDeputies.find(s => 
            s.position?.toLowerCase().includes('admin') || 
            s.position?.toLowerCase().includes('administration')
          );

          setAcademicsDeputy(foundAcademicsDeputy || null);
          setAdminDeputy(foundAdminDeputy || null);

          // Find Teachers (Priority 3)
          const allTeachers = allStaff.filter(s => 
            (s.role?.toLowerCase().includes('teacher') || 
            s.position?.toLowerCase().includes('teacher')) &&
            !s.role?.toLowerCase().includes('principal') &&
            !s.role?.toLowerCase().includes('deputy')
          );
          setTeachers(allTeachers);

          // Find Support Staff (Priority 4 - everything else)
          const allSupportStaff = allStaff.filter(s => 
            !s.role?.toLowerCase().includes('principal') &&
            !s.role?.toLowerCase().includes('deputy') &&
            !s.role?.toLowerCase().includes('teacher') &&
            !s.position?.toLowerCase().includes('principal') &&
            !s.position?.toLowerCase().includes('deputy') &&
            !s.position?.toLowerCase().includes('teacher')
          );
          setSupportStaff(allSupportStaff);

        } else {
          throw new Error('Format error: Expected successful staff array');
        }
      } catch (err) {
        console.error('Fetch Error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStaff();
  }, []);

  // Handle staff click
  const handleStaffClick = (staffMember) => {
    if (principal?.id === staffMember.id) {
      setViewMode('principal');
    } else {
      setViewMode('other');
    }
    setFeaturedStaff(staffMember);
    
    // Scroll main card into view on mobile
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setTimeout(() => {
        const mainCard = document.querySelector('.lg\\:col-span-8');
        if (mainCard) {
          const rect = mainCard.getBoundingClientRect();
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          window.scrollTo({ top: rect.top + scrollTop - 80, behavior: 'smooth' });
        }
      }, 100);
    }
  };

  // Return to principal view
  const returnToPrincipal = () => {
    setFeaturedStaff(principal);
    setViewMode('principal');
    
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setTimeout(() => {
        const mainCard = document.querySelector('.lg\\:col-span-8');
        if (mainCard) {
          const rect = mainCard.getBoundingClientRect();
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          window.scrollTo({ top: rect.top + scrollTop - 80, behavior: 'smooth' });
        }
      }, 100);
    }
  };

  // Format phone number
  const formatPhone = (phone) => {
    if (!phone) return 'N/A';
    return phone;
  };

  // Get role badge with emerald/dark green theme
  const getRoleBadge = (role) => {
    if (!role) return { 
      bg: 'bg-emerald-100', 
      text: 'text-emerald-800', 
      border: 'border-emerald-200',
      icon: <FiUser className="w-3 h-3 text-emerald-600" />
    };
    
    const roleLower = role.toLowerCase();
    if (roleLower.includes('principal')) {
      return { 
        bg: 'bg-gradient-to-r from-emerald-900 to-teal-800', 
        text: 'text-white', 
        border: 'border-emerald-700',
        icon: <Crown className="w-3 h-3 text-yellow-300" />
      };
    }
    if (roleLower.includes('deputy')) {
      return { 
        bg: 'bg-gradient-to-r from-teal-700 to-emerald-700', 
        text: 'text-white', 
        border: 'border-teal-600',
        icon: <Medal className="w-3 h-3 text-yellow-200" />
      };
    }
    if (roleLower.includes('teacher')) {
      return { 
        bg: 'bg-gradient-to-r from-emerald-600 to-teal-600', 
        text: 'text-white', 
        border: 'border-emerald-500',
        icon: <BookOpen className="w-3 h-3 text-white" />
      };
    }
    return { 
      bg: 'bg-gradient-to-r from-emerald-800 to-teal-700', 
      text: 'text-white', 
      border: 'border-emerald-600',
      icon: <Users className="w-3 h-3 text-white" />
    };
  };

// Simplified but elegant spinner
if (loading) {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-b from-emerald-900/5 to-transparent">
      <div className="text-center space-y-6 max-w-sm mx-auto px-6">
        
        {/* Animated Spinner with Rings */}
        <div className="relative flex justify-center">
          {/* Outer glow */}
          <div className="absolute inset-0 rounded-full bg-emerald-400 opacity-20 animate-ping"></div>
          <div className="absolute inset-0 rounded-full bg-emerald-500 opacity-10 animate-pulse"></div>
          
          {/* Double ring spinner */}
          <div className="relative w-24 h-24">
            {/* Static background ring */}
            <div className="absolute inset-0 rounded-full border-4 border-emerald-100"></div>
            
            {/* Spinning foreground ring */}
            <div className="absolute inset-0 rounded-full border-4 border-t-emerald-600 border-r-emerald-600 border-b-transparent border-l-transparent animate-spin"></div>
            
            {/* Center icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <FiHeart className="w-10 h-10 text-emerald-600" />
            </div>
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-3">
          <h3 className="text-2xl font-black text-emerald-900 tracking-tight">
            Matungulu Girls
          </h3>
          
          <p className="text-base font-bold text-emerald-700 animate-pulse">
            Loading Staff Directory
          </p>
          
          {/* Loading dots with staggered animation */}
          <div className="flex justify-center gap-2 mt-4">
            <div className="w-2.5 h-2.5 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2.5 h-2.5 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2.5 h-2.5 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>

          {/* Loading message */}
          <p className="text-sm font-medium text-emerald-600/70 mt-6 animate-pulse">
            Meet our dedicated team...
          </p>

          {/* School motto */}
          <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider mt-8">
            "Strive to Excel"
          </p>
        </div>
      </div>
    </div>
  );
}

  // Error state
  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-gradient-to-b from-red-50 to-orange-50">
        <div className="text-center max-w-md mx-auto p-8 bg-white rounded-2xl shadow-xl border border-red-100">
          <Shield className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-red-700 mb-2">Error Loading Data</h3>
          <p className="text-slate-600 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-gradient-to-r from-emerald-700 to-teal-700 text-white font-bold rounded-xl hover:from-emerald-800 hover:to-teal-800 transition-all shadow-lg shadow-emerald-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // No data state
  if (!featuredStaff || !principal) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-gradient-to-b from-slate-50 to-white">
        <div className="text-center p-8">
          <Users className="w-16 h-16 text-emerald-600 mx-auto mb-4 opacity-50" />
          <h3 className="text-xl font-bold text-slate-900 mb-2">No Staff Data Available</h3>
          <p className="text-slate-600">Please check back later.</p>
        </div>
      </div>
    );
  }

  const leadershipTeam = [principal, academicsDeputy, adminDeputy, ...teachers.slice(0, 2)].filter(Boolean);

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-teal-50 font-sans">
      
      {/* Header - Matching navbar gradient */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-800 to-slate-900 pt-16 pb-24 relative overflow-hidden">
        {/* Decorative Pattern */}
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:40px_40px]" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-6 sm:py-12">
          {/* Balanced Badge - Smaller on mobile */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 sm:px-4 sm:py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-4 sm:mb-6">
            <Sparkles className="w-3 h-3 sm:w-4 text-emerald-300" />
            <span className="text-white text-[10px] sm:text-xs font-bold tracking-wider uppercase">
              Our Dedicated Team
            </span>
          </div>
          
          {/* Balanced Title - Drastically reduced for XS screens */}
          <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-3 tracking-tight leading-tight">
            School Leadership <br className="sm:hidden" /> & Staff
          </h1>
          
          {/* Balanced Paragraph - Smaller text and narrower width on mobile */}
          <p className="text-xs sm:text-base md:text-lg text-emerald-100 max-w-xl sm:max-w-3xl mx-auto font-light leading-relaxed px-4">
            Meet the passionate educators and administrators committed to excellence at Matungulu Girls High School
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 pb-20">
        {/* Tabs */}
        <div className="flex justify-center mb-6 px-4">
          <div className="inline-flex p-1 bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg border border-emerald-100 w-full max-w-[320px] sm:max-w-none sm:w-auto">
            <button
              onClick={() => setActiveTab('featured')}
              className={`flex-1 sm:flex-none px-3 py-2 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl text-[11px] sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'featured'
                  ? 'bg-gradient-to-r from-emerald-800 to-teal-700 text-white shadow-md'
                  : 'text-slate-600 hover:text-emerald-700'
              }`}
            >
              <Crown className="w-3.5 h-3.5 sm:w-4" />
              Leadership
            </button>
            <button
              onClick={() => setActiveTab('all')}
              className={`flex-1 sm:flex-none px-3 py-2 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl text-[11px] sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'all'
                  ? 'bg-gradient-to-r from-emerald-800 to-teal-700 text-white shadow-md'
                  : 'text-slate-600 hover:text-emerald-700'
              }`}
            >
              <Users className="w-3.5 sm:w-4 h-4" />
              All Staff
            </button>
          </div>
        </div>

        {activeTab === 'featured' ? (
          <>
            {/* Main Grid - Same structure as original but with emerald theme */}
            <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 items-start">
              
              {/* Featured Hero Card */}
              <div id="featured-staff-card" className="lg:col-span-8 w-full mx-auto flex flex-col bg-white rounded-2xl shadow-2xl border border-emerald-100 overflow-hidden">
                
                {/* Image Section */}
                <div className="relative h-[60vh] sm:h-[65vh] lg:h-[70vh] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 to-teal-900/20 z-10"></div>
                  
                  {getImageUrl(featuredStaff?.image) ? (
                    <img
                      src={getImageUrl(featuredStaff.image)}
                      alt={featuredStaff?.name}
                      className="w-full h-full object-cover object-top"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(featuredStaff?.name || 'Staff')}&background=2d6a4f&color=fff&bold=true&size=256`;
                      }}
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-800 to-teal-800 flex items-center justify-center">
                      <GraduationCap className="w-24 h-24 text-white/30" />
                    </div>
                  )}
                  
                  {/* Floating Role Badge */}
                  <div className="absolute top-6 left-6 z-20">
                    <div className="px-4 py-2 bg-emerald-900/90 backdrop-blur-sm rounded-full border border-emerald-600">
                      <span className="text-white text-sm font-bold flex items-center gap-2">
                        {getRoleBadge(featuredStaff?.role).icon}
                        {featuredStaff?.position || featuredStaff?.role || 'Staff Member'}
                        {viewMode === 'other' && ' (Viewing)'}
                      </span>
                    </div>
                  </div>
                  
                  {/* Overlay Content */}
                  <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 md:p-8 lg:p-10 bg-gradient-to-t from-black/90 via-black/30 to-transparent">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-2">
                      {featuredStaff?.name}
                    </h2>
                    
                    <div className="flex flex-wrap items-center gap-3 text-white/80">
                      {featuredStaff?.department && (
                        <span className="flex items-center gap-1.5 text-sm">
                          <Building2 className="w-4 h-4 text-emerald-400" />
                          {featuredStaff.department}
                        </span>
                      )}
                      {featuredStaff?.phone && (
                        <>
                          <span className="w-1 h-1 bg-emerald-400 rounded-full"></span>
                          <a href={`tel:${featuredStaff.phone}`} className="flex items-center gap-1.5 text-sm hover:text-white">
                            <FiPhone className="w-4 h-4 text-emerald-400" />
                            {formatPhone(featuredStaff.phone)}
                          </a>
                        </>
                      )}
                    </div>

                    {/* Back to Principal Button - Show when viewing other staff */}
                    {viewMode === 'other' && (
                      <button
                        onClick={returnToPrincipal}
                        className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-xl text-white text-sm hover:bg-white/30 transition-all w-fit border border-white/30"
                      >
                        <FiArrowLeft className="w-4 h-4" />
                        Back to Principal
                      </button>
                    )}
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex-grow p-6 md:p-8 bg-white">
                  <div className="grid lg:grid-cols-5 gap-6">
                    
                    {/* Left Column - Bio */}
                    <div className="lg:col-span-3 space-y-6">
                      <div>
                        <h4 className="text-sm font-black text-emerald-700 uppercase tracking-wider mb-3 flex items-center gap-2">
                          <FiUser className="text-emerald-600" /> Professional Biography
                        </h4>
                        <p className="text-slate-600 leading-relaxed">
                          {featuredStaff?.bio || `${featuredStaff?.name} is a dedicated member of our school's ${featuredStaff?.role || 'team'} with a passion for education and student development.`}
                        </p>
                      </div>

                      {featuredStaff?.quote && (
                        <div className="relative p-5 bg-gradient-to-r from-emerald-50 to-teal-50 border-l-4 border-emerald-700 rounded-r-xl">
                          <p className="text-slate-700 italic font-medium">"{featuredStaff.quote}"</p>
                        </div>
                      )}

                      {featuredStaff?.expertise && featuredStaff.expertise.length > 0 && (
                        <div>
                          <h4 className="text-sm font-black text-emerald-700 uppercase tracking-wider mb-3 flex items-center gap-2">
                            <Target className="w-4 h-4" /> Areas of Expertise
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {featuredStaff.expertise.slice(0, 4).map((skill, idx) => (
                              <span key={idx} className="px-3 py-1.5 bg-white border border-emerald-200 text-emerald-700 text-xs font-bold rounded-lg">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Right Column - Details */}
                    <div className="lg:col-span-2 space-y-6">
                      {featuredStaff?.responsibilities && featuredStaff.responsibilities.length > 0 && (
                        <div>
                          <h4 className="text-sm font-black text-emerald-700 uppercase tracking-wider mb-3 flex items-center gap-2">
                            <FiBriefcase /> Key Responsibilities
                          </h4>
                          <ul className="space-y-2">
                            {featuredStaff.responsibilities.slice(0, 5).map((item, i) => (
                              <li key={i} className="text-sm text-slate-700 flex items-start gap-2">
                                <div className="w-1.5 h-1.5 mt-2 rounded-full bg-emerald-600 flex-shrink-0"></div>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Achievements */}
                      <div className="pt-4 border-t border-emerald-100">
                        <h4 className="text-sm font-black text-emerald-700 uppercase tracking-wider mb-3 flex items-center gap-2">
                          <Trophy className="w-4 h-4" /> Notable Achievements
                        </h4>
                        <ul className="space-y-2">
                          {(featuredStaff?.achievements && featuredStaff.achievements.length > 0) ? (
                            featuredStaff.achievements.slice(0, 3).map((item, i) => (
                              <li key={i} className="text-sm text-slate-700 flex items-start gap-2">
                                <Medal className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                                <span>{item}</span>
                              </li>
                            ))
                          ) : (
                            <li className="text-sm text-slate-500 italic">Contributing to educational excellence</li>
                          )}
                        </ul>
                      </div>

                      {/* Contact Card */}
                      <div className="bg-gradient-to-br from-emerald-900 to-teal-800 rounded-xl p-5 text-white">
                        <h4 className="text-sm font-bold mb-3 flex items-center gap-2">
                          <FiMail className="text-emerald-300" /> Contact Information
                        </h4>
                        <div className="space-y-3">
                          {featuredStaff?.email && (
                            <a href={`mailto:${featuredStaff.email}`} className="flex items-center gap-2 text-sm hover:text-emerald-300 transition-colors">
                              <FiMail className="w-4 h-4 text-emerald-300" />
                              <span className="truncate">{featuredStaff.email}</span>
                            </a>
                          )}
                          {featuredStaff?.phone && (
                            <a href={`tel:${featuredStaff.phone}`} className="flex items-center gap-2 text-sm hover:text-emerald-300 transition-colors">
                              <FiPhone className="w-4 h-4 text-emerald-300" />
                              <span>{formatPhone(featuredStaff.phone)}</span>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar Cards */}
              <div className="lg:col-span-4 space-y-4 mt-4 lg:mt-0">
                
                {/* Leadership Cards */}
                {leadershipTeam.map((member) => {
                  const isActive = featuredStaff?.id === member.id;
                  const badge = getRoleBadge(member.role);
                  
                  return (
                    <button
                      key={member.id}
                      onClick={() => handleStaffClick(member)}
                      className={`w-full group relative bg-white rounded-xl p-4 shadow-lg border-2 transition-all duration-300 text-left ${
                        isActive 
                          ? 'border-emerald-700 bg-gradient-to-r from-emerald-50 to-white scale-[1.02]' 
                          : 'border-emerald-100 hover:border-emerald-300 hover:shadow-xl'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="relative w-16 h-16 flex-shrink-0 rounded-xl overflow-hidden">
                          {member.image ? (
                            <img
                              src={getImageUrl(member.image)}
                              alt={member.name}
                              className="w-full h-full object-cover object-top"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=2d6a4f&color=fff&bold=true&size=64`;
                              }}
                            />
                          ) : (
                            <div className={`w-full h-full ${badge.bg} flex items-center justify-center`}>
                              <Users className="w-8 h-8 text-white" />
                            </div>
                          )}
                        </div>
                        
                        <div className="flex-grow">
                          <div className="flex items-center justify-between mb-1">
                            <span className={`px-2 py-1 ${badge.bg} ${badge.text} text-[10px] font-bold uppercase tracking-wider rounded-full`}>
                              {member.role?.split(' ')[0] || 'Staff'}
                            </span>
                            {isActive && (
                              <span className="flex items-center gap-1 text-emerald-700 text-xs font-bold">
                                <FiCheck className="text-xs" /> Viewing
                              </span>
                            )}
                          </div>
                          <h3 className="font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                            {member.name}
                          </h3>
                          <p className="text-slate-500 text-xs mt-1 line-clamp-1">
                            {member.position || member.department}
                          </p>
                          <div className="flex items-center gap-1 text-xs text-emerald-700 mt-2 font-bold">
                            View Profile <FiChevronRight className="group-hover:translate-x-0.5 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}

                {/* Stats Card */}
                <div className="bg-gradient-to-br from-emerald-900 to-teal-800 rounded-xl p-6 text-white shadow-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-white/20 rounded-xl">
                      <Users className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider opacity-90">Staff Overview</p>
                      <p className="text-2xl font-black">{staff.length} Team Members</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span className="text-sm opacity-90">Leadership</span>
                      <span className="font-bold">
                        {[principal, academicsDeputy, adminDeputy].filter(Boolean).length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm opacity-90">Teaching Staff</span>
                      <span className="font-bold">{teachers.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm opacity-90">Support Staff</span>
                      <span className="font-bold">{supportStaff.length}</span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => setActiveTab('all')}
                    className="w-full py-3 bg-white/20 hover:bg-white/30 rounded-xl font-bold text-sm transition-colors flex items-center justify-center gap-2"
                  >
                    View All Staff
                    <FiChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* All Staff Grid View - With Proper Hierarchy */
          <div className="space-y-8">
            
            {/* Principal Section */}
            {principal && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 px-2">
                  <Crown className="w-5 h-5 text-emerald-700" />
                  <h3 className="text-sm font-black text-emerald-800 uppercase tracking-wider">School Principal</h3>
                  <div className="h-px flex-1 bg-gradient-to-r from-emerald-200 to-transparent"></div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  <button
                    key={principal.id}
                    onClick={() => {
                      handleStaffClick(principal);
                      setActiveTab('featured');
                    }}
                    className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1 border-2 border-emerald-700/30 relative"
                  >
                    {/* Principal Badge */}
                    <div className="absolute top-2 right-2 z-10">
                      <div className="px-2 py-0.5 bg-gradient-to-r from-emerald-900 to-teal-800 text-white text-[8px] font-bold rounded-full flex items-center gap-1">
                        <Crown className="w-3 h-3 text-yellow-300" />
                        PRINCIPAL
                      </div>
                    </div>
                    <div className="relative h-32 overflow-hidden bg-gradient-to-br from-emerald-900 to-teal-800">
                      {principal.image ? (
                        <img
                          src={getImageUrl(principal.image)}
                          alt={principal.name}
                          className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(principal.name)}&background=2d6a4f&color=fff&bold=true&size=64`;
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <GraduationCap className="w-8 h-8 text-white/70" />
                        </div>
                      )}
                    </div>
                    <div className="p-3 bg-gradient-to-r from-emerald-50 to-white">
                      <h4 className="font-bold text-slate-900 text-sm truncate">{principal.name}</h4>
                      <p className="text-xs text-emerald-700 font-medium truncate">{principal.position || 'Principal'}</p>
                    </div>
                  </button>
                </div>
              </div>
            )}

            {/* Deputy Principals Section */}
            {(academicsDeputy || adminDeputy) && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 px-2">
                  <Medal className="w-5 h-5 text-teal-600" />
                  <h3 className="text-sm font-black text-teal-700 uppercase tracking-wider">Deputy Principals</h3>
                  <div className="h-px flex-1 bg-gradient-to-r from-teal-200 to-transparent"></div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {[academicsDeputy, adminDeputy].filter(Boolean).map((deputy) => (
                    <button
                      key={deputy.id}
                      onClick={() => {
                        handleStaffClick(deputy);
                        setActiveTab('featured');
                      }}
                      className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1 border border-teal-200"
                    >
                      <div className="relative h-32 overflow-hidden bg-gradient-to-br from-teal-600 to-emerald-600">
                        {deputy.image ? (
                          <img
                            src={getImageUrl(deputy.image)}
                            alt={deputy.name}
                            className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(deputy.name)}&background=0d9488&color=fff&bold=true&size=64`;
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Users className="w-8 h-8 text-white/70" />
                          </div>
                        )}
                        {/* Deputy Badge */}
                        <div className="absolute top-2 right-2">
                          <div className="px-2 py-0.5 bg-gradient-to-r from-teal-700 to-emerald-700 text-white text-[8px] font-bold rounded-full">
                            {deputy.position?.includes('Academics') ? 'ACADEMICS' : 'ADMIN'}
                          </div>
                        </div>
                      </div>
                      <div className="p-3">
                        <h4 className="font-bold text-slate-900 text-sm truncate">{deputy.name}</h4>
                        <p className="text-xs text-slate-500 truncate">{deputy.position || 'Deputy Principal'}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Teachers Section */}
            {teachers.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 px-2">
                  <BookOpen className="w-5 h-5 text-emerald-600" />
                  <h3 className="text-sm font-black text-emerald-700 uppercase tracking-wider">Teaching Staff</h3>
                  <div className="h-px flex-1 bg-gradient-to-r from-emerald-200 to-transparent"></div>
                  <span className="text-xs font-bold text-emerald-600">{teachers.length} Teachers</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {teachers.map((teacher) => {
                    const badge = getRoleBadge(teacher.role);
                    return (
                      <button
                        key={teacher.id}
                        onClick={() => {
                          handleStaffClick(teacher);
                          setActiveTab('featured');
                        }}
                        className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1 border border-emerald-100"
                      >
                        <div className="relative h-32 overflow-hidden bg-gradient-to-br from-emerald-100 to-teal-100">
                          {teacher.image ? (
                            <img
                              src={getImageUrl(teacher.image)}
                              alt={teacher.name}
                              className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(teacher.name)}&background=059669&color=fff&bold=true&size=64`;
                              }}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <BookOpen className="w-8 h-8 text-emerald-600/50" />
                            </div>
                          )}
                        </div>
                        <div className="p-3">
                          <h4 className="font-bold text-slate-900 text-sm truncate">{teacher.name}</h4>
                          <p className="text-xs text-slate-500 truncate mb-2">{teacher.subject || teacher.department || 'Teacher'}</p>
                          <div className={`inline-block px-2 py-0.5 ${badge.bg} ${badge.text} text-[8px] font-bold rounded-full`}>
                            TEACHER
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Support Staff Section */}
            {supportStaff.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 px-2">
                  <Users className="w-5 h-5 text-slate-600" />
                  <h3 className="text-sm font-black text-slate-700 uppercase tracking-wider">Support Staff</h3>
                  <div className="h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent"></div>
                  <span className="text-xs font-bold text-slate-600">{supportStaff.length} Members</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {supportStaff.map((member) => {
                    const badge = getRoleBadge(member.role);
                    return (
                      <button
                        key={member.id}
                        onClick={() => {
                          handleStaffClick(member);
                          setActiveTab('featured');
                        }}
                        className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1 border border-slate-200"
                      >
                        <div className="relative h-32 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
                          {member.image ? (
                            <img
                              src={getImageUrl(member.image)}
                              alt={member.name}
                              className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=64748b&color=fff&bold=true&size=64`;
                              }}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Users className="w-8 h-8 text-slate-500/50" />
                            </div>
                          )}
                        </div>
                        <div className="p-3">
                          <h4 className="font-bold text-slate-900 text-sm truncate">{member.name}</h4>
                          <p className="text-xs text-slate-500 truncate">{member.position || member.role || 'Staff'}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* If no staff at all */}
            {staff.length === 0 && (
              <div className="text-center py-12">
                <Users className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500">No staff members found</p>
              </div>
            )}
          </div>
        )}

        {/* Mobile Hint */}
        {isMobile && activeTab === 'featured' && (
          <div className="mt-6 text-center text-sm text-slate-500">
            Tap on any staff card to view their profile
          </div>
        )}
      </div>
    </div>
  );
};

export default ModernStaffLeadership;
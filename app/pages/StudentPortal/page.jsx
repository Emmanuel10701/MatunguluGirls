'use client';

import { useState, useEffect, useCallback } from 'react';
import { Toaster, toast } from 'sonner';
import StudentLoginModal from '../../components/studentloginmodel/page';
import NavigationSidebar from '../../components/studentportalcomponents/aside/page.jsx';
import ResultsView from '../../components/studentportalcomponents/result/page.jsx';
import ResourcesAssignmentsView from '../../components/studentportalcomponents/ass/page.jsx';
import GuidanceEventsView from '../../components/studentportalcomponents/session/page';
import LoadingScreen from '../../components/studentportalcomponents/loading/page';
import FeesView from '../../components/studentportalcomponents/feebalance/page';

import { 
  FaBell, FaBars, FaCalendar, FaBook, FaAward, FaDollarSign, 
  FaClock, FaChartLine, FaChartBar, FaFolder, FaComments,
  FaRocket, FaPalette, FaGem, FaChartPie, FaTrendingUp, FaCrown,
  FaLightbulb, FaBrain, FaHandshake, FaHeart, FaLock, FaGlobe, 
  FaArrowRight, FaFire, FaBolt, FaCalendarCheck, FaUserPlus, 
  FaUserCheck, FaRoute, FaDirections, FaQrcode, FaFingerprint, 
  FaIdCard, FaDesktop, FaWandMagic, FaUser, FaLeaf
} from 'react-icons/fa6';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

import { 
  FaHome, FaSearch, FaTimes, FaSync, FaExclamationCircle, 
  FaCircleExclamation, FaSparkles, FaCloudUpload, FaUserFriends, 
  FaQuestionCircle
} from 'react-icons/fa';
import { HiSparkles } from "react-icons/hi2";
import { FaCheckCircle } from "react-icons/fa6";
import { 
  FiMenu, FiX, FiRefreshCw, FiBookOpen,
  FiExternalLink, FiShield, FiExpand, FiCompress,
  FiMapPin, FiSmartphone, FiTablet, FiMail, FiPhone
} from 'react-icons/fi';
import { IoSchoolOutline, IoLeaf } from 'react-icons/io5';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

const responsiveStyles = `
@media (max-width: 768px) {
  .mobile-scroll-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .mobile-scroll-hide::-webkit-scrollbar {
    display: none;
  }
  
  .mobile-touch-friendly {
    min-height: 44px;
    min-width: 44px;
  }
  
  .mobile-text-truncate {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  
  .mobile-stack {
    flex-direction: column !important;
  }
  
  .mobile-compact {
    padding: 0.75rem !important;
    margin: 0.5rem !important;
  }
  
  .mobile-full-width {
    width: 100% !important;
    max-width: 100% !important;
  }
  
  .mobile-modal-fix {
    max-height: 80vh !important;
    margin: 1rem !important;
  }
}

@media (max-width: 640px) {
  .xs-text-sm {
    font-size: 0.875rem !important;
  }
  
  .xs-p-2 {
    padding: 0.5rem !important;
  }
  
  .xs-gap-2 {
    gap: 0.5rem !important;
  }
}

.mobile-contain {
  max-width: 100% !important;
  height: auto !important;
}
`;

function ModernStudentHeader({ 
  student, 
  searchTerm, 
  setSearchTerm, 
  onRefresh,
  onMenuToggle,
  isMenuOpen,
  currentView 
}) {
  
  const getInitials = (name) => {
    if (!name) return 'MG';
    return name
      .split(' ')
      .map(part => part.charAt(0).toUpperCase())
      .slice(0, 2)
      .join('');
  };

  const getGradientColor = (name) => {
    const char = name.trim().charAt(0).toUpperCase();
    const gradients = {
      A: "bg-gradient-to-r from-emerald-600 to-teal-600",
      B: "bg-gradient-to-r from-emerald-600 to-emerald-700",
      C: "bg-gradient-to-r from-emerald-500 to-teal-600",
      D: "bg-gradient-to-r from-teal-600 to-emerald-600",
      E: "bg-gradient-to-r from-emerald-700 to-teal-700",
      default: "bg-gradient-to-r from-emerald-600 to-teal-600"
    };
    return gradients[char] || gradients.default;
  };

  const getViewIcon = (view) => {
    switch(view) {
      case 'home': return <FaHome className="text-emerald-600" />;
      case 'results': return <FaChartBar className="text-emerald-600" />;
      case 'resources': return <FaFolder className="text-emerald-600" />;
      case 'guidance': return <FaComments className="text-emerald-600" />;
      case 'fees': return <FaDollarSign className="text-emerald-600" />;
      default: return <FaHome className="text-emerald-600" />;
    }
  };

  return (
    <>
      <style jsx global>{responsiveStyles}</style>
      <header className="bg-gradient-to-r from-white via-white to-emerald-50/30 border-b border-emerald-100/50 shadow-lg sticky top-0 z-30 backdrop-blur-sm bg-white/90">
        <div className="container mx-auto px-3 xs:px-4 sm:px-6">
          <div className="flex items-center justify-between h-14 sm:h-16 md:h-20">
            <div className="flex items-center gap-2 sm:gap-3 md:gap-5">
              <button
                onClick={onMenuToggle}
                className="lg:hidden p-2 sm:p-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 shadow-sm hover:shadow-md transition-all mobile-touch-friendly border border-emerald-200"
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMenuOpen ? 
                  <FaTimes className="text-emerald-700 w-4 h-4 sm:w-5 sm:h-5" /> : 
                  <FaBars className="text-emerald-700 w-4 h-4 sm:w-5 sm:h-5" />
                }
              </button>

              {student && (
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="relative group">
                    <div className={`absolute inset-0 ${getGradientColor(student.fullName)} rounded-full blur-md opacity-70 group-hover:opacity-100 transition-opacity`} />
                    <div className="relative w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center font-bold text-white text-base sm:text-lg md:text-xl bg-gradient-to-br from-emerald-700 to-teal-800 border-2 border-emerald-300 shadow-lg">
                      {getInitials(student.fullName)}
                    </div>
                  </div>

                  <div className="hidden xs:flex flex-col">
                    <p className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mobile-text-truncate max-w-[120px] sm:max-w-[160px] md:max-w-none">
                      {student.fullName}
                    </p>
                    <div className="flex items-center gap-1 sm:gap-2">
                      <span className="text-xs sm:text-sm text-gray-500 mobile-text-truncate max-w-[100px] sm:max-w-none">
                        {student.form} • {student.stream}
                      </span>
                      <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-emerald-500 rounded-full animate-pulse"></span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="lg:hidden flex items-center gap-2 sm:gap-3">
              <div className="p-2 sm:p-2.5 bg-emerald-100 rounded-xl shadow-sm">
                {getViewIcon(currentView)}
              </div>
              <div className="max-w-[140px] sm:max-w-none">
                <h1 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mobile-text-truncate">
                  {currentView === 'home' && 'Dashboard'}
                  {currentView === 'results' && 'Results'}
                  {currentView === 'resources' && 'Resources'}
                  {currentView === 'guidance' && 'Guidance'}
                  {currentView === 'fees' && 'Fee Balance'}
                </h1>
                <p className="text-xs text-gray-500 hidden sm:block">Matungulu Girls Portal</p>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

function ModernHomeView({ student, feeBalance, feeLoading, token }) {
  const stats = [
    { 
      label: 'Current Form', 
      value: `${student?.form || 'N/A'}`, 
      icon: <FaUser className="text-base sm:text-lg md:text-xl" />, 
      gradient: 'from-emerald-600 to-teal-600',
      bgGradient: 'from-emerald-50 to-teal-50'
    },
    { 
      label: 'Stream', 
      value: student?.stream || 'N/A', 
      icon: <FaBook className="text-base sm:text-lg md:text-xl" />, 
      gradient: 'from-emerald-600 to-emerald-700',
      bgGradient: 'from-emerald-50 to-emerald-100'
    },
    { 
      label: 'Admission No', 
      value: student?.admissionNumber || 'N/A', 
      icon: <FaAward className="text-base sm:text-lg md:text-xl" />, 
      gradient: 'from-teal-600 to-emerald-600',
      bgGradient: 'from-teal-50 to-emerald-50'
    },
    { 
      label: 'Academic Year', 
      value: new Date().getFullYear().toString(),
      icon: <FaCalendar className="text-base sm:text-lg md:text-xl" />, 
      gradient: 'from-emerald-700 to-teal-700',
      bgGradient: 'from-emerald-50 to-teal-50'
    },
  ];

  const quickActions = [
    {
      tab: 'learning',
      title: 'Learning Hub',
      description: 'Access all your academic learning tools in one place, including assignments, revision materials, notes, and other essential learning resources.',
      icon: <FiBookOpen className="text-lg sm:text-xl md:text-2xl" />,
      gradient: 'from-emerald-600 to-teal-600',
      bgGradient: 'from-emerald-50 to-teal-50',
      actions: ['View Assignments', 'Browse Learning Resources']
    },
    {
      tab: 'results',
      title: 'Results',
      description: 'Review your academic performance in detail by accessing both class-wide results and your personal examination results.',
      icon: <FaChartLine className="text-lg sm:text-xl md:text-2xl" />,
      gradient: 'from-emerald-600 to-emerald-700',
      bgGradient: 'from-emerald-50 to-emerald-100',
      actions: ['Class Results', 'My Results']
    },
    {
      tab: 'support',
      title: 'Student Support',
      description: 'Stay informed through access to guidance and counselling services, important school announcements, and upcoming events.',
      icon: <FaUserFriends className="text-lg sm:text-xl md:text-2xl" />,
      gradient: 'from-teal-600 to-emerald-600',
      bgGradient: 'from-teal-50 to-emerald-50',
      actions: ['Guidance & Counselling', 'School News & Events']
    }
  ];

  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8 mobile-scroll-hide">
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-700 via-emerald-800 to-teal-800 opacity-95"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black opacity-10"></div>
        <div className="relative p-4 sm:p-6 md:p-8 text-white">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 md:gap-5 mb-3 sm:mb-4 md:mb-6">
            <div className="p-3 sm:p-4 bg-white bg-opacity-20 rounded-xl sm:rounded-2xl backdrop-blur-sm w-fit">
              <FaRocket className="text-xl sm:text-2xl md:text-3xl" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold leading-tight">
                Welcome back, {student?.fullName?.split(" ")[0] || "Student"}! 🌿
              </h2>
              <p className="text-emerald-100 text-xs sm:text-sm md:text-base lg:text-lg mt-1 sm:mt-2 max-w-2xl">
                Ready to continue your learning journey? Check assignments, view results, and track progress.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4 mt-3 sm:mt-4 md:mt-6">
            <span className="inline-flex items-center gap-1 sm:gap-2 bg-white bg-opacity-20 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full backdrop-blur-sm text-xs sm:text-sm font-bold">
              <HiSparkles className="text-emerald-200 text-xs sm:text-sm md:text-base" />
              Active Student
            </span>
            <span className="inline-flex items-center gap-1 sm:gap-2 bg-white bg-opacity-20 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full backdrop-blur-sm text-xs sm:text-sm font-bold">
              <FaCalendarCheck className="text-emerald-200 text-xs sm:text-sm md:text-base" />
              Matungulu Girls
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-5">
        {stats.map((stat, index) => (
          <div key={index} className="group relative w-full">
            <div className={`hidden sm:block absolute inset-0 bg-gradient-to-r ${stat.gradient} rounded-lg sm:rounded-xl md:rounded-2xl blur-xl opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

            <div className="relative bg-white/95 sm:bg-white/90 md:bg-white/80 backdrop-blur-xs sm:backdrop-blur-sm md:backdrop-blur-xl rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl p-2.5 sm:p-3 md:p-4 lg:p-5 xl:p-6 border border-emerald-100/50 shadow-sm sm:shadow-md hover:shadow-md transition-all duration-300 overflow-hidden h-full">
              <div className="absolute -right-1.5 -top-1.5 sm:-right-2 sm:-top-2 md:-right-3 md:-top-3 lg:-right-4 lg:-top-4 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-emerald-50/30 to-transparent rounded-full opacity-40 md:opacity-50 group-hover:scale-100 transition-transform duration-500" />

              <div className="flex flex-col h-full">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1.5 sm:mb-2 md:mb-3 lg:mb-4">
                  <div className={`flex justify-center sm:justify-start p-1.5 sm:p-2 md:p-2.5 lg:p-3 bg-gradient-to-br ${stat.gradient} rounded-lg sm:rounded-xl md:rounded-2xl text-white shadow-xs sm:shadow-sm md:shadow-lg group-hover:scale-100 transition-transform duration-300 self-center sm:self-auto mb-1 sm:mb-0`}>
                    <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7">
                      {stat.icon}
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-center sm:items-end">
                    <span className="text-[7px] xs:text-[8px] sm:text-[9px] md:text-[10px] font-bold uppercase tracking-tight sm:tracking-wider text-gray-500 md:text-gray-400 text-center sm:text-right">
                      Current
                    </span>
                  </div>
                </div>

                <div className="mt-0.5 sm:mt-1 md:mt-2 flex-grow text-center sm:text-left">
                  <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-extrabold text-gray-900 tracking-tight leading-none sm:leading-tight">
                    {stat.value}
                  </h3>
                  <p className="text-[9px] sm:text-[10px] md:text-xs lg:text-sm font-medium text-gray-600 md:text-gray-500 mt-0.5 sm:mt-1">
                    {stat.label}
                  </p>
                </div>

                <div className="mt-1.5 sm:mt-2 md:mt-3 lg:mt-4 md:pt-2 lg:pt-3 border-t border-emerald-100 pt-1.5 sm:pt-2">
                  <div className="flex items-center justify-between">
                    <div className="hidden xs:flex -space-x-1 sm:-space-x-1.5 md:-space-x-2">
                      {[1, 2, 3].map((i) => (
                        <div 
                          key={i} 
                          className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 rounded-full border border-emerald-200 bg-emerald-50"
                        />
                      ))}
                    </div>
                    
                    <span className="text-[7px] sm:text-[8px] md:text-[10px] lg:text-[11px] font-medium text-gray-500 md:text-gray-400 italic truncate">
                      {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <FeesView student={student} token={token} />   
      
      <section className="mb-4 sm:mb-6 md:mb-8 lg:mb-10">
        <div className="mb-3 sm:mb-4 md:mb-6">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
            Student Dashboard
          </h2>
          <p className="mt-1 text-xs sm:text-sm md:text-base text-gray-600 max-w-3xl">
            Quick access to your learning resources, assignments, academic results, and student support services.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 md:gap-5 lg:gap-6">
          {quickActions.map((action, index) => (
            <div key={index} className="relative group mobile-full-width">
              <div className={`hidden sm:block absolute inset-0 bg-gradient-to-r ${action.gradient} rounded-2xl sm:rounded-3xl blur-2xl opacity-0 group-hover:opacity-10 transition-opacity`} />

              <div className="relative h-full bg-white rounded-xl sm:rounded-2xl lg:rounded-3xl border border-emerald-100/60 p-3 sm:p-4 md:p-5 lg:p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col mobile-full-width">
                <div className="flex items-start gap-2.5 sm:gap-3 md:gap-4 mb-2.5 sm:mb-3 md:mb-4">
                  <div className={`p-2.5 sm:p-3 md:p-3.5 rounded-xl sm:rounded-2xl bg-gradient-to-br ${action.gradient} text-white shadow-sm sm:shadow-md`}>
                    {action.icon}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 leading-tight mobile-text-truncate">
                      {action.title}
                    </h4>
                    <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm text-gray-500 mobile-text-truncate">
                      {action.tab === 'learning' && 'Assignments & materials'}
                      {action.tab === 'results' && 'Class & personal results'}
                      {action.tab === 'support' && 'Guidance, news & events'}
                    </p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed flex-1 mb-3 sm:mb-4 md:mb-5 line-clamp-3 sm:line-clamp-4">
                  {action.description}
                </p>

                <button className="mt-auto inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors mobile-touch-friendly">
                  <span>Explore</span>
                  <FaArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default function ModernStudentPortalPage() {
  const [student, setStudent] = useState(null);
  const [token, setToken] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(true);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [requiresContact, setRequiresContact] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [currentView, setCurrentView] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const router = useRouter();

  const [assignments, setAssignments] = useState([]);
  const [resources, setResources] = useState([]);
  const [studentResults, setStudentResults] = useState([]);
  const [feeBalance, setFeeBalance] = useState(null);
  
  const [assignmentsLoading, setAssignmentsLoading] = useState(false);
  const [resourcesLoading, setResourcesLoading] = useState(false);
  const [resultsLoading, setResultsLoading] = useState(false);
  const [feeLoading, setFeeLoading] = useState(false);

  const [assignmentsError, setAssignmentsError] = useState(null);
  const [resourcesError, setResourcesError] = useState(null);
  const [resultsError, setResultsError] = useState(null);
  const [feeError, setFeeError] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const savedToken = localStorage.getItem('student_token');
        if (!savedToken) {
          setShowLoginModal(true);
          setIsLoading(false);
          return;
        }

        const response = await fetch('/api/studentlogin', {
          headers: { 'Authorization': `Bearer ${savedToken}` }
        });

        const data = await response.json();

        if (data.success && data.authenticated) {
          setStudent(data.student);
          setToken(savedToken);
          setShowLoginModal(false);
          
          const logoutTimer = setTimeout(() => {
            toast.success('Your 2-hour session has expired. Please log in again.');
            handleLogout();
          }, 2 * 60 * 60 * 1000);

          return () => clearTimeout(logoutTimer);
        } else {
          handleLogout();
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        handleLogout();
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    if (student && token) {
      fetchAllData();
    }
  }, [student, token]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false);
      }
    };

    if (window.innerWidth < 1024) {
      setIsMenuOpen(false);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [currentView]);

  const fetchAllData = useCallback(async () => {
    if (!token) return;

    try {
      await Promise.all([
        fetchAssignments(),
        fetchResources(),
        fetchStudentResults(),
        fetchFeeBalance()
      ]);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load some data');
    }
  }, [token]);

  const fetchAssignments = async () => {
    setAssignmentsLoading(true);
    setAssignmentsError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/api/assignment?limit=100`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Cache-Control': 'no-cache'
        }
      });
      const data = await response.json();
      if (data.success) {
        setAssignments(data.assignments || []);
      } else {
        throw new Error(data.error || 'Failed to fetch assignments');
      }
    } catch (error) {
      setAssignmentsError(error.message);
      toast.error('Failed to load assignments');
    } finally {
      setAssignmentsLoading(false);
    }
  };

  const fetchResources = async () => {
    setResourcesLoading(true);
    setResourcesError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/api/resources?limit=100`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Cache-Control': 'no-cache'
        }
      });
      const data = await response.json();
      if (data.success) {
        setResources(data.resources || []);
      } else {
        throw new Error(data.error || 'Failed to fetch resources');
      }
    } catch (error) {
      setResourcesError(error.message);
      toast.error('Failed to load resources');
    } finally {
      setResourcesLoading(false);
    }
  };

  const fetchStudentResults = async () => {
    if (!student?.admissionNumber) return;
    
    setResultsLoading(true);
    setResultsError(null);
    try {
      const response = await fetch(`/api/results?action=student-results&admissionNumber=${encodeURIComponent(student.admissionNumber)}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Cache-Control': 'no-cache'
        }
      });
      const data = await response.json();
      if (data.success) {
        setStudentResults(data.results || []);
      } else {
        throw new Error(data.error || 'Failed to fetch results');
      }
    } catch (error) {
      setResultsError(error.message);
    } finally {
      setResultsLoading(false);
    }
  };

  const fetchFeeBalance = async () => {
    if (!student?.admissionNumber) return;
    
    setFeeLoading(true);
    setFeeError(null);
    try {
      const response = await fetch(`/api/feebalances/${student.admissionNumber}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Cache-Control': 'no-cache'
        }
      });
      const data = await response.json();
      if (data.success) {
        setFeeBalance(data.data);
      } else {
        throw new Error(data.error || 'Failed to fetch fee balance');
      }
    } catch (error) {
      setFeeError(error.message);
      toast.error('Could not load fee balance');
    } finally {
      setFeeLoading(false);
    }
  };

  const handleStudentLogin = async (fullName, admissionNumber) => {
    setLoginLoading(true);
    setLoginError(null);
    setRequiresContact(false);

    try {
      const response = await fetch('/api/studentlogin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, admissionNumber })
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('student_token', data.token);
        setStudent(data.student);
        setToken(data.token);
        setShowLoginModal(false);
        
        toast.success('🎉 Login successful!', {
          description: `Welcome ${data.student.fullName}`
        });

        fetchAllData();
      } else {
        setLoginError(data.error);
        setRequiresContact(data.requiresContact || false);
        
        if (data.requiresContact) {
          toast.error('Student record not found', {
            description: 'Please contact your class teacher or school administrator'
          });
        } else {
          toast.error(data.error || 'Login failed');
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoginError('Network error. Please try again.');
      toast.error('Network error. Please try again.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/studentlogin', { method: 'DELETE' });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('student_token');
      setStudent(null);
      setToken(null);
      setShowLoginModal(true);
      setAssignments([]);
      setResources([]);
      setStudentResults([]);
      setFeeBalance(null);
      
      toast.success('👋 You have been logged out');
    }
  };

  const handleRefresh = () => {
    if (!token) {
      setShowLoginModal(true);
      return;
    }
    
    fetchAllData();
    toast.success('🔄 Refreshing data...');
  };

  const handleDownload = (item) => {
    toast.success(`📥 Downloading ${item.title || 'file'}...`);
  };

  const handleViewDetails = (item) => {
    toast.success(`🔍 Viewing details for ${item.title}`);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenuOnMobile = () => {
    if (window.innerWidth < 1024) {
      setIsMenuOpen(false);
    }
  };

  const handleViewChange = (view) => {
    setCurrentView(view);
    closeMenuOnMobile();
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!student || !token) {
    const features = [
      { 
        icon: <FaBook className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />, 
        title: "Learning Resources", 
        desc: "Access digital notes, revision e-books, and past papers." 
      },
      { 
        icon: <FaAward className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />, 
        title: "Assignments", 
        desc: "View and submit your subject tasks and holiday projects." 
      },
      { 
        icon: <FaChartBar className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />, 
        title: "Academic Results", 
        desc: "Personalized performance tracking vs class & KCSE targets." 
      },
      { 
        icon: <FaDollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />, 
        title: "Fee Structures", 
        desc: "Check balance, download statements, and payment slips." 
      },
      { 
        icon: <FaCalendar className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />, 
        title: "School Events", 
        desc: "Academic calendar, sports days, and parent-teacher meets." 
      },
      { 
        icon: <FaComments className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />, 
        title: "School News", 
        desc: "Latest updates from the administration and student body." 
      }
    ];

    return (
      <div className="min-h-screen bg-[#FDFDFD] text-slate-900 font-sans overflow-x-hidden">
        <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.02]" 
             style={{ backgroundImage: 'radial-gradient(#059669 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        
        <Toaster position="top-right" expand={true} richColors theme="light" />
        
        <main className="relative z-10 flex flex-col min-h-screen">
          <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-emerald-200/60 px-3 py-2.5 sm:px-4 sm:py-3 md:px-6 md:py-4 lg:px-12">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
              <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
                <Image
                  src="/MatG.jpg"
                  alt="Matungulu Girls High School Logo"
                  width={32}
                  height={32}
                  className="rounded-md w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12"
                  priority
                />

                <div>
                  <span className="text-sm xs:text-base sm:text-lg md:text-xl font-black tracking-tighter block leading-none">
                    MATUNGULU GIRLS
                  </span>
                  <span className="text-[7px] xs:text-[8px] sm:text-[9px] md:text-[10px] font-bold text-emerald-600 
                    tracking-[0.1em] xs:tracking-[0.15em] sm:tracking-[0.2em] uppercase">
                    Student Portal
                  </span>
                </div>
              </div>

              <div className="hidden md:flex items-center gap-4 lg:gap-6 xl:gap-8">
                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 rounded-full border border-emerald-200">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-[10px] font-black text-emerald-700 uppercase tracking-wider">Secure Login</span>
                </div>
                <button className="text-sm font-bold text-slate-500 hover:text-emerald-600 transition-colors">Help Desk</button>
              </div>

              <button onClick={router.back} className="md:hidden flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg 
                bg-emerald-50 hover:bg-emerald-100 transition-colors active:scale-95">
                <FaBars className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
              </button>
            </div>
          </nav>

          <section className="px-3 xs:px-4 sm:px-6 md:px-8 lg:px-12 py-6 sm:py-8 md:py-12 lg:py-20 max-w-7xl mx-auto w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xs:gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-center">
              <div className="space-y-4 xs:space-y-5 sm:space-y-6 md:space-y-8">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 rounded-lg border border-emerald-200 
                  text-[8px] xs:text-[9px] sm:text-[10px] font-bold tracking-widest uppercase text-emerald-700 whitespace-nowrap">
                  <HiSparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-emerald-600" />
                  Empowering Excellence Since 1955
                </div>
                <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 
                  font-black tracking-tighter leading-[0.85] xs:leading-[0.9] text-slate-950">
                  COMMITTED  
                  <span className="block text-emerald-600 italic mt-1 xs:mt-2">TO EXCELLENCE.</span>
                </h1>
                <p className="text-sm xs:text-base sm:text-lg md:text-xl text-slate-500 font-medium 
                  max-w-full xs:max-w-xs sm:max-w-md leading-relaxed xs:leading-snug">
                  Welcome to the Matungulu Girls High School Digital Student Portal. Your unified hub for academics, finance, and communication.
                </p>
                
                <div className="flex flex-row items-center gap-2 sm:gap-4 w-full max-w-full">
                  <button
                    onClick={() => setShowLoginModal(true)}
                    className="
                      flex-[2] sm:flex-none
                      flex items-center justify-center gap-1.5 sm:gap-3 
                      px-3 sm:px-8 
                      py-2.5 sm:py-4 
                      bg-emerald-700 text-white 
                      rounded-xl sm:rounded-2xl 
                      font-black sm:font-bold 
                      text-[10px] sm:text-base
                      uppercase sm:capitalize tracking-wider sm:tracking-normal
                      hover:bg-emerald-800 transition-all duration-300 active:scale-95
                      shadow-md sm:shadow-xl shadow-emerald-200/50 
                      group
                    "
                  >
                    <span>Access Portal</span>
                    <FaArrowRight className="w-3 h-3 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  
                  <button
                    onClick={() => router.push("/pages/contact")}
                    className="
                      flex-1 sm:flex-none
                      flex items-center justify-center gap-1.5
                      px-3 sm:px-7
                      py-2.5 sm:py-4
                      bg-white border border-emerald-200
                      text-emerald-700
                      rounded-xl sm:rounded-2xl
                      font-black sm:font-bold
                      text-[10px] sm:text-base
                      uppercase sm:capitalize tracking-wider sm:tracking-normal
                      hover:bg-emerald-50
                      transition-all active:scale-95
                    "
                  >
                    Help Desk
                  </button>
                </div>
              </div>

              <div className="relative group mt-4 xs:mt-6 sm:mt-0">
                <div className="absolute -inset-2 xs:-inset-3 sm:-inset-4 bg-emerald-100/40 rounded-[2rem] xs:rounded-[2.5rem] 
                  blur-xl xs:blur-2xl sm:blur-3xl opacity-40 group-hover:opacity-60 transition-opacity duration-300" />
                <div className="relative bg-white border border-emerald-200 shadow-lg xs:shadow-xl 
                  rounded-[1.5rem] xs:rounded-[2rem] sm:rounded-[2.5rem] p-4 xs:p-5 sm:p-6 md:p-8 space-y-4 xs:space-y-5 sm:space-y-6">
                  <div className="flex items-center justify-between border-b border-emerald-100 pb-3 xs:pb-4">
                    <h3 className="font-black text-xs xs:text-sm uppercase tracking-widest text-emerald-600 whitespace-nowrap">
                      Portal Features
                    </h3>
                    <FaBrain className="w-4 h-4 xs:w-5 xs:h-5 text-emerald-600" />
                  </div>
                  <div className="space-y-3 xs:space-y-4">
                    <div className="p-3 xs:p-4 bg-emerald-50/80 rounded-xl xs:rounded-2xl border border-emerald-100">
                      <p className="text-[10px] xs:text-xs font-bold text-emerald-700 mb-0.5 xs:mb-1">Academic Resources</p>
                      <p className="text-xs xs:text-sm font-semibold text-slate-800 leading-tight">
                        Digital notes, e-books, and past papers available.
                      </p>
                    </div>
                    <div className="p-3 xs:p-4 bg-emerald-50/80 rounded-xl xs:rounded-2xl border border-emerald-100">
                      <p className="text-[10px] xs:text-xs font-bold text-emerald-700 mb-0.5 xs:mb-1">Performance Tracking</p>
                      <p className="text-xs xs:text-sm font-semibold text-slate-800 leading-tight">
                        Monitor your progress vs KCSE targets.
                      </p>
                    </div>
                    <div className="p-3 xs:p-4 bg-emerald-50/80 rounded-xl xs:rounded-2xl border border-emerald-100">
                      <p className="text-[10px] xs:text-xs font-bold text-emerald-700 mb-0.5 xs:mb-1">Fee Management</p>
                      <p className="text-xs xs:text-sm font-semibold text-slate-800 leading-tight">
                        Check balance and download payment slips.
                      </p>
                    </div>
                  </div>
                  <button className="w-full py-2.5 xs:py-3 text-center text-[10px] xs:text-xs font-black 
                    uppercase tracking-widest text-emerald-600 hover:text-emerald-700 transition-colors duration-300">
                    View All Features
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-emerald-50/30 border-y border-emerald-200/60 py-8 xs:py-12 sm:py-16 md:py-20 
            px-3 xs:px-4 sm:px-6 md:px-8 lg:px-12">
            <div className="max-w-7xl mx-auto">
              <div className="mb-6 xs:mb-8 sm:mb-10 md:mb-12 px-2">
                <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-black tracking-tight mb-1 xs:mb-2">
                  Portal Modules
                </h2>
                <p className="text-slate-500 font-medium text-sm xs:text-base">
                  Everything you need to navigate your school journey.
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 xs:gap-4 sm:gap-5 md:gap-6 px-2">
                {features.map((feature, i) => (
                  <div key={i} className="group p-4 xs:p-5 sm:p-6 md:p-8 
                    bg-white border border-emerald-200/80 
                    rounded-[1.5rem] xs:rounded-[1.75rem] sm:rounded-[2rem] 
                    hover:shadow-xl hover:shadow-emerald-200/30 
                    hover:-translate-y-0.5 active:translate-y-0
                    transition-all duration-300">
                    <div className="w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 
                      bg-emerald-50 rounded-lg xs:rounded-xl sm:rounded-2xl 
                      flex items-center justify-center mb-3 xs:mb-4 sm:mb-6 
                      group-hover:scale-105 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    <h3 className="text-base xs:text-lg sm:text-xl md:text-2xl 
                      font-bold text-slate-950 mb-1.5 xs:mb-2 sm:mb-3 leading-tight">
                      {feature.title}
                    </h3>
                    <p className="text-slate-500 text-xs xs:text-sm leading-relaxed mb-3 xs:mb-4 sm:mb-6 
                      line-clamp-2 xs:line-clamp-3">
                      {feature.desc}
                    </p>
                    <div className="flex items-center gap-1.5 xs:gap-2 text-[10px] xs:text-xs font-black 
                      uppercase tracking-widest text-emerald-600 
                      group-hover:text-emerald-700 transition-colors duration-300 cursor-pointer">
                      Login to Access 
                      <FaArrowRight className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <footer className="px-3 xs:px-4 sm:px-6 md:px-8 lg:px-12 py-6 xs:py-8 sm:py-10 md:py-12 bg-white">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center 
              gap-6 xs:gap-8 sm:gap-10 md:gap-12">
              <div className="flex flex-col items-center lg:items-start gap-3 xs:gap-4 text-center lg:text-left">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 bg-emerald-50 rounded-lg 
                    flex items-center justify-center">
                    <FaLeaf className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4 text-emerald-600" />
                  </div>
                  <span className="text-sm xs:text-base font-bold tracking-tight">Matungulu Girls High School</span>
                </div>
                <p className="text-[9px] xs:text-[10px] font-bold text-emerald-300 uppercase tracking-widest">
                  ©2024 Matungulu Girls High School. All Rights Reserved.
                </p>
              </div>
              
              <div className="flex flex-wrap justify-center gap-4 xs:gap-6 sm:gap-8 md:gap-10">
                <div className="space-y-1 xs:space-y-2 text-center">
                  <p className="text-[9px] xs:text-[10px] font-black text-emerald-300 uppercase tracking-widest">
                    Academic Hub
                  </p>
                  <p className="text-xs font-bold hover:text-emerald-600 cursor-pointer transition-colors duration-300">
                    KNEC Portal
                  </p>
                </div>
                <div className="space-y-1 xs:space-y-2 text-center">
                  <p className="text-[9px] xs:text-[10px] font-black text-emerald-300 uppercase tracking-widest">
                    Financials
                  </p>
                  <p className="text-xs font-bold hover:text-emerald-600 cursor-pointer transition-colors duration-300">
                    Payment Gateways
                  </p>
                </div>
                <div className="space-y-1 xs:space-y-2 text-center">
                  <p className="text-[9px] xs:text-[10px] font-black text-emerald-300 uppercase tracking-widest">
                    Support
                  </p>
                  <p className="text-xs font-bold hover:text-emerald-600 cursor-pointer transition-colors duration-300">
                    IT Service Desk
                  </p>
                </div>
              </div>
            </div>
          </footer>
        </main>

        <StudentLoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          onLogin={handleStudentLogin}
          isLoading={loginLoading}
          error={loginError}
          requiresContact={requiresContact}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50/30">
      <Toaster position="top-right" expand={true} richColors theme="light" />
      
      <StudentLoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleStudentLogin}
        isLoading={loginLoading}
        error={loginError}
        requiresContact={requiresContact}
      />

      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 animate-fadeIn"
          onClick={toggleMenu}
        />
      )}

      <div className="flex">
        <div className={`
          ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
          fixed lg:sticky lg:top-0
          h-screen z-50 transition-transform duration-300 ease-in-out
          flex-shrink-0
          w-[85vw] sm:w-4/5 md:w-3/5 lg:w-72 xl:w-80
          shadow-2xl mobile-scroll-hide
        `}>
          <NavigationSidebar
            student={student}
            feeBalance={feeBalance}
            feeLoading={feeLoading}
            feeError={feeError}
            onLogout={handleLogout}
            currentView={currentView}
            setCurrentView={handleViewChange}
            onRefresh={handleRefresh}
            onMenuClose={closeMenuOnMobile}
          />
        </div>

        <div className="flex-1 flex flex-col min-h-screen w-full lg:w-[calc(100%-18rem)] xl:w-[calc(100%-20rem)] transition-all duration-300">
          <ModernStudentHeader
            student={student}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onRefresh={handleRefresh}
            onMenuToggle={toggleMenu}
            isMenuOpen={isMenuOpen}
            currentView={currentView}
          />

          <main className="flex-1 overflow-y-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8 container mx-auto max-w-7xl mobile-scroll-hide sm:overflow-y-auto">
            {currentView === 'home' && (
              <ModernHomeView
                student={student}
                feeBalance={feeBalance}
                feeLoading={feeLoading}
                token={token}
              />
            )}
            {currentView === 'results' && (
              <ResultsView
                student={student}
                studentResults={studentResults}
                resultsLoading={resultsLoading}
                resultsError={resultsError}
                onRefreshResults={fetchStudentResults}
              />
            )}

            {currentView === 'resources' && (
              <ResourcesAssignmentsView
                student={student}
                assignments={assignments}
                resources={resources}
                assignmentsLoading={assignmentsLoading}
                resourcesLoading={resourcesLoading}
                onDownload={handleDownload}
                onViewDetails={handleViewDetails}
              />
            )}

            {currentView === 'guidance' && (
              <GuidanceEventsView />
            )}

            {currentView === 'fees' && (
              <FeesView
                student={student}
                token={token}
              />
            )}
          </main>

          <footer className="border-t border-emerald-200/50 bg-gradient-to-r from-white via-white to-emerald-50/30 py-4 sm:py-6 md:py-8 backdrop-blur-sm">
            <div className="container mx-auto px-3 sm:px-4 md:px-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6">
                <div className="text-center md:text-left">
                  <p className="text-gray-700 text-sm font-bold">
                    © {new Date().getFullYear()} Matungulu Girls High School
                  </p>
                  <p className="text-gray-500 text-xs mt-1 sm:mt-2">
                    Student Portal v3.0 • Strive to Excel
                  </p>
                  <div className="flex items-center gap-2 sm:gap-3 mt-2 sm:mt-3">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-gray-400">Session Active</span>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-4 sm:gap-6 flex-wrap">
                  <button
                    onClick={() => router.push('/pages/OurSchoolpolicies')}
                    className="text-gray-500 hover:text-emerald-600 text-xs sm:text-sm font-medium transition-colors mobile-touch-friendly"
                  >
                    Privacy
                  </button>

                  <button
                    onClick={() => router.push('/pages/OurSchoolpolicies')}
                    className="text-gray-500 hover:text-emerald-600 text-xs sm:text-sm font-medium transition-colors mobile-touch-friendly"
                  >
                    Terms
                  </button>

                  <button
                    onClick={() => router.push('/pages/OurSchoolpolicies')}
                    className="text-gray-500 hover:text-emerald-600 text-xs sm:text-sm font-medium transition-colors mobile-touch-friendly"
                  >
                    Help
                  </button>

                  <button
                    onClick={() => router.push('/pages/OurSchoolpolicies')}
                    className="text-gray-500 hover:text-emerald-600 transition-colors mobile-touch-friendly"
                    aria-label="Language & Policies"
                  >
                    <FaGlobe className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
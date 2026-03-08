'use client';
import { useState, useEffect } from 'react';
import { toast, Toaster } from 'sonner';
import { 
  FiUser, 
  FiCalendar, 
  FiFileText, 
  FiCheckCircle,
  FiClock,
  FiAward,
  FiUsers,
  FiBook,
  FiCheck,
  FiHome,
  FiMail,
  FiPhone,
  FiMapPin,
  FiDownload,
  FiStar,
  FiHelpCircle,
  FiPlay,
  FiShare2,
  FiChevronDown,
  FiBarChart2,
  FiHeart,
  FiTarget,
  FiGlobe,
  FiBookOpen,
  FiCpu,
  FiMusic,
  FiActivity,
  FiZap,
  FiTrendingUp,
  FiEye,
  FiLayers,
  FiPlus,
  FiX,
  FiFilter,
  FiSearch,
  FiRotateCw,
  FiRefreshCw, 
  FiEdit3,
  FiTrash2,
  FiMessageCircle,
  FiAlertTriangle,
  FiSave,
  FiImage,
  FiUpload,
  FiVideo,
  FiDollarSign,
  FiFile,
  FiClipboard,
  FiCreditCard,
  FiInfo,
  FiGrid,
  FiFolder,
  FiList,
  FiSettings,
  FiPieChart,
  FiTool,
  FiSmartphone,
  FiCode,
  FiShield,
  FiTarget as FiTargetIcon,
  FiBookmark,
  FiCalendar as FiCalendarIcon,
  FiBriefcase,
  FiGlobe as FiGlobeIcon,
  FiMic,
  FiCamera,
  FiMonitor,
  FiTrendingUp as FiTrendingUpIcon,
  FiTool as FiToolIcon,
  FiPenTool,
  FiDatabase,
  FiCloud,
  FiLock,
  FiShoppingBag,
  FiDroplet,
  FiTruck,
  FiScissors,
  FiCoffee,
  FiChef,
  FiMusic as FiMusicIcon,
  FiChevronRight,
   FiChevronLeft 
} from 'react-icons/fi';
import {  FiChevronUp, FiArrowRight } from 'react-icons/fi';

import { 
  IoSchoolOutline,
  IoDocumentsOutline,
  IoSpeedometerOutline,
  IoPeopleOutline,
  IoLibraryOutline,
  IoStatsChartOutline,
  IoRocketOutline,
  IoBookOutline,
  IoCalculatorOutline,
  IoSparkles,
  IoAccessibilityOutline,
  IoBuildOutline,
  IoAnalyticsOutline,
  IoBulbOutline,
  IoCheckmarkCircleOutline,
  IoCalendarOutline,
  IoDocumentTextOutline,
  IoReceiptOutline,
  IoShirtOutline,
  IoVideocamOutline,
  IoCloudDownloadOutline,
  IoEyeOutline,
  IoMedkitOutline,
  IoConstructOutline,
  IoCarOutline,
  IoRestaurantOutline,
  IoFlaskOutline,
  IoCodeSlashOutline,
  IoBusinessOutline,
  IoNewspaperOutline,
  IoLanguageOutline
} from 'react-icons/io5';
import { IoCheckmarkCircle, IoArrowForward, IoFlash } from 'react-icons/io5';

const formatDateWithOrdinal = (dateInput) => {
  if (!dateInput) return '';
  const date = new Date(dateInput);
  
  // Safety check for invalid dates
  if (isNaN(date.getTime())) return '';

  const n = date.getDate();
  const month = date.toLocaleString('en-US', { month: 'short' });
  const year = date.getFullYear();

  // Your preserved ordinal logic, condensed for refinement
  const getOrdinal = (num) => {
    const lastTwo = num % 100;
    if (lastTwo >= 11 && lastTwo <= 13) return num + 'th';
    
    switch (num % 10) {
      case 1:  return num + 'st';
      case 2:  return num + 'nd';
      case 3:  return num + 'rd';
      default: return num + 'th';
    }
  };

  return `${getOrdinal(n)} ${month} ${year}`;
};

// Result: formatDateWithOrdinal("2026-01-23") -> "23rd Jan 2026"


import { useRouter } from 'next/navigation';
import { CircularProgress } from '@mui/material';

// Modern Modal Component - Mobile Responsive


const CareerSearchPage = () => {
  const [globalSearch, setGlobalSearch] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedDept, setExpandedDept] = useState(null);
  const deptsPerPage = 3; // Show 3 departments per page
  
  // Enhanced high school departments with more career paths
  const highSchoolDepartments = [
    {
      department: 'MATHEMATICS',
      icon: IoCalculatorOutline,
      color: 'from-emerald-600 to-emerald-500',
      description: 'Master logical thinking, problem-solving, and analytical skills',
      subjects: ['Pure Mathematics', 'Applied Mathematics', 'Statistics', 'Business Mathematics'],
      careerPaths: [
        {
          title: 'Finance & Banking',
          description: 'Excel in financial analysis, investment, and economic planning',
          examples: 'Accountants, Financial Analysts, Bankers, Actuaries, Investment Bankers'
        },
        {
          title: 'Data Science & Analytics',
          description: 'Transform data into valuable insights and predictive models',
          examples: 'Data Scientists, Statisticians, Market Researchers, Business Analysts'
        },
        {
          title: 'Engineering & Architecture',
          description: 'Apply mathematical principles to design and construction',
          examples: 'Structural Engineers, Architects, Quantity Surveyors, Civil Engineers'
        },
        {
          title: 'Education & Research',
          description: 'Share mathematical knowledge and conduct advanced research',
          examples: 'Mathematics Teachers, University Lecturers, Researchers, Curriculum Developers'
        },
        {
          title: 'Technology & Computing',
          description: 'Develop algorithms and computational solutions',
          examples: 'Software Engineers, Cryptographers, AI Specialists, Game Developers'
        },
        {
          title: 'Actuarial Science',
          description: 'Assess financial risks using mathematics and statistics',
          examples: 'Actuaries, Risk Analysts, Insurance Underwriters, Pension Consultants'
        }
      ]
    },
    {
      department: 'SCIENCES',
      icon: IoFlaskOutline,
      color: 'from-teal-600 to-emerald-500',
      description: 'Explore the world through scientific inquiry and discovery',
      subjects: ['Biology', 'Chemistry', 'Physics', 'Agriculture', 'Physical Education'],
      careerPaths: [
        {
          title: 'Medical & Health Sciences',
          description: 'Pursue careers in healthcare and medical research',
          examples: 'Doctors, Nurses, Pharmacists, Dentists, Medical Researchers, Physiotherapists'
        },
        {
          title: 'Engineering & Technology',
          description: 'Design and build innovative solutions for the future',
          examples: 'Civil Engineers, Electrical Engineers, Mechanical Engineers, Architects, Chemical Engineers'
        },
        {
          title: 'Environmental Sciences',
          description: 'Protect and preserve our natural environment',
          examples: 'Environmental Scientists, Conservationists, Wildlife Biologists, Forest Rangers'
        },
        {
          title: 'Research & Development',
          description: 'Advance scientific knowledge through research',
          examples: 'Research Scientists, Laboratory Technicians, Biotechnologists, Quality Controllers'
        },
        {
          title: 'Agricultural Sciences',
          description: 'Improve food production and sustainable farming',
          examples: 'Agricultural Officers, Food Scientists, Horticulturists, Animal Scientists'
        },
        {
          title: 'Sports Science',
          description: 'Enhance athletic performance and physical health',
          examples: 'Sports Coaches, Physiotherapists, Fitness Trainers, Sports Psychologists'
        }
      ]
    },
    {
      department: 'LANGUAGES',
      icon: IoLanguageOutline,
      color: 'from-emerald-600 to-emerald-500',
      description: 'Develop communication skills and cultural understanding',
      subjects: ['English', 'Kiswahili', 'French', 'German', 'Arabic'],
      careerPaths: [
        {
          title: 'Communication & Media',
          description: 'Excel in writing, broadcasting, and media production',
          examples: 'Journalists, Editors, Translators, Content Writers, Broadcasters'
        },
        {
          title: 'International Relations',
          description: 'Bridge cultural gaps in global contexts',
          examples: 'Diplomats, UN Officers, International Business Consultants, Foreign Service Officers'
        },
        {
          title: 'Education & Publishing',
          description: 'Teach languages and contribute to literary works',
          examples: 'Language Teachers, Publishers, Literary Critics, Curriculum Developers'
        },
        {
          title: 'Tourism & Hospitality',
          description: 'Connect with people from around the world',
          examples: 'Tour Guides, Hotel Managers, Flight Attendants, Travel Agents'
        },
        {
          title: 'Law & Advocacy',
          description: 'Use language skills in legal and advocacy work',
          examples: 'Lawyers, Legal Translators, Human Rights Officers, Policy Analysts'
        },
        {
          title: 'Creative Writing',
          description: 'Express ideas through various literary forms',
          examples: 'Authors, Scriptwriters, Copywriters, Poets, Content Creators'
        }
      ]
    },
    {
      department: 'HUMANITIES',
      icon: IoNewspaperOutline,
      color: 'from-emerald-600 to-emerald-500',
      description: 'Understand human society, culture, and behavior',
      subjects: ['History', 'Geography', 'CRE/IRE/HRE', 'Life Skills', 'Government'],
      careerPaths: [
        {
          title: 'Law & Governance',
          description: 'Shape legal systems and public policy',
          examples: 'Lawyers, Judges, Policy Analysts, Human Rights Officers, Political Scientists'
        },
        {
          title: 'Social Services',
          description: 'Support communities and individuals in need',
          examples: 'Social Workers, Counselors, Community Developers, Humanitarian Workers'
        },
        {
          title: 'Cultural Heritage',
          description: 'Preserve and promote cultural identity',
          examples: 'Museum Curators, Historians, Cultural Officers, Anthropologists'
        },
        {
          title: 'Urban Planning',
          description: 'Design sustainable communities and cities',
          examples: 'Urban Planners, Environmental Consultants, GIS Specialists, Surveyors'
        },
        {
          title: 'Religious Studies',
          description: 'Guide spiritual development and religious education',
          examples: 'Clergy, Religious Educators, Chaplains, Interfaith Coordinators'
        },
        {
          title: 'Public Administration',
          description: 'Manage public resources and government services',
          examples: 'Administrative Officers, Public Relations Officers, Policy Makers'
        }
      ]
    },
    {
      department: 'TECHNICAL STUDIES',
      icon: IoConstructOutline,
      color: 'from-emerald-600 to-emerald-500',
      description: 'Develop practical skills for immediate employment',
      subjects: ['Computer Studies', 'Business Studies', 'Home Science', 'Art & Design', 'Music'],
      careerPaths: [
        {
          title: 'Information Technology',
          description: 'Drive digital transformation and innovation',
          examples: 'Software Developers, Network Administrators, Cybersecurity Experts, Database Managers'
        },
        {
          title: 'Business & Entrepreneurship',
          description: 'Start and manage successful enterprises',
          examples: 'Business Owners, Marketing Managers, Financial Analysts, Sales Executives'
        },
        {
          title: 'Hospitality & Home Economics',
          description: 'Excel in food, nutrition, and hospitality services',
          examples: 'Chefs, Nutritionists, Hotel Managers, Fashion Designers, Caterers'
        },
        {
          title: 'Creative Arts & Design',
          description: 'Express creativity through various media',
          examples: 'Graphic Designers, Artists, Multimedia Specialists, Animators, Musicians'
        },
        {
          title: 'Technical Trades',
          description: 'Master hands-on technical skills',
          examples: 'Electricians, Plumbers, Mechanics, Carpenters, Technicians'
        },
        {
          title: 'Media Production',
          description: 'Create audio-visual content and productions',
          examples: 'Film Directors, Sound Engineers, Photographers, Video Editors'
        }
      ]
    },
    {
      department: 'COMMERCIAL STUDIES',
      icon: IoBusinessOutline,
      color: 'from-emerald-600 to-emerald-500',
      description: 'Master business principles and commercial operations',
      subjects: ['Commerce', 'Accounting', 'Economics', 'Entrepreneurship', 'Office Practice'],
      careerPaths: [
        {
          title: 'Accounting & Auditing',
          description: 'Manage financial records and ensure compliance',
          examples: 'Accountants, Auditors, Tax Consultants, Financial Controllers'
        },
        {
          title: 'Marketing & Advertising',
          description: 'Promote products and build brand awareness',
          examples: 'Marketing Managers, Advertising Executives, Brand Managers, Digital Marketers'
        },
        {
          title: 'Banking & Finance',
          description: 'Manage monetary transactions and investments',
          examples: 'Bankers, Financial Planners, Loan Officers, Investment Analysts'
        },
        {
          title: 'Office Administration',
          description: 'Ensure smooth office operations and management',
          examples: 'Office Administrators, Secretaries, Receptionists, Office Managers'
        },
        {
          title: 'Supply Chain',
          description: 'Manage logistics and procurement processes',
          examples: 'Procurement Officers, Logistics Managers, Supply Chain Analysts'
        },
        {
          title: 'Customer Service',
          description: 'Build customer relationships and satisfaction',
          examples: 'Customer Care Representatives, Client Relations Managers, Call Center Agents'
        }
      ]
    }
  ];
  
  // Get unique departments for filter
  const departments = [
    { value: "all", label: "All Departments" },
    ...highSchoolDepartments.map(dept => ({
      value: dept.department.toLowerCase(),
      label: dept.department
    }))
  ];
  
  // Filter departments based on search
  const filteredDepartments = highSchoolDepartments.filter((dept) => {
    const matchesSearch = 
      globalSearch === "" ||
      dept.department.toLowerCase().includes(globalSearch.toLowerCase()) ||
      dept.description.toLowerCase().includes(globalSearch.toLowerCase()) ||
      dept.subjects.some(subject => 
        subject.toLowerCase().includes(globalSearch.toLowerCase())
      ) ||
      dept.careerPaths.some(career => 
        career.title.toLowerCase().includes(globalSearch.toLowerCase()) ||
        career.description.toLowerCase().includes(globalSearch.toLowerCase()) ||
        career.examples.toLowerCase().includes(globalSearch.toLowerCase())
      );
    
    const matchesDepartment = 
      selectedDepartment === "all" || 
      dept.department.toLowerCase() === selectedDepartment;
    
    return matchesSearch && matchesDepartment;
  });
  
  // Pagination for departments
  const totalPages = Math.ceil(filteredDepartments.length / deptsPerPage);
  const indexOfLastDept = currentPage * deptsPerPage;
  const indexOfFirstDept = indexOfLastDept - deptsPerPage;
  const currentDepartments = filteredDepartments.slice(indexOfFirstDept, indexOfLastDept);
  
  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Reset filters
  const resetFilters = () => {
    setGlobalSearch("");
    setSelectedDepartment("all");
    setCurrentPage(1);
    setExpandedDept(null);
  };
  
  // Toggle department expansion
  const toggleDepartment = (deptIndex) => {
    setExpandedDept(expandedDept === deptIndex ? null : deptIndex);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-6 px-0 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-8 text-center">
          <h1 className="text-xl md:text-3xl font-black text-slate-900 uppercase tracking-tighter leading-none mb-3">
            Career <span className="text-emerald-600">Explorer</span>
          </h1>
          <p className="text-slate-500 font-bold text-xs md:text-sm uppercase tracking-[0.2em] mb-6">
            Browse careers by high school department
          </p>

          {/* SEARCH & FILTER BAR */}
          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
              {/* Search Input */}
              <div className="md:col-span-2 relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FiSearch className="text-slate-400" size={18} />
                </div>
                <input 
                  type="text"
                  placeholder="Search careers or subjects..."
                  className="w-full pl-12 pr-4 py-3 bg-white border border-slate-300 rounded-xl text-sm font-medium text-slate-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none"
                  value={globalSearch}
                  onChange={(e) => {
                    setGlobalSearch(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>
              
              {/* Department Filter */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FiFilter className="text-slate-400" size={16} />
                </div>
                <select
                  className="w-full pl-12 pr-4 py-3 bg-white border border-slate-300 rounded-xl text-sm font-medium text-slate-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none appearance-none"
                  value={selectedDepartment}
                  onChange={(e) => {
                    setSelectedDepartment(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  {departments.map((dept) => (
                    <option key={dept.value} value={dept.value}>
                      {dept.label}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <FiChevronDown className="text-slate-400" />
                </div>
              </div>
            </div>
            
            {/* Results Stats & Reset */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6">
              <div className="text-center sm:text-left">
                <h3 className="text-base font-black text-slate-900">
                  {filteredDepartments.length} {filteredDepartments.length === 1 ? 'Department' : 'Departments'} Found
                </h3>
                <p className="text-slate-500 text-xs">
                  {selectedDepartment !== "all" && `in ${departments.find(d => d.value === selectedDepartment)?.label}`}
                  {globalSearch && ` matching "${globalSearch}"`}
                </p>
              </div>
              
              {(globalSearch || selectedDepartment !== "all") && (
                <button
                  onClick={resetFilters}
                  className="flex items-center gap-2 px-3 py-2 bg-slate-100 text-slate-700 rounded-lg font-medium text-xs"
                >
                  <FiRotateCw />
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        </div>

        {/* DEPARTMENTS GRID */}
        {currentDepartments.length > 0 ? (
          <>
            <div className="space-y-4 mb-8">
              {currentDepartments.map((dept, deptIndex) => {
                const isExpanded = expandedDept === deptIndex;
                const DepartmentIcon = dept.icon;
                
                return (
                  <div key={dept.department} className="bg-white rounded-xl border border-slate-200 shadow-sm">
                    {/* Department Header - Clickable to expand */}
                    <button
                      onClick={() => toggleDepartment(deptIndex)}
                      className="w-full px-5 py-4 text-left flex items-center justify-between"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-lg bg-gradient-to-br ${dept.color} bg-opacity-10`}>
                          <DepartmentIcon className={`text-xl ${
                            dept.color.includes('emerald') ? 'text-emerald-600' : 
                            dept.color.includes('teal') ? 'text-teal-600' :
                            'text-emerald-600'
                          }`} />
                        </div>
                        <div className="text-left">
                          <h3 className="text-lg font-black text-slate-900 tracking-tight">
                            {dept.department}
                          </h3>
                          <p className="text-slate-500 text-xs font-medium">
                            {dept.careerPaths.length} career paths • {dept.subjects.length} subjects
                          </p>
                        </div>
                      </div>
                      
                  <div className="flex items-center gap-3">
<div className="flex items-center gap-1 text-emerald-700">
  <span className="text-[10px] md:text-xs font-black uppercase">
     Careers
  </span>
</div>

  {/* Interactive Toggle Circle */}
  <div className={`
    w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300
    ${isExpanded ? 'bg-slate-900 text-white shadow-lg rotate-180' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}
  `}>
    <FiChevronDown size={16} strokeWidth={3} />
  </div>
</div>
                    </button>

                    {/* Department Description (Always visible) */}
                    <div className="px-5 pb-4">
                      <p className="text-slate-600 text-sm font-medium">
                        {dept.description}
                      </p>
                      
                      {/* Subjects */}
                      <div className="mt-3">
                        <div className="flex items-center gap-2 mb-2">
                          <FiBook className="text-slate-400 text-sm" />
                          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                            Subjects
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {dept.subjects.map((subject, idx) => (
                            <span key={idx} className="px-2.5 py-1 bg-slate-50 text-slate-700 rounded-lg text-xs font-medium">
                              {subject}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Collapsible Career Paths */}
                    {isExpanded && (
                      <div className="border-t border-slate-100 px-5 py-4">
                        <div className="flex items-center gap-2 mb-4">
                          <FiBriefcase className="text-slate-400" />
                          <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                            Career Paths
                          </h4>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {dept.careerPaths.map((career, careerIndex) => (
                            <div key={careerIndex} className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                              <h5 className="font-bold text-slate-900 text-sm mb-2">{career.title}</h5>
                              <p className="text-slate-600 text-xs mb-3 leading-relaxed">{career.description}</p>
                              <div className="text-xs text-slate-500 font-medium">
                                <span className="font-bold text-slate-700">Examples:</span> {career.examples}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            
            {/* PAGINATION */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-200">
                <div className="text-slate-500 text-xs font-medium">
                  Showing {indexOfFirstDept + 1}-{Math.min(indexOfLastDept, filteredDepartments.length)} of {filteredDepartments.length} departments
                </div>
                
                <div className="flex items-center gap-1">
                  {/* Previous Button */}
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`p-2 rounded-lg border ${
                      currentPage === 1 
                        ? 'border-slate-200 text-slate-300 cursor-not-allowed' 
                        : 'border-slate-300 text-slate-700'
                    }`}
                  >
                    <FiChevronLeft />
                  </button>
                  
                  {/* Page Numbers */}
                  <div className="flex items-center gap-1">
                    {[...Array(totalPages)].map((_, index) => {
                      const pageNumber = index + 1;
                      // Show first, last, and pages around current
                      if (
                        pageNumber === 1 ||
                        pageNumber === totalPages ||
                        (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                      ) {
                        return (
                          <button
                            key={pageNumber}
                            onClick={() => handlePageChange(pageNumber)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                              currentPage === pageNumber
                                ? 'bg-emerald-600 text-white'
                                : 'text-slate-700 bg-white border border-slate-300'
                            }`}
                          >
                            {pageNumber}
                          </button>
                        );
                      } else if (
                        pageNumber === currentPage - 2 ||
                        pageNumber === currentPage + 2
                      ) {
                        return <span key={pageNumber} className="px-1 text-slate-400">...</span>;
                      }
                      return null;
                    })}
                  </div>
                  
                  {/* Next Button */}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`p-2 rounded-lg border ${
                      currentPage === totalPages 
                        ? 'border-slate-200 text-slate-300 cursor-not-allowed' 
                        : 'border-slate-300 text-slate-700'
                    }`}
                  >
                    <FiChevronRight />
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          /* NO RESULTS STATE */
          <div className="py-12 text-center bg-white rounded-xl border border-dashed border-slate-300">
            <FiBriefcase className="mx-auto text-slate-300 mb-3" size={36} />
            <h3 className="text-lg font-black text-slate-900 mb-2">
              No departments found
            </h3>
            <p className="text-slate-500 font-medium text-sm mb-4 max-w-md mx-auto">
              {globalSearch 
                ? `No departments or careers found matching "${globalSearch}"${selectedDepartment !== "all" ? ` in ${departments.find(d => d.value === selectedDepartment)?.label}` : ''}`
                : `No departments available in ${departments.find(d => d.value === selectedDepartment)?.label}`
              }
            </p>
            <button 
              onClick={resetFilters}
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-bold text-sm"
            >
              Show All Departments
            </button>
          </div>
        )}

        {/* STATS FOOTER */}
        <div className="mt-8 pt-6 border-t border-slate-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-xl font-black text-slate-900 mb-1">
                {highSchoolDepartments.length}
              </div>
              <div className="text-slate-500 text-xs font-medium">
                Academic Departments
              </div>
            </div>
            <div className="text-center">
              <div className="text-xl font-black text-slate-900 mb-1">
                {highSchoolDepartments.reduce((sum, dept) => sum + dept.careerPaths.length, 0)}
              </div>
              <div className="text-slate-500 text-xs font-medium">
                Total Career Paths
              </div>
            </div>
            <div className="text-center">
              <div className="text-xl font-black text-slate-900 mb-1">
                {[...new Set(highSchoolDepartments.flatMap(dept => dept.subjects))].length}
              </div>
              <div className="text-slate-500 text-xs font-medium">
                Subjects Offered
              </div>
            </div>
            <div className="text-center">
              <div className="text-xl font-black text-slate-900 mb-1">
                100%
              </div>
              <div className="text-slate-500 text-xs font-medium">
                KCSE Aligned
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ModernEducationSystemCard = ({ system, icon: Icon, color, description, features, structure, advantages }) => {
  return (
    /* Removed p-2 on mobile so the card is edge-to-edge; kept rounded for desktop */
    <div className="group relative bg-slate-50 md:rounded-[2.5rem] p-0 md:p-2 ">
      {/* Outer Glow Effect - Hidden on mobile to keep edge clean */}
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 md:rounded-[2.5rem] hidden md:block`} />
      
      <div className="relative bg-white md:rounded-[2rem] border-y md:border border-slate-200 overflow-hidden shadow-sm">
        
        {/* Top Header - Adjusted height for mobile screens */}
        <div className={`relative h-32 md:h-40 p-6 md:p-10 bg-gradient-to-br ${color} overflow-hidden`}>
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 md:w-72 h-64 md:h-72 bg-white/20 blur-[70px] md:blur-[90px] rounded-full -mr-32 -mt-32 animate-pulse" />
          
          <div className="relative z-10">
            <h3 className="text-xl md:text-2xl font-black text-white tracking-tighter uppercase leading-none">
              {system.name}
            </h3>
            <p className="text-white/90 text-[9px] md:text-[11px] font-black tracking-[0.2em] md:tracking-[0.3em] mt-2 md:mt-3 uppercase opacity-80">
              {system.fullName}
            </p>
          </div>
        </div>

        {/* Floating Icon - Smaller on mobile */}
        <div className="relative px-6 md:px-8">
          <div className="absolute -top-8 md:-top-12 right-6 md:right-8 p-1 bg-white rounded-[1.2rem] md:rounded-[1.5rem] shadow-2xl border border-slate-100">
            <div className={`p-3 md:p-5 rounded-[1rem] md:rounded-[1.2rem] bg-gradient-to-br ${color} text-white shadow-inner active:scale-95 transition-transform`}>
              <Icon className="text-xl md:text-2xl" />
            </div>
          </div>
        </div>

        {/* Main Content Body */}
        <div className="p-6 md:p-10 pt-10 md:pt-12">
          <div className="relative mb-8 md:mb-10">
            <span className="absolute -top-4 -left-2 text-2xl md:text-3xl text-slate-100 font-black pointer-events-none">“</span>
            <p className="relative z-10 text-slate-500 leading-relaxed text-xs md:text-base font-bold italic">
              {description}
            </p>
          </div>

          {/* Educational Structure - 3 Columns preserved, font adjusted for small width */}
          <h4 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-4 ml-1">Academic Path</h4>
          <div className="grid grid-cols-3 gap-2 md:gap-4 mb-8 md:mb-10">
            {structure.map((stage, idx) => (
              <div key={idx} className="relative overflow-hidden p-3 md:p-5 rounded-2xl md:rounded-[1.5rem] bg-[#0F172A] border border-slate-800 transition-transform hover:-translate-y-1">
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${color}`} />
                <div className="font-black text-white text-xl md:text-3xl leading-none tabular-nums">
                  {stage.years}
                </div>
                <div className="text-[8px] md:text-[9px] text-emerald-400 font-black uppercase tracking-widest mt-2 md:mt-3 leading-tight">
                  {stage.name}
                </div>
              </div>
            ))}
          </div>

          {/* Features - Optimized spacing for narrow screens */}
          <div className="space-y-6 mb-8 md:mb-10">
             <h4 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-4 ml-1">
               System Pillars
             </h4>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5 md:gap-y-6">
                {features.map((feature, idx) => (
                  <div key={idx} className="flex gap-3 md:gap-4 items-start group/feat">
                    <div className={`flex-shrink-0 w-2 h-2 md:w-3 md:h-3 rounded-full bg-gradient-to-r ${color} mt-1.5`} />
                    <div className="min-w-0">
                      <h5 className="font-black text-slate-900 text-[11px] md:text-[13px] uppercase tracking-tight leading-tight mb-1">
                        {feature.title}
                      </h5>
                      <p className="text-slate-400 text-[10px] md:text-[11px] font-bold leading-snug">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
             </div>
          </div>

          {/* Advantages - Pill Tags scrollable/wrap behavior */}
          <div className="pt-6 md:pt-8 border-t border-slate-100">
            <div className="flex flex-wrap gap-1.5 md:gap-2">
              {advantages.map((advantage, idx) => (
                <span key={idx} className="px-3 py-1.5 md:px-4 md:py-2 bg-slate-100 text-slate-900 rounded-lg md:rounded-xl text-[8px] md:text-[9px] font-black uppercase tracking-wider md:tracking-[0.15em]">
                  {advantage}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const AdmissionPathCard = ({ path, onApply, index }) => {
  const getLocalImage = (type) => {
    const images = { grade7: '/matgs.jpg', transfer: '/im2.jpeg' };
    return images[type] || '/matgs.jpg';
  };

  const themeColor = path.color.includes('emerald') ? 'emerald' : 'teal';
  const isEven = index % 2 === 0;

  return (
    <div className="group relative bg-white rounded-2xl md:rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-900/10 border border-slate-100">
      
      {/* Subtle Gradient Overlay on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/0 via-emerald-50/0 to-emerald-100/0 group-hover:from-emerald-50/30 group-hover:to-emerald-100/30 transition-all duration-700 pointer-events-none" />
      
      {/* Image Section - More Compact and Modern */}
      <div className="relative h-48 md:h-56 overflow-hidden">
        <img
          src={getLocalImage(path.type)}
          alt={path.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
        
        {/* Floating Badge - Modern Chip Design */}
        <div className="absolute top-4 left-4">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-full shadow-lg border border-white/20">
            <IoFlash className={`text-${isEven ? 'amber' : 'emerald'}-500 text-xs`} />
            <span className="text-[9px] font-black uppercase tracking-widest text-slate-800">
              {path.deadline === 'Rolling Admission' ? 'Open Now' : 'Limited'}
            </span>
          </div>
        </div>

        {/* Title Overlay - Always Visible */}
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl md:text-2xl font-black text-white tracking-tight leading-tight drop-shadow-2xl">
            {path.title}
          </h3>
        </div>
      </div>

      {/* Content Area - Clean & Spacious */}
      <div className="p-6 md:p-8">
        {/* Description */}
        <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-2">
          {path.description}
        </p>

        {/* Features Grid - Modern Minimalist */}
        <div className="grid grid-cols-2 gap-2 mb-8">
          {path.features.slice(0, 4).map((feature, idx) => (
            <div 
              key={idx} 
              className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100"
            >
              <div className={`w-5 h-5 rounded-full bg-${themeColor}-100 flex items-center justify-center flex-shrink-0`}>
                <IoCheckmarkCircle className={`text-${themeColor}-500 text-xs`} />
              </div>
              <span className="text-[10px] font-bold text-slate-700 tracking-tight">
                {feature}
              </span>
            </div>
          ))}
        </div>

        {/* Footer - Clean Typography */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-slate-100 rounded-lg">
              <IoCalendarOutline className="text-slate-500 text-sm" />
            </div>
            <div className="flex flex-col">
              <span className="text-[8px] font-black text-slate-400 uppercase tracking-wider">Deadline</span>
              <span className="text-xs font-black text-slate-900">{path.deadline}</span>
            </div>
          </div>
          
          <button
            onClick={onApply}
            className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white rounded-xl font-black text-[10px] uppercase tracking-wider transition-all hover:bg-emerald-700 active:scale-95 shadow-lg shadow-emerald-900/20"
          >
            Apply
            <FiArrowRight className="text-emerald-200" size={14} />
          </button>
        </div>
      </div>

      {/* Decorative Element */}
      <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${path.color} opacity-5 rounded-bl-[4rem] pointer-events-none`} />
    </div>
  );
};
const FeatureCard = ({ feature, onLearnMore }) => {
  const FeatureIcon = feature.icon;
  
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-sm border border-gray-200/70 overflow-hidden transition-all duration-300">
      {/* Icon Header */}
      <div className={`p-4 md:p-5 bg-gradient-to-r ${feature.color} bg-opacity-10`}>
        <div className="flex items-center justify-between">
          <div className="p-2 md:p-2.5 bg-white rounded-xl shadow-xs">
            <FeatureIcon className={`text-xl ${feature.color.split('from-')[1].split('to-')[0].replace('-500', '-600')}`} />
          </div>
          <span className="text-xs font-semibold px-2 py-1 md:px-3 md:py-1 bg-white/90 rounded-full text-gray-700">
            {feature.badge}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 md:p-5">
        <h3 className="font-bold text-gray-900 text-lg mb-3">{feature.title}</h3>
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
          {feature.description}
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-gray-50/70 rounded-lg p-3 text-center">
            <div className="font-bold text-gray-900">{feature.stats.students}</div>
            <div className="text-xs text-gray-500">Students</div>
          </div>
          <div className="bg-gray-50/70 rounded-lg p-3 text-center">
            <div className="font-bold text-gray-900">{feature.stats.success}</div>
            <div className="text-xs text-gray-500">Success Rate</div>
          </div>
        </div>

        {/* Features */}
        <div className="space-y-2 mb-4">
          {feature.features.map((feat, idx) => (
            <div key={idx} className="flex items-center gap-2 text-xs text-gray-600">
              <IoCheckmarkCircleOutline className="text-emerald-500 flex-shrink-0" />
              <span>{feat}</span>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <button
          onClick={onLearnMore}
          className="w-full py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-600 text-white rounded-lg text-sm font-semibold transition-all duration-200"
        >
          Explore Feature
        </button>
      </div>
    </div>
  );
};

const StatCard = ({ stat }) => {
  const StatIcon = stat.icon;

  return (
    <div className="group relative overflow-hidden rounded-xl md:rounded-[24px] bg-white p-1 transition-all duration-500">
      {/* Outer Border Glow - Only visible on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 transition-opacity duration-500`} />
      
      {/* Inner Card Content */}
      <div className="relative h-full w-full rounded-lg md:rounded-[22px] bg-white p-4 md:p-6">
        <div className="flex flex-col h-full justify-between gap-4 md:gap-6">
          
          <div className="flex items-center justify-between">
            {/* Minimalist Glass Icon */}
            <div className={`relative flex items-center justify-center h-12 w-12 md:h-14 md:w-14 rounded-xl md:rounded-2xl bg-gradient-to-br ${stat.color} text-white shadow-2xl`}>
              <StatIcon className="text-xl md:text-2xl transform transition-transform duration-500" />
              {/* Soft Glow behind icon */}
              <div className={`absolute inset-0 rounded-xl md:rounded-2xl bg-gradient-to-br ${stat.color} blur-lg opacity-40 transition-opacity`} />
            </div>

            {/* Micro-Interaction Button */}
            <div className="h-8 w-8 rounded-full bg-slate-50 flex items-center justify-center">
               <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
               </svg>
            </div>
          </div>

          <div>
            <div className="flex flex-col">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">
                {stat.label}
              </span>
              <div className="flex items-baseline gap-2">
                <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight italic">
                  {stat.number}
                </h3>
              </div>
            </div>
            
            {/* Decorative progress track */}
            <div className="mt-4 flex items-center gap-3">
              <div className="h-1.5 flex-1 bg-slate-100 rounded-full overflow-hidden">
                <div className={`h-full w-2/3 bg-gradient-to-r ${stat.color} rounded-full transform transition-transform duration-700 ease-out`} />
              </div>
              <span className="text-[10px] font-bold text-slate-500">
                {stat.sublabel}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add these functions after your imports and before any component definitions
const getSubjectIcon = (subjectName) => {
  const subjectMap = {
    'Biology': FiActivity,
    'Chemistry': FiZap,
    'Physics': FiZap,
    'Mathematics': FiCpu,
    'English': FiBook,
    'Kiswahili': FiGlobe,
    'Geography': FiGlobe,
    'Geogrpahy': FiGlobe, // Added for typo in API
    'History': FiBook,
    'CRE': FiHeart,
    'HRE': FiHeart,
    'IRe': FiHeart,
    'Technical skills': FiActivity,
    'Technica skills': FiActivity, // Added for typo in API
    'Agriculture': FiActivity,
    'Business Studies': FiBarChart2,
    'Business studies': FiBarChart2, // Added for consistency
    'Home science': FiHome,
    'Computer studies': FiCpu,
    'CBC': FiBookOpen
  };
  
  return subjectMap[subjectName] || FiBook;
};

const getDepartmentIcon = (deptName) => {
  const deptMap = {
    'CBC': FiBookOpen,
    'Humanities': FiBook,
    'Humannisties': FiBook, // Added for typo in API
    'Mathematics': FiCpu,
    'Physical sciences': FiZap,
    'Physical Sciences': FiZap, // Added for API
    'Languages': FiGlobe,
    'Technical skills': FiActivity,
    'Teachnicals': FiActivity, // Added for typo in API
    'Computer': FiCpu,
    'ADministration': FiSettings, // Added for typo in API
    'Administration': FiSettings
  };
  
  return deptMap[deptName] || FiBook;
};

// Subject Card Component
const SubjectCard = ({ subject, index }) => {
  const SubjectIcon = getSubjectIcon(subject);

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-sm border border-gray-200/70 p-4 transition-all duration-300">
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2.5 bg-gradient-to-r from-emerald-500 to-emerald-500 rounded-xl shadow-sm">
          <SubjectIcon className="text-white text-lg" />
        </div>
        <div>
          <h4 className="font-bold text-gray-900">{subject}</h4>
        </div>
      </div>
    </div>
  );
};


const ModernFeeCard = ({ 
  feeType, total, distribution = [], pdfPath, 
  year, term, icon: Icon, variant = "dark", badge 
}) => {
  const isDark = variant === "dark";

  return (
    <div className={`
      relative transition-all duration-500 shadow-2xl
      /* Mobile: Full Screen / Desktop: Rounded Card */
      rounded-none md:rounded-[3rem] 
      border-x-0 md:border
      ${isDark ? 'bg-[#0F172A] border-white/5 text-white' : 'bg-white border-slate-100 text-slate-900'}
    `}>
      
      {/* Top Header - Adjusted for Mobile Spacing */}
      <div className="p-6 md:p-12 border-b border-white/5">
        <div className="flex items-start justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-2xl border ${
              isDark ? 'bg-white/5 border-white/10 text-emerald-400' : 'bg-emerald-50 border-emerald-100 text-emerald-600'
            }`}>
              <Icon className="text-xl md:text-2xl" />
            </div>
            <div className="min-w-0">
              <h3 className="text-xl md:text-3xl font-black uppercase tracking-tighter truncate leading-none">
                {feeType}
              </h3>
              <p className={`text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] mt-2 ${isDark ? 'text-white/40' : 'text-slate-400'}`}>
                Session {year} • {term}
              </p>
            </div>
          </div>
          {badge && (
            <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${
              isDark ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-600 text-white'
            }`}>
              {badge}
            </span>
          )}
        </div>

        <div className="space-y-1">
          <p className={`text-[9px] md:text-[10px] font-black uppercase tracking-widest opacity-40`}>
            Total Payable Amount
          </p>
          <div className={`text-2xl md:text-3xl font-black tracking-tighter tabular-nums ${isDark ? 'text-emerald-400' : 'text-slate-900'}`}>
            KSh {total?.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Breakdown Section - Mapped from Distribution JSON */}
      <div className="p-6 md:p-12">
        <h4 className={`text-[10px] md:text-lg font-black uppercase tracking-[0.3em] mb-6 opacity-30`}>
          Detailed Breakdown
        </h4>
        
        <div className="space-y-1">
          {distribution.map((item, idx) => (
            <div 
              key={idx} 
              className={`flex justify-between items-center py-4 border-b last:border-0 ${isDark ? 'border-white/5' : 'border-slate-50'}`}
            >
              <div className="flex flex-col min-w-0 pr-4">
                <span className="font-black text-[13px] md:text-base uppercase tracking-tight truncate">
                  {item.name}
                </span>
                {item.description && (
                  <span className={`text-[10px] font-bold truncate opacity-40`}>
                    {item.description}
                  </span>
                )}
              </div>
              <span className="font-black text-sm md:text-lg tabular-nums shrink-0">
                {item.amount?.toLocaleString()}
              </span>
            </div>
          ))}
        </div>

        {/* Footer Download Link */}
   <div className="mt-10 pt-8 border-t border-white/5 flex justify-center md:justify-start">
  <a 
    href={pdfPath} 
    target="_blank" 
    rel="noopener noreferrer"
    className={`
      /* Width Logic: Full on mobile, Auto-width on desktop */
      w-full md:w-max md:min-w-[240px] 
      
      flex items-center justify-center gap-3 
      px-8 py-4 md:py-5 
      rounded-xl md:rounded-2xl 
      font-black text-[10px] md:text-[11px] 
      uppercase tracking-[0.2em] 
      transition-all active:scale-95 shadow-xl
      ${isDark ? 'bg-white text-slate-900 hover:bg-emerald-50' : 'bg-slate-900 text-white hover:bg-slate-800'}
    `}
  >
    <IoCloudDownloadOutline size={20} className="shrink-0" />
    <span className="truncate">Download PDF Structure</span>
  </a>
</div>
      </div>
    </div>
  );
};
// Video Tour Component


const VideoTourSection = ({ videoTour, videoType, videoThumbnail }) => {
  // State to manage overlay visibility
  const [isPlaying, setIsPlaying] = useState(false);

  if (!videoTour) return null;

  const getYouTubeId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = videoType === 'youtube' ? getYouTubeId(videoTour) : null;

  // Handler to hide overlay when playing
  const handlePlay = () => setIsPlaying(true);

  return (
    <div className="bg-gradient-to-br from-white to-slate-50/50 rounded-2xl md:rounded-3xl border border-slate-100/80 shadow-2xl overflow-hidden transition-all duration-300">
      
      {/* Header Section */}
      <div className="relative p-4 md:p-8 bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 text-white">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[80px] rounded-full -mr-32 -mt-32"></div>
        
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-3 md:gap-4">
            <div className="p-2 md:p-3 bg-white/20 backdrop-blur-xl rounded-xl md:rounded-2xl border border-white/30 shadow-inner">
              <IoVideocamOutline className="text-white text-xl md:text-3xl" />
            </div>
            <div>
              <h3 className="text-xl md:text-3xl font-extrabold tracking-tight">Virtual School Tour</h3>
              <p className="text-emerald-100/90 text-sm md:text-base font-medium mt-1">Experience our School in immersive detail</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full">
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Ultra HD 4K</span>
          </div>
        </div>
      </div>

      {/* Video Container */}
      <div className="p-4 md:p-10">
        <div className="relative mx-auto" style={{ maxWidth: '900px' }}>
          
          <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-slate-200/50 bg-black group">
            
            {/* Play Button Overlay - Now conditional on !isPlaying */}
            {!isPlaying && (
              <div 
                className="absolute inset-0 flex items-center justify-center z-20 cursor-pointer group-hover:bg-black/20 transition-all duration-500"
                onClick={handlePlay}
              >
                <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-emerald-600/90 backdrop-blur-md border-4 border-white/30 flex items-center justify-center shadow-2xl transform group-110 transition-transform">
                  <FiPlay className="text-white text-xl md:text-2xl ml-1.5" />
                </div>
                
                {/* Background Thumbnail */}
                {videoThumbnail && (
                  <div className="absolute inset-0 -z-10 bg-cover bg-center transition-transform duration-700 group-105" 
                       style={{ backgroundImage: `url(${videoThumbnail})` }} />
                )}
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
            )}
            
            {/* Video Player Interface */}
            <div className="relative aspect-video w-full">
              {videoType === 'youtube' && videoId ? (
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&autoplay=${isPlaying ? 1 : 0}`}
                  className="absolute inset-0 w-full h-full"
                  title="Virtual school Tour"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                <video
                  onPlay={handlePlay}
                  onPause={() => setIsPlaying(false)}
                  controls
                  className="absolute inset-0 w-full h-full"
                  poster={videoThumbnail || ''}
                  preload="metadata"
                >
                  <source src={videoTour} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          </div>

          {/* Stats Bar */}
          <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6 px-2">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 bg-emerald-50 rounded-lg"><FiClock className="text-emerald-600 font-bold" /></div>
                <span className="text-sm font-bold text-slate-700">3:45 Duration</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 bg-teal-50 rounded-lg"><FiEye className="text-teal-600 font-bold" /></div>
                <span className="text-sm font-bold text-slate-700">Premium Quality</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3 bg-slate-100/50 p-2 rounded-2xl pr-4">
              <div className="flex -space-x-2.5">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gradient-to-br from-slate-300 to-slate-400 shadow-sm"></div>
                ))}
              </div>
              <span className="text-xs font-black text-slate-600 uppercase tracking-tight">1.2k+ Views</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="p-6 md:p-8 border-t border-slate-100 bg-white">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-slate-600 font-medium text-center sm:text-left">
            Want a more detailed view? <span className="font-extrabold text-emerald-600">Open the Interactive Map</span>
          </p>
          <button className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-3.5 bg-slate-900 hover:bg-emerald-600 text-white rounded-2xl text-sm font-bold transition-all shadow-lg active:scale-95">
            <FiMapPin className="text-lg" />
            <span>Launch School Map</span>
          </button>
        </div>
      </div>
    </div>
  );
};


// Vision & Mission Section - Redesigned
const VisionMissionSection = ({ vision, mission, motto, videoTour, videoType, videoThumbnail }) => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12 space-y-12 md:space-y-16">
      
      {/* Vision & Mission Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
        
        {/* Vision */}
        <div className="md:col-span-7">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-[10px] md:text-xs font-black text-emerald-600 uppercase tracking-[0.3em]">
                Our Vision
              </span>
              <div className="flex-1 h-px bg-emerald-100" />
            </div>
            
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              The <span className="text-emerald-600">Future</span> We Build
            </h3>
            
            <p className="text-slate-600 text-sm md:text-base lg:text-lg leading-relaxed max-w-xl">
              {vision || "To be a premier center of academic excellence in Machakos, nurturing globally competitive leaders through integrity, innovation, and holistic development."}
            </p>
            
            <div className="pt-4">
              <div className="flex items-center gap-2 text-emerald-600">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                <span className="text-[10px] font-black uppercase tracking-wider">Est. 1985 • Excellence Since</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mission */}
        <div className="md:col-span-5">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-[10px] md:text-xs font-black text-emerald-600 uppercase tracking-[0.3em]">
                Our Mission
              </span>
              <div className="flex-1 h-px bg-emerald-100" />
            </div>
            
            <h3 className="text-xl md:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight">
              What Drives Us
            </h3>
            
            <p className="text-slate-600 text-sm md:text-base lg:text-lg leading-relaxed">
              {mission || "Providing quality education through modern infrastructure, fostering discipline, innovation, and self-reliance in every student who walks through our gates."}
            </p>
            
            <div className="pt-4 grid grid-cols-2 gap-4">
              <div>
                <div className="text-2xl font-black text-emerald-600">500+</div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Students</div>
              </div>
              <div>
                <div className="text-2xl font-black text-emerald-600">98%</div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Tour Section - Full Width */}
      {videoTour && (
        <div className="relative">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-[10px] md:text-xs font-black text-emerald-600 uppercase tracking-[0.3em]">
              Virtual Experience
            </span>
            <div className="flex-1 h-px bg-emerald-100" />
          </div>
          
          <VideoTourSection 
            videoTour={videoTour}
            videoType={videoType}
            videoThumbnail={videoThumbnail}
          />
        </div>
      )}

      {/* Motto - Separated with elegance */}
      <div className="relative pt-8 md:pt-12 mt-8 md:mt-12 border-t border-emerald-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center">
              <FiAward className="text-emerald-600 text-xl" />
            </div>
            
            <div>
              <span className="text-[8px] md:text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-1">
                The Spirit of Matungulu
              </span>
              <h3 className="text-lg md:text-xl font-black text-slate-900 tracking-tight">
                School Motto
              </h3>
            </div>
          </div>

          <div className="md:text-right">
            <p className="text-xl md:text-2xl lg:text-3xl font-black italic text-emerald-700 tracking-tight">
              "{motto || "Strive for Excellence"}"
            </p>
            <div className="flex items-center justify-end gap-2 mt-2">
              <div className="w-2 h-2 rounded-full bg-emerald-600" />
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider">
                Matungulu Girls High School
              </span>
            </div>
          </div>
        </div>

        {/* Decorative Element */}
        <div className="absolute -top-3 right-0 text-emerald-200/30 text-6xl font-black select-none">
          "
        </div>
      </div>
    </div>
  );
};


// NEW: Academic Results Section Component
const AcademicResultsSection = ({ documentData }) => {
  const resultsData = [
    {
      name: 'KCSE Results',
      pdf: documentData?.kcseResultsPdf,
      pdfName: documentData?.kcsePdfName,
      description: documentData?.kcseDescription,
      year: documentData?.kcseYear,
      term: documentData?.kcseTerm,
      icon: FiTrendingUp,
      accent: 'text-indigo-400',
      bg: 'bg-indigo-400/10'
    }
  ];

  const availableResults = resultsData.filter(result => result.pdf);
  if (availableResults.length === 0) return null;

  return (
    /* Responsive Wrapper: Full width (rounded-none) on mobile, Elegant Card on desktop */
    <div className="bg-white rounded-none md:rounded-[2.5rem] border-x-0 md:border border-slate-100 shadow-2xl overflow-hidden">
      
      {/* Header Section - Edge-to-edge look */}
      <div className="relative p-6 md:p-12 bg-[#0F172A] text-white">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/20 blur-[80px] md:blur-[100px] rounded-full -mr-32 -mt-32" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shrink-0">
              <IoStatsChartOutline className="text-blue-400 text-2xl md:text-3xl" />
            </div>
            <div className="min-w-0">
              <h3 className="text-lg md:text-3xl font-black uppercase tracking-tighter">Academic KCSE <span className="text-blue-400">Reports</span></h3>
              <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] mt-1">Official Performance Archives</p>
            </div>
          </div>
          <div className="flex items-center self-start md:self-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl">
            <FiAward className="text-amber-400" />
            <span className="text-[10px] font-black uppercase tracking-widest text-white/70">Verified Data</span>
          </div>
        </div>
      </div>

      {/* Main Grid - Results Cards */}
      <div className="p-4 md:p-12 bg-slate-50/30">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
          {availableResults.map((result, index) => (
            <div 
              key={index}
              className="group bg-white border border-slate-200 rounded-2xl md:rounded-[2rem] p-6 transition-all hover:shadow-xl"
            >
              <div className="flex items-start justify-between mb-6">
                <div className={`p-4 rounded-2xl ${result.bg} ${result.accent} shrink-0`}>
                  <result.icon size={22} className="md:size-6" />
                </div>
                <div className="text-right">
                  <span className="block text-xl font-black text-slate-900 leading-none">{result.year}</span>
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{result.term || 'Annual'}</span>
                </div>
              </div>
              
              <h4 className="font-black text-slate-900 text-[13px] md:text-sm uppercase tracking-tight mb-2 truncate">
                {result.name}
              </h4>
              
              {result.description && (
                <p className="text-slate-400 text-[10px] font-bold leading-relaxed mb-6 line-clamp-2 min-h-[30px]">
                  {result.description}
                </p>
              )}
              
              <a 
                href={result.pdf}
                download={result.pdfName}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full py-4 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest transition-all active:scale-95"
              >
                <IoCloudDownloadOutline size={16} />
                <span>Get Report</span>
              </a>
            </div>
          ))}
        </div>

        {/* Additional Documents - Horizontal Bento */}
        {documentData?.additionalDocuments && documentData.additionalDocuments.length > 0 && (
          <div className="mt-10 md:mt-16 pt-10 border-t border-slate-200">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-6 px-1">
              Resources & Support Docs
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {documentData.additionalDocuments.map((doc, index) => (
                <div key={index} className="flex items-center justify-between p-4 md:p-6 bg-white rounded-2xl border border-slate-200 group transition-all">
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="p-3 bg-slate-100 rounded-xl group-hover:bg-blue-50 transition-colors shrink-0">
                      <IoDocumentTextOutline className="text-slate-500 group-hover:text-blue-500" />
                    </div>
                    <div className="min-w-0">
                      <h5 className="font-black text-slate-900 text-[11px] uppercase tracking-wide truncate">
                        {doc.description || doc.filename}
                      </h5>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">
                        {doc.year} • {doc.term || 'General'}
                      </p>
                    </div>
                  </div>
                  <a 
                    href={doc.filepath}
                    download={doc.filename}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-slate-900 text-white rounded-xl active:scale-90"
                  >
                    <FiDownload size={14} />
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};



const ModernUniformRequirementsSection = ({ 
  admissionFeeDistribution, 
  admissionFeePdf, 
  admissionFeePdfName,
  admissionFeeDescription,
  admissionFeeYear,
  admissionFeeTerm
}) => {
  const uniformItems = admissionFeeDistribution || [];
  const totalCost = uniformItems.reduce((sum, item) => sum + (item.amount || 0), 0);

  return (
    <div className="bg-white rounded-lg md:rounded-2xl border border-slate-200 overflow-hidden">
      
      {/* Header Section */}
      <div className="p-6 md:p-8 bg-slate-900 text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <IoShirtOutline className="text-emerald-400 text-2xl md:text-3xl" />
            <div>
              <h3 className="text-xl md:text-2xl font-bold tracking-tight">
                Admission <span className="text-emerald-400">Breakdown</span>
              </h3>
              <div className="flex items-center gap-2 mt-1 text-sm text-slate-400">
                <span>{admissionFeeYear || '2026'} • {admissionFeeTerm || 'Full Session'}</span>
                {admissionFeeDescription && (
                  <>
                    <span>•</span>
                    <span className="italic">{admissionFeeDescription}</span>
                  </>
                )}
              </div>
            </div>
          </div>
          
          {admissionFeePdf && (
            <a 
              href={admissionFeePdf}
              download={admissionFeePdfName}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium transition-colors"
            >
              <IoCloudDownloadOutline className="text-lg" />
              <span>Download PDF</span>
            </a>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 md:p-8 bg-slate-50">
        {uniformItems.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {uniformItems.map((item, index) => (
                <div 
                  key={item.id || index}
                  className="bg-white border border-slate-200 rounded-lg p-5"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-semibold text-slate-900">
                      {item.name}
                    </h4>
                    <div className={`px-2 py-1 rounded text-xs font-medium ${
                      item.optional ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {item.optional ? 'Optional' : 'Required'}
                    </div>
                  </div>
                  
                  {item.description && (
                    <p className="text-sm text-slate-500 mb-4">
                      {item.description}
                    </p>
                  )}
                  
                  <div className="flex justify-between items-center pt-3 border-t border-slate-100">
                    <span className="text-sm text-slate-500">Amount</span>
                    <span className="text-lg font-bold text-slate-900">
                      KSh {parseInt(item.amount || 0).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Total Summary */}
            <div className="mt-6 p-6 bg-white border border-slate-200 rounded-lg">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <FiDollarSign className="text-emerald-600 text-xl" />
                  <div>
                    <span className="text-sm text-slate-500 block">Total Admission Cost</span>
                    <span className="text-2xl font-bold text-slate-900">
                      KSh {totalCost.toLocaleString()}
                    </span>
                  </div>
                </div>
                
                <div className="flex gap-6 text-sm">
                  <div>
                    <span className="text-slate-500 block">Mandatory</span>
                    <span className="font-semibold text-slate-900">{uniformItems.filter(i => !i.optional).length} items</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Optional</span>
                    <span className="font-semibold text-emerald-600">{uniformItems.filter(i => i.optional).length} items</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <FiAlertTriangle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h4 className="text-lg font-semibold text-slate-900 mb-1">No Items Available</h4>
            <p className="text-sm text-slate-500">The admission breakdown is being updated.</p>
          </div>
        )}
      </div>
    </div>
  );
};


const ModernFAQItem = ({ faq, index, openFaq, setOpenFaq }) => {
  const isOpen = openFaq === index;

  return (
    <div className={`
      group relative transition-all duration-500
      ${isOpen ? 'scale-[1.02] md:scale-100' : 'hover:scale-[1.01]'}
    `}>
      {/* Background Glow on Open */}
      {isOpen && (
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-2xl blur-xl" />
      )}
      
      <div className={`
        relative bg-white rounded-2xl overflow-hidden border transition-all duration-500
        ${isOpen 
          ? 'border-emerald-200 shadow-2xl shadow-emerald-900/10' 
          : 'border-slate-200 shadow-md hover:border-emerald-200/50'
        }
      `}>
        {/* Top Accent Bar */}
        <div className={`
          absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500
          transform origin-left transition-transform duration-500
          ${isOpen ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}
        `} />

        <button
          onClick={() => setOpenFaq(isOpen ? null : index)}
          className="w-full px-6 md:px-8 py-5 md:py-6 text-left relative"
        >
          <div className="flex items-start gap-4 md:gap-6">
            {/* Animated Number Badge */}
            <div className="relative">
              <div className={`
                absolute inset-0 rounded-xl blur-md transition-opacity duration-500
                ${isOpen ? 'opacity-100 bg-emerald-500/30' : 'opacity-0'}
              `} />
              <div className={`
                relative w-8 h-8 md:w-10 md:h-10 rounded-xl flex items-center justify-center
                transition-all duration-500 font-black text-sm md:text-base
                ${isOpen 
                  ? 'bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-lg scale-110' 
                  : 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100'
                }
              `}>
                {String(index + 1).padStart(2, '0')}
              </div>
            </div>

            {/* Question */}
            <div className="flex-1 pt-1">
              <h3 className={`
                font-black tracking-tight text-sm md:text-lg pr-8
                transition-colors duration-500
                ${isOpen ? 'text-emerald-600' : 'text-slate-900'}
              `}>
                {faq.question}
              </h3>
            </div>

            {/* Chevron with Animation */}
            <div className={`
              absolute right-6 top-1/2 -translate-y-1/2
              w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center
              border-2 transition-all duration-500
              ${isOpen 
                ? 'rotate-180 border-emerald-200 bg-emerald-50' 
                : 'border-slate-200 bg-white group-hover:border-emerald-200'
              }
            `}>
              <FiChevronDown className={`
                transition-all duration-500 text-sm md:text-base
                ${isOpen ? 'text-emerald-600' : 'text-slate-400 group-hover:text-emerald-500'}
              `} />
            </div>
          </div>
        </button>

        {/* Answer Section */}
        <div className={`
          grid transition-all duration-500 ease-in-out
          ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}
        `}>
          <div className="overflow-hidden">
            <div className="px-6 md:px-8 pb-6 md:pb-8">
              <div className="pl-[48px] md:pl-[64px]">
                {/* Divider with Animation */}
                <div className={`
                  h-px bg-gradient-to-r from-emerald-200 via-teal-200 to-transparent
                  transform origin-left transition-all duration-700 delay-300
                  ${isOpen ? 'scale-x-100' : 'scale-x-0'}
                `} />
                
                {/* Answer Text */}
                <div className="mt-5">
                  <p className="text-slate-600 font-medium leading-relaxed text-sm md:text-base">
                    {faq.answer}
                  </p>
                  
                  {/* Footer Note */}
                  <div className="flex items-center gap-3 mt-5">
                    <div className="flex items-center gap-1.5">
                      <div className="relative">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping absolute" />
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 relative" />
                      </div>
                      <span className="text-[9px] font-black text-emerald-600 uppercase tracking-wider">
                        Official Policy
                      </span>
                    </div>
                    <div className="w-px h-3 bg-slate-200" />
                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-wider">
                      Updated 2026
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ComprehensiveAdmissions() {
  const [activeTab, setActiveTab] = useState('overview');
  const [openFaq, setOpenFaq] = useState(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [loading, setLoading] = useState(false);
  const [schoolData, setSchoolData] = useState(null);
  const [documentData, setDocumentData] = useState(null);

  const router = useRouter();

  // Data for Career Departments
 

  // Data for Education Systems
  const educationSystems = [
    {
      system: {
        name: '8-4-4 SYSTEM',
        fullName: '8 Years Primary, 4 Years Secondary, 4 Years University'
      },
      icon: IoSchoolOutline,
      color: 'from-emerald-600 to-emerald-500',
      description: 'The 8-4-4 system focuses on providing students with practical skills alongside academic knowledge. It emphasizes technical subjects and prepares students for both higher education and immediate employment opportunities.',
      structure: [
        { years: '8', name: 'Primary' },
        { years: '4', name: 'Secondary' },
        { years: '4', name: 'University' }
      ],
      features: [
        {
          title: 'Technical Emphasis',
          description: 'Strong focus on technical and vocational subjects'
        },
        {
          title: 'National Exams',
          description: 'KCPE at primary level and KCSE at secondary level'
        },
        {
          title: 'University Pathway',
          description: 'Direct progression to university education'
        },
        {
          title: 'Practical Skills',
          description: 'Emphasis on hands-on learning and real-world application'
        }
      ],
      advantages: [
        'Proven track record with decades of implementation',
        'Clear progression path to higher education',
        'Strong emphasis on technical and practical skills',
        'Nationally recognized certification (KCSE)',
        'Well-established university entry system'
      ]
    },
    {
      system: {
        name: 'CBC',
        fullName: 'Competency Based Curriculum'
      },
      icon: FiBookOpen,
      color: 'from-teal-600 to-emerald-500',
      description: 'The CBC system focuses on developing seven core competencies: communication, collaboration, critical thinking, creativity, citizenship, digital literacy, and learning to learn. It emphasizes practical skills and values over rote memorization.',
      structure: [
        { years: '2', name: 'Pre-Primary' },
        { years: '6', name: 'Primary' },
        { years: '6', name: 'Junior & Senior School' }
      ],
      features: [
        {
          title: 'Competency Based',
          description: 'Focus on skills and competencies rather than content'
        },
        {
          title: 'Continuous Assessment',
          description: 'Regular assessment throughout the learning process'
        },
        {
          title: 'Parental Involvement',
          description: 'Strong emphasis on parent-teacher collaboration'
        },
        {
          title: 'Digital Integration',
          description: 'Incorporation of technology in learning'
        }
      ],
      advantages: [
        'Develops practical life skills',
        'Encourages creativity and innovation',
        'Personalized learning paths',
        'Strong focus on values and citizenship',
        'Better preparation for the modern workforce'
      ]
    }
  ];

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      try {
        // Fetch school data
        const schoolResponse = await fetch('/api/school');
        if (schoolResponse.ok) {
          const schoolData = await schoolResponse.json();
          if (schoolData.success) {
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
        console.error('Error fetching data:', error);
        toast.error('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  // Dynamic stats from API data
  const dynamicStats = [
    { 
      icon: IoPeopleOutline, 
      number: schoolData?.studentCount ? schoolData.studentCount.toString() : '1,200+', 
      label: 'Total Students', 
      sublabel: 'Currently Enrolled',
      color: 'from-emerald-500 to-emerald-500'
    },
    { 
      icon: FiTrendingUp, 
      number: schoolData?.admissionCapacity ? schoolData.admissionCapacity.toString() : '300', 
      label: 'Admission Capacity', 
      sublabel: 'Annual Intake',
      color: 'from-emerald-500 to-emerald-500'
    },
    { 
      icon: IoSparkles, 
      number: schoolData?.staffCount ? `${schoolData.staffCount}:1` : '20:1', 
      label: 'Student-Teacher', 
      sublabel: 'Personalized Ratio',
      color: 'from-emerald-500 to-emerald-500'
    },
    { 
      icon: FiAward, 
      number: '98%', 
      label: 'Success Rate', 
      sublabel: 'Academic Excellence',
      color: 'from-emerald-500 to-emerald-500'
    },
  ];




  // Admission paths - Updated based on your school's focus
  const admissionPaths = [
    {
      title: 'Form 1 Entry',
      icon: FiBookOpen,
      description: 'Join our Form 1 program with comprehensive academic curriculum and extracurricular activities',
      features: ['Academic Excellence', 'Extra-curricular Activities', 'Digital Literacy', 'Talent Development'],
      deadline: schoolData?.admissionCloseDate ? new Date(schoolData.admissionCloseDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'May 30, 2024',
      color: 'from-emerald-600 to-emerald-500',
      type: 'grade7'
    },
    {
      title: 'Transfer Students',
      icon: FiArrowRight,
      description: 'Seamless transfer from other schools with credit recognition and orientation support',
      features: ['Credit Transfer', 'Placement Assessment', 'Records Review', 'Orientation Program'],
      deadline: 'Rolling Admission',
      color: 'from-teal-600 to-emerald-500',
      type: 'transfer'
    }
  ];

  // Academic Features
  const innovativeFeatures = [
    {
      icon: IoRocketOutline,
      title: 'Academic Excellence',
      description: 'Comprehensive curriculum with focus on core subjects and practical skills development',
      features: ['Quality Teaching', 'Regular Assessments', 'Exam Preparation', 'Academic Support'],
      badge: 'Advanced',
      color: 'from-emerald-500 to-emerald-500',
      stats: { students: '500+', success: '95%' }
    },
    {
      icon: IoAccessibilityOutline,
      title: 'Holistic Development',
      description: 'Focus on academic, social, emotional, and physical growth through various programs',
      features: ['Sports Programs', 'Clubs & Societies', 'Leadership Training', 'Character Building'],
      badge: 'Comprehensive',
      color: 'from-emerald-500 to-emerald-500',
      stats: { students: '100%', success: '98%' }
    },
    {
      icon: IoBuildOutline,
      title: 'Practical Skills',
      description: 'Emphasis on practical competencies and real-world application of knowledge',
      features: ['Laboratory Work', 'Field Trips', 'Project Work', 'Skill Development'],
      badge: 'Practical',
      color: 'from-emerald-500 to-emerald-500',
      stats: { students: '300+', success: '90%' }
    }
  ];

  // Updated tabs based on your academic page design
  const tabs = [
    { id: 'overview', label: 'Overview', icon: FiBook },
    { id: 'academics', label: 'Academics', icon: FiBookOpen },
    { id: 'career-paths', label: 'Career compass', icon: FiBriefcase },
    { id: 'requirements', label: 'Requirements', icon: FiFileText },
    { id: 'results', label: 'Results', icon: IoStatsChartOutline }, // New Results tab
    { id: 'faq', label: 'FAQ', icon: FiHelpCircle },
  ];

  // Process steps for transfer
  const transferProcess = [
    {
      step: 1,
      title: 'Application Submission',
      description: 'Submit transfer documents and academic records for evaluation',
      duration: '2-3 days',
      requirements: ['Current school report', 'Birth certificate', 'Transfer letter']
    },
    {
      step: 2,
      title: 'Assessment & Placement',
      description: 'Academic assessment for proper grade placement and subject allocation',
      duration: '1 week',
      requirements: ['Placement tests', 'Subject evaluation', 'Skill assessment']
    },
    {
      step: 3,
      title: 'Credit Evaluation',
      description: 'Review and transfer of completed coursework and competencies',
      duration: '3-5 days',
      requirements: ['Transcript analysis', 'Credit approval', 'CBC competency mapping']
    },
    {
      step: 4,
      title: 'Admission & Orientation',
      description: 'Final admission and comprehensive student orientation program',
      duration: '1 week',
      requirements: ['Parent meeting', 'Student orientation', 'Resource distribution']
    }
  ];

  // Facilities Data from your academic page
  const facilitiesData = [
    {
      icon: FiCpu,
      title: 'Computer Labs',
      description: 'Modern computer labs with high-speed internet and latest software',
      features: ['Programming', 'Digital Literacy', 'Research', 'Online Learning']
    },
    {
      icon: FiActivity,
      title: 'Science Labs',
      description: 'Fully equipped laboratories for Physics, Chemistry and Biology',
      features: ['Experiments', 'Research', 'Practical Skills', 'Innovation']
    },
    {
      icon: IoLibraryOutline,
      title: 'Library',
      description: 'Digital and physical library with extensive resources',
      features: ['E-Books', 'Study Spaces', 'Research', 'Quiet Zones']
    },
    {
      icon: FiSmartphone,
      title: 'Smart Classrooms',
      description: 'Technology-enabled classrooms for interactive learning',
      features: ['Projectors', 'Digital Boards', 'Online Resources', 'Collaboration']
    }
  ];

  // FAQ Data updated with admission-specific questions
  const faqs = [
    {
      question: 'What are the admission requirements?',
      answer: schoolData?.admissionRequirements || 'Admission requires completion of primary education, KCPE results, birth certificate, and medical records. Transfer students need additional documents including previous school reports and transfer letter.'
    },
    {
      question: 'What is the fee structure and payment options?',
      answer: 'We offer both day and boarding options with transparent fee structures. Fees can be paid annually, per term, or in installments. We accept bank transfers, MPesa, and cash payments at the finance office.'
    },
    {
      question: 'Are there scholarships or financial aid available?',
      answer: 'Yes, we offer merit-based scholarships for academic excellence, talent scholarships in sports and arts, and need-based financial aid. Contact our admissions office for eligibility criteria and application details.'
    },
    {
      question: 'What curriculum do you follow?',
      answer: 'We follow the national curriculum with both CBC and 8-4-4 systems. We also integrate digital literacy and practical skills development across all subjects.'
    }
  ];

  const handleApply = (path) => {
    setShowApplicationForm(true);
  };

  const handleLearnMore = (feature) => {
    toast.success(`Learn more about ${feature.title}`);
  };

  const refreshData = () => {
    setLoading(true);
    const fetchSchoolData = async () => {
      try {
        const response = await fetch('/api/school');
        const data = await response.json();
        if (data.success) {
          setSchoolData(data.school);
          toast.success('Data refreshed successfully!');
        }
      } catch (error) {
        toast.error('Failed to refresh data');
      } finally {
        setLoading(false);
      }
    };

    fetchSchoolData();
  };

  // Format dates for display
  const formatDate = (dateString) => {
    if (!dateString) return 'Not set';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-emerald-50/30 to-teal-50/20 p-4 md:p-6">
      <Toaster position="top-right" richColors />
      
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Modernized Admissions Portal Header with Matungulu Girls Theme */}
<header className="relative bg-gradient-to-r from-emerald-900 to-teal-800 rounded-2xl md:rounded-[2rem] p-4 sm:p-5 md:p-8 text-white overflow-hidden shadow-2xl border border-emerald-700/30 mb-8">
  {/* Background Glows */}
  <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
  <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
  
  <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-6">
    <div>
      {/* School Branding */}
      <div className="flex items-center gap-3 mb-4">
        <div className="h-8 w-1 bg-emerald-400 rounded-full shadow-[0_0_15px_rgba(52,211,153,0.5)]" />
        <div>
          <h2 className="text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] text-emerald-400">
            {schoolData?.name || 'Matungulu Girls High School'}
          </h2>
          <p className="text-[8px] sm:text-[10px] italic font-medium text-emerald-200/60 tracking-widest uppercase">
            "Strive to Excel"
          </p>
        </div>
      </div>
      
      {/* Title */}
      <div className="flex items-center gap-3">
        <div className="p-2 bg-white/10 backdrop-blur-md rounded-xl border border-white/10">
          <IoSchoolOutline className="text-xl sm:text-2xl md:text-3xl text-emerald-300" />
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-white tracking-tight">
          Admissions <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-300">Portal</span>
        </h1>
      </div>
    </div>

    {/* Refresh Button */}
    <button
      onClick={refreshData}
      disabled={loading}
      className="flex items-center justify-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl font-bold text-[11px] sm:text-sm tracking-widest text-white hover:bg-white/20 w-full sm:w-auto transition-all disabled:opacity-70 disabled:cursor-not-allowed"
    >
      {loading ? (
        <>
          <CircularProgress size={12} thickness={6} sx={{ color: '#ffffff' }} />
          <span>REFRESHING...</span>
        </>
      ) : (
        <>
          <FiRefreshCw className="text-base sm:text-lg" />
          <span>REFRESH DATA</span>
        </>
      )}
    </button>
  </div>

  {/* Stats Summary */}
  <div className="mb-4 sm:mb-6 px-1">
    <p className="text-emerald-100/90 text-xs sm:text-base font-medium leading-relaxed sm:leading-loose">
      <span className="text-white font-black text-base sm:text-xl md:text-2xl underline decoration-emerald-500/50 underline-offset-4 mr-1">
        {schoolData?.studentCount || '1,200+'}
      </span> 
      <span className="tracking-tight sm:tracking-normal">students enrolled with</span>
      <span className="text-white font-black text-base sm:text-xl md:text-2xl underline decoration-teal-500/50 underline-offset-4 ml-1 mr-1">
        {schoolData?.admissionCapacity || '300'}
      </span>
      <span className="tracking-tight sm:tracking-normal">admission slots available</span>
    </p>
  </div>

  {/* Quick Stats Grid */}
  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
      <p className="text-[10px] sm:text-xs font-bold text-emerald-300 uppercase tracking-wider mb-1">Students</p>
      <p className="text-lg sm:text-xl md:text-2xl font-black text-white">{schoolData?.studentCount || '1,200+'}</p>
    </div>
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
      <p className="text-[10px] sm:text-xs font-bold text-emerald-300 uppercase tracking-wider mb-1">Capacity</p>
      <p className="text-lg sm:text-xl md:text-2xl font-black text-white">{schoolData?.admissionCapacity || '300'}</p>
    </div>
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
      <p className="text-[10px] sm:text-xs font-bold text-emerald-300 uppercase tracking-wider mb-1">Staff</p>
      <p className="text-lg sm:text-xl md:text-2xl font-black text-white">{schoolData?.staffCount || '60'}</p>
    </div>
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
      <p className="text-[10px] sm:text-xs font-bold text-emerald-300 uppercase tracking-wider mb-1">Success Rate</p>
      <p className="text-lg sm:text-xl md:text-2xl font-black text-white">98%</p>
    </div>
  </div>

  {/* Additional Info */}
  <div className="mt-4 text-xs sm:text-sm text-emerald-200/80">
    <span className="inline-flex items-center gap-1">
      <IoSparkles className="text-emerald-300" size={14} />
      Join our community of excellence - Applications now open
    </span>
  </div>
</header>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
          {dynamicStats.map((stat, index) => (
            <StatCard key={index} stat={stat} />
          ))}
        </div>

{schoolData && (() => {
  // Logic to check status against current date (2026)
  const today = new Date();
  const openDate = new Date(schoolData.admissionOpenDate);
  const closeDate = new Date(schoolData.admissionCloseDate);
  const isOpen = today >= openDate && today <= closeDate;

return (
  <div className={`rounded-2xl p-5 md:p-8 shadow-2xl border-2 transition-all duration-500 ${
    isOpen 
      ? 'bg-gradient-to-br from-emerald-600 to-teal-800 border-emerald-400/20' 
      : 'bg-gradient-to-br from-slate-800 to-slate-950 border-slate-700'
  }`}>
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
      
      {/* Status Section */}
      <div className="flex items-start sm:items-center gap-4">
        <div className={`p-3 md:p-4 rounded-2xl backdrop-blur-md border shadow-inner shrink-0 ${
          isOpen ? 'bg-white/20 border-white/30' : 'bg-slate-800 border-slate-700'
        }`}>
          <IoCalendarOutline className={`w-6 h-6 md:w-7 md:h-7 ${isOpen ? 'text-white' : 'text-slate-500'}`} />
        </div>
        <div className="min-w-0">
          <h3 className="font-black text-lg md:text-2xl text-white tracking-tighter uppercase leading-tight">
            {isOpen ? 'Admissions Now Open' : 'Admissions Currently Closed'}
          </h3>
          <p className={`text-[11px] md:text-sm font-bold leading-snug mt-1 ${isOpen ? 'text-emerald-100' : 'text-slate-400'}`}>
            {isOpen 
              ? 'Join Matungulu Girls High School for the upcoming academic year.' 
              : 'The application window has officially ended for this period.'}
          </p>
        </div>
      </div>

      {/* Dynamic Date Grid - Optimized for Mobile */}
      <div className="grid grid-cols-2 gap-0 py-3 px-2 sm:px-6 sm:py-4 bg-black/20 rounded-2xl border border-white/5">
        <div className="px-4 border-r border-white/10">
          <p className={`text-[9px] font-black uppercase tracking-wider mb-1 ${isOpen ? 'text-emerald-300' : 'text-slate-500'}`}>
            Open Date
          </p>
          <p className="font-black text-sm md:text-lg text-white tabular-nums">
            {formatDate(schoolData.admissionOpenDate)}
          </p>
        </div>
        <div className="px-4">
          <p className={`text-[9px] font-black uppercase tracking-wider mb-1 ${isOpen ? 'text-emerald-300' : 'text-slate-500'}`}>
            Final Deadline
          </p>
          <p className="font-black text-sm md:text-lg text-white tabular-nums">
            {formatDate(schoolData.admissionCloseDate)}
          </p>
        </div>
      </div>

      {/* Interactive Action Button - Full width on mobile */}
      <button
        disabled={!isOpen}
        onClick={() => router.push('/pages/apply-for-admissions')}
        className={`w-full lg:w-auto px-8 py-4 rounded-xl font-black text-xs uppercase tracking-[0.2em] shadow-xl transition-all active:scale-95 ${
          isOpen 
            ? 'bg-white text-emerald-800 hover:bg-emerald-50 hover:shadow-emerald-500/20' 
            : 'bg-slate-800/50 text-slate-500 cursor-not-allowed border border-slate-700'
        }`}
      >
        {isOpen ? 'Apply Now' : 'Closed'}
      </button>
    </div>
  </div>
);
})()}

        {/* Navigation Tabs - Modernized */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-sm border border-gray-200/70 overflow-hidden mb-6">
          <div className="flex overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => {
              const TabIcon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-4 py-3 md:px-6 md:py-4 font-semibold transition-all whitespace-nowrap border-b-2 ${
                    activeTab === tab.id
                      ? 'border-emerald-500 text-emerald-600 bg-emerald-50/50'
                      : 'border-transparent text-gray-600'
                  }`}
                >
                  <TabIcon className="text-lg" />
                  <span className="text-sm md:text-base">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-sm border border-gray-200/70 p-4 md:p-5">
    {activeTab === 'overview' && (
  <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-10 md:space-y-24">
    
    {/* 1. Hero / Introduction Section */}
    <div className="relative pt-4 pb-2 text-center px-4">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 mb-4 md:mb-6">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
        </span>
        <span className="text-[9px] md:text-[10px] font-black uppercase tracking-wider text-emerald-700">
          Admissions Open {new Date().getFullYear()}
        </span>
      </div>
      
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 mb-3 tracking-tight leading-[1.1] text-balance">
        Welcome to{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
          {schoolData?.name || "Our School"}
        </span>
      </h2>
      
      <p className="text-slate-500 mx-auto text-xs sm:text-base md:text-md leading-relaxed px-2 text-balance">
        {schoolData?.description || "We are committed to nurturing well-rounded learners through quality education and strong values."}
      </p>
    </div>

    {/* 2. Vision/Mission Section */}
    <div className="px-2 md:px-4">
      <VisionMissionSection 
        vision={schoolData?.vision}
        mission={schoolData?.mission}
        motto={schoolData?.motto}
        videoUrl={schoolData?.videoTourUrl}
      />
    </div>

  

    {/* 3. Admission Paths - Mobile Optimized Grid */}
{/* 3. Admission Paths - Full Bleed on Mobile */}
<section className="relative overflow-hidden py-12 md:py-20 bg-slate-50 rounded-none md:rounded-[40px] md:mx-4 px-0 md:px-8">
  <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-64 h-64 bg-emerald-200/20 blur-3xl rounded-full" />
  
  <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-0">
    <div className="mb-10 text-center md:text-left">
      <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100/50 rounded-full mb-4">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
        <span className="text-[10px] font-black uppercase tracking-widest text-emerald-700">Admissions 2026</span>
      </div>
      <h3 className="text-xl md:text-3xl font-black text-slate-900 tracking-tighter mb-4 leading-none">
        Your <span className="text-emerald-600">Future</span> Starts Here
      </h3>
      {/* Added additional line of description below */}
      <p className="text-slate-500 text-sm md:text-md max-w-2xl mx-auto md:mx-0 font-medium leading-relaxed">
        Select the enrollment track that matches your goals. <br className="hidden md:block" />
        Join a community dedicated to academic excellence and character development.
      </p>
    </div>

    {/* Grid: 0 gap on mobile for the full-bleed cards to stack perfectly */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
      {admissionPaths.map((path, index) => (
        <AdmissionPathCard
          key={path.title}
          path={path}
          index={index}
          onApply={() => router.push('/pages/apply-for-admissions')}
        />
      ))}
    </div>
  </div>
</section>
{/* 4. Bento Grid - Refined for Small Screens */}
<div className="py-10 md:py-16 px-0 md:px-6 max-w-4xl mx-auto">
  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-6 border-b-2 border-slate-100 px-4 md:px-0">
    <div className="flex-1">
      <div className="inline-flex items-center gap-2 px-2 py-1 bg-slate-100 rounded-md mb-3 border border-slate-200">
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-600"></div>
        <span className="text-[9px] font-black uppercase tracking-widest text-slate-600">School Profile</span>
      </div>
      <h2 className="text-xl md:text-3xl font-black text-slate-900 tracking-tighter leading-[1.1]">
        Why <span className="text-emerald-600 whitespace-nowrap">Matungulu Girls High School?</span>
      </h2>
    </div>
    
    <div className="flex flex-wrap items-center gap-3 mt-2">
      <div className="flex items-center gap-1 text-[10px] text-slate-500 font-black uppercase">
        <FiAward className="text-emerald-600" />
        <span>KICD APPROVED</span>
      </div>
      <div className="flex items-center gap-1 text-[10px] text-slate-500 font-black uppercase">
        <FiUsers className="text-emerald-600" />
        <span>COMMUNITY</span>
      </div>
    </div>
  </div>

<div className="grid grid-cols-1 md:grid-cols-12 auto-rows-min gap-4">
    
    {/* Academic Card */}
    <div className="md:col-span-7 relative rounded-xl md:rounded-3xl bg-slate-50 border-b md:border-2 border-slate-200 p-5 md:p-6">
      <div className="flex flex-col h-full gap-3">
        <div className="w-9 h-9 bg-white text-emerald-600 rounded-lg flex items-center justify-center shadow-sm border border-slate-200 shrink-0">
          <IoBulbOutline size={18} />
        </div>
        <div>
          <h4 className="text-base md:text-lg font-black text-slate-900 mb-1 uppercase tracking-tight">Academic Achievement</h4>
          <p className="text-slate-600 text-[12px] md:text-[13px] font-bold leading-snug">
            We maintain a track record of academic excellence, consistently producing top-tier KCSE results. Our specialized focus on STEM subjects equips students with technical skills for the modern economy.
          </p>
        </div>
      </div>
    </div>

    {/* Faculty Card */}
    <div className="md:col-span-5 relative rounded-xl md:rounded-3xl bg-slate-900 p-5 md:p-6 text-white border-b border-white/5 md:border-none">
      <div className="flex flex-col h-full gap-3">
        <div className="w-9 h-9 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg flex items-center justify-center shrink-0">
          <FiUsers size={18} className="text-white" />
        </div>
        <div>
          <h4 className="text-base md:text-lg font-black mb-1 uppercase tracking-tight text-emerald-400">Expert Educators</h4>
          <p className="text-slate-300 text-[12px] md:text-[13px] font-bold leading-snug">
            Our faculty consists of TSC-certified professionals providing personalized mentorship, ensuring every student discovers their unique potential through innovation.
          </p>
        </div>
      </div>
    </div>

    {/* Infrastructure Card */}
    <div className="md:col-span-12 relative rounded-xl md:rounded-3xl bg-white border-b md:border-2 border-slate-900 p-5 md:p-8 flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center border border-emerald-100 shrink-0">
          <FiCpu size={20} />
        </div>
        <h4 className="text-base md:text-xl font-black text-slate-900 uppercase tracking-tighter">Modern Learning Resources</h4>
      </div>
      <p className="text-slate-600 text-[12px] md:text-[14px] font-bold leading-snug max-w-4xl">
        Our School features state-of-the-art science laboratories and advanced computer labs. We provide tech-integrated classrooms and a vast library to foster research and self-reliance.
      </p>
      <div className="flex items-center gap-3 mt-1 px-3 py-1.5 bg-slate-50 rounded-lg border border-slate-200 self-start">
        <span className="text-[9px] font-black text-slate-900 uppercase tracking-widest">
          10k+ Global Alumni Network
        </span>
      </div>
    </div>
</div>
</div>
  </div>
)}

{activeTab === 'academics' && (
  <div className="animate-in fade-in slide-in-from-bottom-6 duration-700 space-y-10 md:space-y-20">
    
    {/* Section 1: Hero Header - Mobile Optimized */}
    <div className="relative pt-2">
      <div className="relative flex flex-col lg:flex-row lg:items-end justify-between gap-6 md:gap-8 border-b border-slate-100 pb-8 md:pb-12 px-2">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-600 rounded-full mb-4 md:mb-6">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-100 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white"></span>
            </span>
            <span className="text-[9px] md:text-[10px] text-white font-black uppercase tracking-[0.2em]">Academic Excellence</span>
          </div>
          <h2 className="text-xl md:text-3xl font-black text-slate-900 tracking-tighter leading-[1.1] mb-4">
            Academic <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">Programs</span>
          </h2>
          <p className="text-slate-900 text-base md:text-lg font-medium leading-relaxed ">
            Matungulu Girls High School offers a future-ready, holistic curriculum 
            specifically designed to cultivate critical thinking, academic excellence, 
            and global leadership. We empower our students to navigate the complexities 
            of the modern world with integrity, innovation, and a commitment to excellence.
          </p>
        </div>

        {/* Download Button - Fixed width for mobile */}
        {documentData?.curriculumPDF && (
          <a 
            href={documentData.curriculumPDF}
            download={documentData.curriculumPdfName}
            target="_blank"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-4 px-6 py-4 bg-slate-900 text-white rounded-2xl active:scale-95 transition-all shadow-xl"
          >
            <FiDownload className="text-xl text-emerald-400" />
            <div className="text-left">
              <div className="font-bold text-xs md:text-sm tracking-tight">Download Curriculum</div>
              {documentData.curriculumYear && (
                <div className="text-[10px] opacity-60">
                  {documentData.curriculumYear} • {documentData.curriculumTerm || 'Full Year'}
                </div>
              )}
            </div>
          </a>
        )}
      </div>
    </div>

    {/* Section 2: Education Systems */}
    <section className="px-2">
      <div className="flex flex-col mb-6 md:mb-12">
        <h3 className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.3em] mb-1">Paths to Success</h3>
        <h4 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Education Systems</h4>
      </div>
      
      {/* Grid: 1 column on mobile, 2 on large */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10">
        {educationSystems.map((system, index) => (
          <ModernEducationSystemCard key={index} {...system} />
        ))}
      </div>
    </section>

    {/* Section 3 & 4: Subject Tiles & Departments (Unified Visuals) */}
    {[
      { title: "Subjects Offered", desc: "Core and elective disciplines.", count: schoolData?.subjects?.length, data: schoolData?.subjects, iconColor: "text-emerald-600", bgColor: "bg-emerald-50" },
      { title: "Departments", desc: "Academic and administrative wings.", count: schoolData?.departments?.length, data: schoolData?.departments, iconColor: "text-teal-600", bgColor: "bg-teal-50" }
    ].map((sect, i) => (
      <section key={i} className="relative bg-slate-50 rounded-[2rem] p-6 md:p-12 mx-1">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <div>
            <h3 className="text-xl md:text-3xl font-black text-slate-900 tracking-tight">{sect.title}</h3>
            <p className="text-slate-500 text-xs font-medium">{sect.desc}</p>
          </div>
          <div className="px-3 py-1.5 bg-white self-start rounded-full shadow-sm border border-slate-200 text-[10px] font-black text-slate-600 uppercase">
            {sect.count || 0} {i === 0 ? 'Subjects' : 'Departments'}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
          {sect.data?.map((item, idx) => {
            const Icon = i === 0 ? getSubjectIcon(item) : getDepartmentIcon(item);
            return (
              <div key={idx} className="bg-white p-4 rounded-2xl border border-slate-100 flex flex-col items-center text-center">
                <div className={`w-10 h-10 mb-3 rounded-xl ${sect.bgColor} flex items-center justify-center shrink-0`}>
                  <Icon className={`${sect.iconColor} text-lg`} />
                </div>
                <h4 className="font-bold text-slate-800 text-[11px] leading-tight uppercase tracking-tight">{item}</h4>
              </div>
            );
          })}
        </div>
      </section>
    ))}

    {/* Section 5: Stats & Calendar - Refined Responsive Dates */}
    {schoolData?.openDate && (
      <div className="relative overflow-hidden bg-slate-900 md:rounded-[3rem] p-8 md:p-16 w-full">
        {/* Decorative Glow */}
        <div className="absolute top-0 right-0 w-48 md:w-96 h-48 md:h-96 bg-emerald-500/10 blur-[60px] md:blur-[100px] rounded-full -mr-24 -mt-24" />
        
        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center gap-8 md:gap-12">
          <div className="text-center lg:text-left max-w-sm">
            <h3 className="text-white text-lg md:text-xl font-black tracking-tight mb-3 uppercase">
              Academic <span className="text-emerald-500">Calendar</span>
            </h3>
            <p className="text-slate-400 text-xs md:text-md font-medium leading-relaxed">
              Mark your journey. Stay ahead of the curve with our key enrollment dates.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 md:gap-8 w-full lg:w-auto">
            {/* Year Opens Card */}
            <div className="bg-white/5 backdrop-blur-xl p-4 md:p-8 rounded-2xl border border-white/10 text-center min-w-0 flex flex-col justify-center">
              <div className="text-emerald-400 font-black text-[8px] md:text-[10px] uppercase tracking-[0.2em] mb-2 md:mb-3">
                Year Opens
              </div>
              <div className="text-white font-black tracking-tighter tabular-nums leading-tight">
                <span className="block md:hidden text-md whitespace-nowrap">
                  {formatDateWithOrdinal(schoolData.openDate)}
                </span>
                <span className="hidden md:block text-xl">
                  {formatDateWithOrdinal(schoolData.openDate)}
                </span>
              </div>
            </div>

            {/* Year Closes Card */}
            <div className="bg-white/5 backdrop-blur-xl p-4 md:p-8 rounded-2xl border border-white/10 text-center min-w-0 flex flex-col justify-center">
              <div className="text-teal-400 font-black text-[8px] md:text-[10px] uppercase tracking-[0.2em] mb-2 md:mb-3">
                Year Closes
              </div>
              <div className="text-white font-black tracking-tighter tabular-nums leading-tight">
                <span className="block md:hidden text-md whitespace-nowrap">
                  {formatDateWithOrdinal(schoolData.closeDate)}
                </span>
                <span className="hidden md:block text-xl">
                  {formatDateWithOrdinal(schoolData.closeDate)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
)}

{activeTab === 'career-paths' && (
  <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-10 md:space-y-16">
    {/* Hero Section */}
    <div className="text-center px-4">
      <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-100 rounded-full mb-6">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
        </span>
        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">Career Readiness</span>
      </div>
      <h2 className="text-xl md:text-3xl font-black text-slate-900 tracking-tight mb-4 leading-tight">
        Future <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">Pathways</span>
      </h2>
      <p className="text-slate-500 text-sm md:text-lg max-w-2xl mx-auto leading-relaxed">
        Strategic academic planning for diverse career trajectories. Our curriculum integrates industry-relevant skills with traditional excellence.
      </p>
    </div>

    {/* Render the CareerSearchPage component */}
    <CareerSearchPage />
  </div>
)}

{activeTab === 'requirements' && (
  <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-8 md:space-y-12">
    
    {/* Hero Header */}
    <div className="text-center mb-8 md:mb-12 px-2 md:px-4">
      <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-full mb-6">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
        </span>
        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">Admission Checklist</span>
      </div>
      <h2 className="text-lg sm:text-xl md:text-3xl font-black text-slate-900 tracking-tight mb-4 px-2">
        Application <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">Requirements</span>
      </h2>
      <p className="text-slate-500 text-base md:text-lg max-w-3xl mx-auto leading-relaxed px-2">
        Everything you need to prepare for a successful application journey.
      </p>
    </div>

    {/* Uniform Requirements - Modern Card with API Data */}
    <ModernUniformRequirementsSection 
      admissionFeeDistribution={documentData?.admissionFeeDistribution}
      admissionFeePdf={documentData?.admissionFeePdf}
      admissionFeePdfName={documentData?.admissionFeePdfName}
      admissionFeeDescription={documentData?.admissionFeeDescription}
      admissionFeeYear={documentData?.admissionFeeYear}
      admissionFeeTerm={documentData?.admissionFeeTerm}
    />

    {/* Required Documents - Modern Grid */}
    <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-2xl p-6 md:p-10 overflow-hidden">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-6">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-slate-900 rounded-2xl shadow-xl shadow-slate-200">
              <IoDocumentTextOutline className="text-white text-xl md:text-2xl" />
            </div>
            <h3 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tighter">
              Required Documents
            </h3>
          </div>
          <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">
            Essential paperwork for admission processing
          </p>
        </div>
        
        <div className="flex items-center gap-2 px-5 py-2.5 bg-emerald-50 text-emerald-700 rounded-2xl border border-emerald-100">
          <IoCheckmarkCircleOutline className="text-lg" />
          <span className="text-[10px] font-black uppercase tracking-widest">Mandatory Set</span>
        </div>
      </div>

      {/* Document Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {(schoolData?.admissionDocumentsRequired?.length > 0 ? schoolData.admissionDocumentsRequired : [
          "Original KCPE Certificate",
          "Birth Certificate",
          "Passport Size Photos (4)",
          "Medical Report",
          "Transfer Letter (if applicable)",
          "Previous School Reports"
        ]).map((doc, index) => (
          <div 
            key={index}
            className="group relative bg-white border-2 border-slate-50 rounded-[1rem] p-6 hover:border-emerald-400 hover:shadow-lg"
          >
            <div className="flex items-center gap-4">
              <div className="relative shrink-0">
                <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-emerald-600 transition-colors">
                  <IoDocumentTextOutline className="text-slate-400 group-hover:text-white text-xl" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px] font-black border-4 border-white">
                  {index + 1}
                </div>
              </div>
              
              <div className="min-w-0">
                <h4 className="font-black text-slate-900 text-sm leading-tight uppercase tracking-tight truncate group-hover:whitespace-normal">
                  {doc}
                </h4>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[9px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded uppercase tracking-wider">
                    Required
                  </span>
                  {index === 0 && (
                    <span className="text-[9px] font-black text-amber-600 bg-amber-50 px-2 py-0.5 rounded uppercase tracking-wider">
                      Original
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Important Notes - Full-Screen Mobile Strategy */}
      <div className="mt-8 md:mt-12 p-6 md:p-12 bg-slate-900 rounded-none md:rounded-[2.5rem] relative overflow-hidden border-y border-white/5 md:border shadow-2xl">
        <div className="absolute top-0 right-0 w-48 md:w-64 h-48 md:h-64 bg-amber-500/10 blur-[60px] md:blur-[80px] rounded-full -mr-24 -mt-24 md:-mr-32 md:-mt-32"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-2.5 bg-amber-500 rounded-xl shadow-lg shadow-amber-500/20">
              <FiAlertTriangle className="text-slate-900 text-lg md:text-xl" />
            </div>
            <h4 className="text-[10px] md:text-[11px] font-black text-white uppercase tracking-[0.3em] md:tracking-[0.4em]">
              Important <span className="text-amber-500">Submission</span> Notes
            </h4>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 md:gap-y-5">
            {[
              "All documents must be original or certified copies",
              "Documents should be submitted in a clear plastic folder",
              "Incomplete applications will not be processed",
              "Submit copies along with originals for verification"
            ].map((note, i) => (
              <div key={i} className="flex items-start gap-4 group">
                <div className="relative mt-1.5 shrink-0">
                  <div className="w-2 h-2 rounded-full bg-amber-500 z-10 relative" />
                  <div className="absolute inset-0 w-2 h-2 rounded-full bg-amber-500 animate-ping opacity-20" />
                </div>
                
                <p className="text-[12px] md:text-[13px] font-bold text-slate-400 leading-relaxed transition-colors group-hover:text-white">
                  {note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

    {/* Transfer Process - Modern Timeline Optimized for All Screens */}
    <div className="bg-slate-900 rounded-none md:rounded-[3rem] p-6 md:p-12 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600/10 blur-[100px] rounded-full -mr-32 -mt-32 invisible md:visible" />

      <div className="relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 md:mb-16 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 bg-emerald-600 rounded-xl shadow-lg shadow-emerald-600/20">
                <FiArrowRight className="text-white text-xl" />
              </div>
              <h3 className="text-xl md:text-xl font-black uppercase tracking-tighter">
                Transfer <span className="text-emerald-400">Process</span>
              </h3>
            </div>
            <p className="text-slate-400 text-sm md:text-base font-medium">Seamless transition with 4-step verification</p>
          </div>
          
          <div className="flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full">
            <FiClock className="text-amber-400 text-sm" />
            <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-slate-300">2-3 Weeks Total</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
          {transferProcess.map((step, index) => (
            <div 
              key={index}
              className="group relative bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 transition-all duration-500 hover:bg-white/[0.07]"
            >
              <div className="absolute -top-3 -left-3 w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-black text-lg shadow-xl shadow-emerald-900/40 z-20">
                {step.step}
              </div>
              
              <div className="relative z-10 space-y-4">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-black uppercase tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                      {step.title}
                    </h4>
                  </div>
                  <div className="flex items-center gap-1.5 text-amber-500/80 text-[10px] font-black uppercase tracking-widest">
                    <FiClock className="text-xs" />
                    {step.duration}
                  </div>
                </div>
                
                <p className="text-slate-400 text-xs md:text-sm font-bold leading-relaxed">
                  {step.description}
                </p>
                
                <div className="pt-4 border-t border-white/5 space-y-3">
                  <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">Checklist</span>
                  <ul className="space-y-2.5">
                    {step.requirements.map((req, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-[11px] md:text-xs text-slate-300 font-medium">
                        <div className="mt-1 w-1.5 h-1.5 rounded-full bg-emerald-500/50 shrink-0" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {index < transferProcess.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 w-6 h-[1px] bg-white/10 z-0" />
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 md:mt-16 p-6 md:p-8 bg-white/[0.03] border border-white/5 rounded-2xl md:rounded-[2rem]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center gap-5">
              <div className="p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
                <IoCheckmarkCircleOutline className="text-emerald-400 text-3xl" />
              </div>
              <div>
                <h4 className="text-xl font-black text-white">Ready to Join Us?</h4>
                <p className="text-slate-400 text-sm font-medium">Complete all steps for official admission approval</p>
              </div>
            </div>
            
            <button 
              onClick={() => router.push('/pages/apply-for-admissions')}
              className="
                flex items-center justify-center
                w-full md:w-max md:min-w-[220px]
                px-8 py-4 md:px-10 md:py-5 
                bg-white text-slate-900 
                rounded-xl md:rounded-2xl 
                font-black uppercase 
                tracking-[0.15em] md:tracking-widest 
                text-[10px] md:text-[11px] 
                transition-all 
                md:hover:bg-emerald-50
                md:active:scale-95 
                shadow-lg md:shadow-2xl shadow-white/10
              "
            >
              Start Application
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
)}



{activeTab === 'results' && (
  <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-6 md:space-y-12">
    
    <div className="text-center mb-6 md:mb-12 pt-4 md:pt-0">
      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-100 rounded-full mb-4 md:mb-6">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
        </span>
        <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-emerald-700">Academic Performance</span>
      </div>
      
      <h2 className="text-xl md:text-3xl font-black text-slate-900 tracking-tighter mb-4 px-4 leading-tight">
        Examination <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">Results</span>
      </h2>
      
      <p className="text-slate-500 text-sm md:text-lg max-w-2xl mx-auto leading-relaxed px-6">
        Access past examination results, performance reports, and academic archives.
      </p>
    </div>

    <div className="-mx-4 md:mx-0">
       <AcademicResultsSection documentData={documentData} />
    </div>

    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border-y md:border border-emerald-200/60 rounded-none md:rounded-3xl p-6 md:p-8 -mx-4 md:mx-0">
      <div className="flex flex-col md:flex-row items-start gap-4 md:gap-6">
        <div className="p-3 bg-white rounded-2xl shadow-sm shadow-emerald-200/50">
          <FiInfo className="text-emerald-500 text-xl md:text-2xl" />
        </div>
        <div className="space-y-2">
          <h4 className="font-black text-emerald-900 text-sm md:text-lg uppercase tracking-tight">
            Results Archive Information
          </h4>
          <p className="text-emerald-700/80 text-xs md:text-base font-medium leading-relaxed">
            All examination results are available for download in PDF format. Results are typically uploaded 
            within <span className="text-emerald-900 font-bold">2 weeks</span> after official release. For any missing results or technical issues, please contact 
            the academic office.
          </p>
        </div>
      </div>
    </div>
  </div>
)}

{activeTab === 'faq' && (
  <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-8 md:space-y-10">
    
    <div className="text-center mb-8 md:mb-10 px-2 md:px-4">
      <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-full mb-6">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
        </span>
        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">Quick Answers</span>
      </div>
      <h2 className="text-xl sm:text-xl md:text-2xl font-black text-slate-900 tracking-tight mb-4 px-2">
        Frequently Asked <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">Questions</span>
      </h2>
      <p className="text-slate-500 text-base md:text-lg max-w-3xl mx-auto leading-relaxed px-2">
        Clear answers to common queries about admissions, curriculum, fees, and school policies.
      </p>
    </div>

    <div className="space-y-3 md:space-y-4 px-2 md:px-0">
      {faqs.map((faq, index) => (
        <ModernFAQItem
          key={index}
          faq={faq}
          index={index}
          openFaq={openFaq}
          setOpenFaq={setOpenFaq}
        />
      ))}
    </div>
  </div>
)}
        </div>

        {/* Modernized CTA Section */}
        <div className="relative overflow-hidden bg-slate-900 rounded-xl md:rounded-[24px] p-4 md:p-12 text-center shadow-2xl">
          
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-2xl bg-emerald-500/10 blur-[80px] rounded-full pointer-events-none" />
          
          <div className="relative z-10 flex flex-col items-center max-w-2xl mx-auto">
            
            <div className="mb-4 md:mb-5 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
              <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-200">
                Enrollment Open {new Date().getFullYear()}
              </span>
            </div>

            <h2 className="text-xl md:text-3xl font-black text-white mb-4 tracking-tight leading-tight text-balance">
              Ready to Begin Your <span className="text-emerald-400">Academic Journey</span>
            </h2>
            
            <p className="text-slate-400 mb-6 md:mb-8 text-sm md:text-base leading-relaxed max-w-lg mx-auto text-balance">
              Join a community dedicated to nurturing future leaders through personalized attention and holistic development.
            </p>

            <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto">
              <button
                onClick={() => router.push('/pages/apply-for-admissions')}
                className="flex-shrink-0 px-3 py-2.5 sm:px-4 sm:py-3 md:px-6 md:py-3.5 
                           bg-white text-slate-900 rounded-xl font-bold text-xs sm:text-sm 
                           tracking-wide flex items-center justify-center gap-2 
                           active:scale-95 transition-transform"
              >
                Apply Online
                <FiArrowRight size={14} />
              </button>
            </div>

            <p className="mt-4 md:mt-6 text-[10px] uppercase tracking-widest text-slate-500 font-bold opacity-60">
              Application takes ~5 minutes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
'use client';
import { useState, useEffect, useRef } from 'react';
import { 
  FiMenu, 
  FiX, 
  FiHome, 
  FiInfo, 
  FiBook, 
  FiUserPlus,
  FiCalendar,
  FiImage,
  FiMail,
  FiUsers,
  FiFileText,
  FiChevronDown,
  FiBriefcase,
  FiChevronRight,
  FiLock,
  FiDollarSign,
  FiGrid
} from 'react-icons/fi';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function ModernNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAcademicDropdownOpen, setIsAcademicDropdownOpen] = useState(false);
  const [isResourcesDropdownOpen, setIsResourcesDropdownOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
  const [isMobileResourcesDropdownOpen, setIsMobileResourcesDropdownOpen] = useState(false);
  
  const academicDropdownRef = useRef(null);
  const resourcesDropdownRef = useRef(null);
  const mobileDropdownRef = useRef(null);
  const mobileResourcesDropdownRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
        setIsMobileDropdownOpen(false);
        setIsMobileResourcesDropdownOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (academicDropdownRef.current && !academicDropdownRef.current.contains(event.target)) {
        setIsAcademicDropdownOpen(false);
      }
      if (resourcesDropdownRef.current && !resourcesDropdownRef.current.contains(event.target)) {
        setIsResourcesDropdownOpen(false);
      }
      if (mobileDropdownRef.current && !mobileDropdownRef.current.contains(event.target)) {
        setIsMobileDropdownOpen(false);
      }
      if (mobileResourcesDropdownRef.current && !mobileResourcesDropdownRef.current.contains(event.target)) {
        setIsMobileResourcesDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  // Main navigation
  const mainNavigation = [
    { 
      name: 'Home', 
      href: '/', 
      icon: FiHome,
      exact: true
    },
    { 
      name: 'About', 
      href: '/pages/AboutUs',
      icon: FiInfo
    },
  
    { 
      name: 'Fees', 
      href: '/pages/fees', 
      icon: FiDollarSign 
    },
    { 
      name: 'Admissions', 
      href: '/pages/admissions',
      icon: FiUserPlus
    },
      { 
      name: 'Academics', 
      href: '/pages/academics',
      icon: FiBook,
      hasDropdown: true
    },
     { 
      name: 'Contact', 
      href: '/pages/contact', 
      icon: FiMail 
    },
    { 
      name: 'Gallery', 
      href: '/pages/gallery', 
      icon: FiImage 
    },
    { 
      name: 'News & Events', 
      href: '/pages/eventsandnews', 
      icon: FiCalendar 
    },
   
  ];

  const academicDropdownItems = [
    {
      name: 'Student Portal',
      href: '/pages/StudentPortal',
      icon: FiFileText
    },
    {
      name: 'Guidance & Counselling',
      href: '/pages/Guidance-and-Councelling',
      icon: FiUsers
    },
    {
      name: 'Apply Now',
      href: '/pages/apply-for-admissions',
      icon: FiUserPlus
    },
     {
      name: 'School Rules',
      href: '/pages/TermsandPrivacy',
      icon: FiUserPlus
    }
  ];

  // Resources dropdown items - INCLUDES ADMIN LOGIN
  const resourcesDropdownItems = [
       {
      name: 'Admin Login',
      href: '/pages/adminLogin',
      icon: FiLock,
      isHighlighted: true
    }
 ,
    {
      name: 'Our Jobs',
      href: '/pages/careers',
      icon: FiBriefcase
    },
     {
      name: 'Staff Directory',
      href: '/pages/staff',
      icon: FiUsers
    }
 
  ];

  // Function to check if a link is active
  const isActiveLink = (href, exact = false) => {
    if (!pathname) return false;
    if (href === '/') {
      return pathname === '/';
    }
    if (exact) {
      return pathname === href;
    }
    return pathname && pathname.startsWith(href);
  };

  // Navigation handlers
  const handleLogoClick = () => {
    window.location.href = '/';
  };

  const handleLogoKeyDown = (e) => {
    if (e.key === 'Enter') {
      window.location.href = '/';
    }
  };

  return (
    <>
      <nav 
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-gradient-to-r from-emerald-900/95 via-teal-900/95 to-slate-900/95 backdrop-blur-lg shadow-xl border-b border-white/10' 
            : 'bg-gradient-to-r from-emerald-800 via-teal-850 to-slate-800 shadow-lg'
        }`}
      >
        <div className="w-full px-3 xs:px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between min-h-[4.5rem] sm:min-h-[5.2rem]">
            
            {/* Logo Section - Mobile Responsive */}
            <div 
              className="flex items-center gap-2 xs:gap-3  cursor-pointer hover:opacity-90 transition-opacity "
              onClick={handleLogoClick}
              role="button"
              tabIndex={0}
              onKeyDown={handleLogoKeyDown}
            >
              <div className="relative w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 
                bg-white/20 rounded-lg xs:rounded-xl flex items-center justify-center 
                shadow-lg border border-white/30 overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                <Image
                  src="/MatG.jpg"
                  alt="Matungulu Girls High School Logo"
                  width={48}
                  height={48}
                  className="relative z-10 filter drop-shadow-sm group-hover:scale-100 transition-transform duration-300 w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14"
                  priority
                  sizes="(max-width: 480px) 48px, (max-width: 640px) 56px, 64px"
                />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-white to-emerald-100 bg-clip-text text-transparent whitespace-nowrap tracking-tight">
                   MatG
                </h1>
                <p className="text-xs sm:text-sm text-white/90 font-medium tracking-wide whitespace-nowrap">
                  Strive to Excel
                </p>
              </div>
            </div>

            {/* Desktop Navigation - Centered */}
            <div className="hidden lg:flex items-center justify-center flex-1 mx-8 min-w-0">
              <div className="flex items-center justify-between w-full max-w-4xl gap-1">
                {mainNavigation.map((item) => {
                  const isActive = isActiveLink(item.href, item.exact);
                  
                  if (item.hasDropdown) {
                    return (
                      <div 
                        key={item.name} 
                        className="relative"
                        ref={academicDropdownRef}
                        onMouseEnter={() => setIsAcademicDropdownOpen(true)}
                        onMouseLeave={() => setIsAcademicDropdownOpen(false)}
                      >
                        <button
                          className={`group flex items-center gap-0.5 xs:gap-1 font-bold transition-all text-[0.65rem] xs:text-[0.7rem] uppercase tracking-wide whitespace-nowrap px-2 xs:px-2.5 py-2 relative ${
                            isActive || isAcademicDropdownOpen
                              ? 'text-white' 
                              : 'text-white/85 hover:text-white'
                          }`}
                          aria-expanded={isAcademicDropdownOpen}
                          aria-haspopup="true"
                        >
                          <item.icon className="text-xs flex-shrink-0" />
                          <span className="truncate">{item.name}</span>
                          <FiChevronDown className={`text-xs transition-transform duration-200 ${
                            isAcademicDropdownOpen ? 'rotate-180' : ''
                          }`} />
                          
                          {/* Active underline indicator */}
                          {(isActive || isAcademicDropdownOpen) && (
                            <span className="absolute bottom-1.5 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-emerald-300 rounded-full"></span>
                          )}
                        </button>

                        {/* Academic Dropdown Menu */}
                        {isAcademicDropdownOpen && (
                          <div className="absolute top-full left-0 mt-1 w-52 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50">
                            <div className="px-3 py-2 border-b border-gray-100 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-t-xl">
                              <h3 className="font-bold text-gray-800 text-[0.7rem] uppercase tracking-wider flex items-center gap-1.5">
                                <FiBook className="text-emerald-700 text-xs" />
                                Academic Resources
                              </h3>
                            </div>
                            
                            {academicDropdownItems.map((dropdownItem) => (
                              <a
                                key={dropdownItem.name}
                                href={dropdownItem.href}
                                className={`group flex items-center gap-2 px-3 py-2.5 text-xs font-medium transition-all hover:pl-3.5 ${
                                  isActiveLink(dropdownItem.href)
                                    ? 'text-emerald-700 bg-emerald-50 border-l-3 border-emerald-600'
                                    : 'text-gray-700 hover:text-emerald-700 hover:bg-emerald-50/50'
                                }`}
                                onClick={() => setIsAcademicDropdownOpen(false)}
                              >
                                <dropdownItem.icon className="text-xs flex-shrink-0" />
                                <span className="flex-1 truncate">{dropdownItem.name}</span>
                                <FiChevronRight className="text-gray-400 text-xs group-hover:text-emerald-600 opacity-0 group-hover:opacity-100 transition-all" />
                              </a>
                            ))}
                            
                            <a 
                              href="https://analytics.zeraki.app/" 
                              className="group flex items-center gap-2 px-3 py-2.5 text-xs font-medium text-gray-700 hover:text-emerald-700 hover:bg-emerald-50/50 transition-all hover:pl-3.5"
                              onClick={() => setIsAcademicDropdownOpen(false)}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <div className="w-4 h-4 flex-shrink-0">
                                <img 
                                  src="/zeraki.jpg" 
                                  alt="Zeraki Analytics" 
                                  className="w-full h-full object-cover rounded-md border border-gray-200 group-hover:border-emerald-300 transition-colors"
                                />
                              </div>
                              <span className="flex-1 truncate">Zeraki Analytics</span>
                              <FiChevronRight className="text-gray-400 text-xs group-hover:text-emerald-600 opacity-0 group-hover:opacity-100 transition-all" />
                            </a>
                          </div>
                        )}
                      </div>
                    );
                  }

                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      className={`group flex items-center gap-0.5 xs:gap-1 font-bold transition-all text-[0.65rem] xs:text-[0.7rem] uppercase tracking-wide whitespace-nowrap px-2 xs:px-2.5 py-2 relative ${
                        isActive 
                          ? 'text-white' 
                          : 'text-white/85 hover:text-white'
                      }`}
                    >
                      <item.icon className="text-xs flex-shrink-0 group-hover:scale-100 transition-transform" />
                      <span className="truncate">{item.name}</span>
                      
                      {/* Active underline indicator */}
                      {isActive && (
                        <span className="absolute bottom-1.5 left-1/2 transform -translate-x-1/2 w-5 h-0.5 bg-emerald-300 rounded-full"></span>
                      )}
                      
                      {/* Hover underline indicator */}
                      <span className="absolute bottom-1.5 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-white/50 rounded-full group-hover:w-5 transition-all duration-300"></span>
                    </a>
                  );
                })}
                
                {/* Resources Dropdown (Staff, Careers & Admin Login) - ALWAYS SHOWN */}
                <div 
                  className="relative"
                  ref={resourcesDropdownRef}
                  onMouseEnter={() => setIsResourcesDropdownOpen(true)}
                  onMouseLeave={() => setIsResourcesDropdownOpen(false)}
                >
                  <button
                    className={`group flex items-center gap-0.5 xs:gap-1 font-bold transition-all text-[0.65rem] xs:text-[0.7rem] uppercase tracking-wide whitespace-nowrap px-2 xs:px-2.5 py-2 relative ${
                      isResourcesDropdownOpen || 
                      isActiveLink('/pages/staff') || 
                      isActiveLink('/pages/career') ||
                      isActiveLink('/pages/adminLogin')
                        ? 'text-white' 
                        : 'text-white/85 hover:text-white'
                    }`}
                    aria-expanded={isResourcesDropdownOpen}
                    aria-haspopup="true"
                  >
                    <FiGrid className="text-xs flex-shrink-0" />
                    <span className="truncate">Resources</span>
                    <FiChevronDown className={`text-xs transition-transform duration-200 ${
                      isResourcesDropdownOpen ? 'rotate-180' : ''
                    }`} />
                    
                    {/* Active underline indicator */}
                    {(isResourcesDropdownOpen || 
                      isActiveLink('/pages/staff') || 
                      isActiveLink('/pages/career') ||
                      isActiveLink('/pages/adminLogin')) && (
                      <span className="absolute bottom-1.5 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-emerald-300 rounded-full"></span>
                    )}
                  </button>

                  {/* Resources Dropdown Menu - INCLUDES ADMIN LOGIN */}
                  {isResourcesDropdownOpen && (
                    <div className="absolute top-full left-0 mt-1 w-52 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50">
                      <div className="px-3 py-2 border-b border-gray-100 bg-gradient-to-r from-teal-50 to-emerald-50 rounded-t-xl">
                        <h3 className="font-bold text-gray-800 text-[0.7rem] uppercase tracking-wider flex items-center gap-1.5">
                          <FiGrid className="text-teal-700 text-xs" />
                          Resources & Admin
                        </h3>
                      </div>
                      
                      {resourcesDropdownItems.map((dropdownItem) => (
                        <a
                          key={dropdownItem.name}
                          href={dropdownItem.href}
                          className={`group flex items-center gap-2 px-3 py-2.5 text-xs font-medium transition-all hover:pl-3.5 ${
                            isActiveLink(dropdownItem.href)
                              ? dropdownItem.isHighlighted
                                ? 'bg-gradient-to-r from-emerald-50 to-emerald-100 border-l-3 border-emerald-600 text-emerald-700'
                                : 'text-teal-700 bg-teal-50 border-l-3 border-teal-600'
                              : dropdownItem.isHighlighted
                                ? 'text-emerald-600 hover:text-emerald-700 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-emerald-100'
                                : 'text-gray-700 hover:text-teal-700 hover:bg-teal-50/50'
                          }`}
                          onClick={() => setIsResourcesDropdownOpen(false)}
                        >
                          <dropdownItem.icon className={`text-xs flex-shrink-0 ${
                            dropdownItem.isHighlighted ? 'text-emerald-600' : ''
                          }`} />
                          <span className="flex-1 truncate">{dropdownItem.name}</span>
                          <FiChevronRight className={`text-xs ${
                            dropdownItem.isHighlighted 
                              ? 'text-emerald-400 group-hover:text-emerald-600' 
                              : 'text-gray-400 group-hover:text-teal-600'
                          } opacity-0 group-hover:opacity-100 transition-all`} />
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Mobile Menu Button - Responsive */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2.5 xs:p-3 rounded-lg xs:rounded-xl text-white 
                bg-white/15 hover:bg-white/25 transition-all active:scale-95 ml-auto"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? (
                <FiX className="text-xl xs:text-2xl sm:text-3xl" />
              ) : (
                <FiMenu className="text-xl xs:text-2xl sm:text-3xl" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu - Responsive */}
        {isOpen && (
          <div className="lg:hidden bg-gradient-to-b from-emerald-800 to-slate-800 border-t border-white/10">
            <div className="px-3 xs:px-4 sm:px-6 py-6 xs:py-8 max-w-2xl mx-auto">
              {/* Mobile Navigation */}
              <div className="space-y-1.5 xs:space-y-2 mb-6 xs:mb-8">
                {mainNavigation.map((item) => {
                  const isActive = isActiveLink(item.href, item.exact);
                  
                  if (item.hasDropdown) {
                    return (
                      <div key={item.name} className="space-y-1.5 xs:space-y-2" ref={mobileDropdownRef}>
                        <button
                          onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
                          className={`w-full flex items-center justify-between p-3 xs:p-4 rounded-lg xs:rounded-xl text-left ${
                            isActive || isMobileDropdownOpen
                              ? 'bg-white/20 text-white'
                              : 'text-white/90 hover:bg-white/10'
                          }`}
                          aria-expanded={isMobileDropdownOpen}
                        >
                          <div className="flex items-center gap-2 xs:gap-3">
                            <item.icon className="text-lg xs:text-xl" />
                            <span className="font-bold text-base xs:text-lg uppercase tracking-wide">{item.name}</span>
                          </div>
                          <FiChevronDown className={`text-lg xs:text-xl transition-transform duration-200 ${
                            isMobileDropdownOpen ? 'rotate-180' : ''
                          }`} />
                        </button>
                        
                        {/* Mobile Academic Dropdown Items */}
                        {isMobileDropdownOpen && (
                          <div className="ml-6 xs:ml-8 space-y-1.5 xs:space-y-2 pl-3 xs:pl-4 border-l-2 border-white/20">
                            {academicDropdownItems.map((dropdownItem) => (
                              <a
                                key={dropdownItem.name}
                                href={dropdownItem.href}
                                className={`flex items-center gap-2 xs:gap-3 p-2.5 xs:p-3 rounded-lg ${
                                  isActiveLink(dropdownItem.href)
                                    ? 'bg-white/20 text-white'
                                    : 'text-white/80 hover:bg-white/10'
                                }`}
                                onClick={() => {
                                  setIsOpen(false);
                                  setIsMobileDropdownOpen(false);
                                }}
                              >
                                <dropdownItem.icon className="text-base xs:text-lg" />
                                <span className="font-medium text-sm xs:text-base">{dropdownItem.name}</span>
                              </a>
                            ))}
                            
                            {/* Zeraki Link for Mobile */}
                            <a
                              href="https://analytics.zeraki.app/"
                              className="flex items-center gap-2 xs:gap-3 p-2.5 xs:p-3 rounded-lg text-white/80 hover:bg-white/10"
                              onClick={() => {
                                setIsOpen(false);
                                setIsMobileDropdownOpen(false);
                              }}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <div className="w-5 h-5 xs:w-6 xs:h-6 flex-shrink-0">
                                <img 
                                  src="/zeraki.jpg" 
                                  alt="Zeraki Analytics" 
                                  className="w-full h-full object-cover rounded-md border border-white/30"
                                />
                              </div>
                              <span className="font-medium text-sm xs:text-base">Zeraki Analytics</span>
                            </a>
                          </div>
                        )}
                      </div>
                    );
                  }

                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      className={`flex items-center gap-2 xs:gap-3 p-3 xs:p-4 rounded-lg xs:rounded-xl ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'text-white/90 hover:bg-white/10'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      <item.icon className="text-lg xs:text-xl" />
                      <span className="font-bold text-base xs:text-lg uppercase tracking-wide">{item.name}</span>
                    </a>
                  );
                })}

                {/* Mobile Resources Dropdown (Staff, Careers & Admin Login) */}
                <div className="space-y-1.5 xs:space-y-2" ref={mobileResourcesDropdownRef}>
                  <button
                    onClick={() => setIsMobileResourcesDropdownOpen(!isMobileResourcesDropdownOpen)}
                    className={`w-full flex items-center justify-between p-3 xs:p-4 rounded-lg xs:rounded-xl text-left ${
                      isMobileResourcesDropdownOpen ||
                      isActiveLink('/pages/staff') ||
                      isActiveLink('/pages/career') ||
                      isActiveLink('/pages/adminLogin')
                        ? 'bg-white/20 text-white'
                        : 'text-white/90 hover:bg-white/10'
                    }`}
                    aria-expanded={isMobileResourcesDropdownOpen}
                  >
                    <div className="flex items-center gap-2 xs:gap-3">
                      <FiGrid className="text-lg xs:text-xl" />
                      <span className="font-bold text-base xs:text-lg uppercase tracking-wide">Resources</span>
                    </div>
                    <FiChevronDown className={`text-lg xs:text-xl transition-transform duration-200 ${
                      isMobileResourcesDropdownOpen ? 'rotate-180' : ''
                    }`} />
                  </button>
                  
                  {/* Mobile Resources Dropdown Items */}
                  {isMobileResourcesDropdownOpen && (
                    <div className="ml-6 xs:ml-8 space-y-1.5 xs:space-y-2 pl-3 xs:pl-4 border-l-2 border-white/20">
                      {resourcesDropdownItems.map((dropdownItem) => (
                        <a
                          key={dropdownItem.name}
                          href={dropdownItem.href}
                          className={`flex items-center gap-2 xs:gap-3 p-2.5 xs:p-3 rounded-lg ${
                            isActiveLink(dropdownItem.href)
                              ? dropdownItem.isHighlighted
                                ? 'bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 text-white'
                                : 'bg-white/20 text-white'
                              : dropdownItem.isHighlighted
                                ? 'text-white hover:bg-gradient-to-r hover:from-emerald-500/20 hover:to-emerald-600/20'
                                : 'text-white/80 hover:bg-white/10'
                          }`}
                          onClick={() => {
                            setIsOpen(false);
                            setIsMobileResourcesDropdownOpen(false);
                          }}
                        >
                          <dropdownItem.icon className="text-base xs:text-lg" />
                          <span className={`font-medium text-sm xs:text-base ${
                            dropdownItem.isHighlighted ? 'font-bold' : ''
                          }`}>
                            {dropdownItem.name}
                          </span>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Mobile Footer - Responsive */}
              <div className="mt-6 xs:mt-8 pt-4 xs:pt-6 border-t border-white/20 text-center">
                <p className="text-white/70 text-xs xs:text-sm font-medium">
                  Strive to Excel
                </p>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Spacer for fixed nav - Responsive */}
      <div className="h-[4.5rem] xs:h-20 sm:h-22 lg:h-24 transition-all duration-300"></div>
    </>
  );
}
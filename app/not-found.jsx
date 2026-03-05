"use client"
import React, { useState, useEffect } from 'react';
import { 
  FiHome, 
  FiArrowLeft, 
  FiBook, 
  FiMail, 
  FiCalendar, 
  FiBookOpen, 
  FiUsers, 
  FiBell,
  FiSearch,
  FiAlertCircle,
  FiMapPin,
  FiGlobe,
  FiChevronRight,
  FiStar,
  FiHeart,
  FiShield,
  FiZap
} from 'react-icons/fi';

const Modern404 = () => {
  const [currentMessage, setCurrentMessage] = useState(0);

  const quickLinks = [
    { name: 'Home Base', href: '/', icon: FiHome, description: 'Back to assembly' },
    { name: 'Academics', href: '/pages/academics', icon: FiBook, description: 'Course directory' },
    { name: 'Gallery', href: '/pages/gallery', icon: FiBookOpen, description: 'School resources' },
    { name: 'Admissions', href: '/pages/admissions', icon: FiUsers, description: 'Join our family' },
    { name: 'Events', href: '/pages/eventsandnews', icon: FiCalendar, description: 'Upcoming terms' },
    { name: 'Support', href: '/pages/contact', icon: FiMail, description: 'Talk to the office' },
    { name: 'Portal', href: '/pages/StudentPortal', icon: FiUsers, description: 'Student Portal' },
    { name: 'Guidance', href: '/pages/Guidance-and-Coucelling', icon: FiHeart, description: 'Counseling sessions' },
  ];

  const errorMessages = [
    "Looks like this page does not exist!",
    "This page is on a field trip!",
    "Assignment not found!",
    "This lesson hasn't been scheduled yet!",
    "Page is in detention!",
    "This classroom is empty!",
    "Lesson plan missing!",
    "This page graduated early!"
  ];

  useEffect(() => {
    setCurrentMessage(Math.floor(Math.random() * errorMessages.length));
    const messageInterval = setInterval(() => {
      setCurrentMessage(prev => (prev + 1) % errorMessages.length);
    }, 5000);
    return () => clearInterval(messageInterval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50 overflow-hidden relative font-sans text-slate-900 antialiased">
      {/* Decorative Background Elements - Updated to emerald */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.03]">
        <div className="absolute top-1/4 -left-8 text-emerald-400 scale-[4] rotate-12"><FiGlobe /></div>
        <div className="absolute bottom-1/4 -right-8 text-emerald-400 scale-[4] -rotate-12"><FiMapPin /></div>
        <div className="absolute top-1/2 left-1/4 text-slate-500 scale-[3] rotate-45"><FiSearch /></div>
        <div className="absolute top-3/4 right-1/3 text-emerald-400 scale-[3] -rotate-45"><FiAlertCircle /></div>
        <div className="absolute top-1/3 right-1/4 text-emerald-300 scale-[2] rotate-90"><FiStar /></div>
      </div>

      <div className="min-h-screen flex items-center justify-center px-3 sm:px-6 py-6 md:py-12 relative z-10">
        <div className="container mx-auto max-w-6xl w-full">
          <div className="flex flex-col lg:flex-row gap-6 md:gap-12 lg:gap-16 items-center">
            
            {/* Left Side: Error Message Section */}
            <div className="w-full lg:w-1/2 text-center lg:text-left space-y-4 md:space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200">
                <FiBell className="text-xs animate-pulse" />
                <span className="text-[9px] font-black uppercase tracking-widest">School Announcement</span>
              </div>

              <div className="relative">
                <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter text-slate-900 flex justify-center lg:justify-start items-baseline">
                  <span className="text-emerald-600 drop-shadow-sm">4</span>
                  <span className="text-emerald-500 mx-1 md:mx-2 drop-shadow-sm">0</span>
                  <span className="text-emerald-600 drop-shadow-sm">4</span>
                </h1>
                <div className="h-1.5 w-24 bg-gradient-to-r from-emerald-400 to-emerald-600 mx-auto lg:mx-0 mt-2 rounded-full shadow"></div>
              </div>

              <div className="space-y-3 md:space-y-4">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-800 leading-tight">
                  {errorMessages[currentMessage]}
                </h2>
                <p className="text-xs sm:text-sm md:text-base text-slate-600 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                  Even top students lose their way. This page seems to have wandered off-school. 
                  Let's guide you back to your studies with the options below.
                </p>
              </div>

              {/* Action Buttons - Responsive and Smaller */}
              <div className="flex flex-row items-center gap-2 pt-2 w-full">
                {/* Back to Assembly - Primary Emerald */}
                <a
                  href="/"
                  className="
                    group
                    flex flex-1 items-center justify-center gap-1.5
                    bg-emerald-600
                    hover:bg-emerald-700
                    text-white
                    px-3 py-2.5
                    rounded-xl
                    transition-all duration-200
                    shadow-lg shadow-emerald-200/50
                    active:scale-95
                  "
                >
                  <FiHome className="text-sm group-hover:scale-110 transition-transform" />
                  <span className="whitespace-nowrap font-black uppercase tracking-wider text-[9px] sm:text-[10px]">
                    <span className="hidden xs:inline">Back to </span>Home
                  </span>
                </a>

                {/* Previous Page - Secondary Outline */}
                <button
                  onClick={() => window.history.back()}
                  className="
                    group
                    flex flex-1 items-center justify-center gap-1.5
                    bg-white
                    border border-emerald-200
                    hover:border-emerald-300 hover:bg-emerald-50
                    text-emerald-700
                    px-3 py-2.5
                    rounded-xl
                    transition-all duration-200
                    shadow-sm
                    active:scale-95
                  "
                >
                  <FiArrowLeft className="text-sm group-hover:-translate-x-1 transition-transform" />
                  <span className="whitespace-nowrap font-black uppercase tracking-wider text-[9px] sm:text-[10px]">
                    Go Back
                  </span>
                </button>
              </div>

              {/* Quick Stats Row */}
              <div className="flex items-center justify-center lg:justify-start gap-4 pt-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                  <span className="text-[8px] font-black uppercase tracking-wider text-slate-400">24/7 Support</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                  <span className="text-[8px] font-black uppercase tracking-wider text-slate-400">Secure</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                  <span className="text-[8px] font-black uppercase tracking-wider text-slate-400">Fast</span>
                </div>
              </div>
            </div>

            {/* Right Side: Quick Links Section */}
            <div className="w-full lg:w-1/2">
              <div className="relative">
                <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-tr from-emerald-100 via-white to-emerald-100 rounded-[2rem] sm:rounded-[3rem] blur-xl opacity-60 -z-10"></div>
                
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-[2.5rem] shadow-2xl shadow-slate-200/60 border border-slate-100/80 p-5 sm:p-6 md:p-8">
                  <div className="flex items-center justify-between mb-4 md:mb-6">
                    <h3 className="text-base sm:text-lg md:text-xl font-black text-slate-800 flex items-center gap-2">
                      <FiMapPin className="text-emerald-600" />
                      School Directory
                    </h3>
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse delay-75"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse delay-150"></div>
                    </div>
                  </div>
                  
                  {/* Quick Links Grid - 2 columns */}
                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    {quickLinks.map((link) => {
                      const Icon = link.icon;

                      return (
                        <a
                          key={link.name}
                          href={link.href}
                          className="
                            p-2 sm:p-3
                            rounded-xl
                            border border-slate-100
                            bg-white
                            hover:border-emerald-200 hover:bg-emerald-50/30
                            transition-all duration-200
                            active:scale-[0.98]
                          "
                        >
                          <div className="flex flex-col items-start gap-1.5">
                            {/* Icon */}
                            <div
                              className="
                                p-1.5
                                bg-emerald-50
                                text-emerald-600
                                rounded-lg
                                shadow-sm
                              "
                            >
                              <Icon className="text-xs sm:text-sm" />
                            </div>

                            {/* Text */}
                            <div className="min-w-0 w-full">
                              <h4 className="font-black text-slate-800 text-[10px] sm:text-xs truncate">
                                {link.name}
                              </h4>
                              <p className="text-[8px] sm:text-[9px] text-slate-500 truncate italic">
                                {link.description}
                              </p>
                            </div>
                          </div>
                        </a>
                      );
                    })}
                  </div>

                  {/* Footer Card */}
                  <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-slate-100">
                    <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-emerald-900 to-emerald-800 p-3 sm:p-4 text-white">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />

                      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                        <div className="space-y-0.5 min-w-0">
                          <p className="text-emerald-200 text-[8px] font-black uppercase tracking-wider">
                            Enrollment Status
                          </p>
                          <div className="flex items-baseline gap-1.5 flex-wrap">
                            <span className="text-lg sm:text-xl font-black text-emerald-300">
                              1K+
                            </span>
                            <span className="text-[8px] sm:text-[9px] text-emerald-200/80">
                              Active students
                            </span>
                          </div>
                          <p className="text-[8px] text-emerald-200/60 mt-1">
                            Need immediate assistance?
                          </p>
                        </div>

                        <a
                          href="/pages/contact"
                          className="
                            inline-flex
                            items-center
                            gap-1.5
                            px-3 py-1.5
                            text-[8px] sm:text-[9px] font-black uppercase tracking-wider
                            rounded-lg
                            border border-emerald-400/30
                            bg-emerald-500/20
                            backdrop-blur-sm
                            hover:bg-emerald-500/30
                            transition-colors
                            flex-shrink-0
                          "
                        >
                          <FiMail className="text-xs" />
                          Contact
                        </a>
                      </div>
                      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-emerald-400/10 to-emerald-600/10 -rotate-45 translate-x-8 -translate-y-8 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="mt-8 md:mt-12 text-center">
            <p className="text-slate-500 text-[10px] sm:text-xs font-medium">
              &copy; {new Date().getFullYear()} Matungulu Girls High School, Matungulu, Machakos    
              <span className="mx-1.5 text-slate-300">•</span>
              Strive to Excel              
              <span className="mx-1.5 text-slate-300">•</span>
              <a href="/" className="text-emerald-600 hover:text-emerald-800 transition-colors font-black uppercase tracking-wider text-[9px] sm:text-[10px]">
                Site Map
              </a>
            </p>
          </footer>
        </div>
      </div>

      {/* Global Styles */}
      <style jsx global>{`
        @media (max-width: 640px) {
          .rounded-\[2\.5rem\] {
            border-radius: 1.5rem;
          }
        }
        
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
};

export default Modern404;
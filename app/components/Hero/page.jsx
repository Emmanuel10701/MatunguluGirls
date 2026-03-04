"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { 
  ChevronLeft, ChevronRight, ArrowRight, ShieldCheck, 
  Globe, Rocket, Trophy, BookOpen, Clock, Users, 
  Calendar, Play, X, Menu, X as XIcon
} from 'lucide-react';
import { 
  GiGraduateCap, 
  GiTrophyCup 
} from 'react-icons/gi';
import { IoRocketOutline } from 'react-icons/io5';
import { useRouter } from 'next/navigation';

// Enhanced Hero Slides with Modern Design - Matungulu Girls High School Focus
const heroSlides = [
  {
    title: "Matungulu Girls High School",
    subtitle: "Machakos County, Kenya",
    gradient: "from-emerald-500 via-teal-400 to-green-600",
    description: "A leading public secondary school in Matungulu sub-county dedicated to academic excellence, character development, and empowering young women through quality education and holistic development.",
    background: "bg-gradient-to-br from-emerald-900/90 via-teal-900/80 to-green-900/70",
    image: "/hero/matG.jpg",
    stats: { 
      established: "Est. 1956", 
      students: "County School", 
      excellence: "Quality Education" 
    },
    features: ["STEM Excellence", "Leadership Programs", "Sports & Arts", "Community Outreach"],
    cta: "Apply Now",
    link: "/pages/apply-for-admissions",
    highlightColor: "green",
    testimonial: "\"Empowering girls with education, character, and opportunity for tomorrow.\"",
    icon: GiGraduateCap,
    infoCard: {
      location: "Matungulu, Machakos County",
      type: "Public Secondary School",
      motto: "Strive to Excel",
      focus: "Girls' Education"
    }
  },
  {
    title: "Academic Excellence",
    subtitle: "Strong Foundation in STEM",
    gradient: "from-blue-500 via-cyan-400 to-teal-600",
    description: "Matungulu Girls provides rigorous academic programs with emphasis on Science, Technology, Engineering, and Mathematics, preparing students for university and professional careers.",
    background: "bg-gradient-to-br from-blue-900/90 via-cyan-900/80 to-teal-900/70",
    image: "/hero/matG.jpg",
    stats: { 
      subjects: "Diverse Curriculum", 
      teachers: "Qualified Educators", 
      facilities: "Modern Labs" 
    },
    features: ["Science Labs", "Computer Lab", "Library Resources", "Research Programs"],
    cta: "Admissions",
    link: "/pages/admissions",
    highlightColor: "blue",
    testimonial: "\"Preparing women leaders through quality STEM education and critical thinking.\"",
    icon: BookOpen,
    infoCard: {
      location: "Rural Machakos Setting",
      type: "Well-Equipped Facilities",
      motto: "Excellence in Learning",
      focus: "Practical Education"
    }
  },
  {
    title: "Holistic Development",
    subtitle: "Beyond Academics",
    gradient: "from-purple-500 via-pink-400 to-red-600",
    description: "Beyond academics, Matungulu Girls develops well-rounded individuals through sports, cultural activities, leadership training, and community service programs.",
    background: "bg-gradient-to-br from-purple-900/90 via-pink-900/80 to-red-900/70",
    image: "/bg/14.jpeg",
    stats: { 
      sports: "Athletic Programs", 
      clubs: "Student Societies", 
      events: "Regular Activities" 
    },
    features: ["Girls Empowerment", "Mentorship Programs", "Life Skills", "Guidance Services"],
    cta: "About Us",
    link: "/pages/AboutUs",
    highlightColor: "purple",
    testimonial: "\"Developing confident, capable young women ready to lead and serve society.\"",
    icon: GiTrophyCup,
    infoCard: {
      location: "Community-Centered",
      type: "Inclusive Environment",
      motto: "Girls' Voices Matter",
      focus: "Character Building"
    }
  }
];

// Extract YouTube ID from URL
const extractYouTubeId = (url) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url?.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

const ModernHero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [schoolData, setSchoolData] = useState(null);
  const [matunguluInfo, setMatunguluInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [navigationBlocked, setNavigationBlocked] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const router = useRouter();

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Fetch Matungulu Girls information from Wikipedia/public data
  useEffect(() => {
    const fetchMatunguluInfo = async () => {
      try {
        // Fetch school info from your API
        const response = await fetch('/api/school');
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.school) {
            setMatunguluInfo({
              name: 'Matungulu Girls School',
              location: data.school.location || 'Matungulu, Machakos County',
              established: data.school.established || '1995',
              type: data.school.type || 'Public Secondary School',
              motto: data.school.motto || 'Strive to Excel',
              studentPopulation: data.school.studentPopulation || 'Female Students',
              principal: data.school.principal || 'School Leadership',
              website: data.school.website || 'www.matungulu-girls.sc.ke'
            });
          }
        }
      } catch (err) {
        console.log('Info fetch note:', err.message);
        // Use default data if API fails
        setMatunguluInfo({
          name: 'Matungulu Girls High School',
          location: 'Matungulu, Machakos County, Kenya',
          established: '1995',
          type: 'Public County Secondary School',
          motto: 'Strive to Excel',
          studentPopulation: 'Female Students (Mixed intake)',
          principal: 'School Administration',
          website: 'https://matungulu-girls.vercel.app'
        });
      }
    };

    fetchMatunguluInfo();
  }, []);

  // DEBUG: Add this to track automatic navigation
  useEffect(() => {
    console.log('=== DEBUG: ModernHero Component Mounted ===');
    console.log('Initial state - showVideoModal:', showVideoModal);
    console.log('Initial state - currentSlide:', currentSlide);
    console.log('Initial slide link:', heroSlides[currentSlide].link);
    
    // Check if there's any automatic navigation attempt on mount
    if (typeof window !== 'undefined') {
      console.log('Current URL:', window.location.href);
      
      // Clear any hash that might trigger navigation
      if (window.location.hash) {
        console.log('Found hash, clearing:', window.location.hash);
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    }
  }, []);

  // Block automatic navigation for first 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setNavigationBlocked(false);
      console.log('Navigation is now allowed');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleSlideChange = useCallback((index) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide(index);
      setIsTransitioning(false);
    }, 400);
  }, []);

  const nextSlide = useCallback(() => {
    handleSlideChange(currentSlide === heroSlides.length - 1 ? 0 : currentSlide + 1);
  }, [currentSlide, handleSlideChange]);

  const prevSlide = useCallback(() => {
    handleSlideChange(currentSlide === 0 ? heroSlides.length - 1 : currentSlide - 1);
  }, [currentSlide, handleSlideChange]);

  const openVideoModal = useCallback(() => {
    console.log('DEBUG: Opening video modal');
    setShowVideoModal(true);
  }, []);

  const closeVideoModal = useCallback(() => {
    console.log('DEBUG: Closing video modal');
    setShowVideoModal(false);
    setSchoolData(null);
    setError(null);
  }, []);

  // Safe navigation handler for slide buttons
  const handleSlideButtonClick = useCallback(() => {
    if (navigationBlocked) {
      console.log('DEBUG: Navigation blocked (cooling period)');
      return;
    }
    
    const link = heroSlides[currentSlide].link;
    console.log('DEBUG: Navigating to slide link:', link);
    console.log('DEBUG: From slide index:', currentSlide);
    
    // Add a small delay to prevent accidental clicks
    setTimeout(() => {
      router.push(link);
    }, 100);
  }, [currentSlide, router, navigationBlocked]);

  // Safe contact handler for modal button
  const handleContactClick = useCallback(() => {
    console.log('DEBUG: Contact button clicked');
    closeVideoModal();
    
    if (navigationBlocked) {
      console.log('DEBUG: Navigation blocked (cooling period)');
      return;
    }
    
    // Navigate to About Us page with delay
    setTimeout(() => {
      router.push('/pages/AboutUs');
    }, 100);
  }, [closeVideoModal, router, navigationBlocked]);

  // Fetch video data when modal opens
  useEffect(() => {
    if (showVideoModal) {
      console.log('Fetching video data...');
      setLoading(true);
      setError(null);
      
      fetch('/api/school')
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          if (data.success && data.school) {
            console.log('Video data loaded:', {
              name: data.school.name,
              videoType: data.school.videoType,
              videoTour: data.school.videoTour
            });
            setSchoolData(data.school);
            setError(null);
          } else {
            throw new Error(data.message || 'No school data found');
          }
        })
        .catch(err => {
          console.error('Error fetching school video:', err);
          setError(err.message);
          setSchoolData(null);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [showVideoModal]);

  // Auto-slide effect with safety check
  useEffect(() => {
    if (showVideoModal) {
      console.log('DEBUG: Auto-slide paused (modal open)');
      return;
    }
    
    const timer = setInterval(() => {
      nextSlide();
    }, 8000);
    
    return () => clearInterval(timer);
  }, [currentSlide, nextSlide, showVideoModal]);

  const retryVideoLoad = useCallback(() => {
    setLoading(true);
    setError(null);
    
    fetch('/api/school')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        if (data.success && data.school) {
          setSchoolData(data.school);
          setError(null);
        } else {
          throw new Error(data.message || 'No school data found');
        }
      })
      .catch(err => {
        console.error('Error fetching school video:', err);
        setError(err.message);
        setSchoolData(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const slide = heroSlides[currentSlide];
  const IconComponent = slide.icon;

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black font-sans">
      {/* Background Image Layers */}
      {heroSlides.map((s, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            idx === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center scale-105 animate-slow-zoom"
            style={{ backgroundImage: `url(${s.image})` }}
          />
          
          {/* PRIMARY GRADIENT */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/35 to-black/45" />
          
          {/* SECONDARY GRADIENT */}
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at center, rgba(0,0,0,0) 0%, rgba(0,0,0,0.25) 100%)'
          }} />
          
          {/* MODERN VIGNETTE */}
          <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.3)]" />
          
          {/* Color overlay */}
          <div className={`absolute inset-0 opacity-5 mix-blend-overlay ${s.background}`} />
          
          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none" />
        </div>
      ))}

      {/* Main Content Area - NEW MATUNGULU GIRLS LAYOUT */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center px-3 sm:px-4 md:px-6 lg:px-12 text-center">
        {/* Top Badge Section - School Info */}
        <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4 px-2">
          <div className="h-[1px] w-4 sm:w-6 md:w-8 bg-white/60" />
          <span
            className={`
              uppercase
              text-base xs:text-lg sm:text-base md:text-lg
              tracking-[0.08em] xs:tracking-[0.1em] sm:tracking-[0.15em]
              font-semibold sm:font-bold
              text-center
              leading-snug
              drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]
              ${getHighlightColorClass(slide.highlightColor)}
            `}
          >
            {matunguluInfo?.location || slide.subtitle}
          </span>
          <div className="h-[1px] w-4 sm:w-6 md:w-8 bg-white/60" />
        </div>

        {/* Dynamic Heading */}
        <h1 className="
          text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-5xl
          font-extrabold
          text-white
          leading-tight
          mb-3 sm:mb-4 md:mb-5
          drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)_0_0_20px_rgba(255,255,255,0.2)]
          px-2
        ">
          {matunguluInfo?.name || slide.title}
        </h1>

        {/* School Info Cards - NEW MATUNGULU DESIGN */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 mb-4 sm:mb-6 max-w-sm xs:max-w-md sm:max-w-2xl mx-auto">
          {/* Established */}
          <div className="bg-black/70 backdrop-blur-md border border-white/25 p-2 sm:p-3 rounded-lg hover:bg-black/80 transition-all shadow-lg">
            <div className={`text-sm sm:text-lg font-bold ${getHighlightColorClass(slide.highlightColor)} drop-shadow-md`}>
              {matunguluInfo?.established || '1956'}
            </div>
            <span className="text-white/95 text-[8px] xs:text-xs uppercase tracking-wider font-semibold">
              Established
            </span>
          </div>

          {/* Motto */}
          <div className="bg-black/70 backdrop-blur-md border border-white/25 p-2 sm:p-3 rounded-lg hover:bg-black/80 transition-all shadow-lg sm:col-span-1">
            <div className={`text-sm sm:text-lg font-bold ${getHighlightColorClass(slide.highlightColor)} drop-shadow-md`}>
              {matunguluInfo?.motto || 'Excel'}
            </div>
            <span className="text-white/95 text-[8px] xs:text-xs uppercase tracking-wider font-semibold">
              Motto
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="
          text-sm xs:text-base sm:text-lg
          text-gray-100
          mb-4 sm:mb-5 md:mb-6
          mx-auto
          max-w-sm xs:max-w-md sm:max-w-xl md:max-w-2xl
          font-medium
          leading-relaxed
          line-clamp-3 sm:line-clamp-none
          drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]
        ">
          {slide.description}
        </p>

        {/* Features Grid - MATUNGULU FOCUSED */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 xs:gap-2 sm:gap-3 mb-3 sm:mb-4 md:mb-8 max-w-xs xs:max-w-sm sm:max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto">
          {slide.features.map((feature, i) => (
            <div key={i} className="flex items-center justify-center space-x-1 xs:space-x-2 
              bg-black/70 backdrop-blur-md border border-white/25 p-1 xs:p-2 sm:p-3 rounded-lg sm:rounded-xl 
              hover:bg-black/80 transition-all duration-300 group overflow-hidden shadow-2xl">
              <IconComponent className={`w-3 h-3 xs:w-4 xs:h-4 ${getHighlightColorClass(slide.highlightColor)} flex-shrink-0 drop-shadow-[0_0_5px_currentColor]`} />
              <span className="text-white font-semibold text-[10px] xs:text-xs sm:text-sm group-hover:text-white whitespace-nowrap overflow-hidden text-ellipsis drop-shadow-md">
                {isMobile && feature.length > 12 ? feature.substring(0, 10) + '...' : feature}
              </span>
            </div>
          ))}
        </div>

        {/* Testimonial */}
        <div className="mb-3 sm:mb-4 md:mb-6 max-w-xs xs:max-w-sm sm:max-w-md md:max-w-xl mx-auto">
          <div className={`border-l-2 sm:border-l-4 ${getBorderColorClass(slide.highlightColor)} pl-2 sm:pl-3 md:pl-4 py-1 sm:py-2 bg-black/70 backdrop-blur-md rounded-r-lg shadow-2xl`}>
            <p className="text-white/95 text-[10px] xs:text-xs sm:text-sm italic font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
              {slide.testimonial}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="
          flex items-center justify-center gap-3
          sm:flex-row sm:gap-4
          px-2
        ">
          <button
            onClick={handleSlideButtonClick}
            disabled={navigationBlocked}
            className="
              group
              px-4 sm:px-6
              py-2 sm:py-3
              bg-white text-black
              rounded-full font-semibold
              text-sm
              hover:bg-gray-200
              transition-all
              flex items-center justify-center gap-2
              shadow-[0_8px_25px_rgba(0,0,0,0.6)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.8)]
              disabled:opacity-50 disabled:cursor-not-allowed
              drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]
            "
          >
            {slide.cta}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={openVideoModal}
            className="
              group
              px-4 sm:px-6
              py-2 sm:py-3
              bg-white/25
              border border-white/40
              text-white
              rounded-full font-semibold
              text-sm
              hover:bg-white/35 hover:border-white/70
              backdrop-blur-md
              transition-all duration-300
              flex items-center justify-center gap-2
              shadow-[0_8px_25px_rgba(0,0,0,0.5)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.7)]
              drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]
            "
          >
            <Play className="w-4 h-4 group-hover:scale-110 transition-transform" />
            {isMobile ? 'Tour' : 'Virtual Tour'}
          </button>
        </div>
      </div>

      {/* Modern Controls */}
      <div className={`absolute z-30 flex space-x-3 sm:space-y-3 sm:flex-col ${isMobile ? 'bottom-4 right-4 flex-row' : 'bottom-10 right-8 flex-col'}`}>
        <button 
          onClick={prevSlide}
          className={`rounded-full border border-white/30 text-white hover:bg-white hover:text-black 
            transition-all group backdrop-blur-md hover:scale-110 duration-300 bg-black/50 shadow-2xl
            ${isMobile ? 'p-2' : 'p-3'}`}
        >
          <ChevronLeft className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} />
        </button>
        <button 
          onClick={nextSlide}
          className={`rounded-full border border-white/30 text-white hover:bg-white hover:text-black 
            transition-all group backdrop-blur-md hover:scale-110 duration-300 bg-black/50 shadow-2xl
            ${isMobile ? 'p-2' : 'p-3'}`}
        >
          <ChevronRight className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} />
        </button>
      </div>

      {/* Progress Indicators */}
      {!isMobile && (
        <div className="absolute top-1/2 right-4 sm:right-6 md:right-8 -translate-y-1/2 z-30 hidden sm:flex flex-col space-y-4 sm:space-y-6">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => handleSlideChange(index)}
              className="group flex items-center justify-end"
            >
              <span className={`mr-2 sm:mr-3 text-[8px] sm:text-[10px] font-mono transition-all ${currentSlide === index ? 'text-white drop-shadow-[0_0_5px_white]' : 'text-white/30 opacity-0 group-hover:opacity-100'}`}>
                0{index + 1}
              </span>
              <div className={`w-[1px] sm:w-[2px] transition-all duration-300 rounded-full ${currentSlide === index ? `h-6 sm:h-8 ${getProgressColorClass(heroSlides[index].highlightColor)} shadow-[0_0_10px_currentColor]` : 'h-2 sm:h-3 bg-white/20 group-hover:bg-white/40'}`} />
            </button>
          ))}
        </div>
      )}

      {/* Mobile Progress Dots */}
      {isMobile && (
        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => handleSlideChange(index)}
              className="w-2 h-2 rounded-full transition-all duration-300 shadow-[0_0_5px_currentColor]"
              style={{
                backgroundColor: currentSlide === index 
                  ? getProgressColorValue(heroSlides[index].highlightColor)
                  : 'rgba(255, 255, 255, 0.3)'
              }}
            />
          ))}
        </div>
      )}

      {/* Bottom Info Strip */}
      <div className={`absolute bottom-0 left-0 w-full z-10 py-2 sm:py-3 md:py-4 px-3 sm:px-4 md:px-6 lg:px-12 
        border-t border-white/15 bg-black/95 backdrop-blur-md 
        ${isMobile ? 'flex flex-col items-center justify-center gap-1' : 'hidden md:flex items-center justify-between'} 
        text-white/90 text-[8px] xs:text-[10px] tracking-[0.1em] sm:tracking-[0.15em] uppercase font-semibold shadow-[0_-15px_30px_rgba(0,0,0,0.8)]`}>
        
        {isMobile ? (
          <>
            <div className="flex items-center space-x-4">
              <span className="flex items-center text-nowrap">
                <BookOpen className="w-2 h-2 xs:w-3 xs:h-3 mr-1" />
                {matunguluInfo?.motto || 'Strive to Excel'}
              </span>
              <span className="flex items-center text-nowrap">
                <Trophy className="w-2 h-2 xs:w-3 xs:h-3 mr-1" />
                Public School
              </span>
            </div>
            <button 
              onClick={openVideoModal}
              className="flex items-center text-white/90 hover:text-white transition-colors duration-300 group text-nowrap"
            >
              <Play className="w-2 h-2 xs:w-3 xs:h-3 mr-1 group-hover:scale-110 transition-transform" />
              Virtual Tour
            </button>
          </>
        ) : (
          <>
            <div className="flex space-x-4 md:space-x-6 lg:space-x-8">
              <span className="flex items-center">
                <BookOpen className="w-3 h-3 mr-2" />
                {matunguluInfo?.location || 'Matungulu, Machakos'}
              </span>
              <span className="flex items-center">
                <Trophy className="w-3 h-3 mr-2" />
                {matunguluInfo?.type || 'Public County School'}
              </span>
            </div>
            <div className="flex space-x-4 md:space-x-6 lg:space-x-8">
              <span className="flex items-center">
                <Clock className="w-3 h-3 mr-2" />
                {matunguluInfo?.motto || 'Quality Education'}
              </span>
              <button 
                onClick={openVideoModal}
                className="flex items-center text-white/90 hover:text-white transition-colors duration-300 group"
              >
                <Play className="w-3 h-3 mr-2 group-hover:scale-110 transition-transform" />
                Virtual Tour
              </button>
            </div>
          </>
        )}
      </div>

      {/* Video Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-2 sm:p-4">
          <div className="relative w-full max-w-full sm:max-w-4xl md:max-w-5xl lg:max-w-6xl rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-r from-black/80 to-transparent p-2 sm:p-3 md:p-4 flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-3 overflow-hidden">
                <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-lg sm:rounded-lg 
                  bg-gradient-to-br from-emerald-900 via-teal-900 to-green-900 flex items-center justify-center flex-shrink-0">
                  <Play className="text-white w-3 h-3 sm:w-4 sm:h-4" />
                </div>
                <div className="overflow-hidden">
                  <h4 className="text-white font-bold text-xs sm:text-sm md:text-base truncate">Matungulu Girls Virtual Tour</h4>
                  <p className="text-white/60 text-[10px] sm:text-xs md:text-sm truncate">
                    {schoolData?.name || 'Matungulu Girls High School'} - {schoolData?.videoType === 'youtube' ? 'Video Tour' : schoolData?.videoType === 'file' ? 'School Video' : 'Loading...'}
                  </p>
                </div>
              </div>
              <button
                onClick={closeVideoModal}
                className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full bg-black/50 text-white 
                  hover:bg-black/70 transition-colors flex items-center justify-center 
                  hover:scale-110 duration-300 flex-shrink-0"
                aria-label="Close video"
              >
                <X className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6" />
              </button>
            </div>
            
            {/* Video Container */}
            <div className="relative bg-black aspect-video">
              {loading ? (
                <div className="w-full h-full flex flex-col items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-white mb-2 sm:mb-4"></div>
                  <p className="text-white text-sm sm:text-base">Loading virtual tour...</p>
                </div>
              ) : error ? (
                <div className="w-full h-full flex flex-col items-center justify-center p-4 sm:p-8">
                  <div className="text-3xl sm:text-4xl md:text-5xl text-red-500 mb-2 sm:mb-4">!</div>
                  <p className="text-white text-center text-xs sm:text-sm md:text-base mb-2 sm:mb-4 px-2">{error}</p>
                  <button
                    onClick={retryVideoLoad}
                    className="px-3 sm:px-4 py-1.5 sm:py-2 bg-emerald-600 hover:bg-emerald-700 text-white 
                      rounded-lg transition-colors text-xs sm:text-sm"
                  >
                    Retry Loading
                  </button>
                </div>
              ) : schoolData?.videoType === 'youtube' && schoolData?.videoTour ? (
                <iframe
                  src={`https://www.youtube.com/embed/${extractYouTubeId(schoolData.videoTour)}?autoplay=1&rel=0&modestbranding=1&controls=1`}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={`${schoolData.name} Virtual Tour`}
                />
              ) : schoolData?.videoType === 'file' && schoolData?.videoTour ? (
                <div className="relative w-full h-full">
                  <video
                    src={schoolData.videoTour}
                    className="w-full h-full"
                    autoPlay
                    controls
                    title={`${schoolData.name} Virtual Tour`}
                    poster={schoolData?.videoThumbnail}
                    onLoadedData={() => console.log('Video loaded successfully')}
                  >
                    <div className="w-full h-full flex flex-col items-center justify-center p-4 sm:p-8">
                      <div className="text-3xl sm:text-4xl md:text-5xl text-gray-400 mb-2 sm:mb-4">!</div>
                      <p className="text-white text-center text-sm sm:text-base">
                        Your browser does not support the video tag.
                      </p>
                    </div>
                  </video>
                </div>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-4 sm:p-8">
                  <div className="text-3xl sm:text-4xl md:text-5xl text-gray-400 mb-2 sm:mb-4">!</div>
                  <p className="text-white text-center text-xs sm:text-sm md:text-base mb-2 sm:mb-4">
                    {schoolData ? 'No video tour available' : 'Loading...'}
                  </p>
                  <p className="text-white/60 text-xs sm:text-sm text-center px-2">
                    {schoolData 
                      ? 'Virtual tour coming soon' 
                      : 'Fetching tour data...'
                    }
                  </p>
                </div>
              )}
            </div>
            
            {/* Modal Footer */}
            <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-r from-transparent to-black/80 p-2 sm:p-3 md:p-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0">
                <div className="text-white/80 text-xs sm:text-sm hidden sm:block truncate">
                  {schoolData?.description?.substring(0, isMobile ? 50 : 100) + '...' || 'Experience Matungulu Girls High School from anywhere'}
                </div>
                <button
                  onClick={handleContactClick}
                  className="px-3 sm:px-4 md:px-6 lg:px-8 py-1.5 sm:py-2 md:py-3 
                    text-xs sm:text-sm md:text-base bg-gradient-to-br from-emerald-700 via-teal-700 to-green-700 
                    text-white font-medium rounded-lg hover:opacity-90 transition-all duration-300 
                    disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                  disabled={navigationBlocked}
                >
                  {isMobile ? 'Learn More' : 'Know More About Us'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Blocker Overlay */}
      {navigationBlocked && (
        <div className="absolute inset-0 z-40 pointer-events-none">
          <div className="absolute bottom-20 sm:bottom-24 left-1/2 transform -translate-x-1/2 
            bg-black/70 text-white text-[10px] xs:text-xs px-3 py-1.5 rounded-full backdrop-blur-sm">
            Navigation cooling period... {new Date().getSeconds() % 2 === 0 ? '▰▰▰▰▰' : '▰▰▱▱▱'}
          </div>
        </div>
      )}
    </div>
  );
};

const getHighlightColorClass = (color) => {
  switch(color) {
    case 'blue': return 'text-blue-400';
    case 'green': return 'text-emerald-400';
    case 'purple': return 'text-purple-400';
    default: return 'text-emerald-400';
  }
};

const getBorderColorClass = (color) => {
  switch(color) {
    case 'blue': return 'border-blue-500';
    case 'green': return 'border-emerald-500';
    case 'purple': return 'border-purple-500';
    default: return 'border-emerald-500';
  }
};

const getProgressColorClass = (color) => {
  switch(color) {
    case 'blue': return 'bg-blue-500';
    case 'green': return 'bg-emerald-500';
    case 'purple': return 'bg-purple-500';
    default: return 'bg-emerald-500';
  }
};

const getProgressColorValue = (color) => {
  switch(color) {
    case 'blue': return '#3b82f6';
    case 'green': return '#10b981';
    case 'purple': return '#a855f7';
    default: return '#10b981';
  }
};

export default ModernHero;
'use client';
import { useState, useEffect } from 'react';
import { toast, Toaster } from 'sonner';
import { 
  FiCalendar, 
  FiClock, 
  FiMapPin, 
  FiUsers, 
  FiArrowRight,
  FiShare2,
  FiRefreshCw, 
  FiSearch,
  FiX,
  FiFilter,
  FiBookmark,
  FiChevronRight,
  FiChevronLeft,
  FiGrid,
  FiList,
  FiImage,
  FiCopy,
  FiMail,
  FiPhone,
  FiEye
} from 'react-icons/fi';
import { 
  IoNewspaperOutline,
  IoCalendarClearOutline,
  IoSparkles,
  IoRibbonOutline,
  IoPeopleCircle,
  IoStatsChart,
  IoClose,
  IoLocationOutline,
  IoTimeOutline,
  IoPersonOutline,
  IoSchoolOutline
} from 'react-icons/io5';
import { CircularProgress, Stack } from '@mui/material';
import { FaWhatsapp, FaFacebookF, FaTwitter, FaLeaf } from 'react-icons/fa';

// Modern Modal Component
const ModernModal = ({ children, open, onClose, maxWidth = '800px', blur = true }) => {
  if (!open) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${blur ? 'backdrop-blur-md' : 'bg-black/50'}`}>
      <div 
        className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-emerald-100"
        style={{ 
          width: '90%',
          maxWidth: maxWidth,
          maxHeight: '90vh'
        }}
      >
        <div className="absolute top-4 right-4 z-10">
          <button 
            onClick={onClose}
            className="p-2 bg-white/80 backdrop-blur-sm rounded-full border border-emerald-200 shadow-sm hover:bg-emerald-50 transition-colors"
          >
            <FiX className="text-emerald-700 w-5 h-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

// MODERN EVENT CARD - REFINED
const ModernEventCard = ({ event, onView, onBookmark, viewMode = 'grid', isBookmarked: initialBookmarked }) => {
  const [isBookmarked, setIsBookmarked] = useState(initialBookmarked || false);
  const [showDetails, setShowDetails] = useState(false);

  const getCategoryStyle = (category) => {
    const styles = {
      academic: { bg: 'bg-blue-600', text: 'text-white', border: 'border-blue-700', iconColor: 'text-blue-600', gradient: 'from-blue-600 to-blue-700' },
      sports: { bg: 'bg-emerald-600', text: 'text-white', border: 'border-emerald-700', iconColor: 'text-emerald-600', gradient: 'from-emerald-600 to-teal-600' },
      workshop: { bg: 'bg-amber-600', text: 'text-white', border: 'border-amber-700', iconColor: 'text-amber-600', gradient: 'from-amber-600 to-amber-700' },
      meeting: { bg: 'bg-slate-600', text: 'text-white', border: 'border-slate-700', iconColor: 'text-slate-600', gradient: 'from-slate-600 to-slate-700' },
      default: { bg: 'bg-emerald-600', text: 'text-white', border: 'border-emerald-700', iconColor: 'text-emerald-600', gradient: 'from-emerald-600 to-teal-600' }
    };
    return styles[category?.toLowerCase()] || styles.default;
  };

  const theme = getCategoryStyle(event.category);
  const formatDate = (d) => d ? new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'TBD';

  const handleBookmarkClick = (e) => {
    e.stopPropagation();
    const newState = !isBookmarked;
    setIsBookmarked(newState);
    onBookmark?.(event, newState);
  };

  if (viewMode === 'grid') {
    return (
      <>
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
          <div className="relative h-44 w-full overflow-hidden">
            <img src={event.image || '/default-event.jpg'} alt="" className="w-full h-full object-cover" />
            <div className="absolute top-3 left-3 flex gap-2">
              <span className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider ${theme.bg} ${theme.text} border ${theme.border} shadow-lg`}>
                {event.category || 'Event'}
              </span>
            </div>
            <button onClick={handleBookmarkClick} 
              className={`absolute top-3 right-3 p-2 rounded-xl ${isBookmarked ? 'bg-amber-500 text-white' : 'bg-white/90 text-slate-600'} shadow-lg`}>
              <FiBookmark className={isBookmarked ? 'fill-current' : ''} />
            </button>
          </div>
          <div className="p-5">
            <h3 className="text-base font-black text-slate-900 mb-2 line-clamp-1">{event.title}</h3>
            <p className="text-sm text-slate-600 mb-4 line-clamp-2">{event.description || 'No description available'}</p>
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-600 bg-slate-50 p-2 rounded-lg">
                <FiCalendar className={theme.iconColor} /> {formatDate(event.date)}
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-600 bg-slate-50 p-2 rounded-lg">
                <FiMapPin className={theme.iconColor} /> <span className="truncate">{event.location || 'Main Campus'}</span>
              </div>
            </div>
            <button 
              onClick={() => setShowDetails(true)}
              className="w-full py-3 bg-gradient-to-r from-emerald-800 to-teal-700 text-white rounded-xl text-xs font-black tracking-widest shadow-lg active:scale-95 transition-all">
              SHORT DETAILS
            </button>
          </div>
        </div>

        {/* Modern Event Detail Modal */}
        {showDetails && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-4 bg-slate-900/90 backdrop-blur-sm">
            <div className="relative w-full h-full sm:h-auto sm:max-h-[90vh] sm:max-w-3xl bg-white sm:rounded-lg shadow-2xl overflow-hidden flex flex-col">
              
              <button 
                onClick={() => setShowDetails(false)}
                className="absolute top-4 right-4 z-50 p-2 bg-black/20 backdrop-blur-md text-white rounded-lg border border-white/20 hover:bg-black/30 transition-colors"
              >
                <IoClose size={20} />
              </button>

              <div className="relative h-[40vh] sm:h-[300px] w-full shrink-0">
                <img
                  src={event.image || '/default-event.jpg'}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-black/20" />
                
                <div className="absolute bottom-4 left-4 flex gap-2">
                  <span className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider ${theme.bg} ${theme.text} border ${theme.border} shadow-lg`}>
                    {event.category || 'Event'}
                  </span>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6 bg-white">
                <div className="max-w-2xl mx-auto space-y-6">
                  
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${theme.gradient}`}>
                      <FiCalendar className="text-white text-xl" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900">
                        {event.title}
                      </h2>
                      <p className="text-sm text-slate-500">{event.category || 'Event'} Event</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-y-2 gap-x-4 text-xs text-slate-500">
                    <div className="flex items-center gap-1">
                      <FiCalendar size={14} className="text-emerald-600" />
                      {new Date(event.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                    {event.time && (
                      <div className="flex items-center gap-1">
                        <FiClock size={14} className="text-emerald-600" />
                        {event.time}
                      </div>
                    )}
                    {event.location && (
                      <div className="flex items-center gap-1">
                        <FiMapPin size={14} className="text-emerald-600" />
                        {event.location}
                      </div>
                    )}
                  </div>

                  <div className="border-b border-slate-200" />

                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-slate-900">About This Event</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {event.description || 'No description available.'}
                    </p>
                    
                    {event.fullDescription && (
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {event.fullDescription}
                      </p>
                    )}
                  </div>

                  {event.speakers && (
                    <div className="space-y-3">
                      <h3 className="text-lg font-bold text-slate-900">Speakers</h3>
                      <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
                        <div className="p-2 bg-white rounded-lg">
                          <FiUsers className="text-emerald-600" size={16} />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-900">{event.speakers}</p>
                          <p className="text-xs text-slate-500">Guest Speaker</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="shrink-0 p-4 bg-slate-50 border-t border-slate-100">
                <div className="max-w-2xl mx-auto flex flex-row gap-2">
                  <button
                    onClick={() => {
                      onView?.(event);
                      setShowDetails(false);
                    }}
                    className="flex-1 h-10 bg-gradient-to-r from-emerald-800 to-teal-700 text-white rounded-lg text-xs font-medium flex items-center justify-center gap-2"
                  >
                    <FiEye size={14} />
                    VIEW FULL DETAILS
                  </button>

                  <button
                    onClick={() => setShowDetails(false)}
                    className="flex-1 h-10 bg-white border border-slate-200 text-slate-700 rounded-lg text-xs font-medium flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors"
                  >
                    CLOSE
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <>
      <div className="bg-white rounded-xl border border-slate-100 p-3 sm:p-4 cursor-pointer mb-3 hover:shadow-md transition-shadow">
        <div className="flex gap-3 sm:gap-4 items-center">
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden shrink-0">
            <img src={event.image || '/default-event.jpg'} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <span className={`px-2 sm:px-3 py-1 rounded-md text-[9px] sm:text-[10px] font-black uppercase tracking-wider ${theme.bg} ${theme.text} border ${theme.border} shadow-sm`}>
                {event.category}
              </span>
              <FiBookmark onClick={handleBookmarkClick} 
                className={`cursor-pointer text-base sm:text-lg ${isBookmarked ? 'text-amber-500 fill-current' : 'text-slate-300'}`} />
            </div>
            <h3 className="text-sm sm:text-base font-black text-slate-900 truncate mb-1">{event.title}</h3>
            <p className="text-xs text-slate-600 mb-2 line-clamp-1">{event.description || 'No description'}</p>
            <div className="flex gap-2 sm:gap-3 text-[10px] sm:text-[11px] text-slate-500 font-bold">
              <span className="flex items-center gap-1 whitespace-nowrap"><FiCalendar className={theme.iconColor} /> {formatDate(event.date)}</span>
              <span className="flex items-center gap-1 whitespace-nowrap"><FiClock className={theme.iconColor} /> {event.time || 'All Day'}</span>
            </div>
            <button 
              onClick={() => setShowDetails(true)}
              className={`mt-2 text-[9px] sm:text-[10px] font-black uppercase tracking-wider ${theme.text} hover:opacity-80 transition-opacity`}>
              SHORT DETAILS →
            </button>
          </div>
        </div>
      </div>

      {/* Modern Event Detail Modal (same as above) */}
      {showDetails && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-4 bg-slate-900/90 backdrop-blur-sm">
          <div className="relative w-full h-full sm:h-auto sm:max-h-[90vh] sm:max-w-3xl bg-white sm:rounded-lg shadow-2xl overflow-hidden flex flex-col">
            
            <button 
              onClick={() => setShowDetails(false)}
              className="absolute top-4 right-4 z-50 p-2 bg-black/20 backdrop-blur-md text-white rounded-lg border border-white/20 hover:bg-black/30 transition-colors"
            >
              <IoClose size={20} />
            </button>

            <div className="relative h-[40vh] sm:h-[300px] w-full shrink-0">
              <img
                src={event.image || '/default-event.jpg'}
                alt={event.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-black/20" />
              
              <div className="absolute bottom-4 left-4 flex gap-2">
                <span className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider ${theme.bg} ${theme.text} border ${theme.border} shadow-lg`}>
                  {event.category || 'Event'}
                </span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 bg-white">
              <div className="max-w-2xl mx-auto space-y-6">
                
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${theme.gradient}`}>
                    <FiCalendar className="text-white text-xl" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">
                      {event.title}
                    </h2>
                    <p className="text-sm text-slate-500">{event.category || 'Event'} Event</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-y-2 gap-x-4 text-xs text-slate-500">
                  <div className="flex items-center gap-1">
                    <FiCalendar size={14} className="text-emerald-600" />
                    {new Date(event.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                  {event.time && (
                    <div className="flex items-center gap-1">
                      <FiClock size={14} className="text-emerald-600" />
                      {event.time}
                    </div>
                  )}
                  {event.location && (
                    <div className="flex items-center gap-1">
                      <FiMapPin size={14} className="text-emerald-600" />
                      {event.location}
                    </div>
                  )}
                </div>

                <div className="border-b border-slate-200" />

                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-slate-900">About This Event</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {event.description || 'No description available.'}
                  </p>
                </div>
              </div>
            </div>

            <div className="shrink-0 p-4 bg-slate-50 border-t border-slate-100">
              <div className="max-w-2xl mx-auto flex flex-row gap-2">
                <button
                  onClick={() => {
                    onView?.(event);
                    setShowDetails(false);
                  }}
                  className="flex-1 h-10 bg-gradient-to-r from-emerald-800 to-teal-700 text-white rounded-lg text-xs font-medium flex items-center justify-center gap-2"
                >
                  <FiEye size={14} />
                  VIEW FULL DETAILS
                </button>

                <button
                  onClick={() => setShowDetails(false)}
                  className="flex-1 h-10 bg-white border border-slate-200 text-slate-700 rounded-lg text-xs font-medium flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors"
                >
                  CLOSE
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// MODERN NEWS CARD - REFINED
const ModernNewsCard = ({ news, onView, onBookmark, isBookmarked: initialBookmarked }) => {
  const [isBookmarked, setIsBookmarked] = useState(initialBookmarked || false);
  const [showDetails, setShowDetails] = useState(false);
  
  const getStyle = (cat) => {
    const styles = {
      announcement: { bg: 'bg-blue-600', text: 'text-white', border: 'border-blue-700', iconColor: 'text-blue-600', gradient: 'from-blue-600 to-blue-700' },
      achievement: { bg: 'bg-amber-600', text: 'text-white', border: 'border-amber-700', iconColor: 'text-amber-600', gradient: 'from-amber-600 to-amber-700' },
      infrastructure: { bg: 'bg-purple-600', text: 'text-white', border: 'border-purple-700', iconColor: 'text-purple-600', gradient: 'from-purple-600 to-purple-700' },
      general: { bg: 'bg-emerald-600', text: 'text-white', border: 'border-emerald-700', iconColor: 'text-emerald-600', gradient: 'from-emerald-600 to-teal-600' },
      default: { bg: 'bg-emerald-600', text: 'text-white', border: 'border-emerald-700', iconColor: 'text-emerald-600', gradient: 'from-emerald-600 to-teal-600' }
    };
    return styles[cat?.toLowerCase()] || styles.default;
  };

  const theme = getStyle(news.category);
  const formatDate = (d) => d ? new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Recently';

  const handleBookmarkClick = (e) => {
    e.stopPropagation();
    const newState = !isBookmarked;
    setIsBookmarked(newState);
    onBookmark?.(news, newState);
  };

  return (
    <>
      <div className="flex flex-col bg-white rounded-xl border border-slate-100 overflow-hidden cursor-pointer hover:shadow-md transition-shadow">
        <div className="relative h-32 sm:h-36 w-full overflow-hidden">
          <img src={news.image || '/default-news.jpg'} alt="" className="w-full h-full object-cover" />
          <div className="absolute top-2 left-2 flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/90 backdrop-blur-sm border border-white/50 shadow-sm">
            <span className={`text-[9px] sm:text-[10px] font-black uppercase ${theme.text}`}>{news.category}</span>
          </div>
          <div className="absolute bottom-2 right-2 text-[9px] sm:text-[10px] text-white font-bold drop-shadow-md bg-black/30 px-2 py-1 rounded">
            {formatDate(news.date)}
          </div>
          <button onClick={handleBookmarkClick} 
            className={`absolute top-2 right-2 p-1.5 rounded-full ${isBookmarked ? 'text-amber-500' : 'text-white'} drop-shadow-md text-lg hover:scale-110 transition-transform`}>
            <FiBookmark className={isBookmarked ? 'fill-current' : ''} />
          </button>
        </div>
        <div className="p-3 sm:p-4">
          <h3 className="text-sm sm:text-base font-extrabold text-slate-900 mb-2 line-clamp-2 leading-snug">{news.title}</h3>
          <p className="text-xs text-slate-600 mb-3 line-clamp-2">{news.excerpt || 'No description available'}</p>
          <div className="flex items-center justify-between mt-auto pt-2 border-t border-slate-100">
            <div className="flex items-center gap-1 text-[9px] sm:text-[10px] font-bold text-slate-500">
              {news.author && (
                <span className="truncate max-w-[100px]">By {news.author}</span>
              )}
            </div>
            <button 
              onClick={() => setShowDetails(true)}
              className={`flex items-center gap-1 text-[9px] sm:text-[10px] font-black uppercase tracking-wider ${theme.text} hover:opacity-80 transition-opacity`}>
              VIEW DETAILS →
            </button>
          </div>
        </div>
      </div>

      {/* Modern News Detail Modal */}
      {showDetails && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-4 bg-slate-900/90 backdrop-blur-sm">
          <div className="relative w-full h-full sm:h-auto sm:max-h-[90vh] sm:max-w-3xl bg-white sm:rounded-lg shadow-2xl overflow-hidden flex flex-col">
            
            <button 
              onClick={() => setShowDetails(false)}
              className="absolute top-4 right-4 z-50 p-2 bg-black/20 backdrop-blur-md text-white rounded-lg border border-white/20 hover:bg-black/30 transition-colors"
            >
              <IoClose size={20} />
            </button>

            <div className="relative h-[40vh] sm:h-[300px] w-full shrink-0">
              <img
                src={news.image || '/default-news.jpg'}
                alt={news.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-black/20" />
              
              <div className="absolute bottom-4 left-4 flex gap-2">
                <span className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider ${theme.bg} ${theme.text} border ${theme.border} shadow-lg`}>
                  {news.category || 'News'}
                </span>
              </div>
              
              <div className="absolute bottom-4 right-4">
                <span className="px-3 py-1.5 bg-black/60 backdrop-blur-sm text-white rounded-lg text-xs font-medium">
                  {formatDate(news.date)}
                </span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 bg-white">
              <div className="max-w-2xl mx-auto space-y-6">
                
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${theme.gradient}`}>
                    <IoNewspaperOutline className="text-white text-xl" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">
                      {news.title}
                    </h2>
                    <p className="text-sm text-slate-500">{news.category || 'News'} Article</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-y-2 gap-x-4 text-xs text-slate-500">
                  <div className="flex items-center gap-1">
                    <FiCalendar size={14} className="text-emerald-600" />
                    {new Date(news.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                  {news.author && (
                    <div className="flex items-center gap-1">
                      <IoPersonOutline size={14} className="text-emerald-600" />
                      By {news.author}
                    </div>
                  )}
                </div>

                <div className="border-b border-slate-200" />

                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-slate-900">Summary</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {news.excerpt || 'No description available.'}
                  </p>
                  
                  {news.fullContent && (
                    <>
                      <h3 className="text-lg font-bold text-slate-900 pt-2">Full Article</h3>
                      <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                        {news.fullContent}
                      </p>
                    </>
                  )}
                </div>

                {news.author && (
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
                    <div className="p-2 bg-white rounded-lg">
                      <IoPersonOutline className="text-emerald-600" size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">{news.author}</p>
                      <p className="text-xs text-slate-500">Author</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="shrink-0 p-4 bg-slate-50 border-t border-slate-100">
              <div className="max-w-2xl mx-auto flex flex-row gap-2">
                <button
                  onClick={() => {
                    onView?.(news);
                    setShowDetails(false);
                  }}
                  className="flex-1 h-10 bg-gradient-to-r from-emerald-800 to-teal-700 text-white rounded-lg text-xs font-medium flex items-center justify-center gap-2"
                >
                  <FiEye size={14} />
                  VIEW FULL ARTICLE
                </button>

                <button
                  onClick={() => setShowDetails(false)}
                  className="flex-1 h-10 bg-white border border-slate-200 text-slate-700 rounded-lg text-xs font-medium flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors"
                >
                  CLOSE
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Main Component
export default function ModernEventsNewsPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedNews, setSelectedNews] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [eventsData, setEventsData] = useState([]);
  const [newsData, setNewsData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState('grid');
  const [bookmarkedEvents, setBookmarkedEvents] = useState(new Set());
  const [bookmarkedNews, setBookmarkedNews] = useState(new Set());
  const itemsPerPage = 9;

  const categories = [
    { id: 'all', name: 'All Events', icon: IoCalendarClearOutline },
    { id: 'academic', name: 'Academic', icon: IoNewspaperOutline },
    { id: 'cultural', name: 'Cultural', icon: FiImage },
    { id: 'sports', name: 'Sports', icon: FiImage },
    { id: 'workshop', name: 'Workshops', icon: FiImage }
  ];

  // Load bookmarks from localStorage on initial render
  useEffect(() => {
    const savedEventBookmarks = localStorage.getItem('bookmarkedEvents');
    const savedNewsBookmarks = localStorage.getItem('bookmarkedNews');
    
    if (savedEventBookmarks) {
      setBookmarkedEvents(new Set(JSON.parse(savedEventBookmarks)));
    }
    if (savedNewsBookmarks) {
      setBookmarkedNews(new Set(JSON.parse(savedNewsBookmarks)));
    }
  }, []);

  // Save bookmarks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('bookmarkedEvents', JSON.stringify([...bookmarkedEvents]));
  }, [bookmarkedEvents]);

  useEffect(() => {
    localStorage.setItem('bookmarkedNews', JSON.stringify([...bookmarkedNews]));
  }, [bookmarkedNews]);

  const fetchEvents = async (showRefresh = false) => {
    if (showRefresh) setRefreshing(true);
    try {
      const response = await fetch('/api/events');
      const data = await response.json();
      if (data.success) {
        setEventsData(data.events || []);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
      toast.error('Failed to load events');
    } finally {
      if (showRefresh) setRefreshing(false);
    }
  };

  const fetchNews = async (showRefresh = false) => {
    try {
      const response = await fetch('/api/news');
      const data = await response.json();
      if (data.success && Array.isArray(data.data)) {
        setNewsData(data.data || []);
      }
    } catch (error) {
      console.error('Error fetching news:', error);
      toast.error('Failed to load news');
    }
  };

  const fetchData = async (showRefresh = false) => {
    if (!showRefresh) setLoading(true);
    try {
      await Promise.all([fetchEvents(showRefresh), fetchNews(showRefresh)]);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      if (!showRefresh) setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredEvents = eventsData.filter(event => {
    const matchesSearch = searchTerm === '' || 
      event.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeTab === 'all' || event.category === activeTab;
    return matchesSearch && matchesCategory;
  });

  const filteredNews = newsData.filter(news => {
    return searchTerm === '' || 
      news.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      news.excerpt?.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);
  const paginatedEvents = filteredEvents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCalendar = (event) => {
    try {
      const startDate = new Date(event.date);
      const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${startDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`;
      window.open(googleCalendarUrl, '_blank');
      toast.success('Added to Google Calendar');
    } catch (error) {
      toast.error('Failed to add to calendar');
    }
  };

  const handleBookmarkEvent = (event, isBookmarked) => {
    const newBookmarked = new Set(bookmarkedEvents);
    if (isBookmarked) {
      newBookmarked.add(event.id);
      toast.success('Bookmarked event');
    } else {
      newBookmarked.delete(event.id);
      toast.success('Removed from bookmarks');
    }
    setBookmarkedEvents(newBookmarked);
  };

  const handleBookmarkNews = (news, isBookmarked) => {
    const newBookmarked = new Set(bookmarkedNews);
    if (isBookmarked) {
      newBookmarked.add(news.id);
      toast.success('Bookmarked news');
    } else {
      newBookmarked.delete(news.id);
      toast.success('Removed from bookmarks');
    }
    setBookmarkedNews(newBookmarked);
  };

  const refreshData = () => {
    fetchData(true);
  };

  // Calculate stats
  const totalFiles = eventsData.length + newsData.length;
  const stats = [
    { 
      icon: IoCalendarClearOutline, 
      number: eventsData.length.toString(), 
      label: 'Events', 
      sublabel: 'Upcoming',
      gradient: 'from-emerald-600 to-teal-600'
    },
    { 
      icon: IoNewspaperOutline, 
      number: newsData.length.toString(), 
      label: 'News', 
      sublabel: 'Articles',
      gradient: 'from-emerald-600 to-teal-600'
    },
    { 
      icon: FiImage, 
      number: '5', 
      label: 'Categories', 
      sublabel: 'Available',
      gradient: 'from-emerald-600 to-teal-600'
    },
    { 
      icon: FiCalendar, 
      number: new Date().getFullYear().toString(),
      label: 'Year', 
      sublabel: 'Current',
      gradient: 'from-emerald-600 to-teal-600'
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-white p-4">
        <div className="max-w-7xl mx-auto">
          <div className="min-h-[70vh] flex items-center justify-center">
            <Stack spacing={2} alignItems="center">
              <div className="relative flex items-center justify-center">
                <CircularProgress
                  variant="determinate"
                  value={100}
                  size={48}
                  thickness={4.5}
                  sx={{ color: '#f1f5f9' }}
                />
                <CircularProgress
                  variant="indeterminate"
                  disableShrink
                  size={48}
                  thickness={4.5}
                  sx={{
                    color: '#059669',
                    animationDuration: '1000ms',
                    position: 'absolute',
                  }}
                />
              </div>
              <div className="text-center">
                <p className="text-slate-600 text-sm">Loading updates...</p>
                <p className="text-slate-400 text-xs uppercase tracking-widest mt-1 font-bold">
                  Matungulu Girls
                </p>
              </div>
            </Stack>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-4 md:p-6">
      <Toaster position="top-right" richColors />
      
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Modern Hero Banner */}
        <div className="relative bg-gradient-to-r from-emerald-900 to-teal-800 rounded-2xl p-6 md:p-10 text-white overflow-hidden border border-emerald-700/30 mb-8">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
          
          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-8 w-1 bg-emerald-400 rounded-full shadow-[0_0_15px_rgba(52,211,153,0.5)]" />
                  <div>
                    <h2 className="text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] text-emerald-400">
                      Matungulu Girls High School
                    </h2>
                    <p className="text-[8px] sm:text-[10px] italic font-medium text-emerald-200/60 tracking-widest uppercase">
                      "Strive to Excel"
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/10 backdrop-blur-md rounded-xl border border-white/10">
                    <IoSchoolOutline className="text-xl sm:text-2xl md:text-3xl text-emerald-300" />
                  </div>
                  <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-white tracking-tight">
                    Events & <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-300">News</span>
                  </h1>
                </div>
              </div>
              
              <button
                onClick={refreshData}
                disabled={refreshing}
                className="flex items-center justify-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl font-bold text-[11px] sm:text-sm tracking-widest text-white hover:bg-white/20 w-full sm:w-auto transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {refreshing ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>REFRESHING...</span>
                  </>
                ) : (
                  <>
                    <FiRefreshCw className="text-base sm:text-lg" />
                    <span>REFRESH UPDATES</span>
                  </>
                )}
              </button>
            </div>

            <div className="mb-4 sm:mb-6 px-1">
              <p className="text-emerald-100/90 text-xs sm:text-base font-medium leading-relaxed sm:leading-loose">
                <span className="text-white font-black text-base sm:text-xl md:text-2xl underline decoration-emerald-500/50 underline-offset-4 mr-1">
                  {eventsData.length}
                </span> 
                <span className="tracking-tight sm:tracking-normal">upcoming events and</span>
                <span className="text-white font-black text-base sm:text-xl md:text-2xl underline decoration-teal-500/50 underline-offset-4 ml-1 mr-1">
                  {newsData.length}
                </span>
                <span className="tracking-tight sm:tracking-normal">news articles this month</span>
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                <p className="text-[10px] sm:text-xs font-bold text-emerald-300 uppercase tracking-wider mb-1">Events</p>
                <p className="text-lg sm:text-xl md:text-2xl font-black text-white">{eventsData.length}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                <p className="text-[10px] sm:text-xs font-bold text-emerald-300 uppercase tracking-wider mb-1">News</p>
                <p className="text-lg sm:text-xl md:text-2xl font-black text-white">{newsData.length}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                <p className="text-[10px] sm:text-xs font-bold text-emerald-300 uppercase tracking-wider mb-1">Categories</p>
                <p className="text-lg sm:text-xl md:text-2xl font-black text-white">5</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                <p className="text-[10px] sm:text-xs font-bold text-emerald-300 uppercase tracking-wider mb-1">Featured</p>
                <p className="text-lg sm:text-xl md:text-2xl font-black text-white">
                  {(eventsData.filter(e => e.featured).length + newsData.filter(n => n.featured).length).toString()}
                </p>
              </div>
            </div>

            <div className="mt-4 text-xs sm:text-sm text-emerald-200/80">
              <span className="inline-flex items-center gap-1">
                <IoSparkles className="text-emerald-300" size={14} />
                Click on any event or news item for detailed information
              </span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="relative bg-white border border-slate-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.gradient} bg-opacity-10`}>
                  <stat.icon className="text-lg text-emerald-700" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
                  {stat.label}
                </p>
                <h3 className="text-xl md:text-2xl font-bold text-slate-900">
                  {stat.number}
                </h3>
                <p className="text-xs text-slate-500">
                  {stat.sublabel}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Search & Filters */}
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="text"
                placeholder="Search events & news..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-10 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 bg-slate-100 rounded"
                >
                  <FiX size={12} className="text-slate-800" />
                </button>
              )}
            </div>

            <div className="flex gap-2">
              <select 
                value={activeTab}
                onChange={(e) => {
                  setActiveTab(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-600 focus:border-emerald-500"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>

              <button
                onClick={() => {
                  setSearchTerm('');
                  setActiveTab('all');
                  setCurrentPage(1);
                }}
                className="px-4 py-2.5 bg-emerald-600 text-white rounded-lg text-sm font-medium flex items-center gap-2"
              >
                <FiFilter size={14} />
                Reset
              </button>

              <div className="flex bg-white border border-slate-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2.5 ${viewMode === 'grid' ? 'bg-emerald-50 text-emerald-600' : 'text-slate-800'}`}
                >
                  <FiGrid size={16} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2.5 ${viewMode === 'list' ? 'bg-emerald-50 text-emerald-600' : 'text-slate-800'}`}
                >
                  <FiList size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = activeTab === category.id;
            return (
              <button
                key={category.id}
                onClick={() => { setActiveTab(category.id); setCurrentPage(1); }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap text-xs font-medium border ${
                  isActive 
                    ? "bg-emerald-600 border-emerald-600 text-white" 
                    : "bg-white border-slate-200 text-slate-600"
                }`}
              >
                <Icon size={12} />
                {category.name}
              </button>
            );
          })}
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* Events Column */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <IoCalendarClearOutline className="text-emerald-700 text-lg" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Upcoming Events</h2>
                  <p className="text-xs text-slate-400">{filteredEvents.length} found</p>
                </div>
              </div>
            </div>

            {filteredEvents.length === 0 ? (
              <div className="bg-white border border-dashed border-slate-200 rounded-lg p-8 text-center">
                <IoCalendarClearOutline className="text-slate-300 text-3xl mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-900">No events found</h3>
                <p className="text-xs text-slate-800 mt-1 mb-4">Try adjusting your filters</p>
                <button 
                  onClick={() => { setSearchTerm(''); setActiveTab('all'); }}
                  className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-700"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <>
                <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : 'space-y-3'}>
                  {paginatedEvents.map((event, index) => (
                    <ModernEventCard 
                      key={event.id || index} 
                      event={event} 
                      onView={setSelectedEvent}
                      onBookmark={handleBookmarkEvent}
                      viewMode={viewMode}
                      isBookmarked={bookmarkedEvents.has(event.id)}
                    />
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-6">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="p-2 rounded-lg bg-white border border-slate-200 disabled:opacity-50"
                    >
                      <FiChevronLeft size={16} />
                    </button>

                    <div className="flex items-center gap-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`w-8 h-8 rounded-lg text-xs font-medium ${
                            currentPage === page
                              ? 'bg-emerald-600 text-white'
                              : 'bg-white border border-slate-200 text-slate-600'
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="p-2 rounded-lg bg-white border border-slate-200 disabled:opacity-50"
                    >
                      <FiChevronRight size={16} />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          {/* News Sidebar */}
          <div className="lg:w-80">
            <div className="bg-white border border-slate-200 rounded-lg p-5 sticky top-24 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <IoNewspaperOutline className="text-emerald-700 text-lg" />
                </div>
                <h2 className="text-lg font-bold text-slate-900">Latest News</h2>
              </div>

              <p className="text-xs text-slate-500 leading-relaxed mb-5 px-1">
                Stay updated with the latest academic milestones, CBC implementation progress, and community highlights from across the school.
              </p>

              <div className="space-y-4">
                {filteredNews.slice(0, 4).map((news, index) => (
                  <ModernNewsCard 
                    key={news.id || index} 
                    news={news} 
                    onView={setSelectedNews}
                    onBookmark={handleBookmarkNews}
                    isBookmarked={bookmarkedNews.has(news.id)}
                  />
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2 text-xs text-slate-800 font-semibold">
                  <FaLeaf className="text-emerald-600" size={12} />
                  <span>Matungulu Girls High School</span>
                </div>
                <p className="text-[10px] text-slate-400 mt-2 italic font-medium">
                  "Strive to Excel"
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Banner */}
        <div className="bg-emerald-800 rounded-lg p-6 text-white">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="p-3 bg-white/10 rounded-lg">
              <FiImage className="text-white text-xl" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-lg font-bold mb-1">Stay Connected</h3>
              <p className="text-sm text-emerald-100">Get the latest updates delivered to your inbox</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {selectedEvent && !showShareModal && (
        <ModernModal open={true} onClose={() => setSelectedEvent(null)} maxWidth="800px">
          <div className="p-6">
            <h2 className="text-2xl font-bold">{selectedEvent.title}</h2>
            <p className="mt-4">{selectedEvent.description}</p>
          </div>
        </ModernModal>
      )}

      {selectedNews && !showShareModal && (
        <ModernModal open={true} onClose={() => setSelectedNews(null)} maxWidth="800px">
          <div className="p-6">
            <h2 className="text-2xl font-bold">{selectedNews.title}</h2>
            <p className="mt-4">{selectedNews.excerpt}</p>
          </div>
        </ModernModal>
      )}
    </div>
  );
}
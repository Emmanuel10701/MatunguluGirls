'use client';
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { toast, Toaster } from 'sonner';
import { 
  FiSearch, FiFilter, FiX, FiHome, FiChevronLeft, FiChevronRight,
  FiDownload, FiShare2, FiHeart, FiImage, FiVideo, FiPlay, FiPause,
  FiVolume2, FiVolumeX, FiGrid, FiList, FiChevronUp, FiChevronDown,
  FiUsers, FiBook, FiAward, FiMusic, FiMic, FiCamera, FiCalendar,
  FiUser, FiBookOpen, FiTarget, FiStar, FiGlobe, FiMessageSquare,
  FiFacebook, FiTwitter, FiFileText, FiInfo, FiRefreshCw, FiEye,
  FiBookmark, FiExternalLink, FiZap, FiTrendingUp, FiCopy, FiBell,
  FiUserPlus, FiArrowRight, FiPlus, FiRotateCw, FiEdit3, FiTrash2,
  FiSave, FiUpload, FiMapPin, FiAlertTriangle, FiMail, FiPhone, FiFolder, FiLock 
} from 'react-icons/fi';
import { FaWhatsapp, FaFacebookF, FaTwitter, FaCopy, FaLeaf } from 'react-icons/fa';
import { 
  IoClose, IoMenu, IoSparkles, IoSchoolOutline
} from 'react-icons/io5';
import {
  IoCalendarClearOutline,
  IoRibbonOutline,
  IoPeopleCircle,
  IoStatsChart,
  IoShareSocialOutline,
  IoLocationOutline,
  IoTimeOutline,
  IoPersonOutline,
  IoShareOutline,
  IoNewspaperOutline
} from 'react-icons/io5';
import { CircularProgress, Box, Typography, Stack } from '@mui/material';

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
            className="p-2 bg-white/80 backdrop-blur-sm rounded-full border border-emerald-200 shadow-sm"
          >
            <FiX className="text-emerald-700 w-5 h-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

// Modern Hero Banner Component - Matungulu Girls Theme
const ModernHeroBanner = ({ stats, onRefresh }) => {
  return (
    <div className="relative bg-gradient-to-r from-emerald-900 to-teal-800 rounded-2xl p-6 md:p-10 text-white overflow-hidden border border-emerald-700/30 mb-8">
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
      
      <div className="relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-8 w-1 bg-emerald-400 rounded-full shadow-[0_0_15px_rgba(52,211,153,0.5)]" />
              <div>
                <h2 className="text-xs font-black uppercase tracking-[0.3em] text-emerald-400">
                  Matungulu Girls High School
                </h2>
                <p className="text-[10px] italic font-medium text-emerald-200/60 tracking-widest uppercase">
                  "Strive to Excel"
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/10 backdrop-blur-md rounded-xl border border-white/10">
                <IoSchoolOutline className="text-2xl text-emerald-300" />
              </div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-white tracking-tight">
                School <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-300">Gallery</span>
              </h1>
            </div>
          </div>
          
          <button
            onClick={onRefresh}
            className="flex items-center justify-center gap-3 bg-white/10 backdrop-blur-xl border border-white/20 px-4 py-2 rounded-xl font-bold text-sm tracking-wide text-white hover:bg-white/20 w-full sm:w-auto"
          >
            <FiRefreshCw className="text-lg" />
            <span>REFRESH GALLERY</span>
          </button>
        </div>
        
        <div className="mb-6">
          <p className="text-emerald-100/80 text-sm font-medium leading-relaxed">
            Explore <span className="text-white font-bold underline decoration-emerald-500/50 underline-offset-4">{stats.totalFiles} media files</span> 
            across <span className="text-white font-bold underline decoration-teal-500/50 underline-offset-4 mx-2">{stats.totalCategories} categories</span> 
            capturing our school's journey. This month: <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-emerald-400/20 text-emerald-300 border border-emerald-400/20 mx-1">{stats.thisMonth} new galleries</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

// Modern Gallery Card Component - Matungulu Girls Design
const ModernGalleryCard = ({ gallery, onView, onFavorite, viewMode = 'grid', onShare }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const getCategoryStyle = (category) => {
    const styles = {
      GENERAL: { 
        gradient: 'from-emerald-600 to-teal-600', 
        bg: 'bg-emerald-50', 
        text: 'text-emerald-700',
        border: 'border-emerald-200',
        iconBg: 'bg-emerald-100',
        iconColor: 'text-emerald-600',
        darkBg: 'bg-emerald-900/20',
        darkBorder: 'border-emerald-800/30',
        darkText: 'text-emerald-400',
        buttonBg: 'bg-emerald-600 hover:bg-emerald-700',
        lightBg: 'bg-emerald-600'
      },
      CLASSROOMS: { 
        gradient: 'from-blue-600 to-cyan-600', 
        bg: 'bg-blue-50', 
        text: 'text-blue-700',
        border: 'border-blue-200',
        iconBg: 'bg-blue-100',
        iconColor: 'text-blue-600',
        darkBg: 'bg-blue-900/20',
        darkBorder: 'border-blue-800/30',
        darkText: 'text-blue-400',
        buttonBg: 'bg-blue-600 hover:bg-blue-700',
        lightBg: 'bg-blue-600'
      },
      TEACHING: { 
        gradient: 'from-purple-600 to-pink-600', 
        bg: 'bg-purple-50', 
        text: 'text-purple-700',
        border: 'border-purple-200',
        iconBg: 'bg-purple-100',
        iconColor: 'text-purple-600',
        darkBg: 'bg-purple-900/20',
        darkBorder: 'border-purple-800/30',
        darkText: 'text-purple-400',
        buttonBg: 'bg-purple-600 hover:bg-purple-700',
        lightBg: 'bg-purple-600'
      },
      LABORATORIES: { 
        gradient: 'from-amber-600 to-orange-600', 
        bg: 'bg-amber-50', 
        text: 'text-amber-700',
        border: 'border-amber-200',
        iconBg: 'bg-amber-100',
        iconColor: 'text-amber-600',
        darkBg: 'bg-amber-900/20',
        darkBorder: 'border-amber-800/30',
        darkText: 'text-amber-400',
        buttonBg: 'bg-amber-600 hover:bg-amber-700',
        lightBg: 'bg-amber-600'
      },
      SPORTS_DAY: { 
        gradient: 'from-red-600 to-rose-600', 
        bg: 'bg-red-50', 
        text: 'text-red-700',
        border: 'border-red-200',
        iconBg: 'bg-red-100',
        iconColor: 'text-red-600',
        darkBg: 'bg-red-900/20',
        darkBorder: 'border-red-800/30',
        darkText: 'text-red-400',
        buttonBg: 'bg-red-600 hover:bg-red-700',
        lightBg: 'bg-red-600'
      },
      GRADUATION: { 
        gradient: 'from-violet-600 to-indigo-600', 
        bg: 'bg-violet-50', 
        text: 'text-violet-700',
        border: 'border-violet-200',
        iconBg: 'bg-violet-100',
        iconColor: 'text-violet-600',
        darkBg: 'bg-violet-900/20',
        darkBorder: 'border-violet-800/30',
        darkText: 'text-violet-400',
        buttonBg: 'bg-violet-600 hover:bg-violet-700',
        lightBg: 'bg-violet-600'
      }
    };
    return styles[category] || styles.GENERAL;
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return 'Recently added';
    }
  };

  // Grid View
  if (viewMode === 'grid') {
    const theme = getCategoryStyle(gallery.category);
    
    return (
      <div 
        onClick={() => onView(gallery)}
        className="relative group cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1"
      >
        <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl overflow-hidden border border-slate-700/50 shadow-2xl hover:shadow-3xl hover:border-slate-600/50 transition-all duration-300">
          {/* Glow Effect */}
          <div className={`absolute -inset-0.5 bg-gradient-to-r ${theme.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 rounded-2xl`} />
          
          {/* Image Header with Overlay */}
          <div className="relative h-56 w-full">
            {gallery.files && gallery.files[0] ? (
              <>
                <img
                  src={gallery.files[0]}
                  alt={gallery.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
              </>
            ) : (
              <div className={`w-full h-full bg-gradient-to-br ${theme.gradient}`} />
            )}
            
            {/* Category Badge */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border ${theme.darkBg} ${theme.darkText} ${theme.darkBorder} backdrop-blur-sm`}>
                {gallery.category.replace(/_/g, ' ') || 'Gallery'}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="absolute top-4 right-4 flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onShare(gallery);
                }}
                className="p-2.5 rounded-xl bg-slate-800/80 backdrop-blur-sm border border-slate-600/50 text-slate-300 hover:text-white hover:bg-slate-700 transition-all duration-200"
              >
                <FiShare2 size={16} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onFavorite(gallery);
                  setIsFavorite(!isFavorite);
                }}
                className={`p-2.5 rounded-xl backdrop-blur-sm border transition-all duration-200 ${
                  isFavorite 
                    ? 'bg-amber-500/20 border-amber-500/50 text-amber-400' 
                    : 'bg-slate-800/80 border-slate-600/50 text-slate-300 hover:text-white hover:bg-slate-700'
                }`}
              >
                <FiBookmark className={isFavorite ? 'fill-current' : ''} size={16} />
              </button>
            </div>

            {/* File Count */}
            <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-slate-900/80 backdrop-blur-sm text-white rounded-xl text-xs font-medium border border-slate-700/50">
              <span className="flex items-center gap-1.5">
                <FiImage size={12} className="opacity-70" />
                {gallery.files?.length || 0} files
              </span>
            </div>

            {/* Title Overlay */}
            <div className="absolute bottom-4 left-4 right-16">
              <h3 className="text-xl font-bold text-white mb-1 line-clamp-2 drop-shadow-lg">
                {gallery.title}
              </h3>
            </div>
          </div>

          {/* Content Area */}
          <div className="p-5 bg-slate-800/50">
            <p className="text-sm text-slate-300 mb-4 line-clamp-2 leading-relaxed">
              {gallery.description || 'School gallery collection capturing memorable moments.'}
            </p>

            {/* Info Row */}
            <div className="flex items-center justify-between mb-5 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <FiCalendar size={14} className={theme.darkText} />
                <span>{formatDate(gallery.date)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <FiImage size={14} className={theme.darkText} />
                <span>{gallery.files?.length || 0} items</span>
              </div>
            </div>

            {/* Modern Full-width Button */}
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onView(gallery);
              }}
              className={`w-full py-3.5 ${theme.buttonBg} text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 group/btn transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5`}
            >
              <span>VIEW GALLERY</span>
              <FiArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform duration-200" />
            </button>

            {/* Decorative Element */}
            <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${theme.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
          </div>
        </div>
      </div>
    );
  }

  // List View - Also modernized
  return (
    <div 
      onClick={() => onView(gallery)}
      className="relative group cursor-pointer transform transition-all duration-300 hover:scale-[1.01] hover:-translate-y-1"
    >
      <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 p-4">
        {/* Glow Effect */}
        <div className={`absolute -inset-0.5 bg-gradient-to-r ${getCategoryStyle(gallery.category).gradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 rounded-2xl`} />
        
        <div className="relative flex gap-5">
          {/* Image Thumbnail */}
          <div className="relative w-28 h-28 rounded-xl overflow-hidden shrink-0">
            {gallery.files && gallery.files[0] ? (
              <>
                <img
                  src={gallery.files[0]}
                  alt={gallery.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
              </>
            ) : (
              <div className={`w-full h-full bg-gradient-to-br ${getCategoryStyle(gallery.category).gradient}`} />
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div>
                <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                  getCategoryStyle(gallery.category).darkBg
                } ${
                  getCategoryStyle(gallery.category).darkText
                } ${
                  getCategoryStyle(gallery.category).darkBorder
                } backdrop-blur-sm mb-2`}>
                  {gallery.category.replace(/_/g, ' ')}
                </span>
                <h3 className="text-lg font-bold text-white mb-1 line-clamp-1">
                  {gallery.title}
                </h3>
              </div>
              <span className="text-xs text-slate-400 bg-slate-800/80 px-2 py-1 rounded-lg">
                {formatDate(gallery.date)}
              </span>
            </div>

            <p className="text-sm text-slate-300 line-clamp-2 mb-3">
              {gallery.description || 'School gallery collection.'}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <FiImage size={14} className={getCategoryStyle(gallery.category).darkText} />
                  <span>{gallery.files?.length || 0} files</span>
                </div>
              </div>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onView(gallery);
                }}
                className={`px-5 py-2 ${getCategoryStyle(gallery.category).buttonBg} text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 group/btn transition-all duration-300 shadow-lg hover:shadow-xl`}
              >
                <span>VIEW</span>
                <FiArrowRight size={12} className="group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
// Modern Stats Card Component
const ModernStatCard = ({ stat }) => {
  const Icon = stat.icon;
  
  return (
    <div className="relative bg-white border border-slate-200 rounded-lg p-4">
      <div className="flex items-start justify-between mb-3">
        <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.gradient} bg-opacity-10`}>
          <Icon className="text-lg text-emerald-700" />
        </div>
        <div className="h-2 w-2 rounded-full bg-slate-200" />
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
  );
};

// Share Modal Component
const ShareModal = ({ isOpen, onClose, gallery }) => {
  const [copied, setCopied] = useState(false);
  
  if (!isOpen || !gallery) return null;

  const shareUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/pages/gallery`
    : '';

  const shareTitle = `Check out this school gallery: ${gallery.title}`;
  const shareText = `${gallery.title} - ${gallery.description?.substring(0, 100)}...`;

  const shareOptions = [
    {
      name: 'Copy Link',
      icon: FiCopy,
      color: 'bg-slate-100',
      iconColor: 'text-slate-600',
      action: () => {
        navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        toast.success('Gallery link copied to clipboard!');
        setTimeout(() => setCopied(false), 2000);
      }
    },
    {
      name: 'WhatsApp',
      icon: FaWhatsapp,
      color: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
      action: () => {
        const url = `https://wa.me/?text=${encodeURIComponent(`${shareTitle}\n${shareText}\n${shareUrl}`)}`;
        window.open(url, '_blank', 'noopener,noreferrer');
      }
    },
    {
      name: 'Twitter',
      icon: FaTwitter,
      color: 'bg-sky-50',
      iconColor: 'text-sky-600',
      action: () => {
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`${shareTitle}\n${shareUrl}`)}`;
        window.open(url, '_blank', 'noopener,noreferrer');
      }
    },
    {
      name: 'Facebook',
      icon: FaFacebookF,
      color: 'bg-blue-50',
      iconColor: 'text-blue-600',
      action: () => {
        const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        window.open(url, '_blank', 'noopener,noreferrer');
      }
    },
    {
      name: 'Email',
      icon: FiMail,
      color: 'bg-rose-50',
      iconColor: 'text-rose-600',
      action: () => {
        const subject = encodeURIComponent(shareTitle);
        const body = encodeURIComponent(`${shareText}\n\n${shareUrl}`);
        const url = `mailto:?subject=${subject}&body=${body}`;
        window.location.href = url;
      }
    }
  ];

  return (
    <div className="fixed inset-0 z-[250] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div 
        className="relative bg-white rounded-lg w-full max-w-md flex flex-col overflow-hidden border border-slate-200 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Share Gallery</h3>
            <p className="text-xs text-slate-500">Spread the word</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-50"
          >
            <FiX size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          
          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
            <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-200 shrink-0">
              {gallery.files?.[0] ? (
                <img src={gallery.files[0]} alt="" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-emerald-600 text-white">
                  <FiImage size={20} />
                </div>
              )}
            </div>
            <div className="min-w-0">
              <h4 className="font-bold text-slate-900 text-sm truncate">{gallery.title}</h4>
              <p className="text-xs text-slate-500">
                {gallery.files?.length || 0} files
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {shareOptions.map((option, index) => (
              <button
                key={index}
                onClick={option.action}
                className="flex flex-col items-center justify-center p-3 rounded-lg border border-transparent hover:border-slate-200 hover:bg-slate-50"
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-2 ${option.color}`}>
                  <option.icon className={`text-lg ${option.iconColor}`} />
                </div>
                <span className="text-[10px] font-medium text-slate-600">{option.name}</span>
                {option.name === 'Copy Link' && copied && (
                  <span className="text-[8px] text-emerald-600 font-medium mt-1">COPIED!</span>
                )}
              </button>
            ))}
          </div>

          <div className="space-y-2">
            <span className="text-xs font-medium text-slate-400">Direct Link</span>
            <div className="flex gap-2 p-1 bg-slate-50 border border-slate-200 rounded-lg">
              <input
                type="text"
                value={shareUrl}
                readOnly
                className="flex-1 px-3 bg-transparent text-xs text-slate-500 outline-none truncate"
              />
              <button
                onClick={() => {
                  navigator.clipboard.writeText(shareUrl);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-medium"
              >
                Copy
              </button>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-slate-100">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-white border border-slate-200 text-slate-700 rounded-lg text-xs font-medium hover:bg-slate-50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// Modern Gallery Detail Modal
const ModernGalleryDetailModal = ({ gallery, onClose, onDownload, onShare }) => {
  const [activeTab, setActiveTab] = useState('preview');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [downloading, setDownloading] = useState(false);

  if (!gallery) return null;

  const getCategoryStyle = (category) => {
    return { gradient: 'from-emerald-600 to-teal-600', icon: FiImage };
  };

  const categoryStyle = getCategoryStyle(gallery.category);
  const CategoryIcon = categoryStyle.icon;

  const isVideoFile = (filename) => {
    if (!filename) return false;
    const videoExtensions = ['.mp4', '.mov', '.avi', '.wmv', '.flv', '.webm', '.mkv'];
    return videoExtensions.some(ext => filename.toLowerCase().endsWith(ext));
  };

  const isImageFile = (filename) => {
    if (!filename) return false;
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'];
    return imageExtensions.some(ext => filename.toLowerCase().endsWith(ext));
  };

  const downloadAllFiles = async () => {
    if (!gallery || !gallery.files || gallery.files.length === 0) {
      toast.error('No files available to download');
      return;
    }

    setDownloading(true);
    const toastId = toast.loading(`Starting download of ${gallery.files.length} files...`);
    
    try {
      const files = gallery.files;
      let downloadedCount = 0;
      
      for (let i = 0; i < files.length; i++) {
        const fileUrl = files[i];
        const fileName = fileUrl.split('/').pop() || `file_${i + 1}`;
        
        try {
          toast.loading(`Downloading ${i + 1}/${files.length}: ${fileName}`, { id: toastId });
          
          const link = document.createElement('a');
          link.href = fileUrl;
          link.download = fileName;
          link.style.display = 'none';
          
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          
          downloadedCount++;
          
          if (i < files.length - 1) {
            await new Promise(resolve => setTimeout(resolve, 500));
          }
          
        } catch (error) {
          console.error(`Failed to download ${fileName}:`, error);
        }
      }
      
      toast.dismiss(toastId);
      toast.success(`Successfully downloaded ${downloadedCount}/${files.length} files!`);
      
    } catch (error) {
      console.error('Error in download process:', error);
      toast.dismiss(toastId);
      toast.error('Download failed. Please try downloading files individually.');
    } finally {
      setDownloading(false);
    }
  };

  const downloadSelectedFile = async () => {
    if (!gallery.files || !gallery.files[selectedIndex]) {
      toast.error('No file selected to download');
      return;
    }
    
    const fileUrl = gallery.files[selectedIndex];
    const fileName = fileUrl.split('/').pop() || `gallery_file_${selectedIndex + 1}`;
    
    try {
      const toastId = toast.loading(`Downloading ${fileName}...`);
      
      const link = document.createElement('a');
      link.href = fileUrl;
      link.download = fileName;
      link.style.display = 'none';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.dismiss(toastId);
      toast.success(`Downloaded: ${fileName}`);
    } catch (error) {
      console.error('Error downloading file:', error);
      toast.error('Failed to download file. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-4 bg-slate-900/90 backdrop-blur-sm">
      <div className="relative w-full h-full sm:h-auto sm:max-h-[90vh] sm:max-w-3xl bg-white sm:rounded-lg shadow-2xl overflow-hidden flex flex-col">
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 bg-black/20 backdrop-blur-md text-white rounded-lg border border-white/20"
        >
          <IoClose size={20} />
        </button>

        <div className="relative h-[40vh] sm:h-[300px] w-full shrink-0">
          {gallery.files && gallery.files[selectedIndex] ? (
            <img
              src={gallery.files[selectedIndex]}
              alt={gallery.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className={`w-full h-full bg-gradient-to-r ${categoryStyle.gradient}`} />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-black/20" />
          
          <div className="absolute bottom-4 left-4 flex gap-2">
            <span className="px-3 py-1 bg-white rounded-lg text-xs font-medium text-slate-900 border border-slate-200">
              {gallery.category.replace(/_/g, ' ')}
            </span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 bg-white">
          <div className="max-w-2xl mx-auto space-y-6">
            
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg bg-gradient-to-r ${categoryStyle.gradient}`}>
                <CategoryIcon className="text-white text-xl" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  {gallery.title}
                </h2>
                <p className="text-sm text-slate-500">{gallery.category.replace(/_/g, ' ')} Collection</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-y-2 gap-x-4 text-xs text-slate-500">
              <div className="flex items-center gap-1">
                <FiCalendar size={14} className="text-emerald-600" />
                {new Date(gallery.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
              <div className="flex items-center gap-1">
                <FiImage size={14} className="text-emerald-600" />
                {gallery.files?.length || 0} files
              </div>
            </div>

            <div className="border-b border-slate-200">
              <div className="flex gap-6">
                <button
                  className={`pb-2 text-xs font-medium border-b-2 ${
                    activeTab === 'preview' 
                      ? 'border-emerald-600 text-emerald-700' 
                      : 'border-transparent text-slate-500'
                  }`}
                  onClick={() => setActiveTab('preview')}
                >
                  Preview
                </button>
                <button
                  className={`pb-2 text-xs font-medium border-b-2 ${
                    activeTab === 'files' 
                      ? 'border-emerald-600 text-emerald-700' 
                      : 'border-transparent text-slate-500'
                  }`}
                  onClick={() => setActiveTab('files')}
                >
                  All Files ({gallery.files?.length || 0})
                </button>
                <button
                  className={`pb-2 text-xs font-medium border-b-2 ${
                    activeTab === 'info' 
                      ? 'border-emerald-600 text-emerald-700' 
                      : 'border-transparent text-slate-500'
                  }`}
                  onClick={() => setActiveTab('info')}
                >
                  Info
                </button>
              </div>
            </div>

            {activeTab === 'preview' && (
              <div className="space-y-4">
                <div className="text-sm text-slate-600">
                  {gallery.description || 'No description available.'}
                </div>
                
                {gallery.files && gallery.files.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 mt-4">
                    {gallery.files.slice(0, 6).map((file, index) => (
                      <div
                        key={index}
                        onClick={() => setSelectedIndex(index)}
                        className={`aspect-square rounded-lg overflow-hidden cursor-pointer border-2 ${
                          selectedIndex === index ? 'border-emerald-600' : 'border-transparent'
                        }`}
                      >
                        <img
                          src={file}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'files' && (
              <div className="space-y-2">
                {gallery.files?.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100"
                  >
                    <div className="p-1.5 bg-white rounded-lg">
                      <FiImage className="text-emerald-600" size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900 truncate">
                        {file.split('/').pop()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedIndex(index);
                          setActiveTab('preview');
                        }}
                        className="px-2 py-1 text-xs text-emerald-600 hover:bg-emerald-50 rounded"
                      >
                        View
                      </button>
                      <button
                        onClick={async () => {
                          const fileName = file.split('/').pop() || `file_${index + 1}`;
                          try {
                            const link = document.createElement('a');
                            link.href = file;
                            link.download = fileName;
                            link.click();
                            toast.success(`Downloaded: ${fileName}`);
                          } catch (error) {
                            toast.error('Failed to download file');
                          }
                        }}
                        className="px-2 py-1 text-xs text-emerald-600 hover:bg-emerald-50 rounded"
                      >
                        Download
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'info' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                    <p className="text-xs text-slate-500 mb-1">Category</p>
                    <p className="text-sm font-medium text-slate-900">{gallery.category.replace(/_/g, ' ')}</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                    <p className="text-xs text-slate-500 mb-1">Total Files</p>
                    <p className="text-sm font-medium text-slate-900">{gallery.files?.length || 0}</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                    <p className="text-xs text-slate-500 mb-1">Date Added</p>
                    <p className="text-sm font-medium text-slate-900">{new Date(gallery.date).toLocaleDateString()}</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                    <p className="text-xs text-slate-500 mb-1">Status</p>
                    <p className="text-sm font-medium text-emerald-600">Published</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="shrink-0 p-4 bg-slate-50 border-t border-slate-100">
          <div className="max-w-2xl mx-auto flex flex-row gap-2">
            <button
              onClick={downloadSelectedFile}
              disabled={!gallery.files || !gallery.files[selectedIndex]}
              className="flex-1 h-10 bg-white border border-slate-200 text-slate-700 rounded-lg text-xs font-medium flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <FiDownload size={14} />
              Download Selected
            </button>

            <button
              onClick={() => onShare(gallery)}
              className="flex-1 h-10 bg-white border border-slate-200 text-slate-700 rounded-lg text-xs font-medium flex items-center justify-center gap-2"
            >
              <FiShare2 size={14} />
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ModernGallery() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGallery, setSelectedGallery] = useState(null);
  const [favorites, setFavorites] = useState(new Set());
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [selectedYear, setSelectedYear] = useState('all');
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [galleryToShare, setGalleryToShare] = useState(null);

  const categoryOptions = [
    { id: 'all', name: 'All Galleries', icon: FiGlobe },
    { id: 'GENERAL', name: 'General', icon: FiGlobe },
    { id: 'CLASSROOMS', name: 'Classrooms', icon: FiBookOpen },
    { id: 'TEACHING', name: 'Teaching', icon: FiBook },
    { id: 'LABORATORIES', name: 'Laboratories', icon: FiTarget },
    { id: 'SPORTS_DAY', name: 'Sports Day', icon: FiAward },
    { id: 'GRADUATION', name: 'Graduation', icon: FiAward }
  ];

  const [stats, setStats] = useState([
    { 
      icon: FiImage, 
      number: '0', 
      label: 'Media Files', 
      sublabel: 'Total files',
      gradient: 'from-emerald-600 to-teal-600'
    },
    { 
      icon: FiFolder, 
      number: '0', 
      label: 'Galleries', 
      sublabel: 'Collections',
      gradient: 'from-emerald-600 to-teal-600'
    },
    { 
      icon: FiGrid, 
      number: '0', 
      label: 'Categories', 
      sublabel: 'Available',
      gradient: 'from-emerald-600 to-teal-600'
    },
    { 
      icon: FiCalendar, 
      number: new Date().getFullYear().toString(),
      label: 'Latest', 
      sublabel: 'This year',
      gradient: 'from-emerald-600 to-teal-600'
    }
  ]);

  useEffect(() => {
    const fetchGalleries = async () => {
      try {
        const response = await fetch('/api/gallery');
        const data = await response.json();
        
        if (data.success && data.galleries) {
          setGalleries(data.galleries);
          
          const totalFiles = data.galleries.reduce((acc, gallery) => acc + (gallery?.files?.length || 0), 0);
          
          setStats([
            { 
              icon: FiImage, 
              number: totalFiles.toString(), 
              label: 'Media Files', 
              sublabel: 'Total files',
              gradient: 'from-emerald-600 to-teal-600'
            },
            { 
              icon: FiFolder, 
              number: data.galleries.length.toString(), 
              label: 'Galleries', 
              sublabel: 'Collections',
              gradient: 'from-emerald-600 to-teal-600'
            },
            { 
              icon: FiGrid, 
              number: '7', 
              label: 'Categories', 
              sublabel: 'Available',
              gradient: 'from-emerald-600 to-teal-600'
            },
            { 
              icon: FiCalendar, 
              number: new Date().getFullYear().toString(),
              label: 'Latest', 
              sublabel: 'This year',
              gradient: 'from-emerald-600 to-teal-600'
            }
          ]);
        }
      } catch (error) {
        console.error('Error fetching galleries:', error);
        toast.error('Failed to load galleries');
      } finally {
        setLoading(false);
      }
    };

    fetchGalleries();
  }, []);

  const transformedGalleries = useMemo(() => {
    return (galleries || []).map(gallery => ({
      id: gallery.id || Math.random().toString(),
      category: gallery.category || 'GENERAL',
      title: gallery.title || 'Untitled Gallery',
      description: gallery.description || 'No description available',
      files: gallery.files || [],
      date: gallery.createdAt || new Date().toISOString(),
      year: gallery.createdAt ? new Date(gallery.createdAt).getFullYear() : new Date().getFullYear()
    }));
  }, [galleries]);

  const years = useMemo(() => {
    const yearSet = new Set();
    galleries.forEach(gallery => {
      if (gallery?.createdAt) {
        const year = new Date(gallery.createdAt).getFullYear();
        yearSet.add(year);
      }
    });
    return Array.from(yearSet).sort((a, b) => b - a);
  }, [galleries]);

  const filteredGalleries = useMemo(() => {
    let filtered = transformedGalleries.filter(gallery => {
      const matchesCategory = activeCategory === 'all' || gallery.category === activeCategory;
      const matchesYear = selectedYear === 'all' || gallery.year.toString() === selectedYear;
      const matchesSearch = searchTerm === '' || 
        gallery.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (gallery.description && gallery.description.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesCategory && matchesYear && matchesSearch;
    });
    
    filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    return filtered;
  }, [activeCategory, searchTerm, selectedYear, transformedGalleries]);

  const handleFavorite = (gallery) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(gallery.id)) {
      newFavorites.delete(gallery.id);
      toast.success('Removed from favorites');
    } else {
      newFavorites.add(gallery.id);
      toast.success('Added to favorites');
    }
    setFavorites(newFavorites);
  };

  const handleViewGallery = (gallery) => {
    setSelectedGallery(gallery);
  };

  const handleDownload = (gallery) => {
    setSelectedGallery(gallery);
  };

  const handleShare = (gallery) => {
    setGalleryToShare(gallery);
    setShareModalOpen(true);
  };

  const refreshData = async () => {
    setRefreshing(true);
    setTimeout(() => {
      window.location.reload();
      toast.success('Gallery refreshed!');
    }, 1000);
  };

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
                <p className="text-slate-600 font-medium text-sm">Loading school galleries...</p>
                <p className="text-slate-400 text-xs uppercase tracking-widest mt-1 font-bold">
                  Matungulu Girls High School
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
        <ModernHeroBanner 
          stats={{
            totalFiles: stats[0].number,
            totalCategories: stats[2].number,
            thisMonth: transformedGalleries.length
          }} 
          onRefresh={refreshData}
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {stats.map((stat, index) => (
            <ModernStatCard key={index} stat={stat} />
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 min-w-0 space-y-6">
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <FiImage className="text-emerald-700 text-lg" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">School Galleries</h2>
                  <p className="text-xs text-slate-400 uppercase tracking-wider">
                    {filteredGalleries.length} Galleries
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-lg p-3">
              <div className="flex flex-col md:flex-row items-stretch gap-3">
                <div className="relative w-full">
                  <div className="relative flex items-center bg-white border border-slate-200 rounded-lg">
                    <div className="pl-3 pr-2">
                      <FiSearch className="text-slate-400" size={16} />
                    </div>
                    <input
                      type="text"
                      placeholder="Search galleries..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full py-2.5 bg-transparent text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none"
                    />
                    {searchTerm && (
                      <button
                        onClick={() => setSearchTerm('')}
                        className="pr-3 text-slate-400"
                      >
                        <FiX size={14} />
                      </button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 w-full md:flex md:items-center md:gap-2">
                  <div className="relative w-full">
                    <select 
                      value={activeCategory}
                      onChange={(e) => setActiveCategory(e.target.value)}
                      className="w-full appearance-none px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-600 cursor-pointer focus:border-emerald-500"
                    >
                      {categoryOptions.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>

                  <div className="relative w-full">
                    <select 
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(e.target.value)}
                      className="w-full appearance-none px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-600 cursor-pointer focus:border-emerald-500"
                    >
                      <option value="all">All Years</option>
                      {years.map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setActiveCategory('all');
                      setSelectedYear('all');
                    }}
                    className="col-span-2 px-4 py-2.5 bg-emerald-600 text-white rounded-lg text-xs font-medium flex items-center justify-center gap-1"
                  >
                    <FiFilter size={12} />
                    Reset
                  </button>
                </div>
              </div>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2">
              {categoryOptions.map((category) => {
                const Icon = category.icon;
                const isActive = activeCategory === category.id;
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap text-xs font-medium border ${
                      isActive 
                        ? "bg-emerald-600 border-emerald-600 text-white" 
                        : "bg-white border-slate-200 text-slate-600"
                    }`}
                  >
                    {Icon && <Icon size={12} />}
                    {category.name}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between">
              <div className="text-xs text-slate-500">
                <span className="font-bold text-blue-900">{filteredGalleries.length}</span> galleries found
              </div>
              <div className="flex bg-white rounded-lg border border-slate-200 overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-emerald-50 text-emerald-600' : 'text-slate-500'}`}
                >
                  <FiGrid size={16} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-emerald-50 text-emerald-600' : 'text-slate-500'}`}
                >
                  <FiList size={16} />
                </button>
              </div>
            </div>

            <div className="relative">
              {filteredGalleries.length === 0 ? (
                <div className="bg-white border border-dashed border-slate-200 rounded-lg py-12 text-center">
                  <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <FiImage className="text-slate-400 text-xl" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">No galleries found</h3>
                  <p className="text-xs text-slate-500 mt-1 mb-4">Try adjusting your filters.</p>
                  <button 
                    onClick={() => { setSearchTerm(''); setActiveCategory('all'); setSelectedYear('all'); }}
                    className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-700"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-3'}>
                  {filteredGalleries.map((gallery, index) => (
                    <ModernGalleryCard 
                      key={gallery.id || index} 
                      gallery={gallery} 
                      onView={handleViewGallery}
                      onFavorite={handleFavorite}
                      onShare={handleShare}
                      viewMode={viewMode}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="lg:w-80 space-y-4">
            <div className="lg:sticky lg:top-24 space-y-4">
              
              <div className="bg-white border border-slate-200 rounded-lg p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <FiZap className="text-emerald-700 text-sm" />
                  </div>
                  <h2 className="text-base font-bold text-slate-900">Quick Actions</h2>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={() => {
                      const mostRecent = filteredGalleries[0];
                      if (mostRecent) {
                        handleViewGallery(mostRecent);
                      }
                    }}
                    className="w-full p-3 bg-emerald-50 text-emerald-700 rounded-lg border border-emerald-100 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-emerald-100 rounded-lg">
                        <FiEye className="text-emerald-600" size={14} />
                      </div>
                      <div className="text-left">
                        <p className="text-xs font-bold">Latest Gallery</p>
                        <p className="text-[10px] text-emerald-600">View most recent</p>
                      </div>
                    </div>
                    <FiArrowRight className="text-emerald-400" size={14} />
                  </button>

                  <button
                    onClick={() => toast.info('Favorites feature coming soon!')}
                    className="w-full p-3 bg-amber-50 text-amber-700 rounded-lg border border-amber-100 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-amber-100 rounded-lg">
                        <FiHeart className="text-amber-600" size={14} />
                      </div>
                      <div className="text-left">
                        <p className="text-xs font-bold">My Favorites</p>
                        <p className="text-[10px] text-amber-600">{favorites.size} saved</p>
                      </div>
                    </div>
                    <FiArrowRight className="text-amber-400" size={14} />
                  </button>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-lg p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <FiCalendar className="text-emerald-700 text-sm" />
                  </div>
                  <h2 className="text-base font-bold text-slate-900">Years</h2>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-slate-50 rounded-lg border border-slate-100">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                      <span className="text-xs text-slate-600">All Years</span>
                    </div>
                    <span className="text-xs font-medium text-emerald-600">{transformedGalleries.length}</span>
                  </div>
                  
                  {years.slice(0, 3).map(year => (
                    <div key={year} className="flex items-center justify-between p-2 bg-slate-50 rounded-lg border border-slate-100">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                        <span className="text-xs text-slate-600">{year}</span>
                      </div>
                      <span className="text-xs font-medium text-emerald-600">
                        {transformedGalleries.filter(g => g.year === year).length}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-emerald-800 rounded-lg p-5 text-white">
                <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center mb-3">
                  <FaLeaf className="text-white text-sm" />
                </div>
                <h4 className="text-base font-bold mb-1">School Memories</h4>
                <p className="text-xs text-emerald-100 mb-4">
                  Preserving our school's legacy through photos and videos.
                </p>
                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-emerald-300"></div>
                    <span>High quality media</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-emerald-300"></div>
                    <span>Organized by category</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-emerald-300"></div>
                    <span>Easy to download & share</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden bg-gradient-to-r from-emerald-800 to-teal-700 rounded-lg p-5">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl rounded-full" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-500/10 blur-3xl rounded-full" />

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-4">
            
            <div className="shrink-0">
              <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center">
                <FiImage className="text-emerald-700 text-xl" />
              </div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <h3 className="text-lg font-bold text-white mb-1">
                Preserving School History.
              </h3>
              <p className="text-xs text-emerald-100 leading-relaxed">
                Every photo tells a story. Explore decades of academic excellence, achievements, and memories.
              </p>
            </div>
          </div>
        </div>
      </div>

      {selectedGallery && (
        <ModernGalleryDetailModal
          gallery={selectedGallery}
          onClose={() => setSelectedGallery(null)}
          onDownload={handleDownload}
          onShare={handleShare}
        />
      )}

      <ShareModal
        isOpen={shareModalOpen}
        onClose={() => {
          setShareModalOpen(false);
          setGalleryToShare(null);
        }}
        gallery={galleryToShare}
      />
    </div>
  );
}
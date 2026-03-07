'use client';
import { useState, useEffect } from 'react';
import { toast, Toaster } from 'sonner';
import { 
  FiCalendar, 
  FiClock, 
  FiUser, 
  FiArrowRight,
  FiSearch,
  FiBookOpen,
  FiTarget,
  FiUsers,
  FiAward,
  FiStar,
  FiShield,
  FiMusic,
  FiHeart,
  FiAlertTriangle,
  FiPhone,
  FiMail,
  FiPhoneCall,
  FiMapPin,
  FiPlus,
  FiX,
  FiFilter,
  FiRotateCw,
  FiEdit3,
  FiTrash2,
  FiMessageCircle,
  FiSave,
  FiImage,
  FiUpload,
  FiEye,
  FiChevronRight,
  FiChevronLeft,
  FiGrid,
  FiList,
  FiBookmark,
  FiShare2,
  FiDownload,
  FiExternalLink,
  FiZap,
  FiTrendingUp,
  FiGlobe,
  FiCopy,
  FiBell,
  FiUserPlus 
} from 'react-icons/fi';

import {
  IoCalendarClearOutline,
  IoSparkles,
  IoRibbonOutline,
  IoPeopleCircle,
  IoStatsChart,
  IoShareSocialOutline,
  IoClose,
  IoLocationOutline,
  IoTimeOutline,
  IoPersonOutline,
  IoShareOutline,
  IoNewspaperOutline,
  IoSchoolOutline
} from 'react-icons/io5';
import { CircularProgress, Box, Typography, Stack } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

// Modern Modal Component with Glass Morphism
const ModernModal = ({ children, open, onClose, maxWidth = '800px', blur = true }) => {
  if (!open) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${blur ? 'backdrop-blur-md' : 'bg-black/50'}`}>
      <div 
        className="relative bg-white/95 rounded-[2.5rem] shadow-2xl animate-in zoom-in-95 duration-300 overflow-hidden border border-emerald-100/40"
        style={{ 
          width: '90%',
          maxWidth: maxWidth,
          maxHeight: '90vh',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(248,250,252,0.98) 100%)'
        }}
      >
        <div className="absolute top-4 right-4 z-10">
          <button 
            onClick={onClose}
            className="p-2.5 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white cursor-pointer border border-emerald-100 shadow-sm"
          >
            <FiX className="text-emerald-700 w-4 h-4" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

// Modern Card Component
const GlassCard = ({ children, className = '' }) => (
  <div className={`bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-900/5 ${className}`}>
    {children}
  </div>
);

// Modern Counseling Card with Enhanced Design
const ModernCounselingCard = ({ session, onView, onBookmark, viewMode = 'grid', isBookmarked: initialBookmarked }) => {
  const [isBookmarked, setIsBookmarked] = useState(initialBookmarked || false);

  const getCategoryStyle = (category) => {
    const styles = {
      academic: { 
        gradient: 'from-emerald-500 to-emerald-600', 
        bg: 'bg-emerald-50', 
        text: 'text-emerald-700',
        border: 'border-emerald-200',
        iconBg: 'bg-emerald-100',
        iconColor: 'text-emerald-600'
      },
      emotional: { 
        gradient: 'from-emerald-500 to-emerald-600', 
        bg: 'bg-emerald-50', 
        text: 'text-emerald-700',
        border: 'border-emerald-200',
        iconBg: 'bg-emerald-100',
        iconColor: 'text-emerald-600'
      },
      devotion: { 
        gradient: 'from-emerald-500 to-emerald-600', 
        bg: 'bg-emerald-50', 
        text: 'text-emerald-700',
        border: 'border-emerald-200',
        iconBg: 'bg-emerald-100',
        iconColor: 'text-emerald-600'
      },
      worship: { 
        gradient: 'from-emerald-500 to-emerald-600', 
        bg: 'bg-emerald-50', 
        text: 'text-emerald-700',
        border: 'border-emerald-200',
        iconBg: 'bg-emerald-100',
        iconColor: 'text-emerald-600'
      },
      support: { 
        gradient: 'from-emerald-500 to-emerald-600', 
        bg: 'bg-emerald-50', 
        text: 'text-emerald-700',
        border: 'border-emerald-200',
        iconBg: 'bg-emerald-100',
        iconColor: 'text-emerald-600'
      },
      drugs: { 
        gradient: 'from-emerald-500 to-emerald-600', 
        bg: 'bg-emerald-50', 
        text: 'text-emerald-700',
        border: 'border-emerald-200',
        iconBg: 'bg-emerald-100',
        iconColor: 'text-emerald-600'
      }
    };
    return styles[category] || styles.academic;
  };

  const formatDate = (dateString) => {
    try {
      if (dateString === 'Always Available' || dateString === 'Monday - Friday') {
        return dateString;
      }
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return 'Available';
    }
  };

  const handleBookmarkClick = (e) => {
    e.stopPropagation();
    const newState = !isBookmarked;
    setIsBookmarked(newState);
    onBookmark?.(session, newState);
  };

  const theme = getCategoryStyle(session.category);

  // Modern Grid View
  if (viewMode === 'grid') {
    return (
      <div 
        onClick={() => onView(session)}
        className="relative bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-900/5 overflow-hidden cursor-pointer transition-transform hover:-translate-y-1 duration-300"
      >
        {/* 1. Static Image Header */}
        <div className="relative h-48 w-full shrink-0">
          {session.image ? (
            <img
              src={session.image}
              alt={session.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${theme.gradient}`} />
          )}
          
          {/* Permanent Badges (Top Left) */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm border ${theme.bg} ${theme.text} ${theme.border}`}>
              {session.category || 'Counseling'}
            </span>
            {session.featured && (
              <span className="px-3 py-1 bg-emerald-900/90 backdrop-blur-md text-white rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1 shadow-sm">
                <IoSparkles className="text-emerald-400" /> Featured
              </span>
            )}
            {session.isSupport && (
              <span className="px-3 py-1 bg-emerald-900/90 backdrop-blur-md text-white rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1 shadow-sm">
                <FiPhoneCall className="text-emerald-300" /> 24/7 Support
              </span>
            )}
          </div>

          {/* Permanent Bookmark Button (Top Right) */}
          <div className="absolute top-4 right-4">
            <button
              onClick={handleBookmarkClick}
              className={`p-2.5 rounded-xl backdrop-blur-md border shadow-sm transition-all ${
                isBookmarked 
                  ? 'bg-emerald-500 border-emerald-500 text-white' 
                  : 'bg-white/90 border-emerald-100/20 text-slate-700'
              }`}
            >
              <FiBookmark className={isBookmarked ? 'fill-current' : ''} size={16} />
            </button>
          </div>

          {/* Counselor Info (Bottom) */}
          <div className="absolute bottom-0 inset-x-0 h-12 bg-gradient-to-t from-black/40 to-transparent flex items-end p-4">
            <span className="text-[10px] font-black text-white uppercase tracking-widest">
              {session.counselor || 'School Counselor'}
            </span>
          </div>
        </div>

        {/* 2. Content Area */}
        <div className="p-6">
          <h3 className="text-lg font-black text-slate-900 mb-2 line-clamp-2 leading-tight tracking-tight">
            {session.title}
          </h3>
          
          <p className="text-slate-500 text-xs mb-6 line-clamp-2 leading-relaxed">
            {session.description || 'Professional counseling and support session for students.'}
          </p>

          {/* 3. Bento-Style Info Grid */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 border border-slate-100">
              <div className={`p-1.5 rounded-lg ${theme.iconBg}`}>
                <FiCalendar className={`${theme.iconColor}`} size={14} />
              </div>
              <span className="text-[10px] font-black text-slate-700 uppercase tracking-tight whitespace-nowrap">
                {formatDate(session.date)}
              </span>
            </div>

            <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 border border-slate-100">
              <div className={`p-1.5 rounded-lg ${theme.iconBg}`}>
                <FiClock className={`${theme.iconColor}`} size={14} />
              </div>
              <span className="text-[10px] font-black text-slate-700 uppercase tracking-tight whitespace-nowrap">
                {session.time || 'Flexible'}
              </span>
            </div>

            <div className="col-span-2 flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 border border-slate-100">
              <div className={`p-1.5 rounded-lg ${theme.iconBg}`}>
                <FiUser className={`${theme.iconColor}`} size={14} />
              </div>
              <span className="text-[10px] font-black text-slate-700 uppercase tracking-tight truncate">
                {session.type || 'Counseling Session'}
              </span>
            </div>
          </div>

          {/* 4. Priority Indicator */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${
                session.priority === 'high' ? 'bg-emerald-500 animate-pulse' :
                session.priority === 'medium' ? 'bg-emerald-400' :
                'bg-emerald-300'
              }`} />
              <span className="text-[8px] font-black text-slate-400 uppercase tracking-wider">
                {session.priority || 'medium'} priority
              </span>
            </div>
            
            <div className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border ${
              session.status === 'active' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
              session.status === 'completed' ? 'bg-blue-50 text-blue-700 border-blue-200' :
              'bg-amber-50 text-amber-700 border-amber-200'
            }`}>
              {session.status || 'Upcoming'}
            </div>
          </div>

          <button className="
            w-full
            py-3
            bg-emerald-600 text-white 
            rounded-xl
            font-black 
            text-[10px] uppercase tracking-widest
            flex items-center justify-center gap-2 
            active:scale-[0.98] transition-transform
            shadow-lg shadow-emerald-900/20
          ">
            View Details
            <FiArrowRight size={12} className="text-emerald-200" />
          </button>
        </div>
      </div>
    );
  }

  // List View
  return (
    <div 
      onClick={() => onView(session)}
      className="relative bg-white rounded-[2rem] border border-slate-100 p-4 shadow-xl shadow-slate-900/5 cursor-pointer transition-colors active:bg-slate-50"
    >
      <div className="flex gap-5">
        {/* Image Container */}
        <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 shadow-sm">
          {session.image ? (
            <img
              src={session.image}
              alt={session.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${getCategoryStyle(session.category).gradient}`} />
          )}
        </div>

        {/* Content Area */}
        <div className="flex-1 min-w-0 flex flex-col justify-between">
          <div>
            {/* Metadata Row */}
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded-lg text-[8px] font-black uppercase tracking-widest border ${
                  getCategoryStyle(session.category).bg
                } ${getCategoryStyle(session.category).text} ${
                  getCategoryStyle(session.category).border
                }`}>
                  {session.category || 'Support'}
                </span>
                <span className="text-[8px] font-black text-slate-400 uppercase tracking-tighter">
                  {formatDate(session.date)}
                </span>
              </div>
            </div>

            <h3 className="text-sm font-black text-slate-900 leading-snug line-clamp-1 mb-1 tracking-tight">
              {session.title}
            </h3>

            <p className="text-slate-500 text-[10px] line-clamp-1 mb-2">
              {session.counselor}
            </p>
          </div>

          {/* Footer: Details & Action */}
          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center gap-2 text-[10px] text-slate-500">
              <div className="flex items-center gap-1 whitespace-nowrap">
                <FiClock className="text-slate-400" size={10} />
                <span className="font-semibold">{session.time}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-1 text-emerald-600 font-black text-[8px] uppercase tracking-wider">
              View
              <FiArrowRight size={10} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Modern Support Team Card
const ModernSupportTeamCard = ({ member, onView, onContact, viewMode = 'grid' }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const getRoleStyle = (role) => {
    const styles = {
      'teacher': { 
        gradient: 'from-emerald-500 to-emerald-600', 
        bg: 'bg-emerald-50', 
        text: 'text-emerald-700',
        border: 'border-emerald-200',
        iconBg: 'bg-emerald-100',
        iconColor: 'text-emerald-600',
        label: 'Teacher'
      },
      'matron': { 
        gradient: 'from-emerald-500 to-emerald-600', 
        bg: 'bg-emerald-50', 
        text: 'text-emerald-700',
        border: 'border-emerald-200',
        iconBg: 'bg-emerald-100',
        iconColor: 'text-emerald-600',
        label: 'Matron'
      },
      'patron': { 
        gradient: 'from-emerald-500 to-emerald-600', 
        bg: 'bg-emerald-50', 
        text: 'text-emerald-700',
        border: 'border-emerald-200',
        iconBg: 'bg-emerald-100',
        iconColor: 'text-emerald-600',
        label: 'Patron'
      },
      'Guidance Teacher': { 
        gradient: 'from-emerald-500 to-emerald-600', 
        bg: 'bg-emerald-50', 
        text: 'text-emerald-700',
        border: 'border-emerald-200',
        iconBg: 'bg-emerald-100',
        iconColor: 'text-emerald-600',
        label: 'Guidance Teacher'
      },
      'HOD Guidance and councelling teacher': { 
        gradient: 'from-emerald-500 to-emerald-600', 
        bg: 'bg-emerald-50', 
        text: 'text-emerald-700',
        border: 'border-emerald-200',
        iconBg: 'bg-emerald-100',
        iconColor: 'text-emerald-600',
        label: 'HOD Guidance'
      }
    };
    return styles[role] || { 
      gradient: 'from-emerald-500 to-emerald-600', 
      bg: 'bg-emerald-50', 
      text: 'text-emerald-700',
      border: 'border-emerald-200',
      iconBg: 'bg-emerald-100',
      iconColor: 'text-emerald-600',
      label: role || 'Team Member'
    };
  };

  const roleStyle = getRoleStyle(member.role);
  
  if (viewMode === 'grid') {
    const isSupport = ['teacher', 'matron', 'patron'].includes(member.role);

    return (
      <div 
        onClick={() => onView(member)}
        className="relative bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-900/5 overflow-hidden cursor-pointer transition-transform hover:-translate-y-1 duration-300"
      >
        {/* 1. Header */}
        <div className="relative h-48 w-full overflow-hidden">
          <img
            src={member.image || '/default-avatar.jpg'}
            alt={member.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-1.5">
            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border backdrop-blur-md ${roleStyle.bg} ${roleStyle.text} ${roleStyle.border}`}>
              {roleStyle.label}
            </span>
          </div>

          {/* Bookmark */}
          <button
            onClick={(e) => { e.stopPropagation(); setIsBookmarked(!isBookmarked); }}
            className={`absolute top-4 right-4 p-2.5 rounded-xl backdrop-blur-md border transition-all ${
              isBookmarked ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-white/80 border-emerald-100/20 text-slate-700'
            }`}
          >
            <FiUserPlus size={14} className={isBookmarked ? 'fill-current' : ''} />
          </button>

          {/* Mobile Name Overlay */}
          <div className="absolute bottom-4 left-4 sm:hidden">
            <h3 className="text-white font-black text-sm uppercase tracking-tight">{member.name}</h3>
          </div>
        </div>

        {/* 2. Content Area */}
        <div className="p-6">
          <h3 className="hidden sm:block text-lg font-black text-slate-900 mb-2 line-clamp-1 tracking-tight">{member.name}</h3>
          
          <p className="text-slate-500 text-xs mb-4 line-clamp-2 leading-relaxed">
            {member.bio || 'Dedicated professional providing guidance and support.'}
          </p>

          {/* Contact Grid */}
          <div className="hidden sm:grid grid-cols-2 gap-3 mb-4">
            <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100">
              <FiPhone className={roleStyle.iconColor} size={14} />
              <span className="text-[10px] font-black text-slate-700 truncate whitespace-nowrap">{member.phone || 'No Phone'}</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100">
              <FiMail className={roleStyle.iconColor} size={14} />
              <span className="text-[10px] font-black text-slate-700 uppercase">Email</span>
            </div>
          </div>

          {/* Status */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-1.5">
              <div className={`w-1.5 h-1.5 rounded-full ${isSupport ? 'bg-emerald-500 animate-pulse' : 'bg-emerald-400'}`} />
              <span className="text-[8px] font-black text-slate-400 uppercase tracking-wider whitespace-nowrap">
                {isSupport ? '24/7' : 'Active'}
              </span>
            </div>
          </div>

          {/* Final Action Button */}
          <button 
            onClick={() => onView(member)}
            className="w-full py-3 bg-emerald-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-emerald-900/20"
          >
            View Profile
          </button>
        </div>
      </div>
    );
  }

  // List View
  return (
    <div 
      onClick={() => onView(member)}
      className="relative bg-white rounded-[2rem] border border-slate-100 p-4 shadow-xl shadow-slate-900/5 cursor-pointer transition-colors active:bg-slate-50"
    >
      <div className="flex gap-5">
        {/* Image Container */}
        <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 shadow-sm">
          <img
            src={member.image || '/default-avatar.jpg'}
            alt={member.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content Area */}
        <div className="flex-1 min-w-0 flex flex-col justify-between">
          <div>
            {/* Metadata Row */}
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded-lg text-[8px] font-black uppercase tracking-widest border ${roleStyle.bg} ${roleStyle.text} ${roleStyle.border}`}>
                  {roleStyle.label}
                </span>
              </div>
            </div>

            <h3 className="text-sm font-black text-slate-900 leading-snug line-clamp-1 mb-1 tracking-tight">
              {member.name}
            </h3>
          </div>

          {/* Footer: Details & Action */}
          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center gap-2 text-[10px] text-slate-500">
              {member.phone && (
                <div className="flex items-center gap-1 whitespace-nowrap">
                  <FiPhone className="text-slate-400" size={10} />
                  <span className="font-semibold">{member.phone}</span>
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-1 text-emerald-600 font-black text-[8px] uppercase tracking-wider">
              Contact
              <FiArrowRight size={10} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Team Member Modal
const TeamMemberModal = ({ member, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!isOpen || !member) return null;

  const getRoleStyle = (role) => {
    const styles = {
      'teacher': { gradient: 'from-emerald-600 to-emerald-600', text: 'text-emerald-700', label: 'Teacher' },
      'matron': { gradient: 'from-emerald-600 to-emerald-600', text: 'text-emerald-700', label: 'Matron' },
      'patron': { gradient: 'from-emerald-600 to-emerald-600', text: 'text-emerald-700', label: 'Patron' }
    };
    return styles[role] || { gradient: 'from-emerald-600 to-emerald-600', text: 'text-emerald-700', label: role || 'Member' };
  };

  const roleStyle = getRoleStyle(member.role);
  const isSupportStaff = ['teacher', 'matron', 'patron'].includes(member.role);

  return (
    <>
      {/* Darker backdrop */}
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60] transition-opacity" onClick={onClose} />
      
      <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center">
        <div 
          className="bg-white rounded-t-[2rem] sm:rounded-[2.5rem] w-full max-w-2xl max-h-[92vh] overflow-hidden shadow-2xl flex flex-col mx-auto transition-all border border-emerald-100/20"
          onClick={(e) => e.stopPropagation()}
        >
          {/* 1. Header */}
          <div className={`relative shrink-0 p-6 sm:p-8 bg-gradient-to-br ${roleStyle.gradient} text-white`}>
            <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-white/10 rounded-full hover:bg-white/20">
              <FiX size={16} />
            </button>
            
            <div className="flex items-center sm:items-start gap-4">
              <div className="relative shrink-0">
                <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-xl sm:rounded-2xl overflow-hidden border-2 border-white/40 shadow-lg">
                  <img src={member.image || '/default-avatar.jpg'} alt={member.name} className="w-full h-full object-cover" />
                </div>
              </div>
              
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-tighter bg-white/20 border border-white/10">
                    {roleStyle.label}
                  </span>
                </div>
                <h2 className="text-lg sm:text-2xl font-black truncate leading-tight tracking-tight">{member.name}</h2>
                <p className="text-white/70 text-xs sm:text-base truncate">{member.title || roleStyle.label}</p>
              </div>
            </div>
          </div>

          {/* 2. Tabs */}
          <div className="border-b border-slate-100 shrink-0 bg-white">
            <div className="flex px-6 sm:px-8 gap-6 overflow-x-auto no-scrollbar">
              {['overview', 'contact', 'availability'].map((tab) => (
                <button
                  key={tab}
                  className={`py-3 text-[10px] sm:text-xs font-black uppercase tracking-widest border-b-2 transition-all whitespace-nowrap ${
                    activeTab === tab ? 'border-emerald-600 text-emerald-600' : 'border-transparent text-slate-400'
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Content */}
          <div className="p-6 sm:p-8 overflow-y-auto grow">
            {activeTab === 'overview' && (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {member.bio || `Dedicated ${roleStyle.label} at Matungulu Girls High School.`}
                </p>
              </div>
            )}

            {activeTab === 'contact' && (
              <div className="grid grid-cols-1 gap-2 sm:gap-3 animate-in fade-in duration-300">
                {[
                  { icon: <FiPhone />, label: 'Phone', value: member.phone, color: 'text-emerald-500' },
                  { icon: <FiMail />, label: 'Email', value: member.email, color: 'text-emerald-500' }
                ].map((item, i) => item.value && (
                  <div key={i} className="p-3 sm:p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                    <div className={`${item.color} text-base shrink-0`}>{item.icon}</div>
                    <div className="min-w-0">
                      <p className="text-[8px] uppercase font-black text-slate-400 leading-none mb-1">{item.label}</p>
                      <p className="text-xs sm:text-sm font-black text-slate-700 truncate">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'availability' && (
              <div className="space-y-2 animate-in fade-in duration-300">
                <div className="p-3 bg-slate-50 rounded-xl flex justify-between items-center text-xs">
                  <span className="text-slate-500 text-[10px] font-black uppercase tracking-wider">Standard Hours</span>
                  <span className="font-black text-slate-900 text-[10px]">8AM - 5PM</span>
                </div>
                {isSupportStaff && (
                  <div className="p-3 bg-emerald-50 text-emerald-700 rounded-xl text-[10px] flex items-center gap-2">
                    <FiAlertTriangle className="shrink-0" size={12} />
                    Available 24/7 for urgent matters.
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 4. Footer */}
          <div className="p-4 sm:p-6 border-t border-slate-100 shrink-0 bg-slate-50/50">
            <div className="flex gap-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(member.phone || '');
                  toast.success('Number copied');
                }}
                className="flex-1 py-3 rounded-xl border border-slate-200 bg-white text-slate-700 font-black text-[10px] flex items-center justify-center gap-2 uppercase tracking-wider"
              >
                <FiCopy size={12} /> Copy
              </button>
              <button 
                onClick={onClose} 
                className="flex-1 py-3 rounded-xl bg-emerald-600 text-white font-black text-[10px] uppercase tracking-wider shadow-lg shadow-emerald-900/20"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Modern Detail Modal
const ModernDetailModal = ({ session, onClose, onContact }) => {
  if (!session) return null;

  const getCategoryStyle = (category) => {
    const styles = {
      academic: { gradient: 'from-emerald-500 to-emerald-600', icon: FiTarget },
      emotional: { gradient: 'from-emerald-500 to-emerald-600', icon: FiHeart },
      devotion: { gradient: 'from-emerald-500 to-emerald-600', icon: FiHeart },
      worship: { gradient: 'from-emerald-500 to-emerald-600', icon: FiMusic },
      support: { gradient: 'from-emerald-500 to-emerald-600', icon: FiPhoneCall },
      drugs: { gradient: 'from-emerald-500 to-emerald-600', icon: FiAlertTriangle }
    };
    return styles[category] || { gradient: 'from-emerald-500 to-emerald-600', icon: FiBookOpen };
  };

  const categoryStyle = getCategoryStyle(session.category);
  const CategoryIcon = categoryStyle.icon;

  const formatFullDate = (dateString) => {
    if (dateString === 'Always Available' || dateString === 'Monday - Friday') {
      return dateString;
    }
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  // Function to add session to Google Calendar
  const addSessionToGoogleCalendar = () => {
    if (!session) return;
    
    const formatDateForGoogle = (dateString, timeString) => {
      if (dateString === 'Always Available' || dateString === 'Monday - Friday') {
        const startDate = new Date();
        const endDate = new Date(startDate.getTime() + 60 * 60 * 1000);
        return {
          start: startDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z',
          end: endDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
        };
      }
      
      try {
        const date = new Date(dateString);
        const timeParts = timeString?.match(/(\d+):(\d+)\s*(AM|PM)/i);
        
        if (timeParts) {
          let [_, hours, minutes, period] = timeParts;
          hours = parseInt(hours);
          minutes = parseInt(minutes);
          
          if (period.toLowerCase() === 'pm' && hours < 12) hours += 12;
          if (period.toLowerCase() === 'am' && hours === 12) hours = 0;
          
          date.setHours(hours, minutes, 0, 0);
          const endDate = new Date(date.getTime() + 60 * 60 * 1000);
          
          return {
            start: date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z',
            end: endDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
          };
        }
        
        const startDate = new Date(dateString);
        const endDate = new Date(startDate.getTime() + 60 * 60 * 1000);
        
        return {
          start: startDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z',
          end: endDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
        };
      } catch (error) {
        console.error('Error parsing date:', error);
        const startDate = new Date();
        const endDate = new Date(startDate.getTime() + 60 * 60 * 1000);
        
        return {
          start: startDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z',
          end: endDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
        };
      }
    };

    const { start, end } = formatDateForGoogle(session.date, session.time);
    
    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(session.title)}&dates=${start}/${end}&details=${encodeURIComponent(session.description || 'Join this counseling session')}&location=${encodeURIComponent(session.location || 'Guidance Office')}&sf=true&output=xml`;
    
    window.open(calendarUrl, '_blank', 'noopener,noreferrer');
    
    toast.success('Opening Google Calendar to add this session...');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-4 bg-slate-900/90 backdrop-blur-sm">
      <div className="relative w-full h-full sm:h-auto sm:max-h-[90vh] sm:max-w-3xl bg-white sm:rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 z-50 p-2 bg-black/20 backdrop-blur-md text-white rounded-full border border-white/20 transition-all active:scale-90"
        >
          <IoClose size={18} className="sm:size-[22px]" />
        </button>

        {/* 1. Hero Image */}
        <div className="relative h-[30vh] sm:h-[300px] w-full shrink-0">
          {session.image ? (
            <img
              src={session.image}
              alt={session.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className={`w-full h-full bg-gradient-to-r ${categoryStyle.gradient}`} />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-black/20" />
          
          {/* Badge Overlays */}
          <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 flex flex-wrap gap-2">
            <span className="px-3 py-1 sm:px-4 sm:py-1.5 bg-white shadow-xl rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-slate-900">
              {session.category || 'Counseling'}
            </span>
            {session.featured && (
              <span className="px-3 py-1 sm:px-4 sm:py-1.5 bg-emerald-900 text-white rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                <IoSparkles className="text-emerald-400" size={12} /> Featured
              </span>
            )}
          </div>
        </div>

        {/* 2. Content Area */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 bg-white">
          <div className="max-w-2xl mx-auto space-y-6 sm:space-y-8">
            
            {/* Title & Category */}
            <section className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-gradient-to-r ${categoryStyle.gradient}`}>
                  <CategoryIcon className="text-white text-xl sm:text-2xl" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-3xl font-black text-slate-900 leading-tight tracking-tight">
                    {session.title}
                  </h2>
                  <p className="text-slate-600 text-xs sm:text-sm">{session.type || 'Counseling Session'}</p>
                </div>
              </div>

              {/* Quick Info Bar */}
              <div className="flex flex-wrap gap-y-2 gap-x-4 sm:gap-x-6 text-[10px] sm:text-xs font-black text-slate-500">
                <div className="flex items-center gap-1.5 whitespace-nowrap">
                  <IoCalendarClearOutline className="text-emerald-500 text-sm sm:text-base" />
                  {formatFullDate(session.date)}
                </div>
                <div className="flex items-center gap-1.5 whitespace-nowrap">
                  <IoTimeOutline className="text-emerald-500 text-sm sm:text-base" />
                  {session.time || 'Flexible'}
                </div>
                <div className="flex items-center gap-1.5 truncate">
                  <IoPersonOutline className="text-emerald-500 text-sm sm:text-base" />
                  <span className="truncate max-w-[120px] sm:max-w-none">{session.counselor || 'Counselor'}</span>
                </div>
              </div>
            </section>

            {/* Description Block */}
            <section className="space-y-3 sm:space-y-4">
              <h3 className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">About this session</h3>
              <div className="text-slate-700 leading-relaxed text-xs sm:text-sm">
                {session.description || 'Professional counseling and support session.'}
              </div>
            </section>

            {/* Session Stats Grid */}
            <section className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-2">
              {[
                { label: 'Priority', val: session.priority || 'medium', icon: null, color: session.priority === 'high' ? 'bg-emerald-500' : 'bg-emerald-400' },
                { label: 'Status', val: session.status || 'scheduled', icon: <FiCalendar size={12} />, color: 'bg-emerald-100 text-emerald-600' },
                { label: 'Security', val: 'Secure', icon: <FiShield size={12} />, color: 'bg-emerald-100 text-emerald-600' },
                { label: 'Rating', val: '4.8/5.0', icon: <FiStar size={12} />, color: 'bg-emerald-100 text-emerald-600' }
              ].map((stat, i) => (
                <div key={i} className="p-3 sm:p-4 bg-slate-50 rounded-xl sm:rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-2 mb-1 sm:mb-2">
                    {stat.icon ? (
                      <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg sm:rounded-xl ${stat.color} flex items-center justify-center`}>
                        {stat.icon}
                      </div>
                    ) : (
                      <div className={`w-2 h-2 rounded-full ${stat.color}`} />
                    )}
                    <p className="text-[8px] sm:text-[9px] uppercase font-black text-slate-400">{stat.label}</p>
                  </div>
                  <p className="font-black text-xs sm:text-sm text-slate-900 capitalize">{stat.val}</p>
                </div>
              ))}
            </section>
          </div>
        </div>

        {/* 3. Action Footer */}
        <div className="shrink-0 p-4 sm:p-6 bg-slate-50/80 backdrop-blur-md border-t border-slate-100">
          <div className="max-w-2xl mx-auto flex gap-2 sm:gap-3">
            <button
              onClick={session.isSupport ? onContact : addSessionToGoogleCalendar}
              className="flex-[2] h-12 sm:h-14 bg-emerald-600 text-white rounded-xl sm:rounded-2xl font-black text-[10px] sm:text-xs uppercase tracking-wider flex items-center justify-center gap-2 active:scale-95 transition-transform shadow-lg shadow-emerald-900/20"
            >
              {session.isSupport ? <FiPhoneCall size={16} /> : <FiCalendar size={16} />}
              {session.isSupport ? 'Contact Support' : 'Join Session'}
            </button>
            
            <button
              onClick={onClose}
              className="flex-1 h-12 sm:h-14 bg-white border-2 border-slate-200 text-slate-900 rounded-xl sm:rounded-2xl font-black text-[10px] sm:text-xs uppercase tracking-wider flex items-center justify-center gap-2 active:scale-95 transition-transform"
            >
              <IoClose size={16} />
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Stats Card Component
const ModernStatCard = ({ stat }) => {
  const Icon = stat.icon;
  
  return (
    <div className="relative flex flex-col justify-between overflow-hidden bg-white border border-slate-100 p-4 md:p-6 rounded-[2rem] shadow-xl shadow-slate-900/5">
      {/* Top Section: Icon & Badge */}
      <div className="flex items-start justify-between mb-4 md:mb-6">
        <div className="p-3 md:p-4 rounded-xl md:rounded-2xl bg-emerald-50 text-emerald-700">
          <Icon className="text-lg md:text-xl" />
        </div>
      </div>

      {/* Content Section */}
      <div className="space-y-1">
        <p className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">
          {stat.label}
        </p>
        
        <div className="flex items-baseline gap-1">
          <h3 className="text-xl md:text-2xl lg:text-3xl font-black tracking-tight text-slate-900">
            {stat.number}
          </h3>
        </div>

        <p className="text-[10px] md:text-xs font-medium text-slate-500 leading-tight line-clamp-1">
          {stat.sublabel}
        </p>
      </div>
    </div>
  );
};

// Helper functions for default sessions
function getNextThursday() {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const daysUntilThursday = (4 - dayOfWeek + 7) % 7 || 7;
  const nextThursday = new Date(today);
  nextThursday.setDate(today.getDate() + daysUntilThursday);
  return nextThursday.toISOString().split('T')[0];
}

function getNextSunday() {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const daysUntilSunday = (0 - dayOfWeek + 7) % 7 || 7;
  const nextSunday = new Date(today);
  nextSunday.setDate(today.getDate() + daysUntilSunday);
  return nextSunday.toISOString().split('T')[0];
}

// API utility functions
const fetchGuidanceSessions = async () => {
  try {
    const response = await fetch('/api/guidance');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    
    if (data.success && data.events) {
      return data.events;
    }
    return [];
  } catch (error) {
    console.error('Error fetching guidance sessions:', error);
    toast.error('Failed to load guidance sessions');
    return [];
  }
};

const fetchTeamMembers = async () => {
  try {
    const response = await fetch('/api/guidanceteam');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    
    if (data.success && data.members) {
      return data.members.map(member => ({
        ...member,
        image: member.image ? 
          member.image.replace(
            /https:\/\/res\.cloudinary\.com\/dftzsfiqc\/image\/upload\/v\d+\/school_team\/\d+-images__\d+_\d+\.jpg/,
            'https://res.cloudinary.com/dftzsfiqc/image/upload/w_400,h_400,c_fill,g_face/school_team/' + 
            member.image.split('/').pop()
          ) : null,
        isSupport: member.role === 'teacher' || member.role === 'matron' || member.role === 'patron'
      }));
    }
    return [];
  } catch (error) {
    console.error('Error fetching team members:', error);
    toast.error('Failed to load team members');
    return [];
  }
};

// Transform API data to match session format
const transformApiDataToSessions = (apiEvents) => {
  return apiEvents.map(event => ({
    id: event.id,
    title: `${event.counselor} - ${event.category} Session`,
    counselor: event.counselor,
    date: event.date.split('T')[0],
    time: event.time || 'Flexible',
    type: event.type || 'Guidance Session',
    category: event.category?.toLowerCase() || 'academic',
    status: 'scheduled',
    description: event.description || 'Professional guidance and counseling session.',
    notes: event.notes || '',
    priority: event.priority?.toLowerCase() || 'medium',
    image: event.image || null,
    featured: false,
    location: 'Guidance Office',
    isSupport: false
  }));
};

// Default Devotion sessions (static, not from API)
const DEFAULT_SESSIONS = [
  {
    id: 'devotion-thursday',
    title: 'Thursday Devotion Session',
    counselor: 'School Chaplain',
    date: getNextThursday(),
    time: '10:00 AM - 11:00 AM',
    type: 'Spiritual Session',
    category: 'devotion',
    status: 'scheduled',
    description: 'Weekly devotion session to strengthen students in religious study and worship. Strengthen your faith and build spiritual resilience.',
    notes: 'Focus on spiritual growth and moral development. Bring your Bible and notebook.',
    priority: 'high',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80',
    featured: true,
    location: 'A.I.C Matungulu Girls'
  },
  {
    id: 'devotion-sunday',
    title: 'Sunday Youth Worship',
    counselor: 'Youth Leaders & CU',
    date: getNextSunday(),
    time: '2:00 PM - 4:00 PM',
    type: 'Youth Worship',
    category: 'worship',
    status: 'scheduled',
    description: 'Youth worship session with CU and YCS active worship groups. Experience powerful praise and worship with fellow students.',
    notes: 'Music, praise, and fellowship. All students welcome.',
    priority: 'high',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80',
    featured: true,
    location: 'A.I.C Matungulu Girls'
  }
];

// Main Component
export default function StudentCounseling() {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedSession, setSelectedSession] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [counselingSessions, setCounselingSessions] = useState([]);
  const [guidanceSessions, setGuidanceSessions] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  const [bookmarkedSessions, setBookmarkedSessions] = useState(new Set());
  const [selectedMember, setSelectedMember] = useState(null);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);

  // Dynamic stats based on team data
  const [stats, setStats] = useState([
    { 
      icon: FiCalendar, 
      number: '15+', 
      label: 'Active Sessions', 
      sublabel: 'This month',
      gradient: 'from-emerald-500 to-emerald-600'
    },
    { 
      icon: FiPhoneCall, 
      number: '24/7', 
      label: 'Support', 
      sublabel: 'Always available',
      gradient: 'from-emerald-500 to-emerald-600'
    },
    { 
      icon: FiShield, 
      number: '100%', 
      label: 'Confidential', 
      sublabel: 'All sessions',
      gradient: 'from-emerald-500 to-emerald-600'
    },
    { 
      icon: FiUsers, 
      number: '8', 
      label: 'Categories', 
      sublabel: 'Available support',
      gradient: 'from-emerald-500 to-emerald-600'
    }
  ]);

  // Load bookmarks from localStorage
  useEffect(() => {
    const savedBookmarks = localStorage.getItem('bookmarkedCounselingSessions');
    if (savedBookmarks) {
      setBookmarkedSessions(new Set(JSON.parse(savedBookmarks)));
    }
  }, []);

  // Save bookmarks to localStorage
  useEffect(() => {
    localStorage.setItem('bookmarkedCounselingSessions', JSON.stringify([...bookmarkedSessions]));
  }, [bookmarkedSessions]);

  // Categories for filtering
  const categoryOptions = [
    { id: 'all', name: 'All Sessions', icon: FiBookOpen, gradient: 'from-emerald-500 to-emerald-600' },
    { id: 'academic', name: 'Academic', icon: FiTarget, gradient: 'from-emerald-500 to-emerald-600' },
    { id: 'emotional', name: 'Emotional', icon: FiHeart, gradient: 'from-emerald-500 to-emerald-600' },
    { id: 'devotion', name: 'Devotion', icon: FiHeart, gradient: 'from-emerald-500 to-emerald-600' },
    { id: 'worship', name: 'Worship', icon: FiMusic, gradient: 'from-emerald-500 to-emerald-600' },
    { id: 'support', name: '24/7 Support', icon: FiPhoneCall, gradient: 'from-emerald-500 to-emerald-600' },
    { id: 'drugs', name: 'Drug Awareness', icon: FiAlertTriangle, gradient: 'from-emerald-500 to-emerald-600' }
  ];

  // Load guidance sessions and team members from API
  const loadData = async () => {
    try {
      const apiSessions = await fetchGuidanceSessions();
      const transformedSessions = transformApiDataToSessions(apiSessions);
      setGuidanceSessions(transformedSessions);
      
      const allSessions = [
        ...DEFAULT_SESSIONS,
        ...transformedSessions
      ];
      setCounselingSessions(allSessions);
      
      const uniqueCategories = [...new Set(allSessions.map(s => s.category))];
      setCategories(uniqueCategories);
      
      const teamData = await fetchTeamMembers();
      setTeamMembers(teamData);
      
      const teacherCount = teamData.filter(m => m.role === 'teacher').length;
      const matronCount = teamData.filter(m => m.role === 'matron').length;
      const patronCount = teamData.filter(m => m.role === 'patron').length;
      
      setStats([
        { 
          icon: FiCalendar, 
          number: allSessions.length.toString(), 
          label: 'Total Sessions', 
          sublabel: 'All categories',
          gradient: 'from-emerald-500 to-emerald-600'
        },
        { 
          icon: FiPhoneCall, 
          number: (matronCount + patronCount).toString(), 
          label: 'Support Staff', 
          sublabel: 'Matrons & Patrons',
          gradient: 'from-emerald-500 to-emerald-600'
        },
        { 
          icon: FiShield, 
          number: teacherCount.toString(), 
          label: 'Teachers', 
          sublabel: 'Guidance Counselors',
          gradient: 'from-emerald-500 to-emerald-600'
        },
        { 
          icon: FiUsers, 
          number: teamData.length.toString(), 
          label: 'Team Members', 
          sublabel: 'Total support team',
          gradient: 'from-emerald-500 to-emerald-600'
        }
      ]);
      
    } catch (error) {
      console.error('Error loading data:', error);
      const allSessions = [...DEFAULT_SESSIONS];
      setCounselingSessions(allSessions);
      setGuidanceSessions([]);
      setTeamMembers([]);
    }
  };

  useEffect(() => {
    const initData = async () => {
      setLoading(true);
      try {
        await loadData();
      } catch (error) {
        console.error('Error loading data:', error);
        toast.error('Failed to load some data');
      } finally {
        setLoading(false);
      }
    };

    initData();
  }, []);

  // Filter sessions
  const filteredSessions = counselingSessions.filter(session => {
    const matchesTab = activeTab === 'all' || session.category === activeTab;
    const matchesSearch = searchTerm === '' || 
      session.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.counselor?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.description?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleBookmark = (session, isBookmarked) => {
    const newBookmarked = new Set(bookmarkedSessions);
    if (isBookmarked) {
      newBookmarked.add(session.id);
      toast.success('Bookmarked session');
    } else {
      newBookmarked.delete(session.id);
      toast.success('Removed from bookmarks');
    }
    setBookmarkedSessions(newBookmarked);
  };

  const handleContactSupport = (member) => {
    toast.success(`Viewing ${member.name} profile`);
  };

  const refreshData = async () => {
    setRefreshing(true);
    try {
      await loadData();
      toast.success('Data refreshed!');
    } catch (error) {
      console.error('Error refreshing data:', error);
      toast.error('Failed to refresh data');
    } finally {
      setRefreshing(false);
    }
  };

  if (loading) {
    return (
      <Box className="min-h-[80vh] flex flex-col items-center justify-center p-4 bg-transparent">
        <Stack spacing={2} alignItems="center" className="w-full max-w-xs">
          <Box className="relative flex items-center justify-center scale-75 sm:scale-100 transition-transform">
            <CircularProgress
              variant="determinate"
              value={100}
              size={56}
              thickness={4}
              sx={{ color: '#e2e8f0' }} 
            />
            <CircularProgress
              variant="indeterminate"
              disableShrink
              size={56}
              thickness={4}
              sx={{
                color: '#059669',
                animationDuration: '800ms',
                position: 'absolute',
                left: 0,
                [`& .MuiCircularProgress-circle`]: {
                  strokeLinecap: 'round',
                },
              }}
            />
            <Box className="absolute">
              <IoSparkles className="text-emerald-600 text-lg animate-pulse" />
            </Box>
          </Box>

          <div className="text-center space-y-1">
            <h3 className="text-slate-900 font-black text-sm sm:text-base tracking-tight">
              Loading sessions...
            </h3>
            <p className="text-slate-500 text-[10px] sm:text-xs font-medium max-w-[200px] mx-auto">
              Fetching latest guidance and team info
            </p>
          </div>
        </Stack>
      </Box>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white p-4 md:p-6">
      <Toaster position="top-right" richColors />
      
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Modern Hero Header - Matungulu Girls Theme */}
        <div className="relative bg-gradient-to-r from-emerald-900 to-teal-800 rounded-[2.5rem] p-6 md:p-10 text-white overflow-hidden border border-emerald-700/30 mb-8 shadow-2xl">
          {/* Background Glows */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
          
          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-6">
              <div>
                {/* School Branding */}
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
                
                {/* Title */}
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/10 backdrop-blur-md rounded-xl border border-white/10">
                    <IoSchoolOutline className="text-xl sm:text-2xl md:text-3xl text-emerald-300" />
                  </div>
                  <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-white tracking-tight">
                    Guidance & <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-300">Counseling</span>
                  </h1>
                </div>
              </div>

          {/* Refresh & View Toggle Group */}
<div className="flex flex-nowrap items-center gap-2 sm:gap-3">
  {/* Refresh Button - Refined Size */}
  <button
    onClick={refreshData}
    disabled={refreshing}
    className="flex items-center justify-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 h-10 px-4 sm:px-5 rounded-xl font-bold text-[10px] sm:text-xs tracking-widest text-white hover:bg-white/20 transition-all disabled:opacity-70 disabled:cursor-not-allowed shrink-0"
  >
    {refreshing ? (
      <>
        <svg className="animate-spin h-3.5 w-3.5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span>REFRESHING</span>
      </>
    ) : (
      <>
        <FiRotateCw className="text-sm sm:text-base" />
        <span>REFRESH</span>
      </>
    )}
  </button>

  {/* View Toggle - Compact Size */}
  <div className="flex bg-white/10 backdrop-blur-xl rounded-xl p-1 border border-white/20 h-10 items-center">
    <button
      onClick={() => setViewMode('grid')}
      className={`h-8 w-8 sm:w-10 flex items-center justify-center rounded-lg transition-all ${
        viewMode === 'grid' 
          ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40' 
          : 'text-emerald-200/60 hover:text-white'
      }`}
    >
      <FiGrid size={14} className="sm:size-[16px]" />
    </button>
    <button
      onClick={() => setViewMode('list')}
      className={`h-8 w-8 sm:w-10 flex items-center justify-center rounded-lg transition-all ${
        viewMode === 'list' 
          ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40' 
          : 'text-emerald-200/60 hover:text-white'
      }`}
    >
      <FiList size={14} className="sm:size-[16px]" />
    </button>
  </div>
</div>
            </div>

            {/* Stats Summary */}
            <div className="mb-4 sm:mb-6 px-1">
              <p className="text-emerald-100/90 text-xs sm:text-base font-medium leading-relaxed sm:leading-loose">
                <span className="text-white font-black text-base sm:text-xl md:text-2xl underline decoration-emerald-500/50 underline-offset-4 mr-1">
                  {counselingSessions.length}
                </span> 
                <span className="tracking-tight sm:tracking-normal">counseling sessions and</span>
                <span className="text-white font-black text-base sm:text-xl md:text-2xl underline decoration-teal-500/50 underline-offset-4 ml-1 mr-1">
                  {teamMembers.length}
                </span>
                <span className="tracking-tight sm:tracking-normal">team members available</span>
              </p>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                <p className="text-[10px] sm:text-xs font-bold text-emerald-300 uppercase tracking-wider mb-1">Sessions</p>
                <p className="text-lg sm:text-xl md:text-2xl font-black text-white">{counselingSessions.length}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                <p className="text-[10px] sm:text-xs font-bold text-emerald-300 uppercase tracking-wider mb-1">Team</p>
                <p className="text-lg sm:text-xl md:text-2xl font-black text-white">{teamMembers.length}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                <p className="text-[10px] sm:text-xs font-bold text-emerald-300 uppercase tracking-wider mb-1">Categories</p>
                <p className="text-lg sm:text-xl md:text-2xl font-black text-white">{categories.length}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                <p className="text-[10px] sm:text-xs font-bold text-emerald-300 uppercase tracking-wider mb-1">Support</p>
                <p className="text-lg sm:text-xl md:text-2xl font-black text-white">24/7</p>
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-4 text-xs sm:text-sm text-emerald-200/80">
              <span className="inline-flex items-center gap-1">
                <IoSparkles className="text-emerald-300" size={14} />
                Professional support for academic & emotional well-being
              </span>
            </div>
          </div>
        </div>

        {/* Dynamic Stats from Team Data */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 mb-10">
          {stats.map((stat, index) => (
            <ModernStatCard key={index} stat={stat} />
          ))}
        </div>

        {/* 24/7 Support Team Section - Dynamic from API */}
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-50 rounded-[2.5rem] p-6 md:p-8 border border-emerald-100 shadow-xl shadow-slate-900/5 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8">
            <div className="flex items-center gap-4 mb-4 lg:mb-0">
              <div className="p-3 bg-emerald-600 rounded-xl shadow-lg shadow-emerald-900/20">
                <FiPhoneCall className="text-white text-xl" />
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">Guidance & Counseling Team</h2>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                  {teamMembers.length} Dedicated Professionals
                </p>
              </div>
            </div>
          </div>
          
          {teamMembers.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center border border-emerald-100">
              <div className="text-emerald-300 text-4xl mb-4">
                <FiUsers />
              </div>
              <h3 className="text-sm font-black text-slate-900 mb-2">No Team Members Available</h3>
              <p className="text-slate-500 text-xs">Team information will be loaded soon.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teamMembers.map((member) => (
                <ModernSupportTeamCard
                  key={member.id}
                  member={member}
                  onView={() => {
                    setSelectedMember(member);
                    setIsTeamModalOpen(true);
                  }}
                  onContact={handleContactSupport}
                  viewMode="grid"
                />
              ))}
            </div>
          )}
        </div>

        {/* Main Content Layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column: Counseling Sessions */}
          <div className="flex-1 min-w-0 space-y-8">
            
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 px-1">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-emerald-600 rounded-xl shadow-lg shadow-emerald-900/20">
                  <FiHeart className="text-white text-xl" />
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">Counseling Sessions</h2>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                    {filteredSessions.length} Sessions Available
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-100 p-3 rounded-[2rem] shadow-xl shadow-slate-900/5">
              <div className="flex flex-col md:flex-row items-center gap-3">
                <div className="relative w-full flex-1">
                  <div className="relative flex items-center bg-slate-50 border border-slate-200 rounded-xl transition-all focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-500/5">
                    <div className="pl-4 pr-2 flex items-center justify-center pointer-events-none">
                      <FiSearch className="text-slate-400" size={16} />
                    </div>
                    <input
                      type="text"
                      placeholder="Search sessions..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full py-3 bg-transparent text-slate-900 placeholder:text-slate-400 font-medium text-xs focus:outline-none"
                    />
                    {searchTerm && (
                      <button
                        onClick={() => setSearchTerm('')}
                        className="pr-3 text-slate-400 hover:text-slate-600"
                      >
                        <FiX size={14} />
                      </button>
                    )}
                  </div>
                </div>

                {/* Category Selector */}
                <div className="relative w-full md:w-44">
                  <select 
                    value={activeTab}
                    onChange={(e) => setActiveTab(e.target.value)}
                    className="w-full appearance-none px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-600 text-xs cursor-pointer focus:ring-2 focus:ring-emerald-500/20 transition-all"
                  >
                    {categoryOptions.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>

                {/* Reset Button */}
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setActiveTab('all');
                  }}
                  className="
                    px-4 sm:px-5 
                    py-3
                    bg-emerald-600 text-white 
                    rounded-xl 
                    font-black 
                    text-[9px] uppercase tracking-wider
                    shadow-lg shadow-emerald-900/20 
                    hover:bg-emerald-700 active:scale-95 transition-all 
                    flex items-center justify-center gap-1.5
                  "
                >
                  <FiFilter size={12} />
                  <span>Reset</span>
                </button>
              </div>
            </div>

            {/* Modern Category Pills */}
            <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar -mx-2 px-2">
              {categoryOptions.map((category) => {
                const Icon = category.icon;
                const isActive = activeTab === category.id;
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveTab(category.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap text-[10px] font-black uppercase tracking-wider transition-all border ${
                      isActive 
                        ? "bg-emerald-600 border-emerald-600 text-white shadow-lg shadow-emerald-900/20" 
                        : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {Icon && <Icon className={isActive ? "text-white" : "text-slate-400"} size={12} />}
                    {category.name}
                  </button>
                );
              })}
            </div>

            {/* Sessions Grid */}
            <div className="relative">
              {filteredSessions.length === 0 ? (
                <div className="bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200 py-16 text-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <FiHeart className="text-slate-300 text-xl" />
                  </div>
                  <h3 className="text-base font-black text-slate-900">No sessions found</h3>
                  <p className="text-slate-500 text-xs mt-1 mb-4">Try adjusting your filters or search.</p>
                  <button 
                    onClick={() => { setSearchTerm(''); setActiveTab('all'); }}
                    className="px-5 py-2.5 bg-white border border-slate-200 rounded-full font-black text-slate-700 hover:bg-slate-50 transition-all text-[10px] uppercase tracking-wider"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-6' : 'space-y-4'}>
                  {filteredSessions.map((session, index) => (
                    <ModernCounselingCard 
                      key={session.id || index} 
                      session={session} 
                      onView={setSelectedSession}
                      onBookmark={handleBookmark}
                      viewMode={viewMode}
                      isBookmarked={bookmarkedSessions.has(session.id)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Quick Actions & Info */}
          <div className="lg:w-[320px] space-y-6">
            <div className="lg:sticky lg:top-24 space-y-6">
              
              {/* Quick Actions Card */}
              <div className="bg-white border border-slate-100 rounded-[2rem] p-6 shadow-xl shadow-slate-900/5">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 bg-emerald-50 rounded-xl">
                    <FiZap className="text-emerald-600 text-lg" />
                  </div>
                  <h2 className="text-base font-black text-slate-900 tracking-tight">Quick Actions</h2>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={() => toast.info('Access emergency contacts via the Student Portal.')}
                    className="w-full p-3.5 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-100 flex items-center justify-between hover:bg-emerald-100 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-emerald-100 rounded-lg">
                        <FiPhoneCall className="text-emerald-600" size={14} />
                      </div>
                      <div className="text-left">
                        <p className="font-black text-xs">Emergency Contact</p>
                        <p className="text-[9px] text-emerald-600">Immediate assistance</p>
                      </div>
                    </div>
                    <FiArrowRight className="text-emerald-400" size={14} />
                  </button>

                  <button
                    onClick={() => toast.info('Access schedule sessions via the Student Portal.')}
                    className="w-full p-3.5 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-100 flex items-center justify-between hover:bg-emerald-100 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-emerald-100 rounded-lg">
                        <FiCalendar className="text-emerald-600" size={14} />
                      </div>
                      <div className="text-left">
                        <p className="font-black text-xs">Schedule Session</p>
                        <p className="text-[9px] text-emerald-600">Book appointment</p>
                      </div>
                    </div>
                    <FiArrowRight className="text-emerald-400" size={14} />
                  </button>

                  <button
                    onClick={() => toast.info('Access resources via the Student Portal.')}
                    className="w-full p-3.5 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-100 flex items-center justify-between hover:bg-emerald-100 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-emerald-100 rounded-lg">
                        <FiBookOpen className="text-emerald-600" size={14} />
                      </div>
                      <div className="text-left">
                        <p className="font-black text-xs">Resources</p>
                        <p className="text-[9px] text-emerald-600">Self-help guides</p>
                      </div>
                    </div>
                    <FiArrowRight className="text-emerald-400" size={14} />
                  </button>
                </div>
              </div>

              {/* Session Info Banner */}
              <div className="bg-white border border-emerald-100 rounded-[2rem] p-6 shadow-xl shadow-slate-900/5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 bg-emerald-50 rounded-xl">
                    <FiBookOpen className="text-emerald-600" />
                  </div>
                  <h4 className="text-sm font-black text-slate-900">Session Types</h4>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                      <span className="text-xs font-medium text-slate-700">Devotion Sessions</span>
                    </div>
                    <span className="text-[9px] font-black text-emerald-600">Static</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                      <span className="text-xs font-medium text-slate-700">24/7 Support</span>
                    </div>
                    <span className="text-[9px] font-black text-emerald-600">Static</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                  <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                      <span className="text-xs font-medium text-slate-700">Guidance Sessions</span>
                    </div>
                    <span className="text-[9px] font-black text-emerald-600">API ({guidanceSessions.length})</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                      <span className="text-xs font-medium text-slate-700">Team Members</span>
                    </div>
                    <span className="text-[9px] font-black text-emerald-600">API ({teamMembers.length})</span>
                  </div>
                </div>
              </div>

              {/* Confidentiality Banner */}
              <div className="bg-gradient-to-br from-emerald-900 to-emerald-800 rounded-[2rem] p-6 text-white overflow-hidden relative shadow-xl">
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 blur-[50px]" />
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-4">
                    <FiShield className="text-white text-xl" />
                  </div>
                  <h4 className="text-base font-black mb-2 tracking-tight">100% Confidential</h4>
                  <p className="text-xs text-emerald-200 mb-4 leading-relaxed">
                    All sessions are private and secure. Your information is protected.
                  </p>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                      <span className="text-[10px]">Secure conversations</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                      <span className="text-[10px]">No judgment policy</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                      <span className="text-[10px]">Professional ethics</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Banner */}
        <div className="relative overflow-hidden bg-gradient-to-r from-emerald-900 to-emerald-800 rounded-[2.5rem] p-6 md:p-8 shadow-xl">
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 blur-[80px] rounded-full -mr-24 -mt-24" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-500/10 blur-[80px] rounded-full -ml-24 -mb-24" />

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 md:gap-8">
            
            {/* Icon */}
            <div className="shrink-0">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-white flex items-center justify-center shadow-lg">
                <FiHeart className="text-emerald-600 text-2xl md:text-3xl" />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-lg md:text-xl font-black text-white mb-2 tracking-tight">
                Your Well-being Matters.
              </h3>
              <p className="text-emerald-200 text-xs md:text-sm leading-relaxed max-w-xl mx-auto md:mx-0">
                At Matungulu Girls High School, we believe that true education extends beyond academics. 
                Our Guidance and Counseling Department is dedicated to nurturing the complete student—mind, 
                body, and spirit.
              </p>

              {/* Feature Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-6">
                {[
                  { label: 'Confidential', icon: FiShield },
                  { label: '24/7 Support', icon: FiPhoneCall },
                  { label: 'Professional', icon: FiUser },
                  { label: 'Holistic', icon: FiHeart }
                ].map((feature, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-center gap-2 p-2 bg-white/5 rounded-xl border border-white/10"
                  >
                    <div className="p-1 rounded-md bg-emerald-400/20 text-emerald-300 shrink-0">
                      <feature.icon size={12} />
                    </div>
                    <span className="text-[8px] font-black uppercase tracking-wider text-emerald-200 truncate">
                      {feature.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Session Detail Modal */}
      {selectedSession && (
        <ModernDetailModal
          session={selectedSession}
          onClose={() => setSelectedSession(null)}
          onContact={() => {
            setSelectedSession(null);
            toast.success('Connecting you to support...');
          }}
        />
      )}

      {selectedMember && (
        <TeamMemberModal
          member={selectedMember}
          isOpen={isTeamModalOpen}
          onClose={() => {
            setIsTeamModalOpen(false);
            setSelectedMember(null);
          }}
          onContact={handleContactSupport}
        />
      )}

      {/* Global Styles */}
      <style jsx global>{`
        /* Prevent zoom on iOS inputs */
        input, select, textarea {
          font-size: 16px !important;
        }

        /* Touch-friendly targets */
        button, a {
          min-height: 44px;
          min-width: 44px;
        }

        /* Hide scrollbar for category pills */
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        /* Responsive adjustments */
        @media (max-width: 640px) {
          .rounded-[2.5rem] {
            border-radius: 1.5rem !important;
          }
          .rounded-[2rem] {
            border-radius: 1.25rem !important;
          }
        }

        /* Smooth animations */
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }

        @keyframes zoom-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        
        .animate-in {
          animation-duration: 0.3s;
          animation-fill-mode: both;
        }
        
        .fade-in {
          animation-name: fade-in;
        }
        
        .zoom-in {
          animation-name: zoom-in;
        }
      `}</style>
    </div>
  );
}
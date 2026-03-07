'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  FiMail, 
  FiPhone, 
  FiSearch, 
  FiFilter, 
  FiGrid, 
  FiList, 
  FiChevronDown, 
  FiChevronRight, 
  FiBriefcase,
  FiCalendar, 
  FiUser,
  FiX,
  FiMenu,
  FiArrowLeft,
  FiArrowRight,
  FiMapPin,
  FiAward,
  FiStar,
  FiBook,
  FiTarget,
  FiUsers,
  FiChevronUp,
  FiBookOpen,
  FiRefreshCw
} from 'react-icons/fi';
import { SiGmail } from 'react-icons/si';
import { IoSchoolOutline } from 'react-icons/io5';
import { FaLeaf } from 'react-icons/fa';

// ==========================================
// 1. CONFIGURATION WITH HIERARCHY
// ==========================================

const STAFF_HIERARCHY = [
  {
    level: 'leadership',
    label: 'School Leadership',
    color: 'emerald',
    icon: '👑',
    positions: ['Principal', 'Deputy Principal', 'Senior Teacher', 'Head of Department']
  },
  {
    level: 'teaching',
    label: 'Teaching Staff',
    color: 'emerald',
    icon: '📚',
    positions: ['Teacher', 'Subject Teacher', 'Class Teacher', 'Assistant Teacher']
  },
  {
    level: 'support',
    label: 'Support Staff',
    color: 'emerald',
    icon: '🛠️',
    positions: ['Librarian', 'Laboratory Technician', 'Accountant', 'Secretary', 'Support Staff']
  }
];

const DEPARTMENTS = [
  { id: 'administration', label: 'Administration', color: 'emerald', icon: '👑', hierarchy: 'leadership' },
  { id: 'sciences', label: 'Sciences', color: 'emerald', icon: '🔬', hierarchy: 'teaching' },
  { id: 'mathematics', label: 'Mathematics', color: 'emerald', icon: '📊', hierarchy: 'teaching' },
  { id: 'languages', label: 'Languages', color: 'emerald', icon: '🌐', hierarchy: 'teaching' },
  { id: 'humanities', label: 'Humanities', color: 'emerald', icon: '📚', hierarchy: 'teaching' },
  { id: 'guidance', label: 'Guidance & Counseling', color: 'emerald', icon: '💝', hierarchy: 'support' },
  { id: 'sports', label: 'Sports & Athletics', color: 'emerald', icon: '⚽', hierarchy: 'teaching' },
  { id: 'technical', label: 'Technical & IT', color: 'emerald', icon: '💻', hierarchy: 'support' },
  { id: 'support', label: 'Support Staff', color: 'emerald', icon: '🛠️', hierarchy: 'support' }
];

const ITEMS_PER_PAGE = 12;

// ==========================================
// 2. UTILITY FUNCTIONS
// ==========================================

const generateSlug = (name, id) => {
  const cleanName = name
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
  
  return `${cleanName}-${id}`;
};

const getBadgeColorStyles = (colorName) => {
  const map = {
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    blue: 'bg-blue-50 text-blue-700 border-blue-200',
    slate: 'bg-slate-50 text-slate-700 border-slate-200',
  };
  return map[colorName] || map.slate;
};

const getImageSrc = (staff) => {
  if (staff?.image) {
    if (staff.image.startsWith('/')) {
      return `${process.env.NEXT_PUBLIC_SITE_URL || ''}${staff.image}`;
    }
    if (staff.image.startsWith('http')) return staff.image;
  }
  return '/images/default-staff.jpg';
};

const extractExpertiseCount = (staff) => {
  return staff?.expertise?.length || 0;
};

const extractResponsibilitiesCount = (staff) => {
  return staff?.responsibilities?.length || 0;
};

const extractAchievementsCount = (staff) => {
  return staff?.achievements?.length || 0;
};

const getStaffHierarchy = (position) => {
  if (!position) return 'teaching';
  
  const positionLower = position.toLowerCase();
  if (positionLower.includes('principal') || positionLower.includes('head') || positionLower.includes('senior')) {
    return 'leadership';
  } else if (positionLower.includes('teacher') || positionLower.includes('lecturer') || positionLower.includes('tutor')) {
    return 'teaching';
  } else {
    return 'support';
  }
};

// Sort staff by hierarchy - Principal first, then Deputies
const sortStaffByHierarchy = (staff) => {
  const hierarchyOrder = { leadership: 1, teaching: 2, support: 3 };
  
  return [...staff].sort((a, b) => {
    const aHierarchy = getStaffHierarchy(a.position);
    const bHierarchy = getStaffHierarchy(b.position);
    
    if (hierarchyOrder[aHierarchy] !== hierarchyOrder[bHierarchy]) {
      return hierarchyOrder[aHierarchy] - hierarchyOrder[bHierarchy];
    }
    
    if (aHierarchy === 'leadership' && bHierarchy === 'leadership') {
      const aIsPrincipal = a.position?.toLowerCase().includes('principal') && !a.position?.toLowerCase().includes('deputy');
      const bIsPrincipal = b.position?.toLowerCase().includes('principal') && !b.position?.toLowerCase().includes('deputy');
      
      if (aIsPrincipal && !bIsPrincipal) return -1;
      if (!aIsPrincipal && bIsPrincipal) return 1;
      
      return (a.name || '').localeCompare(b.name || '');
    }
    
    return (a.name || '').localeCompare(b.name || '');
  });
};

// ==========================================
// 3. SUB-COMPONENTS
// ==========================================

const Badge = ({ children, color = 'emerald', className = '', icon }) => (
  <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold border ${getBadgeColorStyles(color)} ${className}`}>
    {icon && <span className="mr-1.5">{icon}</span>}
    {children}
  </span>
);

const StaffSkeleton = ({ viewMode }) => {
  if (viewMode === 'list') {
    return (
      <div className="flex gap-6 p-6 border border-slate-200 rounded-lg bg-white/80 animate-pulse">
        <div className="w-24 h-24 bg-gradient-to-br from-emerald-200 to-emerald-300 rounded-lg shrink-0" />
        <div className="flex-1 space-y-4">
          <div className="h-6 bg-gradient-to-r from-emerald-200 to-emerald-300 rounded w-1/3" />
          <div className="h-4 bg-gradient-to-r from-emerald-200 to-emerald-300 rounded w-1/4" />
          <div className="h-12 bg-gradient-to-r from-emerald-200 to-emerald-300 rounded w-full" />
        </div>
      </div>
    );
  }
  return (
    <div className="border border-slate-200 rounded-lg bg-white/80 p-6 space-y-6 animate-pulse">
      <div className="w-full aspect-[4/5] bg-gradient-to-br from-emerald-200 to-emerald-300 rounded-lg" />
      <div className="space-y-3">
        <div className="h-6 bg-gradient-to-r from-emerald-200 to-emerald-300 rounded w-3/4" />
        <div className="h-4 bg-gradient-to-r from-emerald-200 to-emerald-300 rounded w-1/2" />
      </div>
    </div>
  );
};

const Checkbox = ({ label, count, checked, onChange, color, icon }) => (
  <label className="flex items-center gap-4 cursor-pointer p-3 rounded-lg hover:bg-slate-50 transition-colors">
    <div className={`w-5 h-5 rounded border flex items-center justify-center ${
      checked 
        ? 'bg-emerald-600 border-emerald-600' 
        : 'bg-white border-slate-300'
    }`}>
      {checked && <FiUser className="text-white text-xs" />}
    </div>
    <input type="checkbox" className="hidden" checked={checked} onChange={onChange} />
    <div className="flex-1 flex items-center gap-3">
      {icon && <span className="text-lg">{icon}</span>}
      <span className={`text-sm font-medium ${checked ? 'text-slate-900' : 'text-slate-600'}`}>
        {label}
      </span>
    </div>
    {count !== undefined && (
      <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full min-w-[2rem] text-center">
        {count}
      </span>
    )}
  </label>
);

const StatsPill = ({ icon, value, label, color = 'emerald' }) => {
  return (
    <div className="flex items-center gap-3 px-3 py-2 bg-white rounded-lg border border-slate-200">
      <div className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-base bg-emerald-50 text-emerald-600`}>
        {icon}
      </div>
      <div className="flex flex-col leading-tight">
        <span className="text-sm font-bold text-slate-900">
          {value}
        </span>
        <span className="text-xs text-slate-500">
          {label}
        </span>
      </div>
    </div>
  );
};

const HierarchySection = ({ title, icon, staff, viewMode, isFirst = false }) => {
  if (!staff?.length) return null;

  return (
    <section className={isFirst ? "" : "mt-12"}>
      <div className="flex items-center gap-4 mb-6">
        <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
          <span className="text-lg">{icon}</span>
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-900">{title}</h2>
          <p className="text-xs text-slate-500">{staff.length} members</p>
        </div>
      </div>
      
      <div className={
        viewMode === 'grid' 
          ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" 
          : "space-y-4"
      }>
        {staff.map((member) => (
          <div key={member.id}>
            {viewMode === 'grid' 
              ? <StaffCard staff={member} /> 
              : <StaffListCard staff={member} />
            }
          </div>
        ))}
      </div>
    </section>
  );
};

const StaffCard = ({ staff }) => {
  const deptConfig = DEPARTMENTS.find(d => d.id === staff.departmentId);
  const hierarchy = getStaffHierarchy(staff.position);
  
  const formatPhone = (phone) => {
    if (!phone) return null;
    return phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3');
  };

  return (
    <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
      <div className="relative w-full aspect-square bg-gradient-to-br from-emerald-50 to-emerald-100">
        <Image
          src={getImageSrc(staff)}
          alt={staff.name}
          fill
          className="object-cover object-top"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={hierarchy === 'leadership'}
          onError={(e) => { e.target.src = '/images/default-staff.jpg'; }}
        />
        
        <div className="absolute top-2 right-2">
          <div className="flex items-center gap-1 bg-white/90 px-2 py-1 rounded-full text-xs">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span className="text-slate-600">Active</span>
          </div>
        </div>

        <div className="absolute bottom-2 left-2">
          <Badge color="emerald" className="bg-white/90">
            {staff.department}
          </Badge>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-bold text-slate-900 mb-1">
          {staff.name}
        </h3>
        <p className="text-sm font-medium text-emerald-600 mb-2">
          {staff.position}
        </p>

        <p className="text-xs text-slate-600 line-clamp-2 mb-3">
          "{staff.quote || staff.bio || 'Dedicated educator at Matungulu Girls.'}"
        </p>

        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="bg-slate-50 rounded p-2 text-center">
            <span className="block text-sm font-bold text-slate-900">{staff.expertise?.length || 0}</span>
            <span className="text-[10px] text-slate-500">Skills</span>
          </div>
          <div className="bg-slate-50 rounded p-2 text-center">
            <span className="block text-sm font-bold text-slate-900">{staff.responsibilities?.length || 0}</span>
            <span className="text-[10px] text-slate-500">Roles</span>
          </div>
          <div className="bg-slate-50 rounded p-2 text-center">
            <span className="block text-sm font-bold text-slate-900">{staff.achievements?.length || 0}</span>
            <span className="text-[10px] text-slate-500">Awards</span>
          </div>
        </div>

        <div className="flex gap-2 mb-3">
          {staff.email && (
            <a 
              href={`mailto:${staff.email}`} 
              className="flex-1 flex items-center justify-center gap-2 py-2 bg-emerald-50 text-emerald-600 rounded text-xs font-medium"
            >
              <FiMail size={14} />
              <span>Email</span>
            </a>
          )}
          {staff.phone && (
            <a 
              href={`tel:${staff.phone}`} 
              className="flex-1 flex items-center justify-center gap-2 py-2 bg-slate-50 text-slate-600 rounded text-xs font-medium"
            >
              <FiPhone size={14} />
              <span>Call</span>
            </a>
          )}
        </div>

        <Link
          href={`/pages/staff/${staff.id}/${generateSlug(staff.name, staff.id)}`}
          className="flex items-center justify-center gap-2 py-2.5 bg-slate-900 text-white text-xs font-medium rounded"
        >
          <FiUser size={14} />
          <span>View Profile</span>
          <FiArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
};

const StaffListCard = ({ staff }) => {
  const deptConfig = DEPARTMENTS.find(d => d.id === staff.departmentId);
  const hierarchy = getStaffHierarchy(staff.position);
  
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4 flex flex-col sm:flex-row gap-4">
      <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-gradient-to-br from-emerald-50 to-emerald-100">
        <Image
          src={getImageSrc(staff)}
          alt={staff.name}
          fill
          className="object-cover"
          sizes="80px"
          onError={(e) => { e.target.src = '/images/default-staff.jpg'; }}
        />
      </div>

      <div className="flex-1">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
          <h3 className="text-base font-bold text-slate-900">
            <Link href={`/pages/staff/${staff.id}/${generateSlug(staff.name, staff.id)}`}>
              {staff.name}
            </Link>
          </h3>
          <Badge color="emerald" className="text-xs w-fit">
            {staff.department}
          </Badge>
        </div>
        
        <p className="text-emerald-600 font-medium text-sm mb-2">{staff.position}</p>
        <p className="text-xs text-slate-600 line-clamp-2 mb-3">{staff.bio}</p>
        
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-1 text-xs text-slate-500">
            <FiStar className="text-emerald-600" size={12} />
            <span>{extractExpertiseCount(staff)} skills</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-slate-500">
            <FiTarget className="text-emerald-600" size={12} />
            <span>{extractResponsibilitiesCount(staff)} roles</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-slate-500">
            <FiAward className="text-emerald-600" size={12} />
            <span>{extractAchievementsCount(staff)} awards</span>
          </div>
        </div>
      </div>

      <div className="flex sm:flex-col gap-2">
        {staff.email && (
          <a 
            href={`mailto:${staff.email}`}
            className="flex items-center justify-center gap-1 px-3 py-2 bg-emerald-50 text-emerald-600 rounded text-xs font-medium"
          >
            <FiMail size={14} />
            <span className="hidden sm:inline">Email</span>
          </a>
        )}
        <Link
          href={`/pages/staff/${staff.id}/${generateSlug(staff.name, staff.id)}`}
          className="flex items-center justify-center gap-1 px-3 py-2 border border-slate-200 text-slate-600 rounded text-xs font-medium"
        >
          <FiUser size={14} />
          <span className="hidden sm:inline">Profile</span>
        </Link>
      </div>
    </div>
  );
};

// ==========================================
// 4. MAIN PAGE COMPONENT
// ==========================================

export default function StaffDirectory() {
  const [staffData, setStaffData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepts, setSelectedDepts] = useState([]);
  const [selectedHierarchy, setSelectedHierarchy] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const fetchStaffData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/staff');
      
      if (!response.ok) {
        throw new Error(`Failed to fetch staff data: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success && data.staff) {
        const mappedStaff = data.staff.map(staff => ({
          id: staff.id,
          name: staff.name,
          role: staff.role,
          position: staff.position,
          department: staff.department,
          departmentId: staff.department.toLowerCase().replace(/\s+/g, '-'),
          email: staff.email,
          phone: staff.phone,
          image: staff.image,
          expertise: staff.expertise || [],
          bio: staff.bio,
          responsibilities: staff.responsibilities || [],
          achievements: staff.achievements || [],
          location: 'Matungulu Girls High School',
          joinDate: '2020'
        }));
        
        const sortedStaff = sortStaffByHierarchy(mappedStaff);
        setStaffData(sortedStaff);
      } else {
        throw new Error('Invalid data format from API');
      }
    } catch (err) {
      console.error('Error fetching staff data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaffData();
  }, []);

  const filteredStaff = useMemo(() => {
    return staffData.filter(staff => {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = 
        staff.name.toLowerCase().includes(searchLower) ||
        staff.role.toLowerCase().includes(searchLower) ||
        staff.position.toLowerCase().includes(searchLower) ||
        (staff.bio && staff.bio.toLowerCase().includes(searchLower)) ||
        staff.expertise.some(exp => exp.toLowerCase().includes(searchLower));

      const matchesDept = selectedDepts.length === 0 || selectedDepts.includes(staff.departmentId);
      const staffHierarchy = getStaffHierarchy(staff.position);
      const matchesHierarchy = selectedHierarchy === 'all' || selectedHierarchy === staffHierarchy;

      return matchesSearch && matchesDept && matchesHierarchy;
    });
  }, [staffData, searchQuery, selectedDepts, selectedHierarchy]);

  const staffByHierarchy = useMemo(() => {
    const leadership = filteredStaff.filter(staff => 
      getStaffHierarchy(staff.position) === 'leadership'
    );
    
    const teaching = filteredStaff.filter(staff => 
      getStaffHierarchy(staff.position) === 'teaching'
    );
    
    const support = filteredStaff.filter(staff => 
      getStaffHierarchy(staff.position) === 'support'
    );
    
    const sortedLeadership = [...leadership].sort((a, b) => {
      const aIsPrincipal = a.position?.toLowerCase().includes('principal') && !a.position?.toLowerCase().includes('deputy');
      const bIsPrincipal = b.position?.toLowerCase().includes('principal') && !b.position?.toLowerCase().includes('deputy');
      
      if (aIsPrincipal && !bIsPrincipal) return -1;
      if (!aIsPrincipal && bIsPrincipal) return 1;
      
      return (a.name || '').localeCompare(b.name || '');
    });
    
    return {
      leadership: sortedLeadership,
      teaching: [...teaching].sort((a, b) => (a.name || '').localeCompare(b.name || '')),
      support: [...support].sort((a, b) => (a.name || '').localeCompare(b.name || ''))
    };
  }, [filteredStaff]);

  const totalPages = Math.ceil(filteredStaff.length / ITEMS_PER_PAGE);
  const paginatedStaff = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredStaff.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredStaff, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedDepts, selectedHierarchy]);

  const toggleDept = (id) => {
    setSelectedDepts(prev => 
      prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id]
    );
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedDepts([]);
    setSelectedHierarchy('all');
  };

  const getDeptCount = (id) => staffData.filter(s => s.departmentId === id).length;

  const departmentStats = useMemo(() => [
    { icon: '👑', value: staffByHierarchy.leadership.length, label: 'Leadership' },
    { icon: '📚', value: staffByHierarchy.teaching.length, label: 'Teachers' },
    { icon: '🛠️', value: staffByHierarchy.support.length, label: 'Support' },
    { icon: '🏢', value: DEPARTMENTS.length, label: 'Departments' }
  ], [staffByHierarchy]);

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <FiUser className="text-2xl text-red-600" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Error Loading Staff</h2>
          <p className="text-slate-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-2.5 bg-emerald-600 text-white rounded-lg font-medium"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      
      {/* Mobile Filter Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 text-slate-600"
            >
              <FiMenu size={20} />
            </button>
            
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
              <img src="/MatG.jpg" alt="MatG Logo" className="w-6 h-6 object-contain" />
              </div>
              <div>
                <span className="text-lg font-bold text-slate-900">MatG Staff</span>
                <p className="text-xs text-slate-500">Faculty Directory</p>
              </div>
            </Link>
          </div>

          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search staff..."
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchStaffData}
              className="p-2 text-slate-600 hover:text-emerald-600 transition-colors"
            >
              <FiRefreshCw size={18} />
            </button>
            
            <div className="flex bg-white border border-slate-200 rounded-lg overflow-hidden">
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
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* Sidebar */}
          <aside className={`
            fixed lg:static inset-y-0 left-0 w-80 bg-white transform transition-transform duration-300 ease-in-out shadow-xl lg:shadow-none z-40 overflow-y-auto
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          `}>
            <div className="p-6 lg:p-0 lg:sticky lg:top-24 space-y-6">
              
              {/* Mobile Header */}
              <div className="flex items-center justify-between lg:hidden pb-4 border-b border-slate-100">
                <h2 className="text-lg font-bold text-slate-900">Filters</h2>
                <button 
                  onClick={() => setIsSidebarOpen(false)} 
                  className="p-2 bg-slate-100 rounded-lg"
                >
                  <FiX size={20} className="text-slate-600" />
                </button>
              </div>

              {/* Mobile Search */}
              <div className="lg:hidden">
                <div className="relative">
                  <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search staff..."
                    className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm"
                  />
                </div>
              </div>

              {/* Hierarchy Filter */}
              <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
                <div className="p-4 bg-slate-50 border-b border-slate-200">
                  <h3 className="font-bold text-slate-900 text-sm">Staff Hierarchy</h3>
                </div>
                <div className="p-2 space-y-1">
                  <button
                    onClick={() => setSelectedHierarchy('all')}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                      selectedHierarchy === 'all' 
                      ? 'bg-emerald-600 text-white' 
                      : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <span className="text-sm font-medium">ALL STAFF</span>
                    <span className={`text-xs px-2 py-1 rounded ${selectedHierarchy === 'all' ? 'bg-white/20' : 'bg-slate-100'}`}>
                      {staffData.length}
                    </span>
                  </button>

                  <button
                    onClick={() => setSelectedHierarchy('leadership')}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                      selectedHierarchy === 'leadership' 
                      ? 'bg-emerald-600 text-white' 
                      : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span>👑</span>
                      <span className="text-sm font-medium">Leadership</span>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded ${selectedHierarchy === 'leadership' ? 'bg-white/20' : 'bg-slate-100'}`}>
                      {staffByHierarchy.leadership?.length || 0}
                    </span>
                  </button>

                  <button
                    onClick={() => setSelectedHierarchy('teaching')}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                      selectedHierarchy === 'teaching' 
                      ? 'bg-emerald-600 text-white' 
                      : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span>📚</span>
                      <span className="text-sm font-medium">Teaching</span>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded ${selectedHierarchy === 'teaching' ? 'bg-white/20' : 'bg-slate-100'}`}>
                      {staffByHierarchy.teaching?.length || 0}
                    </span>
                  </button>

                  <button
                    onClick={() => setSelectedHierarchy('support')}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                      selectedHierarchy === 'support' 
                      ? 'bg-emerald-600 text-white' 
                      : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span>🛠️</span>
                      <span className="text-sm font-medium">Support</span>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded ${selectedHierarchy === 'support' ? 'bg-white/20' : 'bg-slate-100'}`}>
                      {staffByHierarchy.support?.length || 0}
                    </span>
                  </button>
                </div>
              </div>

              {/* Departments */}
              <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
                <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
                  <h3 className="font-bold text-slate-900 text-sm">Departments</h3>
                  {selectedDepts.length > 0 && (
                    <button 
                      onClick={() => setSelectedDepts([])}
                      className="text-xs text-emerald-600 font-medium"
                    >
                      Clear
                    </button>
                  )}
                </div>
                
                <div className="p-2 max-h-80 overflow-y-auto">
                  {DEPARTMENTS.map((dept) => (
                    <div 
                      key={dept.id}
                      onClick={() => toggleDept(dept.id)}
                      className={`cursor-pointer flex items-center justify-between p-3 rounded-lg border ${
                        selectedDepts.includes(dept.id)
                        ? 'border-emerald-200 bg-emerald-50'
                        : 'border-transparent hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{dept.icon}</span>
                        <span className="text-sm font-medium text-slate-700">{dept.label}</span>
                      </div>
                      <span className="text-xs text-slate-400">
                        {getDeptCount(dept.id)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Clear All */}
              {(selectedDepts.length > 0 || searchQuery || selectedHierarchy !== 'all') && (
                <button
                  onClick={clearAllFilters}
                  className="w-full py-3 rounded-lg border border-emerald-600 text-emerald-600 hover:bg-emerald-50 text-sm font-medium transition-colors"
                >
                  Clear All Filters
                </button>
              )}

            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-slate-900 mb-1">Meet Our Team</h1>
              <p className="text-sm text-slate-500">
                {loading ? 'Loading...' : `${filteredStaff.length} dedicated professionals`}
                {!loading && filteredStaff.length !== staffData.length && (
                  <span className="text-emerald-600 ml-1">(filtered from {staffData.length})</span>
                )}
              </p>
            </div>

            {/* Stats */}
            {!loading && (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                {departmentStats.map((stat, index) => (
                  <StatsPill key={index} {...stat} />
                ))}
              </div>
            )}

            {/* Staff Listing */}
            {loading ? (
              <div className={viewMode === 'grid' ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" : "space-y-4"}>
                {[...Array(6)].map((_, i) => <StaffSkeleton key={i} viewMode={viewMode} />)}
              </div>
            ) : filteredStaff.length > 0 ? (
              <>
                {selectedHierarchy === 'all' ? (
                  <div className="space-y-8">
                    <HierarchySection
                      title="School Leadership"
                      icon="👑"
                      staff={staffByHierarchy.leadership}
                      viewMode={viewMode}
                      isFirst={true}
                    />
                    <HierarchySection
                      title="Teaching Staff"
                      icon="📚"
                      staff={staffByHierarchy.teaching}
                      viewMode={viewMode}
                    />
                    <HierarchySection
                      title="Support Staff"
                      icon="🛠️"
                      staff={staffByHierarchy.support}
                      viewMode={viewMode}
                    />
                  </div>
                ) : (
                  viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {paginatedStaff.map((staff) => (
                        <StaffCard key={staff.id} staff={staff} />
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {paginatedStaff.map((staff) => (
                        <StaffListCard key={staff.id} staff={staff} />
                      ))}
                    </div>
                  )
                )}

                {/* Pagination */}
                {totalPages > 1 && selectedHierarchy !== 'all' && (
                  <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200 pt-6">
                    <div className="text-sm text-slate-500">
                      Page {currentPage} of {totalPages}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 disabled:opacity-50"
                      >
                        Previous
                      </button>
                      <div className="flex gap-1">
                        {Array.from({length: totalPages}, (_, i) => i + 1).map((page) => (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`w-8 h-8 rounded-lg text-sm font-medium ${
                              currentPage === page 
                                ? 'bg-emerald-600 text-white' 
                                : 'text-slate-600 hover:bg-slate-50'
                            }`}
                          >
                            {page}
                          </button>
                        ))}
                      </div>
                      <button
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 disabled:opacity-50"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}

              </>
            ) : (
              <div className="bg-white border border-dashed border-slate-200 rounded-lg p-12 text-center">
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <FiSearch className="text-slate-400 text-xl" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">No staff members found</h3>
                <p className="text-sm text-slate-500 mb-4">Try adjusting your search or filters</p>
                <button
                  onClick={clearAllFilters}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium"
                >
                  Clear All Filters
                </button>
              </div>
            )}
            
          </main>
        </div>
      </div>
    </div>
  );
}
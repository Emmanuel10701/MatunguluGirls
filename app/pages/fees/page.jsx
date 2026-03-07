'use client';
import { useState, useEffect } from 'react';
import { toast, Toaster } from 'sonner';
import { 
  FiDownload,
  FiFileText,
  FiCalendar,
  FiClock,
  FiUser,
  FiArrowRight,
  FiSearch,
  FiX,
  FiInfo,
  FiDollarSign,
  FiCreditCard,
  FiHome,
  FiBookOpen,
  FiTruck,
  FiHeart,
  FiAward,
  FiCheckCircle,
  FiPrinter,
  FiShare2,
  FiRefreshCw
} from 'react-icons/fi';
import { 
  IoSparkles,
  IoClose,
  IoDocumentTextOutline,
  IoEyeOutline,
  IoWalletOutline,
  IoCardOutline,
  IoCashOutline,
  IoReceiptOutline,
  IoSchoolOutline,
  IoBusinessOutline,
  IoBedOutline,
  IoMedkitOutline,
  IoLibraryOutline,
  IoPricetagOutline,
  IoCheckmarkCircleOutline,
  IoCalculatorOutline,
  IoStatsChartOutline,
  IoPeopleOutline,
  IoTimeOutline
} from 'react-icons/io5';
import { MdOutlineAdUnits } from 'react-icons/md';
import { FaWhatsapp, FaLeaf, FaUniversity, FaPhone, FaEnvelope } from 'react-icons/fa';
import { CircularProgress, Stack } from '@mui/material';
import { useRouter } from 'next/navigation';

// Modern Hero Banner for Fees
const ModernHeroBanner = ({ stats, onRefresh }) => {
  return (
    <div className="relative bg-gradient-to-r from-emerald-900 to-teal-800 rounded-2xl p-6 md:p-10 text-white overflow-hidden border border-emerald-700/30 mb-8">
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
                Fee <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-300">Structure</span>
              </h1>
            </div>
          </div>
     {/* Refresh Button */}
<button
  onClick={onRefresh}
  disabled={stats.refreshing}
  className="flex items-center justify-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl font-bold text-[11px] sm:text-sm tracking-widest text-white hover:bg-white/20 w-full sm:w-auto transition-all disabled:opacity-70 disabled:cursor-not-allowed"
>
  {stats.refreshing ? (
    <>
      {/* Modern Spinner SVG */}
      <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <span>REFRESHING...</span>
    </>
  ) : (
    <>
      <FiRefreshCw className="text-base sm:text-lg" />
      <span>REFRESH FEES</span>
    </>
  )}
</button>
        </div>
  {/* Stats Summary - Proportional & Balanced */}
<div className="mb-4 sm:mb-6 px-1">
  <p className="text-emerald-100/90 text-xs sm:text-base font-medium leading-relaxed sm:leading-loose">
    <span className="text-white font-black text-base sm:text-xl md:text-2xl underline decoration-emerald-500/50 underline-offset-4 mr-1">
      {stats.totalItems}
    </span> 
    <span className="tracking-tight sm:tracking-normal">fee items for annual fees totaling</span>
    <span className="text-white font-black text-base sm:text-xl md:text-2xl underline decoration-teal-500/50 underline-offset-4 ml-1 whitespace-nowrap">
      KSh {stats.totalAmount}
    </span>
  </p>
</div>

        {/* Quick Stats Grid - Bold & Responsive */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
            <p className="text-[10px] sm:text-xs font-bold text-emerald-300 uppercase tracking-wider mb-1">Total Items</p>
            <p className="text-lg sm:text-xl md:text-2xl font-black text-white">{stats.totalItems}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
            <p className="text-[10px] sm:text-xs font-bold text-emerald-300 uppercase tracking-wider mb-1">Categories</p>
            <p className="text-lg sm:text-xl md:text-2xl font-black text-white">{stats.categories}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
            <p className="text-[10px] sm:text-xs font-bold text-emerald-300 uppercase tracking-wider mb-1">PDF Available</p>
            <p className="text-lg sm:text-xl md:text-2xl font-black text-white">{stats.pdfAvailable ? 'YES' : 'NO'}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
            <p className="text-[10px] sm:text-xs font-bold text-emerald-300 uppercase tracking-wider mb-1">Last Updated</p>
            <p className="text-lg sm:text-xl md:text-2xl font-black text-white">{stats.lastUpdated}</p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-4 text-xs sm:text-sm text-emerald-200/80">
          <span className="inline-flex items-center gap-1">
            <IoSparkles className="text-emerald-300" size={14} />
            Click on any fee item for detailed information
          </span>
        </div>
      </div>
    </div>
  );
};

// Modern Fee Card Component - Matungulu Girls Design
const ModernFeeCard = ({ item, onInfo, index }) => {
  const getCategoryColor = (name) => {
    const colors = {
      'Tuition': 'bg-emerald-100 text-emerald-700 border-emerald-200',
      'Boarding': 'bg-teal-100 text-teal-700 border-teal-200',
      'Uniform': 'bg-blue-100 text-blue-700 border-blue-200',
      'Books': 'bg-amber-100 text-amber-700 border-amber-200',
      'Medical': 'bg-rose-100 text-rose-700 border-rose-200',
      'Activity': 'bg-pink-100 text-pink-700 border-pink-200',
      'Application': 'bg-indigo-100 text-indigo-700 border-indigo-200',
      'Registration': 'bg-cyan-100 text-cyan-700 border-cyan-200',
      'Development': 'bg-orange-100 text-orange-700 border-orange-200',
      'Deposit': 'bg-purple-100 text-purple-700 border-purple-200'
    };
    return colors[name] || 'bg-emerald-100 text-emerald-700 border-emerald-200';
  };

  return (
    <div className="bg-white border border-slate-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded ${getCategoryColor(item.name)} bg-opacity-20 flex items-center justify-center border`}>
              <IoPricetagOutline className="text-emerald-700 w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">{item.name}</h4>
              <p className="text-xs text-slate-500">Fee Item</p>
            </div>
          </div>
          <button
            onClick={() => onInfo(item)}
            className="p-1.5 bg-slate-100 rounded text-slate-600 hover:bg-slate-200 transition-colors"
            title="View details"
          >
            <FiInfo size={14} />
          </button>
        </div>

        <div className="mb-3">
          <p className="text-xs text-slate-500 mb-1">Amount</p>
          <p className="text-xl font-bold text-emerald-800">
            KSh {item.amount?.toLocaleString()}
          </p>
        </div>

        {item.description && (
          <p className="text-sm text-slate-600 mb-3 line-clamp-2 border-t border-slate-100 pt-3">
            {item.description}
          </p>
        )}

        <div className="flex flex-wrap gap-1.5">
          {item.optional && (
            <span className="px-2 py-0.5 bg-amber-50 text-amber-600 rounded text-xs font-medium border border-amber-200">
              Optional
            </span>
          )}
          {item.admissionOnly && (
            <span className="px-2 py-0.5 bg-purple-50 text-purple-600 rounded text-xs font-medium border border-purple-200">
              One-time
            </span>
          )}
          {item.boardingOnly && (
            <span className="px-2 py-0.5 bg-teal-50 text-teal-600 rounded text-xs font-medium border border-teal-200">
              Boarders Only
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

// Modern PDF Card - Matungulu Girls Design
const ModernPDFCard = ({ title, pdfUrl, fileName, fileSize, uploadDate, description, onDownload, onView }) => {
  return (
    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-white rounded-lg shadow-sm flex items-center justify-center">
          <IoDocumentTextOutline className="text-emerald-700 text-xl" />
        </div>
        
        <div className="flex-1">
          <h4 className="font-bold text-slate-900 text-sm mb-1">{title}</h4>
          {description && (
            <p className="text-xs text-slate-600 mb-2">{description}</p>
          )}
          
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mb-3">
            <span className="flex items-center gap-1">
              <FiFileText size={10} />
              {fileName || 'PDF Document'}
            </span>
            {fileSize && (
              <span className="flex items-center gap-1">
                <FiClock size={10} />
                {fileSize < 1024 ? fileSize + ' B' : (fileSize / 1024).toFixed(1) + ' KB'}
              </span>
            )}
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => onView(pdfUrl)}
              className="flex-1 py-2 bg-white text-emerald-700 rounded-lg text-xs font-medium flex items-center justify-center gap-1 border border-emerald-200 hover:bg-emerald-50 transition-colors"
            >
              <IoEyeOutline size={14} />
              Preview
            </button>
            <button
              onClick={() => onDownload(pdfUrl, fileName)}
              className="w-8 h-8 bg-emerald-700 text-white rounded-lg flex items-center justify-center hover:bg-emerald-800 transition-colors"
            >
              <FiDownload size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Modern Stat Card - Matungulu Girls Design
const ModernStatCard = ({ icon: Icon, label, value, sublabel }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-2">
        <div className="p-1.5 bg-emerald-100 rounded">
          <Icon size={16} className="text-emerald-700" />
        </div>
        <span className="text-xs text-slate-400 uppercase tracking-wider">Total</span>
      </div>
      
      <p className="text-xs text-slate-500 mb-0.5">{label}</p>
      <p className="text-lg font-bold text-slate-900 mb-0.5">{value}</p>
      <p className="text-xs text-slate-400">{sublabel}</p>
    </div>
  );
};

// Main Component
export default function ModernFeesPage() {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [documentData, setDocumentData] = useState(null);
  const [selectedFeeItem, setSelectedFeeItem] = useState(null);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [activeTab, setActiveTab] = useState('boarding');
  const [searchTerm, setSearchTerm] = useState('');

  // Tabs configuration
  const tabs = [
    { id: 'boarding', name: 'Boarders', icon: IoBedOutline },
    { id: 'admission', name: 'Admission', icon: MdOutlineAdUnits }
  ];

  const router = useRouter();

  // Fetch document data
  const fetchDocuments = async (showRefresh = false) => {
    if (showRefresh) setRefreshing(true);
    
    try {
      const response = await fetch('/api/schooldocuments');
      const data = await response.json();
      
      if (data.success) {
        setDocumentData(data.document);
        if (showRefresh) toast.success('Fees data refreshed!');
      } else {
        throw new Error(data.error || 'Failed to load fees data');
      }
    } catch (error) {
      console.error('Error fetching documents:', error);
      toast.error('Failed to load fees information');
    } finally {
      if (showRefresh) setRefreshing(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  // Get current fee items based on active tab
  const getCurrentFeeItems = () => {
    if (!documentData) return [];
    
    switch(activeTab) {
      case 'boarding':
        return documentData.feesBoardingDistributionJson || [];
      case 'admission':
        return documentData.admissionFeeDistribution || [];
      default:
        return [];
    }
  };

  // Get total amount for current tab
  const getCurrentTotal = () => {
    const items = getCurrentFeeItems();
    return items.reduce((sum, item) => sum + (item.amount || 0), 0);
  };

  // Get PDF info for current tab
  const getCurrentPDFInfo = () => {
    if (!documentData) return null;
    
    switch(activeTab) {
      case 'boarding':
        return {
          url: documentData.feesBoardingDistributionPdf,
          name: documentData.feesBoardingPdfName,
          size: documentData.feesBoardingPdfSize,
          date: documentData.feesBoardingPdfUploadDate,
          description: documentData.feesBoardingDescription
        };
      case 'admission':
        return {
          url: documentData.admissionFeePdf,
          name: documentData.admissionFeePdfName,
          size: documentData.admissionFeePdfSize,
          date: documentData.admissionFeePdfUploadDate,
          description: documentData.admissionFeeDescription
        };
      default:
        return null;
    }
  };

  // Filter fee items based on search
  const filteredItems = getCurrentFeeItems().filter(item => {
    return searchTerm === '' || 
      item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Handle PDF download
  const handleDownloadPDF = (url, fileName) => {
    if (!url) {
      toast.error('PDF not available');
      return;
    }
    
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName || 'fee-structure.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Download started');
  };

  // Handle PDF view
  const handleViewPDF = (url) => {
    if (!url) {
      toast.error('PDF not available');
      return;
    }
    window.open(url, '_blank');
  };

  // Handle refresh
  const refreshData = () => {
    fetchDocuments(true);
  };

  // Calculate unique categories
  const getUniqueCategories = () => {
    const items = getCurrentFeeItems();
    const categories = new Set(items.map(item => {
      if (item.name?.includes('Tuition')) return 'Tuition';
      if (item.name?.includes('Boarding')) return 'Boarding';
      if (item.name?.includes('Uniform')) return 'Uniform';
      if (item.name?.includes('Books')) return 'Books';
      if (item.name?.includes('Medical')) return 'Medical';
      return 'Other';
    }));
    return categories.size;
  };

  // Format last updated date
  const getLastUpdated = () => {
    if (!documentData?.updatedAt) return 'Today';
    try {
      const date = new Date(documentData.updatedAt);
      const diff = Math.floor((new Date() - date) / (1000 * 60 * 60 * 24));
      if (diff === 0) return 'Today';
      if (diff === 1) return 'Yesterday';
      if (diff < 7) return `${diff} days ago`;
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    } catch {
      return 'Today';
    }
  };

  // Loading state
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
                <p className="text-slate-600 font-medium text-sm">Loading fee structure...</p>
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

  const pdfInfo = getCurrentPDFInfo();
  const currentItems = getCurrentFeeItems();
  const totalAmount = getCurrentTotal();

  // Banner stats
  const bannerStats = {
    totalItems: filteredItems.length,
    totalAmount: totalAmount.toLocaleString(),
    categories: getUniqueCategories(),
    pdfAvailable: pdfInfo?.url ? 'YES' : 'NO',
    lastUpdated: getLastUpdated(),
    refreshing: refreshing
  };

  return (
    <div className="min-h-screen bg-white">
      <Toaster position="top-right" richColors />

      {/* Modern Hero Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        <ModernHeroBanner stats={bannerStats} onRefresh={refreshData} />
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200 sticky top-0 z-30 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex gap-1 overflow-x-auto pb-0.5 no-scrollbar">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setSearchTerm('');
                  }}
                  className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                    isActive
                      ? 'border-emerald-600 text-emerald-700'
                      : 'border-transparent text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <Icon size={16} />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder={`Search ${activeTab} fees...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-10 py-3 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 bg-slate-100 rounded hover:bg-slate-200 transition-colors"
              >
                <FiX size={14} className="text-slate-500" />
              </button>
            )}
          </div>
        </div>

        {/* Main Content - Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Fee Items */}
          <div className="lg:col-span-2">
            <div className="space-y-3">
              {filteredItems.length === 0 ? (
                <div className="bg-white border border-dashed border-slate-200 rounded-lg p-8 text-center">
                  <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <FiDollarSign className="text-slate-400 text-xl" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">No fee items found</h3>
                  <p className="text-sm text-slate-500 mt-1 mb-4">Try adjusting your search.</p>
                  <button
                    onClick={() => setSearchTerm('')}
                    className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors"
                  >
                    Clear Search
                  </button>
                </div>
              ) : (
                filteredItems.map((item, index) => (
                  <ModernFeeCard
                    key={item.id || index}
                    item={item}
                    index={index}
                    onInfo={(item) => {
                      setSelectedFeeItem(item);
                      setShowInfoModal(true);
                    }}
                  />
                ))
              )}
            </div>
          </div>

          {/* Right Column - Info & Documents */}
          <div className="space-y-4">
            {/* PDF Card */}
            {pdfInfo?.url ? (
              <ModernPDFCard
                title={`${tabs.find(t => t.id === activeTab)?.name} Fee Structure`}
                pdfUrl={pdfInfo.url}
                fileName={pdfInfo.name}
                fileSize={pdfInfo.size}
                uploadDate={pdfInfo.date}
                description={pdfInfo.description}
                onDownload={handleDownloadPDF}
                onView={handleViewPDF}
              />
            ) : (
              <div className="bg-white border border-dashed border-slate-200 rounded-lg p-6 text-center">
                <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <IoDocumentTextOutline className="text-slate-400 text-lg" />
                </div>
                <p className="text-sm font-medium text-slate-600">No PDF Available</p>
                <p className="text-xs text-slate-400 mt-1">Check back later</p>
              </div>
            )}

            {/* School Info Card */}
            <div className="bg-white border border-slate-200 rounded-lg p-5 hover:shadow-md transition-shadow">
              <h3 className="font-bold text-slate-900 text-base mb-4 flex items-center gap-2">
                <FaUniversity className="text-emerald-600" />
                Payment Information
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <FaUniversity className="text-emerald-600 w-4 h-4 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-slate-500 font-medium">Bank Account</p>
                    <p className="text-sm font-bold text-slate-900">1234567890 - Equity Bank</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <IoCardOutline className="text-emerald-600 w-4 h-4 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-slate-500 font-medium">Paybill</p>
                    <p className="text-sm font-bold text-slate-900">522522 - Account: Student ID</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <FaPhone className="text-emerald-600 w-4 h-4 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-slate-500 font-medium">Finance Office</p>
                    <p className="text-sm font-bold text-slate-900">+254 712 345 678</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-100">
                <p className="text-xs text-slate-500 italic flex items-center gap-1">
                  <FaLeaf className="text-emerald-600" size={10} />
                  "Strive to Excel"
                </p>
              </div>
            </div>

            {/* Contact Card */}
            <div className="bg-gradient-to-br from-emerald-800 to-teal-700 rounded-lg p-5 text-white hover:shadow-lg transition-shadow">
              <h3 className="font-bold text-base mb-2">Need Help?</h3>
              <p className="text-sm text-emerald-100 mb-4">
                Contact our finance office for payment assistance
              </p>
              <div className="space-y-2 mb-4">
                <a href="tel:+254712345678" className="flex items-center gap-2 text-sm text-emerald-100 hover:text-white transition-colors">
                  <FaPhone size={12} />
                  <span>+254 712 345 678</span>
                </a>
                <a href="mailto:finance@matungulugirls.sc.ke" className="flex items-center gap-2 text-sm text-emerald-100 hover:text-white transition-colors">
                  <FaEnvelope size={12} />
                  <span>finance@matungulugirls.sc.ke</span>
                </a>
              </div>
              <button 
                onClick={() => router.push("/pages/contact")}
                className="w-full py-3 bg-white text-emerald-800 rounded-lg font-medium text-sm flex items-center justify-center gap-2 hover:bg-emerald-50 transition-colors"
              >
                <FiArrowRight size={16} />
                Contact Bursar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Info Modal */}
      {showInfoModal && selectedFeeItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-900">{selectedFeeItem.name}</h3>
              <button
                onClick={() => setShowInfoModal(false)}
                className="p-1.5 bg-slate-100 rounded hover:bg-slate-200 transition-colors"
              >
                <IoClose size={16} className="text-slate-600" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-100">
                <p className="text-sm text-slate-700">{selectedFeeItem.description || 'No description available'}</p>
              </div>

              <div className="flex justify-between items-center p-4 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-sm font-medium text-slate-600">Amount</span>
                <span className="text-xl font-bold text-emerald-700">
                  KSh {selectedFeeItem.amount?.toLocaleString()}
                </span>
              </div>

              {selectedFeeItem.optional && (
                <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                  <p className="text-sm font-medium text-amber-700">This fee is optional</p>
                </div>
              )}
              {selectedFeeItem.admissionOnly && (
                <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                  <p className="text-sm font-medium text-purple-700">One-time payment (admission only)</p>
                </div>
              )}
              {selectedFeeItem.boardingOnly && (
                <div className="p-3 bg-teal-50 rounded-lg border border-teal-200">
                  <p className="text-sm font-medium text-teal-700">Applicable to boarders only</p>
                </div>
              )}
            </div>

            <button
              onClick={() => setShowInfoModal(false)}
              className="w-full mt-6 py-3 bg-emerald-700 text-white rounded-lg font-medium hover:bg-emerald-800 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
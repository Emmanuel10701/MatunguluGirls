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
  FiShare2
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
    <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
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
            className="p-1.5 bg-slate-100 rounded text-slate-600"
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
    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg p-4">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-white rounded-lg shadow-sm flex items-center justify-center">
          <IoDocumentTextOutline className="text-emerald-700 text-xl" />
        </div>
        
        <div className="flex-1">
          <h4 className="font-bold text-slate-900 text-sm mb-1">{title}</h4>
          {description && (
            <p className="text-xs text-slate-600 mb-2">{description}</p>
          )}
          
          <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
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
              className="flex-1 py-2 bg-white text-emerald-700 rounded-lg text-xs font-medium flex items-center justify-center gap-1 border border-emerald-200"
            >
              <IoEyeOutline size={14} />
              Preview
            </button>
            <button
              onClick={() => onDownload(pdfUrl, fileName)}
              className="w-8 h-8 bg-emerald-700 text-white rounded-lg flex items-center justify-center"
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
    <div className="bg-white border border-slate-200 rounded-lg p-4">
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

  return (
    <div className="min-h-screen bg-white">
      <Toaster position="top-right" richColors />

      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                <IoSchoolOutline className="text-emerald-700 w-5 h-5" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-900">Fee Structure</h1>
                <p className="text-xs text-slate-500">Matungulu Girls High School</p>
              </div>
            </div>
            
            <button
              onClick={refreshData}
              disabled={refreshing}
              className="px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg text-sm font-medium border border-emerald-200 flex items-center gap-2"
            >
              {refreshing ? (
                <>
                  <CircularProgress size={16} thickness={5} sx={{ color: "#059669" }} />
                  <span>Refreshing...</span>
                </>
              ) : (
                <>
                  <FiDownload size={14} />
                  <span>Refresh</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 border-t border-slate-100">
          <div className="flex gap-1">
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
                  className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 ${
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Quick Stats Row */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white border border-slate-200 rounded-lg p-4">
            <p className="text-xs text-slate-500 mb-1">Total Items</p>
            <p className="text-xl font-bold text-slate-900">{filteredItems.length}</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-lg p-4">
            <p className="text-xs text-slate-500 mb-1">Total Amount</p>
            <p className="text-xl font-bold text-emerald-700">KSh {totalAmount.toLocaleString()}</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-lg p-4">
            <p className="text-xs text-slate-500 mb-1">PDF Available</p>
            <p className="text-xl font-bold text-slate-900">{pdfInfo?.url ? 'Yes' : 'No'}</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder={`Search ${activeTab} fees...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 bg-slate-100 rounded"
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
                  <p className="text-sm text-slate-500 mt-1">Try adjusting your search.</p>
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
            <div className="bg-white border border-slate-200 rounded-lg p-5">
              <h3 className="font-bold text-slate-900 text-sm mb-4">Payment Information</h3>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <FaUniversity className="text-emerald-600 w-4 h-4" />
                  <div>
                    <p className="text-xs text-slate-500">Bank Account</p>
                    <p className="text-sm font-medium text-slate-900">1234567890 - Equity Bank</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <IoCardOutline className="text-emerald-600 w-4 h-4" />
                  <div>
                    <p className="text-xs text-slate-500">Paybill</p>
                    <p className="text-sm font-medium text-slate-900">522522 - Account: Student ID</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <FaPhone className="text-emerald-600 w-4 h-4" />
                  <div>
                    <p className="text-xs text-slate-500">Finance Office</p>
                    <p className="text-sm font-medium text-slate-900">+254 712 345 678</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-100">
                <p className="text-xs text-slate-500 italic">
                  "Strive to Excel"
                </p>
              </div>
            </div>

            {/* Contact Card */}
            <div className="bg-emerald-800 rounded-lg p-5 text-white">
              <h3 className="font-bold text-base mb-1">Need Help?</h3>
              <p className="text-sm text-emerald-100 mb-4">
                Contact our finance office for payment assistance
              </p>
              <button 
                onClick={() => router.push("/pages/contact")}
                className="w-full py-3 bg-white text-emerald-800 rounded-lg font-medium text-sm flex items-center justify-center gap-2"
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
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-900">{selectedFeeItem.name}</h3>
              <button
                onClick={() => setShowInfoModal(false)}
                className="p-1.5 bg-slate-100 rounded"
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
            </div>

            <button
              onClick={() => setShowInfoModal(false)}
              className="w-full mt-6 py-3 bg-emerald-700 text-white rounded-lg font-medium"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
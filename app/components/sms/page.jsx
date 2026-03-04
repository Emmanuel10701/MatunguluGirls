"use client";
import { useState, useEffect, useMemo, useCallback } from "react";
import { Toaster, toast } from "sonner";
import {
  Smartphone,
  Send,
  Edit,
  Trash2,
  Search,
  Filter,
  X,
  Loader2,
  Clock,
  CheckCircle2,
  XCircle,
  BarChart3,
  Users,
  RefreshCw,
  GraduationCap,
  ShieldCheck,
  AlertCircle,
  Info,
  ChevronDown,
  ChevronUp,
  Plus,
  Save,
  Eye,
  Zap,
  Calendar,
  FileText,
  UserCheck,
  Square,
  CheckSquare,
  ChevronRight,
  ChevronLeft,
  CreditCard,
  AlertTriangle,
  Mail,
  DollarSign,
} from "lucide-react";



import {FiFileText, FiClock, FiRefreshCw, FiRefreshCcw } from 'react-icons/fi';
// Modern Scrollbar Styles
const modernScrollbarStyles = `
  .modern-scrollbar::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  .modern-scrollbar::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.05);
    border-radius: 10px;
  }
  .modern-scrollbar::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 10px;
  }
  .modern-scrollbar::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
  }
`;

// Confirmation Modal Component
const ConfirmationModal = ({ open, onClose, title, message, confirmText = "Delete", cancelText = "Cancel", onConfirm, isDanger = true, loading = false }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl animate-in zoom-in-95 duration-300 w-full max-w-md">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className={`p-2 rounded-xl ${isDanger ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600"}`}>
              <AlertCircle className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">{title}</h3>
          </div>
          <p className="text-gray-600 mb-6">{message}</p>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50"
              disabled={loading}
            >
              {cancelText}
            </button>
            <button
              onClick={onConfirm}
              className={`flex-1 px-4 py-2.5 text-white rounded-xl font-medium transition-all ${
                isDanger
                  ? "bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700"
                  : "bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700"
              }`}
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Sending...
                </span>
              ) : (
                confirmText
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Modern Modal Component
const ModernModal = ({ children, open, onClose, maxWidth = "800px" }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <style>{modernScrollbarStyles}</style>
      <div
        className="bg-white rounded-2xl shadow-2xl animate-in zoom-in-95 duration-300 overflow-hidden"
        style={{
          width: "85%",
          maxWidth: maxWidth,
          maxHeight: "85vh",
          background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
        }}
      >
        {children}
      </div>
    </div>
  );
};

// Helper: get recipient group label
const getRecipientGroupLabel = (group) => {
  const labels = {
    all: "All",
    parents: "Parents",
    teachers: "Teachers",
    administration: "Admin",
    bom: "BOM",
    support: "Support",
    staff: "Staff",
  };
  return labels[group] || group;
};

// Balance Checker Component
const BalanceChecker = ({ onBalanceCheck, initialBalance = null }) => {
  const [balance, setBalance] = useState(initialBalance);
  const [loading, setLoading] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const checkBalance = async () => {
    try {
      setLoading(true);
      const adminToken = localStorage.getItem("admin_token");
      const deviceToken = localStorage.getItem("device_token");

      const response = await fetch("/api/sms?balance=true", {
        headers: {
          Authorization: `Bearer ${adminToken}`,
          "x-device-token": deviceToken,
        },
      });

      const data = await response.json();
      
      if (data.success) {
        setBalance(data);
        if (onBalanceCheck) onBalanceCheck(data);
        
        if (!data.canSend) {
          toast.custom((t) => (
            <div className="bg-white rounded-2xl shadow-2xl border-l-4 border-amber-500 overflow-hidden w-96">
              <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-3">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-white" />
                  <h3 className="font-bold text-white">⚠️ Low Credit Warning</h3>
                </div>
              </div>
              <div className="p-4">
                <p className="text-gray-700 mb-3">
                  Current balance: <span className="font-bold text-amber-600">{data.balance} credits</span>
                </p>
                <p className="text-sm text-gray-900 mb-4">
                  You need at least 1 credit per SMS. Please top up to send campaigns.
                </p>
                <h4 className="text-sm text-gray-900 mb-4">
                  Contact support at <a href="tel:+254700000000" className="text-amber-800 font-bold hover:text-amber-800">+254 700 000 000</a> or top up via the link below.
                </h4>
                <div className="flex gap-2">
                  <a
                    href="https://celcomafrica.com/till-paybill-sms"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-xl text-sm font-bold hover:from-amber-600 hover:to-orange-600 transition-all text-center"
                  >
                    Top Up Now
                  </a>
                  <button
                    onClick={() => toast.dismiss(t)}
                    className="px-4 py-2 border border-gray-300 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          ), { duration: 10000 });
        }
      }
    } catch (error) {
      console.error("Balance check failed:", error);
      toast.error("Failed to check balance");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkBalance();
    const interval = setInterval(checkBalance, 300000); // Check every 5 minutes
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
<button
  onClick={checkBalance}
  disabled={loading}
  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all shadow-lg hover:shadow-xl disabled:opacity-50 ${
    balance?.canSend 
      ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white hover:from-emerald-600 hover:to-green-700' 
      : 'bg-gradient-to-r from-amber-500 to-orange-600 text-white hover:from-amber-600 hover:to-orange-700'
  } ${!balance?.canSend && !loading ? 'animate-pulse' : ''}`}
>
  {loading ? (
    <div className="flex items-center gap-2">
      <Loader2 className="w-4 h-4 animate-spin" />
      <span className="text-sm font-medium">Refreshing...</span>
    </div>
  ) : (
    <>
      <CreditCard className="w-4 h-4" />
      <span className="text-sm font-bold">Credits:</span>
      <span className={`text-lg font-black ${balance?.canSend ? 'text-white' : 'text-yellow-100'}`}>
        {balance?.balance?.toFixed(2) || '0.00'}
      </span>
    </>
  )}
</button>

      {balance && !balance.canSend && showDetails && (
        <div className="absolute top-full right-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border-2 border-amber-200 p-4 z-50 animate-in slide-in-from-top-2">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-amber-100 rounded-lg">
              <DollarSign className="w-5 h-5 text-amber-600" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-gray-900 mb-1">Insufficient Credit</h4>
              <p className="text-sm text-gray-600 mb-2">
                Current: {balance.balance} credits<br />
                Required: 1 credit per SMS
              </p>
              <h4>
                call them on <a href="tel:+254700000000" className="text-amber-600 font-bold hover:text-amber-800">+254 700 000 000</a> or top up via the link below.
              </h4>
              <a
                href="https://celcomafrica.com/till-paybill-sms"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm font-semibold text-amber-600 hover:text-amber-800"
              >
                Top Up Now
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Update the SmsCampaignCard component to properly handle both statuses

const SmsCampaignCard = ({
  campaign,
  isSelected,
  onSelect,
  onView,
  onEdit,
  onSend,
  onDelete,
  loadingStates = {},
}) => {
  // Safely get recipient count
  const recipientCount = campaign.recipients ? campaign.recipients.split(",").length : 0;

  const getStatusBadge = (status) => {
    if (status === "sent") {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-sm">
          <CheckCircle2 className="w-3.5 h-3.5" />
          Sent
        </span>
      );
    }
    // This handles both "draft" and any other status as draft
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-amber-50 text-amber-700 border border-amber-200 shadow-sm">
        <Clock className="w-3.5 h-3.5" />
        Draft
      </span>
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return "N/A";
    }
  };

  return (
    <div
      className={`group relative w-full rounded-2xl border-2 transition-all duration-300 overflow-hidden ${
        isSelected
          ? "border-blue-600 bg-blue-50/40 shadow-xl shadow-blue-200 ring-2 ring-blue-500/20"
          : campaign.lowCreditSaved
          ? "border-amber-400 bg-amber-50/20 shadow-lg shadow-amber-100 hover:border-amber-500"
          : campaign.status === "sent"
          ? "border-emerald-400 bg-white shadow-lg shadow-slate-200 hover:border-emerald-500"
          : "border-blue-400 bg-white shadow-lg shadow-slate-200 hover:border-blue-500"
      }`}
    >
      <div className={`absolute top-0 left-0 w-1.5 h-full ${
        campaign.status === "sent" 
          ? "bg-emerald-500" 
          : campaign.lowCreditSaved 
          ? "bg-amber-500" 
          : "bg-amber-500"
      }`} />

      <div className="p-4 md:p-6">
        <div className="flex flex-col lg:flex-row items-start gap-5">
          {/* Checkbox and Icon */}
          <div className="flex items-center lg:flex-col gap-4 w-full lg:w-auto pb-4 lg:pb-0 border-b lg:border-b-0 border-slate-100">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelect(campaign.id);
              }}
              className="p-1 hover:scale-110 transition-transform flex-shrink-0"
            >
              {isSelected ? (
                <CheckSquare className="w-6 h-6 text-blue-600" />
              ) : (
                <Square className="w-6 h-6 text-slate-300" />
              )}
            </button>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg transform lg:-rotate-3 group-hover:rotate-0 transition-all duration-500 ${
              campaign.lowCreditSaved ? 'bg-amber-600' : 
              campaign.status === "sent" ? 'bg-emerald-600' : 'bg-slate-900'
            }`}>
              <Smartphone className="text-white w-6 h-6" />
            </div>
            <div className="lg:hidden ml-auto flex items-center gap-2">
              {getStatusBadge(campaign.status)}
              {campaign.lowCreditSaved && (
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700 border border-amber-300">
                  <AlertCircle className="w-3 h-3" />
                  Low Credit
                </span>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0 w-full">
            <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
              <div className="min-w-0 flex-1">
                <h4 className="text-xl font-black text-slate-900 truncate tracking-tight mb-1">
                  {campaign.title || "Untitled Campaign"}
                </h4>
                <div className="flex items-center gap-2 text-slate-600">
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest bg-slate-50 px-1.5 py-0.5 rounded">
                    Message
                  </span>
                  <p className="font-semibold truncate text-sm sm:text-base">
                    {campaign.message?.substring(0, 50)}
                    {campaign.message?.length > 50 ? "..." : ""}
                  </p>
                </div>
              </div>
              <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
                {getStatusBadge(campaign.status)}
                {campaign.lowCreditSaved && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700 border border-amber-300">
                    <AlertCircle className="w-3 h-3" />
                    Low Credit
                  </span>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-5">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex flex-col justify-center">
                <span className="text-[10px] uppercase font-bold text-slate-400 mb-1">Recipients</span>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-black text-slate-800">{recipientCount}</span>
                  <span className="text-[10px] text-slate-400 font-medium">Numbers</span>
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex flex-col justify-center">
                <span className="text-[10px] uppercase font-bold text-slate-400 mb-1">Target Group</span>
                <span className="inline-flex items-center justify-center px-3 py-1 rounded-lg text-[11px] font-bold uppercase tracking-tight bg-slate-100 text-slate-700 border border-slate-200 min-w-[70px] shadow-inner">
                  {getRecipientGroupLabel(campaign.recipientType)}
                </span>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 col-span-2 md:col-span-1 flex items-center justify-between md:block">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 mb-1">
                    {campaign.status === "sent" ? "Sent Date" : "Created Date"}
                  </span>
                  <div className="flex items-center gap-2 text-slate-800 font-bold text-sm">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    {formatDate(campaign.status === "sent" ? campaign.sentAt : campaign.createdAt)}
                  </div>
                </div>
              </div>
            </div>

            {/* Message Preview */}
            <div className="mb-6">
              <div className="bg-slate-50/80 p-4 rounded-xl border border-slate-100 relative group/preview">
                <p className="text-sm text-slate-600 leading-relaxed line-clamp-2 font-medium italic">
                  "{campaign.message || 'No message preview'}"
                </p>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-50/50 to-transparent opacity-0 group-hover/preview:opacity-100 transition-opacity" />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-2 pt-5 border-t border-slate-100">
              <div className="flex flex-wrap flex-1 gap-2">
                <button
                  onClick={() => onView(campaign)}
                  className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-bold text-slate-700 bg-white border-2 border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all active:scale-95 shadow-sm"
                >
                  <Eye className="w-4 h-4" /> View
                </button>

                {campaign.status === "draft" && (
                  <button
                    onClick={() => onEdit(campaign)}
                    className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-bold text-indigo-700 bg-indigo-50 border-2 border-indigo-100 rounded-xl hover:bg-indigo-100 hover:border-indigo-200 transition-all active:scale-95 shadow-sm"
                  >
                    <Edit className="w-4 h-4" /> Edit
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto pt-2 sm:pt-0">
                {campaign.status === "draft" && (
                  <button
                    onClick={() => onSend(campaign)}
                    disabled={loadingStates.send}
                    className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-black text-white rounded-xl transition-all active:scale-95 shadow-md ${
                      campaign.lowCreditSaved
                        ? 'bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700'
                        : 'bg-blue-600 hover:bg-blue-700 shadow-blue-200'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    <Send className={`w-4 h-4 ${loadingStates.send ? "animate-pulse" : ""}`} />
                    {loadingStates.send ? "Sending..." : campaign.lowCreditSaved ? "Retry Send" : "Send Now"}
                  </button>
                )}
                <button
                  onClick={() => onDelete(campaign)}
                  className="p-3 text-rose-500 bg-rose-50 border-2 border-rose-100 rounded-xl hover:bg-rose-500 hover:text-white hover:border-rose-500 transition-all active:scale-95 shadow-sm"
                  title="Delete Campaign"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Component
export default function SMSManager() {
  const [campaigns, setCampaigns] = useState([]);
  const [students, setStudents] = useState([]);
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [balance, setBalance] = useState(null);

  // View States
  const [activeView, setActiveView] = useState("all");
  const [selectedCampaigns, setSelectedCampaigns] = useState(new Set());
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Modal States
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showBulkDeleteModal, setShowBulkDeleteModal] = useState(false);
  const [campaignToDelete, setCampaignToDelete] = useState(null);
  const [showSendConfirmationModal, setShowSendConfirmationModal] = useState(false);
  const [campaignToSend, setCampaignToSend] = useState(null);

  // Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterRecipientType, setFilterRecipientType] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  // Campaign Form State
  const [campaignForm, setCampaignForm] = useState({
    title: "",
    message: "",
    recipientType: "all",
    status: "draft",
    recipients: [],
  });

  // Loading States
  const [loadingStates, setLoadingStates] = useState({
    create: false,
    send: false,
    delete: false,
    bulk: false,
    fetching: false,
  });

  // Stats
  const [stats, setStats] = useState({
    total: 0,
    draft: 0,
    sent: 0,
    totalRecipients: 0,
    successRate: 0,
    lowCreditDrafts: 0,
  });

  // ========== Helper Functions ==========

  const getRecipientNumbers = useCallback(
    (recipientType) => {
      const getPhoneList = (list, field) =>
        list
          .filter((item) => item && item[field] && typeof item[field] === "string" && item[field].trim() !== "")
          .map((item) => item[field].trim());

      const safeStudents = Array.isArray(students) ? students : [];
      const safeStaff = Array.isArray(staff) ? staff : [];

      const parentPhones = getPhoneList(safeStudents, "parentPhone");
      const staffPhones = getPhoneList(safeStaff, "phone");

      switch (recipientType) {
        case "parents":
          return parentPhones;
        case "teachers":
          const teachers = safeStaff.filter(
            (s) => s.role === "Teacher" || ["Sciences", "Mathematics", "Languages", "Humanities", "Sports"].includes(s.department)
          );
          return getPhoneList(teachers, "phone");
        case "administration":
          const admins = safeStaff.filter(
            (s) => s.role === "Principal" || s.role === "Deputy Principal" || s.department === "Administration"
          );
          return getPhoneList(admins, "phone");
        case "bom":
          const bom = safeStaff.filter((s) => s.role === "BOM Member" || (s.position && s.position.toLowerCase().includes("board")));
          return getPhoneList(bom, "phone");
        case "support":
          const support = safeStaff.filter((s) => s.role === "Support Staff" || s.role === "Librarian" || s.role === "Counselor");
          return getPhoneList(support, "phone");
        case "staff":
          return staffPhones;
        case "all":
        default:
          return [...new Set([...parentPhones, ...staffPhones])];
      }
    },
    [students, staff]
  );

// ========== Phone Number Normalization Function ==========
const normalizePhoneNumber = (phone) => {
  if (!phone || typeof phone !== 'string') return null;
  
  // Remove all non-digit characters (spaces, dashes, plus signs, etc.)
  const cleaned = phone.replace(/\D/g, '');
  
  // Handle different valid Kenyan phone number formats
  
  // Case 1: Already in 07XXXXXXXX format (10 digits starting with 07)
  if (cleaned.length === 10 && cleaned.startsWith('07')) {
    return cleaned; // Valid 07 format
  }
  
  // Case 2: 254XXXXXXXXX format (12 digits starting with 254)
  if (cleaned.length === 12 && cleaned.startsWith('254')) {
    return '0' + cleaned.slice(3); // Convert 2547... to 07...
  }
  
  // Case 3: 7XXXXXXXX format (9 digits starting with 7 - missing leading 0)
  if (cleaned.length === 9 && cleaned.startsWith('7')) {
    return '0' + cleaned; // Add leading 0
  }
  
  // Case 4: 254 with plus sign already removed, but check if it's actually 13 digits (unlikely)
  if (cleaned.length === 13 && cleaned.startsWith('254')) {
    return '0' + cleaned.slice(3, 12); // Take first 12 digits only
  }
  
  // Case 5: 07 with more than 10 digits (invalid but try to salvage)
  if (cleaned.startsWith('07') && cleaned.length > 10) {
    return cleaned.slice(0, 10); // Truncate to first 10 digits
  }
  
  // Case 6: 01 format (Safaricom lines) - keep as is if valid
  if (cleaned.length === 10 && cleaned.startsWith('01')) {
    return cleaned;
  }
  
  // Case 7: 011 format (Telkom) - keep as is if valid
  if (cleaned.length === 10 && cleaned.startsWith('011')) {
    return cleaned;
  }
  
  // Invalid format
  return null;
};

// ========== Validate if phone number is valid for SMS ==========
const isValidPhoneForSMS = (phone) => {
  const normalized = normalizePhoneNumber(phone);
  if (!normalized) return false;
  
  // Must be exactly 10 digits and start with 07 or 01
  return normalized.length === 10 && (normalized.startsWith('07') || normalized.startsWith('01'));
};

// ========== Updated recipientGroups with validation ==========
const recipientGroups = useMemo(() => {
  const safeStudents = Array.isArray(students) ? students : [];
  const safeStaff = Array.isArray(staff) ? staff : [];

  // Helper to get valid phone numbers with logging for debugging
  const getValidPhones = (items, phoneField, itemName = 'unknown') => {
    return items.filter(item => {
      const phone = item[phoneField];
      if (!phone || typeof phone !== 'string' || phone.trim() === '') {
        return false;
      }
      
      const isValid = isValidPhoneForSMS(phone.trim());
      
      // Log invalid numbers for debugging (optional, can be removed in production)
      if (!isValid) {
        console.warn(`Invalid ${phoneField} format:`, {
          name: item.name || `${item.firstName} ${item.lastName}` || itemName,
          original: phone,
          normalized: normalizePhoneNumber(phone)
        });
      }
      
      return isValid;
    }).length;
  };

  // Get counts with validation
  const getParentCount = () => getValidPhones(safeStudents, 'parentPhone', 'student');
  const getStaffCount = () => getValidPhones(safeStaff, 'phone', 'staff');
  
  const getTeacherCount = () => {
    const teachers = safeStaff.filter(s => 
      s.role === "Teacher" || 
      ["Sciences", "Mathematics", "Languages", "Humanities", "Sports"].includes(s.department)
    );
    return getValidPhones(teachers, 'phone', 'teacher');
  };
  
  const getAdminCount = () => {
    const admins = safeStaff.filter(s => 
      s.role === "Principal" || 
      s.role === "Deputy Principal" || 
      s.department === "Administration"
    );
    return getValidPhones(admins, 'phone', 'admin');
  };
  
  const getBOMCount = () => {
    const bom = safeStaff.filter(s => 
      s.role === "BOM Member" || 
      (s.position && s.position.toLowerCase().includes("board"))
    );
    return getValidPhones(bom, 'phone', 'BOM');
  };
  
  const getSupportCount = () => {
    const support = safeStaff.filter(s => 
      s.role === "Support Staff" || 
      s.role === "Librarian" || 
      s.role === "Counselor"
    );
    return getValidPhones(support, 'phone', 'support');
  };

  // Calculate all counts once for performance
  const parentCount = getParentCount();
  const staffCount = getStaffCount();
  const teacherCount = getTeacherCount();
  const adminCount = getAdminCount();
  const bomCount = getBOMCount();
  const supportCount = getSupportCount();

  // Log summary for debugging
  console.log('📊 Recipient Groups Summary:', {
    parents: parentCount,
    staff: staffCount,
    teachers: teacherCount,
    admins: adminCount,
    bom: bomCount,
    support: supportCount,
    total: parentCount + staffCount
  });

  return [
    {
      value: "all",
      label: "All Recipients",
      shortLabel: "All",
      count: parentCount + staffCount,
      color: "from-blue-500 to-cyan-500",
      icon: Users,
      description: "Parents + Staff with valid phone numbers"
    },
    {
      value: "parents",
      label: "Parents & Guardians",
      shortLabel: "Parents",
      count: parentCount,
      color: "from-green-500 to-emerald-500",
      icon: Users,
      description: "Parents with valid phone numbers"
    },
    {
      value: "teachers",
      label: "Teaching Staff",
      shortLabel: "Teachers",
      count: teacherCount,
      color: "from-purple-500 to-pink-500",
      icon: GraduationCap,
      description: "Teachers with valid phone numbers"
    },
    {
      value: "administration",
      label: "Administration",
      shortLabel: "Admin",
      count: adminCount,
      color: "from-orange-500 to-amber-500",
      icon: ShieldCheck,
      description: "Admin staff with valid phone numbers"
    },
    {
      value: "bom",
      label: "Board of Management",
      shortLabel: "BOM",
      count: bomCount,
      color: "from-red-500 to-rose-500",
      icon: ShieldCheck,
      description: "BOM members with valid phone numbers"
    },
    {
      value: "support",
      label: "Support Staff",
      shortLabel: "Support",
      count: supportCount,
      color: "from-indigo-500 to-violet-500",
      icon: Users,
      description: "Support staff with valid phone numbers"
    },
    {
      value: "staff",
      label: "All School Staff",
      shortLabel: "Staff",
      count: staffCount,
      color: "from-cyan-500 to-blue-500",
      icon: Users,
      description: "All staff with valid phone numbers"
    },
  ];
}, [students, staff]);



// ========== Debug function to check all phone numbers ==========
const debugAllPhoneNumbers = useCallback(() => {
  console.group('📱 Complete Phone Numbers Debug');
  
  // Check students
  console.group('Students Parent Phones:');
  students.forEach(s => {
    if (s.parentPhone) {
      const normalized = normalizePhoneNumber(s.parentPhone);
      console.log({
        student: `${s.firstName} ${s.lastName}`,
        original: s.parentPhone,
        normalized: normalized,
        isValid: isValidPhoneForSMS(s.parentPhone)
      });
    }
  });
  console.groupEnd();
  
  // Check staff
  console.group('Staff Phones:');
  staff.forEach(s => {
    if (s.phone) {
      const normalized = normalizePhoneNumber(s.phone);
      console.log({
        name: s.name,
        role: s.role,
        original: s.phone,
        normalized: normalized,
        isValid: isValidPhoneForSMS(s.phone)
      });
    }
  });
  console.groupEnd();
  
  // Summary
  const validParentPhones = students.filter(s => isValidPhoneForSMS(s.parentPhone)).length;
  const validStaffPhones = staff.filter(s => isValidPhoneForSMS(s.phone)).length;
  
  console.log('📊 Summary:', {
    totalStudents: students.length,
    studentsWithValidPhones: validParentPhones,
    totalStaff: staff.length,
    staffWithValidPhones: validStaffPhones,
    totalValidRecipients: validParentPhones + validStaffPhones
  });
  
  console.groupEnd();
}, [students, staff]);

// Call debug when data loads
useEffect(() => {
  if (students.length > 0 || staff.length > 0) {
    debugAllPhoneNumbers();
  }
}, [students, staff, debugAllPhoneNumbers]);


  const statusOptions = [
    { value: "all", label: "All Status" },
    { value: "draft", label: "Draft", icon: Clock },
    { value: "sent", label: "Sent", icon: CheckCircle2 },
  ];

  // ========== Data Fetching ==========

  const fetchData = useCallback(async () => {
    try {
      setLoadingStates((prev) => ({ ...prev, fetching: true }));
      setRefreshing(true);

     const [campaignsRes, studentRes, staffRes] = await Promise.all([
          fetch("/api/sms?limit=1000"),
          fetch("/api/s"),
          fetch("/api/staff"),
]);

      const campaignsData = await campaignsRes.json();
      const studentData = await studentRes.json();
      const staffData = await staffRes.json();

      if (campaignsData.success) {
        const campaignsList = campaignsData.campaigns || [];
        setCampaigns(campaignsList);
        updateStats(campaignsList);
      }

      // Normalize student data
      let studentsArray = [];
      if (studentData.success && Array.isArray(studentData.data)) {
        studentsArray = studentData.data.map((student) => ({
          id: student.admissionNumber || student.id,
          firstName: student.firstName || "",
          lastName: student.lastName || "",
          parentPhone: student.parentPhone || student.phone || "",
          admissionNumber: student.admissionNumber || "",
          form: student.form || "",
          stream: student.stream || "",
        }));
      } else if (Array.isArray(studentData)) {
        studentsArray = studentData;
      } else if (Array.isArray(studentData?.data)) {
        studentsArray = studentData.data;
      } else if (Array.isArray(studentData?.students)) {
        studentsArray = studentData.students;
      }
      setStudents(studentsArray);

      // Normalize staff data
      let staffArray = [];
      if (Array.isArray(staffData)) {
        staffArray = staffData;
      } else if (Array.isArray(staffData?.staff)) {
        staffArray = staffData.staff;
      } else if (Array.isArray(staffData?.data)) {
        staffArray = staffData.data;
      }
      setStaff(staffArray);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
      setRefreshing(false);
      setLoadingStates((prev) => ({ ...prev, fetching: false }));
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
// Update the stats calculation in fetchData
const updateStats = (campaignsList) => {
  const newStats = {
    total: campaignsList.length,
    draft: campaignsList.filter(c => c.status === 'draft').length,
    sent: campaignsList.filter(c => c.status === 'sent').length,
    totalRecipients: campaignsList.reduce((sum, c) => sum + (c.recipientCount || 0), 0),
    successRate: 0,
    lowCreditDrafts: campaignsList.filter(c => c.status === 'draft' && c.lowCreditSaved).length,
  };
  
  // Calculate average success rate for sent campaigns
  const sentCampaigns = campaignsList.filter(c => c.status === 'sent');
  if (sentCampaigns.length > 0) {
    const totalSuccessRate = sentCampaigns.reduce((sum, c) => sum + (c.successRate || 0), 0);
    newStats.successRate = Math.round(totalSuccessRate / sentCampaigns.length);
  }
  
  setStats(newStats);
};

  // ========== Authentication ==========

  const getAuthHeaders = (contentType = "application/json") => {
    const adminToken = localStorage.getItem("admin_token");
    const deviceToken = localStorage.getItem("device_token");
    const adminUser = localStorage.getItem("admin_user");

    if (!adminToken || !deviceToken) {
      throw new Error("Authentication required");
    }

    const headers = {
      Authorization: `Bearer ${adminToken}`,
      "x-device-token": deviceToken,
      "x-admin-user": adminUser || "unknown",
    };
    if (contentType) {
      headers["Content-Type"] = contentType;
    }
    return headers;
  };

  const handleAuthError = (error) => {
    if (error.message.includes("Authentication") || error.message.includes("login")) {
      toast.error("Please login again");
      setTimeout(() => {
        localStorage.removeItem("admin_token");
        localStorage.removeItem("device_token");
        localStorage.removeItem("admin_user");
        window.location.href = "/pages/adminLogin";
      }, 1000);
      return true;
    }
    return false;
  };

  // ========== Filtering & Sorting ==========

  const filteredCampaigns = useMemo(() => {
    if (!Array.isArray(campaigns)) return [];
    return campaigns
      .filter((campaign) => {
        const matchesSearch =
          (campaign.title?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
          (campaign.message?.toLowerCase() || "").includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === "all" || campaign.status === filterStatus;
        const matchesRecipientType = filterRecipientType === "all" || campaign.recipientType === filterRecipientType;
        let matchesDate = true;
        if (startDate || endDate) {
          const campaignDate = new Date(campaign.sentAt || campaign.createdAt);
          if (startDate && campaignDate < new Date(startDate)) matchesDate = false;
          if (endDate && campaignDate > new Date(endDate)) matchesDate = false;
        }
        let matchesView = true;
        if (activeView === "draft") matchesView = campaign.status === "draft";
        if (activeView === "sent") matchesView = campaign.status === "sent";
        return matchesSearch && matchesStatus && matchesRecipientType && matchesDate && matchesView;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "newest":
            return new Date(b.sentAt || b.createdAt || 0) - new Date(a.sentAt || a.createdAt || 0);
          case "oldest":
            return new Date(a.sentAt || a.createdAt || 0) - new Date(b.sentAt || b.createdAt || 0);
          case "title-asc":
            return (a.title || "").localeCompare(b.title || "");
          case "title-desc":
            return (b.title || "").localeCompare(a.title || "");
          case "recipients-high":
            return (b.recipients?.split(",").length || 0) - (a.recipients?.split(",").length || 0);
          case "recipients-low":
            return (a.recipients?.split(",").length || 0) - (b.recipients?.split(",").length || 0);
          default:
            return 0;
        }
      });
  }, [campaigns, searchTerm, filterStatus, filterRecipientType, startDate, endDate, activeView, sortBy]);

  // ========== Selection ==========

  const toggleSelectAll = () => {
    if (selectedCampaigns.size === filteredCampaigns.length) {
      setSelectedCampaigns(new Set());
    } else {
      const allIds = new Set(filteredCampaigns.map((c) => c.id).filter(Boolean));
      setSelectedCampaigns(allIds);
    }
  };

  const toggleSelectCampaign = (id) => {
    if (!id) return;
    const newSet = new Set(selectedCampaigns);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedCampaigns(newSet);
  };

  // ========== Modal Openers ==========

  const openCreateModal = () => {
    setCampaignForm({
      title: "",
      message: "",
      recipientType: "all",
      status: "draft",
      recipients: [],
    });
    setSelectedCampaign(null);
    setShowCreateModal(true);
  };

  const openEditModal = (campaign) => {
    if (!campaign) return;
    setCampaignForm({
      title: campaign.title || "",
      message: campaign.message || "",
      recipientType: campaign.recipientType || "all",
      status: campaign.status || "draft",
      recipients: [],
    });
    setSelectedCampaign(campaign);
    setShowCreateModal(true);
  };

  const openDetailModal = (campaign) => {
    if (!campaign) return;
    setSelectedCampaign(campaign);
    setShowDetailModal(true);
  };

  const openDeleteModal = (campaign) => {
    if (!campaign) return;
    setCampaignToDelete(campaign);
    setShowDeleteModal(true);
  };

const openSendConfirmationModal = (campaign) => {
  if (!campaign) return;
  
  // Check balance first if available
  if (balance && !balance.canSend) {
    toast.custom((t) => (
      <div className="bg-white rounded-2xl shadow-2xl border-l-4 border-amber-500 overflow-hidden w-96">
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-white" />
            <h3 className="font-bold text-white">⚠️ Insufficient Credit</h3>
          </div>
        </div>
        <div className="p-4">
          <p className="text-gray-700 mb-3">
            Current balance: <span className="font-bold text-amber-600">{balance.balance} credits</span>
          </p>
          <p className="text-sm text-gray-600 mb-4">
            You need at least 1 credit per SMS. This campaign has {campaign.recipients?.split(",").length || 0} recipients.
          </p>
          <p className="text-sm text-gray-900 mb-4">
            Call <a href="tel:+254700000000" className="text-amber-600 font-bold">+254 700 000 000</a> or top up via the link below.
          </p>
          <div className="flex gap-2">
            <a
              href="https://celcomafrica.com/till-paybill-sms"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-xl text-sm font-bold hover:from-amber-600 hover:to-orange-600 transition-all text-center"
            >
              Top Up Now
            </a>
            <button
              onClick={() => toast.dismiss(t)}
              className="px-4 py-2 border border-gray-300 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50"
            >
              Later
            </button>
          </div>
        </div>
      </div>
    ), { duration: 10000 });
    return;
  }
  
  setCampaignToSend(campaign);
  setShowSendConfirmationModal(true);
};

  const openBulkDeleteModal = () => {
    if (selectedCampaigns.size === 0) {
      toast.error("Please select campaigns to delete");
      return;
    }
    setShowBulkDeleteModal(true);
  };

  // ========== CRUD Operations ==========

  const [isSubmitting, setIsSubmitting] = useState(false);

const handleCreateOrUpdateCampaign = async () => {
  if (isSubmitting) return;
  
  if (!campaignForm.title || !campaignForm.message) {
    toast.error("Title and message are required");
    return;
  }

  try {
    setIsSubmitting(true);
    setLoadingStates((prev) => ({ ...prev, create: true }));
    
    const headers = getAuthHeaders("application/json");
    
    const recipientNumbers = getRecipientNumbers(campaignForm.recipientType);
    
    if (recipientNumbers.length === 0) {
      toast.error("No recipients with valid phone numbers found for the selected group");
      return;
    }

    console.log(`📱 Found ${recipientNumbers.length} valid recipients`);

    // Prepare payload - send the status as is (draft or sent)
    const payload = {
      title: campaignForm.title.trim(),
      message: campaignForm.message,
      recipients: recipientNumbers.join(", "),
      recipientType: campaignForm.recipientType,
      status: campaignForm.status, // This will be 'draft' or 'sent'
    };

    const url = selectedCampaign ? `/api/sms/${selectedCampaign.id}` : "/api/sms";
    const method = selectedCampaign ? "PUT" : "POST";

    const response = await fetch(url, {
      method,
      headers,
      body: JSON.stringify(payload),
    });

    if (response.status === 401) {
      throw new Error("Session expired. Please login again.");
    }

    const result = await response.json();
    console.log("✅ API Response:", result);

    if (result.success) {
      // Refresh the campaigns list
      await fetchData();
      
      // Show appropriate message based on result
      if (result.lowCreditInfo) {
        // Low credit scenario - saved as draft
        toast.custom((t) => (
          <div className="bg-white rounded-2xl shadow-2xl border-l-4 border-amber-500 overflow-hidden w-96">
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-white" />
                <h3 className="font-bold text-white">⚠️ Low Credit - Saved as Draft</h3>
              </div>
            </div>
            <div className="p-4">
              <p className="text-gray-700 mb-2">{result.message}</p>
              <p className="text-sm text-gray-600 mb-4">
                Current balance: {result.lowCreditInfo.currentBalance} credits
              </p>
              <div className="flex gap-2">
                <a
                  href="https://celcomafrica.com/till-paybill-sms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-xl text-sm font-bold hover:from-amber-600 hover:to-orange-600 transition-all text-center"
                >
                  Top Up Now
                </a>
                <button
                  onClick={() => toast.dismiss(t)}
                  className="px-4 py-2 border border-gray-300 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        ), { duration: 10000 });
      } else if (campaignForm.status === "sent" && result.campaign.status === "sent") {
        // Successfully sent
        toast.success(
          <div>
            <p className="font-bold">✅ Campaign Sent!</p>
            <p className="text-sm">{result.smsResults?.summary?.successful || 0} messages delivered</p>
          </div>,
          { duration: 6000 }
        );
      } else {
        // Draft saved successfully
        toast.success(
          <div>
            <p className="font-bold">✅ Campaign Saved!</p>
            <p className="text-sm">Your campaign has been saved as draft</p>
          </div>,
          { duration: 4000 }
        );
      }
      
      // Close modal and reset form
      setShowCreateModal(false);
      setSelectedCampaign(null);
      setCampaignForm({
        title: "",
        message: "",
        recipientType: "all",
        status: "draft",
        recipients: [],
      });
      
    } else {
      toast.error(result.error || "Failed to save campaign");
    }
  } catch (error) {
    console.error("Error saving campaign:", error);
    if (handleAuthError(error, (type, msg) => toast.error(msg))) {
      return;
    }
    toast.error(error.message || "Network error. Please try again.");
  } finally {
    setIsSubmitting(false);
    setLoadingStates((prev) => ({ ...prev, create: false }));
  }
};

const handleSendCampaign = async () => {
  if (!campaignToSend) return;
  
  try {
    const headers = getAuthHeaders("application/json");
    setLoadingStates((prev) => ({ ...prev, send: true }));

    const response = await fetch(`/api/sms/${campaignToSend.id}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ status: "sent" }),
    });

    if (response.status === 401) throw new Error("Session expired");

    const result = await response.json();

    if (response.status === 402) {
      // Low credit detected - show custom toast
      toast.custom((t) => (
        <div className="bg-white rounded-2xl shadow-2xl border-l-4 border-amber-500 overflow-hidden w-96">
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-white" />
              <h3 className="font-bold text-white">⚠️ Insufficient Credit</h3>
            </div>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-2">{result.message}</p>
            <p className="text-sm text-gray-600 mb-4">
              Current balance: {result.balance} credits<br />
              Required: {result.requiredCredit} credit per SMS
            </p>
            <p className="text-sm text-gray-900 mb-4">
              Call <a href="tel:+254700000000" className="text-amber-600 font-bold">+254 700 000 000</a> or top up via the link below.
            </p>
            <div className="flex gap-2">
              <a
                href="https://celcomafrica.com/till-paybill-sms"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-xl text-sm font-bold hover:from-amber-600 hover:to-orange-600 transition-all text-center"
              >
                Top Up Now
              </a>
              <button
                onClick={() => toast.dismiss(t)}
                className="px-4 py-2 border border-gray-300 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      ), { duration: 10000 });
      
      // Update local state to reflect draft status
      setCampaigns((prev) =>
        prev.map((c) =>
          c.id === campaignToSend.id
            ? { ...c, status: "draft", lowCreditSaved: true }
            : c
        )
      );
    } else if (result.success) {
      // Success - campaign sent
      setCampaigns((prev) =>
        prev.map((c) =>
          c.id === campaignToSend.id
            ? {
                ...c,
                status: "sent",
                sentAt: new Date().toISOString(),
                sentCount: result.smsResults?.summary?.successful || 0,
                failedCount: result.smsResults?.summary?.failed || 0,
                lowCreditSaved: false,
              }
            : c
        )
      );
      
      const successful = result.smsResults?.summary?.successful || 0;
      const failed = result.smsResults?.summary?.failed || 0;
      const total = successful + failed;
      
      toast.success(
        <div>
          <p className="font-bold">✅ Campaign Sent!</p>
          <p className="text-sm">{successful}/{total} messages delivered</p>
          {failed > 0 && <p className="text-xs text-red-200 mt-1">{failed} failed</p>}
        </div>,
        { duration: 6000 }
      );
    } else {
      toast.error(result.error || "Failed to send campaign");
    }
    
    setShowSendConfirmationModal(false);
    setCampaignToSend(null);
    
  } catch (error) {
    console.error("Error sending campaign:", error);
    if (!handleAuthError(error, (type, msg) => toast.error(msg))) {
      toast.error(error.message || "Network error");
    }
    setShowSendConfirmationModal(false);
    setCampaignToSend(null);
  } finally {
    setLoadingStates((prev) => ({ ...prev, send: false }));
  }
};

  const handleDeleteCampaign = async () => {
    if (!campaignToDelete) return;
    try {
      const headers = getAuthHeaders("application/json");
      setLoadingStates((prev) => ({ ...prev, delete: true }));

      const response = await fetch(`/api/sms/${campaignToDelete.id}`, {
        method: "DELETE",
        headers,
      });

      if (response.status === 401) throw new Error("Session expired");

      const result = await response.json();

      if (result.success) {
        setCampaigns((prev) => prev.filter((c) => c.id !== campaignToDelete.id));
        setSelectedCampaigns((prev) => {
          const newSet = new Set(prev);
          newSet.delete(campaignToDelete.id);
          return newSet;
        });
        toast.success("Campaign deleted");
        setShowDeleteModal(false);
        setCampaignToDelete(null);
      } else {
        toast.error(result.error || "Failed to delete");
      }
    } catch (error) {
      console.error("Error:", error);
      if (!handleAuthError(error)) {
        toast.error(error.message || "Network error");
      }
    } finally {
      setLoadingStates((prev) => ({ ...prev, delete: false }));
    }
  };

  const handleBulkDelete = async () => {
    if (selectedCampaigns.size === 0) return;
    try {
      const headers = getAuthHeaders("application/json");
      setLoadingStates((prev) => ({ ...prev, bulk: true }));

      const deletePromises = Array.from(selectedCampaigns).map((id) =>
        fetch(`/api/sms/${id}`, { method: "DELETE", headers })
      );
      const results = await Promise.allSettled(deletePromises);

      const authError = results.find((r) => r.status === "fulfilled" && r.value.status === 401);
      if (authError) throw new Error("Session expired");

      const successful = results.filter((r) => r.status === "fulfilled" && r.value.ok);
      if (successful.length > 0) {
        setCampaigns((prev) => prev.filter((c) => !selectedCampaigns.has(c.id)));
        setSelectedCampaigns(new Set());
        toast.success(`${successful.length} campaign(s) deleted`);
        setShowBulkDeleteModal(false);
      } else {
        toast.error("Failed to delete campaigns");
      }
    } catch (error) {
      console.error("Error:", error);
      if (!handleAuthError(error)) {
        toast.error(error.message || "Network error");
      }
    } finally {
      setLoadingStates((prev) => ({ ...prev, bulk: false }));
    }
  };

  const resetFilters = () => {
    setSearchTerm("");
    setFilterStatus("all");
    setFilterRecipientType("all");
    setStartDate("");
    setEndDate("");
    setSortBy("newest");
    toast.info("Filters reset");
  };

  // ========== Render ==========

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-emerald-50/20 p-4 md:p-6 modern-scrollbar">
      <style>{modernScrollbarStyles}</style>
      <Toaster 
        position="top-right" 
        richColors 
        expand={true}
        toastOptions={{
          style: {
            borderRadius: '12px',
            padding: '16px',
            fontSize: '14px',
          },
        }}
      />


<div className="group relative bg-[#0F172A] rounded-xl md:rounded-[2.5rem] p-5 md:p-8 text-white overflow-hidden shadow-2xl border border-white/5 transition-all duration-500 mb-6 sm:mb-8">
  
  {/* Abstract Gradient Orbs - Cyan/Emerald Theme */}
  <div className="absolute top-[-25%] right-[-10%] w-[250px] h-[250px] md:w-[420px] md:h-[420px] bg-gradient-to-br from-cyan-600/30 via-emerald-600/20 to-transparent rounded-full blur-[100px] pointer-events-none group-hover:scale-110 transition-transform duration-700" />
  <div className="absolute bottom-[-25%] left-[-10%] w-[200px] h-[200px] md:w-[340px] md:h-[340px] bg-gradient-to-tr from-emerald-600/20 via-teal-600/10 to-transparent rounded-full blur-[80px] pointer-events-none group-hover:scale-110 transition-transform duration-700" />
  
  {/* Additional Floating Orb for Depth */}
  <div className="absolute top-[40%] right-[15%] w-[150px] h-[150px] bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-full blur-[60px] pointer-events-none animate-pulse" />
  
  {/* Subtle Grid Pattern Overlay */}
  <div className="absolute inset-0 opacity-[0.02]" style={{ 
    backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
    backgroundSize: '40px 40px'
  }} />
  
  <div className="relative z-10">
    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
      
      {/* Left Section - Brand & Title */}
      <div className="flex-1 min-w-0">
        {/* Premium Institution Badge */}
        <div className="flex items-center gap-2.5 mb-4">
          <div className="h-7 w-1 bg-gradient-to-b from-cyan-500 to-emerald-500 rounded-full shadow-[0_0_15px_rgba(6,182,212,0.5)]" />
          <div>
            <h2 className="text-[10px] font-black uppercase tracking-[0.25em] text-cyan-400">
              Matungulu Girls High School
            </h2>
            <p className="text-[9px] italic font-medium text-white/40 tracking-widest uppercase">
              "Strive to Excel"
            </p>
          </div>
        </div>
        
        {/* Title with Animated Icon */}
        <div className="flex items-start gap-4 mb-3">
          <div className="relative shrink-0">
            {/* Icon with Multi-layer Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-emerald-500 rounded-xl md:rounded-2xl blur-xl opacity-70 group-hover:opacity-100 transition-opacity" />
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-xl md:rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative p-3 md:p-4 bg-gradient-to-br from-cyan-600 to-emerald-600 rounded-xl md:rounded-2xl shadow-2xl transform group-hover:scale-105 group-hover:rotate-3 transition-all duration-500">
              <Smartphone className="text-white w-5 h-5 md:w-6 md:h-6" />
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-black tracking-tight leading-tight">
              <span className="text-white">SMS Campaign</span>
              <br className="sm:hidden" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-emerald-200 to-white ml-0 sm:ml-2">
                Manager
              </span>
            </h1>
          </div>
        </div>
        
        {/* Description with Celcom Highlight */}
        <p className="text-cyan-100/70 text-sm md:text-[15px] font-medium leading-relaxed max-w-3xl">
          Streamline school communication with powerful bulk SMS campaigns powered by{' '}
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 text-cyan-300 border border-cyan-500/20 font-bold">
            <Zap className="w-3 h-3" />
            Celcom
          </span>
          . Fast, reliable, and built for Matungulu Girls High School.
        </p>
        
        {/* Quick Stats Pills */}
        <div className="flex flex-wrap items-center gap-2 mt-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-bold text-white/80 uppercase tracking-wider">Service: Active</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
            <Mail className="w-3 h-3 text-cyan-400" />
            <span className="text-[10px] font-bold text-white/80 uppercase tracking-wider">Bulk SMS Ready</span>
          </div>
        </div>
      </div>
      
      {/* Right Section - Actions & Balance */}
      <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between lg:flex-col lg:items-end gap-4 w-full lg:w-auto">
        
        {/* Balance Checker - Enhanced */}
        <div className="w-full lg:w-auto order-2 lg:order-1">
          <BalanceChecker onBalanceCheck={setBalance} />
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-col xs:flex-row gap-3 w-full lg:w-auto order-1 lg:order-2">
          
          {/* Refresh Button - Glass Effect with Loading */}
          <button
            onClick={fetchData}
            disabled={refreshing || loadingStates.fetching}
            className="group/btn relative overflow-hidden flex items-center justify-center gap-2.5 bg-white/10 backdrop-blur-xl border border-white/20 px-5 py-3 rounded-xl font-bold text-sm tracking-wide transition-all hover:bg-white/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed w-full xs:w-auto min-w-[120px]"
          >
            {/* Button Shine Effect */}
            <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            
            {refreshing || loadingStates.fetching ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span className="text-white/90">Refreshing</span>
              </>
            ) : (
              <>
                <FiRefreshCw className="text-base text-white/80 group-hover/btn:rotate-180 transition-transform duration-500" />
                <span className="text-white/90">Refresh</span>
              </>
            )}
            
            {/* Live Badge */}
            <span className="hidden sm:inline-block ml-1 px-1.5 py-0.5 rounded-md bg-white/10 text-[9px] font-black text-white/60 border border-white/10">
              LIVE
            </span>
          </button>
          
          {/* New Campaign Button - Gradient Primary */}
          <button
            onClick={openCreateModal}
            className="group/btn relative overflow-hidden flex items-center justify-center gap-2.5 px-6 py-3 bg-gradient-to-r from-cyan-600 to-emerald-600 hover:from-cyan-700 hover:to-emerald-700 text-white rounded-xl font-bold text-sm tracking-wide transition-all active:scale-95 shadow-[0_8px_20px_rgba(6,182,212,0.3)] hover:shadow-[0_12px_30px_rgba(6,182,212,0.4)] w-full xs:w-auto"
          >
            {/* Button Shine Effect */}
            <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            
            <Plus className="w-4 h-4 group-hover/btn:rotate-90 transition-transform duration-300" />
            <span className="whitespace-nowrap">New Campaign</span>
            
            {/* Pulse Indicator */}
            <span className="relative flex h-2 w-2 ml-1">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
          </button>
        </div>
      </div>
    </div>
    
    {/* Enhanced Status Bar with Real-time Info */}
    <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center gap-4 sm:gap-6 text-[10px] font-bold uppercase tracking-wider">
      
      {/* System Status */}
      <div className="flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-white/40">System:</span>
        <span className="text-emerald-400">Operational</span>
      </div>
      
      {/* Celcom Integration */}
      <div className="flex items-center gap-2">
        <Zap className="w-3 h-3 text-cyan-400" />
        <span className="text-white/40">Provider:</span>
        <span className="text-cyan-400">Celcom</span>
      </div>
      
      {/* FIXED: Balance Indicator - Now accessing balance.balance instead of balance object */}
      {balance && (
        <div className="flex items-center gap-2">
          <DollarSign className="w-3 h-3 text-emerald-400" />
          <span className="text-white/40">Balance:</span>
          <span className="text-emerald-400 font-black">
            {balance.balance?.toFixed(2) || '0.00'}
          </span>
        </div>
      )}
      
      {/* Last Updated - Dynamic */}
      <div className="flex items-center gap-2 ml-auto">
        <FiClock className="w-3 h-3 text-white/30" />
        <span className="text-white/40">
          Updated: {new Date().toLocaleTimeString()}
        </span>
      </div>
    </div>
  </div>
</div>
      {/* View Toggle */}
      <div className="mb-8 space-y-6">
        <div className="inline-flex p-1.5 bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-200/60 shadow-sm overflow-x-auto max-w-full no-scrollbar">
          <div className="flex items-center gap-1.5">
            {[
              { view: "all", label: "All", count: stats.total, icon: Smartphone, color: "text-slate-600", activeBg: "bg-slate-900 text-white" },
              { view: "draft", label: "Draft", count: stats.draft, icon: Clock, color: "text-blue-500", activeBg: "bg-blue-600 text-white" },
              { view: "sent", label: "Sent", count: stats.sent, icon: CheckCircle2, color: "text-emerald-500", activeBg: "bg-emerald-600 text-white" },
            ].map((item) => (
              <button
                key={item.view}
                onClick={() => setActiveView(item.view)}
                className={`group flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-300 ${
                  activeView === item.view ? `${item.activeBg} shadow-lg shadow-blue-500/20` : "text-gray-500 hover:bg-gray-100"
                }`}
              >
                <item.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${activeView === item.view ? "text-white" : item.color}`} />
                <span className="tracking-tight">{item.label}</span>
                <span
                  className={`ml-1 px-2 py-0.5 rounded-lg text-[10px] font-black transition-colors ${
                    activeView === item.view ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {item.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { label: "Campaigns", value: stats.total, icon: Smartphone, bg: "hover:border-blue-200" },
            { label: "Draft", value: stats.draft, icon: Clock, bg: "hover:border-amber-200" },
            { label: "Sent", value: stats.sent, icon: CheckCircle2, bg: "hover:border-emerald-200" },
            { label: "Recipients", value: stats.totalRecipients, icon: Users, bg: "hover:border-purple-200" },
            { label: "Success", value: `${stats.successRate}%`, icon: BarChart3, bg: "hover:border-cyan-200" },
            { 
              label: "Low Credit", 
              value: stats.lowCreditDrafts, 
              icon: AlertCircle, 
              bg: "hover:border-amber-200",
              color: stats.lowCreditDrafts > 0 ? "text-amber-600" : "text-gray-700"
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className={`group relative bg-white rounded-[2rem] border border-gray-100 p-6 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] ${stat.bg}`}
            >
              <div className="flex flex-col items-start gap-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-current opacity-10 blur-xl rounded-full group-hover:opacity-20 transition-opacity" />
                  <div className={`relative text-3xl sm:text-4xl transition-transform duration-500 group-hover:scale-100 group-hover:rotate-3 ${stat.color || 'text-gray-700'}`}>
                    <stat.icon className="w-8 h-8" />
                  </div>
                </div>
                <div className="space-y-1 w-full">
                  <p className="text-[10px] sm:text-[11px] font-bold text-gray-400 uppercase tracking-[0.15em]">{stat.label}</p>
                  <p className={`text-2xl sm:text-3xl font-black tracking-tighter ${stat.color || 'text-gray-900'}`}>
                    {stat.value}
                  </p>
                </div>
              </div>
              <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/40 to-transparent rounded-t-[2rem] pointer-events-none" />
            </div>
          ))}
        </div>
      </div>

      {/* Selection Bar */}
      {selectedCampaigns.size > 0 && (
        <div className="bg-gradient-to-r from-blue-50/80 to-indigo-50/80 backdrop-blur-sm border border-blue-200/50 rounded-xl p-4 mb-6 animate-in slide-in-from-top-2 duration-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100/80 backdrop-blur-sm text-blue-700 px-3 py-1.5 rounded-lg font-medium flex items-center gap-2 shadow-xs">
                <CheckCircle2 className="w-4 h-4" />
                {selectedCampaigns.size} selected
              </div>
              <button
                onClick={openBulkDeleteModal}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1.5 rounded-lg transition-all duration-300 text-sm font-medium shadow-sm hover:shadow-md hover:scale-101 hover:from-red-600 hover:to-pink-600 hover:shadow-red-500/25"
              >
                <Trash2 className="w-4 h-4" />
                Delete Selected
              </button>
            </div>
            <button onClick={() => setSelectedCampaigns(new Set())} className="text-gray-500 p-1 rounded-lg hover:bg-gray-100/50">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white/70 backdrop-blur-xl rounded-[2rem] border border-gray-200/50 p-5 mb-8 shadow-xl shadow-gray-200/20">
        <div className="flex flex-col xl:flex-row items-stretch xl:items-center gap-4">
          <div className="flex-1 relative group">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors w-5 h-5" />
            <input
              type="text"
              placeholder="Search campaigns..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-100/50 border border-transparent rounded-2xl focus:outline-none focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 transition-all duration-300 text-sm font-medium placeholder:text-gray-400"
            />
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {/* Status Filter */}
            <div className="relative flex-1 min-w-[140px] sm:flex-none">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none w-4 h-4" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full pl-9 pr-8 py-3 bg-gray-100/50 border-none rounded-2xl text-xs font-bold text-gray-600 appearance-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer hover:bg-gray-200/50 transition-colors"
              >
                {statusOptions.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Recipient Group Filter */}
            <div className="relative flex-1 min-w-[140px] sm:flex-none">
              <select
                value={filterRecipientType}
                onChange={(e) => setFilterRecipientType(e.target.value)}
                className="w-full px-4 py-3 bg-gray-100/50 border-none rounded-2xl text-xs font-bold text-gray-600 appearance-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer hover:bg-gray-200/50 transition-colors"
              >
                <option value="all">All Groups</option>
                {recipientGroups.map((group) => (
                  <option key={group.value} value={group.value}>
                    {group.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Date Range */}
            <div className="flex items-center gap-2 bg-gray-100/50 p-1 rounded-2xl border border-gray-200/20">
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="pl-9 pr-2 py-2 bg-transparent border-none text-xs font-bold text-gray-600 focus:ring-0 cursor-pointer"
                />
              </div>
              <span className="text-gray-300 font-bold text-xs">to</span>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="px-2 py-2 bg-transparent border-none text-xs font-bold text-gray-600 focus:ring-0 cursor-pointer"
              />
            </div>

            {/* Sort */}
            <div className="relative flex-1 min-w-[150px] sm:flex-none">
              <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full pl-9 pr-8 py-3 bg-gray-900 text-white border-none rounded-2xl text-xs font-bold appearance-none focus:ring-4 focus:ring-blue-500/20 cursor-pointer hover:bg-black transition-colors"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="title-asc">Title A-Z</option>
                <option value="title-desc">Title Z-A</option>
                <option value="recipients-high">Most Recipients</option>
                <option value="recipients-low">Fewest Recipients</option>
              </select>
            </div>

            {/* Reset */}
            <button
              onClick={resetFilters}
              title="Reset Filters"
              className="flex items-center justify-center w-11 h-11 bg-white border border-gray-200 rounded-2xl text-gray-500 transition-all duration-300 hover:bg-red-50 hover:text-red-500 hover:border-red-100 active:scale-90"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Campaign List */}
      <div className="bg-white/60 backdrop-blur-sm rounded-xl shadow-xs border border-gray-200/60 overflow-hidden">
        {loading ? (
<div className="flex flex-col items-center justify-center p-12 space-y-4">
  <div className="relative">
    {/* Outer Glow Ring */}
    <div className="absolute inset-0 rounded-full bg-blue-400 opacity-20 animate-ping"></div>
    
    {/* Main Spinner Icon */}
    <Loader2 className="w-10 h-10 text-blue-600 animate-spin relative z-10" />
  </div>

  <div className="space-y-1 text-center">
    <h3 className="text-lg font-black text-slate-900 tracking-tight">
      Fetching Campaigns
    </h3>
    <p className="text-sm font-bold text-slate-500 animate-pulse">
      Please wait a moment...
    </p>
  </div>
</div>        ) : filteredCampaigns.length === 0 ? (
          <div className="text-center py-16">
            <Smartphone className="text-gray-400 w-16 h-16 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Campaigns Found</h3>
            <p className="text-gray-600 mb-6">
              {activeView === "draft"
                ? "No draft campaigns found"
                : activeView === "sent"
                ? "No sent campaigns found"
                : "No campaigns match your filters"}
            </p>
            <button
              onClick={openCreateModal}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2.5 rounded-xl transition-all duration-300 font-medium hover:scale-101 hover:from-blue-600 hover:to-cyan-600 hover:shadow-blue-500/25"
            >
              <Plus className="w-4 h-4" />
              Create Your First SMS Campaign
            </button>
          </div>
        ) : (
          <>
            {/* List Header */}
            <div className="p-4 border-b border-gray-100/50 bg-gradient-to-r from-gray-50/80 to-gray-100/50 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button onClick={toggleSelectAll} className="p-1.5 rounded hover:bg-gray-100/50">
                    {selectedCampaigns.size === filteredCampaigns.length && filteredCampaigns.length > 0 ? (
                      <CheckSquare className="w-4 h-4 text-blue-600" />
                    ) : (
                      <Square className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                  <span className="text-sm font-medium text-gray-600">Select All ({filteredCampaigns.length})</span>
                </div>
                <div className="text-sm text-gray-600">
                  Showing {filteredCampaigns.length} of {campaigns.length} campaigns
                </div>
              </div>
            </div>

            {/* Campaign Cards */}
            <div className="p-4 space-y-4 modern-scrollbar max-h-[600px] overflow-y-auto">
              {filteredCampaigns.map((campaign) => (
                <SmsCampaignCard
                  key={campaign.id}
                  campaign={campaign}
                  isSelected={selectedCampaigns.has(campaign.id)}
                  onSelect={toggleSelectCampaign}
                  onView={openDetailModal}
                  onEdit={openEditModal}
                  onSend={openSendConfirmationModal}
                  onDelete={openDeleteModal}
                  loadingStates={loadingStates}
                />
              ))}
            </div>

            {/* List Footer */}
            <div className="px-6 py-4 border-t border-gray-100/50 bg-gradient-to-r from-gray-50/80 to-gray-100/50 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Showing <span className="font-semibold">{filteredCampaigns.length}</span> of{" "}
                  <span className="font-semibold">{campaigns.length}</span> campaigns
                </div>
                <button
                  onClick={openBulkDeleteModal}
                  disabled={selectedCampaigns.size === 0}
                  className="inline-flex items-center gap-2 bg-white/40 backdrop-blur-md border border-gray-200/50 rounded-lg transition-all duration-300 text-sm font-medium text-gray-700 disabled:opacity-50 hover:bg-red-50/60 hover:text-red-600 hover:border-red-200/60 hover:shadow-sm"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Selected ({selectedCampaigns.size})
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Modals */}

      {/* Create/Edit Modal */}
      <ModernModal open={showCreateModal} onClose={() => setShowCreateModal(false)} maxWidth="550px">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-600" />
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/10" />
          <div className="relative p-5 text-white">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm border border-white/30 shadow-lg">
                  {selectedCampaign ? <Edit className="w-5 h-5 text-white" /> : <Plus className="w-5 h-5 text-white" />}
                </div>
                <div>
                  <h2 className="text-xl font-bold">{selectedCampaign ? "Edit Campaign" : "Create New SMS Campaign"}</h2>
                  <p className="text-white/90 text-sm mt-1">
                    {selectedCampaign ? "Update your campaign details" : "Create a new bulk SMS campaign"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-2.5 hover:bg-white/20 rounded-xl backdrop-blur-sm transition-all hover:scale-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="max-h-[calc(80vh-120px)] overflow-y-auto p-5 modern-scrollbar">
          <div className="space-y-5">
            {/* Title */}
            <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl p-4 border border-emerald-200">
              <label className="text-md font-bold text-gray-800 mb-2 flex items-center gap-2">
                <span className="text-red-500">*</span> Campaign Title
              </label>
              <input
                type="text"
                value={campaignForm.title}
                onChange={(e) => setCampaignForm({ ...campaignForm, title: e.target.value })}
                placeholder="E.g., Exam Results Notification"
                className="w-full px-4 py-3 bg-white border-2 border-emerald-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-400 text-md font-semibold shadow-sm transition-all duration-200 placeholder:text-gray-400"
              />
            </div>

            {/* Recipient Group */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200">
              <label className="text-md font-bold text-gray-800 mb-2 flex items-center gap-2">
                <span className="text-red-500">*</span> Recipient Group
              </label>
              <div className="relative">
                <select
                  value={campaignForm.recipientType}
                  onChange={(e) => setCampaignForm({ ...campaignForm, recipientType: e.target.value })}
                  className="w-full px-4 py-3 pl-12 bg-white border-2 border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-400 text-md font-semibold shadow-sm appearance-none cursor-pointer transition-all duration-200"
                >
                  {recipientGroups.map((group) => (
                    <option key={group.value} value={group.value}>
                      {group.label} ({group.count} recipients)
                    </option>
                  ))}
                </select>
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <Users className="w-4 h-4 text-purple-400" />
                </div>
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Message Content */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-200">
              <div className="flex items-center justify-between mb-2">
                <label className="text-md font-bold text-gray-800 flex items-center gap-2">
                  <span className="text-red-500">*</span> SMS Message
                </label>
                <div className="text-xs font-medium px-2 py-1 rounded-full bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700">
                  {campaignForm.message.length} / 160 characters (SMS parts)
                </div>
              </div>
              <textarea
                value={campaignForm.message}
                onChange={(e) => setCampaignForm({ ...campaignForm, message: e.target.value })}
                placeholder="Type your SMS message here..."
                className="w-full px-4 py-3 bg-white border-2 border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-400 text-md font-semibold shadow-sm resize-y transition-all duration-200 placeholder:text-gray-400 min-h-[120px] max-h-[200px]"
              />
            </div>

            {/* Status Toggle */}
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-4 border border-slate-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={campaignForm.status === "draft"}
                      onChange={(e) => setCampaignForm({ ...campaignForm, status: e.target.checked ? "draft" : "sent" })}
                      className="sr-only peer"
                      id="sms-status-toggle"
                    />
                    <label
                      htmlFor="sms-status-toggle"
                      className="w-12 h-6 bg-gradient-to-r from-gray-300 to-gray-400 peer-checked:bg-gradient-to-r peer-checked:from-emerald-500 peer-checked:to-green-600 rounded-full transition-all duration-300 cursor-pointer shadow-inner relative block after:absolute after:top-0.5 after:left-0.5 after:w-5 after:h-5 after:bg-white after:rounded-full after:transition-all after:duration-300 after:shadow-md peer-checked:after:translate-x-6"
                    />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-gray-800">Save as Draft</span>
                    <p className="text-xs text-gray-600 mt-0.5">
                      {campaignForm.status === "draft" ? "Save for later" : "Send immediately"}
                    </p>
                  </div>
                </div>
                <div
                  className={`text-xs font-bold px-3 py-1.5 rounded-full ${
                    campaignForm.status === "draft"
                      ? "bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700"
                      : "bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700"
                  }`}
                >
                  {campaignForm.status === "draft" ? "DRAFT MODE" : "SEND MODE"}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="flex items-center gap-2 bg-gradient-to-r from-emerald-50 to-green-100 px-3 py-1.5 rounded-full">
                <div className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full" />
                <span className="font-bold">Required fields marked with *</span>
              </div>
            </div>
            <div className="flex items-center gap-3 mb-4">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-6 py-2.5 rounded-xl text-sm font-bold border-2 border-gray-300 text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 min-w-[100px] shadow-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateOrUpdateCampaign}
                disabled={loadingStates.create}
                className="px-8 py-2.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-emerald-500 via-green-500 to-teal-600 hover:from-emerald-600 hover:via-green-600 hover:to-teal-700 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all duration-200 min-w-[120px] hover:scale-100"
              >
                {loadingStates.create ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Processing...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    {selectedCampaign ? (
                      <>
                        <Save className="w-4 h-4" />
                        Update 
                      </>
                    ) : campaignForm.status === "draft" ? (
                      <>
                        <Save className="w-4 h-4" />
                        Save Draft
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send 
                      </>
                    )}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </ModernModal>

      {/* Detail Modal */}
      <ModernModal open={showDetailModal} onClose={() => setShowDetailModal(false)} maxWidth="700px">
        {selectedCampaign && (
          <>
            <div className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700" />
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/20" />
              <div className="relative p-5 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm border border-white/30 shadow-lg">
                      <Smartphone className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">SMS Campaign Details</h2>
                      <p className="text-blue-100 opacity-90 text-sm mt-1">{selectedCampaign.title}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowDetailModal(false)}
                    className="p-2.5 hover:bg-white/20 rounded-xl backdrop-blur-sm transition-all hover:scale-100"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="max-h-[calc(85vh-130px)] overflow-y-auto p-5 modern-scrollbar">
              <div className="space-y-5">
                {/* Campaign Info */}
                <div className="bg-gradient-to-br from-blue-50 via-white to-cyan-50 rounded-xl p-5 border border-blue-200 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                      <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg">
                        <Info className="w-4 h-4 text-white" />
                      </div>
                      Campaign Information
                    </h3>
                    <div
                      className={`px-3 py-1.5 rounded-full text-xs font-bold ${
                        selectedCampaign.status === "sent"
                          ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-md"
                          : "bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-md"
                      }`}
                    >
                      {selectedCampaign.status === "sent" ? "SENT" : "DRAFT"}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
                        <div className="p-2 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-lg">
                          <Users className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Recipient Group</p>
                          <p className="text-sm font-bold text-blue-700">
                            {getRecipientGroupLabel(selectedCampaign.recipientType) || "All"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
                        <div className="p-2 bg-gradient-to-r from-emerald-100 to-green-100 rounded-lg">
                          <UserCheck className="w-4 h-4 text-emerald-600" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Recipients</p>
                          <p className="text-sm font-bold text-emerald-700">
                            {selectedCampaign.recipients ? selectedCampaign.recipients.split(",").length : 0} numbers
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
                        <div className="p-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg">
                          <Calendar className="w-4 h-4 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Created</p>
                          <p className="text-sm font-bold text-purple-700">
                            {new Date(selectedCampaign.createdAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                      </div>
                      {selectedCampaign.sentAt && (
                        <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
                          <div className="p-2 bg-gradient-to-r from-violet-100 to-indigo-100 rounded-lg">
                            <Send className="w-4 h-4 text-violet-600" />
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Sent</p>
                            <p className="text-sm font-bold text-violet-700">
                              {new Date(selectedCampaign.sentAt).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Message Content */}
                <div className="bg-gradient-to-br from-slate-50 to-white rounded-xl p-5 border border-slate-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                      <div className="p-2 bg-gradient-to-r from-slate-500 to-slate-600 rounded-lg">
                        <FileText className="w-4 h-4 text-white" />
                      </div>
                      SMS Message
                    </h3>
                    <div className="text-xs font-medium px-3 py-1.5 rounded-full bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700">
                      {selectedCampaign.message?.length || 0} characters
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-4 border-2 border-slate-200 shadow-sm max-h-60 overflow-y-auto modern-scrollbar">
                    <div className="text-gray-700 whitespace-pre-wrap font-sans text-sm leading-relaxed">
                      {selectedCampaign.message}
                    </div>
                  </div>
                </div>

                {/* Delivery Stats (if sent) */}
                {selectedCampaign.status === "sent" && (
                  <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl p-5 border border-emerald-200">
                    <h3 className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
                      <div className="p-2 bg-gradient-to-r from-emerald-500 to-green-600 rounded-lg">
                        <BarChart3 className="w-4 h-4 text-white" />
                      </div>
                      Delivery Summary
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <div className="bg-white rounded-lg p-3 border border-emerald-200 text-center">
                        <p className="text-xs text-gray-500 mb-1">Total</p>
                        <p className="text-lg font-bold text-emerald-700">
                          {selectedCampaign.recipients?.split(",").length || 0}
                        </p>
                      </div>
                      <div className="bg-white rounded-lg p-3 border border-emerald-200 text-center">
                        <p className="text-xs text-gray-500 mb-1">Delivered</p>
                        <p className="text-lg font-bold text-emerald-700">{selectedCampaign.sentCount || 0}</p>
                      </div>
                      <div className="bg-white rounded-lg p-3 border border-emerald-200 text-center">
                        <p className="text-xs text-gray-500 mb-1">Failed</p>
                        <p className="text-lg font-bold text-emerald-700">{selectedCampaign.failedCount || 0}</p>
                      </div>
                      <div className="bg-white rounded-lg p-3 border border-emerald-200 text-center">
                        <p className="text-xs text-gray-500 mb-1">Success Rate</p>
                        <p className="text-lg font-bold text-emerald-700">
                          {selectedCampaign.sentCount && selectedCampaign.recipients
                            ? Math.round(
                                (selectedCampaign.sentCount / selectedCampaign.recipients.split(",").length) * 100
                              )
                            : 0}
                          %
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="p-5 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-cyan-100 px-3 py-1.5 rounded-full">
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full" />
                    <span className="font-bold">Campaign ID: #{selectedCampaign.id?.slice(0, 8) || "N/A"}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {selectedCampaign?.status === "draft" && (
                    <button
                      onClick={() => {
                        setShowDetailModal(false);
                        setTimeout(() => openEditModal(selectedCampaign), 100);
                      }}
                      className="px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2"
                    >
                      <Edit className="w-4 h-4" />
                      Edit Campaign
                    </button>
                  )}
                  <button
                    onClick={() => setShowDetailModal(false)}
                    className="px-6 py-2.5 rounded-xl text-sm font-bold border-2 border-gray-300 text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </ModernModal>

      {/* Delete Confirmation Modals */}
      <ConfirmationModal
        open={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setCampaignToDelete(null);
        }}
        title="Delete Campaign"
        message={`Are you sure you want to delete "${campaignToDelete?.title}"? This action cannot be undone.`}
        confirmText="Delete Campaign"
        onConfirm={handleDeleteCampaign}
        loading={loadingStates.delete}
      />

      <ConfirmationModal
        open={showSendConfirmationModal}
        onClose={() => {
          setShowSendConfirmationModal(false);
          setCampaignToSend(null);
        }}
        title="Send Campaign"
        message={`Send "${campaignToSend?.title}" to ${
          campaignToSend?.recipients?.split(",").length || 0
        } recipients? This will mark it as sent and send SMS immediately.`}
        confirmText="Send Campaign"
        cancelText="Cancel"
        onConfirm={handleSendCampaign}
        isDanger={false}
        loading={loadingStates.send}
      />

      <ConfirmationModal
        open={showBulkDeleteModal}
        onClose={() => setShowBulkDeleteModal(false)}
        title="Delete Multiple Campaigns"
        message={`Are you sure you want to delete ${selectedCampaigns.size} selected campaign(s)? This action cannot be undone.`}
        confirmText={`Delete ${selectedCampaigns.size} Campaigns`}
        onConfirm={handleBulkDelete}
        loading={loadingStates.bulk}
      />
    </div>
  );
}
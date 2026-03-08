'use client';

import { useState, useEffect } from 'react';
import { 
  FiUser, FiLock, FiAlertCircle, FiX, 
  FiHelpCircle, FiBook, FiShield, FiClock,
  FiLogIn, FiEdit2, FiCheckCircle, FiMail,
  FiPhone, FiMapPin
} from 'react-icons/fi';
import { IoSchool, IoSparkles, IoLeaf } from 'react-icons/io5';
import { FaLeaf } from 'react-icons/fa';

import CircularProgress from "@mui/material/CircularProgress";

export default function StudentLoginModal({ 
  isOpen, 
  onClose, 
  onLogin,
  isLoading = false,
  error = null,
  requiresContact = false
}) {
  const [formData, setFormData] = useState({
    fullName: '',
    admissionNumber: ''
  });
  const [localError, setLocalError] = useState(null);
  const [showContactInfo, setShowContactInfo] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    if (error) {
      setLocalError(error);
      if (requiresContact) {
        setShowContactInfo(true);
      }
    } else {
      setLocalError(null);
      setShowContactInfo(false);
    }
  }, [error, requiresContact]);

  if (!isOpen) return null;

  const validateInputs = () => {
    const errors = {};
    
    if (!formData.fullName.trim()) {
      errors.fullName = 'Please enter your name';
    } else {
      const nameParts = formData.fullName.trim().split(/\s+/).filter(part => part.length > 0);
      if (nameParts.length < 1) {
        errors.fullName = 'Please enter at least your first name';
      }
    }

    if (!formData.admissionNumber.trim()) {
      errors.admissionNumber = 'Please enter your admission number';
    } else if (!/^[A-Z0-9]{2,10}$/i.test(formData.admissionNumber.trim())) {
      errors.admissionNumber = 'Admission number should be 2-10 letters or numbers';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalError(null);
    setShowContactInfo(false);
    setValidationErrors({});
    
    if (!validateInputs()) {
      return;
    }

    onLogin(formData.fullName.trim(), formData.admissionNumber.trim());
  };

  const handleClear = () => {
    setFormData({ fullName: '', admissionNumber: '' });
    setLocalError(null);
    setShowContactInfo(false);
    setValidationErrors({});
  };

  const handleClose = () => {
    handleClear();
    onClose();
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (localError) setLocalError(null);
    if (validationErrors[field]) {
      setValidationErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Updated with Kamba girls' names
  const studentExamples = [
    { name: "Mwende Mumbua Kalondu", admission: "2903" },
    { name: "Mwikali Kasimu Ndanu", admission: "2902" },
    { name: "Kasyoka Mutuku Mwende", admission: "1234" },
    { name: "Ndanu Mumbua Mutiso", admission: "5678" },
    { name: "Kalondu Mutua Mwende", admission: "9012" },
    { name: "Mbula Mwanzia Nduku", admission: "3456" },
    { name: "Mwithali Musyoka Kasyoka", admission: "7890" }
  ];

  // Updated name formats with Kamba girls' names
  const nameFormats = [
    "Mwende Mumbua",
    "Mwende Mumbua Kalondu", 
    "MWENDE MUMBUA",
    "mwende mumbua",
    "M. Mumbua",
    "Kalondu Mutua",
    "Mwikali Kasimu",
    "Ndanu Mumbua",
    "Kasyoka Mutuku"
  ];

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-2 sm:p-4 animate-fadeIn overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-modal-title"
    >
      <main className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl border border-emerald-100 overflow-hidden transform transition-all duration-300 scale-100 my-auto max-h-[90vh] flex flex-col">
        
        {/* Header - Matungulu Girls Theme */}
        <header className="bg-gradient-to-r from-emerald-900 to-teal-800 px-5 py-4 sm:px-6 sm:py-4 text-white flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-white/20 rounded-xl blur-md"></div>
                <div className="relative p-2 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                  <IoSchool className="text-xl sm:text-2xl text-emerald-200" />
                </div>
              </div>
              <div>
                <h1 id="login-modal-title" className="text-lg sm:text-xl font-bold flex items-center gap-2">
                  Matungulu Girls Portal
                  <IoSparkles className="text-emerald-300 text-sm" />
                </h1>
                <p className="text-emerald-100/80 text-xs mt-0.5 flex items-center gap-1">
                  <FaLeaf className="text-emerald-300 text-xs" />
                  <span>"Strive to Excel" • Secure Student Access</span>
                </p>
              </div>
            </div>
            <button 
              onClick={handleClose}
              className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Close login modal"
            >
              <FiX className="text-lg" />
            </button>
          </div>
        </header>

        {/* Body */}
        <article className="p-5 sm:p-6 overflow-y-auto flex-grow bg-gradient-to-br from-white to-emerald-50/30">
          
          {/* Flexible Name Instructions */}
          <section className="mb-4 bg-emerald-50 rounded-lg p-3 border border-emerald-200">
            <div className="flex items-start gap-2">
              <FiCheckCircle className="text-emerald-600 text-sm mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <h2 className="text-xs font-bold text-emerald-800 mb-1">Flexible Name Entry</h2>
                <p className="text-emerald-700 text-xs mb-2">
                  Any format works: uppercase, lowercase, 2 or 3 names, any order
                </p>
                <div className="flex flex-wrap gap-1">
                  {nameFormats.slice(0, 4).map((format, idx) => (
                    <button 
                      key={idx}
                      onClick={() => handleInputChange('fullName', format)}
                      className="px-2 py-1 bg-white text-emerald-700 rounded text-xs hover:bg-emerald-100 transition-colors border border-emerald-300"
                      type="button"
                    >
                      {format}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Error/Contact Info */}
          <aside>
            {(showContactInfo || localError) && (
              <div className="mb-4 animate-slideDown">
                <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg border border-amber-200">
                  <FiAlertCircle className="text-amber-600 text-sm mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-amber-800 mb-1">
                      {showContactInfo ? 'Contact Administrator' : 'Login Issue'}
                    </h3>
                    <p className="text-amber-700 text-xs mb-2">
                      {localError || 'Please verify your details or contact support'}
                    </p>
                    
                    {showContactInfo && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-xs">
                          <FiMail className="text-emerald-600" />
                          <span className="text-gray-700">office@matungulugirls.ac.ke</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <FiPhone className="text-emerald-600" />
                          <span className="text-gray-700">+254 700 000 000</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <FiMapPin className="text-emerald-600" />
                          <span className="text-gray-700">Matungulu, Machakos County</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </aside>

          {/* Login Form */}
          <section>
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 bg-emerald-100 rounded-lg">
                  <FiShield className="text-emerald-700 text-sm" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">Student Verification</h3>
                  <div className="flex items-center gap-1 text-gray-500 text-xs">
                    <FiClock className="text-emerald-600 text-xs" />
                    <span>Session: <span className="font-medium text-emerald-700">2 hours</span></span>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-50/50 rounded-lg p-3 border border-emerald-100 mb-4">
                <p className="text-emerald-700 text-xs">
                  <span className="font-semibold">Note:</span> Use your official admission number. 
                  Names can be entered in any format.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Input */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-medium text-gray-700 flex items-center gap-1.5">
                    <FiUser className="text-emerald-600 text-xs" />
                    <span>Full Name</span>
                  </label>
                  <span className="text-[10px] text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                    Any format
                  </span>
                </div>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  placeholder="e.g., Mwende Mumbua, MWENDE MUMBUA"
                  className={`
                    w-full px-4 py-3 
                    border-2 rounded-lg
                    focus:outline-none focus:ring-2 focus:ring-emerald-500/20
                    text-sm placeholder:text-gray-400
                    bg-white
                    transition-all
                    ${validationErrors.fullName 
                      ? 'border-red-400 focus:border-red-500' 
                      : 'border-gray-200 focus:border-emerald-500'
                    }
                  `}
                  disabled={isLoading}
                />
                {validationErrors.fullName && (
                  <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                    <FiAlertCircle className="text-xs" />
                    {validationErrors.fullName}
                  </p>
                )}
                <div className="mt-2">
                  <p className="text-gray-500 text-xs mb-1">Quick fill (Kamba girls' names):</p>
                  <div className="flex flex-wrap gap-1">
                    {studentExamples.slice(0, 4).map((student, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          handleInputChange('fullName', student.name);
                          handleInputChange('admissionNumber', student.admission);
                        }}
                        className="px-2 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded text-xs border border-emerald-200 transition-colors"
                      >
                        {student.name.split(' ')[0]} - {student.admission}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Admission Number Input */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-medium text-gray-700 flex items-center gap-1.5">
                    <FiLock className="text-emerald-600 text-xs" />
                    <span>Admission Number</span>
                  </label>
                  <span className="text-[10px] text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                    Required
                  </span>
                </div>
                <input
                  type="text"
                  value={formData.admissionNumber}
                  onChange={(e) => handleInputChange('admissionNumber', e.target.value.toUpperCase())}
                  placeholder="Enter your admission number"
                  className={`
                    w-full px-4 py-3 
                    border-2 rounded-lg
                    focus:outline-none focus:ring-2 focus:ring-emerald-500/20
                    text-sm placeholder:text-gray-400
                    bg-white
                    transition-all
                    ${validationErrors.admissionNumber 
                      ? 'border-red-400 focus:border-red-500' 
                      : 'border-gray-200 focus:border-emerald-500'
                    }
                  `}
                  disabled={isLoading}
                />
                {validationErrors.admissionNumber && (
                  <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                    <FiAlertCircle className="text-xs" />
                    {validationErrors.admissionNumber}
                  </p>
                )}
                <div className="mt-2">
                  <p className="text-gray-500 text-xs mb-1">Examples:</p>
                  <div className="flex flex-wrap gap-1">
                    {['2903', '2902', '1234', '5678', '9012', '3456', '7890'].map((example, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleInputChange('admissionNumber', example)}
                        className="px-2 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded text-xs border border-emerald-200 transition-colors"
                      >
                        {example}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleClear}
                  disabled={isLoading}
                  className="
                    flex-1 py-3 px-4
                    bg-gray-100 hover:bg-gray-200
                    text-gray-700
                    rounded-lg
                    font-medium
                    text-sm
                    disabled:opacity-50
                    disabled:cursor-not-allowed
                    flex items-center justify-center gap-2
                    transition-colors
                    border border-gray-200
                  "
                >
                  <FiX className="text-sm" />
                  <span>Clear</span>
                </button>

                <button
                  type="submit"
                  disabled={isLoading || !formData.fullName.trim() || !formData.admissionNumber.trim()}
                  className="
                    flex-1 py-3 px-4
                    bg-emerald-600 hover:bg-emerald-700
                    text-white
                    rounded-lg
                    font-medium
                    text-sm
                    disabled:opacity-50
                    disabled:cursor-not-allowed
                    flex items-center justify-center gap-2
                    transition-colors
                    shadow-md hover:shadow-lg
                  "
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <CircularProgress size={16} thickness={4} sx={{ color: "white" }} />
                      <span>Verifying...</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <FiLogIn className="text-sm" />
                      <span>Access Portal</span>
                    </span>
                  )}
                </button>
              </div>
            </form>

            {/* Features */}
            <section className="mt-5 pt-4 border-t border-gray-100">
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-2 bg-emerald-50 rounded-lg">
                  <FiBook className="text-emerald-600 text-sm mx-auto mb-1" />
                  <p className="text-[10px] font-medium text-emerald-800">Resources</p>
                </div>
                <div className="text-center p-2 bg-emerald-50 rounded-lg">
                  <FiShield className="text-emerald-600 text-sm mx-auto mb-1" />
                  <p className="text-[10px] font-medium text-emerald-800">Secure</p>
                </div>
                <div className="text-center p-2 bg-emerald-50 rounded-lg">
                  <FiClock className="text-emerald-600 text-sm mx-auto mb-1" />
                  <p className="text-[10px] font-medium text-emerald-800">2 Hours</p>
                </div>
              </div>
            </section>
          </section>
        </article>

        {/* Footer */}
        <footer className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex-shrink-0">
          <p className="text-center text-gray-500 text-xs">
            For assistance: Contact class teacher or school office • Matungulu Girls High School
          </p>
        </footer>
      </main>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-slideDown {
          animation: slideDown 0.2s ease-out;
        }
        
        @media (max-width: 640px) {
          .text-lg { font-size: 1rem; }
        }
        
        input, select, textarea {
          font-size: 16px !important;
        }
        
        .overflow-y-auto {
          scrollbar-width: thin;
          scrollbar-color: #cbd5e1 #f1f5f9;
        }
        
        .overflow-y-auto::-webkit-scrollbar {
          width: 4px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-track {
          background: #f1f5f9;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 2px;
        }
        
        *:focus-visible {
          outline: 2px solid #059669;
          outline-offset: 2px;
        }
      `}</style>
    </div>
  );
}
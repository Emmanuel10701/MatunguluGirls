"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, ShieldQuestion, LoaderCircle, Key, Heart, School, ArrowLeft } from 'lucide-react';
import { toast, Toaster } from 'sonner';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [gmailEnabled, setGmailEnabled] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const loadingToast = toast.loading('Sending reset link...', {
      position: 'top-right',
    });

    try {
      const res = await fetch("/api/forgotpassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.dismiss(loadingToast);
        toast.success(
          <div className="flex flex-col gap-1">
            <span className="font-bold">✅ Reset Link Sent!</span>
            <span className="text-sm opacity-90">{data.message}</span>
          </div>,
          {
            duration: 5000,
            icon: '📧',
            position: 'top-right',
            style: {
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: 'white',
              border: 'none',
            },
          }
        );
        
        setEmail("");
        setGmailEnabled(true);
        setEmailSent(true);
      } else {
        toast.dismiss(loadingToast);
        toast.error(
          <div className="flex flex-col gap-1">
            <span className="font-bold">❌ Failed to Send</span>
            <span className="text-sm opacity-90">{data.message}</span>
          </div>,
          {
            duration: 5000,
            position: 'top-right',
            style: {
              background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
              color: 'white',
              border: 'none',
            },
          }
        );
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error(
        <div className="flex flex-col gap-1">
          <span className="font-bold">❌ Network Error</span>
          <span className="text-sm opacity-90">Failed to send reset link. Please try again.</span>
        </div>,
        {
          duration: 5000,
          position: 'top-right',
          style: {
            background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
            color: 'white',
            border: 'none',
          },
        }
      );
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGmailClick = () => {
    if (!email && !emailSent) {
      toast.warning('Please enter your email first', {
        position: 'top-right',
        style: {
          background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
          color: 'white',
          border: 'none',
        },
      });
      return;
    }
    
    toast.info('Opening Gmail...', {
      position: 'top-right',
      duration: 2000,
      style: {
        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        color: 'white',
        border: 'none',
      },
    });
    
    const searchEmail = emailSent ? email : email;
    window.open(`https://mail.google.com/mail/u/0/#search/${encodeURIComponent(searchEmail)}`, '_blank');
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.1 } }
  };

  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-950 text-white flex items-center justify-center p-3 sm:p-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 animate-pulse z-50"></div>
      
      {/* Floating Orbs */}
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-400/5 rounded-full blur-3xl"></div>
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px),
                          linear-gradient(180deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
        backgroundSize: '40px 40px'
      }}></div>

      {/* Back Button */}
      <button
        onClick={() => window.history.back()}
        className="absolute top-4 left-4 sm:top-6 sm:left-6 z-50 flex items-center gap-2 px-3 py-2 bg-white/5 backdrop-blur-md rounded-full border border-white/10 text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300 text-xs sm:text-sm"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Login</span>
      </button>

      <Toaster 
        position="top-right"
        richColors
        expand={true}
        toastOptions={{
          style: {
            borderRadius: '12px',
            padding: '16px',
            fontSize: '14px',
            fontWeight: '500',
          },
          success: {
            style: {
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: 'white',
            },
          },
          error: {
            style: {
              background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
              color: 'white',
            },
          },
          warning: {
            style: {
              background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
              color: 'white',
            },
          },
          info: {
            style: {
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: 'white',
            },
          },
        }}
      />

      <motion.div
        className="max-w-sm sm:max-w-md md:max-w-xl w-full mx-auto p-6 sm:p-8 md:p-10 backdrop-blur-lg bg-white/5 rounded-2xl sm:rounded-3xl shadow-2xl relative overflow-hidden transform-gpu border border-white/10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="absolute top-0 left-0 w-16 h-16 sm:w-24 sm:h-24 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 right-0 w-16 h-16 sm:w-24 sm:h-24 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>

        <motion.div className="relative z-10 text-center" variants={itemVariants}>
          {/* School Logo/Badge */}
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <School className="text-white w-8 h-8" />
            </div>
          </div>

          <div className="flex flex-col items-center justify-center mb-3 sm:mb-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-2">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-200">
                Matungulu Girls
              </span>
            </h1>
            <div className="flex items-center gap-2">
              <ShieldQuestion className="text-emerald-300 text-xl sm:text-2xl" />
              <span className="text-lg sm:text-xl font-bold text-white">Password Recovery</span>
            </div>
          </div>
          
          <p className="text-sm sm:text-base text-emerald-100/80 mb-4 sm:mb-6 px-2">
            Enter your registered email below and we'll send you a secure link to reset your password.
          </p>
          
          <div className="flex justify-center flex-wrap gap-1 sm:gap-2 text-xs sm:text-sm font-medium mb-6 sm:mb-8">
            <span className="bg-emerald-500/20 text-emerald-200 px-2 sm:px-3 py-1 rounded-full border border-emerald-500/30">#Security</span>
            <span className="bg-emerald-500/20 text-emerald-200 px-2 sm:px-3 py-1 rounded-full border border-emerald-500/30">#AccountRecovery</span>
            <span className="bg-emerald-500/20 text-emerald-200 px-2 sm:px-3 py-1 rounded-full border border-emerald-500/30">#SafeAccess</span>
          </div>

          {/* Status Message */}
          {emailSent && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 bg-emerald-500/20 border border-emerald-500/30 rounded-xl"
            >
              <p className="text-emerald-200 text-xs sm:text-sm">
                ✓ Reset link sent! Check your inbox and spam folder.
              </p>
            </motion.div>
          )}
        </motion.div>

        <form onSubmit={handleSubmit} className="relative z-10 space-y-4 sm:space-y-6">
          <motion.div variants={itemVariants}>
            <div className="relative group">
              <Mail className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-emerald-300 group-focus-within:text-emerald-400 transition-colors w-4 h-4 sm:w-5 sm:h-5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@matungulugirls.sc.ke"
                className="w-full h-12 sm:h-14 pl-10 sm:pl-12 pr-4 bg-white/10 text-white placeholder-emerald-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white/20 transition-all duration-300 text-sm sm:text-base border border-white/10"
                required
              />
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button
              type="submit"
              disabled={loading}
              className={`w-full sm:flex-1 flex items-center justify-center gap-2 h-12 sm:h-14 rounded-xl text-white font-semibold transition-all duration-300 ${
                loading ? 'bg-emerald-600/50 cursor-not-allowed' :
                'bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 shadow-lg shadow-emerald-500/30'
              } text-sm sm:text-base`}
            >
              {loading ? (
                <>
                  <LoaderCircle className="animate-spin w-5 h-5 sm:w-6 sm:h-6" />
                  <span>Sending Link...</span>
                </>
              ) : (
                <span>Send Reset Link</span>
              )}
            </button>

            <button
              type="button"
              onClick={handleGmailClick}
              className={`w-full sm:flex-1 flex items-center justify-center gap-2 h-12 sm:h-14 rounded-xl font-semibold transition-all duration-300 ${
                !email && !emailSent ? 'bg-white/5 text-white/30 cursor-not-allowed border border-white/10' :
                'bg-white/10 text-white hover:bg-white/20 border border-white/20 hover:border-emerald-400/50'
              } text-sm sm:text-base`}
              disabled={!email && !emailSent}
            >
              <Mail size={18} />
              <span>Open Gmail</span>
            </button>
          </motion.div>
        </form>

        <motion.div variants={itemVariants} className="mt-6 sm:mt-8 text-center text-sm">
          <p className="text-xs sm:text-sm text-emerald-200/70">
            Remembered your password?{' '}
            <span
              onClick={() => window.history.back()}
              className="text-emerald-300 font-medium hover:text-emerald-200 hover:underline cursor-pointer transition-colors duration-200"
            >
              Return to Login
            </span>
          </p>
        </motion.div>

        {/* Security Footer */}
        <motion.div 
          variants={itemVariants} 
          className="mt-6 pt-4 border-t border-white/10 flex items-center justify-center gap-2"
        >
          <Heart className="w-3 h-3 text-emerald-400" />
          <span className="text-[10px] sm:text-xs text-emerald-200/60">Prayer, Discipline & Hardwork</span>
        </motion.div>
      </motion.div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
};

export default ForgotPasswordPage;
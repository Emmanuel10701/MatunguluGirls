'use client';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import {
  FiMapPin,
  FiPhone,
  FiMail,
  FiClock,
  FiHome,
  FiBook,
  FiUsers,
  FiCalendar,
  FiImage,
  FiUserCheck,
  FiBookOpen,
  FiHelpCircle,
  FiGlobe,
  FiLock,
  FiShield,
  FiAward,
  FiGithub,
  FiTarget,
  FiBriefcase,
  FiActivity,
  FiUserPlus,
  FiBell,
  FiCheckCircle,
  FiDownload,
  FiEye, 
  FiX 
} from 'react-icons/fi';
import { 
  SiFacebook, 
  SiX,
  SiYoutube, 
  SiLinkedin, 
  SiWhatsapp 
} from 'react-icons/si';

export default function ModernFooter() {
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showSitemap, setShowSitemap] = useState(false);
  const currentYear = new Date().getFullYear();

  // Quick Links
  const quickLinks = [
    { name: 'Home', href: '/', icon: FiHome },
    { name: 'About Us', href: '/pages/AboutUs', icon: FiUsers },
    { name: 'Fees', href: '/pages/fees', icon: FiBook },
    { name: 'Admissions', href: '/pages/admissions', icon: FiUserCheck },
    { name: 'Gallery', href: '/pages/gallery', icon: FiImage },
    { name: 'News & Events', href: '/pages/eventsandnews', icon: FiCalendar },
    { name: 'Contact', href: '/pages/contact', icon: FiPhone },
    { name: 'Careers', href: '/pages/careers', icon: FiBriefcase },
  ];

  // Resources
  const resources = [
    { name: 'Student Portal', href: '/pages/StudentPortal', icon: FiBookOpen },
    { name: 'Apply Now', href: '/pages/apply-for-admissions', icon: FiUserPlus },
    { name: 'Guidance & Counselling', href: '/pages/Guidance-and-Councelling', icon: FiHelpCircle },
    { name: 'Staff Directory', href: '/pages/staff', icon: FiUsers },
    { name: 'Admin Login', href: '/pages/adminLogin', icon: FiLock },
    { name: 'School Policies', href: '/pages/TermsandPrivacy', icon: FiShield },
  ];

  // Social Media Links
  const socialLinks = [
    {
      icon: SiFacebook,
      href: 'https://facebook.com/matungulugirlshs',
      label: 'Facebook',
      color: '#1877F2',
      hoverColor: '#0A5CD0'
    },
    {
      icon: SiX,
      href: 'https://twitter.com/matungulugirlshs',
      label: 'Twitter',
      color: '#000000',
      hoverColor: '#333333'
    },
    {
      icon: SiYoutube,
      href: 'https://youtube.com/matungulugirlshs',
      label: 'YouTube',
      color: '#FF0000',
      hoverColor: '#CC0000'
    },
    {
      icon: SiLinkedin,
      href: 'https://linkedin.com/school/matungulugirlshs',
      label: 'LinkedIn',
      color: '#0A66C2',
      hoverColor: '#004182'
    },
    {
      icon: SiWhatsapp,
      href: 'https://wa.me/254720123456',
      label: 'WhatsApp',
      color: '#25D366',
      hoverColor: '#1DA851'
    },
  ];

  // Newsletter states
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Newsletter handler
  const handleSubscribe = async (e) => {
    e.preventDefault();
    
    if (!email || isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/subscriber', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          subscribedAt: new Date().toISOString(),
          source: 'footer-newsletter'
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setShowSuccess(true);
        setEmail('');
        
        setTimeout(() => {
          setShowSuccess(false);
        }, 5000);
        
        toast.success('Successfully subscribed to newsletter!', {
          icon: '✅',
          duration: 3000,
        });
      } else {
        throw new Error(data.error || 'Subscription failed');
      }
    } catch (error) {
      console.error('Subscription error:', error);
      toast.error('Failed to subscribe. Please try again.', {
        icon: '❌',
        duration: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Contact Information
  const contactInfo = [
    {
      icon: FiMapPin,
      text: 'Matungulu, Machakos County, Kenya',
      href: 'https://maps.google.com/?q=-0.416667,36.950000',
      detail: 'Along Tala Kangudo Road'
    },
    {
      icon: FiPhone,
      text: '+254 720 123 456',
      href: 'tel:+254720123456',
      detail: 'Main Office Line'
    },
    {
      icon: FiMail,
      text: 'info@matungulugirlshs.sc.ke',
      href: 'mailto:info@matungulugirlshs.sc.ke',
      detail: 'General Inquiries'
    },
    {
      icon: FiMail,
      text: 'admissions@matungulugirlshs.sc.ke',
      href: 'mailto:admissions@matungulugirlshs.sc.ke',
      detail: 'Admissions'
    },
    {
      icon: FiClock,
      text: 'Mon - Fri: 7:30 AM - 5:00 PM',
      href: '#',
      detail: 'Sat: 8:00 AM - 1:00 PM'
    }
  ];

  // Achievements
  const achievements = [
    'Top Performing School in Matungulu, Machakos',
    'Excellence in Science & Mathematics',
    '65% University Placement Rate',
    'Sports Excellence Award 2024',
  ];

  return (
    <footer className="w-full bg-gradient-to-b from-emerald-950 to-slate-950 text-white">
      {/* Main Footer Content */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto">
          {/* Grid Layout - Responsive with zoom support */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 w-full">
            
            {/* Column 1: School Information */}
            <div className="space-y-6 min-w-0 w-full">
              {/* Header Section */}
              <div className="flex flex-col xs:flex-row items-start gap-4">
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 border-emerald-400/50 flex-shrink-0 shadow-lg shadow-emerald-500/20">
                  <img 
                    src="/MatG.jpg" 
                    alt="School Logo" 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-emerald-100 to-teal-100 bg-clip-text text-transparent leading-tight break-words">
                    Matungulu Girls High School
                  </h3>
                  <div className="text-white text-sm font-medium flex items-center gap-2 mt-2 flex-wrap">
                    <FiTarget className="flex-shrink-0 w-4 h-4" />
                    <span className="opacity-90">Strive to Excel</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-emerald-50 text-sm sm:text-base font-normal leading-relaxed break-words max-w-prose">
                A Public Extra county learning institution in Matungulu, Machakos, dedicated to academic excellence, 
                holistic development, and nurturing future leaders through quality education since 1995.
              </p>

              {/* Contact List */}
              <div className="space-y-4">
                {contactInfo.slice(0, 3).map((item, index) => {
                  const ItemIcon = item.icon;
                  return (
                    <a
                      key={index}
                      href={item.href}
                      className="flex items-start gap-3 text-emerald-50 hover:text-white transition-all text-sm sm:text-base font-normal group"
                    >
                      <div className="mt-1 p-1.5 bg-emerald-500/20 rounded-md group-hover:bg-emerald-500/30 transition-colors flex-shrink-0">
                        <ItemIcon className="text-lg text-white group-hover:scale-100 transition-transform" /> 
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="block break-all sm:break-words leading-tight">{item.text}</span>
                        {item.detail && (
                          <p className="text-xs sm:text-sm text-white font-normal mt-0.5 break-words">
                            {item.detail}
                          </p> 
                        )}
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>

        

            {/* Column 3: Resources */}
            <div className="space-y-4 min-w-0 w-full">
              <div className="flex items-center gap-2 flex-wrap">
                <FiActivity className="text-white text-lg sm:text-xl flex-shrink-0" />
                <h4 className="text-base sm:text-lg lg:text-xl font-semibold text-white break-words">Resources</h4>
              </div>
              <div className="space-y-3">
                {resources.map((resource, index) => {
                  const Icon = resource.icon;
                  return (
                    <a
                      key={index}
                      href={resource.href}
                      className="flex items-start gap-3 text-emerald-100/70 hover:text-white text-sm sm:text-base font-normal group break-words hover:translate-x-1 transition-transform"
                    >
                      <Icon className="flex-shrink-0 text-lg group-hover:scale-100 transition-transform mt-0.5 text-white/70" />
                      <span className="min-w-0 flex-1 break-words leading-tight">{resource.name}</span>
                    </a>
                  );
                })}
              </div>

              {/* Social Media */}
              <div className="mt-6 pt-6 border-t border-emerald-500/20 space-y-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <FiUsers className="text-white text-lg flex-shrink-0" />
                  <h5 className="text-sm sm:text-base lg:text-lg font-semibold text-white break-words">Connect With Us</h5>
                </div>
                <div className="flex flex-wrap gap-3 pt-1">
                  {socialLinks.map((social, index) => {
                    const SocialIcon = social.icon;
                    return (
                      <a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center border border-emerald-400/30 flex-shrink-0 hover:scale-100 hover:shadow-lg transform transition-all"
                        aria-label={social.label}
                        style={{
                          backgroundColor: social.color,
                          borderColor: social.color,
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = social.hoverColor;
                          e.currentTarget.style.borderColor = social.hoverColor;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = social.color;
                          e.currentTarget.style.borderColor = social.color;
                        }}
                      >
                        <SocialIcon className="text-lg sm:text-xl text-white" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="space-y-4 min-w-0 w-full">
              <div className="flex items-center gap-2 flex-wrap">
                <FiGlobe className="text-white text-lg sm:text-xl flex-shrink-0" />
                <h4 className="text-base sm:text-lg lg:text-xl font-semibold text-white break-words">Quick Links</h4>
              </div>
              <div className="space-y-3">
                {quickLinks.map((link, index) => {
                  const Icon = link.icon;
                  return (
                    <a 
                      key={index} 
                      href={link.href} 
                      className="flex items-start gap-3 text-emerald-100/70 hover:text-white text-sm sm:text-base font-normal group break-words hover:translate-x-1 transition-transform"
                    >
                      <Icon className="flex-shrink-0 text-lg group-hover:scale-100 transition-transform mt-0.5 text-white/90" />
                      <span className="min-w-0 flex-1 break-words leading-tight">{link.name}</span>
                    </a>
                  );
                })}
              </div>

              {/* Achievements */}
              <div className="mt-6 pt-6 border-t border-emerald-500/20 space-y-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <FiAward className="text-white text-lg flex-shrink-0" />
                  <h4 className="text-sm sm:text-base lg:text-lg font-semibold text-white break-words">Achievements</h4>
                </div>
                <div className="space-y-2">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="flex items-start gap-3 text-emerald-50/70 text-sm font-normal group">
                      <FiCheckCircle className="flex-shrink-0 text-lg mt-0.5 text-white" />
                      <span className="min-w-0 flex-1 break-words leading-relaxed">{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Column 4: Newsletter */}
            <div className="space-y-4 min-w-0 w-full">
              <div className="flex items-center gap-2 flex-wrap">
                <FiBell className="text-white text-lg sm:text-xl flex-shrink-0" />
                <h4 className="text-base sm:text-lg lg:text-xl font-semibold text-white break-words">Stay Updated</h4>
              </div>
              
              {/* Newsletter Subscription — refreshed feminine aesthetic (keeps behavior intact) */}
              <div className="bg-gradient-to-br from-emerald-950/50 via-emerald-900/40 to-black/20 rounded-xl p-6 border border-emerald-600/25">
                <div className="flex items-center gap-3 mb-4 flex-wrap">
                  <div className="p-3 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-lg flex-shrink-0 shadow-sm">
                    <FiBell className="text-white text-lg" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-base sm:text-lg font-semibold text-white break-words">School Newsletter</h4>
                    <p className="text-emerald-200/70 text-sm font-normal break-words">Get academic events & announcements</p>
                  </div>
                </div>

                <form onSubmit={handleSubscribe} className="space-y-3">
                  <div className="relative">
                    <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-200/60 text-lg flex-shrink-0" />
                    <input
                      type="email"
                      placeholder="your Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full pl-12 pr-4 py-3 bg-emerald-900/25 border-2 border-emerald-600/30 hover:border-emerald-500/50 focus:border-emerald-400 rounded-lg text-white placeholder-emerald-300/40 focus:outline-none focus:ring-2 focus:ring-emerald-400/20 transition-all text-sm sm:text-base font-normal"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting || !email}
                    className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 disabled:from-emerald-900/50 disabled:to-emerald-900/50 text-white py-3 rounded-lg font-medium text-sm sm:text-base transition-all disabled:cursor-not-allowed active:scale-[0.99] transform"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>submiting...</span>
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <FiCheckCircle className="text-lg" />
                        <span>Subscribe</span>
                      </span>
                    )}
                  </button>
                </form>

                {/* Success Message */}
                {showSuccess && (
                  <div className="mt-4 p-4 bg-emerald-700/20 border border-emerald-500/30 rounded-lg">
                    <div className="flex items-center gap-3 flex-wrap">
                      <FiCheckCircle className="text-emerald-100 text-lg flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="text-emerald-100 font-medium text-sm sm:text-base break-words">Successfully subscribed!</p>
                        <p className="text-emerald-200/80 text-sm font-normal break-words">You'll receive updates soon.</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="mt-12 lg:mt-16 pt-8 border-t border-emerald-500/20">
            <div className="flex flex-col gap-6 w-full">
              <div className="text-emerald-100/70 text-sm font-normal text-center break-words px-4">
                <p>© {currentYear} Matungulu Girls High School, Matungulu Machakos. All rights reserved.</p>
              </div>

              <div className="flex items-center justify-center gap-4 sm:gap-6 text-sm font-normal flex-wrap">
                <button 
                  onClick={() => setShowSitemap(true)} 
                  className="text-emerald-100/70 hover:text-white transition-colors flex items-center gap-2 hover:scale-100 whitespace-nowrap flex-shrink-0 px-2 py-1"
                >
                  <FiGlobe className="text-lg" />
                  <span className="break-words">Sitemap</span>
                </button>
                <button 
                  onClick={() => setShowPrivacy(true)} 
                  className="text-emerald-100/90 hover:text-white transition-colors flex items-center gap-2 hover:scale-100 whitespace-nowrap flex-shrink-0 px-2 py-1"
                >
                  <FiShield className="text-lg" />
                  <span className="break-words">Terms & Privacy</span>
                </button>
              </div>
            </div>

            <div className="mt-6 text-center text-sm text-white font-normal break-words px-4">
              <p>Accredited by the Ministry of Education • KNEC Centre Code: 12345678</p>
              <div className="flex items-center justify-center gap-2 mt-3 flex-wrap">
                <span>MatG....Commited to Excellence</span>
                <span className="text-lg">💚</span>
                <span>since 1955 • Strive to Excel</span>
              </div>

              <div className="mt-12 py-6 border-t border-emerald-500/20">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-4">
                  {/* Minimalist Brand Tag */}
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white">
                      System Architecture
                    </p>
                  </div>

                  {/* Modern Dev Credits */}
                  <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2">
                    <p className="text-[11px] font-bold text-white tracking-tight">
                      Developed by{" "}
                      <a 
                        href="https://www.linkedin.com/in/emmanuel-makau-40a12028b/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-white hover:text-white transition-colors duration-300 underline decoration-emerald-500/30 underline-offset-4"
                      >
                        Emmanuel Juma
                      </a>
                    </p>

                    {/* Social Links Bar */}
                    <div className="flex items-center gap-4 bg-emerald-500/5 backdrop-blur-md px-4 py-2 rounded-full border border-emerald-400/20 shadow-inner">
                      <a 
                        href="https://github.com/Emmanuel10701" 
                        className="text-white/50 hover:text-white transition-all hover:scale-110"
                        title="GitHub Profile"
                      >
                        <FiGithub size={14} />
                      </a>
                      <a 
                        href="mailto:emmanuelmakau90@gmail.com" 
                        className="text-white/90 hover:text-white transition-all hover:scale-110"
                        title="Email Developer"
                      >
                        <FiMail size={14} />
                      </a>
                      <a 
                        href="tel:+254793472960" 
                        className="text-white/90 hover:text-white transition-all hover:scale-110"
                        title="Call"
                      >
                        <FiPhone size={14} />
                      </a>
                      <div className="w-[1px] h-3 bg-emerald-400/10 mx-1" />
    
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Privacy Policy Modal */}
      {showPrivacy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto overflow-x-hidden">
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm" 
            onClick={() => setShowPrivacy(false)} 
          />
          
          <div className="relative bg-emerald-950/90 text-white rounded-[2rem] max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-emerald-500/30 p-5 sm:p-8 my-auto animate-slide-up">
            
            {/* Header */}
            <div className="flex justify-between items-center mb-6 border-b border-emerald-500/20 pb-4">
              <div className="flex items-center gap-2 min-w-0">
                <FiShield className="text-xl text-white shrink-0" />
                <h2 className="text-base sm:text-xl font-black uppercase tracking-tight truncate text-white">Privacy & Terms</h2>
              </div>
              <button 
                onClick={() => setShowPrivacy(false)} 
                className="p-2 hover:bg-emerald-500/20 rounded-full transition-all active:scale-90"
              >
                <FiX size={20} className="text-white" />
              </button>
            </div>

            <div className="space-y-4 sm:space-y-6">
              {/* Commitment Section */}
              <section className="bg-emerald-500/10 rounded-2xl p-4 sm:p-6 border border-emerald-500/20 hover:bg-emerald-500/15 transition-colors">
                <h3 className="text-[10px] font-black text-white uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                  <FiShield size={14}/> Commitment
                </h3>
                <p className="text-white text-xs sm:text-sm font-medium leading-relaxed italic">
                  "We are committed to protecting the privacy and security of all personal information in compliance with the Data Protection Act."
                </p>
              </section>

              {/* Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-emerald-500/10 rounded-2xl p-4 sm:p-6 border border-emerald-500/20">
                  <h3 className="text-[10px] font-black text-white uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                    <FiEye size={14} /> Collection
                  </h3>
                  <ul className="space-y-3">
                    {['Academic Records', 'Parent Contacts', 'Medical Info'].map((text, i) => (
                      <li key={i} className="flex items-center gap-3 text-xs text-white font-bold">
                        <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
                        {text}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-emerald-500/10 rounded-2xl p-4 sm:p-6 border border-emerald-500/20">
                  <h3 className="text-[10px] font-black text-white uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                    <FiDownload size={14} /> Protection
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { e: '🔐', t: 'Encrypted' },
                      { e: '🛡️', t: 'Secure' },
                      { e: '📊', t: 'Audits' },
                      { e: '👩‍🏫', t: 'Training' }
                    ].map((item, i) => (
                      <div key={i} className="bg-emerald-950/50 rounded-xl p-2 text-center border border-emerald-500/20">
                        <div className="text-sm mb-0.5">{item.e}</div>
                        <div className="text-[9px] font-black text-white/80 uppercase tracking-tighter">{item.t}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="mt-8 pt-6 border-t border-emerald-500/20">
              <div className="flex flex-row gap-3 items-center">
                <button 
                  onClick={() => setShowPrivacy(false)} 
                  className="flex-1 bg-emerald-500/20 hover:bg-emerald-500/30 text-white py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all active:scale-95 border border-emerald-500/30"
                >
                  Close
                </button>
                <button 
                  onClick={() => setShowPrivacy(false)} 
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all active:scale-95 text-center shadow-lg shadow-emerald-500/25"
                >
                  Agree
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sitemap Modal */}
      {showSitemap && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto overflow-x-hidden">
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm" 
            onClick={() => setShowSitemap(false)} 
          />
          
          <div className="relative bg-emerald-950/90 text-white rounded-[2rem] max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-emerald-500/30 p-5 sm:p-8 my-auto animate-slide-up">
            
            {/* Header */}
            <div className="flex justify-between items-center mb-6 border-b border-emerald-500/20 pb-4">
              <div className="flex items-center gap-2">
                <FiGlobe className="text-xl sm:text-2xl text-white" />
                <h2 className="text-base sm:text-xl font-black uppercase tracking-tight text-white">Navigation</h2>
              </div>
              <button 
                onClick={() => setShowSitemap(false)} 
                className="p-2 hover:bg-emerald-500/20 rounded-full transition-colors active:scale-90"
              >
                <FiX size={20} className="text-white" />
              </button>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {['Main Sections', 'Resources', 'Quick Links'].map((section, idx) => (
                <div key={idx} className="space-y-4">
                  <h3 className="text-[10px] font-black text-white uppercase tracking-[0.2em] flex items-center gap-2">
                    <span className="w-4 h-[1px] bg-emerald-500/50" /> {section}
                  </h3>
                  <div className="flex flex-col gap-1">
                    {(section === 'Main Sections' ? quickLinks.slice(0, 4) : 
                      section === 'Resources' ? resources.slice(0, 4) : 
                      quickLinks.slice(4)).map((item, index) => {
                      const Icon = item.icon;
                      return (
                        <a
                          key={index}
                          href={item.href}
                          className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-emerald-500/20 text-white hover:text-white transition-all group"
                          onClick={() => setShowSitemap(false)}
                        >
                          <div className="p-1.5 bg-emerald-500/10 rounded-lg group-hover:bg-emerald-500/30 transition-colors">
                            <Icon size={14} className="shrink-0 text-white" />
                          </div>
                          <span className="text-xs font-bold tracking-tight">{item.name}</span>
                        </a>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer Actions */}
            <div className="mt-8 pt-6 border-t border-emerald-500/20">
              <div className="flex flex-row gap-3 items-center">
                <button 
                  onClick={() => setShowSitemap(false)} 
                  className="flex-1 bg-emerald-500/20 hover:bg-emerald-500/30 text-white py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all active:scale-95 border border-emerald-500/30"
                >
                  Close
                </button>
                <a
                  href="/pages/contact"
                  onClick={() => setShowSitemap(false)}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all active:scale-95 text-center shadow-lg shadow-emerald-500/25"
                >
                  Contact
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
'use client';

import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Users, 
  BookOpen, 
  Target, 
  Globe, 
  ShieldCheck, 
  Send, 
  CheckCircle,
  ChevronRight, 
  ArrowRight,
  Sparkles,
  MessageSquare,
  Navigation,
  Calendar,
  Video,
  User,
  Book,
  Award,
  Star,
  ExternalLink,
  Zap,
  Heart,
  TrendingUp,
  Home,
  X,
  Loader2
} from 'lucide-react';
import CircularProgress from '@mui/material/CircularProgress';
import Image from "next/image";
import Link from "next/link";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    studentGrade: '',
    inquiryType: 'general',
    contactMethod: 'email'
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [isMapZoomed, setIsMapZoomed] = useState(false);

  const [rows, setRows] = useState(10);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) {
        setRows(5);
      }
    }
  }, []);

  const departments = [
    {
      id: 'admissions',
      name: 'Admissions Office',
      email: 'admissions@matungulu-girls.sc.ke',
      phone: '+254 720 123 456',
      description: 'For enrollment, applications, and admission inquiries. We guide students through the admission process.',
      icon: <User className="w-4 h-4" />,
      head: 'Mrs. Sarah Johnson',
      hours: 'Mon-Fri: 8:00 AM - 4:00 PM',
      color: 'emerald'
    },
    {
      id: 'academics',
      name: 'Academic Office',
      email: 'academics@matungulu-girls.sc.ke',
      phone: '+254 720 123 457',
      description: 'Curriculum, academic programs, examinations, and teacher coordination. Ensuring academic excellence.',
      icon: <Book className="w-4 h-4" />,
      head: 'Dr. Michael Chen',
      hours: 'Mon-Fri: 7:30 AM - 3:30 PM',
      color: 'emerald'
    },
    {
      id: 'student-affairs',
      name: 'Student Affairs',
      email: 'affairs@matungulu-girls.sc.ke',
      phone: '+254 720 123 458',
      description: 'Student welfare, discipline, counseling, and extracurricular activities. Building holistic students.',
      icon: <Users className="w-4 h-4" />,
      head: 'Mr. David Wilson',
      hours: 'Mon-Fri: 8:00 AM - 4:30 PM',
      color: 'emerald'
    },
    {
      id: 'sports',
      name: 'Sports Department',
      email: 'sports@matungulu-girls.sc.ke',
      phone: '+254 720 123 459',
      description: 'Athletics, sports programs, competitions, and physical education. Developing champions.',
      icon: <Award className="w-4 h-4" />,
      head: 'Coach Robert Garcia',
      hours: 'Mon-Sat: 6:00 AM - 6:00 PM',
      color: 'emerald'
    }
  ];

  const quickActions = [
    {
      icon: <User className="w-4 h-4" />,
      title: 'Apply for Admission',
      description: 'Start your application process',
      link: '/pages/apply-for-admissions',
      color: 'emerald'
    },
    {
      icon: <Calendar className="w-4 h-4" />,
      title: 'View Events Calendar',
      description: 'See upcoming school events',
      link: '/pages/eventsandnews',
      color: 'emerald'
    },
    {
      icon: <Book className="w-4 h-4" />,
      title: 'Explore Programs',
      description: 'Discover academic offerings',
      link: '/pages/admissions',
      color: 'emerald'
    },
    {
      icon: <Video className="w-4 h-4" />,
      title: 'Virtual Tour home page',
      description: 'Take a campus tour online',
      link: '/',
      color: 'emerald'
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      if (!formData.name || !formData.email || !formData.phone || !formData.subject || !formData.message) {
        throw new Error('Name, email, phone, subject, and message are required.');
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error('Please provide a valid email address.');
      }

      const phoneRegex = /^(07|01)\d{8}$/;
      const cleanedPhone = formData.phone.replace(/\s/g, '');
      if (!phoneRegex.test(cleanedPhone)) {
        throw new Error('Invalid phone format. Use 07XXXXXXXX or 01XXXXXXXX');
      }

      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: cleanedPhone,
        subject: formData.subject.trim(),
        message: formData.message.trim(),
        contactMethod: formData.contactMethod,
        studentGrade: formData.studentGrade?.trim() || '',
        inquiryType: formData.inquiryType,
        submittedAt: new Date().toISOString()
      };

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setSubmitStatus('success');
      setStatusMessage(data.message || 'Message sent successfully! Check your email for confirmation.');
      
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        studentGrade: '',
        inquiryType: 'general',
        contactMethod: 'email'
      });

      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);

    } catch (error) {
      setSubmitStatus('error');
      setStatusMessage(error.message || 'Failed to send message. Please try again.');
      
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const closeDepartmentModal = () => {
    setSelectedDepartment(null);
  };

  const openDepartmentModal = (dept) => {
    setSelectedDepartment(dept);
  };

  return (
    <div className="bg-white text-slate-900 min-h-screen relative">
      {/* Hero Section - Matched to About Page Style */}
      <section className="relative min-h-[60vh] sm:min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-950 via-teal-950 to-green-950">
        {/* Background with Zoom Effect */}
        <div className="absolute inset-0 group overflow-hidden rounded-t-md">
          {/* Modern Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/30 via-emerald-950/80 to-emerald-950 z-20"></div>
          
          <Image
      src="/hero/MatG1.jpg"
            alt="Campus"
            fill
            className="object-cover opacity-50 transition-transform duration-[10s] ease-out group-hover:scale-110"
            priority
          />

          {/* Animated Radial Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-600/20 rounded-full blur-[120px] z-10"></div>
        </div>

        <div className="relative z-20 max-w-5xl mx-auto text-center px-4">
          {/* Modern Static Badge */}
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-emerald-500/10 border border-emerald-400/20 backdrop-blur-md mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] font-black tracking-[0.3em] text-emerald-200 uppercase">
              Academic Excellence Since 1978
            </span>
          </div>

          {/* Refined Title */}
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-black text-white mb-6 tracking-tighter leading-none">
            Matungulu Girls <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-300 to-white/70">High School.</span>
          </h1>

          {/* Rich Description */}
          <div className="max-w-3xl mx-auto space-y-6 mb-8">
            <p className="text-sm md:text-base text-slate-200 font-medium leading-relaxed">
              Where <span className="text-emerald-400">excellence meets opportunity</span> in the heart of Matungulu, Machakos.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 pt-6 border-t border-white/10">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">100%</div>
                <div className="text-xs uppercase tracking-wider text-slate-300 font-medium">KCSE Pass Rate</div>
              </div>
              <div className="hidden sm:block w-px h-8 bg-white/20"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">1:15</div>
                <div className="text-xs uppercase tracking-wider text-slate-300 font-medium">Teacher Ratio</div>
              </div>
              <div className="hidden sm:block w-px h-8 bg-white/20"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">STEM+</div>
                <div className="text-xs uppercase tracking-wider text-slate-300 font-medium">Accredited</div>
              </div>
            </div>
          </div>

          {/* MODERN ACTION DOCK */}
          <div className="flex flex-row gap-2 sm:gap-4 justify-center items-center w-full px-2 mt-6">
            
            <Link href="/pages/apply-for-admissions" passHref className="flex-1 sm:flex-none">
              <button className="w-full sm:w-auto px-4 sm:px-10 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-[11px] sm:text-sm font-black rounded-xl sm:rounded-2xl shadow-lg shadow-emerald-900/20 flex items-center justify-center gap-2 transition-transform active:scale-95 whitespace-nowrap">
                Apply Now <ArrowRight size={16} className="shrink-0" />
              </button>
            </Link>

            <Link href="/pages/admissions" passHref className="flex-1 sm:flex-none">
              <button className="w-full sm:w-auto px-4 sm:px-10 py-3 bg-slate-900 text-white text-[11px] sm:text-sm font-black rounded-xl sm:rounded-2xl border border-white/10 shadow-xl flex items-center justify-center transition-transform active:scale-95 whitespace-nowrap">
                View Programs
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-2xl shadow-slate-200/50 border border-slate-100">
              <div className="mb-10">
                <span className="inline-block px-4 py-2 mb-5 text-[9px] sm:text-[10px] font-black tracking-[0.2em] text-emerald-700 uppercase bg-emerald-50 rounded-full border border-emerald-100">
                  Contact Support
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4 tracking-tight">
                  Get in Touch <span className="text-emerald-600">Directly</span>
                </h2>
                <p className="text-slate-500 text-sm sm:text-base leading-relaxed max-w-xl">
                  Have a question or need assistance? Fill out the form and our team will respond within 24 hours.
                </p>
              </div>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="mb-8 p-6 bg-emerald-50 border-2 border-emerald-200 rounded-2xl animate-fade-in">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                    <div>
                      <p className="text-emerald-800 font-black text-sm sm:text-base">Success!</p>
                      <p className="text-emerald-700 text-xs sm:text-sm">{statusMessage}</p>
                    </div>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-8 p-6 bg-red-50 border-2 border-red-200 rounded-2xl animate-fade-in">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 flex items-center justify-center">
                      <div className="w-2 h-2 bg-red-600 rounded-full animate-ping" />
                    </div>
                    <div>
                      <p className="text-red-800 font-black text-sm sm:text-base">Error</p>
                      <p className="text-red-700 text-xs sm:text-sm">{statusMessage}</p>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                {/* Row 1: Name & Email */}
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-1 sm:space-y-2">
                    <label className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-slate-700 ml-1">
                      Full Name <span className="text-emerald-600">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm font-medium placeholder-slate-400 focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:border-transparent transition-all outline-none"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <label className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-slate-700 ml-1">
                      Email Address <span className="text-emerald-600">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm font-medium placeholder-slate-400 focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:border-transparent transition-all outline-none"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                {/* Row 2: Phone & Student Grade */}
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-1 sm:space-y-2">
                    <label className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-slate-700 ml-1">
                      Phone Number <span className="text-emerald-600">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm font-medium placeholder-slate-400 focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:border-transparent transition-all outline-none"
                      placeholder="0712 345 678"
                    />
                    <p className="text-[8px] sm:text-[10px] text-slate-500 ml-2 font-medium">Format: 07XXXXXXXX or 01XXXXXXXX</p>
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <label className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-slate-700 ml-1">
                      Student Grade
                    </label>
                    <select
                      name="studentGrade"
                      value={formData.studentGrade}
                      onChange={handleInputChange}
                      className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none appearance-none"
                    >
                      <option value="">Select Grade</option>
                      <option value="Form 1">Form 1</option>
                      <option value="Form 2">Form 2</option>
                      <option value="Form 3">Form 3</option>
                      <option value="Form 4">Form 4</option>
                    </select>
                  </div>
                </div>

                {/* Row 3: Inquiry Type & Contact Method */}
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-1 sm:space-y-2">
                    <label className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-slate-700 ml-1">
                      Inquiry Type <span className="text-emerald-600">*</span>
                    </label>
                    <select
                      name="inquiryType"
                      required
                      value={formData.inquiryType}
                      onChange={handleInputChange}
                      className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none appearance-none"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="admissions">Admissions</option>
                      <option value="academics">Academics</option>
                      <option value="fees">Fees & Payments</option>
                      <option value="sports">Sports & Activities</option>
                      <option value="facilities">Facilities</option>
                      <option value="alumni">Alumni Affairs</option>
                    </select>
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <label className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-slate-700 ml-1">
                      Preferred Contact Method
                    </label>
                    <select
                      name="contactMethod"
                      value={formData.contactMethod}
                      onChange={handleInputChange}
                      className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none appearance-none"
                    >
                      <option value="email">Email</option>
                      <option value="phone">Phone Call</option>
                      <option value="sms">SMS</option>
                    </select>
                  </div>
                </div>

                {/* Row 4: Subject */}
                <div className="space-y-1 sm:space-y-2">
                  <label className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-slate-700 ml-1">
                    Subject <span className="text-emerald-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm font-medium placeholder-slate-400 focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:border-transparent transition-all outline-none"
                    placeholder="What is this regarding?"
                  />
                </div>

                {/* Row 5: Message */}
                <div className="space-y-1 sm:space-y-2">
                  <label className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-slate-700 ml-1">
                    Message <span className="text-emerald-600">*</span>
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={rows} 
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm font-medium placeholder-slate-400 focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none resize-none"
                    placeholder="How can we help you today?"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 sm:px-10 py-3 sm:py-4 bg-emerald-600 text-white font-black text-[11px] sm:text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-emerald-900/20 hover:shadow-emerald-900/30 active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <CircularProgress size={16} color="inherit" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send size={14} className="text-emerald-200" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Right Column: Information & Actions */}
          <div className="lg:col-span-4 space-y-8">
            {/* Departments Card - Matched to About Page Style */}
            <div className="bg-gradient-to-br from-emerald-900 to-emerald-800 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-white/10 rounded-xl">
                    <Users className="w-5 h-5 text-emerald-400" />
                  </div>
                  <h3 className="text-sm font-black uppercase tracking-wider">Departments</h3>
                </div>

                <div className="space-y-4">
                  {departments.map((dept) => (
                    <div 
                      key={dept.id} 
                      className="group pb-4 border-b border-white/5 last:border-0 last:pb-0 cursor-pointer"
                      onClick={() => openDepartmentModal(dept)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-black text-white text-xs uppercase tracking-wide group-hover:text-emerald-400 transition-colors">
                          {dept.name}
                        </h4>
                      </div>
                      
                      <div className="flex justify-end">
                        <button className="px-3 py-1 text-[8px] font-black uppercase tracking-wider text-emerald-200 bg-white/5 border border-white/10 hover:bg-white/20 hover:border-white/20 rounded-full flex items-center gap-1 transition-all duration-300 active:scale-95">
                          View details
                          <ChevronRight size={10} className="text-emerald-400 group-hover:translate-x-0.5 transition-transform" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions Card */}
            <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden">
              {/* Decorative circles */}
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-emerald-400/20 rounded-full blur-3xl"></div>
              <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-emerald-800/20 rounded-full blur-3xl"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-white/10 rounded-xl">
                    <Sparkles className="w-5 h-5 text-emerald-200" />
                  </div>
                  <h3 className="text-sm font-black uppercase tracking-wider">Quick Actions</h3>
                </div>
                
                <div className="grid gap-2">
                  {quickActions.map((action, idx) => (
                    <Link 
                      key={idx} 
                      href={action.link}
                      className="flex items-center justify-between p-3 bg-white/10 rounded-xl border border-white/10 hover:bg-white/15 active:scale-[0.98] transition-all"
                    >
                      <div className="flex items-center gap-2">
                        {action.icon}
                        <span className="font-black text-xs uppercase tracking-wide">{action.title}</span>
                      </div>
                      <ArrowRight size={12} className="text-emerald-200" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Info Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-emerald-100 rounded-xl">
                  <Phone className="w-5 h-5 text-emerald-600" />
                </div>
                <h3 className="text-sm font-black uppercase tracking-wider text-slate-900">Direct Contact</h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center flex-shrink-0">
                    <Phone size={14} className="text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-[8px] font-black uppercase tracking-wider text-slate-400 mb-1">Call Us</p>
                    <p className="text-xs font-bold text-slate-800">+254 720 123 456</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center flex-shrink-0">
                    <Mail size={14} className="text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-[8px] font-black uppercase tracking-wider text-slate-400 mb-1">Email Us</p>
                    <p className="text-xs font-bold text-slate-800">info@matungulu-girls.sc.ke</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center flex-shrink-0">
                    <MapPin size={14} className="text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-[8px] font-black uppercase tracking-wider text-slate-400 mb-1">Visit Us</p>
                    <p className="text-xs font-bold text-slate-800">Matungulu, Machakos County</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center flex-shrink-0">
                    <Clock size={14} className="text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-[8px] font-black uppercase tracking-wider text-slate-400 mb-1">Office Hours</p>
                    <p className="text-xs font-bold text-slate-800">Mon-Fri: 7:30 AM - 4:30 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Department Detail Modal - Matched to About Page Style */}
      {selectedDepartment && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-emerald-950/60 backdrop-blur-md"
            onClick={closeDepartmentModal}
          />

          {/* Modal Container */}
          <div className="relative bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="p-6 sm:p-8">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-lg">
                    {React.cloneElement(selectedDepartment.icon, { size: 20 })}
                  </div>
                  <div>
                    <h3 className="text-base font-black text-slate-900 tracking-tight">
                      {selectedDepartment.name}
                    </h3>
                    <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">
                      Department Profile
                    </span>
                  </div>
                </div>
                <button
                  onClick={closeDepartmentModal}
                  className="p-2 bg-slate-100 text-slate-600 rounded-full hover:bg-slate-200 transition-all active:scale-90"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Content */}
              <div className="space-y-6">
                {/* Quick Info Grid */}
                <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div>
                    <p className="text-[8px] font-black uppercase tracking-widest text-slate-400 mb-1">
                      Department Head
                    </p>
                    <p className="text-slate-900 font-black text-xs">{selectedDepartment.head}</p>
                  </div>
                  <div>
                    <p className="text-[8px] font-black uppercase tracking-widest text-slate-400 mb-1">
                      Office Hours
                    </p>
                    <p className="text-slate-900 font-black text-xs">{selectedDepartment.hours}</p>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <p className="text-[8px] font-black uppercase tracking-widest text-slate-400 mb-2">
                    About the Department
                  </p>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    {selectedDepartment.description}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-row gap-3 pt-2">
                  <a
                    href={`mailto:${selectedDepartment.email}`}
                    className="flex items-center justify-center gap-2 flex-1 bg-slate-900 text-white py-3 rounded-xl text-[10px] font-black uppercase tracking-wider shadow-lg shadow-slate-900/10 hover:shadow-slate-900/20 transition-all text-center"
                  >
                    <Mail className="w-3 h-3 text-emerald-400 shrink-0" />
                    <span>Email</span>
                  </a>
                  
                  <a
                    href={`tel:${selectedDepartment.phone.replace(/\s+/g, '')}`}
                    className="flex items-center justify-center gap-2 flex-1 bg-gradient-to-r from-emerald-600 to-emerald-600 text-white py-3 rounded-xl text-[10px] font-black uppercase tracking-wider shadow-lg shadow-emerald-600/10 hover:shadow-emerald-600/20 transition-all text-center"
                  >
                    <Phone className="w-3 h-3 shrink-0" />
                    <span>Call</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Navigation Footer */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-40 shadow-lg">
        <div className="flex justify-around p-2">
          <Link href="/" className="flex flex-col items-center text-slate-600 hover:text-emerald-600 transition-colors p-2">
            <Home className="w-5 h-5" />
            <span className="text-[8px] mt-1 font-black uppercase tracking-wider">Home</span>
          </Link>
          <a href="tel:+254720123456" className="flex flex-col items-center text-slate-600 hover:text-emerald-600 transition-colors p-2">
            <Phone className="w-5 h-5" />
            <span className="text-[8px] mt-1 font-black uppercase tracking-wider">Call</span>
          </a>
          <button 
            onClick={() => document.querySelector('form')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex flex-col items-center text-slate-600 hover:text-emerald-600 transition-colors p-2"
          >
            <MessageSquare className="w-5 h-5" />
            <span className="text-[8px] mt-1 font-black uppercase tracking-wider">Message</span>
          </button>
          <a href="mailto:admissions@matungulu-girls.sc.ke" className="flex flex-col items-center text-slate-600 hover:text-emerald-600 transition-colors p-2">
            <Mail className="w-5 h-5" />
            <span className="text-[8px] mt-1 font-black uppercase tracking-wider">Email</span>
          </a>
        </div>
      </div>

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

        /* Responsive adjustments */
        @media (max-width: 640px) {
          html {
            font-size: 14px;
          }
          
          .rounded-3xl {
            border-radius: 1.5rem !important;
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
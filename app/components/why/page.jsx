"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { 
  FiAward, 
  FiBook, 
  FiHeart, 
  FiMapPin, 
  FiUsers, 
  FiCalendar,
  FiShield,
  FiStar,
  FiTrendingUp,
  FiGlobe,
  FiMail,
  FiPhone,
  FiArrowRight
} from 'react-icons/fi';

const ModernSchoolLayout = () => {
  const router = useRouter();
  
  const handleExplorePathways = () => {
    router.push("/pages/admissions");
  };

  const whyChooseUs = [
    {
      title: "Academic Excellence",
      gradient: "from-emerald-600 to-emerald-500",
      description: "Consistently ranked among top-performing girls' schools in Machakos County with impressive KCSE results and university placements.",
      metrics: "Top Performer Machakos County",
      icon: <FiAward className="w-4 h-4" />
    },
    {
      title: "Holistic Development",
      gradient: "from-emerald-600 to-emerald-500",
      description: "Balancing academic rigor with spiritual growth, sports, music, drama, and leadership programs for well-rounded individuals.",
      metrics: "Complete Education",
      icon: <FiUsers className="w-4 h-4" />
    },
    {
      title: "Christian Values",
      gradient: "from-emerald-600 to-emerald-500",
      description: "Founded on strong Christian principles, nurturing students with moral integrity, discipline, and service to community.",
      metrics: "Values-Based Education",
      icon: <FiHeart className="w-4 h-4" />
    },
    {
      title: "Modern Facilities",
      gradient: "from-emerald-600 to-emerald-500",
      description: "Well-equipped science laboratories, computer labs, library, and serene learning environment in Matungulu's beautiful landscape.",
      metrics: "Premier Infrastructure",
      icon: <FiGlobe className="w-4 h-4" />
    }
  ];

  const schoolFeatures = [
    {
      title: "Proven Academic Excellence",
      gradient: "from-emerald-600 to-emerald-500",
      description: "Matungulu Girls High School maintains outstanding academic performance with consistent high KCSE results. Our dedicated faculty and rigorous curriculum ensure students excel in sciences, humanities, and technical subjects.",
      highlight: "Academic Distinction",
      details: ["Mean Score 8.5+", "University Transition", "Merit Awards", "Science Excellence"],
      metrics: ["92% KCSE", "150+ Univ", "45 Awards"],
      icon: <FiAward />
    },
    {
      title: "Experienced Teaching Faculty",
      gradient: "from-emerald-600 to-emerald-500",
      description: "Our team comprises qualified, experienced educators with specialized training in girl-child education. Small teacher-student ratios ensure personalized attention and mentorship.",
      highlight: "Qualified Educators",
      details: ["TSC Certified", "Subject Specialists", "Mentorship", "Continuous Training"],
      metrics: ["45 Teachers", "18+ Years", "100% TSC"],
      icon: <FiUsers />
    },
    {
      title: "Modern Learning Environment",
      gradient: "from-emerald-600 to-emerald-500",
      description: "Located in scenic Matungulu, our campus features well-equipped science laboratories, computer labs, digital resources, and spacious classrooms that create an ideal atmosphere for learning.",
      highlight: "Advanced Facilities",
      details: ["3 Science Labs", "2 Computer Labs", "Library", "Sports Fields"],
      metrics: ["3 Labs", "2 Comp Labs", "8,000 Books"],
      icon: <FiMapPin />
    },
    {
      title: "Comprehensive Co-curricular",
      gradient: "from-emerald-600 to-emerald-500",
      description: "We offer diverse extracurricular activities including sports, music, drama, clubs, and leadership programs that develop talents, confidence, and teamwork skills.",
      highlight: "15+ Activities",
      details: ["Athletics", "Ball Games", "Music & Drama", "Journalism"],
      metrics: ["8 Sports", "15 Clubs", "Annual Events"],
      icon: <FiStar />
    },
    {
      title: "Spiritual & Moral Formation",
      gradient: "from-emerald-600 to-emerald-500",
      description: "As a Christian institution, we emphasize spiritual growth, moral values, and character development. Regular religious education, retreats, and community service build responsible citizens.",
      highlight: "Values Education",
      details: ["Christian Teachings", "Character Building", "Community Service", "Retreats"],
      metrics: ["Weekly Mass", "Annual Retreats", "Outreach"],
      icon: <FiHeart />
    },
    {
      title: "University & Career Preparation",
      gradient: "from-emerald-700 to-emerald-600",
      description: "We provide comprehensive career guidance, university linkage programs, and mentorship partnerships with leading Kenyan universities to ensure smooth transition to higher education.",
      highlight: "University Pathways",
      details: ["Career Counseling", "University Tours", "Alumni Network", "Scholarships"],
      metrics: ["15+ Partners", "Career Fairs", "Alumni Success"],
      isPremium: true,
      icon: <FiTrendingUp />
    }
  ];

  return (
    <div className="bg-white py-12 sm:py-16 md:py-20 px-3 sm:px-4 md:px-6 lg:px-8 font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* --- HERO SECTION --- */}
        <section className="mb-16 sm:mb-20 md:mb-24">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-full border border-emerald-200">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[9px] font-black tracking-[0.2em] text-emerald-700 uppercase">
                  Matungulu Girls High School
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 leading-[1.1] tracking-tight">
                Excellence in Education, <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-500">
                  Character in Action.
                </span>
              </h1>

              <p className="text-slate-600 text-sm sm:text-base md:text-lg max-w-xl leading-relaxed">
                Located in the heart of Matungulu, Machakos County, we are dedicated to nurturing 
                young women into confident, compassionate, and accomplished leaders.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <div className="flex items-center gap-2">
                  <FiMapPin className="text-emerald-600" size={16} />
                  <span className="text-xs text-slate-600">Matungulu, Machakos County</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiPhone className="text-emerald-600" size={16} />
                  <span className="text-xs text-slate-600">+254 720 123 456</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
                {[
                  { label: 'Students', value: '1,200+' },
                  { label: 'Teachers', value: '45' },
                  { label: 'KCSE Mean', value: '8.5' },
                  { label: 'Established', value: '1985' }
                ].map((stat, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <p className="text-lg font-black text-emerald-600">{stat.value}</p>
                    <p className="text-[8px] font-black uppercase tracking-wider text-slate-400">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative h-[400px] rounded-[2rem] overflow-hidden shadow-2xl">
              <Image
                src="/hero/matG1.jpg"
                alt="Matungulu Girls High School"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="backdrop-blur-md bg-white/10 p-4 rounded-xl border border-white/20">
                  <p className="text-white text-lg font-black tracking-tight">Matungulu Girls High School</p>
                  <p className="text-white/70 text-xs font-bold uppercase tracking-wider">Strive to Excel</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- WHY CHOOSE US SECTION --- */}
        <section className="mb-16 sm:mb-20 md:mb-24">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-3">
              Why Choose Matungulu Girls?
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              A premier girls' boarding school committed to academic excellence and holistic development
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {whyChooseUs.map((item, idx) => (
              <div key={idx} className="group bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white mb-4 shadow-lg`}>
                  {item.icon}
                </div>
                <h4 className="font-black text-slate-900 text-sm mb-2">{item.title}</h4>
                <p className="text-slate-600 text-xs leading-relaxed mb-3">
                  {item.description}
                </p>
                <span className="text-[9px] font-black uppercase text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                  {item.metrics}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* --- SCHOOL FEATURES: BENTO GRID --- */}
        <section>
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-3">
              Our Educational Pillars
            </h3>
            <p className="text-slate-600 text-sm sm:text-base">
              Building academic excellence, strong character, and future-ready skills
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            {schoolFeatures.map((feature, index) => {
              const spans = ["md:col-span-3", "md:col-span-3", "md:col-span-2", "md:col-span-2", "md:col-span-2", "md:col-span-6"];
              const isDark = feature.isPremium;
              
              return (
                <div 
                  key={index} 
                  className={`${spans[index] || "md:col-span-2"} relative overflow-hidden ${
                    isDark ? 'bg-emerald-900 text-white' : 'bg-white text-slate-900'
                  } border ${isDark ? 'border-emerald-800' : 'border-slate-200'} rounded-2xl p-5 group hover:border-emerald-400 transition-all duration-300 shadow-sm`}
                >
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.gradient} opacity-[0.03] group-hover:opacity-10 transition-opacity rounded-bl-full`}></div>
                  
                  <div className="relative z-10 flex flex-col h-full">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white shadow-lg mb-4`}>
                      {feature.icon && React.cloneElement(feature.icon, { className: "w-5 h-5" })}
                    </div>

                    <div className="mb-3">
                      <span className={`text-[8px] font-black ${
                        isDark ? 'text-emerald-300' : 'text-emerald-600'
                      } uppercase tracking-widest mb-1 block`}>
                        {feature.highlight}
                      </span>
                      <h4 className="text-base font-black tracking-tight leading-tight mb-2">
                        {feature.title}
                      </h4>
                      <p className={`${
                        isDark ? 'text-emerald-100' : 'text-slate-600'
                      } text-xs leading-relaxed line-clamp-3`}>
                        {feature.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1 mt-auto pt-3">
                      {feature.details.map((detail, dIdx) => (
                        <span key={dIdx} className={`px-2 py-0.5 ${
                          isDark ? 'bg-emerald-800 text-emerald-100' : 'bg-slate-50 text-slate-600'
                        } border ${isDark ? 'border-emerald-700' : 'border-slate-100'} rounded-full text-[8px] font-bold uppercase`}>
                          {detail}
                        </span>
                      ))}
                    </div>

                    {isDark && (
                      <div className="mt-4 flex items-center justify-between border-t border-emerald-800 pt-4">
                        <button 
                          onClick={handleExplorePathways} 
                          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-[9px] font-black uppercase tracking-wider transition-all shadow-lg active:scale-95"
                        >
                          Apply Now
                          <FiArrowRight size={12} />
                        </button>
                        <div className="text-emerald-300 text-[10px] font-bold">
                          Limited Slots
                        </div>
                      </div>
                    )}

                    <div className={`mt-4 flex items-center justify-between border-t ${
                      isDark ? 'border-emerald-800' : 'border-slate-100'
                    } pt-3`}>
                      {feature.metrics.map((metric, mIdx) => (
                        <div key={mIdx} className="text-center">
                          <p className={`text-xs font-black ${
                            isDark ? 'text-white' : 'text-slate-800'
                          }`}>
                            {metric.split(' ')[0]}
                          </p>
                          <p className={`text-[7px] ${
                            isDark ? 'text-emerald-300' : 'text-slate-400'
                          } font-bold uppercase tracking-tight`}>
                            {metric.split(' ').slice(1).join(' ')}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Call to Action */}
          <div className="mt-8 text-center">
            <button
              onClick={handleExplorePathways}
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl font-black text-xs uppercase tracking-wider shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-all active:scale-95"
            >
              Explore All Programs
              <FiArrowRight size={14} />
            </button>
          </div>
        </section>

        {/* School Info Footer */}
        <footer className="mt-16 pt-8 border-t border-slate-200">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-[10px] font-medium">
              © {new Date().getFullYear()} Matungulu Girls High School. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <span className="text-[9px] font-black uppercase text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                Strive to Excel
              </span>
              <span className="text-[9px] text-slate-400">Est. 1955</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ModernSchoolLayout;
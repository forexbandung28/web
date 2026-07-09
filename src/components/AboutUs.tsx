import React, { useState } from 'react';
import { Target, Compass, Users, Sparkles, Shield, Camera, Heart, Truck, Award, Leaf } from 'lucide-react';
import { useAdminData } from '../context/AdminDataContext';

const renderIcon = (iconName: string, className: string = "w-5 h-5") => {
  switch (iconName?.toLowerCase()) {
    case 'award': return <Award className={className} />;
    case 'users': return <Users className={className} />;
    case 'camera': return <Camera className={className} />;
    case 'heart': return <Heart className={className} />;
    case 'truck': return <Truck className={className} />;
    case 'shield': return <Shield className={className} />;
    case 'target': return <Target className={className} />;
    case 'leaf': return <Leaf className={className} />;
    case 'compass': return <Compass className={className} />;
    case 'sparkles': return <Sparkles className={className} />;
    default: return <Award className={className} />;
  }
};

export const AboutUs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'why' | 'values'>('profile');
  const { cmsData } = useAdminData();

  const defaultReasons = [
    {
      id: 'r1',
      title: 'PROGRAM BERKUALITAS',
      description: 'Program dirancang sesuai kebutuhan dengan pendekatan fun, learning, dan experience.',
      icon: 'award'
    },
    {
      id: 'r2',
      title: 'FASILITATOR HANDAL',
      description: 'Dipandu oleh fasilitator bersertifikasi dan berpengalaman dalam team building & leadership.',
      icon: 'users'
    },
    {
      id: 'r3',
      title: 'DOKUMENTASI PROFESIONAL',
      description: 'Momen terbaik Anda kami abadikan secara profesional dengan foto, video, dan drone.',
      icon: 'camera'
    },
    {
      id: 'r4',
      title: 'MEDICAL SUPPORT',
      description: 'Didukung tim medis & peralatan standar untuk memastikan keamanan peserta.',
      icon: 'heart'
    },
    {
      id: 'r5',
      title: 'LAYANAN LENGKAP',
      description: 'Transportasi, konsumsi, akomodasi, hiburan, hingga perlengkapan kegiatan tersedia.',
      icon: 'truck'
    }
  ];

  const defaultValues = [
    {
      title: 'Berpengalaman & Profesional',
      desc: 'Tim kami terdiri dari fasilitator berpengalaman di bidang outdoor, pelatihan, dan event management.',
      icon: 'award'
    },
    {
      title: 'Aman & Terpercaya',
      desc: 'Keselamatan adalah prioritas utama dalam setiap kegiatan yang kami selenggarakan.',
      icon: 'shield'
    },
    {
      title: 'Berorientasi pada Dampak',
      desc: 'Setiap program dirancang untuk memberikan pengalaman yang bermakna dan berdampak.',
      icon: 'target'
    },
    {
      title: 'Peduli Alam',
      desc: 'Kami berkomitmen menjaga kelestarian alam dalam setiap kegiatan luar ruang.',
      icon: 'leaf'
    }
  ];

  const about = cmsData?.about || {
    description: 'JWest Adventure adalah penyedia layanan outdoor experience yang berkomitmen menghadirkan pengalaman terbaik di alam untuk individu, komunitas, dan perusahaan.',
    highlightTitle: 'Adventure with Purpose, Impact that Lasts',
    highlightDesc: 'Kami percaya bahwa alam adalah ruang terbaik untuk belajar, bertumbuh, dan membangun koneksi yang lebih kuat. Dengan tim profesional dan berpengalaman, kami merancang setiap program untuk menciptakan pengalaman yang aman, bermakna, dan berdampak positif bagi setiap peserta.',
    image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=1000&q=80',
    reasons: defaultReasons,
    values: defaultValues
  };

  const reasonsList = about.reasons && about.reasons.length > 0 ? about.reasons : defaultReasons;
  const valuesList = about.values && about.values.length > 0 ? about.values : defaultValues;

  return (
    <section id="about-us" className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Horizontal Navigation Tab Bar for Interactive exploration */}
        <div className="flex justify-center gap-4 mb-12 border-b border-gray-100 pb-4">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-6 py-3 rounded-xl text-sm font-bold tracking-tight transition-all duration-300 ${
              activeTab === 'profile'
                ? 'bg-[#102a1b] text-white shadow-md'
                : 'text-[#2d5a3b] hover:bg-emerald-50'
            }`}
          >
            Profil Perusahaan
          </button>
          <button
            onClick={() => setActiveTab('why')}
            className={`px-6 py-3 rounded-xl text-sm font-bold tracking-tight transition-all duration-300 ${
              activeTab === 'why'
                ? 'bg-[#102a1b] text-white shadow-md'
                : 'text-[#2d5a3b] hover:bg-emerald-50'
            }`}
          >
            Mengapa Memilih Kami?
          </button>
          <button
            onClick={() => setActiveTab('values')}
            className={`px-6 py-3 rounded-xl text-sm font-bold tracking-tight transition-all duration-300 ${
              activeTab === 'values'
                ? 'bg-[#102a1b] text-white shadow-md'
                : 'text-[#2d5a3b] hover:bg-emerald-50'
            }`}
          >
            Nilai & Komitmen Kami
          </button>
        </div>

        {/* Content based on Active Tab */}
        {activeTab === 'profile' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Side: About Us Main Column */}
            <div className="lg:col-span-5">
              <span className="text-[#3d7c51] font-sans text-xs font-black tracking-widest uppercase mb-2 block">
                WHO WE ARE
              </span>
              <h2 className="text-4xl md:text-5xl font-display font-black text-[#102a1b] tracking-tight mb-6 uppercase leading-none">
                ABOUT US
              </h2>
              <div className="w-16 h-1.5 bg-[#3d7c51] rounded-full mb-6" />
              <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-6 font-sans">
                {about.description}
              </p>
              
              <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 shadow-sm">
                <h4 className="text-base font-display font-bold text-[#102a1b] mb-2 flex items-center gap-2">
                  <Compass className="w-5 h-5 text-[#3d7c51]" />
                  {about.highlightTitle}
                </h4>
                <p className="text-xs md:text-sm text-[#2d5a3b] leading-relaxed font-sans">
                  {about.highlightDesc}
                </p>
              </div>
            </div>


            {/* Right Side: Group Portrait collage */}
            <div className="lg:col-span-7 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white max-w-xl mx-auto">
                <img
                  src={about.image}
                  alt="Outdoor gathering team"
                  className="w-full h-[360px] md:h-[420px] object-cover scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent pointer-events-none" />
                
                {/* JWest Sign Stamp */}
                <div className="absolute bottom-6 right-6 bg-[#102a1b]/90 backdrop-blur-sm border border-white/20 px-4 py-2.5 rounded-xl text-white">
                  <span className="text-[10px] font-sans font-bold tracking-[0.2em] text-[#a3e635] block uppercase mb-1">
                    Verified Provider
                  </span>
                  <span className="text-sm font-display font-black block tracking-tight leading-none">
                    WHEN NATURE BUILDS STRONGER TEAMS
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'why' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Side: Gorgeous themed cover block */}
            <div className="lg:col-span-5 bg-[#102a1b] rounded-3xl p-8 md:p-10 text-white relative overflow-hidden shadow-xl min-h-[360px] flex flex-col justify-between">
              <div className="absolute inset-0 opacity-10">
                <img
                  src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80"
                  alt="Mist mountains decoration"
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="relative z-10">
                <span className="text-[#a3e635] text-xs font-black uppercase tracking-widest block mb-2">OUR ADVANTAGE</span>
                <h3 className="text-3xl font-display font-black tracking-tight leading-tight mb-4 uppercase">
                  MENGAPA MEMILIH JWEST ADVENTURE?
                </h3>
                <p className="text-gray-300 text-xs md:text-sm leading-relaxed font-sans">
                  Kami mengintegrasikan layanan profesional, kurikulum terstruktur, keamanan ketat, dan dokumentasi lengkap agar setiap detik kegiatan Anda bernilai tinggi.
                </p>
              </div>

              <div className="relative z-10 border-t border-white/10 pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#a3e635]/15 flex items-center justify-center text-[#a3e635]">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-gray-200">Garansi Keselamatan</h5>
                    <p className="text-[11px] text-gray-400 font-sans">Semua program berstandar SOP SAR Nasional</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Reason Cards List */}
            <div className="lg:col-span-7 space-y-4">
              {reasonsList.map((item, idx) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-5 rounded-2xl bg-gray-50 hover:bg-emerald-50/50 border border-transparent hover:border-emerald-100 transition-all duration-300"
                >
                  <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-[#102a1b] flex items-center justify-center shadow-md">
                    {renderIcon(item.icon, "w-5 h-5 text-[#a3e635]")}
                  </div>
                  <div>
                    <h4 className="text-sm font-display font-extrabold text-[#102a1b] tracking-wider mb-1">
                      {item.title}
                    </h4>
                    <p className="text-xs md:text-sm text-gray-600 font-sans leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'values' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Side: Commitment & Values list */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {valuesList.map((val, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col justify-between"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center mb-4 text-[#3d7c51]">
                    {renderIcon(val.icon, "w-5 h-5 text-[#3d7c51]")}
                  </div>
                  <div>
                    <h4 className="text-sm font-display font-extrabold text-[#102a1b] mb-1.5">{val.title}</h4>
                    <p className="text-xs text-gray-600 font-sans leading-relaxed">{val.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Side: Professional commitment banner */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#1e3a27] to-[#102a1b] text-white p-8 md:p-10 rounded-3xl relative overflow-hidden shadow-xl min-h-[340px] flex flex-col justify-between">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08)_0%,transparent_100%)]" />
              
              <div>
                <span className="text-[#a3e635] text-xs font-black uppercase tracking-wider block mb-2">Our Commitment</span>
                <h3 className="text-2xl font-display font-black leading-tight mb-4">
                  Kualitas & Keamanan Tanpa Toleransi
                </h3>
                <p className="text-gray-300 text-xs md:text-sm leading-relaxed font-sans mb-4">
                  Kami mengaplikasikan standar manajemen operasional kegiatan alam bebas yang kokoh untuk memastikan setiap kegiatan berjalan lancar dan berkesan.
                </p>
              </div>

              <div className="flex gap-4 pt-4 border-t border-white/10">
                <div>
                  <span className="text-2xl font-display font-black text-[#a3e635] block">10+</span>
                  <span className="text-[10px] text-gray-400 font-sans uppercase">Years Experience</span>
                </div>
                <div className="border-l border-white/10 pl-4">
                  <span className="text-2xl font-display font-black text-[#a3e635] block">500+</span>
                  <span className="text-[10px] text-gray-400 font-sans uppercase">Events Handled</span>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};


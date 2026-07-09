import React from 'react';
import { Users, Compass, GraduationCap, ArrowRight, Shield, Award, Camera, Heart, Settings } from 'lucide-react';
import { useAdminData } from '../context/AdminDataContext';

interface HeroProps {
  onExploreClick: (id: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick }) => {
  const { cmsData } = useAdminData();
  const hero = cmsData?.hero || {
    subtitle: 'WHEN NATURE BUILDS STRONGER TEAMS',
    titleLine1: 'BUILD CONNECTION.',
    titleLine2: 'INCREASE COLLABORATION.',
    titleLine3: 'ACHIEVE TOGETHER.',
    description: 'JWest Adventure menyediakan pengalaman outdoor terbaik untuk Trekking, Team Building, Corporate Gathering, Outbound Activities, dan Event Management yang berkesan dan berdampak bagi tim Anda.',
    bgImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1920&q=80',
    mainImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
  };

  return (
    <section id="home" className="relative min-h-screen pt-24 pb-16 bg-[#f5f8f6] overflow-hidden">
      {/* Background Mountain Forest Image - soft opacity to let text read clearly */}
      <div className="absolute inset-0 z-0">
        <img
          src={hero.bgImage}
          alt="Mist forest background"
          className="w-full h-full object-cover opacity-15"
        />
        {/* Soft radial and linear gradients for matching background ambience */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#f5f8f6]/40 via-transparent to-[#f5f8f6]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-12">
        {/* Main Grid: Info on left, group photo on right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          
          {/* Left Column: Heading and description */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            {/* Subtitle */}
            <span className="text-[#3d7c51] font-sans text-xs md:text-sm font-extrabold tracking-wider uppercase mb-3">
              {hero.subtitle}
            </span>
            
            {/* Title */}
            <h1 className="text-4xl md:text-5xl xl:text-6xl font-display font-black tracking-tight leading-tight text-[#102a1b] mb-6 uppercase">
              {hero.titleLine1}<br />
              {hero.titleLine2}<br />
              {hero.titleLine3}
            </h1>
            
            {/* Description */}
            <p className="text-[#2d5a3b]/90 text-sm md:text-base leading-relaxed font-sans max-w-xl">
              {hero.description}
            </p>
          </div>

          {/* Right Column: Group Team Image with Wooden Sign Overlay */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl md:rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white/80 max-w-2xl mx-auto">
              <img
                src={hero.mainImage}
                alt="JWest Adventure Team Outdoors"
                className="w-full h-[320px] md:h-[420px] object-cover scale-105 hover:scale-110 transition-transform duration-700"
              />
              {/* Overlay with happy mountain climbing colors */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none" />

              {/* Wooden Sign Overlay matching JWest branding */}
              <div className="absolute top-6 right-6 bg-[#3d2715] border-2 border-[#1e130a] px-4 py-2.5 rounded-md shadow-lg transform rotate-2 flex items-center gap-2 select-none">
                {/* Visual wood texture styling using dual gradient and borders */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0%,transparent_100%)] opacity-50" />
                
                {/* SVG mountain logo inside wooden sign */}
                <svg className="w-6 h-6 text-[#a3e635]" viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 85L50 25L85 85" stroke="currentColor" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M55 85L80 45L105 85" stroke="currentColor" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M35 85L50 60" stroke="#ffffff" strokeWidth="8" strokeLinecap="round" />
                  <path d="M68 85L80 65" stroke="#ffffff" strokeWidth="8" strokeLinecap="round" />
                </svg>
                <div className="flex flex-col leading-none">
                  <span className="text-white text-sm font-display font-black tracking-tight">{cmsData?.general?.logoText || 'JWEST'}</span>
                  <span className="text-[6px] text-white/90 font-sans font-bold tracking-[0.25em] uppercase">{cmsData?.general?.logoSub || 'ADVENTURE'}</span>
                </div>
              </div>

              {/* Interactive caption tag inside team photo */}
              <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm py-2 px-4 rounded-xl border border-white/20 shadow-md">
                <p className="text-xs font-semibold text-gray-800 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Keseruan Bersama JWest Adventure
                </p>
              </div>
            </div>
          </div>
        </div>


        {/* 3 Interactive Category Cards - Matching the gorgeous layout and overlays */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          {/* Card 1: CORPORATE EXPERIENCE */}
          <div className="relative h-[340px] rounded-2xl overflow-hidden shadow-xl border border-white/30 flex flex-col justify-between p-6 group cursor-pointer"
               onClick={() => onExploreClick('corporate-experience')}>
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <img
                src="https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80"
                alt="Corporate gathering outbound"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              {/* Dark Green Gradient Semi-transparent Overlay */}
              <div className="absolute inset-0 bg-[#1e3a27]/85 mix-blend-multiply" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e1e14] via-[#1e3a27]/70 to-[#1e3a27]/30" />
            </div>

            {/* Card Content */}
            <div className="relative z-10">
              {/* Icon Container */}
              <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-4 text-white">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-display font-extrabold tracking-wide text-white mb-2">
                CORPORATE EXPERIENCE
              </h3>
              <p className="text-gray-200 text-xs md:text-sm leading-relaxed">
                Solusi lengkap untuk kegiatan perusahaan yang meningkatkan kolaborasi, motivasi, dan kinerja tim.
              </p>
            </div>

            <div className="relative z-10">
              <button className="flex items-center justify-between bg-white text-[#102a1b] hover:bg-gray-100 font-sans text-xs md:text-sm font-bold py-3 px-5 rounded-xl w-full transition-all duration-300 shadow-md">
                <span>Explore Corporate</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card 2: INDIVIDUAL ADVENTURE */}
          <div className="relative h-[340px] rounded-2xl overflow-hidden shadow-xl border border-white/30 flex flex-col justify-between p-6 group cursor-pointer"
               onClick={() => onExploreClick('individual-adventure')}>
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <img
                src="https://images.unsplash.com/photo-1551632811-561730d1e4a6?auto=format&fit=crop&w=800&q=80"
                alt="Hiking mountain trail"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              {/* Cream / Beige Overlay for a distinct contrast */}
              <div className="absolute inset-0 bg-[#eef1ed]/90 mix-blend-multiply" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#d5ded4] via-[#eef1ed]/80 to-transparent" />
            </div>

            {/* Card Content */}
            <div className="relative z-10">
              {/* Icon Container */}
              <div className="w-12 h-12 rounded-xl bg-[#1e3a27]/10 flex items-center justify-center mb-4 text-[#1e3a27]">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-display font-extrabold tracking-wide text-[#102a1b] mb-2">
                INDIVIDUAL ADVENTURE
              </h3>
              <p className="text-[#2d5a3b] text-xs md:text-sm leading-relaxed">
                Petualangan seru untuk Anda, keluarga, dan komunitas yang ingin menyegarkan pikiran dan tubuh.
              </p>
            </div>

            <div className="relative z-10">
              <button className="flex items-center justify-between bg-[#102a1b] text-white hover:bg-[#1a412a] font-sans text-xs md:text-sm font-bold py-3 px-5 rounded-xl w-full transition-all duration-300 shadow-md">
                <span>Explore Individual</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card 3: ADVENTURE LEARNING */}
          <div className="relative h-[340px] rounded-2xl overflow-hidden shadow-xl border border-white/30 flex flex-col justify-between p-6 group cursor-pointer"
               onClick={() => onExploreClick('adventure-learning')}>
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <img
                src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80"
                alt="Students outdoors adventure"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              {/* Golden/Yellow-Green transparent gradient overlay */}
              <div className="absolute inset-0 bg-[#d97706]/20 mix-blend-overlay" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#c2a649] via-[#e2d49c]/80 to-[#fdfaf2]/40" />
            </div>

            {/* Card Content */}
            <div className="relative z-10">
              {/* Icon Container */}
              <div className="w-12 h-12 rounded-xl bg-[#453715]/10 flex items-center justify-center mb-4 text-[#453715]">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-display font-extrabold tracking-wide text-[#453715] mb-2">
                ADVENTURE LEARNING
              </h3>
              <p className="text-[#5c4a1c] text-xs md:text-sm leading-relaxed">
                Program pembelajaran outdoor untuk siswa SD - SMP - SMA yang membangun karakter, leadership, dan kepedulian terhadap alam.
              </p>
            </div>

            <div className="relative z-10">
              <button className="flex items-center justify-between bg-[#102a1b] text-white hover:bg-[#1a412a] font-sans text-xs md:text-sm font-bold py-3 px-5 rounded-xl w-full transition-all duration-300 shadow-md">
                <span>Explore Adventure Learning</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Footer Feature Strip (Dark banner row containing 5 core values) */}
        <div className="bg-[#102a1b] rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-xl text-white">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-white/10">
            
            {/* Item 1: Professional Team */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left md:px-4 pt-4 md:pt-0 first:pt-0">
              <div className="flex items-center gap-2 mb-2 text-[#a3e635]">
                <Award className="w-5 h-5" />
                <span className="text-sm font-display font-bold tracking-wide">Professional Team</span>
              </div>
              <span className="text-xs text-gray-300 leading-normal font-sans">Berpengalaman & bersertifikasi</span>
            </div>

            {/* Item 2: Safety First */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left md:px-4 pt-4 md:pt-0">
              <div className="flex items-center gap-2 mb-2 text-[#a3e635]">
                <Shield className="w-5 h-5" />
                <span className="text-sm font-display font-bold tracking-wide">Safety First</span>
              </div>
              <span className="text-xs text-gray-300 leading-normal font-sans">Keamanan adalah prioritas kami</span>
            </div>

            {/* Item 3: Tailor Made Program */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left md:px-4 pt-4 md:pt-0">
              <div className="flex items-center gap-2 mb-2 text-[#a3e635]">
                <Settings className="w-5 h-5" />
                <span className="text-sm font-display font-bold tracking-wide">Tailor Made</span>
              </div>
              <span className="text-xs text-gray-300 leading-normal font-sans">Program yang disesuaikan kebutuhan</span>
            </div>

            {/* Item 4: Documentation */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left md:px-4 pt-4 md:pt-0">
              <div className="flex items-center gap-2 mb-2 text-[#a3e635]">
                <Camera className="w-5 h-5" />
                <span className="text-sm font-display font-bold tracking-wide">Documentation</span>
              </div>
              <span className="text-xs text-gray-300 leading-normal font-sans">Foto, Video & Drone berkualitas</span>
            </div>

            {/* Item 5: Medical Support */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left md:px-4 pt-4 md:pt-0">
              <div className="flex items-center gap-2 mb-2 text-[#a3e635]">
                <Heart className="w-5 h-5" />
                <span className="text-sm font-display font-bold tracking-wide">Medical Support</span>
              </div>
              <span className="text-xs text-gray-300 leading-normal font-sans">Tim medis & standar keselamatan</span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

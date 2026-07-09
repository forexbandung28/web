import React, { useState, useEffect } from 'react';
import { Clock, MapPin, Check, Compass, Sparkles, Star, ChevronRight, Play, Info, Eye, PhoneCall } from 'lucide-react';
import { useAdminData } from '../context/AdminDataContext';

interface RouteItem {
  id: string;
  title: string;
  level: 'Easy' | 'Medium' | 'Challenging';
  duration: string;
  distance: string;
  categories: string[];
  image: string;
  description: string;
  maxParticipants: string;
  minParticipants: string;
  meetingPoint: string;
  age: string;
  suitableFor: string;
}

export const IndividualAdventure: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'Easy' | 'Medium' | 'Challenging' | 'Family Friendly'>('all');
  const { cmsData } = useAdminData();
  const whatsappNumber = cmsData?.general?.whatsAppNumber || '6281234567890';
  
  const defaultRoutes: RouteItem[] = [
    {
      id: 'r1',
      title: 'Curug Leuwi Hejo',
      level: 'Easy',
      duration: '2-3 Jam',
      distance: '4 Km',
      categories: ['Family Friendly'],
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
      description: 'Rute trekking favorit di Sentul dengan jalur ringan dan pemandangan air terjun berwarna hijau toska yang memukau.',
      maxParticipants: 'Maks. 100 peserta',
      minParticipants: '2 Orang',
      meetingPoint: 'Sentul',
      age: '7+ Tahun',
      suitableFor: 'Team Building'
    },
    {
      id: 'r2',
      title: 'Curug Barong',
      level: 'Medium',
      duration: '3 Jam',
      distance: '5 Km',
      categories: ['Family Friendly'],
      image: 'https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=800&q=80',
      description: 'Perjalanan menantang sedikit berbatuan menuju air terjun tersembunyi dengan formasi tebing batu alam megah.',
      maxParticipants: 'Maks. 80 peserta',
      minParticipants: '2 Orang',
      meetingPoint: 'Sentul',
      age: '10+ Tahun',
      suitableFor: 'Adventure & Sport'
    },
    {
      id: 'r3',
      title: 'Curug Kembar',
      level: 'Medium',
      duration: '4 Jam',
      distance: '6 Km',
      categories: ['Family Friendly'],
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80',
      description: 'Trek melintasi perkebunan kopi dan hutan bambu yang sejuk, berakhir di air terjun kembar berdampingan.',
      maxParticipants: 'Maks. 50 peserta',
      minParticipants: '2 Orang',
      meetingPoint: 'Sentul',
      age: '8+ Tahun',
      suitableFor: 'Relaxation & Nature'
    },
    {
      id: 'r4',
      title: 'Curug Ciburial',
      level: 'Medium',
      duration: '4-5 Jam',
      distance: '7 Km',
      categories: [],
      image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80',
      description: 'Trek sedang menyusuri lembah hijau dan bukit berundak dengan pemandangan air terjun jernih bertingkat tiga.',
      maxParticipants: 'Maks. 40 peserta',
      minParticipants: '2 Orang',
      meetingPoint: 'Sentul',
      age: '12+ Tahun',
      suitableFor: 'Exploration'
    },
    {
      id: 'r5',
      title: 'Triple Waterfall Adventure',
      level: 'Challenging',
      duration: '5-7 Jam',
      distance: '10 Km',
      categories: [],
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
      description: 'Eksplorasi puncak Sentul sejati melintasi 3 air terjun sekaligus dalam satu rute memacu adrenalin.',
      maxParticipants: 'Maks. 30 peserta',
      minParticipants: '4 Orang',
      meetingPoint: 'Sentul',
      age: '15+ Tahun',
      suitableFor: 'Challenger'
    }
  ];

  const routes = cmsData?.routes && cmsData.routes.length > 0 ? (cmsData.routes as RouteItem[]) : defaultRoutes;

  const [selectedRouteId, setSelectedRouteId] = useState<string>(routes[0]?.id || '');

  // Keep ID in sync with state or reset if it is no longer available
  useEffect(() => {
    if (routes.length > 0 && !routes.some(r => r.id === selectedRouteId)) {
      setSelectedRouteId(routes[0].id);
    }
  }, [routes, selectedRouteId]);

  const selectedRoute = routes.find(r => r.id === selectedRouteId) || routes[0] || defaultRoutes[0];

  const filteredRoutes = routes.filter(route => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'Family Friendly') return route.categories.includes('Family Friendly');
    return route.level === activeFilter;
  });

  const handleWhatsAppBooking = (title: string) => {
    const message = encodeURIComponent(`Halo JWest Adventure, saya tertarik memesan paket Individual Trekking:\nRute: ${title}.\nTolong infokan jadwal keberangkatan terdekat.`);
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };


  return (
    <section id="individual-adventure" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block exactly like Page 5 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
          <div className="lg:col-span-8">
            <span className="text-xs font-extrabold text-[#3d7c51] uppercase tracking-widest block mb-2">INDIVIDUAL ADVENTURE</span>
            <h2 className="text-4xl md:text-5xl font-display font-black text-[#102a1b] tracking-tight mb-4 uppercase leading-none">
              EXPLORE NATURE, <br />CREATE MEMORIES
            </h2>
            <p className="text-gray-600 text-sm md:text-base font-sans max-w-2xl">
              Temukan pengalaman trekking terbaik di Sentul dengan berbagai pilihan rute untuk pemula hingga berpengalaman.
            </p>
          </div>
          <div className="lg:col-span-4 flex gap-3 lg:justify-end">
            <button
              onClick={() => {
                document.getElementById('routes-explorer')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-[#102a1b] text-white hover:bg-[#1a412a] px-5 py-3 rounded-xl text-xs font-bold shadow-md transition-all cursor-pointer whitespace-nowrap"
            >
              View Routes
            </button>
            <button
              onClick={() => handleWhatsAppBooking('Kustom Trekking')}
              className="bg-white border border-gray-200 text-[#102a1b] hover:bg-gray-50 px-5 py-3 rounded-xl text-xs font-bold shadow-sm transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5"
            >
              <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
              WhatsApp Booking
            </button>
          </div>
        </div>

        {/* Routes Explorer Layout (Split screen on desktop) */}
        <div id="routes-explorer" className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Filter and Routes List */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Filter buttons row */}
            <div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-3 font-sans">
                PILIH TINGKAT PETUALANGAN ANDA
              </span>
              <div className="flex flex-wrap gap-1.5 bg-gray-50 p-1.5 rounded-xl border border-gray-100">
                {(['all', 'Easy', 'Medium', 'Challenging', 'Family Friendly'] as const).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => {
                      setActiveFilter(filter);
                      // Auto select first route in filtered list
                      const matches = routes.filter(r => {
                        if (filter === 'all') return true;
                        if (filter === 'Family Friendly') return r.categories.includes('Family Friendly');
                        return r.level === filter;
                      });
                      if (matches.length > 0) {
                        setSelectedRouteId(matches[0].id);
                      }
                    }}
                    className={`px-3 py-2 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer ${
                      activeFilter === filter
                        ? 'bg-[#102a1b] text-white shadow-sm'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    {filter === 'all' ? 'All Routes' : filter}
                  </button>
                ))}
              </div>
            </div>

            {/* List of matching routes */}
            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
              {filteredRoutes.map((route) => {
                const isSelected = selectedRoute.id === route.id;
                return (
                  <div
                    key={route.id}
                    onClick={() => setSelectedRouteId(route.id)}
                    className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer flex gap-4 items-center ${
                      isSelected
                        ? 'border-[#3d7c51] bg-[#3d7c51]/5 shadow-sm'
                        : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <img
                      src={route.image}
                      alt={route.title}
                      className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="flex-grow">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="text-sm font-display font-extrabold text-[#102a1b]">
                          {route.title}
                        </h4>
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                          route.level === 'Easy' ? 'bg-emerald-50 text-emerald-700' :
                          route.level === 'Medium' ? 'bg-amber-50 text-amber-700' :
                          'bg-red-50 text-red-700'
                        }`}>
                          {route.level}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-[11px] text-gray-500 font-sans font-medium">
                        <span className="flex items-center gap-0.5">
                          <Clock className="w-3 h-3" />
                          {route.duration}
                        </span>
                        <span>•</span>
                        <span>{route.distance}</span>
                        {route.categories.includes('Family Friendly') && (
                          <>
                            <span>•</span>
                            <span className="text-[#3d7c51] font-semibold">Family Friendly</span>
                          </>
                        )}
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'translate-x-1 text-[#3d7c51]' : 'text-gray-400'}`} />
                  </div>
                );
              })}
            </div>

            {/* Customer Testimonial Sidebar block matching Page 5 */}
            <div className="bg-emerald-50/50 border border-emerald-100/60 rounded-2xl p-5 shadow-sm">
              <span className="text-[10px] font-bold text-[#3d7c51] uppercase tracking-wider block mb-3 font-sans">
                TESTIMONI PELANGGAN
              </span>
              <p className="text-xs font-display font-bold text-gray-800 mb-1">
                Apa kata mereka tentang pengalaman bersama JWest?
              </p>
              <div className="flex gap-0.5 text-amber-400 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <p className="text-xs text-gray-600 leading-relaxed font-sans italic mb-3">
                "Pengalaman luar biasa! Guide ramah, pemandangan indah, trekking air terjunnya sangat segar dan asri. Highly recommended!"
              </p>
              <span className="text-[11px] font-bold text-gray-900 block font-sans">— Andi Prasetyo</span>
              <span className="text-[10px] text-gray-400 font-sans">Corporate Outing Participant</span>
            </div>

          </div>

          {/* Right Column: Dynamic Detail Panel matching exactly page 5 right-side card */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-gray-150 rounded-2xl overflow-hidden shadow-lg">
              
              {/* Dynamic Detail Cover photo with video icon trigger */}
              <div className="relative h-64 md:h-80 overflow-hidden group">
                <img
                  src={selectedRoute.image}
                  alt={selectedRoute.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                
                {/* Easy/Medium Tag overlay */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-gray-900 text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${
                    selectedRoute.level === 'Easy' ? 'bg-emerald-500 animate-pulse' :
                    selectedRoute.level === 'Medium' ? 'bg-amber-500 animate-pulse' :
                    'bg-red-500 animate-pulse'
                  }`} />
                  {selectedRoute.level}
                </div>

                {/* Video Play Button Overlay representing Video Experience */}
                <button
                  onClick={() => handleWhatsAppBooking(`Video Highlight Request - ${selectedRoute.title}`)}
                  className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 text-white flex items-center justify-center border border-white/35 transition-all duration-300 transform hover:scale-110 cursor-pointer"
                >
                  <Play className="w-7 h-7 fill-current ml-1" />
                </button>
                
                <span className="absolute bottom-4 left-4 text-white text-xs font-bold uppercase tracking-wider font-sans bg-black/40 px-3 py-1 rounded-md">
                  {selectedRoute.title} Gallery Photo
                </span>
              </div>

              {/* Detail Content */}
              <div className="p-6 md:p-8">
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <h3 className="text-2xl font-display font-black text-gray-900 uppercase">
                    {selectedRoute.title}
                  </h3>
                  <div className="flex gap-2">
                    {selectedRoute.categories.map((c, idx) => (
                      <span key={idx} className="bg-emerald-50 text-[#3d7c51] text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="text-gray-600 text-xs md:text-sm leading-relaxed mb-6 font-sans">
                  {selectedRoute.description}
                </p>

                {/* Specification Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-gray-50/60 p-5 rounded-xl border border-gray-100 mb-6">
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold uppercase block font-sans mb-0.5">Durasi</span>
                    <span className="text-xs md:text-sm text-gray-800 font-semibold font-sans block">{selectedRoute.duration}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold uppercase block font-sans mb-0.5">Jarak Trek</span>
                    <span className="text-xs md:text-sm text-gray-800 font-semibold font-sans block">{selectedRoute.distance}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold uppercase block font-sans mb-0.5">Level</span>
                    <span className="text-xs md:text-sm text-gray-800 font-semibold font-sans block">{selectedRoute.level}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold uppercase block font-sans mb-0.5">Meeting Point</span>
                    <span className="text-xs md:text-sm text-gray-800 font-semibold font-sans block">{selectedRoute.meetingPoint}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold uppercase block font-sans mb-0.5">Usia Min.</span>
                    <span className="text-xs md:text-sm text-gray-800 font-semibold font-sans block">{selectedRoute.age}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold uppercase block font-sans mb-0.5">Min. Peserta</span>
                    <span className="text-xs md:text-sm text-gray-800 font-semibold font-sans block">{selectedRoute.minParticipants}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold uppercase block font-sans mb-0.5">Max. Peserta</span>
                    <span className="text-xs md:text-sm text-gray-800 font-semibold font-sans block">{selectedRoute.maxParticipants}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold uppercase block font-sans mb-0.5">Kategori</span>
                    <span className="text-xs md:text-sm text-emerald-800 font-semibold font-sans block">{selectedRoute.suitableFor}</span>
                  </div>
                </div>

                {/* Facilities Checklist Grid (Inclusions vs Exclusions/Options) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-gray-100 mb-8">
                  <div>
                    <h5 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3 font-sans flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      FASILITAS TERMASUK
                    </h5>
                    <ul className="space-y-2">
                      {['Local Guide Profesional', 'Trekking Permit & Izin', 'Trekking Pole', 'Dokumentasi Foto Standard', 'P3K & Safety Equipment', 'Asuransi Kecelakaan', 'Air Mineral'].map((item, index) => (
                        <li key={index} className="flex items-start gap-2 text-[11px] text-gray-600 font-sans">
                          <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-[#3d7c51] uppercase tracking-wider mb-3 font-sans flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#3d7c51]" />
                      FASILITAS OPSIONAL
                    </h5>
                    <ul className="space-y-2">
                      {['Transportasi PP Jakarta/Bogor', 'Lunch Box Komplit', 'Photographer Profesional', 'Videographer & Editing', 'Drone Video Coverage', 'Souvenir Exclusive'].map((item, index) => (
                        <li key={index} className="flex items-start gap-2 text-[11px] text-gray-500 font-sans">
                          <div className="w-3.5 h-3.5 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center text-[8px] font-bold flex-shrink-0 mt-0.5">
                            +
                          </div>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer Ready Call to Action */}
                <div className="bg-[#102a1b] text-white p-5 rounded-2xl relative overflow-hidden flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div>
                    <h4 className="text-sm font-display font-black text-[#a3e635] tracking-wide">
                      READY FOR YOUR ADVENTURE?
                    </h4>
                    <p className="text-[10px] text-gray-300 font-sans leading-normal">
                      Mari jelajahi alam dan ciptakan momen berharga bersama JWest Adventure.
                    </p>
                  </div>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => handleWhatsAppBooking(selectedRoute.title)}
                      className="flex-grow sm:flex-none bg-[#a3e635] text-[#102a1b] hover:bg-[#bbf246] px-4 py-2.5 rounded-xl text-xs font-extrabold shadow-md transition-all cursor-pointer whitespace-nowrap text-center"
                    >
                      WhatsApp Booking
                    </button>
                    <button
                      onClick={() => handleWhatsAppBooking(`Proposal Info Request - ${selectedRoute.title}`)}
                      className="flex-grow sm:flex-none bg-white/10 hover:bg-white/20 text-white border border-white/20 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap text-center"
                    >
                      Request Information
                    </button>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

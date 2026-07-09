import React, { useState } from 'react';
import { Users, Zap, Briefcase, Trophy, ArrowRight, CheckCircle2, MessageSquare, Clock, MapPin, Check, Heart, Shield, Star } from 'lucide-react';
import { useAdminData } from '../context/AdminDataContext';

interface CorporateProgram {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  level: string;
  location: string;
  minParticipants: string;
  maxParticipants: string;
  certificate: string;
  evaluation: string;
  image: string;
  inclusions: string[];
  options: string[];
}

export const CorporateExperience: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'tb' | 'gather' | 'lead'>('tb');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [participantsCount, setParticipantsCount] = useState('');
  const [contactName, setContactName] = useState('');
  const { cmsData } = useAdminData();
  const whatsappNumber = cmsData?.general?.whatsAppNumber || '6281234567890';

  const defaultPrograms: Record<'tb' | 'gather' | 'lead', CorporateProgram> = {
    tb: {
      id: 'tb',
      title: 'Strategic Team Building',
      subtitle: 'Outbound & Experiential Learning',
      description: 'Program pelatihan intensif luar ruang yang dirancang untuk memperkuat kerja sama, komunikasi taktis, pemecahan masalah, dan penyelarasan nilai-nilai utama perusahaan Anda.',
      duration: '1-2 Hari',
      level: 'All Levels (Corporate Friendly)',
      location: 'Bogor / Sentul / Sukabumi',
      minParticipants: '20 Orang',
      maxParticipants: 'Maks. 200 peserta',
      certificate: 'Tersedia (E-Certificate)',
      evaluation: 'Included (Laporan Debrief Komprehensif)',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
      inclusions: [
        'Trainer & Fasilitator Utama Berlisensi',
        'Atribut Tim Lengkap (Kaos Kelompok & Topi)',
        'P3K & Standard Medical Support',
        'Sound System Standard Outdoor',
        'Dokumentasi Foto & Video Drone',
        'Game Master & Semua Alat Perlengkapan Game'
      ],
      options: [
        'Akomodasi Hotel Bintang 4 / Resort Ternama',
        'Transportasi Bus Pariwisata PP Jakarta/Bogor',
        'Gala Dinner Corporate Premium',
        'Live Music Acoustic Entertainment',
        'Custom Souvenir Exclusive Perusahaan'
      ]
    },
    gather: {
      id: 'gather',
      title: 'Corporate Gathering',
      subtitle: 'Fun, Refreshing & Recreation Outing',
      description: 'Momentum rekreasi penuh kebersamaan untuk menyegarkan pikiran karyawan, mempererat silaturahmi antar divisi, meningkatkan loyalitas, dan merayakan pencapaian besar tim Anda.',
      duration: '2-3 Hari',
      level: 'All Levels (Fun Focused)',
      location: 'Bogor / Puncak / Bandung / Bali',
      minParticipants: '30 Orang',
      maxParticipants: 'Maks. 500 peserta',
      certificate: 'Opsional',
      evaluation: 'Not Required',
      image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80',
      inclusions: [
        'Fasilitator Gathering & Event Host Profesional',
        'Fun Outbound & Ice Breaking Games',
        'Sound System & Stage Setup Outdoor',
        'Dokumentasi Foto, Video & Video Drone Full HD',
        'P3K, Safety Equipment, & Kru Medis Lapangan',
        'Atribut Banner Spanduk Selamat Datang'
      ],
      options: [
        'Gala Dinner Premium & BBQ Night',
        'Live Music Band / DJ Performance',
        'Transportasi Bus PP Executive Class',
        'Doorprize & Bingkisan Spesial JWest',
        'Penginapan Villa Mewah / Hotel Bintang 4'
      ]
    },
    lead: {
      id: 'lead',
      title: 'Executive Leadership Camp',
      subtitle: 'Leadership & Crisis Management Development',
      description: 'Program intensif khusus bagi jajaran eksekutif, manajer, dan calon pemimpin masa depan untuk mengasah ketajaman kepemimpinan, komunikasi strategis, serta manajemen krisis.',
      duration: '3 Hari 2 Malam',
      level: 'Executive & Managerial Level',
      location: 'Sentul Highlands / Gunung Pancar Glamping',
      minParticipants: '10 Orang',
      maxParticipants: 'Maks. 50 peserta',
      certificate: 'Tersedia (Sertifikat Leadership)',
      evaluation: 'Included (Analisis Profil & Feedback Individual)',
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
      inclusions: [
        'Senior Trainer Kepemimpinan Nasional',
        'Self-Discovery Assessment Tools',
        'Sesi Coaching & Mentoring Privat',
        'Tactical Crisis Management Games',
        'Akomodasi Premium Glamping Setup',
        'Standard Medical Support & Rescue Team 24/7'
      ],
      options: [
        'Premium Catering Service (Healthy Diet Option)',
        'Private Transport Shuttle VIP',
        'Exclusive Executive Team Jersey',
        'Video Dokumentasi Cinematic Eksklusif'
      ]
    }
  };

  const programs: Record<'tb' | 'gather' | 'lead', CorporateProgram> = {
    tb: (cmsData?.corporate?.find(p => p.id === 'tb') || defaultPrograms.tb) as CorporateProgram,
    gather: (cmsData?.corporate?.find(p => p.id === 'gather') || defaultPrograms.gather) as CorporateProgram,
    lead: (cmsData?.corporate?.find(p => p.id === 'lead') || defaultPrograms.lead) as CorporateProgram,
  };

  const selectedProg = programs[activeTab];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName || !contactName) return;

    const message = encodeURIComponent(
      `Halo JWest Adventure, saya ${contactName} dari ${companyName} ingin mengajukan proposal corporate event:\nProgram: ${selectedProg.title}\nEstimasi Peserta: ${participantsCount} orang.\nMohon kirimkan draf proposal dan rincian harga terbaik.`
    );
    
    setFormSubmitted(true);
    setTimeout(() => {
      window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
    }, 1200);
  };


  return (
    <section id="corporate-experience" className="py-20 bg-emerald-50/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title and Action Buttons Block exactly like Page 6 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
          <div className="lg:col-span-8">
            <span className="text-xs font-extrabold text-[#3d7c51] uppercase tracking-widest block mb-2">CORPORATE EXPERIENCE</span>
            <h2 className="text-4xl md:text-5xl font-display font-black text-[#102a1b] tracking-tight mb-4 uppercase leading-none">
              GROW TOGETHER, <br />STRONGER FOREVER
            </h2>
            <p className="text-gray-600 text-sm md:text-base font-sans max-w-2xl">
              Tingkatkan kolaborasi, kepemimpinan, dan produktivitas tim Anda melalui program outbound luar ruang yang dirancang khusus sesuai dengan kebutuhan unik instansi Anda.
            </p>
          </div>
          <div className="lg:col-span-4 flex gap-3 lg:justify-end">
            <button
              onClick={() => {
                document.getElementById('rfp-form')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-[#102a1b] text-white hover:bg-[#1a412a] px-5 py-3 rounded-xl text-xs font-bold shadow-md transition-all cursor-pointer whitespace-nowrap"
            >
              Request Proposal
            </button>
            <button
              onClick={() => {
                document.getElementById('programs-explorer')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-white border border-gray-200 text-[#102a1b] hover:bg-gray-50 px-5 py-3 rounded-xl text-xs font-bold shadow-sm transition-all cursor-pointer whitespace-nowrap"
            >
              Explore Programs
            </button>
          </div>
        </div>

        {/* Dynamic Program Explorer Layout with Tab and Details Card */}
        <div id="programs-explorer" className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
          
          {/* Left Side: Program Tabs List and Quick FAQ info */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-3 font-sans">
                PILIH KATEGORI ACARA PERUSAHAAN
              </span>
              <div className="flex flex-col gap-2">
                {(Object.keys(programs) as Array<'tb' | 'gather' | 'lead'>).map((key) => {
                  const prog = programs[key];
                  const isActive = activeTab === key;
                  return (
                    <button
                      key={key}
                      onClick={() => setActiveTab(key)}
                      className={`text-left p-4 rounded-xl border transition-all duration-300 cursor-pointer flex gap-3 items-center ${
                        isActive
                          ? 'border-[#3d7c51] bg-white shadow-md ring-1 ring-[#3d7c51]/10'
                          : 'border-transparent bg-white/40 hover:bg-white hover:border-gray-200'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        isActive ? 'bg-[#102a1b] text-white' : 'bg-emerald-50 text-[#3d7c51]'
                      }`}>
                        {key === 'tb' ? <Users className="w-5 h-5" /> : key === 'gather' ? <Trophy className="w-5 h-5" /> : <Briefcase className="w-5 h-5" />}
                      </div>
                      <div className="flex-grow">
                        <h4 className="text-xs md:text-sm font-display font-extrabold text-[#102a1b]">
                          {prog.title}
                        </h4>
                        <span className="text-[10px] text-gray-500 font-sans block">
                          Durasi: {prog.duration}
                        </span>
                      </div>
                      <ArrowRight className={`w-4 h-4 transition-transform ${isActive ? 'translate-x-1 text-[#3d7c51]' : 'text-gray-400 opacity-0'}`} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Trust Badges matching Corporate Theme */}
            <div className="bg-white border border-gray-150 p-6 rounded-2xl space-y-4">
              <h5 className="text-xs font-display font-extrabold text-[#102a1b] uppercase tracking-wider mb-2">
                KENAPA CORPORATE MEMILIH JWEST?
              </h5>
              
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#a3e635]/15 text-[#3d7c51] flex items-center justify-center flex-shrink-0">
                  <Shield className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h6 className="text-xs font-bold text-gray-900 leading-tight">Asuransi Kecelakaan Lengkap</h6>
                  <p className="text-[10px] text-gray-500 font-sans leading-normal">Semua peserta tercover asuransi keselamatan utama selama kegiatan.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#a3e635]/15 text-[#3d7c51] flex items-center justify-center flex-shrink-0">
                  <Star className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h6 className="text-xs font-bold text-gray-900 leading-tight">Fasilitator Utama BNSP</h6>
                  <p className="text-[10px] text-gray-500 font-sans leading-normal">Fasilitator memiliki lisensi resmi outbound dari Badan Nasional Sertifikasi Profesi.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Large Dynamic Detail Card exactly matching PDF Layout */}
          <div className="lg:col-span-8">
            <div className="bg-white border border-gray-150 rounded-2xl overflow-hidden shadow-lg">
              
              {/* Cover Image of selected program */}
              <div className="relative h-60 md:h-72 overflow-hidden">
                <img
                  src={selectedProg.image}
                  alt={selectedProg.title}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-102"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent pointer-events-none" />
                
                <div className="absolute bottom-5 left-6 text-white">
                  <span className="text-[#a3e635] text-[10px] font-black uppercase tracking-widest block mb-1">
                    {selectedProg.subtitle}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-display font-black uppercase leading-none">
                    {selectedProg.title}
                  </h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 md:p-8">
                <p className="text-gray-700 text-xs md:text-sm leading-relaxed mb-6 font-sans">
                  {selectedProg.description}
                </p>

                {/* Specs Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-50 p-5 rounded-xl border border-gray-100 mb-6">
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold uppercase block font-sans mb-0.5">Durasi Acara</span>
                    <span className="text-xs md:text-sm text-gray-800 font-semibold font-sans block">{selectedProg.duration}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold uppercase block font-sans mb-0.5">Lokasi Relevan</span>
                    <span className="text-xs md:text-sm text-gray-800 font-semibold font-sans block text-ellipsis overflow-hidden whitespace-nowrap" title={selectedProg.location}>
                      {selectedProg.location}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold uppercase block font-sans mb-0.5">Sertifikat BNSP</span>
                    <span className="text-xs md:text-sm text-gray-800 font-semibold font-sans block">{selectedProg.certificate}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold uppercase block font-sans mb-0.5">Laporan Evaluasi</span>
                    <span className="text-xs md:text-sm text-gray-800 font-semibold font-sans block text-ellipsis overflow-hidden whitespace-nowrap" title={selectedProg.evaluation}>
                      {selectedProg.evaluation}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold uppercase block font-sans mb-0.5">Tingkat Peserta</span>
                    <span className="text-xs md:text-sm text-gray-800 font-semibold font-sans block">{selectedProg.level}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold uppercase block font-sans mb-0.5">Min. Kuota</span>
                    <span className="text-xs md:text-sm text-gray-800 font-semibold font-sans block">{selectedProg.minParticipants}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold uppercase block font-sans mb-0.5">Maks. Kuota</span>
                    <span className="text-xs md:text-sm text-gray-800 font-semibold font-sans block">{selectedProg.maxParticipants}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold uppercase block font-sans mb-0.5">Metodologi</span>
                    <span className="text-xs md:text-sm text-[#3d7c51] font-semibold font-sans block">Experiential Learning</span>
                  </div>
                </div>

                {/* Inclusions vs Options lists */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-gray-100 mb-8">
                  <div>
                    <h5 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3 font-sans flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      FASILITAS TERMASUK
                    </h5>
                    <ul className="space-y-2">
                      {selectedProg.inclusions.map((item, index) => (
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
                      {selectedProg.options.map((item, index) => (
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

                {/* Button Action */}
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => {
                      document.getElementById('rfp-form')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="bg-[#102a1b] hover:bg-[#1c492f] text-white font-sans text-xs md:text-sm font-bold px-6 py-3.5 rounded-xl transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Request Proposal Kegiatan</span>
                    <ArrowRight className="w-4 h-4 text-[#a3e635]" />
                  </button>
                </div>

              </div>

            </div>
          </div>

        </div>

        {/* Dynamic Request Proposal Form Section matching exactly page 6 Bottom */}
        <div id="rfp-form" className="bg-[#102a1b] rounded-3xl overflow-hidden shadow-2xl text-white">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left Column Copy info */}
            <div className="p-8 md:p-12 lg:col-span-5 flex flex-col justify-between bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.05)_0%,transparent_100%)] relative">
              <div className="absolute inset-0 z-0 opacity-10">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80"
                  alt="forest background"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="relative z-10">
                <span className="text-[#a3e635] text-xs font-bold uppercase tracking-wider block mb-2">Corporate RFP Form</span>
                <h3 className="text-2xl md:text-3xl font-display font-black leading-tight mb-4">
                  Butuh Proposal Kegiatan Kustom?
                </h3>
                <p className="text-gray-300 text-xs md:text-sm leading-relaxed mb-6 font-sans">
                  Sampaikan garis besar rencana event Anda. Tim kami akan segera membuat draft penawaran harga terbaik beserta kurikulum program outbound yang komprehensif dalam waktu 24 jam.
                </p>
              </div>

              <div className="relative z-10 space-y-4 pt-6 border-t border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[#a3e635]">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-gray-300 font-sans">Konsultasi Gratis</h5>
                    <p className="text-xs text-white font-medium font-sans">WhatsApp: +62 812-3456-7890</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column Form fields */}
            <div className="p-8 md:p-12 lg:col-span-7 bg-[#1e3a27]/30 border-t lg:border-t-0 lg:border-l border-white/10 relative">
              {formSubmitted ? (
                <div className="h-full flex flex-col justify-center items-center text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-[#a3e635] flex items-center justify-center text-[#102a1b] mb-4 animate-bounce">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-2xl font-display font-bold text-[#a3e635] mb-2">Permintaan Dikirim!</h4>
                  <p className="text-gray-300 text-sm max-w-md font-sans">
                    Membuka WhatsApp untuk meneruskan detail penawaran ke tim admin JWest Adventure...
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-300 uppercase mb-1.5 font-sans">Nama Perusahaan / Instansi</label>
                      <input
                        type="text"
                        required
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="PT. Sinar Jaya Indonesia"
                        className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#a3e635] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-300 uppercase mb-1.5 font-sans">Nama Kontak Person (PIC)</label>
                      <input
                        type="text"
                        required
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="Nama Lengkap Anda"
                        className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#a3e635] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-300 uppercase mb-1.5 font-sans">Pilihan Program</label>
                      <input
                        type="text"
                        readOnly
                        value={selectedProg.title}
                        className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-sm text-gray-300 focus:outline-none cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-300 uppercase mb-1.5 font-sans">Perkiraan Jumlah Peserta</label>
                      <input
                        type="number"
                        required
                        value={participantsCount}
                        onChange={(e) => setParticipantsCount(e.target.value)}
                        placeholder="Contoh: 45"
                        className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#a3e635] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full bg-[#a3e635] text-[#102a1b] font-sans font-extrabold text-sm py-4 rounded-xl hover:bg-[#bbf246] transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Kirim Penawaran ke WhatsApp</span>
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </form>
              )}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

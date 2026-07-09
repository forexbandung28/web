import React, { useState } from 'react';
import { BookOpen, Award, Compass, Heart, CheckSquare, Clock, MapPin, Check, BookOpenText, ArrowRight, FileText } from 'lucide-react';
import { useAdminData } from '../context/AdminDataContext';

interface LearningProgram {
  id: string;
  title: string;
  badge: string;
  description: string;
  duration: string;
  location: string;
  age: string;
  ratio: string;
  minParticipants: string;
  output: string;
  image: string;
  inclusions: string[];
  methodologies: string[];
}

export const AdventureLearning: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'sd' | 'smp_sma' | 'univ'>('sd');
  const { cmsData } = useAdminData();
  const whatsappNumber = cmsData?.general?.whatsAppNumber || '6281234567890';

  const defaultPrograms: Record<'sd' | 'smp_sma' | 'univ', LearningProgram> = {
    sd: {
      id: 'sd',
      title: 'Sekolah Dasar (SD)',
      badge: 'Nature Discovery & Fun Learning',
      description: 'Program edukasi luar ruangan yang dirancang khusus untuk menumbuhkan rasa ingin tahu, melatih keberanian dasar, kerja sama kelompok kecil, serta cinta tanah air lewat permainan edukatif sains alam bebas.',
      duration: '1 Hari (Full Day)',
      location: 'Sentul Trekking Area / Kebun Raya Bogor',
      age: '7 - 12 Tahun',
      ratio: '1:10 (Fasilitator : Siswa)',
      minParticipants: '30 Siswa',
      output: 'Karakter Mandiri & Cinta Lingkungan',
      image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80',
      inclusions: [
        'Pemandu & Edukator Bersertifikasi Profesional',
        'Tiket Masuk Wisata & Perizinan Lokasi',
        'Atribut Kegiatan (Syal Kelompok & Name Tag)',
        'Snack Box & Makan Siang Sehat',
        'Lembar Kerja Siswa (LKS) & Alat Tulis Edukatif',
        'Asuransi Kecelakaan Selama Kegiatan',
        'P3K Standar Medis & Ambulance Standby'
      ],
      methodologies: [
        'Experiential Learning (Belajar dari Pengalaman)',
        'Fun Outbound Games & Teamwork Mandiri',
        'Nature Observation (Sains Alam Sederhana)',
        'Reflective Session (Diskusi & Kesimpulan)'
      ]
    },
    smp_sma: {
      id: 'smp_sma',
      title: 'Sekolah Menengah (SMP/SMA)',
      badge: 'Character Building & Independence',
      description: 'Menemukan kepercayaan diri, mengasah rasa solidaritas, kemandirian pribadi, kepemimpinan dasar, serta melatih pemikiran kritis dan pemecahan masalah melalui simulasi petualangan kelompok terarah.',
      duration: '2 Hari 1 Malam (Camp)',
      location: 'Gunung Pancar / Sukabumi Adventure Camp',
      age: '13 - 18 Tahun',
      ratio: '1:12 (Fasilitator : Siswa)',
      minParticipants: '40 Siswa',
      output: 'Kepemimpinan & Ketahanan Mental Siswa',
      image: 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=800&q=80',
      inclusions: [
        'Instruktur & Fasilitator Outbound Berlisensi BNSP',
        'Tenda Dome Komplit & Sleeping Bag per Siswa',
        'Makan Utama 5x (Sistem Catering / Masak Mandiri)',
        'Tiket Retribusi & Perizinan Taman Nasional',
        'Peralatan Navigasi Darat (Kompas & Peta)',
        'Asuransi Keselamatan Komprehensif',
        'P3K Medis Lengkap & Koordinasi Puskesmas Setempat'
      ],
      methodologies: [
        'Leadership & Social Responsibility Roleplay',
        'Survival Simulation (Simulasi Bertahan Hidup)',
        'Problem Solving Task (Pemecahan Masalah Taktis)',
        'Solo Camp / Night Reflection (Perenungan Karakter)'
      ]
    },
    univ: {
      id: 'univ',
      title: 'Universitas / Mahasiswa',
      badge: 'Advanced Leadership & Social Responsibility',
      description: 'Program akselerasi kompetensi kepemimpinan strategis, manajemen risiko lapangan, kekompakan organisasi, ketahanan fisik-mental, serta pembekalan kepedulian sosial kemasyarakatan.',
      duration: '3 Hari 2 Malam',
      location: 'Taman Nasional Gede Pangrango / Gunung Salak',
      age: '18+ Tahun',
      ratio: '1:15 (Fasilitator : Mahasiswa)',
      minParticipants: '20 Peserta',
      output: 'Sikap Tanggap, Tangguh, & Berdampak Sosial',
      image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=800&q=80',
      inclusions: [
        'Senior Coach & Certified Outdoor Instructors',
        'Perlengkapan Camp & Mountain Gear Lengkap',
        'Perizinan Resmi (SIMAKSI) & Asuransi TN',
        'Logistik Pendakian & Makan Utama Selama Kegiatan',
        'Tshirt Eksklusif Angkatan JWest',
        'Asuransi Kecelakaan Diri',
        'Rescue Team & Peralatan Medis Darurat + Oksigen'
      ],
      methodologies: [
        'Advanced Navigation & Search and Rescue',
        'Strategic Team Synergy Games',
        'Environmental Project & Eco-Care Action',
        'Debrief Sesi Kepemimpinan Ekskutif'
      ]
    }
  };

  const programs: Record<'sd' | 'smp_sma' | 'univ', LearningProgram> = {
    sd: (cmsData?.learning?.find(p => p.id === 'sd') || defaultPrograms.sd) as LearningProgram,
    smp_sma: (cmsData?.learning?.find(p => p.id === 'smp_sma') || defaultPrograms.smp_sma) as LearningProgram,
    univ: (cmsData?.learning?.find(p => p.id === 'univ') || defaultPrograms.univ) as LearningProgram,
  };

  const selectedProg = programs[activeTab];

  const handleWhatsApp = (subject: string) => {
    const message = encodeURIComponent(`Halo JWest Adventure, saya tertarik berkonsultasi mengenai program Adventure Learning sekolah:\nPaket: ${subject}.\nMohon kirimkan draf kurikulum dan detail penawaran harganya.`);
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };


  return (
    <section id="adventure-learning" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title and Header Action buttons block exactly like Page 4 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
          <div className="lg:col-span-8">
            <span className="text-xs font-extrabold text-[#3d7c51] uppercase tracking-widest block mb-2">ADVENTURE LEARNING</span>
            <h2 className="text-4xl md:text-5xl font-display font-black text-[#102a1b] tracking-tight mb-4 uppercase leading-none">
              NATURE IS THE <br />BEST CLASSROOM
            </h2>
            <p className="text-gray-600 text-sm md:text-base font-sans max-w-2xl">
              Program edukasi luar ruangan yang dirancang khusus untuk siswa sekolah (SD, SMP, SMA), mahasiswa, dan komunitas akademis guna melatih soft skill dan membangun karakter tangguh.
            </p>
          </div>
          <div className="lg:col-span-4 flex gap-3 lg:justify-end">
            <button
              onClick={() => handleWhatsApp('Curriculum Download Request')}
              className="bg-[#102a1b] text-white hover:bg-[#1a412a] px-5 py-3 rounded-xl text-xs font-bold shadow-md transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5 text-[#a3e635]" />
              Download Curriculum
            </button>
            <button
              onClick={() => {
                document.getElementById('learning-explorer')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-white border border-gray-200 text-[#102a1b] hover:bg-gray-50 px-5 py-3 rounded-xl text-xs font-bold shadow-sm transition-all cursor-pointer whitespace-nowrap"
            >
              School Cooperation
            </button>
          </div>
        </div>

        {/* Interactive Explorer Grid */}
        <div id="learning-explorer" className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Side: Segment list & Trust Badge */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-3 font-sans">
                PILIH JENJANG PENDIDIKAN
              </span>
              <div className="flex flex-col gap-2">
                {(Object.keys(programs) as Array<'sd' | 'smp_sma' | 'univ'>).map((key) => {
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
                        <BookOpenText className="w-5 h-5" />
                      </div>
                      <div className="flex-grow">
                        <h4 className="text-xs md:text-sm font-display font-extrabold text-[#102a1b]">
                          {prog.title}
                        </h4>
                        <span className="text-[10px] text-gray-500 font-sans block">
                          Output: {prog.output}
                        </span>
                      </div>
                      <ArrowRight className={`w-4 h-4 transition-transform ${isActive ? 'translate-x-1 text-[#3d7c51]' : 'text-gray-400 opacity-0'}`} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Special Academic Quote matching Page 4 */}
            <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 shadow-sm">
              <span className="text-[10px] font-bold text-[#3d7c51] uppercase tracking-wider block mb-2 font-sans">
                MISI EDUTAINMENT KAMI
              </span>
              <h5 className="text-sm font-display font-extrabold text-[#102a1b] mb-1.5">
                "Tell me and I forget, teach me and I may remember, involve me and I learn."
              </h5>
              <p className="text-xs text-gray-600 font-sans italic">
                — Benjamin Franklin
              </p>
            </div>
          </div>

          {/* Right Side: Large Dynamic Detail Card exactly matching Page 4 Layout */}
          <div className="lg:col-span-8">
            <div className="bg-white border border-gray-150 rounded-2xl overflow-hidden shadow-lg">
              
              {/* Cover Image of selected segment */}
              <div className="relative h-60 md:h-72 overflow-hidden">
                <img
                  src={selectedProg.image}
                  alt={selectedProg.title}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-102"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent pointer-events-none" />
                
                <div className="absolute bottom-5 left-6 text-white">
                  <span className="text-[#a3e635] text-[10px] font-black uppercase tracking-widest block mb-1">
                    {selectedProg.badge}
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
                    <span className="text-[10px] text-gray-400 font-bold uppercase block font-sans mb-0.5">Durasi Belajar</span>
                    <span className="text-xs md:text-sm text-gray-800 font-semibold font-sans block">{selectedProg.duration}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold uppercase block font-sans mb-0.5">Lokasi Relevan</span>
                    <span className="text-xs md:text-sm text-gray-800 font-semibold font-sans block text-ellipsis overflow-hidden whitespace-nowrap" title={selectedProg.location}>
                      {selectedProg.location}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold uppercase block font-sans mb-0.5">Rentang Usia</span>
                    <span className="text-xs md:text-sm text-gray-800 font-semibold font-sans block">{selectedProg.age}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold uppercase block font-sans mb-0.5">Rasio Fasilitator</span>
                    <span className="text-xs md:text-sm text-gray-800 font-semibold font-sans block text-ellipsis overflow-hidden whitespace-nowrap" title={selectedProg.ratio}>
                      {selectedProg.ratio}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold uppercase block font-sans mb-0.5">Minimum Kuota</span>
                    <span className="text-xs md:text-sm text-gray-800 font-semibold font-sans block">{selectedProg.minParticipants}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold uppercase block font-sans mb-0.5">Target Output</span>
                    <span className="text-xs md:text-sm text-[#3d7c51] font-semibold font-sans block text-ellipsis overflow-hidden whitespace-nowrap" title={selectedProg.output}>
                      {selectedProg.output}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold uppercase block font-sans mb-0.5">Metodologi Utama</span>
                    <span className="text-xs md:text-sm text-gray-800 font-semibold font-sans block">Experiential Learning</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold uppercase block font-sans mb-0.5">Asuransi Siswa</span>
                    <span className="text-xs md:text-sm text-emerald-800 font-semibold font-sans block">Included</span>
                  </div>
                </div>

                {/* Inclusions vs Methodologies grids */}
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
                      METODOLOGI BELAJAR
                    </h5>
                    <ul className="space-y-2">
                      {selectedProg.methodologies.map((item, index) => (
                        <li key={index} className="flex items-start gap-2 text-[11px] text-gray-500 font-sans">
                          <div className="w-3.5 h-3.5 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center text-[8px] font-bold flex-shrink-0 mt-0.5">
                            ★
                          </div>
                          <span className="font-semibold">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Button Action row */}
                <div className="flex flex-wrap gap-3 justify-end border-t border-gray-100 pt-6">
                  <button
                    onClick={() => handleWhatsApp(`Brosur Request - ${selectedProg.title}`)}
                    className="bg-white border border-gray-200 text-[#102a1b] hover:bg-gray-50 font-sans text-xs font-bold px-4 py-3 rounded-xl transition-all cursor-pointer whitespace-nowrap"
                  >
                    Unduh Brosur Paket
                  </button>
                  <button
                    onClick={() => handleWhatsApp(`Consultation Request - ${selectedProg.title}`)}
                    className="bg-[#102a1b] hover:bg-[#1a412a] text-white font-sans text-xs font-bold px-5 py-3 rounded-xl transition-all shadow-sm flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                  >
                    <span>Hubungi Konsultan Pendidikan</span>
                    <ArrowRight className="w-4 h-4 text-[#a3e635]" />
                  </button>
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

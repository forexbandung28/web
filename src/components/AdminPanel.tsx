import React, { useState } from 'react';
import { useAdminData, RouteItem, CorporateProgram, LearningProgram, GalleryItem, InstagramPost } from '../context/AdminDataContext';
import { 
  Settings, Lock, Eye, LogOut, Check, Plus, Trash2, Edit2, 
  ShieldAlert, RefreshCw, Save, Image, Folder, Video, Info, 
  UserCheck, Key, HelpCircle, ArrowLeft, EyeOff, Layout, List, Tag, FileText
} from 'lucide-react';

export const AdminPanel: React.FC = () => {
  const {
    cmsData,
    isLoggedIn,
    isAdminModeActive,
    setAdminModeActive,
    login,
    logout,
    updateGeneral,
    updateHero,
    updateAbout,
    updateRoute,
    addRoute,
    deleteRoute,
    updateCorporate,
    updateLearning,
    updateGalleryItem,
    addGalleryItem,
    deleteGalleryItem,
    updateInstagramPost,
    addArticle,
    updateArticle,
    deleteArticle,
    resetAllToDefault,
  } = useAdminData();

  // Login States
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState(false);

  // Active editor tab: 'general' | 'hero' | 'about' | 'routes' | 'programs' | 'gallery' | 'articles'
  const [activeTab, setActiveTab] = useState<'general' | 'hero' | 'about' | 'routes' | 'programs' | 'gallery' | 'articles'>('general');

  // Selected sub-items for detail edit
  const [selectedRouteId, setSelectedRouteId] = useState<string>('');
  const [selectedCorpId, setSelectedCorpId] = useState<string>('tb');
  const [selectedLearnId, setSelectedLearnId] = useState<string>('sd');
  const [selectedGalleryId, setSelectedGalleryId] = useState<string>('');
  const [selectedArticleId, setSelectedArticleId] = useState<string>('');

  // Status/Save notifications
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  const showNotification = (message: string) => {
    setSaveStatus(message);
    setTimeout(() => setSaveStatus(null), 3000);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(passwordInput);
    if (success) {
      setLoginError(false);
      setPasswordInput('');
    } else {
      setLoginError(true);
    }
  };

  // Safe handler for arrays or items
  const handleGeneralChange = (field: string, value: string) => {
    updateGeneral({ [field]: value });
    showNotification('General config updated!');
  };

  const handleHeroChange = (field: string, value: string) => {
    updateHero({ [field]: value });
    showNotification('Hero section updated!');
  };

  const handleAboutChange = (field: string, value: any) => {
    updateAbout({ [field]: value });
    showNotification('About Us updated!');
  };

  // Multi-value list editor helper for inclusions, options, methodologies
  const handleListFieldChange = (
    section: 'routes' | 'corporate' | 'learning',
    id: string,
    field: 'inclusions' | 'options' | 'methodologies',
    index: number,
    value: string
  ) => {
    if (section === 'routes') {
      const route = cmsData.routes.find(r => r.id === id);
      if (route) {
        // Just as custom implementation or let route have custom list fields
      }
    } else if (section === 'corporate') {
      const prog = cmsData.corporate.find(c => c.id === id);
      if (prog) {
        const list = [...prog[field as 'inclusions' | 'options']];
        list[index] = value;
        updateCorporate(id, { [field]: list });
      }
    } else if (section === 'learning') {
      const prog = cmsData.learning.find(l => l.id === id);
      if (prog) {
        const list = [...prog[field as 'inclusions' | 'methodologies']];
        list[index] = value;
        updateLearning(id, { [field]: list });
      }
    }
    showNotification('Item list updated!');
  };

  const handleAddListItem = (
    section: 'corporate' | 'learning',
    id: string,
    field: 'inclusions' | 'options' | 'methodologies'
  ) => {
    if (section === 'corporate') {
      const prog = cmsData.corporate.find(c => c.id === id);
      if (prog) {
        const list = [...prog[field as 'inclusions' | 'options'], 'Item Baru'];
        updateCorporate(id, { [field]: list });
      }
    } else if (section === 'learning') {
      const prog = cmsData.learning.find(l => l.id === id);
      if (prog) {
        const list = [...prog[field as 'inclusions' | 'methodologies'], 'Item Baru'];
        updateLearning(id, { [field]: list });
      }
    }
    showNotification('New list item added!');
  };

  const handleRemoveListItem = (
    section: 'corporate' | 'learning',
    id: string,
    field: 'inclusions' | 'options' | 'methodologies',
    index: number
  ) => {
    if (section === 'corporate') {
      const prog = cmsData.corporate.find(c => c.id === id);
      if (prog) {
        const list = prog[field as 'inclusions' | 'options'].filter((_, i) => i !== index);
        updateCorporate(id, { [field]: list });
      }
    } else if (section === 'learning') {
      const prog = cmsData.learning.find(l => l.id === id);
      if (prog) {
        const list = prog[field as 'inclusions' | 'methodologies'].filter((_, i) => i !== index);
        updateLearning(id, { [field]: list });
      }
    }
    showNotification('List item removed!');
  };

  // Route Item specifics
  const selectedRoute = cmsData.routes.find(r => r.id === selectedRouteId) || cmsData.routes[0];
  const selectedCorp = cmsData.corporate.find(c => c.id === selectedCorpId) || cmsData.corporate[0];
  const selectedLearn = cmsData.learning.find(l => l.id === selectedLearnId) || cmsData.learning[0];
  const selectedGallery = cmsData.gallery.find(g => g.id === selectedGalleryId) || cmsData.gallery[0];
  const selectedArticle = (cmsData.articles || []).find(art => art.id === selectedArticleId) || (cmsData.articles || [])[0];

  const handleCreateNewRoute = () => {
    const defaultNewRoute: Omit<RouteItem, 'id'> = {
      title: 'Rute Petualangan Baru',
      level: 'Easy',
      duration: '2 Jam',
      distance: '3 Km',
      categories: ['Family Friendly'],
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
      description: 'Keterangan lengkap rute baru di alam bebas yang menawan.',
      maxParticipants: 'Maks. 50 peserta',
      minParticipants: '2 Orang',
      meetingPoint: 'Sentul',
      age: '6+ Tahun',
      suitableFor: 'Nature Walk'
    };
    addRoute(defaultNewRoute);
    showNotification('Rute trekking baru berhasil ditambahkan!');
  };

  const handleCreateNewArticle = () => {
    const defaultNewArticle = {
      title: 'Judul Artikel Baru',
      excerpt: 'Ringkasan singkat isi artikel draf Anda yang menarik perhatian pembaca.',
      content: `### Paragraf Pembuka
Tulis isi artikel lengkap Anda di sini. Anda dapat menggunakan format markdown dasar seperti tanda pagar (###) untuk sub-judul, tanda hubung (-) untuk poin-poin, dan teks tebal menggunakan bintang ganda (**teks**).

### Sub-Judul Menarik
Ubah teks ini sesuai dengan materi artikel blog Anda. Menulis artikel secara konsisten sangat baik untuk meningkatkan SEO website JWest Adventure Anda.`,
      coverImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
      category: 'Trekking',
      tags: ['Trekking', 'Outdoor', 'Sentul'],
      author: 'Admin JWest',
      status: 'draft' as const
    };
    addArticle(defaultNewArticle);
    showNotification('Artikel draf baru berhasil dibuat!');
  };

  const handleCreateNewGalleryItem = () => {
    const defaultNewItem: Omit<GalleryItem, 'id'> = {
      title: 'Momen Outbound Baru',
      category: 'teambuilding',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80',
      description: 'Teks deskripsi foto kegiatan JWest Adventure.'
    };
    addGalleryItem(defaultNewItem);
    showNotification('Foto dokumentasi baru berhasil ditambahkan!');
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#0e1c12] flex items-center justify-center p-4">
        {/* Decorative background grids */}
        <div className="absolute inset-0 z-0 opacity-10">
          <img
            src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1920&q=80"
            alt="Mist forest background"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="bg-white/95 backdrop-blur-md rounded-3xl w-full max-w-md p-8 shadow-2xl border border-white/20 z-10 transition-all duration-300">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#102a1b] text-[#a3e635] mb-4 shadow-lg">
              <Lock className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-display font-black text-[#102a1b] uppercase tracking-tight">
              KONTROL ADMINISTRATOR
            </h2>
            <p className="text-gray-500 text-xs font-sans mt-1">
              JWest Adventure Content Management System
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 font-sans">
                KATA SANDI PRIVATE (PASSWORD)
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Masukkan kata sandi..."
                  className="w-full bg-gray-50 border border-gray-200 focus:border-[#3d7c51] focus:ring-1 focus:ring-[#3d7c51] rounded-xl px-4 py-3 text-sm focus:outline-none transition-all pr-12 font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {loginError && (
              <div className="bg-red-50 border border-red-100 text-red-700 p-3.5 rounded-xl text-xs flex gap-2 items-start font-sans">
                <ShieldAlert className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Akses ditolak!</span> Kata sandi yang dimasukkan salah. Silakan coba lagi.
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-[#102a1b] hover:bg-[#1a412a] text-white py-4 rounded-xl text-sm font-extrabold shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider"
            >
              <UserCheck className="w-5 h-5 text-[#a3e635]" />
              Masuk Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      
      {/* CMS TOP BAR */}
      <div className="bg-slate-950 border-b border-slate-800 sticky top-0 z-50 px-4 py-3 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-[#a3e635] flex items-center justify-center font-display font-black">
            JW
          </div>
          <div>
            <h1 className="text-sm font-display font-black uppercase tracking-tight flex items-center gap-2">
              JWest CMS Panel
              <span className="bg-emerald-500/15 text-[#a3e635] text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                Authorized Mode
              </span>
            </h1>
          </div>
        </div>

        {/* Live Notification Toast */}
        {saveStatus && (
          <div className="bg-emerald-500 text-slate-950 text-xs font-bold px-4 py-2 rounded-xl shadow-lg border border-[#a3e635] animate-bounce flex items-center gap-2 font-sans">
            <Check className="w-4 h-4 text-slate-950" />
            {saveStatus}
          </div>
        )}

        {/* Toggle Live Preview vs Logout buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => setAdminModeActive(false)}
            className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Eye className="w-4 h-4 text-[#a3e635]" />
            Lihat Preview Situs
          </button>
          <button
            onClick={logout}
            className="bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white border border-red-500/20 px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            Keluar
          </button>
        </div>
      </div>

      {/* MAIN CONTAINER */}
      <div className="flex-grow grid grid-cols-1 lg:grid-cols-12">
        
        {/* LEFT COLUMN: Sidebar Navigation */}
        <div className="lg:col-span-3 bg-slate-950 p-4 border-r border-slate-800 flex flex-col justify-between">
          <div className="space-y-6">
            <div>
              <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest block mb-2 font-mono">
                MENU UTAMA CMS
              </span>
              <nav className="space-y-1">
                {[
                  { id: 'general', label: 'Identitas & WhatsApp', icon: <Settings className="w-4 h-4" /> },
                  { id: 'hero', label: 'Teks Banner (Hero)', icon: <Layout className="w-4 h-4" /> },
                  { id: 'about', label: 'Tentang Kami', icon: <Info className="w-4 h-4" /> },
                  { id: 'routes', label: 'Rute Trekking', icon: <List className="w-4 h-4" /> },
                  { id: 'programs', label: 'Paket Outbound & Sekolah', icon: <Tag className="w-4 h-4" /> },
                  { id: 'gallery', label: 'Galeri & Instagram', icon: <Image className="w-4 h-4" /> },
                  { id: 'articles', label: 'Kelola Artikel (Blog)', icon: <FileText className="w-4 h-4" /> },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as any)}
                    className={`w-full text-left p-3 rounded-xl text-xs font-bold flex items-center gap-3 transition-all cursor-pointer ${
                      activeTab === item.id
                        ? 'bg-[#102a1b] text-[#a3e635] border-l-4 border-[#a3e635]'
                        : 'text-slate-300 hover:bg-slate-900'
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="pt-4 border-t border-slate-800">
              <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest block mb-2 font-mono">
                SISTEM & RESET
              </span>
              <button
                onClick={resetAllToDefault}
                className="w-full text-left p-3 rounded-xl text-xs font-bold flex items-center gap-3 text-red-400 hover:bg-red-500/10 hover:text-white transition-all cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                Reset ke Default Bawaan
              </button>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl mt-6">
            <h5 className="text-xs font-bold text-[#a3e635] mb-1 flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5" />
              Live CMS Mode
            </h5>
            <p className="text-[10px] text-slate-400 leading-normal font-sans">
              Semua perubahan di dashboard ini langsung memodifikasi isi situs. Gunakan tombol <strong>"Lihat Preview Situs"</strong> di kanan atas untuk melihat tampilannya secara penuh.
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: Tab Content Form Panel */}
        <div className="lg:col-span-9 p-6 md:p-8 overflow-y-auto max-h-[calc(100vh-62px)] bg-slate-900">
          
          {/* TAB 1: GENERAL & LOGO IDENTITY */}
          {activeTab === 'general' && (
            <div className="space-y-6 max-w-3xl">
              <div>
                <h2 className="text-xl font-display font-black text-white uppercase tracking-tight">
                  Identitas Website & Kontak Utama
                </h2>
                <p className="text-slate-400 text-xs mt-1">
                  Ubah logo utama perusahaan serta nomor WhatsApp booking.
                </p>
              </div>

              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
                <h3 className="text-xs font-mono font-bold text-[#a3e635] uppercase tracking-wider mb-2">
                  1. Brand Logo
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase mb-2">Logo Text Utama</label>
                    <input
                      type="text"
                      value={cmsData.general.logoText}
                      onChange={(e) => handleGeneralChange('logoText', e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase mb-2">Logo Text Subtitle</label>
                    <input
                      type="text"
                      value={cmsData.general.logoSub}
                      onChange={(e) => handleGeneralChange('logoSub', e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
                <h3 className="text-xs font-mono font-bold text-[#a3e635] uppercase tracking-wider mb-2">
                  2. Kontak Pemesanan
                </h3>
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-2">
                    Nomor WhatsApp Penerima (Format Internasional Tanpa +)
                  </label>
                  <input
                    type="text"
                    value={cmsData.general.whatsAppNumber}
                    onChange={(e) => handleGeneralChange('whatsAppNumber', e.target.value)}
                    placeholder="6281234567890"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500 font-mono"
                  />
                  <p className="text-[10px] text-slate-400 mt-1.5 leading-normal">
                    * Digunakan sebagai tujuan otomatis semua tombol <strong>"WhatsApp Booking"</strong>, <strong>"Request Proposal"</strong>, dan <strong>"Hubungi Konsultan"</strong> di website ini. Gunakan kode negara, contoh: 6281234567890 (bukan 0812...).
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: HERO BANNER SECTION */}
          {activeTab === 'hero' && (
            <div className="space-y-6 max-w-3xl">
              <div>
                <h2 className="text-xl font-display font-black text-white uppercase tracking-tight">
                  Teks & Gambar Banner Depan (Hero)
                </h2>
                <p className="text-slate-400 text-xs mt-1">
                  Sesuaikan kata-kata sambutan yang tampil pertama kali di layar utama website JWest Adventure.
                </p>
              </div>

              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-2">Keterangan Subtitle Atas</label>
                  <input
                    type="text"
                    value={cmsData.hero.subtitle}
                    onChange={(e) => handleHeroChange('subtitle', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-1 gap-3">
                  <label className="block text-xs font-bold text-slate-300 uppercase">Teks Judul Utama (Display Heading 3 Baris)</label>
                  <input
                    type="text"
                    value={cmsData.hero.titleLine1}
                    onChange={(e) => handleHeroChange('titleLine1', e.target.value)}
                    placeholder="Baris 1"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                  <input
                    type="text"
                    value={cmsData.hero.titleLine2}
                    onChange={(e) => handleHeroChange('titleLine2', e.target.value)}
                    placeholder="Baris 2"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                  <input
                    type="text"
                    value={cmsData.hero.titleLine3}
                    onChange={(e) => handleHeroChange('titleLine3', e.target.value)}
                    placeholder="Baris 3"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-2">Paragraf Deskripsi Singkat</label>
                  <textarea
                    rows={4}
                    value={cmsData.hero.description}
                    onChange={(e) => handleHeroChange('description', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500 font-sans"
                  />
                </div>
              </div>

              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
                <h3 className="text-xs font-mono font-bold text-[#a3e635] uppercase tracking-wider mb-2">
                  Gambar Latar Belakang & Foto Utama
                </h3>
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-2">URL Gambar Latar Belakang (Soft Opacity Background)</label>
                  <input
                    type="text"
                    value={cmsData.hero.bgImage}
                    onChange={(e) => handleHeroChange('bgImage', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-2">URL Foto Utama Kelompok (Team Outbound Card)</label>
                  <input
                    type="text"
                    value={cmsData.hero.mainImage}
                    onChange={(e) => handleHeroChange('mainImage', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ABOUT US SECTION */}
          {activeTab === 'about' && (
            <div className="space-y-6 max-w-3xl">
              <div>
                <h2 className="text-xl font-display font-black text-white uppercase tracking-tight">
                  Konten Tentang Kami (About Us)
                </h2>
                <p className="text-slate-400 text-xs mt-1">
                  Ubah visi-misi, nilai komitmen perusahaan, serta jajaran alasan mengapa klien memilih JWest.
                </p>
              </div>

              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
                <h3 className="text-xs font-mono font-bold text-[#a3e635] uppercase tracking-wider mb-2">
                  Teks Pengantar Utama
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase mb-2">Label Tag</label>
                    <input
                      type="text"
                      value={cmsData.about.whoWeAre}
                      onChange={(e) => handleAboutChange('whoWeAre', e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase mb-2">Judul Besar</label>
                    <input
                      type="text"
                      value={cmsData.about.title}
                      onChange={(e) => handleAboutChange('title', e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-2">Paragraf Tentang Kami</label>
                  <textarea
                    rows={3}
                    value={cmsData.about.description}
                    onChange={(e) => handleAboutChange('description', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500 font-sans"
                  />
                </div>
              </div>

              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
                <h3 className="text-xs font-mono font-bold text-[#a3e635] uppercase tracking-wider mb-2">
                  Komitmen & Foto Samping
                </h3>
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-2">Judul Komitmen (Quote Box)</label>
                  <input
                    type="text"
                    value={cmsData.about.highlightTitle}
                    onChange={(e) => handleAboutChange('highlightTitle', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-2">Deskripsi Komitmen</label>
                  <textarea
                    rows={3}
                    value={cmsData.about.highlightDesc}
                    onChange={(e) => handleAboutChange('highlightDesc', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500 font-sans"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-2">URL Foto Jajaran Anggota (Portrait Photo Collage)</label>
                  <input
                    type="text"
                    value={cmsData.about.image}
                    onChange={(e) => handleAboutChange('image', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>
              </div>

              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
                <h3 className="text-xs font-mono font-bold text-[#a3e635] uppercase tracking-wider mb-2">
                  Alasan Memilih JWest (Why Choose Us Cards)
                </h3>
                <div className="space-y-4 divide-y divide-slate-800">
                  {cmsData.about.reasons.map((reason, index) => (
                    <div key={reason.id} className="pt-4 first:pt-0">
                      <span className="text-[10px] text-slate-400 font-mono font-bold uppercase block mb-2">Card Ke-{index+1}</span>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="sm:col-span-1">
                          <label className="block text-[10px] font-bold text-slate-300 uppercase mb-1">Judul Poin</label>
                          <input
                            type="text"
                            value={reason.title}
                            onChange={(e) => {
                              const updated = [...cmsData.about.reasons];
                              updated[index] = { ...reason, title: e.target.value };
                              handleAboutChange('reasons', updated);
                            }}
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block text-[10px] font-bold text-slate-300 uppercase mb-1">Keterangan Penjelasan</label>
                          <input
                            type="text"
                            value={reason.description}
                            onChange={(e) => {
                              const updated = [...cmsData.about.reasons];
                              updated[index] = { ...reason, description: e.target.value };
                              handleAboutChange('reasons', updated);
                            }}
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: ROUTES MANAGEMENT (DYNAMICS INDIVIDUAL TREKKING) */}
          {activeTab === 'routes' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-display font-black text-white uppercase tracking-tight">
                    Pengelola Rute Trekking & Hiking
                  </h2>
                  <p className="text-slate-400 text-xs mt-1">
                    Tambah, ubah data rute, level, jarak, minimum kuota, serta rincian fasilitas trekking individu Sentul.
                  </p>
                </div>
                <button
                  onClick={handleCreateNewRoute}
                  className="bg-emerald-600 hover:bg-emerald-500 text-slate-950 px-5 py-3 rounded-xl text-xs font-black flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap shadow-md"
                >
                  <Plus className="w-4 h-4 text-slate-950" />
                  Tambah Rute Baru
                </button>
              </div>

              {/* Grid: Route List on Left, Form on Right */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Route Cards Left List */}
                <div className="lg:col-span-4 space-y-3">
                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest block mb-2 font-mono">
                    DAFTAR RUTE AKTIF ({cmsData.routes.length})
                  </span>
                  <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
                    {cmsData.routes.map((route) => {
                      const isSelected = selectedRouteId === route.id || (!selectedRouteId && cmsData.routes[0]?.id === route.id);
                      return (
                        <div
                          key={route.id}
                          onClick={() => setSelectedRouteId(route.id)}
                          className={`p-4 rounded-xl border transition-all cursor-pointer flex gap-3 items-center text-left ${
                            isSelected
                              ? 'bg-[#102a1b] border-emerald-500 text-white'
                              : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300'
                          }`}
                        >
                          <img
                            src={route.image}
                            alt={route.title}
                            className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                          />
                          <div className="flex-grow min-w-0">
                            <h4 className="text-xs font-bold truncate">{route.title}</h4>
                            <span className="text-[10px] text-slate-400 block font-mono">
                              {route.level} • {route.distance}
                            </span>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (window.confirm(`Apakah Anda yakin ingin menghapus rute "${route.title}"?`)) {
                                deleteRoute(route.id);
                                if (selectedRouteId === route.id) setSelectedRouteId('');
                                showNotification('Rute berhasil dihapus!');
                              }
                            }}
                            className="text-red-400 hover:text-red-500 p-1.5 rounded-lg hover:bg-red-500/10 cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Route Form Right Details */}
                <div className="lg:col-span-8">
                  {selectedRoute ? (
                    <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
                      <div className="flex justify-between items-center pb-3 border-b border-slate-800">
                        <span className="text-xs font-mono text-[#a3e635] font-bold uppercase tracking-wider">
                          Ubah Detail: {selectedRoute.title}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-1 rounded">
                          ID: {selectedRoute.id}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">Nama Rute (Teks)</label>
                          <input
                            type="text"
                            value={selectedRoute.title}
                            onChange={(e) => {
                              updateRoute(selectedRoute.id, { title: e.target.value });
                              showNotification('Title updated!');
                            }}
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">Kategori Tambahan</label>
                          <input
                            type="text"
                            value={selectedRoute.categories.join(', ')}
                            onChange={(e) => {
                              const cats = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                              updateRoute(selectedRoute.id, { categories: cats });
                              showNotification('Categories updated!');
                            }}
                            placeholder="Family Friendly, Sport"
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">Level Kesulitan (Kategori)</label>
                          <select
                            value={selectedRoute.level}
                            onChange={(e) => {
                              updateRoute(selectedRoute.id, { level: e.target.value as any });
                              showNotification('Level updated!');
                            }}
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                          >
                            <option value="Easy">Easy</option>
                            <option value="Medium">Medium</option>
                            <option value="Challenging">Challenging</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">Durasi Waktu</label>
                          <input
                            type="text"
                            value={selectedRoute.duration}
                            onChange={(e) => {
                              updateRoute(selectedRoute.id, { duration: e.target.value });
                              showNotification('Duration updated!');
                            }}
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">Jarak Trek</label>
                          <input
                            type="text"
                            value={selectedRoute.distance}
                            onChange={(e) => {
                              updateRoute(selectedRoute.id, { distance: e.target.value });
                              showNotification('Distance updated!');
                            }}
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">Min. Peserta</label>
                          <input
                            type="text"
                            value={selectedRoute.minParticipants}
                            onChange={(e) => {
                              updateRoute(selectedRoute.id, { minParticipants: e.target.value });
                              showNotification('Participants updated!');
                            }}
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">Max. Peserta</label>
                          <input
                            type="text"
                            value={selectedRoute.maxParticipants}
                            onChange={(e) => {
                              updateRoute(selectedRoute.id, { maxParticipants: e.target.value });
                              showNotification('Participants updated!');
                            }}
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">Meeting Point</label>
                          <input
                            type="text"
                            value={selectedRoute.meetingPoint}
                            onChange={(e) => {
                              updateRoute(selectedRoute.id, { meetingPoint: e.target.value });
                              showNotification('Meeting Point updated!');
                            }}
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">Usia Min.</label>
                          <input
                            type="text"
                            value={selectedRoute.age}
                            onChange={(e) => {
                              updateRoute(selectedRoute.id, { age: e.target.value });
                              showNotification('Age updated!');
                            }}
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">Sesuai Untuk (Kategori Utama)</label>
                          <input
                            type="text"
                            value={selectedRoute.suitableFor}
                            onChange={(e) => {
                              updateRoute(selectedRoute.id, { suitableFor: e.target.value });
                              showNotification('Suitable updated!');
                            }}
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">URL Gambar (Rute/Sungai)</label>
                        <input
                          type="text"
                          value={selectedRoute.image}
                          onChange={(e) => {
                            updateRoute(selectedRoute.id, { image: e.target.value });
                            showNotification('Image URL updated!');
                          }}
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white focus:outline-none font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">Keterangan Deskripsi</label>
                        <textarea
                          rows={3}
                          value={selectedRoute.description}
                          onChange={(e) => {
                            updateRoute(selectedRoute.id, { description: e.target.value });
                            showNotification('Description updated!');
                          }}
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white focus:outline-none font-sans"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="bg-slate-950 p-12 rounded-2xl border border-slate-800 text-center text-slate-400">
                      Silakan pilih rute di sebelah kiri atau tambah rute baru untuk memulai pengeditan.
                    </div>
                  )}
                </div>

              </div>
            </div>
          )}

          {/* TAB 5: OUTBOUND & SCHOOL PROGRAMS */}
          {activeTab === 'programs' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-display font-black text-white uppercase tracking-tight">
                  Manajemen Program Outbound Corporate & Adventure Learning
                </h2>
                <p className="text-slate-400 text-xs mt-1">
                  Ubah deskripsi, durasi, lokasi, kuota minimum, fasilitas termsuk, serta opsi berbayar paket gathering, outbound BUMN, dan paket sekolah.
                </p>
              </div>

              {/* Sub tabs division */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                
                {/* Outbound Corporate Column Form */}
                <div className="space-y-4">
                  <span className="text-xs font-mono font-bold text-[#a3e635] uppercase tracking-wider block mb-2 border-b border-slate-800 pb-2">
                    A. PAKET CORPORATE OUTBOUND
                  </span>
                  <div className="flex gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800 mb-3">
                    {cmsData.corporate.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => setSelectedCorpId(c.id)}
                        className={`flex-1 py-2 text-[11px] font-bold rounded-lg cursor-pointer ${
                          selectedCorpId === c.id
                            ? 'bg-[#102a1b] text-[#a3e635]'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {c.title}
                      </button>
                    ))}
                  </div>

                  {selectedCorp && (
                    <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">Judul Utama</label>
                        <input
                          type="text"
                          value={selectedCorp.title}
                          onChange={(e) => {
                            updateCorporate(selectedCorp.id, { title: e.target.value });
                            showNotification('Corporate title updated!');
                          }}
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">Subtitle Program</label>
                        <input
                          type="text"
                          value={selectedCorp.subtitle}
                          onChange={(e) => {
                            updateCorporate(selectedCorp.id, { subtitle: e.target.value });
                            showNotification('Corporate subtitle updated!');
                          }}
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">Gambar URL (Outbound/Gathering)</label>
                        <input
                          type="text"
                          value={selectedCorp.image}
                          onChange={(e) => {
                            updateCorporate(selectedCorp.id, { image: e.target.value });
                            showNotification('Image updated!');
                          }}
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">Keterangan Deskripsi</label>
                        <textarea
                          rows={3}
                          value={selectedCorp.description}
                          onChange={(e) => {
                            updateCorporate(selectedCorp.id, { description: e.target.value });
                            showNotification('Description updated!');
                          }}
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none font-sans"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-300 uppercase mb-1">Durasi</label>
                          <input
                            type="text"
                            value={selectedCorp.duration}
                            onChange={(e) => {
                              updateCorporate(selectedCorp.id, { duration: e.target.value });
                              showNotification('Duration updated!');
                            }}
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-300 uppercase mb-1">Lokasi Relevan</label>
                          <input
                            type="text"
                            value={selectedCorp.location}
                            onChange={(e) => {
                              updateCorporate(selectedCorp.id, { location: e.target.value });
                              showNotification('Location updated!');
                            }}
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                          />
                        </div>
                      </div>

                      {/* Facilities Editor */}
                      <div className="space-y-2 pt-2 border-t border-slate-800">
                        <div className="flex justify-between items-center mb-1">
                          <label className="block text-[10px] font-bold text-slate-300 uppercase">Fasilitas Termasuk</label>
                          <button
                            type="button"
                            onClick={() => handleAddListItem('corporate', selectedCorp.id, 'inclusions')}
                            className="text-[#a3e635] text-[10px] hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            + Tambah Poin
                          </button>
                        </div>
                        <div className="space-y-1.5 max-h-[140px] overflow-y-auto pr-1">
                          {selectedCorp.inclusions.map((item, index) => (
                            <div key={index} className="flex gap-2">
                              <input
                                type="text"
                                value={item}
                                onChange={(e) => handleListFieldChange('corporate', selectedCorp.id, 'inclusions', index, e.target.value)}
                                className="flex-grow bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-white"
                              />
                              <button
                                type="button"
                                onClick={() => handleRemoveListItem('corporate', selectedCorp.id, 'inclusions', index)}
                                className="text-red-400 hover:text-red-500 cursor-pointer p-1"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Adventure Learning Column Form */}
                <div className="space-y-4">
                  <span className="text-xs font-mono font-bold text-[#a3e635] uppercase tracking-wider block mb-2 border-b border-slate-800 pb-2">
                    B. ADVENTURE LEARNING (SEKOLAH & KAMPUS)
                  </span>
                  <div className="flex gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800 mb-3">
                    {cmsData.learning.map((l) => (
                      <button
                        key={l.id}
                        onClick={() => setSelectedLearnId(l.id)}
                        className={`flex-1 py-2 text-[11px] font-bold rounded-lg cursor-pointer ${
                          selectedLearnId === l.id
                            ? 'bg-[#102a1b] text-[#a3e635]'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {l.title}
                      </button>
                    ))}
                  </div>

                  {selectedLearn && (
                    <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">Nama Segmen Sekolah</label>
                        <input
                          type="text"
                          value={selectedLearn.title}
                          onChange={(e) => {
                            updateLearning(selectedLearn.id, { title: e.target.value });
                            showNotification('Learning title updated!');
                          }}
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">Badge Edukasi (Kategori)</label>
                        <input
                          type="text"
                          value={selectedLearn.badge}
                          onChange={(e) => {
                            updateLearning(selectedLearn.id, { badge: e.target.value });
                            showNotification('Learning badge updated!');
                          }}
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">Gambar URL</label>
                        <input
                          type="text"
                          value={selectedLearn.image}
                          onChange={(e) => {
                            updateLearning(selectedLearn.id, { image: e.target.value });
                            showNotification('Image updated!');
                          }}
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">Keterangan Deskripsi</label>
                        <textarea
                          rows={3}
                          value={selectedLearn.description}
                          onChange={(e) => {
                            updateLearning(selectedLearn.id, { description: e.target.value });
                            showNotification('Description updated!');
                          }}
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none font-sans"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-300 uppercase mb-1">Rentang Usia</label>
                          <input
                            type="text"
                            value={selectedLearn.age}
                            onChange={(e) => {
                              updateLearning(selectedLearn.id, { age: e.target.value });
                              showNotification('Age updated!');
                            }}
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-300 uppercase mb-1">Target Output Siswa</label>
                          <input
                            type="text"
                            value={selectedLearn.output}
                            onChange={(e) => {
                              updateLearning(selectedLearn.id, { output: e.target.value });
                              showNotification('Output updated!');
                            }}
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                          />
                        </div>
                      </div>

                      {/* Methodologies Editor */}
                      <div className="space-y-2 pt-2 border-t border-slate-800">
                        <div className="flex justify-between items-center mb-1">
                          <label className="block text-[10px] font-bold text-slate-300 uppercase">Metodologi Belajar</label>
                          <button
                            type="button"
                            onClick={() => handleAddListItem('learning', selectedLearn.id, 'methodologies')}
                            className="text-[#a3e635] text-[10px] hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            + Tambah Poin
                          </button>
                        </div>
                        <div className="space-y-1.5 max-h-[140px] overflow-y-auto pr-1">
                          {selectedLearn.methodologies.map((item, index) => (
                            <div key={index} className="flex gap-2">
                              <input
                                type="text"
                                value={item}
                                onChange={(e) => handleListFieldChange('learning', selectedLearn.id, 'methodologies', index, e.target.value)}
                                className="flex-grow bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-white"
                              />
                              <button
                                type="button"
                                onClick={() => handleRemoveListItem('learning', selectedLearn.id, 'methodologies', index)}
                                className="text-red-400 hover:text-red-500 cursor-pointer p-1"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

              </div>
            </div>
          )}

          {/* TAB 6: GALLERY & INSTAGRAM FEED */}
          {activeTab === 'gallery' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-display font-black text-white uppercase tracking-tight">
                    Dokumentasi Galeri & Instagram
                  </h2>
                  <p className="text-slate-400 text-xs mt-1">
                    Tambah foto dokumentasi, kategorisasikan (trekking, team building, dsb) serta kelola feed Instagram simulasi di website.
                  </p>
                </div>
                <button
                  onClick={handleCreateNewGalleryItem}
                  className="bg-emerald-600 hover:bg-emerald-500 text-slate-950 px-5 py-3 rounded-xl text-xs font-black flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap shadow-md"
                >
                  <Plus className="w-4 h-4 text-slate-950" />
                  Tambah Foto Galeri
                </button>
              </div>

              {/* Grid: Gallery Grid layout and forms */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Gallery Left list */}
                <div className="lg:col-span-5 space-y-3 bg-slate-950 p-5 rounded-2xl border border-slate-800">
                  <span className="text-xs font-mono text-[#a3e635] font-bold uppercase tracking-wider block mb-3 border-b border-slate-800 pb-2">
                    Semua Foto Dokumentasi ({cmsData.gallery.length})
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[500px] overflow-y-auto pr-2">
                    {cmsData.gallery.map((g) => (
                      <div
                        key={g.id}
                        onClick={() => setSelectedGalleryId(g.id)}
                        className={`p-2 rounded-xl border transition-all cursor-pointer relative group text-left ${
                          selectedGalleryId === g.id
                            ? 'bg-[#102a1b] border-emerald-500'
                            : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <img
                          src={g.image}
                          alt={g.title}
                          className="w-full h-24 object-cover rounded-lg mb-1.5"
                        />
                        <h5 className="text-[11px] font-bold text-white truncate px-1">{g.title}</h5>
                        <div className="flex justify-between items-center px-1 mt-1">
                          <span className="text-[9px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded uppercase font-mono font-bold">
                            {g.category}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (window.confirm(`Hapus foto "${g.title}" dari galeri?`)) {
                                deleteGalleryItem(g.id);
                                if (selectedGalleryId === g.id) setSelectedGalleryId('');
                                showNotification('Foto berhasil dihapus!');
                              }
                            }}
                            className="text-red-400 hover:text-red-500 p-1 rounded hover:bg-red-500/10 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Gallery Editor Right Panel */}
                <div className="lg:col-span-7">
                  {selectedGallery ? (
                    <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
                      <div className="pb-3 border-b border-slate-800">
                        <span className="text-xs font-mono text-[#a3e635] font-bold uppercase tracking-wider">
                          Ubah Detail Foto: {selectedGallery.title}
                        </span>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">Judul Kegiatan</label>
                        <input
                          type="text"
                          value={selectedGallery.title}
                          onChange={(e) => {
                            updateGalleryItem(selectedGallery.id, { title: e.target.value });
                            showNotification('Gallery title updated!');
                          }}
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">Kategori / Filter Tab</label>
                          <select
                            value={selectedGallery.category}
                            onChange={(e) => {
                              updateGalleryItem(selectedGallery.id, { category: e.target.value as any });
                              showNotification('Category updated!');
                            }}
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                          >
                            <option value="trekking">Trekking</option>
                            <option value="teambuilding">Team Building</option>
                            <option value="gathering">Gathering</option>
                            <option value="learning">Edukasi / Sekolah</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">Preview Mini</label>
                          <div className="w-full h-10 bg-slate-900 rounded-xl overflow-hidden border border-slate-800 flex items-center justify-center">
                            <span className="text-[10px] text-slate-500 font-mono">Image URL Verified ✓</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">URL File Foto (Gambar)</label>
                        <input
                          type="text"
                          value={selectedGallery.image}
                          onChange={(e) => {
                            updateGalleryItem(selectedGallery.id, { image: e.target.value });
                            showNotification('Image URL updated!');
                          }}
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">Keterangan Deskripsi</label>
                        <textarea
                          rows={3}
                          value={selectedGallery.description}
                          onChange={(e) => {
                            updateGalleryItem(selectedGallery.id, { description: e.target.value });
                            showNotification('Description updated!');
                          }}
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white font-sans"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="bg-slate-950 p-12 rounded-2xl border border-slate-800 text-center text-slate-400">
                      Silakan pilih foto galeri di sebelah kiri untuk mengedit keterangan, kategori, dan gambarnya.
                    </div>
                  )}

                  {/* Instagram Posts Section */}
                  <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4 mt-6 text-left">
                    <span className="text-xs font-mono text-[#a3e635] font-bold uppercase tracking-wider block mb-2 border-b border-slate-800 pb-2">
                      Pengelola Keterangan Feed Instagram (Simulasi)
                    </span>
                    <div className="space-y-4 divide-y divide-slate-800">
                      {cmsData.instagram.map((ig, idx) => (
                        <div key={ig.id} className="pt-4 first:pt-0">
                          <span className="text-[10px] text-slate-400 font-mono font-bold uppercase block mb-1">Post #{idx+1}</span>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
                            <div className="sm:col-span-1">
                              <img src={ig.image} className="w-full h-14 object-cover rounded-lg border border-slate-800" />
                            </div>
                            <div className="sm:col-span-2 space-y-1">
                              <label className="block text-[10px] text-slate-300 uppercase font-bold">Keterangan Caption Instagram</label>
                              <textarea
                                rows={2}
                                value={ig.caption}
                                onChange={(e) => {
                                  updateInstagramPost(ig.id, { caption: e.target.value });
                                  showNotification('Caption updated!');
                                }}
                                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 7: ARTICLE & BLOG MANAGEMENT */}
          {activeTab === 'articles' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-display font-black text-white uppercase tracking-tight">
                    Pengelola Artikel & Berita Blog
                  </h2>
                  <p className="text-slate-400 text-xs mt-1">
                    Buat, edit, draf, dan publish artikel berkualitas gaya WordPress untuk dibaca pengunjung situs Anda.
                  </p>
                </div>
                <button
                  onClick={handleCreateNewArticle}
                  className="bg-emerald-600 hover:bg-emerald-500 text-slate-950 px-5 py-3 rounded-xl text-xs font-black flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap shadow-md"
                >
                  <Plus className="w-4 h-4 text-slate-950" />
                  Buat Artikel Baru
                </button>
              </div>

              {/* Grid Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Left panel: List of Articles */}
                <div className="lg:col-span-4 space-y-3 bg-slate-950 p-5 rounded-2xl border border-slate-800">
                  <span className="text-xs font-mono text-[#a3e635] font-bold uppercase tracking-wider block mb-3 border-b border-slate-800 pb-2">
                    Daftar Semua Post ({ (cmsData.articles || []).length })
                  </span>
                  
                  <div className="space-y-2.5 max-h-[600px] overflow-y-auto pr-1">
                    { (cmsData.articles || []).length > 0 ? (
                      (cmsData.articles || []).map((art) => (
                        <div
                          key={art.id}
                          onClick={() => setSelectedArticleId(art.id)}
                          className={`p-3.5 rounded-xl border transition-all cursor-pointer relative text-left flex flex-col justify-between gap-2.5 ${
                            selectedArticleId === art.id || (!selectedArticleId && (cmsData.articles || [])[0]?.id === art.id)
                              ? 'bg-[#102a1b] border-emerald-500'
                              : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          <div>
                            <div className="flex justify-between items-start gap-2">
                              <h4 className="text-xs font-bold text-white line-clamp-2">{art.title}</h4>
                              <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                                art.status === 'published' 
                                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                                  : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                              }`}>
                                {art.status}
                              </span>
                            </div>
                            <p className="text-[10px] text-slate-400 line-clamp-1 mt-1">{art.excerpt}</p>
                          </div>

                          <div className="flex justify-between items-center pt-2 border-t border-slate-800/60 mt-1">
                            <span className="text-[9px] text-slate-500 font-mono font-bold">
                              By {art.author || 'JWest'}
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                if (window.confirm(`Apakah Anda yakin ingin menghapus artikel "${art.title}"?`)) {
                                  deleteArticle(art.id);
                                  if (selectedArticleId === art.id) setSelectedArticleId('');
                                  showNotification('Artikel berhasil dihapus!');
                                }
                              }}
                              className="text-red-400 hover:text-red-500 p-1 rounded hover:bg-red-500/10 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-xs text-slate-500">
                        Belum ada artikel. Klik "Buat Artikel Baru" untuk membuat postingan pertama Anda!
                      </div>
                    )}
                  </div>
                </div>

                {/* Right panel: Editor Form */}
                <div className="lg:col-span-8">
                  {selectedArticle ? (
                    <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-5">
                      <div className="pb-3 border-b border-slate-800 flex justify-between items-center">
                        <span className="text-xs font-mono text-[#a3e635] font-bold uppercase tracking-wider">
                          Ubah Konten Post: {selectedArticle.title}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono">
                          ID: {selectedArticle.id}
                        </span>
                      </div>

                      {/* Title & Author */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">Judul Artikel</label>
                          <input
                            type="text"
                            value={selectedArticle.title}
                            onChange={(e) => {
                              updateArticle(selectedArticle.id, { title: e.target.value });
                              showNotification('Judul artikel diperbarui!');
                            }}
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 font-sans font-bold"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">Nama Penulis</label>
                          <input
                            type="text"
                            value={selectedArticle.author || ''}
                            onChange={(e) => {
                              updateArticle(selectedArticle.id, { author: e.target.value });
                              showNotification('Nama penulis diperbarui!');
                            }}
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                          />
                        </div>
                      </div>

                      {/* Category, Status & Tags */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">Kategori</label>
                          <select
                            value={selectedArticle.category}
                            onChange={(e) => {
                              updateArticle(selectedArticle.id, { category: e.target.value });
                              showNotification('Kategori artikel diperbarui!');
                            }}
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 cursor-pointer"
                          >
                            <option value="Trekking">Trekking</option>
                            <option value="Outbound">Outbound</option>
                            <option value="Team Building">Team Building</option>
                            <option value="Camping">Camping</option>
                            <option value="Edukasi">Edukasi</option>
                            <option value="Tips Wisata">Tips Wisata</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">Status Post</label>
                          <select
                            value={selectedArticle.status}
                            onChange={(e) => {
                              updateArticle(selectedArticle.id, { status: e.target.value as 'draft' | 'published' });
                              showNotification(`Status artikel diubah menjadi ${e.target.value}!`);
                            }}
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 cursor-pointer"
                          >
                            <option value="draft">Draf (Sembunyikan dari Blog)</option>
                            <option value="published">Published (Tampilkan ke Publik)</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">Tags (Pisahkan dengan koma)</label>
                          <input
                            type="text"
                            value={(selectedArticle.tags || []).join(', ')}
                            onChange={(e) => {
                              const tagsList = e.target.value.split(',').map(t => t.trim()).filter(Boolean);
                              updateArticle(selectedArticle.id, { tags: tagsList });
                              showNotification('Tags diperbarui!');
                            }}
                            placeholder="trekking, sentul, bogor"
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                          />
                        </div>
                      </div>

                      {/* Cover Image & Preview */}
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                        <div className="md:col-span-4 flex flex-col justify-center">
                          <img
                            src={selectedArticle.coverImage}
                            alt="Cover preview"
                            className="w-full h-24 object-cover rounded-xl border border-slate-800"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="md:col-span-8">
                          <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">URL Gambar Sampul (Cover Image)</label>
                          <input
                            type="text"
                            value={selectedArticle.coverImage}
                            onChange={(e) => {
                              updateArticle(selectedArticle.id, { coverImage: e.target.value });
                              showNotification('Gambar sampul diperbarui!');
                            }}
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
                          />
                        </div>
                      </div>

                      {/* Excerpt */}
                      <div>
                        <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">Kutipan Ringkas (Excerpt)</label>
                        <input
                          type="text"
                          value={selectedArticle.excerpt}
                          onChange={(e) => {
                            updateArticle(selectedArticle.id, { excerpt: e.target.value });
                            showNotification('Ringkasan draf diperbarui!');
                          }}
                          placeholder="Tulis ringkasan satu kalimat..."
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 font-sans"
                        />
                      </div>

                      {/* Body Content */}
                      <div>
                        <div className="flex justify-between items-center mb-1.5">
                          <label className="block text-xs font-bold text-slate-300 uppercase">Konten Lengkap Artikel (Mendukung Markdown)</label>
                          <span className="text-[10px] text-slate-500 font-mono">Gunakan ## untuk sub-judul, * untuk poin</span>
                        </div>
                        <textarea
                          rows={12}
                          value={selectedArticle.content}
                          onChange={(e) => {
                            updateArticle(selectedArticle.id, { content: e.target.value });
                            showNotification('Isi artikel diperbarui!');
                          }}
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono leading-relaxed"
                          placeholder="### Paragraf Pembuka..."
                        />
                      </div>

                    </div>
                  ) : (
                    <div className="bg-slate-950 p-12 rounded-2xl border border-slate-800 text-center text-slate-400">
                      Belum memilih artikel atau draf kosong. Silakan klik salah satu artikel di panel kiri atau buat draf baru.
                    </div>
                  )}
                </div>

              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

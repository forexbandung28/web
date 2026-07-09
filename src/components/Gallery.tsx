import React, { useState } from 'react';
import { Camera, X, Maximize2, Heart, MessageCircle, Instagram, ExternalLink } from 'lucide-react';
import { useAdminData } from '../context/AdminDataContext';
import { GalleryItem } from '../types';

export const Gallery: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'trekking' | 'teambuilding' | 'gathering' | 'learning'>('all');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const { cmsData } = useAdminData();

  const categories = [
    { value: 'all', label: 'Semua Foto' },
    { value: 'trekking', label: 'Trekking' },
    { value: 'teambuilding', label: 'Team Building' },
    { value: 'gathering', label: 'Gathering' },
    { value: 'learning', label: 'Edukasi / Sekolah' }
  ];

  const defaultGalleryItems: GalleryItem[] = [
    {
      id: 'g1',
      title: 'Trekking Menyusuri Sungai Sentul',
      category: 'trekking',
      image: 'https://images.unsplash.com/photo-1551632811-561730d1e4a6?auto=format&fit=crop&w=600&q=80',
      description: 'Menelusuri rute persawahan dan aliran sungai jernih di kawasan Sentul.'
    },
    {
      id: 'g2',
      title: 'Outbound Team Building BUMN',
      category: 'teambuilding',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80',
      description: 'Melatih sinergi, konsentrasi, dan kebersamaan karyawan di lapangan terbuka.'
    },
    {
      id: 'g3',
      title: 'Corporate Gathering Malam Api Unggun',
      category: 'gathering',
      image: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=600&q=80',
      description: 'Malam keakraban karyawan yang dipenuhi keceriaan dan makan bersama.'
    },
    {
      id: 'g4',
      title: 'Edukasi Navigasi & Kompas Siswa SMP',
      category: 'learning',
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80',
      description: 'Mempelajari navigasi darat dasar menggunakan kompas magnetik secara langsung.'
    },
    {
      id: 'g5',
      title: 'Pendakian Puncak Gunung Papandayan',
      category: 'trekking',
      image: 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=600&q=80',
      description: 'Menikmati panorama kawah aktif dan padang edelweiss yang menakjubkan.'
    },
    {
      id: 'g6',
      title: 'Leadership Camp Siswa SMA',
      category: 'learning',
      image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=600&q=80',
      description: 'Membangun jiwa kepemimpinan mandiri dan disiplin kerja sama antar murid.'
    }
  ];

  const defaultInstagramPosts = [
    {
      id: 'ig1',
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=500&q=80',
      likes: '243',
      comments: '18',
      caption: 'Keseruan trekking Sentul weekend kemarin bersama keluarga besar PT. Telekomunikasi Indonesia. Segarnya alam, indahnya kebersamaan! #JWestAdventure #TrekkingSentul'
    },
    {
      id: 'ig2',
      image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=500&q=80',
      likes: '312',
      comments: '24',
      caption: 'Membina kerja sama, komunikasi taktis, dan menyatukan visi perusahaan lewat program Strategic Team Building. Terima kasih atas kepercayaannya! 🌟 #TeamBuilding #OutboundBogor'
    },
    {
      id: 'ig3',
      image: 'https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=500&q=80',
      likes: '198',
      comments: '12',
      caption: 'Belajar tak melulu di dalam kelas. Serunya adik-adik SD belajar mengenal aneka flora dan mengasah kemandirian langsung di alam bebas Sentul. 🌲🎒 #AdventureLearning #EdukasiAnak'
    },
    {
      id: 'ig4',
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=500&q=80',
      likes: '425',
      comments: '36',
      caption: 'Keindahan Leuwi Hejo yang tak pernah membosankan. Siapkah kamu untuk petualangan seru weekend ini? Hubungi admin kami untuk booking slot privatmu! 💧 #LeuwiHejo #ExploreSentul'
    }
  ];

  const galleryItems = cmsData?.gallery && cmsData.gallery.length > 0 ? (cmsData.gallery as GalleryItem[]) : defaultGalleryItems;
  const instagramPosts = cmsData?.instagram && cmsData.instagram.length > 0 ? cmsData.instagram : defaultInstagramPosts;

  const filteredItems = activeFilter === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeFilter);

  const handleInstagramClick = (caption: string) => {
    window.open('https://instagram.com/jwestadventure', '_blank');
  };


  return (
    <section id="gallery" className="py-20 bg-emerald-50/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header matching Page 7 layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          <div className="lg:col-span-7">
            <span className="text-xs font-extrabold text-[#3d7c51] uppercase tracking-widest block mb-2">DOKUMENTASI DAN INSTAGRAM</span>
            <h2 className="text-4xl md:text-5xl font-display font-black text-[#102a1b] tracking-tight mb-4 uppercase leading-none">
              CAPTURED <br />MOMENTS OF JOY
            </h2>
            <p className="text-gray-600 text-sm md:text-base font-sans max-w-xl">
              Setiap momen keceriaan Anda berharga, kami abadikan secara profesional melalui tim dokumentator berpengalaman dengan kamera berstandar tinggi dan drone footage.
            </p>
          </div>
          <div className="lg:col-span-5 bg-[#102a1b] p-6 rounded-2xl text-white flex items-center justify-between shadow-md">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Instagram className="w-5 h-5 text-[#a3e635]" />
                <span className="text-xs font-sans font-black tracking-widest text-[#a3e635]">INSTAGRAM FEED</span>
              </div>
              <h4 className="text-lg font-display font-bold">@JWESTADVENTURE</h4>
              <p className="text-[10px] text-gray-400 font-sans">Follow kami untuk update promo dan tips petualangan seru harian.</p>
            </div>
            <a
              href="https://instagram.com/jwestadventure"
              target="_blank"
              rel="noreferrer"
              className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all"
            >
              Follow
              <ExternalLink className="w-3 h-3 text-[#a3e635]" />
            </a>
          </div>
        </div>

        {/* Gallery Filter and Grid */}
        <div className="mb-16">
          <div className="flex flex-wrap justify-start gap-1.5 mb-8 bg-gray-50 p-1.5 rounded-xl border border-gray-100 max-w-xl">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveFilter(cat.value as any)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer ${
                  activeFilter === cat.value
                    ? 'bg-[#102a1b] text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedImage(item)}
                className="group relative rounded-2xl overflow-hidden aspect-video shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#102a1b]/95 via-[#102a1b]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                  <Maximize2 className="w-5 h-5 text-[#a3e635] absolute top-4 right-4" />
                  <span className="text-[9px] bg-[#a3e635] text-[#102a1b] font-extrabold uppercase px-2.5 py-1 rounded-full w-max mb-2">
                    {item.category}
                  </span>
                  <h4 className="font-display font-bold text-sm md:text-base tracking-tight mb-1">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-gray-300 line-clamp-1 leading-relaxed font-sans">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Simulated Instagram Feed Grid matching Page 7 layout right panel */}
        <div className="border-t border-gray-100 pt-16">
          <div className="flex items-center gap-2 mb-6">
            <Instagram className="w-5 h-5 text-[#3d7c51]" />
            <span className="text-xs font-sans font-black tracking-widest text-[#3d7c51] uppercase">OUR RECENT INSTAGRAM POSTS</span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {instagramPosts.map((post) => (
              <div
                key={post.id}
                onClick={() => handleInstagramClick(post.caption)}
                className="group relative rounded-xl overflow-hidden aspect-square border border-gray-100 cursor-pointer shadow-sm hover:shadow-md transition-shadow"
              >
                <img
                  src={post.image}
                  alt="Instagram post thumbnail"
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                />
                {/* Instagram stats on hover */}
                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-between p-4 text-white">
                  <div className="flex justify-end">
                    <Instagram className="w-4 h-4 text-pink-500" />
                  </div>
                  
                  <div>
                    <p className="text-[10px] line-clamp-3 leading-relaxed font-sans text-gray-200 mb-3 italic">
                      "{post.caption}"
                    </p>
                    <div className="flex gap-4 text-xs font-bold text-[#a3e635] font-sans">
                      <span className="flex items-center gap-1">
                        <Heart className="w-4 h-4 fill-current" />
                        {post.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="w-4 h-4 fill-current" />
                        {post.comments}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lightbox Modal */}
        {selectedImage && (
          <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 text-white hover:text-[#a3e635] bg-white/10 p-2.5 rounded-full backdrop-blur-md cursor-pointer transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="max-w-4xl w-full bg-[#102a1b] rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              <div className="relative aspect-video">
                <img
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 text-white">
                <span className="text-xs bg-[#a3e635] text-[#102a1b] font-black uppercase px-3 py-1 rounded-full inline-block mb-3">
                  {selectedImage.category}
                </span>
                <h3 className="text-xl md:text-2xl font-display font-black tracking-tight mb-2">
                  {selectedImage.title}
                </h3>
                <p className="text-gray-300 text-xs md:text-sm leading-relaxed font-sans">
                  {selectedImage.description}
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

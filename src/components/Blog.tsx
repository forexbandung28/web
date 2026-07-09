import React, { useState } from 'react';
import { Calendar, User, ArrowLeft, Search, Tag, MessageSquare, Send, BookOpen, Trash2 } from 'lucide-react';
import { useAdminData } from '../context/AdminDataContext';
import { Article } from '../types';

interface BlogProps {
  onBackToHome: () => void;
}

export const Blog: React.FC<BlogProps> = ({ onBackToHome }) => {
  const { cmsData } = useAdminData();
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  // Comment state for detail view
  const [commentName, setCommentName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [commentsList, setCommentsList] = useState<Array<{ name: string; date: string; text: string }>>([
    { name: 'Andi Pratama', date: '6 Juli 2026', text: 'Sangat bermanfaat tipsnya! Kebetulan minggu depan rencana trekking perdana bareng temen kantor ke Curug Leuwi Hejo.' },
    { name: 'Siti Rahma', date: '7 Juli 2026', text: 'Rekomendasi sepatu trekking yang ramah di kantong apa ya min? Makasih.' }
  ]);
  const [commentSubmitted, setCommentSubmitted] = useState(false);

  // Filter published articles
  const allArticles = cmsData?.articles || [];
  const publishedArticles = allArticles.filter(art => art.status === 'published');

  // Get unique categories
  const categories = ['Semua', ...Array.from(new Set(publishedArticles.map(art => art.category)))];

  // Filter by category and search
  const filteredArticles = publishedArticles.filter(art => {
    const matchesCategory = selectedCategory === 'Semua' || art.category === selectedCategory;
    const matchesSearch = art.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          art.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          art.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const selectedArticle = publishedArticles.find(art => art.id === selectedArticleId);

  // Helper to format date in Indonesian style
  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    } catch (e) {
      return dateStr;
    }
  };

  // Safe content renderer (converts markdown headings, lists, paragraphs cleanly)
  const renderContent = (content: string) => {
    return content.split('\n').map((paragraph, index) => {
      const trimmed = paragraph.trim();
      if (!trimmed) return <div key={index} className="h-4" />;

      // H3 heading
      if (trimmed.startsWith('### ')) {
        return (
          <h3 key={index} className="text-lg md:text-xl font-bold font-display text-gray-900 mt-8 mb-4">
            {trimmed.replace('### ', '')}
          </h3>
        );
      }
      // H2 heading
      if (trimmed.startsWith('## ')) {
        return (
          <h2 key={index} className="text-xl md:text-2xl font-bold font-display text-gray-900 mt-10 mb-4 border-b border-gray-150 pb-2">
            {trimmed.replace('## ', '')}
          </h2>
        );
      }
      // List item
      if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
        const text = trimmed.substring(2);
        // check for bold parts e.g. **Bold**
        return (
          <li key={index} className="list-disc list-inside text-gray-600 text-sm md:text-base leading-relaxed ml-4 my-2">
            {renderBoldText(text)}
          </li>
        );
      }
      // Ordered list item (e.g., "1. ")
      if (/^\d+\.\s/.test(trimmed)) {
        const text = trimmed.replace(/^\d+\.\s/, '');
        return (
          <li key={index} className="list-decimal list-inside text-gray-600 text-sm md:text-base leading-relaxed ml-4 my-2">
            {renderBoldText(text)}
          </li>
        );
      }

      return (
        <p key={index} className="text-gray-600 text-sm md:text-base leading-relaxed mb-4">
          {renderBoldText(paragraph)}
        </p>
      );
    });
  };

  // Helper to detect and render bold markdown **text**
  const renderBoldText = (text: string) => {
    const parts = text.split(/\*\*([^*]+)\*\*/g);
    if (parts.length === 1) return text;
    
    return parts.map((part, i) => {
      // odd indices are the matched bold groups
      if (i % 2 === 1) {
        return <strong key={i} className="font-bold text-gray-900">{part}</strong>;
      }
      return part;
    });
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentName.trim() || !commentText.trim()) return;

    const newComment = {
      name: commentName,
      date: 'Baru saja',
      text: commentText
    };

    setCommentsList([newComment, ...commentsList]);
    setCommentName('');
    setCommentText('');
    setCommentSubmitted(true);
    setTimeout(() => setCommentSubmitted(false), 3000);
  };

  const handleDeleteComment = (indexToDelete: number) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus komentar ini?')) {
      setCommentsList(prev => prev.filter((_, idx) => idx !== indexToDelete));
    }
  };

  return (
    <div className="pt-24 pb-20 min-h-screen bg-[#f5f8f6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ARTICLE DETAIL VIEW */}
        {selectedArticle ? (
          <article className="max-w-4xl mx-auto bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Header / Breadcrumb */}
            <div className="p-6 md:p-8 border-b border-gray-100 bg-gray-50/50 flex flex-wrap justify-between items-center gap-4">
              <button
                onClick={() => setSelectedArticleId(null)}
                className="flex items-center gap-2 text-xs md:text-sm font-bold text-[#3d7c51] hover:text-[#2d5a3b] transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                Kembali ke Daftar Blog
              </button>
              <button
                onClick={onBackToHome}
                className="text-xs font-medium text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              >
                Kembali ke Beranda Utama
              </button>
            </div>

            {/* Cover Image */}
            <div className="relative h-64 md:h-[400px] w-full overflow-hidden">
              <img
                src={selectedArticle.coverImage || 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80'}
                alt={selectedArticle.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-[#3d7c51] text-white text-[11px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                  {selectedArticle.category}
                </span>
              </div>
            </div>

            {/* Content Container */}
            <div className="p-6 md:p-12">
              {/* Meta info */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 mb-6 font-sans">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#3d7c51]" />
                  {formatDate(selectedArticle.createdAt)}
                </span>
                <span className="text-gray-300">|</span>
                <span className="flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-[#3d7c51]" />
                  Ditulis oleh {selectedArticle.author || 'Tim JWest'}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-2xl md:text-4xl font-bold font-display text-gray-900 leading-tight mb-8">
                {selectedArticle.title}
              </h1>

              {/* Excerpt panel */}
              <div className="bg-emerald-50/50 border-l-4 border-[#3d7c51] p-4 md:p-6 rounded-r-2xl mb-8">
                <p className="text-sm md:text-base text-emerald-900 font-sans italic leading-relaxed">
                  "{selectedArticle.excerpt}"
                </p>
              </div>

              {/* Body Content */}
              <div className="prose prose-emerald max-w-none mb-12">
                {renderContent(selectedArticle.content)}
              </div>

              {/* Tags */}
              {selectedArticle.tags && selectedArticle.tags.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 pt-6 border-t border-gray-100">
                  <span className="text-xs text-gray-400 font-sans flex items-center gap-1">
                    <Tag className="w-3 h-3" /> Tags:
                  </span>
                  {selectedArticle.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="bg-gray-150 text-gray-600 text-[10px] md:text-xs px-2.5 py-1 rounded-lg"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Comments Section */}
            <div className="p-6 md:p-12 bg-gray-50 border-t border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 font-display mb-6 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[#3d7c51]" />
                Diskusi & Komentar ({commentsList.length})
              </h3>

              {/* Comment Form */}
              <form onSubmit={handleCommentSubmit} className="bg-white p-6 rounded-2xl border border-gray-150 shadow-sm mb-8 space-y-4">
                <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Tinggalkan Komentar</h4>
                
                {commentSubmitted && (
                  <div className="bg-emerald-50 text-emerald-800 text-xs p-3 rounded-xl border border-emerald-100">
                    Komentar Anda berhasil ditambahkan! Terima kasih telah berpartisipasi.
                  </div>
                )}

                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">Nama Lengkap</label>
                    <input
                      type="text"
                      required
                      value={commentName}
                      onChange={(e) => setCommentName(e.target.value)}
                      placeholder="Contoh: Budi Santoso"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#3d7c51]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">Komentar Anda</label>
                    <textarea
                      required
                      rows={3}
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      placeholder="Tulis opini atau pertanyaan Anda di sini..."
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#3d7c51]"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-[#3d7c51] hover:bg-[#2d5a3b] text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Kirim Komentar
                  </button>
                </div>
              </form>

              {/* Comment list */}
              <div className="space-y-4">
                {commentsList.map((comm, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-xl border border-gray-150 shadow-sm flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-xs font-bold text-gray-900 font-sans">{comm.name}</span>
                        <span className="text-[10px] text-gray-400 font-sans">{comm.date}</span>
                      </div>
                      <p className="text-xs md:text-sm text-gray-600 font-sans leading-relaxed">
                        {comm.text}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDeleteComment(idx)}
                      className="text-red-400 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 transition-colors cursor-pointer flex-shrink-0"
                      title="Hapus Komentar"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </article>
        ) : (
          
          /* BLOG LIST VIEW */
          <div>
            {/* Header Section */}
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-[#3d7c51] text-xs font-black tracking-widest uppercase px-3 py-1.5 rounded-full mb-3 shadow-sm border border-emerald-100">
                <BookOpen className="w-3.5 h-3.5" />
                <span>BLOG & BERITA</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black font-display text-gray-900 tracking-tight leading-tight">
                Eksplorasi Ide, Panduan & Cerita Petualangan
              </h2>
              <p className="text-xs md:text-sm text-gray-500 font-sans leading-relaxed mt-2">
                Dapatkan tips terbaru seputar trekking, kegiatan outbound, pengembangan tim korporasi, serta jurnal wisata edukatif langsung dari ahlinya.
              </p>
            </div>

            {/* Filter and Search Bar Row */}
            <div className="bg-white p-4 rounded-2xl border border-gray-150 shadow-sm mb-8 flex flex-col md:flex-row gap-4 justify-between items-center">
              {/* Category Pills */}
              <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold font-sans transition-all cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-[#3d7c51] text-white shadow-sm'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Search input */}
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari judul atau isi blog..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2 text-xs focus:outline-none focus:border-[#3d7c51]"
                />
              </div>
            </div>

            {/* Articles Grid */}
            {filteredArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArticles.map((art) => (
                  <article
                    key={art.id}
                    onClick={() => {
                      setSelectedArticleId(art.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md hover:border-gray-200 transition-all flex flex-col cursor-pointer group"
                  >
                    {/* Cover image */}
                    <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                      <img
                        src={art.coverImage || 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80'}
                        alt={art.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="bg-[#3d7c51] text-white text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider">
                          {art.category}
                        </span>
                      </div>
                    </div>

                    {/* Meta and Body info */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Meta date */}
                        <div className="flex items-center gap-1.5 text-[10px] md:text-xs text-gray-400 font-sans mb-3">
                          <Calendar className="w-3.5 h-3.5 text-gray-400" />
                          {formatDate(art.createdAt)}
                        </div>

                        {/* Title */}
                        <h3 className="text-base font-bold text-gray-900 font-display leading-snug tracking-tight mb-2 group-hover:text-[#3d7c51] transition-colors">
                          {art.title}
                        </h3>

                        {/* Excerpt */}
                        <p className="text-xs md:text-sm text-gray-500 font-sans leading-relaxed line-clamp-3 mb-4">
                          {art.excerpt}
                        </p>
                      </div>

                      {/* Footer link / Author */}
                      <div className="pt-4 border-t border-gray-100 flex justify-between items-center mt-2">
                        <span className="text-[10px] text-gray-400 font-sans font-medium flex items-center gap-1">
                          <User className="w-3 h-3 text-gray-300" /> By {art.author || 'Tim JWest'}
                        </span>
                        <span className="text-xs font-bold text-[#3d7c51] font-sans group-hover:translate-x-1 transition-transform inline-flex items-center gap-0.5">
                          Baca Post &rarr;
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-gray-150 p-12 text-center max-w-md mx-auto">
                <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <h4 className="text-base font-bold text-gray-800 font-display">Tidak Ada Blog</h4>
                <p className="text-xs text-gray-500 font-sans leading-normal mt-1.5">
                  Maaf, tidak ditemukan postingan blog dengan filter kategori atau pencarian tersebut. Silakan coba filter lainnya.
                </p>
                <button
                  onClick={() => { setSelectedCategory('Semua'); setSearchQuery(''); }}
                  className="bg-emerald-50 hover:bg-emerald-100 text-[#3d7c51] text-xs font-bold px-4 py-2 rounded-xl mt-4 transition-colors cursor-pointer"
                >
                  Reset Semua Filter
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, Instagram, Facebook, Calendar, CheckCircle2 } from 'lucide-react';
import { useAdminData } from '../context/AdminDataContext';

export const ContactUs: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { cmsData } = useAdminData();
  const whatsappNumber = cmsData?.general?.whatsAppNumber || '6281234567890';

  const formattedPhone = whatsappNumber.startsWith('62') 
    ? `+62 ${whatsappNumber.slice(2, 5)}-${whatsappNumber.slice(5, 9)}-${whatsappNumber.slice(9)}` 
    : whatsappNumber;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message) return;

    const msg = encodeURIComponent(
      `Halo JWest Adventure, saya ${name}.\nNomor Kontak: ${phone}\nEmail: ${email}\nPertanyaan:\n${message}`
    );

    setSubmitted(true);
    setTimeout(() => {
      window.open(`https://wa.me/${whatsappNumber}?text=${msg}`, '_blank');
      setSubmitted(false);
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    }, 1500);
  };

  return (
    <section id="contact-us" className="py-20 bg-[#fbfcfb]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs font-extrabold text-[#3d7c51] uppercase tracking-widest block mb-2">Kontak Kami</span>
          <h2 className="text-3xl md:text-4xl font-display font-black text-gray-900 mb-4 tracking-tight">
            Mulai Rencanakan Petualangan Hebat Anda
          </h2>
          <div className="w-16 h-1 bg-[#3d7c51] mx-auto rounded-full mb-6" />
          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
            Punya pertanyaan mengenai paket trekking, custom corporate outbound, atau agenda camping edukasi sekolah? Hubungi kami langsung dan kami siap melayani sepenuh hati.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Direct Info & Map */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <h3 className="text-xl md:text-2xl font-display font-black text-[#102a1b] mb-6">
                Informasi Hubungi Kami
              </h3>
              
              <div className="space-y-6 mb-8">
                {/* Phone */}
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-[#3d7c51] flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 font-sans">WhatsApp Hot-Line</h4>
                    <p className="text-xs md:text-sm text-gray-600 font-sans font-medium">{formattedPhone}</p>
                    <p className="text-[11px] text-gray-400 font-sans">Senin - Minggu (08:00 - 21:00 WIB)</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-[#3d7c51] flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 font-sans">Email Resmi</h4>
                    <p className="text-xs md:text-sm text-gray-600 font-sans font-medium">info@jwestadventure.com</p>
                    <p className="text-[11px] text-gray-400 font-sans">Saran & Penawaran Kerja Sama</p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-[#3d7c51] flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 font-sans">Basecamp & Office</h4>
                    <p className="text-xs md:text-sm text-gray-600 font-sans leading-relaxed">
                      Jl. Raya Sentul No. 28, Babakan Madang, Kabupaten Bogor, Jawa Barat 16810
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Custom Styled Map Block (highly polished aesthetic map representation) */}
            <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-md h-60 bg-emerald-50 relative">
              {/* Minimal SVG stylized map illustration representing Sentul Basecamp */}
              <svg className="absolute inset-0 w-full h-full text-emerald-800/10" fill="none" viewBox="0 0 400 240">
                <path d="M0 40h400M0 120h400M0 190h400M80 0v240M220 0v240M320 0v240" stroke="currentColor" strokeWidth="2" />
                <path d="M-50 80l200 120M250 20l150 160" stroke="#3d7c51" strokeWidth="3" strokeDasharray="4 4" />
                {/* Custom Green area for basecamp zone */}
                <circle cx="220" cy="120" r="30" fill="#a3e635" className="opacity-20" />
                <circle cx="220" cy="120" r="10" fill="#2d5a3b" />
              </svg>

              <div className="absolute inset-0 bg-gradient-to-t from-[#102a1b]/90 via-[#102a1b]/40 to-transparent flex flex-col justify-end p-5 text-white">
                <h4 className="text-sm font-display font-bold mb-1 flex items-center gap-1.5 text-[#a3e635]">
                  <MapPin className="w-4 h-4" />
                  JWest Basecamp Sentul
                </h4>
                <p className="text-[11px] text-gray-300 font-sans">
                  Dekat dengan titik awal trekking air terjun & perbukitan Sentul. Parkir luas & aman.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-lg">
            {submitted ? (
              <div className="py-12 flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 mb-4 animate-pulse">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-display font-bold text-gray-900 mb-2">Pesan Anda Berhasil Diproses!</h4>
                <p className="text-xs text-gray-500 max-w-sm font-sans mb-4">
                  Sistem kami mengarahkan Anda ke WhatsApp untuk mengirimkan langsung pertanyaan ini secara real-time.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-lg font-display font-bold text-gray-900 mb-2">
                  Kirim Pesan Instan
                </h3>
                <p className="text-xs text-gray-500 font-sans mb-6">
                  Isi formulir singkat di bawah ini, admin kami akan langsung menyapa Anda kembali di WhatsApp.
                </p>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5 font-sans">Nama Lengkap</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Contoh: Budi Santoso"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-xs md:text-sm text-gray-900 focus:outline-none focus:border-[#3d7c51] transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5 font-sans">No. WhatsApp / HP</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Contoh: 081234567890"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-xs md:text-sm text-gray-900 focus:outline-none focus:border-[#3d7c51] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5 font-sans">Alamat Email (Opsional)</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="budi@email.com"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-xs md:text-sm text-gray-900 focus:outline-none focus:border-[#3d7c51] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5 font-sans">Pesan / Pertanyaan Anda</label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tulis rincian pertanyaan Anda di sini..."
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-xs md:text-sm text-gray-900 focus:outline-none focus:border-[#3d7c51] transition-colors"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-[#102a1b] hover:bg-[#1a412a] text-white font-sans font-bold text-xs md:text-sm py-4 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    <Send className="w-4 h-4" />
                    <span>Kirim Lewat WhatsApp</span>
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};

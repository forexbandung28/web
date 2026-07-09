import React from 'react';
import { JWestLogo } from './Header';
import { Instagram, Facebook, Youtube, Heart, Lock } from 'lucide-react';
import { useAdminData } from '../context/AdminDataContext';

interface FooterProps {
  onLinkClick: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onLinkClick }) => {
  const { cmsData, setAdminModeActive } = useAdminData();
  const logoText = cmsData?.general?.logoText || 'JWEST';
  const logoSub = cmsData?.general?.logoSub || 'ADVENTURE';
  const brandName = `${logoText} ${logoSub.toLowerCase().replace(/^\w/, (c) => c.toUpperCase())}`;

  return (
    <footer className="bg-[#0b1c12] text-white pt-16 pb-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Upper Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          
          {/* Column 1: Brand details */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <JWestLogo iconColorClass="text-[#a3e635]" textColorClass="text-white" className="mb-4" />
              <p className="text-gray-400 text-xs md:text-sm leading-relaxed font-sans max-w-sm mb-6">
                {brandName} menyediakan solusi outbound, trekking, team building, dan experiential learning terbaik di Indonesia. Aman, professional, dan berlisensi nasional.
              </p>
            </div>
            {/* Social Media Links */}
            <div className="flex gap-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#a3e635] hover:text-[#102a1b] flex items-center justify-center transition-colors duration-200">
                <Instagram className="w-4.5 h-4.5" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#a3e635] hover:text-[#102a1b] flex items-center justify-center transition-colors duration-200">
                <Facebook className="w-4.5 h-4.5" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#a3e635] hover:text-[#102a1b] flex items-center justify-center transition-colors duration-200">
                <Youtube className="w-4.5 h-4.5" />
              </a>
            </div>
          </div>


          {/* Column 2: Navigation Links */}
          <div className="md:col-span-3">
            <h4 className="text-sm font-display font-bold tracking-wider text-[#a3e635] uppercase mb-4">
              Program Kami
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="#corporate-experience"
                  onClick={(e) => { e.preventDefault(); onLinkClick('corporate-experience'); }}
                  className="text-gray-400 hover:text-white text-xs md:text-sm font-sans font-medium transition-colors"
                >
                  Corporate Outbound & Gathering
                </a>
              </li>
              <li>
                <a
                  href="#individual-adventure"
                  onClick={(e) => { e.preventDefault(); onLinkClick('individual-adventure'); }}
                  className="text-gray-400 hover:text-white text-xs md:text-sm font-sans font-medium transition-colors"
                >
                  Trekking & Hiking Pegunungan
                </a>
              </li>
              <li>
                <a
                  href="#adventure-learning"
                  onClick={(e) => { e.preventDefault(); onLinkClick('adventure-learning'); }}
                  className="text-gray-400 hover:text-white text-xs md:text-sm font-sans font-medium transition-colors"
                >
                  Character Building (Edukasi Sekolah)
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div className="md:col-span-2">
            <h4 className="text-sm font-display font-bold tracking-wider text-[#a3e635] uppercase mb-4">
              Halaman Utama
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="#home"
                  onClick={(e) => { e.preventDefault(); onLinkClick('home'); }}
                  className="text-gray-400 hover:text-white text-xs md:text-sm font-sans font-medium transition-colors"
                >
                  Home / Beranda
                </a>
              </li>
              <li>
                <a
                  href="#about-us"
                  onClick={(e) => { e.preventDefault(); onLinkClick('about-us'); }}
                  className="text-gray-400 hover:text-white text-xs md:text-sm font-sans font-medium transition-colors"
                >
                  About Us / Profil
                </a>
              </li>
              <li>
                <a
                  href="#gallery"
                  onClick={(e) => { e.preventDefault(); onLinkClick('gallery'); }}
                  className="text-gray-400 hover:text-white text-xs md:text-sm font-sans font-medium transition-colors"
                >
                  Gallery / Dokumentasi
                </a>
              </li>
              <li>
                <a
                  href="#blog"
                  onClick={(e) => { e.preventDefault(); onLinkClick('blog'); }}
                  className="text-gray-400 hover:text-white text-xs md:text-sm font-sans font-medium transition-colors"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#contact-us"
                  onClick={(e) => { e.preventDefault(); onLinkClick('contact-us'); }}
                  className="text-gray-400 hover:text-white text-xs md:text-sm font-sans font-medium transition-colors"
                >
                  Contact Us / Kontak
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Operational */}
          <div className="md:col-span-2">
            <h4 className="text-sm font-display font-bold tracking-wider text-[#a3e635] uppercase mb-4">
              Kantor Utama
            </h4>
            <p className="text-gray-400 text-xs font-sans leading-relaxed">
              Babakan Madang, Kabupaten Bogor, Jawa Barat.
            </p>
            <p className="text-gray-400 text-[11px] font-mono mt-3 leading-none text-[#a3e635]/80">
              Setiap Hari (08:00 - 21:00 WIB)
            </p>
          </div>

        </div>

        {/* Lower Banner Section (Copyright) */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
          <p className="text-xs text-gray-500 font-sans">
            &copy; {new Date().getFullYear()} {brandName}. Seluruh hak cipta dilindungi undang-undang.
          </p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setAdminModeActive(true)}
              className="text-xs text-gray-500 hover:text-[#a3e635] font-sans flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Admin Panel</span>
            </button>
            <span className="text-gray-800 text-xs hidden sm:inline">|</span>
            <p className="text-[10px] text-gray-600 font-sans flex items-center gap-1">
              Made with <Heart className="w-3 h-3 text-red-500 fill-current" /> for {brandName} Community
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
};

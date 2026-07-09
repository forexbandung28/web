import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, ShieldCheck } from 'lucide-react';
import { NavItem } from '../types';
import { useAdminData } from '../context/AdminDataContext';

export const JWestLogo: React.FC<{ className?: string; iconColorClass?: string; textColorClass?: string }> = ({
  className = '',
  iconColorClass = 'text-[#2d5a3b]',
  textColorClass = 'text-[#1e3a27]'
}) => {
  const { cmsData } = useAdminData();
  const logoText = cmsData?.general?.logoText || 'JWEST';
  const logoSub = cmsData?.general?.logoSub || 'ADVENTURE';

  return (
    <div className={`flex items-center gap-2 select-none ${className}`}>
      {/* Dynamic SVG Mountain Logo similar to JWest */}
      <svg className="w-10 h-10" viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Left Mountain Peak */}
        <path d="M15 85L50 25L85 85" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" className={iconColorClass} />
        {/* Right Mountain Peak */}
        <path d="M55 85L80 45L105 85" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" className={iconColorClass} />
        {/* Lime Accent Lines representing ridges/climbing paths */}
        <path d="M35 85L50 60" stroke="#a3e635" strokeWidth="6" strokeLinecap="round" />
        <path d="M68 85L80 65" stroke="#a3e635" strokeWidth="6" strokeLinecap="round" />
      </svg>
      <div className="flex flex-col leading-none">
        <span className={`text-xl font-display font-black tracking-tight ${textColorClass}`}>{logoText}</span>
        <span className={`text-[9px] font-sans font-semibold tracking-[0.25em] ${textColorClass} opacity-80 uppercase`}>{logoSub}</span>
      </div>
    </div>
  );
};

interface HeaderProps {
  navItems: NavItem[];
  activeSection: string;
  onNavItemClick: (id: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ navItems, activeSection, onNavItemClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { cmsData, setAdminModeActive } = useAdminData();
  const whatsappNumber = cmsData?.general?.whatsAppNumber || '6281234567890';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleWhatsAppClick = () => {
    // Open whatsapp with custom message
    const message = encodeURIComponent("Halo JWest Adventure, saya tertarik untuk berkonsultasi mengenai paket petualangan outdoor/outbound.");
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };


  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 py-3'
          : 'bg-white/80 backdrop-blur-sm md:bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); onNavItemClick('home'); }}
            onDoubleClick={() => setAdminModeActive(true)}
            className="cursor-pointer"
            title="Double click for Admin Panel"
          >
            <JWestLogo iconColorClass="text-[#3d7c51]" textColorClass="text-gray-900" />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-1 xl:space-x-4 items-center">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavItemClick(item.id);
                  }}
                  className={`relative px-1.5 xl:px-3 py-2 text-xs xl:text-sm font-medium font-sans transition-all duration-200 hover:text-[#3d7c51] whitespace-nowrap ${
                    isActive ? 'text-[#1e3a27] font-semibold' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#2d5a3b] rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Action Button - WhatsApp */}
          <div className="hidden md:block">
            <button
              onClick={handleWhatsAppClick}
              className="flex items-center gap-2 bg-[#102a1b] text-white hover:bg-[#1a412a] px-5 py-2.5 rounded-full text-sm font-medium shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group"
            >
              {/* WhatsApp Icon resembling the phone inside pill shape from image */}
              <svg className="w-4 h-4 fill-current text-white group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.968C16.528 2.015 14.07 1 11.451 1a9.85 9.85 0 00-9.855 9.805c-.001 1.701.453 3.361 1.314 4.815l-.971 3.546 3.651-.958zm12.355-6.626c-.33-.165-1.951-.963-2.251-1.072-.3-.11-.518-.165-.736.165-.218.33-.846 1.072-1.037 1.293-.19.22-.382.247-.712.082a9.01 9.01 0 01-2.641-1.624c-.992-.884-1.662-1.975-1.856-2.305-.195-.33-.021-.508.143-.672.149-.148.33-.385.495-.578.165-.193.22-.33.33-.55.11-.22.055-.413-.028-.578-.083-.165-.736-1.774-1.009-2.434-.266-.643-.538-.553-.736-.563-.19-.01-.408-.012-.625-.012-.218 0-.573.082-.872.413-.3.33-1.144 1.117-1.144 2.723 0 1.606 1.171 3.159 1.334 3.379.164.22 2.304 3.518 5.58 4.935.779.337 1.388.539 1.861.69.784.249 1.498.214 2.062.13.629-.094 1.951-.798 2.224-1.57.272-.771.272-1.431.19-1.57-.083-.14-.3-.22-.63-.385z" />
              </svg>
              <span>WhatsApp Us</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-[#2d5a3b] p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#2d5a3b]"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-lg py-4 px-6 flex flex-col gap-3">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                setIsOpen(false);
                onNavItemClick(item.id);
              }}
              className={`block py-2 text-base font-medium border-l-4 pl-3 ${
                activeSection === item.id
                  ? 'text-[#1e3a27] bg-[#2d5a3b]/5 border-[#2d5a3b]'
                  : 'text-gray-600 hover:text-gray-900 border-transparent hover:bg-gray-50'
              }`}
            >
              {item.label}
            </a>
          ))}
          <button
            onClick={() => {
              setIsOpen(false);
              handleWhatsAppClick();
            }}
            className="flex items-center justify-center gap-2 bg-[#102a1b] text-white py-3 px-4 rounded-full text-base font-medium mt-3"
          >
            <Phone className="w-5 h-5" />
            <span>Hubungi Kami di WhatsApp</span>
          </button>
        </div>
      )}
    </header>
  );
};

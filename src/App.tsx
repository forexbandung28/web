import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutUs } from './components/AboutUs';
import { CorporateExperience } from './components/CorporateExperience';
import { IndividualAdventure } from './components/IndividualAdventure';
import { AdventureLearning } from './components/AdventureLearning';
import { Gallery } from './components/Gallery';
import { ContactUs } from './components/ContactUs';
import { Footer } from './components/Footer';
import { NavItem } from './types';
import { useAdminData } from './context/AdminDataContext';
import { AdminPanel } from './components/AdminPanel';
import { Blog } from './components/Blog';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [view, setView] = useState<'landing' | 'blog'>('landing');
  const { isAdminModeActive } = useAdminData();

  const navItems: NavItem[] = [
    { id: 'home', label: 'Home', href: '#home' },
    { id: 'about-us', label: 'About Us', href: '#about-us' },
    { id: 'individual-adventure', label: 'Individual Adventure', href: '#individual-adventure' },
    { id: 'corporate-experience', label: 'Corporate Experience', href: '#corporate-experience' },
    { id: 'adventure-learning', label: 'Adventure Learning', href: '#adventure-learning' },
    { id: 'gallery', label: 'Gallery', href: '#gallery' },
    { id: 'blog', label: 'Blog', href: '#blog' },
    { id: 'contact-us', label: 'Contact Us', href: '#contact-us' },
  ];

  // Scrollspy to detect active section
  useEffect(() => {
    if (isAdminModeActive) return; // Disable scrollspy if in admin dashboard
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px', // focused in center/top of viewport
      threshold: 0,
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    navItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      navItems.forEach((item) => {
        const element = document.getElementById(item.id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [isAdminModeActive]);

  const handleNavItemClick = (id: string) => {
    if (id === 'blog') {
      setView('blog');
      setActiveSection('blog');
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      return;
    }

    setView('landing');
    setActiveSection(id);

    // Delay scroll slightly to ensure DOM is fully rendered if switching back from blog view
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        // Offset scroll height for fixed header
        const headerOffset = 70;
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }, 60);
  };

  if (isAdminModeActive) {
    return <AdminPanel />;
  }

  return (
    <div className="min-h-screen bg-[#f5f8f6] font-sans antialiased text-[#102a1b]">
      {/* Navigation Header */}
      <Header
        navItems={navItems}
        activeSection={activeSection}
        onNavItemClick={handleNavItemClick}
      />

      {/* Main Sections */}
      {view === 'blog' ? (
        <Blog onBackToHome={() => handleNavItemClick('home')} />
      ) : (
        <main>
          <Hero onExploreClick={handleNavItemClick} />
          <AboutUs />
          <IndividualAdventure />
          <CorporateExperience />
          <AdventureLearning />
          <Gallery />
          <ContactUs />
        </main>
      )}

      {/* Footer */}
      <Footer onLinkClick={handleNavItemClick} />
    </div>
  );
}



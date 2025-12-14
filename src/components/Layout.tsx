
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Dumbbell, Download, Share2, Instagram } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const handleShare = async () => {
    const shareData = {
      title: 'Body Titan Fitness',
      text: 'Rejoins la team Body Titan ! Application de coaching musculation par TitanGryx.',
      url: window.location.origin
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.origin);
      toast.success('Lien copié !');
    }
  };

  useEffect(() => {
    const handleInstallPrompt = (e: any) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();

      // Check if app is already installed (standalone mode)
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
      if (isStandalone) return;

      // Show custom toast
      setTimeout(() => {
        toast((t) =>
        <div className="flex flex-col gap-3 min-w-[250px]">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-bold text-white">Installer l'App ? 📲</h4>
                <p className="text-sm text-gray-300 mt-1">Accès rapide et mode hors ligne</p>
              </div>
              <button onClick={() => toast.dismiss(t.id)} className="text-gray-400 hover:text-white">
                <X size={16} />
              </button>
            </div>
            <button
            onClick={() => {
              e.prompt();
              toast.dismiss(t.id);
            }}
            className="w-full bg-gradient-to-r from-red-600 to-green-600 text-white py-2 rounded-lg font-bold flex items-center justify-center gap-2 hover:shadow-lg transition-all">

              <Download size={18} />
              Installer maintenant
            </button>
          </div>,
        {
          duration: 15000,
          position: 'bottom-center',
          style: {
            background: '#1f2937',
            border: '1px solid #374151',
            padding: '16px',
            borderRadius: '12px',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)'
          }
        });
      }, 3000); // Delay to not be intrusive immediately
    };

    window.addEventListener('beforeinstallprompt', handleInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleInstallPrompt);
  }, []);

  const navItems = [
  { path: '/', label: 'Accueil' },
  { path: '/exercices', label: 'Exercices' },
  { path: '/programmes', label: 'Programmes' },
  { path: '/nutrition', label: 'Nutrition' },
  { path: '/produits', label: 'Produits' },
  { path: '/abonnement', label: 'Abonnement' },

  { path: '/contact', label: 'Contact' }];


  return (
    <div className="min-h-screen bg-gray-900">
      {/* Navigation */}
      <nav className="bg-gray-800 border-b-4 border-red-600 sticky top-0 z-50 mt-[0px] mb-[1px] pt-[0px] -pb-[2px]">
        <div className="max-w-7xl sm:px-6 lg:px-8 ml-[0px] pt-[0px] pl-[16px] pr-[16px] pb-[0px]">
          <div className="flex justify-between items-center h-16 mt-[4px] mb-[0px] pt-[9px] pb-[7px]">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <img
                src="https://static.lumi.new/1e/1ecc140aedc8223004686d783fac93ef.webp"
                alt="MyGorx Fitness Logo"
                className="h-12 w-auto"></img>
              <span className="text-white font-bold text-xl">MyGorx Fitness</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === item.path ?
                'bg-red-600 text-white' :
                'text-gray-300 hover:bg-green-600 hover:text-white'}`
                }>

                  {item.label}
                </Link>
              )}
              <button
                onClick={handleShare}
                className="flex items-center gap-2 bg-gray-700 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-all font-medium border border-gray-600 hover:border-green-500"
                title="Partager l'application">

                <Share2 size={18} />
                <span>Partager</span>
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white p-2">

              {isMenuOpen ? <X size={24} /> : <Menu size={24} className=""></Menu>}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen &&
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-gray-800 border-t border-gray-700">

            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) =>
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsMenuOpen(false)}
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
              location.pathname === item.path ?
              'bg-red-600 text-white' :
              'text-gray-300 hover:bg-green-600 hover:text-white'}`
              }>

                  {item.label}
                </Link>
            )}
              <button
              onClick={() => {
                handleShare();
                setIsMenuOpen(false);
              }}
              className="w-full text-left flex items-center gap-3 px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-green-600 hover:text-white transition-colors border-t border-gray-700 mt-2 pt-3">

                <Share2 size={20} />
                Partager l'application à un ami
              </button>
            </div>
          </motion.div>
        }
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 border-t-4 border-green-600 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4 text-red-500">MyGorx Fitness</h3>
              <p className="text-gray-300 text-center font-semibold">“Astuces : le contrôle de la charge est très important, une exécution lente est toujours contrôlée pour favoriser un meilleur recrutement, l'entrainement représente 30 % des résultats, le reste se construit dans l'assiette ,avec un bon sommeil réparateur  !  8h00 idéal”
 

              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4 text-green-500">Contact</h3>
              <div className="text-gray-300 space-y-2">
                <p>📧 bodytitan64@yahoo.com</p>
                
                <p>📍 Saint-Jean-de-Luz, France</p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4 text-red-500">Suivez-nous</h3>
              <a
                href="https://www.instagram.com/gregouuz_e/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-300 hover:text-white transition-all group">

                <div className="relative w-16 h-16 rounded-xl overflow-hidden border-2 border-transparent group-hover:border-pink-500 transition-all group-hover:scale-110">
                  <img
                    src="https://static.lumi.new/b7/b767cd7f39f5b1df1ba60037d1a0a061.webp"
                    alt="TitanGryx Instagram"
                    className="w-full h-full object-cover" />

                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-pink-600/20 to-orange-500/20"></div>
                </div>
                <div>
                  <p className="font-bold text-white">@gregouuz_e</p>
                  <p className="text-sm text-gray-400">Suis mes conseils fitness</p>
                </div>
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center text-gray-400">
            <p>© 2025 MyGorx Fitness - TitanGryx. Tous droits réservés.</p>
            <Link to="/mentions-legales" className="text-sm hover:text-white transition-colors mt-2 md:mt-0">
              Mentions Légales, CGV & Santé
            </Link>
          </div>
        </div>
      </footer>
    </div>);
};

export default Layout;
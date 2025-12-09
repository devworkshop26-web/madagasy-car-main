
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Bell, ChevronDown, BookOpen, HelpCircle, Facebook, Instagram, Linkedin, Twitter, Send, Mail, Key } from 'lucide-react';
import { UserRole } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  userRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, userRole, onRoleChange }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path ? 'text-primary-600 bg-primary-50 font-semibold' : 'text-gray-600 hover:text-primary-600 hover:text-primary-600 hover:bg-gray-50';
  const navItemClass = "inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200";

  const handleRoleSwitch = (role: UserRole) => {
    onRoleChange(role);
    navigate('/dashboard');
    setIsMobileMenuOpen(false);
  };

  const handleBecomeHost = () => {
      onRoleChange(UserRole.OWNER);
      navigate('/dashboard');
      setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans text-gray-900">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-[100] shadow-sm backdrop-blur-md bg-white/95">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center mr-8 group">
                <span className="font-extrabold text-3xl tracking-tight text-secondary-900 group-hover:opacity-90 transition-opacity flex items-start">
                    Mcar
                    <div className="flex gap-1 ml-0.5 -mt-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#ef4444]"></span>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2563eb]"></span>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]"></span>
                    </div>
                </span>
              </Link>
              <div className="hidden md:flex md:items-center md:space-x-2">
                <Link to="/" className={`${navItemClass} ${isActive('/')}`}>
                  Accueil
                </Link>
                <Link to="/search" className={`${navItemClass} ${isActive('/search')}`}>
                  Véhicules
                </Link>
                <Link to="/blog" className={`${navItemClass} ${isActive('/blog')}`}>
                  Blog
                </Link>
                <Link to="/faq" className={`${navItemClass} ${isActive('/faq')}`}>
                  Comment ça marche ?
                </Link>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-6">
              
              {/* BECOME A HOST CTA */}
              <button 
                onClick={handleBecomeHost}
                className="hidden lg:flex items-center gap-2 bg-gradient-to-r from-primary-600 to-primary-500 text-white px-5 py-2.5 rounded-full font-bold text-sm hover:shadow-lg hover:-translate-y-0.5 transition-all shadow-primary-500/20 mr-2"
              >
                  <Key size={16} className="text-white"/>
                  Devenir Hôte
              </button>

              {/* Role Switcher Demo */}
              <div className="relative group h-full flex items-center">
                <button className="flex items-center gap-2 text-xs font-medium text-gray-500 hover:text-primary-600 bg-gray-100 px-3 py-1.5 rounded-full transition-colors cursor-pointer">
                  Mode: <span className="uppercase font-bold text-primary-600">{userRole}</span> <ChevronDown size={12}/>
                </button>
                {/* Dropdown with padding-top (pt-4) to create a bridge for hover */}
                <div className="absolute right-0 top-full pt-4 w-48 hidden group-hover:block z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="bg-white rounded-xl shadow-xl py-2 border border-gray-100">
                    <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider bg-gray-50/50 mb-1">Changer de rôle</div>
                    {Object.values(UserRole).map(role => (
                      <button
                        key={role}
                        onClick={() => handleRoleSwitch(role)}
                        className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors flex items-center gap-2"
                      >
                        <div className={`w-2 h-2 rounded-full ${userRole === role ? 'bg-primary-500' : 'bg-gray-300'}`}></div>
                        {role}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button className="text-gray-400 hover:text-primary-600 relative transition-colors p-2 hover:bg-gray-50 rounded-full">
                <Bell size={22} />
                <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
              </button>

              <div className="flex items-center gap-3 pl-6 border-l border-gray-200">
                <div className="flex flex-col text-right">
                  <span className="text-sm font-bold text-gray-900">Rasoa Soa</span>
                  <span className="text-xs text-primary-600 font-medium">Membre Vérifié</span>
                </div>
                <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden border-2 border-white shadow-md cursor-pointer hover:ring-2 hover:ring-primary-500 transition-all">
                  <img src="https://i.pravatar.cc/150?img=5" alt="Avatar" className="h-full w-full object-cover"/>
                </div>
              </div>
            </div>

            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-lg text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-gray-100 shadow-lg absolute w-full z-50">
            <div className="pt-2 pb-3 space-y-1 px-4">
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-3 rounded-lg text-base font-medium text-gray-700 hover:bg-primary-50 hover:text-primary-700">
                Accueil
              </Link>
              <Link to="/search" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-3 rounded-lg text-base font-medium text-gray-700 hover:bg-primary-50 hover:text-primary-700">
                Véhicules
              </Link>
              <Link to="/blog" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-3 rounded-lg text-base font-medium text-gray-700 hover:bg-primary-50 hover:text-primary-700 flex items-center gap-2">
                <BookOpen size={18}/> Blog
              </Link>
              <Link to="/faq" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-3 rounded-lg text-base font-medium text-gray-700 hover:bg-primary-50 hover:text-primary-700 flex items-center gap-2">
                <HelpCircle size={18}/> Comment ça marche ?
              </Link>

              <button onClick={handleBecomeHost} className="w-full text-left block px-3 py-3 rounded-lg text-base font-bold text-white bg-gradient-to-r from-primary-600 to-primary-500 flex items-center gap-2 mt-2 shadow-lg">
                <Key size={18}/> Devenir Hôte
              </button>
              
              <div className="border-t border-gray-100 mt-4 pt-4">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Changer de rôle (Accès Dashboard)</p>
                <div className="grid grid-cols-2 gap-2">
                    {Object.values(UserRole).map(role => (
                        <button
                            key={role}
                            onClick={() => handleRoleSwitch(role)}
                            className={`px-3 py-2 text-sm rounded-lg text-center font-medium border ${userRole === role ? 'bg-primary-50 border-primary-200 text-primary-700' : 'bg-gray-50 border-gray-100 text-gray-600'}`}
                        >
                            {role}
                        </button>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-secondary-900 text-white pt-16 pb-8 border-t border-secondary-800">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            
            {/* Col 1: Brand */}
            <div className="space-y-6">
              <div className="flex items-center gap-1">
                <span className="font-extrabold text-3xl tracking-tight text-white flex items-start">
                    Mcar
                    <div className="flex gap-1 ml-0.5 -mt-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#ef4444]"></span>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2563eb]"></span>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]"></span>
                    </div>
                </span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                La première plateforme de location de véhicules entre particuliers à Madagascar. 
                Une communauté de confiance pour explorer l'île Rouge en toute sécurité.
              </p>
            </div>
            
            {/* Col 2: Navigation */}
            <div>
              <h4 className="text-lg font-bold mb-6 text-white">Liens Utiles</h4>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li><Link to="/search" className="hover:text-primary-400 transition-colors">Trouver un véhicule</Link></li>
                <li><button onClick={handleBecomeHost} className="hover:text-primary-400 transition-colors text-left">Louer mon véhicule</button></li>
                <li><Link to="/faq" className="hover:text-primary-400 transition-colors">Comment ça marche</Link></li>
                <li><Link to="/blog" className="hover:text-primary-400 transition-colors">Blog & Conseils</Link></li>
                <li><Link to="#" className="hover:text-primary-400 transition-colors">Assurances</Link></li>
              </ul>
            </div>

            {/* Col 3: Contact */}
            <div>
              <h4 className="text-lg font-bold mb-6 text-white">Contact</h4>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li className="flex items-start gap-3">
                    <span className="opacity-70 mt-1">📍</span> 
                    <span>Immeuble Prisme, Ankorondrano,<br/>Antananarivo 101</span>
                </li>
                <li className="flex items-center gap-3">
                    <span className="opacity-70">📞</span>
                    <span>+261 34 00 000 00</span>
                </li>
                <li className="flex items-center gap-3">
                    <span className="opacity-70">✉️</span>
                    <span>contact@mcar.mg</span>
                </li>
              </ul>
            </div>

            {/* Col 4: Stay Connected (New) */}
            <div>
                <h4 className="text-lg font-bold mb-6 text-white">Restez Connecté</h4>
                <p className="text-gray-400 text-sm mb-4">Abonnez-vous pour nos offres exclusives.</p>
                
                <form className="mb-6" onSubmit={(e) => e.preventDefault()}>
                    <div className="flex gap-2">
                        <input 
                            type="email" 
                            placeholder="Email" 
                            className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary-500 transition-all"
                        />
                        <button className="bg-primary-600 hover:bg-primary-500 text-white p-2 rounded-lg transition-colors">
                            <Send size={18} />
                        </button>
                    </div>
                </form>

                <div className="flex gap-4">
                    <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary-600 text-gray-400 hover:text-white transition-all duration-300">
                        <Facebook size={18} />
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary-600 text-gray-400 hover:text-white transition-all duration-300">
                        <Instagram size={18} />
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary-600 text-gray-400 hover:text-white transition-all duration-300">
                        <Linkedin size={18} />
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary-600 text-gray-400 hover:text-white transition-all duration-300">
                        <Twitter size={18} />
                    </a>
                </div>
            </div>

          </div>
          <div className="border-t border-gray-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-xs">
            <p>&copy; {new Date().getFullYear()} Mcar. Tous droits réservés.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
                <Link to="#" className="hover:text-white transition-colors">Confidentialité</Link>
                <Link to="#" className="hover:text-white transition-colors">CGU</Link>
                <Link to="#" className="hover:text-white transition-colors">Mentions Légales</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;

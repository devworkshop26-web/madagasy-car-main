
import React, { useState, useEffect } from 'react';
import { Search, Shield, Users, ArrowRight, CheckCircle, Car, Zap, Mail, ChevronRight, FileText, ExternalLink, ChevronLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { CITIES, MOCK_VEHICLES, MOCK_BLOG_POSTS, HERO_SLIDES } from '../constants';
import VehicleCard from '../components/VehicleCard';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState('Antananarivo');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate with query params to pre-filter results
    navigate(`/search?city=${encodeURIComponent(location)}&from=${dateFrom}&to=${dateTo}`);
  };

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));

  const featuredVehicles = MOCK_VEHICLES.slice(0, 6);
  const latestArticles = MOCK_BLOG_POSTS.slice(0, 3);

  return (
    <div className="w-full bg-gray-50">
      {/* Full Screen Hero Carousel */}
      <div className="relative h-[85vh] lg:h-screen w-full overflow-hidden bg-secondary-900">
        {HERO_SLIDES.map((slide, index) => (
          <div 
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
          >
            <img 
              src={slide.image} 
              alt={slide.title} 
              className="w-full h-full object-cover opacity-80"
            />
            {/* Dark Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10 sm:bg-gradient-to-tr sm:from-black/80 sm:via-transparent"></div>
          </div>
        ))}

        {/* Text Content - Positioned higher on mobile to avoid overlap */}
        <div className="absolute bottom-1/3 lg:bottom-32 left-0 w-full z-20 px-4 sm:px-6 lg:px-12 pointer-events-none">
          <div className="max-w-[1800px] mx-auto pointer-events-auto">
            <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 bg-primary-600/90 backdrop-blur-md px-4 py-1.5 rounded-full mb-6 animate-in fade-in slide-in-from-left-4 duration-700 shadow-lg">
                    <span className="flex h-2 w-2 rounded-full bg-white animate-pulse"></span>
                    <span className="text-white text-xs font-bold uppercase tracking-wider">Disponible dans 8 villes</span>
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-4 leading-none drop-shadow-xl transition-all duration-700">
                  {HERO_SLIDES[currentSlide].title}
                </h1>
                <p className="text-lg md:text-2xl text-gray-200 font-light max-w-2xl drop-shadow-md mb-8">
                  {HERO_SLIDES[currentSlide].subtitle}
                </p>
            </div>
          </div>
        </div>

        {/* Carousel Controls */}
        <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-md p-3 rounded-full text-white transition-all z-20 hidden md:block border border-white/10">
            <ChevronLeft size={32} />
        </button>
        <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-md p-3 rounded-full text-white transition-all z-20 hidden md:block border border-white/10">
            <ChevronRight size={32} />
        </button>
        
        {/* Dots */}
        <div className="absolute bottom-32 lg:bottom-12 right-10 flex gap-2 z-20">
            {HERO_SLIDES.map((_, idx) => (
                <button 
                    key={idx} 
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-2 rounded-full transition-all duration-300 shadow-sm ${idx === currentSlide ? 'bg-primary-500 w-8' : 'bg-white/40 hover:bg-white w-2'}`}
                />
            ))}
        </div>

        {/* Floating Search Bar - Centered at bottom edge on mobile, Right on Desktop */}
        <div className="absolute bottom-0 left-0 right-0 z-30 transform translate-y-1/2 px-4 lg:px-0 lg:translate-y-0 lg:bottom-20 lg:right-20 lg:left-auto lg:w-[450px]">
           <div className="bg-white p-6 rounded-2xl lg:rounded-3xl shadow-2xl border border-gray-100 lg:border-white/20 lg:backdrop-blur-sm max-w-[1800px] mx-auto lg:mx-0">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Search size={20} className="text-primary-600"/> Trouver un véhicule
            </h3>
            <form onSubmit={handleSearch} className="flex flex-col gap-4">
              <div className="space-y-1">
                <label className="text-xs text-gray-500 font-bold uppercase">Ville</label>
                <select 
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary-500 outline-none font-semibold text-gray-800"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                >
                  {CITIES.map(city => <option key={city} value={city}>{city}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                 <div className="space-y-1">
                    <label className="text-xs text-gray-500 font-bold uppercase">Début</label>
                    <input type="date" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-3 text-sm focus:ring-2 focus:ring-primary-500 outline-none font-semibold text-gray-800" onChange={(e) => setDateFrom(e.target.value)} />
                 </div>
                 <div className="space-y-1">
                    <label className="text-xs text-gray-500 font-bold uppercase">Fin</label>
                    <input type="date" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-3 text-sm focus:ring-2 focus:ring-primary-500 outline-none font-semibold text-gray-800" onChange={(e) => setDateTo(e.target.value)} />
                 </div>
              </div>
              <button type="submit" className="w-full bg-secondary-900 hover:bg-primary-600 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg flex justify-center items-center gap-2 mt-2">
                  <Search size={20} />
                  Rechercher
                </button>
            </form>
           </div>
        </div>
      </div>

      {/* Main Content Split - Padding top added to account for the overlapping search bar on mobile */}
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-24 pt-48 lg:pt-24">
        <div className="flex flex-col xl:flex-row gap-12 relative items-start">
            
            {/* LEFT COLUMN (Main Content) */}
            <div className="xl:w-3/4 space-y-16">
                
                {/* Featured Vehicles Section */}
                <section>
                    <div className="flex justify-between items-end mb-8">
                        <div>
                            <h2 className="text-3xl font-bold text-secondary-900">Véhicules populaires</h2>
                            <p className="text-gray-500 mt-2">Sélectionnés pour leur confort et fiabilité.</p>
                        </div>
                        <Link to="/search" className="hidden md:flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors text-sm">
                            Voir tout <ArrowRight size={16}/>
                        </Link>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {featuredVehicles.map(vehicle => (
                            <div key={vehicle.id} className="h-[360px]">
                                <VehicleCard vehicle={vehicle} />
                            </div>
                        ))}
                    </div>
                    <div className="mt-8 text-center">
                        <Link to="/search" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-secondary-900 bg-white border-gray-200 hover:bg-gray-50 shadow-sm transition-all">
                            Voir tout le catalogue ({MOCK_VEHICLES.length}+)
                        </Link>
                    </div>
                </section>

                {/* Value Props Section */}
                <section className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary-50 rounded-full blur-3xl -mr-32 -mt-32 opacity-50"></div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-8 relative z-10">Pourquoi choisir MadaDrive ?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                        <div className="flex flex-col gap-4 group p-4 rounded-2xl hover:bg-gray-50 transition-colors">
                            <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                <Shield size={28} />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-gray-900">Assurance complète</h3>
                                <p className="text-gray-500 text-sm leading-relaxed mt-2">
                                    Nous collaborons avec Allianz Madagascar pour assurer chaque trajet. Pas de frais cachés.
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 group p-4 rounded-2xl hover:bg-gray-50 transition-colors">
                            <div className="w-14 h-14 bg-green-50 text-green-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-green-600 group-hover:text-white transition-colors">
                                <CheckCircle size={28} />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-gray-900">Vérification rigoureuse</h3>
                                <p className="text-gray-500 text-sm leading-relaxed mt-2">
                                    Chaque véhicule est inspecté et chaque profil vérifié par notre équipe de sécurité à Tana.
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 group p-4 rounded-2xl hover:bg-gray-50 transition-colors">
                            <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                                <Users size={28} />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-gray-900">Communauté locale</h3>
                                <p className="text-gray-500 text-sm leading-relaxed mt-2">
                                    Louez à de vrais locaux qui pourront vous donner les meilleurs conseils pour votre voyage.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

            </div>

            {/* RIGHT COLUMN (Sidebar) */}
            <aside className="xl:w-1/4 space-y-8 sticky top-24 self-start w-full">
                
                {/* Quick Actions */}
                <div className="bg-white p-6 rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="p-2 bg-primary-100 rounded-lg text-primary-600">
                            <Zap size={20} fill="currentColor" />
                        </div>
                        <h3 className="font-bold text-gray-900 text-lg">Actions Rapides</h3>
                    </div>
                    
                    <div className="space-y-3">
                        <Link to="/search" className="flex items-center justify-between p-4 bg-gray-50 hover:bg-primary-50 hover:text-primary-700 rounded-xl transition-all group border border-gray-100 hover:border-primary-200">
                            <div className="flex items-center gap-3">
                                <Car size={18} className="text-gray-400 group-hover:text-primary-500"/>
                                <span className="font-semibold text-sm">Louer un 4x4</span>
                            </div>
                            <ChevronRight size={16} className="text-gray-300 group-hover:text-primary-500"/>
                        </Link>
                        <Link to="/dashboard" className="flex items-center justify-between p-4 bg-gray-50 hover:bg-primary-50 hover:text-primary-700 rounded-xl transition-all group border border-gray-100 hover:border-primary-200">
                            <div className="flex items-center gap-3">
                                <Zap size={18} className="text-gray-400 group-hover:text-primary-500"/>
                                <span className="font-semibold text-sm">Gagner de l'argent</span>
                            </div>
                            <ChevronRight size={16} className="text-gray-300 group-hover:text-primary-500"/>
                        </Link>
                         <button className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-primary-50 hover:text-primary-700 rounded-xl transition-all group border border-gray-100 hover:border-primary-200">
                            <div className="flex items-center gap-3">
                                <Shield size={18} className="text-gray-400 group-hover:text-primary-500"/>
                                <span className="font-semibold text-sm">Centre d'aide / FAQ</span>
                            </div>
                            <ExternalLink size={16} className="text-gray-300 group-hover:text-primary-500"/>
                        </button>
                    </div>

                    <div className="mt-6 pt-6 border-t border-gray-100">
                        <p className="text-xs text-gray-500 font-medium mb-3">Besoin d'assistance immédiate ?</p>
                        <a href="tel:+261340000000" className="flex items-center justify-center gap-2 w-full py-3 bg-secondary-900 text-white rounded-xl font-bold text-sm hover:bg-secondary-800 transition-colors">
                            Appeler le Support 24/7
                        </a>
                    </div>
                </div>

                {/* Newsletter Widget */}
                <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 -mr-10 -mt-10 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl"></div>
                    <div className="absolute bottom-0 left-0 -ml-10 -mb-10 w-32 h-32 bg-black opacity-10 rounded-full blur-2xl"></div>
                    
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-3">
                            <Mail size={20} />
                            <h3 className="font-bold text-lg">Newsletter</h3>
                        </div>
                        <p className="text-primary-100 text-sm mb-4 leading-snug">
                            Recevez nos promos exclusives et guides de voyage à Mada.
                        </p>
                        <form className="space-y-2" onSubmit={(e) => e.preventDefault()}>
                            <input 
                                type="email" 
                                placeholder="Votre email" 
                                className="w-full px-3 py-2.5 rounded-lg bg-white/20 border border-white/30 text-white placeholder-primary-200 text-sm focus:outline-none focus:ring-2 focus:ring-white/50"
                            />
                            <button className="w-full bg-white text-primary-700 font-bold py-2.5 rounded-lg text-sm hover:bg-primary-50 transition-colors shadow-sm">
                                Je m'abonne
                            </button>
                        </form>
                    </div>
                </div>

                {/* Latest Blog Posts Widget */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-gray-900 flex items-center gap-2">
                            <FileText size={18} className="text-gray-400"/> Derniers Articles
                        </h3>
                        <Link to="/blog" className="text-xs font-semibold text-primary-600 hover:text-primary-700">Voir tout</Link>
                    </div>
                    <div className="space-y-5">
                        {latestArticles.map(post => (
                            <Link to="/blog" key={post.id} className="flex gap-3 group">
                                <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                                    <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/>
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-gray-900 leading-snug mb-1 group-hover:text-primary-600 transition-colors line-clamp-2">
                                        {post.title}
                                    </h4>
                                    <span className="text-xs text-gray-400">{post.date}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

            </aside>
        </div>
      </div>

      {/* Full Width CTA Section */}
      <section className="bg-secondary-900 py-16 border-t border-white/10">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Prêt à prendre la route ?</h2>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/search" className="bg-primary-600 text-white font-bold py-3 px-8 rounded-xl hover:bg-primary-500 transition-all shadow-lg shadow-primary-500/30">
                    Trouver un véhicule
                </Link>
                <Link to="/dashboard" className="bg-white/10 text-white font-bold py-3 px-8 rounded-xl hover:bg-white/20 transition-all backdrop-blur-sm border border-white/10">
                    Commencer à gagner de l'argent
                </Link>
            </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

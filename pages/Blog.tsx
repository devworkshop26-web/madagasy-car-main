
import React, { useState } from 'react';
import { MOCK_BLOG_POSTS, MOCK_BLOG_CATEGORIES } from '../constants';
import { Calendar, User, ArrowRight, Search, Mail, Tag, ChevronRight, TrendingUp } from 'lucide-react';

const Blog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('Tous');

  // Filter posts based on search and category
  const filteredPosts = MOCK_BLOG_POSTS.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'Tous' || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // Get recent posts (simulating last 3)
  const recentPosts = [...MOCK_BLOG_POSTS].sort((a, b) => b.id - a.id).slice(0, 3);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Blog Header */}
      <div className="relative bg-secondary-900 py-24 overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=1920')] bg-cover bg-center opacity-20"></div>
         <div className="absolute inset-0 bg-gradient-to-t from-secondary-900 via-transparent to-transparent"></div>
         
         <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-block py-1 px-3 rounded-full bg-primary-500/20 text-primary-400 text-sm font-bold tracking-wider uppercase mb-4 border border-primary-500/30">
              MadaDrive Magazine
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
               L'aventure commence ici
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
               Guides de voyage, astuces mécaniques et actualités de la communauté pour explorer Madagascar en toute liberté.
            </p>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12 relative items-start">
          
          {/* Main Content (Articles) */}
          <div className="lg:w-2/3">
             <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                   {activeCategory === 'Tous' ? 'Derniers Articles' : `Catégorie : ${activeCategory}`}
                </h2>
                <span className="text-sm text-gray-500">{filteredPosts.length} article(s)</span>
             </div>

             <div className="grid gap-8">
                {filteredPosts.length > 0 ? (
                  filteredPosts.map(post => (
                    <article key={post.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group flex flex-col md:flex-row h-full md:h-64">
                        <div className="md:w-2/5 h-48 md:h-full overflow-hidden relative">
                            <img 
                              src={post.image} 
                              alt={post.title} 
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded-md text-xs font-bold text-secondary-900 uppercase shadow-sm">
                              {post.category}
                            </div>
                        </div>
                        <div className="p-6 md:w-3/5 flex flex-col justify-between">
                            <div>
                              <div className="flex items-center gap-3 text-xs text-gray-400 mb-2">
                                  <span className="flex items-center gap-1"><Calendar size={12}/> {post.date}</span>
                                  <span className="flex items-center gap-1"><User size={12}/> {post.author}</span>
                              </div>
                              <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight group-hover:text-primary-600 transition-colors">
                                  {post.title}
                              </h3>
                              <p className="text-gray-600 text-sm line-clamp-2">
                                  {post.excerpt}
                              </p>
                            </div>
                            <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
                               <button className="text-primary-600 font-bold text-sm uppercase tracking-wide flex items-center gap-1 hover:gap-2 transition-all">
                                  Lire la suite <ArrowRight size={14} />
                               </button>
                            </div>
                        </div>
                    </article>
                  ))
                ) : (
                  <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
                    <Search size={48} className="mx-auto text-gray-300 mb-4"/>
                    <h3 className="text-lg font-medium text-gray-900">Aucun article trouvé</h3>
                    <p className="text-gray-500">Essayez une autre recherche.</p>
                  </div>
                )}
             </div>

             {filteredPosts.length > 0 && (
               <div className="mt-12 flex justify-center">
                  <button className="bg-white border border-gray-200 text-gray-600 font-semibold py-3 px-8 rounded-full hover:bg-gray-50 hover:text-primary-600 transition-all shadow-sm">
                      Voir les anciens articles
                  </button>
               </div>
             )}
          </div>

          {/* Sidebar */}
          <aside className="lg:w-1/3 space-y-8 sticky top-24 self-start">
             
             {/* Quick Search */}
             <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                   <Search size={18} className="text-primary-500"/> Recherche
                </h3>
                <div className="relative">
                   <input 
                      type="text" 
                      placeholder="Chercher un article..." 
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                   />
                   <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
                </div>
             </div>

             {/* Newsletter */}
             <div className="bg-gradient-to-br from-secondary-900 to-secondary-800 p-8 rounded-2xl shadow-xl text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-primary-500 rounded-full blur-3xl opacity-20"></div>
                <h3 className="font-bold text-xl mb-2 flex items-center gap-2">
                   <Mail size={20} className="text-primary-400"/> Newsletter
                </h3>
                <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                   Recevez nos bons plans de location et guides de voyage directement dans votre boîte mail.
                </p>
                <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                   <input 
                      type="email" 
                      placeholder="Votre adresse email" 
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:bg-white/20 focus:border-primary-500 transition-all"
                   />
                   <button className="w-full bg-primary-600 hover:bg-primary-500 text-white font-bold py-3 px-4 rounded-xl transition-colors shadow-lg shadow-primary-900/50">
                      S'abonner
                   </button>
                </form>
                <p className="text-xs text-gray-500 mt-4 text-center">Pas de spam, désabonnement à tout moment.</p>
             </div>

             {/* Categories */}
             <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                   <Tag size={18} className="text-primary-500"/> Catégories
                </h3>
                <div className="flex flex-wrap gap-2">
                   {MOCK_BLOG_CATEGORIES.map(cat => (
                      <button 
                         key={cat}
                         onClick={() => setActiveCategory(cat)}
                         className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                            activeCategory === cat 
                            ? 'bg-primary-50 text-primary-700 ring-1 ring-primary-500' 
                            : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                         }`}
                      >
                         {cat}
                      </button>
                   ))}
                </div>
             </div>

             {/* Recent Posts Widget */}
             <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
                   <TrendingUp size={18} className="text-primary-500"/> Articles Récents
                </h3>
                <div className="space-y-6">
                   {recentPosts.map(post => (
                      <div key={post.id} className="flex gap-4 group cursor-pointer">
                         <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                            <img src={post.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/>
                         </div>
                         <div>
                            <h4 className="font-bold text-gray-900 text-sm leading-snug mb-1 group-hover:text-primary-600 transition-colors">
                               {post.title}
                            </h4>
                            <span className="text-xs text-gray-400">{post.date}</span>
                         </div>
                      </div>
                   ))}
                </div>
                <button className="w-full mt-6 flex items-center justify-center gap-2 text-sm font-semibold text-secondary-900 hover:text-primary-600 transition-colors">
                   Voir tous les articles <ChevronRight size={16}/>
                </button>
             </div>

             {/* Ad Space / Promo */}
             <div className="bg-yellow-50 border border-yellow-100 p-6 rounded-2xl text-center">
                 <p className="font-bold text-yellow-800 mb-2">Louez votre véhicule !</p>
                 <p className="text-sm text-yellow-700 mb-4">Gagnez de l'argent pendant que vous ne conduisez pas.</p>
                 <button className="text-xs font-bold uppercase tracking-wide bg-yellow-400 text-yellow-900 px-4 py-2 rounded-lg hover:bg-yellow-500 transition-colors">
                    Estimer mes revenus
                 </button>
             </div>

          </aside>
        </div>
      </div>
    </div>
  );
};

export default Blog;

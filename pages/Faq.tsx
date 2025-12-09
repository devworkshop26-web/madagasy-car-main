
import React, { useState } from 'react';
import { ShieldCheck, CheckCircle, XCircle, ArrowRight, AlertTriangle, AlertOctagon, Car, Wallet, Key, ChevronDown, ChevronUp, PlusCircle, Briefcase, BarChart3, Phone, Mail, FileText, Search, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const FaqItem = ({ question, answer }: { question: string, answer: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="bg-white border border-gray-100 rounded-xl mb-3 overflow-hidden transition-all duration-300 hover:shadow-md">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-4 px-6 flex justify-between items-center text-left hover:bg-gray-50 transition-colors"
            >
                <span className="font-bold text-gray-900 text-sm md:text-base">{question}</span>
                {isOpen ? <ChevronUp size={20} className="text-primary-600 flex-shrink-0 ml-4"/> : <ChevronDown size={20} className="text-gray-400 flex-shrink-0 ml-4"/>}
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="p-6 pt-0 text-gray-500 text-sm leading-relaxed border-t border-gray-50 bg-gray-50/30">
                    {answer}
                </div>
            </div>
        </div>
    );
};

const Faq: React.FC = () => {
  const scrollToRisks = () => {
    const element = document.getElementById('comparison');
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white font-sans">
       
       {/* HERO SECTION - FULL SCREEN */}
       <div className="relative h-screen w-full flex items-center justify-center overflow-hidden">
            {/* Working Hero Image - Road trip context */}
            <img 
                src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=1920" 
                className="absolute inset-0 w-full h-full object-cover scale-105 animate-in fade-in duration-1000" 
                alt="Madagascar Road Trip"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/80"></div>
            
            <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white flex flex-col items-center animate-in slide-in-from-bottom-10 duration-1000">
                <div className="inline-flex items-center gap-2 bg-red-600/20 border border-red-500/50 backdrop-blur-md px-4 py-2 rounded-full mb-8 animate-pulse">
                     <AlertOctagon size={18} className="text-red-500" />
                     <span className="text-red-100 font-bold text-sm tracking-wide uppercase">Stop aux arnaques sur Facebook</span>
                </div>
                
                <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tight leading-tight drop-shadow-2xl">
                    Votre sécurité n'est pas <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">une option.</span>
                </h1>
                <p className="text-xl md:text-2xl font-light text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
                    Louer une voiture à Madagascar peut être un cauchemar : épaves, vol d'acompte, fausses assurances. <br/>
                    <strong className="text-white font-bold">Ne jouez pas avec votre voyage. Choisissez Mcar.</strong>
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6">
                    <Link to="/search" className="bg-white text-secondary-900 px-8 py-4 rounded-full font-black text-lg hover:scale-105 transition-transform shadow-2xl flex items-center gap-2 hover:bg-gray-100">
                        Trouver un véhicule sûr <ArrowRight size={20}/>
                    </Link>
                    <button onClick={scrollToRisks} className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all cursor-pointer">
                        Comprendre les risques
                    </button>
                </div>
            </div>
       </div>

       {/* SCAM VS MCAR COMPARISON */}
       <section id="comparison" className="py-24 bg-gray-50 scroll-mt-20">
           <div className="max-w-7xl mx-auto px-6">
               <div className="text-center mb-16">
                   <h2 className="text-4xl font-black text-secondary-900 mb-4">Le choix vous appartient</h2>
                   <p className="text-xl text-gray-500">Deux manières de louer, deux résultats très différents.</p>
               </div>

               <div className="grid md:grid-cols-2 gap-8 md:gap-0 items-stretch rounded-[3rem] overflow-hidden shadow-2xl">
                   
                   {/* THE RISK (SCAM/INFORMAL) */}
                   <div className="bg-secondary-900 text-white p-12 md:p-16 relative overflow-hidden group">
                       <img 
                           src="https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&q=80&w=800"
                           className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay grayscale"
                           alt="Car Breakdown Risk"
                       />
                       <div className="absolute top-0 right-0 w-64 h-64 bg-red-600 rounded-full blur-[100px] opacity-20 -mr-20 -mt-20"></div>
                       
                       <div className="relative z-10">
                           <div className="w-16 h-16 bg-red-500/20 text-red-500 rounded-2xl flex items-center justify-center mb-8 border border-red-500/30 shadow-lg shadow-red-900/50">
                               <AlertTriangle size={32} />
                           </div>
                           <h3 className="text-3xl font-bold mb-2">Le Marché Informel</h3>
                           <p className="text-red-300 font-bold uppercase tracking-wider text-xs mb-8">Facebook, Annonces Leboncoin...</p>
                           
                           <ul className="space-y-6">
                               <li className="flex items-start gap-4 opacity-90 hover:opacity-100 transition-opacity">
                                   <XCircle className="text-red-500 shrink-0 mt-1" size={24} />
                                   <div>
                                       <strong className="block text-lg text-white mb-1">Abandon Client / Prestataire</strong>
                                       <p className="text-sm text-gray-400">Le prestataire ne vient pas ou le client disparaît sans prévenir.</p>
                                   </div>
                               </li>
                               <li className="flex items-start gap-4 opacity-90 hover:opacity-100 transition-opacity">
                                   <XCircle className="text-red-500 shrink-0 mt-1" size={24} />
                                   <div>
                                       <strong className="block text-lg text-white mb-1">Véhicule Non Conforme</strong>
                                       <p className="text-sm text-gray-400">État déplorable, fausse déclaration (le fameux "c'était déjà abîmé").</p>
                                   </div>
                               </li>
                               <li className="flex items-start gap-4 opacity-90 hover:opacity-100 transition-opacity">
                                   <XCircle className="text-red-500 shrink-0 mt-1" size={24} />
                                   <div>
                                       <strong className="block text-lg text-white mb-1">Double Location</strong>
                                       <p className="text-sm text-gray-400">Vous êtes la victime : le véhicule est loué à un plus offrant à la dernière minute.</p>
                                   </div>
                               </li>
                               <li className="flex items-start gap-4 opacity-90 hover:opacity-100 transition-opacity">
                                   <XCircle className="text-red-500 shrink-0 mt-1" size={24} />
                                   <div>
                                       <strong className="block text-lg text-white mb-1">Papiers Expirés</strong>
                                       <p className="text-sm text-gray-400">Assurance invalide ou visite technique non conforme. En cas de contrôle, c'est la fourrière.</p>
                                   </div>
                               </li>
                               <li className="flex items-start gap-4 opacity-90 hover:opacity-100 transition-opacity">
                                   <XCircle className="text-red-500 shrink-0 mt-1" size={24} />
                                   <div>
                                       <strong className="block text-lg text-white mb-1">Arnaque à l'Avance</strong>
                                       <p className="text-sm text-gray-400">Paiement Mobile Money envoyé, puis le "propriétaire" ne vient jamais.</p>
                                   </div>
                               </li>
                               <li className="flex items-start gap-4 opacity-90 hover:opacity-100 transition-opacity">
                                   <XCircle className="text-red-500 shrink-0 mt-1" size={24} />
                                   <div>
                                       <strong className="block text-lg text-white mb-1">Fuite après Accident</strong>
                                       <p className="text-sm text-gray-400">Aucune responsabilité, aucune trace, aucune assurance pour couvrir les dégâts.</p>
                                   </div>
                               </li>
                           </ul>
                       </div>
                   </div>

                   {/* THE SOLUTION (MCAR) */}
                   <div className="bg-white text-gray-900 p-12 md:p-16 relative overflow-hidden">
                       <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full blur-[100px] opacity-50 -mr-20 -mt-20"></div>
                       <div className="relative z-10">
                           <div className="w-16 h-16 bg-blue-100 text-primary-600 rounded-2xl flex items-center justify-center mb-8">
                               <ShieldCheck size={32} />
                           </div>
                           <h3 className="text-3xl font-bold mb-2">La Protection Mcar</h3>
                           <p className="text-primary-600 font-bold uppercase tracking-wider text-xs mb-8">Plateforme Tiers de Confiance</p>
                           
                           <ul className="space-y-8">
                               <li className="flex items-start gap-4">
                                   <CheckCircle className="text-green-500 shrink-0 mt-1" size={24} />
                                   <div>
                                       <strong className="block text-xl text-gray-900 mb-1">Propriétaires Vérifiés (KYC)</strong>
                                       <p className="text-sm text-gray-500 leading-relaxed">Nous validons CIN, Carte Grise et état du véhicule avant toute mise en ligne. Vous savez à qui vous louez.</p>
                                   </div>
                               </li>
                               <li className="flex items-start gap-4">
                                   <CheckCircle className="text-green-500 shrink-0 mt-1" size={24} />
                                   <div>
                                       <strong className="block text-xl text-gray-900 mb-1">Paiement Sécurisé</strong>
                                       <p className="text-sm text-gray-500 leading-relaxed">Votre argent est bloqué sur un compte séquestre Mcar. Le propriétaire n'est payé qu'après la remise des clés.</p>
                                   </div>
                               </li>
                               <li className="flex items-start gap-4">
                                   <CheckCircle className="text-green-500 shrink-0 mt-1" size={24} />
                                   <div>
                                       <strong className="block text-xl text-gray-900 mb-1">Assurances à la Carte</strong>
                                       <p className="text-sm text-gray-500 leading-relaxed">
                                            <span className="font-bold text-orange-600 block mb-1">Attention : Assurance non incluse par défaut.</span>
                                            Choisissez votre niveau de protection (Tiers ou Tous Risques) lors de la réservation pour rouler en toute sérénité.
                                       </p>
                                   </div>
                               </li>
                           </ul>
                           
                           <div className="mt-12">
                               <Link to="/search" className="block w-full bg-primary-600 text-white text-center font-bold py-4 rounded-xl hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/30 transform hover:-translate-y-1">
                                   Je choisis la sécurité
                               </Link>
                           </div>
                       </div>
                   </div>
               </div>
           </div>
       </section>
       
       {/* HOW IT WORKS STEPS - RENTER */}
       <section className="py-24 bg-white">
           <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                     <span className="text-primary-600 font-bold uppercase tracking-widest text-sm">Pour les Voyageurs</span>
                     <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-2">L'expérience Mcar en 3 étapes</h2>
                </div>
                
                <div className="grid md:grid-cols-3 gap-12">
                     <div className="text-center px-4">
                         <div className="w-full h-72 rounded-[2rem] overflow-hidden mb-8 relative shadow-lg group">
                             <img src="https://images.unsplash.com/photo-1533473359331-0135ef1bcfb0?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Booking"/>
                             <div className="absolute top-4 left-4 w-12 h-12 bg-white rounded-full flex items-center justify-center font-bold text-xl shadow-md border border-gray-100 text-secondary-900">1</div>
                             <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                         </div>
                         <h3 className="text-2xl font-bold mb-3 text-gray-900">Réservez en ligne</h3>
                         <p className="text-gray-500 leading-relaxed">Comparez et choisissez parmi nos véhicules certifiés. Bloquez votre réservation avec un acompte sécurisé.</p>
                     </div>
                     <div className="text-center px-4">
                         <div className="w-full h-72 rounded-[2rem] overflow-hidden mb-8 relative shadow-lg group">
                             <img src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Checkin"/>
                             <div className="absolute top-4 left-4 w-12 h-12 bg-white rounded-full flex items-center justify-center font-bold text-xl shadow-md border border-gray-100 text-secondary-900">2</div>
                             <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                         </div>
                         <h3 className="text-2xl font-bold mb-3 text-gray-900">Check-in Digital</h3>
                         <p className="text-gray-500 leading-relaxed">Rencontrez le propriétaire. Validez l'état des lieux et le kilométrage directement sur l'app en 5 minutes.</p>
                     </div>
                     <div className="text-center px-4">
                         <div className="w-full h-72 rounded-[2rem] overflow-hidden mb-8 relative shadow-lg group">
                             <img src="https://images.unsplash.com/photo-1504681869696-d97721183f4b?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Drive"/>
                             <div className="absolute top-4 left-4 w-12 h-12 bg-white rounded-full flex items-center justify-center font-bold text-xl shadow-md border border-gray-100 text-secondary-900">3</div>
                             <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                         </div>
                         <h3 className="text-2xl font-bold mb-3 text-gray-900">Roulez l'esprit libre</h3>
                         <p className="text-gray-500 leading-relaxed">Profitez de Madagascar. Au retour, le check-out libère automatiquement votre caution sous 48h.</p>
                     </div>
                </div>
           </div>
       </section>

       {/* HOW IT WORKS STEPS - OWNER & B2B */}
       <section className="py-24 bg-secondary-900 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-600 rounded-full blur-[120px] opacity-20 -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600 rounded-full blur-[120px] opacity-10 -ml-32 -mb-32"></div>
            
           <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
                    <div>
                        <span className="text-primary-400 font-bold uppercase tracking-widest text-sm">Investissement & Revenus</span>
                        <h2 className="text-3xl md:text-4xl font-black mt-2">Rentabilisez votre véhicule</h2>
                        <p className="text-gray-400 mt-4 max-w-xl text-lg">
                            Gagnez de l'argent intelligemment. Que vous soyez un particulier ou un gestionnaire de flotte, Mcar maximise vos revenus.
                        </p>
                    </div>
                    <Link to="/dashboard" className="bg-white text-secondary-900 px-8 py-3 rounded-xl font-bold hover:bg-primary-50 transition-colors shadow-lg whitespace-nowrap">
                        Estimer mes revenus
                    </Link>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-12">
                     <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors">
                         <div className="w-14 h-14 bg-primary-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-primary-500/20">
                             <PlusCircle size={28} className="text-white"/>
                         </div>
                         <h3 className="text-xl font-bold mb-4">1. Listez votre actif</h3>
                         <p className="text-gray-400 leading-relaxed">
                             Inscrivez votre véhicule gratuitement. Définissez votre prix journalier et vos disponibilités. C'est votre outil de travail.
                         </p>
                     </div>
                     <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors">
                         <div className="w-14 h-14 bg-blue-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/20">
                             <Key size={28} className="text-white"/>
                         </div>
                         <h3 className="text-xl font-bold mb-4">2. Validez & Louez</h3>
                         <p className="text-gray-400 leading-relaxed">
                             Vous gardez le contrôle total. Acceptez les demandes de locataires vérifiés et optimisez votre taux d'occupation.
                         </p>
                     </div>
                     <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors">
                         <div className="w-14 h-14 bg-green-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-green-500/20">
                             <Wallet size={28} className="text-white"/>
                         </div>
                         <h3 className="text-xl font-bold mb-4">3. Recevez vos gains</h3>
                         <p className="text-gray-400 leading-relaxed">
                             ROI immédiat. Le paiement est viré 48h après la location. Suivez vos performances financières en temps réel.
                         </p>
                     </div>
                </div>

                {/* B2B / FLEET SECTION */}
                <div className="bg-gradient-to-r from-primary-900 to-secondary-800 border border-primary-500/30 rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center gap-8 shadow-2xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
                    <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/10">
                        <Briefcase size={48} className="text-primary-400" />
                    </div>
                    <div className="flex-1 relative z-10">
                        <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-2xl font-bold text-white">Offre B2B & Gestion de Flotte</h3>
                            <span className="bg-primary-500 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Pro</span>
                        </div>
                        <p className="text-gray-300 leading-relaxed mb-4">
                            Vous gérez plus de 5 véhicules ? Accédez à notre <strong>Dashboard Pro</strong>.
                        </p>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-400">
                            <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-500"/> Facturation centralisée</li>
                            <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-500"/> Suivi de maintenance</li>
                            <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-500"/> Rotation optimisée</li>
                            <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-500"/> Compte manager dédié</li>
                        </ul>
                    </div>
                    <div className="relative z-10">
                        <Link to="/dashboard" className="flex items-center gap-2 bg-primary-600 hover:bg-primary-500 text-white px-6 py-4 rounded-xl font-bold transition-all shadow-lg shadow-primary-900/50 hover:-translate-y-1">
                            <BarChart3 size={20}/>
                            Espace Gestionnaire
                        </Link>
                    </div>
                </div>
           </div>
       </section>

       {/* FAQ SECTION RESTRUCTURED */}
       <section className="py-24 bg-gray-50">
           <div className="max-w-7xl mx-auto px-6">
                
                <div className="flex flex-col lg:flex-row gap-12 items-start">
                    
                    {/* LEFT COLUMN: FAQ CONTENT */}
                    <div className="lg:w-2/3">
                        <h2 className="text-3xl font-black text-secondary-900 mb-8">FAQ (Foire Aux Questions)</h2>
                        
                        <div className="mb-8">
                            <h3 className="text-lg font-bold text-primary-600 uppercase tracking-widest mb-4 flex items-center gap-2"><Car size={18}/> Pour les Locataires</h3>
                            <div className="space-y-2">
                                <FaqItem 
                                    question="Quels documents sont nécessaires pour louer ?" 
                                    answer="Pour louer sur Mcar, vous devez fournir une photo de votre Permis de Conduire valide (plus de 2 ans d'ancienneté) et de votre Carte d'Identité (CIN) ou Passeport. Ces documents sont vérifiés par notre équipe KYC avant votre première location."
                                />
                                <FaqItem 
                                    question="Y a-t-il une limite de kilométrage ?" 
                                    answer="Cela dépend du propriétaire. La plupart des locations incluent 200km/jour. Au-delà, un supplément peut être facturé (généralement 1000 Ar/km). Cette information est clairement indiquée sur la fiche de chaque véhicule."
                                />
                                <FaqItem 
                                    question="Le carburant est-il inclus ?" 
                                    answer="Non, le carburant n'est jamais inclus. La règle est 'rendu comme pris'. Si vous prenez le véhicule avec le plein, vous devez le rendre avec le plein. Tout manquement sera facturé au prix de la pompe + 10% de frais de service."
                                />
                                <FaqItem 
                                    question="Que faire en cas de retard au retour ?" 
                                    answer="Prévenez immédiatement le propriétaire via l'application. Une tolérance de 1 heure est généralement acceptée. Au-delà, une demi-journée ou une journée supplémentaire peut être facturée selon le retard."
                                />
                            </div>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-lg font-bold text-primary-600 uppercase tracking-widest mb-4 flex items-center gap-2"><Key size={18}/> Pour les Propriétaires</h3>
                            <div className="space-y-2">
                                <FaqItem 
                                    question="Combien coûte l'inscription sur Mcar ?" 
                                    answer="L'inscription et l'ajout de véhicules sont 100% gratuits. Mcar prélève une commission de 15% uniquement sur les locations confirmées et payées. Si vous ne louez pas, vous ne payez rien."
                                />
                                <FaqItem 
                                    question="Comment suis-je assuré contre le vol ?" 
                                    answer="Mcar vérifie l'identité de chaque locataire. De plus, nous exigeons que chaque véhicule ait sa propre assurance. En option, Mcar propose une assurance complémentaire pour couvrir les franchises en cas de sinistre majeur."
                                />
                                <FaqItem 
                                    question="Quand reçois-je mon paiement ?" 
                                    answer="Le paiement est sécurisé dès la réservation. Il est débloqué et viré sur votre compte mobile money ou bancaire 48h après la fin de la location, sous réserve qu'aucun litige n'ait été ouvert."
                                />
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-bold text-primary-600 uppercase tracking-widest mb-4 flex items-center gap-2"><Wallet size={18}/> Paiement & Caution</h3>
                            <div className="space-y-2">
                                <FaqItem 
                                    question="Comment fonctionne la caution ?" 
                                    answer="La caution (ou dépôt de garantie) est obligatoire. Elle est effectuée par empreinte bancaire (non débitée) ou par chèque de caution remis au propriétaire. Elle sert à couvrir les éventuels dommages ou contraventions."
                                />
                                <FaqItem 
                                    question="Quels moyens de paiement acceptez-vous ?" 
                                    answer="Nous acceptons MVola, Orange Money et Airtel Money pour faciliter les transactions locales, ainsi que les cartes Visa et Mastercard pour les touristes internationaux."
                                />
                                <FaqItem 
                                    question="Politique d'annulation" 
                                    answer="Annulation gratuite jusqu'à 48h avant le début. Entre 48h et 24h : 50% remboursé. Moins de 24h : aucun remboursement (pour dédommager le propriétaire de l'immobilisation)."
                                />
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: SIDEBAR (QUICK ACTIONS) */}
                    <aside className="lg:w-1/3 sticky top-24 space-y-6">
                        
                        {/* Support Widget */}
                        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                            <h3 className="font-bold text-xl text-gray-900 mb-4">Actions Rapides</h3>
                            
                            <div className="space-y-3">
                                <a href="tel:+261340000000" className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-primary-50 hover:text-primary-600 transition-colors group">
                                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-400 group-hover:text-primary-600 shadow-sm border border-gray-100">
                                        <Phone size={18}/>
                                    </div>
                                    <div>
                                        <span className="block font-bold text-sm text-gray-900">Appeler le Support</span>
                                        <span className="text-xs text-gray-500">Disponible 7j/7</span>
                                    </div>
                                </a>
                                <a href="mailto:support@mcar.mg" className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-primary-50 hover:text-primary-600 transition-colors group">
                                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-400 group-hover:text-primary-600 shadow-sm border border-gray-100">
                                        <Mail size={18}/>
                                    </div>
                                    <div>
                                        <span className="block font-bold text-sm text-gray-900">Email Service Client</span>
                                        <span className="text-xs text-gray-500">Réponse sous 24h</span>
                                    </div>
                                </a>
                                <button className="w-full flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-primary-50 hover:text-primary-600 transition-colors group text-left">
                                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-400 group-hover:text-primary-600 shadow-sm border border-gray-100">
                                        <FileText size={18}/>
                                    </div>
                                    <div>
                                        <span className="block font-bold text-sm text-gray-900">Modèles de Contrat</span>
                                        <span className="text-xs text-gray-500">PDF Téléchargeable</span>
                                    </div>
                                </button>
                            </div>
                        </div>

                        {/* CTA Widget */}
                        <div className="bg-secondary-900 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
                             <div className="absolute top-0 right-0 w-32 h-32 bg-primary-600 rounded-full blur-2xl opacity-20 -mr-10 -mt-10"></div>
                             <h3 className="font-bold text-lg mb-4 relative z-10">Prêt à démarrer ?</h3>
                             <div className="space-y-3 relative z-10">
                                 <Link to="/search" className="flex items-center justify-between w-full bg-white/10 hover:bg-white/20 p-3 rounded-xl transition-colors backdrop-blur-sm border border-white/10">
                                     <span className="font-bold text-sm flex items-center gap-2"><Search size={16}/> Louer une voiture</span>
                                     <ArrowRight size={16}/>
                                 </Link>
                                 <Link to="/dashboard" className="flex items-center justify-between w-full bg-primary-600 hover:bg-primary-500 p-3 rounded-xl transition-colors shadow-lg">
                                     <span className="font-bold text-sm flex items-center gap-2"><Zap size={16}/> Gagner de l'argent</span>
                                     <ArrowRight size={16}/>
                                 </Link>
                             </div>
                        </div>

                    </aside>
                </div>

           </div>
       </section>

    </div>
  );
};

export default Faq;

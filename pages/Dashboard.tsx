




import React, { useState } from 'react';
import { UserRole, VehicleType, BadgeLevel, Driver, Vehicle, User, DriverOption, VehicleDocument, AddOn, SupportTicket, TicketCategory, TicketPriority, TicketStatus, PipelineStage } from '../types';
import { 
    Calendar, CreditCard, Settings, Plus, AlertCircle, MessageCircle, CheckCircle, 
    Clock, ShieldCheck, Heart, User as UserIcon, Key, Wrench, Wallet, AlertTriangle, 
    Download, Users, Activity, Globe, MessageSquare, MapPin, XCircle, ChevronRight, 
    BarChart3, Car, Search, Filter, FileText, Edit, Trash2, Save, X, Ban, Send, 
    Award, Truck, Bike, Phone, Briefcase, TrendingUp, DollarSign, PenTool, 
    Layout as LayoutIcon, Banknote, CalendarDays, History, ChevronLeft, Star, 
    LogOut, Sliders, Bell, UploadCloud, PieChart, ArrowDownRight, ArrowUpRight, 
    Gauge, Infinity, Percent, AlertOctagon, Zap, MoreVertical, Lock, Printer, Receipt,
    Eye, MoreHorizontal, Check, Mail, BookOpen, Image as ImageIcon,
    Wifi, Map, Baby, Shield, Music, Coffee, Snowflake, BatteryCharging, ShoppingBag, Umbrella,
    LifeBuoy, PhoneCall, Headphones,
    Target, Camera, Home, CreditCard as CIDIcon, Smartphone, FileBadge,
    Grid, LayoutList, FilePlus
} from 'lucide-react';
import { 
    MOCK_VEHICLES, MOCK_TICKETS, MOCK_TRANSACTIONS, MOCK_USERS_LIST, 
    MOCK_ADMIN_VEHICLES, MOCK_BLOG_POSTS, COMMISSION_CONFIG, MOCK_DRIVERS, 
    MOCK_USER, MOCK_BOOKINGS, MOCK_INCIDENTS, MOCK_LIVE_STATS, MOCK_ACTIVE_RENTALS, DEFAULT_ADDONS,
    MOCK_SUPPORT_TICKETS
} from '../constants';

// --- SUB-COMPONENTS ---

const EditProfileModal = ({ user, onClose, onSave }: { user: User; onClose: () => void; onSave: (u: User) => void }) => {
  const [formData, setFormData] = useState({...user});

  return (
    <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in zoom-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-900">Modifier mon profil</h3>
            <button onClick={onClose}><X className="text-gray-400 hover:text-red-500" /></button>
        </div>
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
                <input 
                    type="text" 
                    value={formData.name} 
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 outline-none focus:ring-2 focus:ring-primary-500"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input 
                    type="email" 
                    value={formData.email} 
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 outline-none focus:ring-2 focus:ring-primary-500"
                />
            </div>
             <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                <input 
                    type="tel" 
                    value={formData.phone || ''} 
                    placeholder="+261 34 ..."
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 outline-none focus:ring-2 focus:ring-primary-500"
                />
            </div>
            <button 
                onClick={() => onSave(formData)}
                className="w-full bg-secondary-900 text-white font-bold py-3 rounded-xl hover:bg-secondary-800 transition-all mt-2"
            >
                Enregistrer les modifications
            </button>
        </div>
      </div>
    </div>
  );
};

const TransactionDetailModal = ({ transaction, onClose }: { transaction: any, onClose: () => void }) => {
    return (
        <div className="fixed inset-0 bg-black/60 z-[80] flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in zoom-in duration-200">
            <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                {/* Header */}
                <div className="bg-secondary-900 text-white p-6 relative">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-secondary-300 text-xs font-bold uppercase tracking-widest mb-1">Reçu de transaction</p>
                            <h3 className="text-2xl font-black">#{transaction.transactionRef}</h3>
                            <p className="text-sm text-secondary-200 mt-1">{transaction.date}</p>
                        </div>
                        <button onClick={onClose} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                            <X size={20} />
                        </button>
                    </div>
                    
                    {/* Unique Booking ID Badge */}
                    <div className="absolute -bottom-4 left-6 bg-white shadow-lg border border-gray-100 rounded-lg px-3 py-2 flex items-center gap-2">
                        <FileText size={16} className="text-primary-600"/>
                        <div>
                            <span className="block text-[10px] text-gray-400 font-bold uppercase">Réservation Unique</span>
                            <span className="block text-sm font-mono font-bold text-gray-900">{transaction.bookingRef}</span>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 pt-8 overflow-y-auto custom-scrollbar space-y-6 mt-2">
                    
                    {/* Status Badge */}
                    <div className="flex justify-center">
                        <div className={`px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 ${transaction.status === 'PAYÉ' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                            {transaction.status === 'PAYÉ' ? <CheckCircle size={16}/> : <Clock size={16}/>}
                            Statut : {transaction.status === 'PAYÉ' ? 'Paiement Reçu' : 'En attente de virement'}
                        </div>
                    </div>

                    {/* Client & Vehicle Info */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                            <p className="text-xs font-bold text-gray-400 uppercase mb-3">Client</p>
                            <div className="flex items-center gap-3">
                                <img src={transaction.clientAvatar} alt="" className="w-10 h-10 rounded-full object-cover border border-white shadow-sm"/>
                                <div>
                                    <p className="font-bold text-gray-900 text-sm">{transaction.clientName}</p>
                                    <p className="text-xs text-gray-500">Vérifié</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                            <p className="text-xs font-bold text-gray-400 uppercase mb-3">Véhicule</p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-primary-600 shadow-sm">
                                    <Car size={20}/>
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900 text-sm truncate">{transaction.vehicle}</p>
                                    <p className="text-xs text-gray-500">{transaction.rentalType}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Rental Details */}
                    <div className="border-t border-dashed border-gray-200 pt-4">
                         <div className="flex justify-between items-center mb-2">
                             <span className="text-gray-500 text-sm">Période</span>
                             <span className="font-bold text-gray-900 text-sm">{transaction.startDate} - {transaction.endDate}</span>
                         </div>
                         <div className="flex justify-between items-center mb-2">
                             <span className="text-gray-500 text-sm">Durée</span>
                             <span className="font-bold text-gray-900 text-sm">{transaction.duration}</span>
                         </div>
                         <div className="flex justify-between items-center">
                             <span className="text-gray-500 text-sm">Mode de paiement</span>
                             <span className="font-bold text-secondary-900 text-sm flex items-center gap-1">
                                 {transaction.paymentMethod === 'MVola' && <Smartphone size={14} className="text-yellow-600"/>}
                                 {transaction.paymentMethod === 'Orange Money' && <Smartphone size={14} className="text-orange-600"/>}
                                 {transaction.paymentMethod}
                             </span>
                         </div>
                    </div>

                    {/* Financial Breakdown */}
                    <div className="bg-gray-50 rounded-2xl p-4 space-y-3 border border-gray-200">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-sm">Montant Total (Brut)</span>
                            <span className="font-bold text-gray-900">{transaction.gross.toLocaleString()} Ar</span>
                        </div>
                        <div className="flex justify-between items-center text-red-500">
                            <span className="text-sm flex items-center gap-1"><Percent size={14}/> Commission Mcar (15%)</span>
                            <span className="font-bold">-{transaction.commission.toLocaleString()} Ar</span>
                        </div>
                        <div className="border-t border-gray-200 pt-3 flex justify-between items-center">
                            <span className="font-black text-secondary-900">Net Versé</span>
                            <span className="font-black text-xl text-green-600">{transaction.net.toLocaleString()} Ar</span>
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="flex gap-3">
                        <button className="flex-1 py-3 border border-gray-200 rounded-xl font-bold text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-2">
                            <Download size={18}/> PDF
                        </button>
                        <button className="flex-1 py-3 bg-secondary-900 text-white rounded-xl font-bold hover:bg-secondary-800 flex items-center justify-center gap-2">
                            <MessageCircle size={18}/> Contacter
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- ADMIN SUB-COMPONENTS ---

const AdminUserDetailModal = ({ user, onClose }: { user: User, onClose: () => void }) => {
    // Filter bookings relevant to this user
    const userBookings = MOCK_BOOKINGS.filter(b => 
        (user.role === UserRole.CLIENT && b.renterName === user.name) ||
        (user.role === UserRole.OWNER && b.ownerName === user.name)
    );
    
    // Filter vehicles if owner
    const userVehicles = user.role === UserRole.OWNER ? MOCK_VEHICLES.filter(v => v.ownerId === user.id) : [];

    return (
        <div className="fixed inset-0 z-[100] flex justify-end">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
            
            {/* Drawer */}
            <div className="relative w-full max-w-2xl bg-white h-full shadow-2xl overflow-y-auto animate-in slide-in-from-right duration-300">
                {/* Header */}
                <div className="bg-secondary-900 text-white p-8 relative overflow-hidden">
                    <button onClick={onClose} className="absolute top-6 right-6 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors z-20">
                        <X size={20} />
                    </button>
                    <div className="flex items-center gap-6 relative z-10">
                        <div className="w-24 h-24 rounded-full border-4 border-white/20 overflow-hidden shadow-lg bg-gray-800 shrink-0">
                            <img src={user.avatar} alt={user.name} className="w-full h-full object-cover"/>
                        </div>
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${user.role === 'OWNER' ? 'bg-purple-500' : 'bg-blue-500'}`}>{user.role}</span>
                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${user.status === 'VERIFIED' ? 'bg-green-500' : user.status === 'SUSPENDED' ? 'bg-red-500' : 'bg-orange-500'}`}>{user.status}</span>
                            </div>
                            <h2 className="text-3xl font-bold">{user.name}</h2>
                            <p className="text-gray-400 flex items-center gap-2 mt-1"><Mail size={14}/> {user.email}</p>
                            <p className="text-gray-400 flex items-center gap-2 mt-1"><Phone size={14}/> {user.phone || 'Non renseigné'}</p>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-8 space-y-8">
                    
                    {/* CRM STATS */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 grid grid-cols-2 gap-6 relative overflow-hidden">
                         <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/10 rounded-bl-full"></div>
                         <div>
                             <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">Potentiel & Scoring</h4>
                             <div className="flex items-center gap-2">
                                 <div className="w-12 h-12 rounded-full border-4 border-blue-500 flex items-center justify-center font-black text-gray-900">
                                     {user.leadScore || 0}
                                 </div>
                                 <div>
                                     <span className="block font-bold text-sm text-gray-900">Lead Score</span>
                                     <span className="text-xs text-gray-500">{user.pipelineStage || 'N/A'}</span>
                                 </div>
                             </div>
                         </div>
                         <div>
                             <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">Valeur Vie (LTV)</h4>
                             <div className="text-2xl font-black text-green-600">{(user.lifetimeValue || 0).toLocaleString()} Ar</div>
                             <p className="text-xs text-gray-500">Dernière activité: {user.lastActive || '-'}</p>
                         </div>
                         <div className="col-span-2 mt-2 pt-4 border-t border-dashed border-gray-200">
                             <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">Notes Internes</h4>
                             <p className="text-sm text-gray-600 italic bg-gray-50 p-3 rounded-lg border border-gray-100">
                                 "{user.internalNotes || 'Aucune note.'}"
                             </p>
                         </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4">
                        <div className="bg-gray-50 p-4 rounded-xl text-center border border-gray-100">
                            <span className="block text-gray-500 text-xs font-bold uppercase">Réservations</span>
                            <span className="block text-2xl font-black text-gray-900">{userBookings.length}</span>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-xl text-center border border-gray-100">
                            <span className="block text-gray-500 text-xs font-bold uppercase">Volume (Ar)</span>
                            <span className="block text-xl font-black text-gray-900">
                                {(userBookings.reduce((acc, b) => acc + (user.role === 'OWNER' ? b.netPayout : b.totalAmount), 0) / 1000).toFixed(0)}k
                            </span>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-xl text-center border border-gray-100">
                            <span className="block text-gray-500 text-xs font-bold uppercase">Ancienneté</span>
                            <span className="block text-xl font-black text-gray-900">{user.joinDate?.split(' ')[2] || '2023'}</span>
                        </div>
                    </div>

                    {/* KYC Documents */}
                    <div>
                        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><ShieldCheck className="text-primary-600"/> Documents & Vérification</h3>
                        <div className="grid grid-cols-2 gap-4">
                            {user.documents && Object.entries(user.documents).map(([key, doc]: any) => (
                                <div key={key} className="flex items-center justify-between p-3 border border-gray-200 rounded-xl hover:shadow-sm transition-shadow">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-gray-100 rounded-lg"><FileText size={18} className="text-gray-500"/></div>
                                        <div>
                                            <span className="block font-bold text-sm uppercase">{key}</span>
                                            <span className={`text-[10px] font-bold ${doc.status === 'VALID' ? 'text-green-600' : 'text-orange-500'}`}>{doc.status}</span>
                                        </div>
                                    </div>
                                    <button className="text-primary-600 text-xs font-bold hover:underline">Voir</button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Bookings History */}
                    <div>
                        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><History className="text-primary-600"/> Historique Réservations</h3>
                        {userBookings.length > 0 ? (
                             <div className="border border-gray-100 rounded-xl overflow-hidden">
                                 <table className="w-full text-left">
                                     <thead className="bg-gray-50 text-[10px] uppercase text-gray-500 font-bold">
                                         <tr>
                                             <th className="px-4 py-2">Date</th>
                                             <th className="px-4 py-2">Véhicule</th>
                                             <th className="px-4 py-2 text-right">Montant</th>
                                             <th className="px-4 py-2 text-center">Statut</th>
                                         </tr>
                                     </thead>
                                     <tbody className="text-sm">
                                         {userBookings.map(bk => (
                                             <tr key={bk.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50">
                                                 <td className="px-4 py-3 text-gray-600">{bk.date}</td>
                                                 <td className="px-4 py-3 font-medium">{bk.vehicleName}</td>
                                                 <td className="px-4 py-3 text-right font-bold">{(user.role === 'OWNER' ? bk.netPayout : bk.totalAmount).toLocaleString()} Ar</td>
                                                 <td className="px-4 py-3 text-center">
                                                     <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${bk.status === 'COMPLETED' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                                                         {bk.status}
                                                     </span>
                                                 </td>
                                             </tr>
                                         ))}
                                     </tbody>
                                 </table>
                             </div>
                        ) : (
                            <div className="text-center py-6 bg-gray-50 rounded-xl text-gray-500 text-sm">Aucune réservation trouvée.</div>
                        )}
                    </div>

                    {/* Fleet (Owner only) */}
                    {user.role === UserRole.OWNER && (
                        <div>
                             <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><Car className="text-primary-600"/> Flotte Véhicules</h3>
                             <div className="grid grid-cols-2 gap-4">
                                 {userVehicles.map(v => (
                                     <div key={v.id} className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-xl shadow-sm">
                                         <img src={v.image} alt="" className="w-12 h-12 rounded-lg object-cover"/>
                                         <div>
                                             <div className="font-bold text-sm line-clamp-1">{v.title}</div>
                                             <div className="text-xs text-gray-500">{v.location}</div>
                                         </div>
                                     </div>
                                 ))}
                             </div>
                        </div>
                    )}

                    {/* Admin Actions */}
                    <div className="pt-6 border-t border-gray-100 flex gap-4 pb-8">
                        <button className="flex-1 bg-red-50 text-red-600 font-bold py-3 rounded-xl hover:bg-red-100 flex items-center justify-center gap-2 transition-colors">
                            <Ban size={18}/> Suspendre Compte
                        </button>
                        <button className="flex-1 bg-secondary-900 text-white font-bold py-3 rounded-xl hover:bg-secondary-800 flex items-center justify-center gap-2 transition-colors">
                            <MessageSquare size={18}/> Contacter
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};


const ClientDashboard = () => {
  const [user, setUser] = useState(MOCK_USER);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  const handleUpdateProfile = (updatedUser: User) => {
    setUser(updatedUser);
    setIsEditProfileOpen(false);
  };

  return (
  <div className="space-y-8 animate-in fade-in duration-500">
      {/* Welcome & Stats with Badge System */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="col-span-1 md:col-span-4 bg-gradient-to-r from-secondary-900 to-secondary-800 rounded-2xl p-8 text-white flex flex-col md:flex-row items-center justify-between shadow-lg relative overflow-hidden">
              <div className="absolute right-0 top-0 opacity-10 transform translate-x-1/3 -translate-y-1/3">
                  <Award size={300} />
              </div>
              <div className="relative z-10 w-full md:w-auto">
                  <div className="flex items-center justify-between md:justify-start gap-4 mb-2">
                    <div className="flex items-center gap-3">
                        <h2 className="text-2xl font-bold">Bonjour, {user.name} !</h2>
                        <button onClick={() => setIsEditProfileOpen(true)} className="p-1.5 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                            <Edit size={16} />
                        </button>
                    </div>
                    <span className="bg-yellow-500/20 text-yellow-300 border border-yellow-500/50 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-1">
                        <Award size={14}/> {user.badgeLevel}
                    </span>
                  </div>
                  <p className="text-gray-300 mb-4 max-w-lg">
                      Vous avez cumulé <span className="text-white font-bold">{user.points} points</span>. Plus que 50 points pour atteindre le niveau Platinum et bénéficier de -10% sur toutes les locations.
                  </p>
                  {/* Progress Bar */}
                  <div className="w-full max-w-md bg-white/10 h-3 rounded-full overflow-hidden">
                      <div className="bg-yellow-400 h-full w-[90%] shadow-[0_0_10px_rgba(250,204,21,0.5)]"></div>
                  </div>
              </div>
              <div className="mt-6 md:mt-0 flex gap-4 relative z-10">
                  <button className="bg-white text-secondary-900 px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors shadow-lg">
                      Mes Points
                  </button>
                  <button className="bg-primary-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-primary-500 transition-colors shadow-lg">
                      Parrainer un ami
                  </button>
              </div>
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Bookings */}
          <div className="lg:col-span-2 space-y-6">
              <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                  <Clock size={20} className="text-primary-600"/> Locations Récentes
              </h3>
              {MOCK_VEHICLES.slice(0, 3).map((vehicle) => (
                  <div key={vehicle.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col sm:flex-row gap-4 items-center">
                      <img src={vehicle.image} alt={vehicle.title} className="w-full sm:w-32 h-24 object-cover rounded-lg" />
                      <div className="flex-1 text-center sm:text-left">
                          <h4 className="font-bold text-gray-900">{vehicle.title}</h4>
                          <p className="text-gray-500 text-sm">{vehicle.location}</p>
                          <div className="flex items-center justify-center sm:justify-start gap-2 mt-2 text-xs">
                              <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">Terminé</span>
                              <span className="text-gray-400">Du 10 au 15 Oct</span>
                          </div>
                      </div>
                      <div className="flex flex-col gap-2 w-full sm:w-auto">
                          <button className="text-sm font-semibold text-primary-600 bg-primary-50 px-4 py-2 rounded-lg hover:bg-primary-100 transition-colors">
                              Louer à nouveau
                          </button>
                          <button className="text-xs font-medium text-gray-400 hover:text-gray-600">
                              Voir facture
                          </button>
                      </div>
                  </div>
              ))}
          </div>

          {/* Quick Stats & Documents */}
          <div className="space-y-8">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <FileText size={20} className="text-blue-500"/> Mes Documents
                  </h3>
                  <ul className="space-y-3">
                      <li className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                              <div className="p-2 bg-green-100 text-green-600 rounded-lg">
                                  <ShieldCheck size={16} />
                              </div>
                              <div>
                                  <p className="text-sm font-bold text-gray-900">Permis de conduire</p>
                                  <p className="text-xs text-green-600">Validé</p>
                              </div>
                          </div>
                          <ChevronRight size={16} className="text-gray-400"/>
                      </li>
                      <li className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                              <div className="p-2 bg-green-100 text-green-600 rounded-lg">
                                  <UserIcon size={16} />
                              </div>
                              <div>
                                  <p className="text-sm font-bold text-gray-900">CIN / Passeport</p>
                                  <p className="text-xs text-green-600">Validé</p>
                              </div>
                          </div>
                          <ChevronRight size={16} className="text-gray-400"/>
                      </li>
                  </ul>
                  <button className="w-full mt-4 py-2 border border-dashed border-gray-300 rounded-lg text-sm text-gray-500 hover:border-primary-500 hover:text-primary-600 transition-colors">
                      + Ajouter un document
                  </button>
              </div>
          </div>
      </div>
      {isEditProfileOpen && <EditProfileModal user={user} onClose={() => setIsEditProfileOpen(false)} onSave={handleUpdateProfile} />}
  </div>
  );
};

const DriverCard: React.FC<{ driver: Driver; onSelect: (d: Driver) => void }> = ({ driver, onSelect }) => (
    <div 
        onClick={() => onSelect(driver)}
        className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all group relative overflow-hidden cursor-pointer"
    >
        <div className="flex items-start gap-4 mb-4">
            <img src={driver.avatar} alt={driver.firstName} className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm" />
            <div className="flex-1">
                <div className="flex justify-between items-start">
                     <h4 className="font-bold text-gray-900 text-lg group-hover:text-primary-600 transition-colors">{driver.firstName} {driver.lastName}</h4>
                </div>
                <p className="text-xs text-gray-500 mb-2">{driver.licenseNumber}</p>
                <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${driver.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : driver.status === 'BANNED' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'}`}>
                        {driver.status === 'BANNED' ? 'BANNIT' : driver.status}
                    </span>
                    {driver.currentJob && (
                        <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase flex items-center gap-1">
                            <Briefcase size={10}/> En mission
                        </span>
                    )}
                </div>
            </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2">
             <div className="bg-gray-50 p-2 rounded text-center">
                 <span className="block text-xs text-gray-400 uppercase font-bold">Avis Client</span>
                 <div className="flex items-center justify-center gap-1 text-yellow-500 font-bold text-sm">
                     <Star size={12} fill="currentColor"/> {driver.rating}
                 </div>
             </div>
             <div className="bg-gray-50 p-2 rounded text-center">
                 <span className="block text-xs text-gray-400 uppercase font-bold">Ponctualité</span>
                 <span className="text-gray-700 font-bold text-sm">{driver.punctualityRating}</span>
             </div>
        </div>
    </div>
);

// --- SUPPORT DASHBOARD ---

const SupportDashboard = () => {
    const [tickets, setTickets] = useState<SupportTicket[]>(MOCK_SUPPORT_TICKETS);
    const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
    const [filterStatus, setFilterStatus] = useState<'ALL' | TicketStatus>('ALL');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    
    // Create Ticket State
    const [newTicket, setNewTicket] = useState<Partial<SupportTicket>>({
        subject: '', description: '', category: 'OTHER', priority: 'MEDIUM', source: 'PHONE', bookingId: ''
    });

    const filteredTickets = tickets.filter(t => filterStatus === 'ALL' || t.status === filterStatus);

    const handleCreateTicket = () => {
        const ticket: SupportTicket = {
            id: `T-${Math.floor(Math.random() * 10000)}`,
            userId: 'guest',
            userName: 'Utilisateur Manuel',
            userRole: UserRole.CLIENT,
            bookingId: newTicket.bookingId,
            subject: newTicket.subject || 'Sans titre',
            description: newTicket.description || '',
            category: newTicket.category as TicketCategory,
            priority: newTicket.priority as TicketPriority,
            status: 'OPEN',
            source: newTicket.source as any,
            createdAt: new Date().toLocaleString(),
            lastUpdate: new Date().toLocaleString(),
            messages: []
        };
        setTickets([ticket, ...tickets]);
        setIsCreateModalOpen(false);
        setNewTicket({ subject: '', description: '', category: 'OTHER', priority: 'MEDIUM', source: 'PHONE', bookingId: '' });
    };

    const handleUpdateStatus = (status: TicketStatus) => {
        if (!selectedTicket) return;
        const updated = tickets.map(t => t.id === selectedTicket.id ? { ...t, status } : t);
        setTickets(updated);
        setSelectedTicket({ ...selectedTicket, status });
    };

    const TicketDetailModal = ({ ticket, onClose }: { ticket: SupportTicket, onClose: () => void }) => (
        <div className="fixed inset-0 bg-black/60 z-[70] flex justify-end">
            <div className="absolute inset-0" onClick={onClose}></div>
            <div className="w-full max-w-xl bg-white h-full shadow-2xl p-6 overflow-y-auto animate-in slide-in-from-right">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                             <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${ticket.status === 'OPEN' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>{ticket.status}</span>
                             <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${ticket.priority === 'HIGH' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>{ticket.priority}</span>
                        </div>
                        <h2 className="text-xl font-bold text-gray-900">{ticket.subject}</h2>
                        <p className="text-sm text-gray-500">Ticket #{ticket.id} • {ticket.createdAt}</p>
                    </div>
                    <button onClick={onClose}><X size={20} className="text-gray-400 hover:text-gray-600"/></button>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 mb-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-full bg-secondary-900 text-white flex items-center justify-center text-xs font-bold">
                            {ticket.userName.charAt(0)}
                        </div>
                        <div>
                            <div className="font-bold text-sm text-gray-900">{ticket.userName}</div>
                            <div className="text-xs text-gray-500">{ticket.userRole} • via {ticket.source}</div>
                        </div>
                    </div>
                    {ticket.bookingId && (
                        <div className="mb-4 bg-white p-3 rounded-lg border border-gray-200 shadow-sm flex items-center gap-2">
                            <FileText size={16} className="text-primary-600"/>
                            <span className="text-xs font-bold text-gray-500 uppercase">Réservation :</span>
                            <span className="text-sm font-mono font-bold text-gray-900">{ticket.bookingId}</span>
                        </div>
                    )}
                    <p className="text-sm text-gray-700 leading-relaxed mt-2">{ticket.description}</p>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-3 gap-2 mb-6">
                    <button onClick={() => handleUpdateStatus('IN_PROGRESS')} className="py-2 bg-blue-50 text-blue-600 font-bold rounded-lg text-sm hover:bg-blue-100">Prendre en charge</button>
                    <button onClick={() => handleUpdateStatus('RESOLVED')} className="py-2 bg-green-50 text-green-600 font-bold rounded-lg text-sm hover:bg-green-100">Résoudre</button>
                    <button onClick={() => handleUpdateStatus('CLOSED')} className="py-2 bg-gray-50 text-gray-600 font-bold rounded-lg text-sm hover:bg-gray-100">Fermer</button>
                </div>
                
                {/* Messages (Mock) */}
                <h3 className="font-bold text-sm text-gray-900 mb-4">Historique</h3>
                <div className="space-y-4">
                    {ticket.messages?.map((msg, idx) => (
                        <div key={idx} className={`flex ${msg.sender === 'AGENT' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] p-3 rounded-xl text-sm ${msg.sender === 'AGENT' ? 'bg-primary-50 text-primary-800' : 'bg-white border border-gray-200'}`}>
                                <p>{msg.text}</p>
                                <span className="text-[10px] opacity-60 mt-1 block">{msg.time}</span>
                            </div>
                        </div>
                    ))}
                    {(!ticket.messages || ticket.messages.length === 0) && <p className="text-center text-sm text-gray-400 italic">Aucun message</p>}
                </div>
            </div>
        </div>
    );

    return (
        <div className="flex min-h-screen bg-gray-50">
             {/* SIDEBAR */}
            <aside className="w-64 bg-white border-r border-gray-100 fixed h-[calc(100vh-80px)] top-20 hidden lg:block">
                 <div className="p-6">
                     <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Support Center</div>
                     <nav className="space-y-2">
                         <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold bg-primary-50 text-primary-600 transition-all">
                             <LifeBuoy size={20}/> Tickets
                         </button>
                         <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-gray-600 hover:bg-gray-50 transition-all">
                             <MessageCircle size={20}/> Messages Live
                         </button>
                         <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-gray-600 hover:bg-gray-50 transition-all">
                             <Users size={20}/> Clients
                         </button>
                     </nav>
                 </div>
            </aside>

            {/* MAIN */}
            <main className="flex-1 lg:ml-64 p-6 lg:p-10">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-900">Gestion des Tickets</h2>
                    <button onClick={() => setIsCreateModalOpen(true)} className="bg-secondary-900 text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-secondary-800 shadow-lg">
                        <Plus size={18}/> Créer un ticket
                    </button>
                </div>

                {/* Kanban Status Filters */}
                <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
                    {['ALL', 'OPEN', 'IN_PROGRESS', 'RESOLVED'].map(status => (
                        <button 
                            key={status}
                            onClick={() => setFilterStatus(status as any)}
                            className={`px-4 py-2 rounded-xl font-bold text-sm whitespace-nowrap transition-all ${filterStatus === status ? 'bg-secondary-900 text-white shadow-md' : 'bg-white text-gray-500 hover:bg-gray-100'}`}
                        >
                            {status === 'ALL' ? 'Tous' : status}
                        </button>
                    ))}
                </div>

                {/* Tickets List */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr className="text-xs font-bold text-gray-500 uppercase">
                                <th className="px-6 py-4">ID / Sujet</th>
                                <th className="px-6 py-4">Utilisateur</th>
                                <th className="px-6 py-4">Booking Ref</th>
                                <th className="px-6 py-4">Catégorie</th>
                                <th className="px-6 py-4">Priorité</th>
                                <th className="px-6 py-4">Statut</th>
                                <th className="px-6 py-4 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 text-sm">
                            {filteredTickets.map(ticket => (
                                <tr key={ticket.id} className="hover:bg-gray-50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <span className="font-mono text-xs text-gray-400 block mb-1">#{ticket.id}</span>
                                        <span className="font-bold text-gray-900">{ticket.subject}</span>
                                        <span className="text-xs text-gray-500 block mt-1">{ticket.createdAt}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-gray-900">{ticket.userName}</div>
                                        <div className="text-xs text-gray-500">{ticket.userRole}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="font-mono text-xs font-bold text-primary-600 bg-primary-50 px-2 py-1 rounded">
                                            {ticket.bookingId || '-'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-bold uppercase 
                                            ${ticket.category === 'ACCIDENT' ? 'bg-red-100 text-red-700' : 
                                              ticket.category === 'PAYMENT' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                                            {ticket.category === 'ACCIDENT' && <AlertTriangle size={12}/>}
                                            {ticket.category === 'PAYMENT' && <DollarSign size={12}/>}
                                            {ticket.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`font-bold text-xs ${ticket.priority === 'HIGH' ? 'text-red-600' : ticket.priority === 'MEDIUM' ? 'text-orange-500' : 'text-blue-500'}`}>
                                            {ticket.priority}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                         <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase 
                                            ${ticket.status === 'OPEN' ? 'bg-green-100 text-green-700' : 
                                              ticket.status === 'RESOLVED' ? 'bg-gray-100 text-gray-500' : 'bg-blue-100 text-blue-700'}`}>
                                            {ticket.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <button onClick={() => setSelectedTicket(ticket)} className="bg-white border border-gray-200 text-gray-600 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-secondary-900 hover:text-white transition-colors">
                                            Gérer
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>

            {/* CREATE MODAL */}
            {isCreateModalOpen && (
                <div className="fixed inset-0 bg-black/60 z-[80] flex items-center justify-center p-4 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-2xl">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-gray-900">Nouveau Ticket</h3>
                            <button onClick={() => setIsCreateModalOpen(false)}><X className="text-gray-400 hover:text-red-500" /></button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Sujet</label>
                                <input 
                                    type="text" 
                                    value={newTicket.subject} 
                                    onChange={e => setNewTicket({...newTicket, subject: e.target.value})}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Numéro Réservation (Booking ID)</label>
                                <input 
                                    type="text" 
                                    value={newTicket.bookingId || ''} 
                                    placeholder="Ex: BK-2023-001"
                                    onChange={e => setNewTicket({...newTicket, bookingId: e.target.value})}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 font-mono"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Catégorie</label>
                                    <select 
                                        value={newTicket.category}
                                        onChange={e => setNewTicket({...newTicket, category: e.target.value as any})}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3"
                                    >
                                        <option value="ACCIDENT">Accident</option>
                                        <option value="PAYMENT">Paiement</option>
                                        <option value="TECHNICAL">Technique</option>
                                        <option value="BOOKING">Réservation</option>
                                        <option value="OTHER">Autre</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Priorité</label>
                                    <select 
                                        value={newTicket.priority}
                                        onChange={e => setNewTicket({...newTicket, priority: e.target.value as any})}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3"
                                    >
                                        <option value="LOW">Basse</option>
                                        <option value="MEDIUM">Moyenne</option>
                                        <option value="HIGH">Haute</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Source</label>
                                <div className="flex gap-2">
                                    {['PHONE', 'EMAIL'].map(s => (
                                        <button 
                                            key={s}
                                            onClick={() => setNewTicket({...newTicket, source: s as any})}
                                            className={`flex-1 py-2 rounded-lg text-xs font-bold border ${newTicket.source === s ? 'bg-secondary-900 text-white border-secondary-900' : 'bg-white border-gray-200 text-gray-500'}`}
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Description</label>
                                <textarea 
                                    value={newTicket.description} 
                                    onChange={e => setNewTicket({...newTicket, description: e.target.value})}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 h-24"
                                />
                            </div>
                            <button onClick={handleCreateTicket} className="w-full bg-secondary-900 text-white font-bold py-3 rounded-xl hover:bg-secondary-800">
                                Créer le ticket
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* DETAIL MODAL */}
            {selectedTicket && <TicketDetailModal ticket={selectedTicket} onClose={() => setSelectedTicket(null)} />}
        </div>
    );
};

const OwnerDashboard = () => {
    const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'FLEET' | 'DRIVERS' | 'FINANCE' | 'PROFILE'>('OVERVIEW');
    const [drivers, setDrivers] = useState<Driver[]>(MOCK_DRIVERS);
    const [vehicles, setVehicles] = useState<Vehicle[]>(MOCK_VEHICLES.filter(v => v.ownerId === 'owner1'));
    const [currentUser, setCurrentUser] = useState<User>(MOCK_USER);

    // Modals state
    const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
    const [isAddDriverOpen, setIsAddDriverOpen] = useState(false);
    const [isDriverDetailOpen, setIsDriverDetailOpen] = useState(false);
    const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
    const [selectedTransaction, setSelectedTransaction] = useState<any>(null);

    // MOCK FINANCE DATA FOR OWNER (ENRICHED)
    const OWNER_FINANCE_DATA = [
        { 
            id: 1, 
            date: '25 Oct 2023', 
            vehicle: 'Toyota Prado', 
            vehicleImage: 'https://images.unsplash.com/photo-1533473359331-0135ef1bcfb0?auto=format&fit=crop&q=80&w=200',
            rentalType: '24 Heures', 
            duration: '1 Jour', 
            startDate: '24 Oct', 
            endDate: '25 Oct', 
            gross: 250000, 
            commission: 37500, 
            net: 212500, 
            status: 'PAYÉ',
            clientName: 'Jean Rakoto',
            clientAvatar: 'https://i.pravatar.cc/150?u=a',
            paymentMethod: 'MVola',
            transactionRef: 'TX-88291-MC',
            bookingRef: 'BK-2023-089'
        },
        { 
            id: 2, 
            date: '22 Oct 2023', 
            vehicle: 'Renault Camion', 
            vehicleImage: 'https://images.unsplash.com/photo-1586058090333-d85452296c02?auto=format&fit=crop&q=80&w=200',
            rentalType: 'Journée (8h-18h)', 
            duration: '10 Heures', 
            startDate: '22 Oct', 
            endDate: '22 Oct', 
            gross: 450000, 
            commission: 90000, 
            net: 360000, 
            status: 'PAYÉ',
            clientName: 'Construction Co.',
            clientAvatar: 'https://i.pravatar.cc/150?u=b',
            paymentMethod: 'Virement',
            transactionRef: 'TX-77312-MC',
            bookingRef: 'BK-2023-085'
        },
        { 
            id: 3, 
            date: '18 Oct 2023', 
            vehicle: 'Toyota Prado', 
            vehicleImage: 'https://images.unsplash.com/photo-1533473359331-0135ef1bcfb0?auto=format&fit=crop&q=80&w=200',
            rentalType: '24 Heures', 
            duration: '3 Jours', 
            startDate: '15 Oct', 
            endDate: '18 Oct', 
            gross: 750000, 
            commission: 112500, 
            net: 637500, 
            status: 'EN ATTENTE',
            clientName: 'Sophie T.',
            clientAvatar: 'https://i.pravatar.cc/150?u=c',
            paymentMethod: 'Orange Money',
            transactionRef: 'TX-99102-MC',
            bookingRef: 'BK-2023-082'
        },
    ];

    const totalGross = OWNER_FINANCE_DATA.reduce((acc, curr) => acc + curr.gross, 0);
    const totalCommission = OWNER_FINANCE_DATA.reduce((acc, curr) => acc + curr.commission, 0);
    const totalNet = OWNER_FINANCE_DATA.reduce((acc, curr) => acc + curr.net, 0);

    // --- DRIVERS LOGIC ---
    const handleDriverAction = (driver: Driver) => {
        if(drivers.find(d => d.id === driver.id)) {
             setDrivers(drivers.map(d => d.id === driver.id ? driver : d));
        } else {
            setDrivers([...drivers, driver]);
        }
        setIsAddDriverOpen(false);
        setSelectedDriver(null);
    };

    // --- FLEET LOGIC ---
    const getEmptyVehicle = (): Vehicle => ({
        id: `new-${Date.now()}`,
        title: '',
        type: VehicleType.CAR,
        pricePerDay: 0,
        pricingRates: { day: 0, twentyFourHours: 0, provinceDay: 0, weeklyDiscount: 5, monthlyDiscount: 15 },
        location: '',
        image: 'https://images.unsplash.com/photo-1533473359331-0135ef1bcfb0?auto=format&fit=crop&q=80&w=800', // Default image
        rating: 0,
        trips: 0,
        ownerId: 'owner1',
        features: [],
        isAvailable: true,
        status: 'AVAILABLE',
        driverOption: DriverOption.OPTIONAL,
        unlimitedMileage: false,
        unavailableDates: []
    });

    const handleAddVehicle = () => {
        setSelectedVehicle(getEmptyVehicle());
    };

    const handleSaveVehicle = (vehicle: Vehicle) => {
        if (vehicles.find(v => v.id === vehicle.id)) {
            setVehicles(vehicles.map(v => v.id === vehicle.id ? vehicle : v));
        } else {
            setVehicles([...vehicles, vehicle]);
        }
        setSelectedVehicle(null);
    };

    const DriverManageModal = ({ driver, onClose, onSave }: { driver: Driver | null, onClose: () => void, onSave: (d: Driver) => void }) => {
        const [formData, setFormData] = useState<Partial<Driver>>(driver || {
            firstName: '',
            lastName: '',
            cin: '',
            licenseNumber: '',
            phone: '',
            status: 'ACTIVE',
            avatar: 'https://i.pravatar.cc/150?u=new',
            rating: 5.0,
            totalTrips: 0,
            joinDate: new Date().toISOString().split('T')[0],
        });
    
        const handleSubmit = () => {
            if (!formData.firstName || !formData.lastName || !formData.licenseNumber) return;
            onSave({
                id: driver?.id || `d-${Date.now()}`,
                ...formData as Driver
            });
        };
    
        return (
            <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in zoom-in duration-200">
                <div className="bg-white rounded-2xl w-full max-w-2xl p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-gray-900">{driver ? 'Modifier Chauffeur' : 'Ajouter un Chauffeur'}</h3>
                        <button onClick={onClose}><X className="text-gray-400 hover:text-red-500" /></button>
                    </div>
                    
                    <div className="flex justify-center mb-6">
                        <div className="w-24 h-24 bg-gray-100 rounded-full overflow-hidden border-4 border-white shadow-lg relative group cursor-pointer">
                            <img src={formData.avatar} alt="Avatar" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <UploadCloud className="text-white"/>
                            </div>
                        </div>
                    </div>
    
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Prénom</label>
                                <input 
                                    type="text" 
                                    value={formData.firstName} 
                                    onChange={e => setFormData({...formData, firstName: e.target.value})}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 outline-none focus:ring-2 focus:ring-primary-500"
                                    placeholder="Ex: Jean"
                                />
                            </div>
                             <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Nom</label>
                                <input 
                                    type="text" 
                                    value={formData.lastName} 
                                    onChange={e => setFormData({...formData, lastName: e.target.value})}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 outline-none focus:ring-2 focus:ring-primary-500"
                                    placeholder="Ex: Rakoto"
                                />
                            </div>
                        </div>
                         <div>
                            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">CIN (Carte d'identité)</label>
                            <input 
                                type="text" 
                                value={formData.cin} 
                                onChange={e => setFormData({...formData, cin: e.target.value})}
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 outline-none focus:ring-2 focus:ring-primary-500 font-mono"
                                placeholder="Ex: 101 222 333 444"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Numéro Permis</label>
                            <input 
                                type="text" 
                                value={formData.licenseNumber} 
                                onChange={e => setFormData({...formData, licenseNumber: e.target.value})}
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 outline-none focus:ring-2 focus:ring-primary-500"
                                placeholder="Ex: PERM-123-MG"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Téléphone</label>
                            <input 
                                type="tel" 
                                value={formData.phone} 
                                onChange={e => setFormData({...formData, phone: e.target.value})}
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 outline-none focus:ring-2 focus:ring-primary-500"
                                placeholder="Ex: 034 00 000 00"
                            />
                        </div>

                         {/* Documents Upload Section */}
                        <div className="pt-4 border-t border-gray-100">
                             <label className="block text-xs font-bold text-gray-500 uppercase mb-3">Documents Requis</label>
                             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                 {/* Upload Box for CIN */}
                                 <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 flex flex-col items-center justify-center text-center hover:border-primary-400 hover:bg-primary-50 transition-all cursor-pointer group">
                                     <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-gray-400 group-hover:text-primary-600 mb-2">
                                         <CIDIcon size={20}/>
                                     </div>
                                     <span className="text-xs font-bold text-gray-700">Scan CIN</span>
                                     <span className="text-[10px] text-gray-400 mt-1">R/V Lisible</span>
                                     <span className="mt-2 text-[10px] font-bold text-primary-600 bg-white px-2 py-0.5 rounded border border-primary-100 group-hover:bg-primary-600 group-hover:text-white transition-colors">Ajouter</span>
                                 </div>
 
                                 {/* Upload Box for License */}
                                 <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 flex flex-col items-center justify-center text-center hover:border-primary-400 hover:bg-primary-50 transition-all cursor-pointer group">
                                     <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-gray-400 group-hover:text-primary-600 mb-2">
                                         <FileText size={20}/>
                                     </div>
                                     <span className="text-xs font-bold text-gray-700">Permis</span>
                                     <span className="text-[10px] text-gray-400 mt-1">Biométrique</span>
                                     <span className="mt-2 text-[10px] font-bold text-primary-600 bg-white px-2 py-0.5 rounded border border-primary-100 group-hover:bg-primary-600 group-hover:text-white transition-colors">Ajouter</span>
                                 </div>
 
                                 {/* Upload Box for Residence */}
                                 <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 flex flex-col items-center justify-center text-center hover:border-primary-400 hover:bg-primary-50 transition-all cursor-pointer group">
                                     <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-gray-400 group-hover:text-primary-600 mb-2">
                                         <Home size={20}/>
                                     </div>
                                     <span className="text-xs font-bold text-gray-700">Certif. Résidence</span>
                                     <span className="text-[10px] text-gray-400 mt-1">Moins de 3 mois</span>
                                     <span className="mt-2 text-[10px] font-bold text-primary-600 bg-white px-2 py-0.5 rounded border border-primary-100 group-hover:bg-primary-600 group-hover:text-white transition-colors">Ajouter</span>
                                 </div>
                             </div>
                        </div>
                        
                        {driver && (
                            <div className="pt-2">
                                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Statut</label>
                                <div className="flex bg-gray-50 p-1 rounded-lg">
                                    {['ACTIVE', 'INACTIVE', 'BANNED'].map(s => (
                                        <button
                                            key={s}
                                            onClick={() => setFormData({...formData, status: s as any})}
                                            className={`flex-1 py-2 text-xs font-bold rounded-md transition-all ${formData.status === s ? 'bg-white shadow text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
    
                        <button 
                            onClick={handleSubmit}
                            className="w-full bg-secondary-900 text-white font-bold py-3 rounded-xl hover:bg-secondary-800 transition-all mt-4"
                        >
                            {driver ? 'Enregistrer les modifications' : 'Ajouter le chauffeur'}
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    const DriverDetailModal = ({ driver, onClose }: { driver: Driver, onClose: () => void }) => {
        const [subTab, setSubTab] = useState<'INFO' | 'HISTORY'>('INFO');

        const isResidenceExpired = (dateString?: string) => {
            if (!dateString) return true;
            const date = new Date(dateString);
            const now = new Date();
            const threeMonthsAgo = new Date();
            threeMonthsAgo.setMonth(now.getMonth() - 3);
            return date < threeMonthsAgo;
        };

        const residenceExpired = isResidenceExpired(driver.documents?.residence?.issueDate);

        return (
            <div className="fixed inset-0 bg-black/60 z-[70] flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl w-full max-w-4xl h-[85vh] flex flex-col md:flex-row shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                    
                    {/* LEFT SIDEBAR (Profile) */}
                    <div className="md:w-1/3 bg-gray-50 border-r border-gray-100 flex flex-col p-6">
                         <div className="flex justify-between md:justify-end mb-4">
                             <button onClick={onClose} className="p-2 bg-white rounded-full hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors shadow-sm">
                                 <X size={18} />
                             </button>
                         </div>
                         
                         <div className="flex flex-col items-center text-center mb-6">
                             <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg overflow-hidden mb-3">
                                 <img src={driver.avatar} alt={driver.firstName} className="w-full h-full object-cover"/>
                             </div>
                             <h2 className="text-xl font-bold text-gray-900">{driver.firstName} {driver.lastName}</h2>
                             <p className="text-gray-400 text-xs uppercase font-bold tracking-wider mb-2">{driver.licenseNumber}</p>
                             <div className="flex gap-2 justify-center">
                                 <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${driver.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'}`}>
                                    {driver.status}
                                 </span>
                             </div>
                         </div>

                         <div className="space-y-4 flex-1">
                             <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                                 <div className="flex justify-between items-center mb-1">
                                     <span className="text-xs text-gray-400 font-bold uppercase">Note Globale</span>
                                     <div className="flex text-yellow-500"><Star size={12} fill="currentColor"/></div>
                                 </div>
                                 <div className="text-2xl font-black text-gray-900">{driver.rating}<span className="text-sm text-gray-400 font-normal">/5</span></div>
                             </div>
                             <div className="grid grid-cols-2 gap-3">
                                 <div className="bg-white p-3 rounded-xl border border-gray-100 text-center">
                                     <span className="block text-xl font-bold text-gray-900">{driver.totalTrips}</span>
                                     <span className="text-[10px] text-gray-400 uppercase font-bold">Courses</span>
                                 </div>
                                 <div className="bg-white p-3 rounded-xl border border-gray-100 text-center">
                                     <span className="block text-xl font-bold text-gray-900">{driver.joinDate.split('-')[0]}</span>
                                     <span className="text-[10px] text-gray-400 uppercase font-bold">Depuis</span>
                                 </div>
                             </div>
                             <button className="w-full bg-secondary-900 text-white font-bold py-3 rounded-xl hover:bg-secondary-800 flex items-center justify-center gap-2 mt-auto">
                                <Phone size={16}/> Appeler
                             </button>
                         </div>
                    </div>

                    {/* RIGHT CONTENT */}
                    <div className="md:w-2/3 flex flex-col bg-white">
                        <div className="flex border-b border-gray-100 px-6 pt-4">
                            <button onClick={() => setSubTab('INFO')} className={`px-4 py-4 text-sm font-bold border-b-2 transition-all ${subTab === 'INFO' ? 'border-primary-600 text-primary-600' : 'border-transparent text-gray-400 hover:text-gray-600'}`}>
                                Vue Générale
                            </button>
                            <button onClick={() => setSubTab('HISTORY')} className={`px-4 py-4 text-sm font-bold border-b-2 transition-all ${subTab === 'HISTORY' ? 'border-primary-600 text-primary-600' : 'border-transparent text-gray-400 hover:text-gray-600'}`}>
                                Historique & Avis
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                            {subTab === 'INFO' && (
                                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2">
                                    {driver.currentJob ? (
                                        <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100 relative overflow-hidden">
                                            <div className="absolute top-0 right-0 p-4 opacity-10"><Car size={64} className="text-blue-500"/></div>
                                            <h3 className="text-blue-900 font-bold text-lg mb-4 flex items-center gap-2"><Briefcase size={20}/> Mission en cours</h3>
                                            
                                            <div className="flex items-center gap-4 mb-4">
                                                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center overflow-hidden border border-blue-200">
                                                    <img src={driver.currentJob.clientAvatar || 'https://i.pravatar.cc/150'} className="w-full h-full object-cover" alt=""/>
                                                </div>
                                                <div>
                                                    <p className="text-xs font-bold text-blue-400 uppercase">Client</p>
                                                    <p className="font-bold text-blue-900">{driver.currentJob.clientName}</p>
                                                </div>
                                            </div>
                                            
                                            <div className="space-y-2 text-sm text-blue-800">
                                                <div className="flex justify-between border-b border-blue-200 pb-2">
                                                    <span>Véhicule</span>
                                                    <span className="font-bold">{driver.currentJob.vehicleName}</span>
                                                </div>
                                                <div className="flex justify-between border-b border-blue-200 pb-2">
                                                    <span>Destination</span>
                                                    <span className="font-bold">{driver.currentJob.destination}</span>
                                                </div>
                                                <div className="flex justify-between border-b border-blue-200 pb-2">
                                                    <span>Retour prévu</span>
                                                    <span className="font-bold">{driver.currentJob.returnDate}</span>
                                                </div>
                                                <div className="flex justify-between pt-2">
                                                    <span>Réf. Réservation</span>
                                                    <span className="font-mono font-bold bg-white px-2 py-0.5 rounded text-blue-600">{driver.currentJob.bookingId}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="bg-gray-50 rounded-2xl p-8 text-center border border-gray-100 border-dashed">
                                            <UserIcon size={32} className="text-gray-300 mx-auto mb-2"/>
                                            <p className="text-gray-500 font-medium">Aucune mission en cours.</p>
                                            <span className="inline-block mt-2 px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">Disponible</span>
                                        </div>
                                    )}

                                    <div>
                                        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><FileText size={18}/> Documents Identité</h3>
                                        <div className="space-y-4">
                                            <div className="flex gap-4">
                                                <div className="flex-1 p-3 border border-gray-200 rounded-xl bg-gray-50 hover:bg-white transition-colors cursor-pointer group">
                                                    <div className="flex justify-between items-center mb-2">
                                                        <span className="text-xs font-bold text-gray-400 uppercase">CIN</span>
                                                        <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded font-bold">Validé</span>
                                                    </div>
                                                    <div className="h-24 bg-gray-200 rounded-lg overflow-hidden relative">
                                                        {driver.documents?.cin?.url ? (
                                                            <img src={driver.documents.cin.url} alt="CIN" className="w-full h-full object-cover"/>
                                                        ) : (
                                                            <div className="flex items-center justify-center h-full text-gray-400"><FileText/></div>
                                                        )}
                                                    </div>
                                                    <div className="mt-2 text-xs font-mono font-bold text-gray-800">{driver.cin}</div>
                                                </div>

                                                <div className="flex-1 p-3 border border-gray-200 rounded-xl bg-gray-50 hover:bg-white transition-colors cursor-pointer group">
                                                    <div className="flex justify-between items-center mb-2">
                                                        <span className="text-xs font-bold text-gray-400 uppercase">Permis</span>
                                                        <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded font-bold">Validé</span>
                                                    </div>
                                                    <div className="h-24 bg-gray-200 rounded-lg overflow-hidden relative">
                                                        {driver.documents?.license?.url ? (
                                                            <img src={driver.documents.license.url} alt="License" className="w-full h-full object-cover"/>
                                                        ) : (
                                                            <div className="flex items-center justify-center h-full text-gray-400"><FileText/></div>
                                                        )}
                                                    </div>
                                                    <div className="mt-2 text-xs font-mono font-bold text-gray-800">{driver.licenseNumber}</div>
                                                </div>
                                            </div>

                                            <div className={`p-4 rounded-xl border-2 border-dashed ${residenceExpired ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50'}`}>
                                                <div className="flex items-start justify-between">
                                                    <div>
                                                        <span className="text-xs font-bold text-gray-500 uppercase block mb-1">Certificat Résidence</span>
                                                        <div className="flex items-center gap-2">
                                                            <FileText size={16} className={residenceExpired ? 'text-red-500' : 'text-green-600'}/>
                                                            <span className={`font-bold text-sm ${residenceExpired ? 'text-red-700' : 'text-gray-900'}`}>
                                                                {residenceExpired ? 'Renouvellement Requis' : 'Document à jour'}
                                                            </span>
                                                        </div>
                                                        <p className="text-xs text-gray-500 mt-1">
                                                            Délivré le: {driver.documents?.residence?.issueDate || 'Inconnu'} • Validité 3 mois
                                                        </p>
                                                    </div>
                                                    {residenceExpired && (
                                                        <button className="text-xs bg-red-600 text-white px-3 py-1.5 rounded-lg font-bold hover:bg-red-700">
                                                            Mettre à jour
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {subTab === 'HISTORY' && (
                                 <div className="animate-in fade-in slide-in-from-bottom-2">
                                     <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2"><Clock size={18}/> Dernières Courses</h3>
                                     
                                     <div className="relative border-l-2 border-gray-100 ml-4 space-y-8 my-4">
                                        {driver.history && driver.history.length > 0 ? (
                                            driver.history.map((trip) => (
                                                <div key={trip.id} className="relative pl-8">
                                                    {/* Timeline dot */}
                                                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-2 border-primary-500 shadow-sm z-10"></div>
                                                    
                                                    <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
                                                        <div className="flex justify-between items-start mb-3">
                                                            <div>
                                                                <h4 className="font-bold text-gray-900 text-base">{trip.clientName}</h4>
                                                                <p className="text-xs text-gray-500 font-medium flex items-center gap-1"><Car size={12}/> {trip.vehicleName}</p>
                                                            </div>
                                                            <span className="text-xs bg-gray-50 text-gray-500 px-2 py-1 rounded font-bold">{trip.date}</span>
                                                        </div>
                                                        
                                                        <div className="flex items-center justify-between border-t border-gray-50 pt-3 mt-2">
                                                            <div className="flex items-center gap-1.5 text-xs font-bold text-gray-600">
                                                                <Clock size={14} className="text-primary-500"/>
                                                                {trip.duration}
                                                            </div>
                                                            <div className="flex items-center gap-1 text-yellow-500 font-bold text-xs bg-yellow-50 px-2 py-1 rounded-full border border-yellow-100">
                                                                <Star size={10} fill="currentColor"/> {trip.rating}/5
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="pl-6 py-4">
                                                <div className="text-center p-6 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                                                    <History size={24} className="mx-auto text-gray-300 mb-2"/>
                                                    <p className="text-gray-500 italic text-sm">Aucun historique de course disponible.</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const VehicleManageModal = ({ vehicle: initialVehicle, onClose }: { vehicle: Vehicle, onClose: () => void }) => {
        const [subTab, setSubTab] = useState<'SUMMARY' | 'INFO' | 'CALENDAR' | 'PRICING' | 'HISTORY' | 'DOCUMENTS'>('SUMMARY');
        const [currentDate, setCurrentDate] = useState(new Date());
        const [vehicleData, setVehicleData] = useState<Vehicle>(initialVehicle);
        const [isUnlimitedMileage, setIsUnlimitedMileage] = useState(vehicleData.unlimitedMileage || false);

        // Calendar state
        const [calendarMonth, setCalendarMonth] = useState(new Date());

        const updatePricing = (field: string, value: number) => {
             setVehicleData(prev => ({
                 ...prev,
                 pricingRates: { ...prev.pricingRates, [field]: value }
             }));
        };

        const updateVehicle = (field: string, value: any) => {
             setVehicleData(prev => ({ ...prev, [field]: value }));
        };

        const toggleAvailability = (dateStr: string) => {
            const currentUnavailable = vehicleData.unavailableDates || [];
            let newUnavailable;
            if (currentUnavailable.includes(dateStr)) {
                newUnavailable = currentUnavailable.filter(d => d !== dateStr);
            } else {
                newUnavailable = [...currentUnavailable, dateStr];
            }
            setVehicleData(prev => ({ ...prev, unavailableDates: newUnavailable }));
        };

        const changeCalendarMonth = (delta: number) => {
            const newDate = new Date(calendarMonth);
            newDate.setMonth(newDate.getMonth() + delta);
            setCalendarMonth(newDate);
        };

        const renderCalendar = () => {
            const year = calendarMonth.getFullYear();
            const month = calendarMonth.getMonth();
            const daysInMonth = new Date(year, month + 1, 0).getDate();
            const firstDayOfMonth = new Date(year, month, 1).getDay();
            const startDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

            const grid = [];
            // Empty cells for start padding
            for(let i=0; i < startDay; i++) grid.push(<div key={`empty-${i}`} className="h-16 bg-gray-50/50 border border-transparent"></div>);
            
            for(let i=1; i<=daysInMonth; i++) {
                const dateStr = `${year}-${String(month+1).padStart(2,'0')}-${String(i).padStart(2,'0')}`;
                const isUnavailable = vehicleData.unavailableDates?.includes(dateStr);
                const isPast = new Date(dateStr) < new Date(new Date().setHours(0,0,0,0));

                grid.push(
                    <button 
                        key={i}
                        disabled={isPast}
                        onClick={() => toggleAvailability(dateStr)}
                        className={`h-16 rounded-lg flex flex-col items-center justify-center text-sm font-bold border transition-all relative group
                            ${isPast ? 'bg-gray-100 text-gray-300 cursor-not-allowed' : 
                              isUnavailable ? 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100' :
                              'bg-white text-green-700 border-green-200 hover:bg-green-50 hover:border-green-300'}
                        `}
                    >
                        <span className="text-lg">{i}</span>
                        {!isPast && (
                            <span className={`text-[9px] uppercase font-bold px-1.5 rounded ${isUnavailable ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                                {isUnavailable ? 'Bloqué' : 'Libre'}
                            </span>
                        )}
                    </button>
                );
            }
            return grid;
        };
        
        return (
            <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
                <div className="bg-white rounded-3xl w-full max-w-4xl h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                    {/* Header */}
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                        <div className="flex items-center gap-4">
                            <img src={vehicleData.image} className="w-16 h-12 object-cover rounded-lg border border-gray-200" alt=""/>
                            <div>
                                <input 
                                    type="text" 
                                    value={vehicleData.title} 
                                    onChange={(e) => updateVehicle('title', e.target.value)}
                                    placeholder="Modèle du véhicule (ex: Toyota Prado)"
                                    className="font-bold text-lg text-gray-900 bg-transparent border-b border-transparent focus:border-gray-300 outline-none w-full"
                                />
                                <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                                    <span className={`w-2 h-2 rounded-full ${vehicleData.isAvailable ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                    {vehicleData.isAvailable ? 'Disponible' : 'Indisponible'}
                                </p>
                            </div>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors"><X size={20}/></button>
                    </div>

                    {/* Tabs */}
                    <div className="flex border-b border-gray-100 bg-white px-6 overflow-x-auto">
                        {['SUMMARY', 'INFO', 'CALENDAR', 'PRICING', 'HISTORY', 'DOCUMENTS'].map((t) => (
                            <button 
                                key={t}
                                onClick={() => setSubTab(t as any)}
                                className={`px-4 py-4 text-xs font-bold tracking-wider border-b-2 transition-all whitespace-nowrap ${subTab === t ? 'border-primary-600 text-primary-600' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                            >
                                {t === 'SUMMARY' ? 'VUE D\'ENSEMBLE' : t === 'INFO' ? 'INFOS & DESC' : t === 'CALENDAR' ? 'CALENDRIER' : t === 'PRICING' ? 'TARIFS & KM' : t === 'HISTORY' ? 'HISTORIQUE' : 'DOCUMENTS'}
                            </button>
                        ))}
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto p-8 bg-gray-50">
                        {subTab === 'SUMMARY' && (
                             <div className="grid grid-cols-2 gap-8">
                                 <div className="col-span-2">
                                     <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-6">
                                         <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><Car size={18}/> Fiche Technique Rapide</h4>
                                         <div className="grid grid-cols-4 gap-4">
                                             <div className="p-3 bg-gray-50 rounded-lg">
                                                 <span className="block text-xs text-gray-400 uppercase font-bold">Année</span>
                                                 <span className="font-bold text-gray-900">{vehicleData.year || '20xx'}</span>
                                             </div>
                                             <div className="p-3 bg-gray-50 rounded-lg">
                                                 <span className="block text-xs text-gray-400 uppercase font-bold">Type</span>
                                                 <span className="font-bold text-gray-900">{vehicleData.type}</span>
                                             </div>
                                         </div>
                                     </div>
                                 </div>
                             </div>
                        )}

                        {subTab === 'INFO' && (
                             <div className="space-y-6 max-w-3xl mx-auto">
                                 <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                     <h4 className="font-bold text-gray-900 mb-4">Description Détaillée</h4>
                                     <textarea 
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 min-h-[150px] outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                                        placeholder="Décrivez votre véhicule..."
                                        value={vehicleData.description || ''}
                                        onChange={(e) => updateVehicle('description', e.target.value)}
                                     ></textarea>
                                 </div>

                                 <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                     <h4 className="font-bold text-gray-900 mb-4">Caractéristiques Techniques</h4>
                                     <div className="grid grid-cols-2 gap-4">
                                         <div>
                                            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Ville</label>
                                            <input type="text" value={vehicleData.location} onChange={(e) => updateVehicle('location', e.target.value)} className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200"/>
                                         </div>
                                         <div>
                                            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Année</label>
                                            <input type="number" value={vehicleData.year || ''} onChange={(e) => updateVehicle('year', parseInt(e.target.value))} className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200"/>
                                         </div>
                                     </div>
                                 </div>
                             </div>
                        )}

                        {subTab === 'CALENDAR' && (
                            <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                <div className="flex justify-between items-center mb-6">
                                    <div className="flex items-center gap-4">
                                        <button onClick={() => changeCalendarMonth(-1)} className="p-2 hover:bg-gray-100 rounded-lg"><ChevronLeft size={20}/></button>
                                        <h3 className="text-lg font-bold text-gray-900 capitalize">
                                            {calendarMonth.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
                                        </h3>
                                        <button onClick={() => changeCalendarMonth(1)} className="p-2 hover:bg-gray-100 rounded-lg"><ChevronRight size={20}/></button>
                                    </div>
                                    <div className="flex gap-4 text-xs font-bold">
                                        <div className="flex items-center gap-2"><div className="w-3 h-3 bg-green-100 border border-green-300 rounded"></div> Disponible</div>
                                        <div className="flex items-center gap-2"><div className="w-3 h-3 bg-red-100 border border-red-300 rounded"></div> Indisponible</div>
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-7 gap-2 mb-2 text-center text-xs font-bold text-gray-400 uppercase">
                                    {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map(d => <div key={d}>{d}</div>)}
                                </div>
                                <div className="grid grid-cols-7 gap-2">
                                    {renderCalendar()}
                                </div>
                                <p className="text-center text-xs text-gray-400 mt-4">Cliquez sur une date pour bloquer/débloquer la disponibilité.</p>
                            </div>
                        )}

                        {subTab === 'PRICING' && (
                            <div className="space-y-6 max-w-2xl mx-auto">
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                    <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><DollarSign size={18}/> Tarification (Ar)</h4>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-gray-400 uppercase">Prix Journée</label>
                                            <input 
                                                type="number" 
                                                value={vehicleData.pricingRates.day} 
                                                onChange={(e) => updatePricing('day', parseInt(e.target.value))}
                                                className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 font-bold"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-purple-500 uppercase">Prix Province / Jour</label>
                                            <input 
                                                type="number" 
                                                value={vehicleData.pricingRates.provinceDay || 0} 
                                                onChange={(e) => updatePricing('provinceDay', parseInt(e.target.value))}
                                                className="w-full p-3 bg-purple-50 rounded-lg border border-purple-200 font-bold text-purple-700"
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className="mt-6 pt-6 border-t border-gray-100 grid grid-cols-2 gap-4">
                                         <div className="space-y-1">
                                            <label className="text-xs font-bold text-gray-400 uppercase">Réduction Hebdo (%)</label>
                                            <input 
                                                type="number" 
                                                value={vehicleData.pricingRates.weeklyDiscount} 
                                                onChange={(e) => updatePricing('weeklyDiscount', parseInt(e.target.value))}
                                                className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 font-bold text-green-600"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-gray-400 uppercase">Réduction Mensuelle (%)</label>
                                            <input 
                                                type="number" 
                                                value={vehicleData.pricingRates.monthlyDiscount} 
                                                onChange={(e) => updatePricing('monthlyDiscount', parseInt(e.target.value))}
                                                className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 font-bold text-green-600"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                    <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><Gauge size={18}/> Kilométrage</h4>
                                    
                                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl mb-4 border border-gray-200">
                                        <div>
                                            <span className="block font-bold text-gray-900">Kilométrage Illimité</span>
                                        </div>
                                        <div 
                                            onClick={() => {
                                                setIsUnlimitedMileage(!isUnlimitedMileage);
                                                updateVehicle('unlimitedMileage', !isUnlimitedMileage);
                                            }}
                                            className={`w-14 h-8 rounded-full flex items-center px-1 cursor-pointer transition-colors ${isUnlimitedMileage ? 'bg-primary-600' : 'bg-gray-300'}`}
                                        >
                                            <div className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform ${isUnlimitedMileage ? 'translate-x-6' : ''}`}></div>
                                        </div>
                                    </div>

                                    {!isUnlimitedMileage && (
                                        <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2">
                                            <div className="space-y-1">
                                                <label className="text-xs font-bold text-gray-400 uppercase">Limite Km / Jour</label>
                                                <input 
                                                    type="number" 
                                                    value={vehicleData.mileageLimit || 200} 
                                                    onChange={(e) => updateVehicle('mileageLimit', parseInt(e.target.value))}
                                                    className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 font-bold"
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-xs font-bold text-gray-400 uppercase">Coût Km Supplémentaire</label>
                                                <input 
                                                    type="number" 
                                                    value={vehicleData.extraKmPrice || 1000} 
                                                    onChange={(e) => updateVehicle('extraKmPrice', parseInt(e.target.value))}
                                                    className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 font-bold"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                        
                        {subTab === 'HISTORY' && (
                            <div className="space-y-6">
                                <div className="flex justify-between items-center mb-4">
                                     <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2"><History size={18}/> Historique des Locations</h3>
                                     <span className="text-sm text-gray-500 font-medium">Total: {vehicleData.history?.length || 0} courses</span>
                                </div>
                                {vehicleData.history && vehicleData.history.length > 0 ? (
                                    <div className="space-y-4">
                                        {vehicleData.history.map((trip) => (
                                            <div key={trip.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
                                                <div className="flex justify-between items-start">
                                                    <div className="flex items-center gap-4">
                                                        <img src={trip.clientAvatar || 'https://i.pravatar.cc/150'} alt={trip.client} className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"/>
                                                        <div>
                                                            <h4 className="font-bold text-gray-900">{trip.client}</h4>
                                                            <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                                                                <span className="bg-gray-100 px-2 py-0.5 rounded font-mono font-bold text-gray-600">{trip.startDate} - {trip.endDate}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${trip.status === 'COMPLETED' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                                                            {trip.status === 'COMPLETED' ? 'Terminé' : 'En cours'}
                                                        </span>
                                                        <div className="font-bold text-secondary-900 mt-2">{trip.amount.toLocaleString()} Ar</div>
                                                    </div>
                                                </div>
                                                <div className="mt-4 pt-4 border-t border-gray-50 flex justify-between items-center text-sm">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-gray-400 font-medium">Chauffeur:</span>
                                                        {trip.driverName ? (
                                                            <span className="font-bold text-gray-700 flex items-center gap-1"><UserIcon size={14}/> {trip.driverName}</span>
                                                        ) : (
                                                            <span className="font-bold text-gray-400 italic">Sans Chauffeur</span>
                                                        )}
                                                    </div>
                                                    {trip.rating && (
                                                        <div className="flex items-center gap-1 text-yellow-500 font-bold bg-yellow-50 px-2 py-0.5 rounded-full">
                                                            <Star size={12} fill="currentColor"/> {trip.rating}/5
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-200">
                                        <Car size={32} className="mx-auto text-gray-300 mb-3"/>
                                        <p className="text-gray-500 italic">Aucun historique disponible pour ce véhicule.</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {subTab === 'DOCUMENTS' && (
                            <div className="max-w-3xl mx-auto space-y-6">
                                <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex items-start gap-3">
                                    <AlertCircle className="text-blue-500 shrink-0 mt-0.5" size={20}/>
                                    <p className="text-sm text-blue-800 leading-relaxed">
                                        Ces documents sont obligatoires pour valider votre véhicule.
                                    </p>
                                </div>
                                <div className="grid gap-4">
                                    {[
                                        { label: "Carte Grise", icon: FileText },
                                        { label: "Assurance", icon: ShieldCheck },
                                        { label: "Visite Technique", icon: Wrench }
                                    ].map((doc, idx) => (
                                        <div key={idx} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
                                                    <doc.icon size={24}/>
                                                </div>
                                                <div>
                                                    <h5 className="font-bold text-gray-900">{doc.label}</h5>
                                                    <p className="text-xs text-gray-500">Document requis</p>
                                                </div>
                                            </div>
                                            <button className="text-primary-600 font-bold text-sm hover:underline">Téléverser</button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                    
                    {/* Footer Actions */}
                    <div className="p-6 bg-white border-t border-gray-100 flex justify-end gap-4">
                        <button onClick={onClose} className="px-6 py-3 font-bold text-gray-500 hover:bg-gray-100 rounded-xl transition-colors">Annuler</button>
                        <button onClick={() => handleSaveVehicle(vehicleData)} className="px-8 py-3 bg-secondary-900 text-white font-bold rounded-xl hover:bg-secondary-800 shadow-lg flex items-center gap-2">
                            <Save size={18}/> Enregistrer
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* OWNER SIDEBAR */}
            <aside className="w-64 bg-white border-r border-gray-100 fixed h-[calc(100vh-80px)] top-20 hidden lg:block overflow-y-auto">
                 <div className="p-6">
                     <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Menu Propriétaire</div>
                     <nav className="space-y-2">
                         <button onClick={() => setActiveTab('OVERVIEW')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'OVERVIEW' ? 'bg-primary-50 text-primary-600' : 'text-gray-600 hover:bg-gray-50'}`}>
                             <LayoutIcon size={20}/> Vue d'ensemble
                         </button>
                         <button onClick={() => setActiveTab('FLEET')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'FLEET' ? 'bg-primary-50 text-primary-600' : 'text-gray-600 hover:bg-gray-50'}`}>
                             <Car size={20}/> Ma Flotte
                         </button>
                         <button onClick={() => setActiveTab('DRIVERS')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'DRIVERS' ? 'bg-primary-50 text-primary-600' : 'text-gray-600 hover:bg-gray-50'}`}>
                             <UserIcon size={20}/> Chauffeurs
                         </button>
                         <button onClick={() => setActiveTab('FINANCE')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'FINANCE' ? 'bg-primary-50 text-primary-600' : 'text-gray-600 hover:bg-gray-50'}`}>
                             <Banknote size={20}/> Finance & Revenus
                         </button>
                         <button onClick={() => setActiveTab('PROFILE')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'PROFILE' ? 'bg-primary-50 text-primary-600' : 'text-gray-600 hover:bg-gray-50'}`}>
                             <Settings size={20}/> Mon Profil
                         </button>
                     </nav>
                 </div>
            </aside>

            {/* MAIN CONTENT AREA */}
            <main className="flex-1 lg:ml-64 p-6 lg:p-10">
                
                {activeTab === 'OVERVIEW' && (
                    <div className="space-y-8 animate-in fade-in duration-500">
                        {/* KPI Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><Car size={24}/></div>
                                    <span className="text-green-500 text-xs font-bold bg-green-50 px-2 py-1 rounded">+12%</span>
                                </div>
                                <p className="text-gray-500 text-sm font-medium">Véhicules Actifs</p>
                                <h3 className="text-3xl font-black text-gray-900">{vehicles.length}</h3>
                            </div>
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-3 bg-green-50 text-green-600 rounded-xl"><DollarSign size={24}/></div>
                                </div>
                                <p className="text-gray-500 text-sm font-medium">Revenus du mois</p>
                                <h3 className="text-3xl font-black text-gray-900">2.5M <span className="text-sm text-gray-400">Ar</span></h3>
                            </div>
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-3 bg-purple-50 text-purple-600 rounded-xl"><Users size={24}/></div>
                                </div>
                                <p className="text-gray-500 text-sm font-medium">Chauffeurs Libres</p>
                                <h3 className="text-3xl font-black text-gray-900">
                                    {drivers.filter(d => !d.currentJob).length}/{drivers.length}
                                </h3>
                            </div>
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-3 bg-orange-50 text-orange-600 rounded-xl"><Star size={24}/></div>
                                </div>
                                <p className="text-gray-500 text-sm font-medium">Note Moyenne</p>
                                <h3 className="text-3xl font-black text-gray-900">4.8</h3>
                            </div>
                        </div>

                        {/* Charts & Fleet Status */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                             {/* Revenue Graph (Visual Mock) */}
                             <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                                 <div className="flex justify-between items-center mb-8">
                                     <h3 className="font-bold text-gray-900 text-lg">Évolution des Revenus</h3>
                                     <select className="bg-gray-50 border border-gray-100 rounded-lg text-xs font-bold px-3 py-1">
                                         <option>Ce mois</option>
                                         <option>3 derniers mois</option>
                                     </select>
                                 </div>
                                 <div className="h-64 flex items-end justify-between gap-2 px-2">
                                     {[35, 45, 30, 60, 75, 50, 65, 80, 55, 40, 70, 90].map((h, i) => (
                                         <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                                             <div 
                                                className="w-full bg-secondary-900 rounded-t-lg transition-all duration-500 relative group-hover:bg-primary-600" 
                                                style={{ height: `${h}%` }}
                                             >
                                                 <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                                     {(h * 15000).toLocaleString()} Ar
                                                 </div>
                                             </div>
                                             <span className="text-[10px] text-gray-400 font-bold">{i+1}</span>
                                         </div>
                                     ))}
                                 </div>
                             </div>

                             {/* Fleet Status Pie (Simulated) */}
                             <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                                 <h3 className="font-bold text-gray-900 text-lg mb-6">État de la Flotte</h3>
                                 <div className="flex justify-center mb-8 relative">
                                     <div className="w-48 h-48 rounded-full border-[16px] border-gray-100 flex items-center justify-center relative">
                                         {/* Simple CSS Conic Gradient for Pie Chart */}
                                         <div className="absolute inset-0 rounded-full" style={{ background: `conic-gradient(#2563eb 0% 60%, #10b981 60% 85%, #ef4444 85% 100%)`, mask: 'radial-gradient(transparent 55%, black 56%)', WebkitMask: 'radial-gradient(transparent 55%, black 56%)' }}></div>
                                         <div className="text-center z-10">
                                             <span className="block text-3xl font-black text-gray-900">{vehicles.length}</span>
                                             <span className="text-xs text-gray-500 uppercase font-bold">Total</span>
                                         </div>
                                     </div>
                                 </div>
                                 <div className="space-y-3">
                                     <div className="flex items-center justify-between">
                                         <div className="flex items-center gap-2">
                                             <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                                             <span className="text-sm font-medium text-gray-600">Disponibles</span>
                                         </div>
                                         <span className="font-bold text-gray-900">60%</span>
                                     </div>
                                     <div className="flex items-center justify-between">
                                         <div className="flex items-center gap-2">
                                             <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                             <span className="text-sm font-medium text-gray-600">Loués</span>
                                         </div>
                                         <span className="font-bold text-gray-900">25%</span>
                                     </div>
                                     <div className="flex items-center justify-between">
                                         <div className="flex items-center gap-2">
                                             <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                             <span className="text-sm font-medium text-gray-600">Maintenance</span>
                                         </div>
                                         <span className="font-bold text-gray-900">15%</span>
                                     </div>
                                 </div>
                             </div>
                        </div>

                        {/* Recent Activity & Quick Actions */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                             {/* Activity Feed */}
                             <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                                 <h3 className="font-bold text-gray-900 text-lg mb-6">Activité Récente</h3>
                                 <div className="space-y-6">
                                     {[
                                         { icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-50', text: "Réservation confirmée pour Toyota Prado", time: "Il y a 2h" },
                                         { icon: Star, color: 'text-yellow-500', bg: 'bg-yellow-50', text: "Nouvel avis 5 étoiles de Jean Rakoto", time: "Il y a 5h" },
                                         { icon: Wrench, color: 'text-orange-500', bg: 'bg-orange-50', text: "Maintenance terminée sur Renault Kerax", time: "Hier" },
                                         { icon: DollarSign, color: 'text-blue-500', bg: 'bg-blue-50', text: "Paiement reçu : 450,000 Ar", time: "Hier" }
                                     ].map((item, idx) => (
                                         <div key={idx} className="flex gap-4 items-start">
                                             <div className={`p-2 rounded-full ${item.bg} ${item.color} mt-1`}>
                                                 <item.icon size={16}/>
                                             </div>
                                             <div>
                                                 <p className="text-sm font-bold text-gray-800">{item.text}</p>
                                                 <p className="text-xs text-gray-400">{item.time}</p>
                                             </div>
                                         </div>
                                     ))}
                                 </div>
                             </div>

                             {/* Quick Actions Panel */}
                             <div className="bg-secondary-900 text-white rounded-2xl shadow-lg p-6 relative overflow-hidden">
                                 <div className="absolute top-0 right-0 w-32 h-32 bg-primary-600 rounded-full blur-2xl opacity-20 -mr-10 -mt-10"></div>
                                 <h3 className="font-bold text-lg mb-6 relative z-10">Actions Rapides</h3>
                                 <div className="space-y-3 relative z-10">
                                     <button onClick={handleAddVehicle} className="w-full flex items-center justify-between bg-white/10 hover:bg-white/20 p-4 rounded-xl transition-colors backdrop-blur-sm border border-white/10 group">
                                         <span className="font-bold text-sm flex items-center gap-3"><Car size={18}/> Ajouter Véhicule</span>
                                         <Plus size={16} className="text-gray-400 group-hover:text-white transition-colors"/>
                                     </button>
                                     <button onClick={() => { setSelectedDriver(null); setIsAddDriverOpen(true); }} className="w-full flex items-center justify-between bg-white/10 hover:bg-white/20 p-4 rounded-xl transition-colors backdrop-blur-sm border border-white/10 group">
                                         <span className="font-bold text-sm flex items-center gap-3"><UserIcon size={18}/> Nouveau Chauffeur</span>
                                         <Plus size={16} className="text-gray-400 group-hover:text-white transition-colors"/>
                                     </button>
                                     <button className="w-full flex items-center justify-between bg-white/10 hover:bg-white/20 p-4 rounded-xl transition-colors backdrop-blur-sm border border-white/10 group">
                                         <span className="font-bold text-sm flex items-center gap-3"><FileText size={18}/> Exporter Rapport</span>
                                         <Download size={16} className="text-gray-400 group-hover:text-white transition-colors"/>
                                     </button>
                                 </div>
                             </div>
                        </div>
                    </div>
                )}

                {/* Fleet Content */}
                {activeTab === 'FLEET' && (
                     <div className="animate-in fade-in duration-500">
                         <div className="flex justify-between items-center mb-8">
                             <h2 className="text-2xl font-bold text-gray-900">Ma Flotte</h2>
                             <button onClick={handleAddVehicle} className="bg-secondary-900 text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-secondary-800 transition-colors">
                                 <Plus size={20}/> Ajouter un véhicule
                             </button>
                         </div>
                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                             {vehicles.map(vehicle => (
                                 <div 
                                    key={vehicle.id} 
                                    onClick={() => setSelectedVehicle(vehicle)}
                                    className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer"
                                 >
                                     <div className="h-48 overflow-hidden relative">
                                         <img src={vehicle.image} alt={vehicle.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/>
                                         <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded text-xs font-bold shadow-sm">
                                             {vehicle.isAvailable ? <span className="text-green-600">Disponible</span> : <span className="text-red-500">Loué</span>}
                                         </div>
                                     </div>
                                     <div className="p-5">
                                         <h3 className="font-bold text-gray-900 text-lg mb-1">{vehicle.title}</h3>
                                         <p className="text-gray-500 text-sm mb-4">{vehicle.location} • {vehicle.type}</p>
                                         <div className="flex justify-between items-center border-t border-gray-50 pt-4">
                                             <span className="font-bold text-secondary-900">{vehicle.pricePerDay.toLocaleString()} Ar/j</span>
                                             <div className="flex gap-2">
                                                 <span className="text-xs bg-gray-50 text-gray-400 px-2 py-1 rounded font-bold uppercase">{vehicle.history?.length || 0} Trips</span>
                                             </div>
                                         </div>
                                     </div>
                                 </div>
                             ))}
                         </div>
                     </div>
                )}

                {/* DRIVERS Tab Content */}
                {activeTab === 'DRIVERS' && (
                    <div className="animate-in fade-in duration-500">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-2xl font-bold text-gray-900">Mes Chauffeurs</h2>
                            <button onClick={() => { setSelectedDriver(null); setIsAddDriverOpen(true); }} className="bg-secondary-900 text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-secondary-800 transition-colors">
                                <Plus size={20}/> Nouveau Chauffeur
                            </button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {drivers.map(driver => (
                                <DriverCard 
                                    key={driver.id} 
                                    driver={driver} 
                                    onSelect={(d) => { setSelectedDriver(d); setIsDriverDetailOpen(true); }} 
                                />
                            ))}
                            {drivers.length === 0 && (
                                <div className="col-span-full py-12 text-center bg-white rounded-2xl border border-dashed border-gray-200">
                                    <UserIcon size={48} className="mx-auto text-gray-300 mb-4"/>
                                    <p className="text-gray-500 font-medium">Aucun chauffeur enregistré.</p>
                                    <button onClick={() => setIsAddDriverOpen(true)} className="text-primary-600 font-bold mt-2 hover:underline">Ajouter mon premier chauffeur</button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
                
                {/* Finance Tab */}
                {activeTab === 'FINANCE' && (
                     <div className="space-y-8 animate-in fade-in duration-500">
                         {/* Header with Export */}
                         <div className="flex justify-between items-center">
                             <h2 className="text-2xl font-bold text-gray-900">Finance & Revenus</h2>
                             <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-xl font-bold hover:bg-gray-50">
                                 <Download size={18}/> Exporter Rapport
                             </button>
                         </div>

                         {/* Finance KPIs */}
                         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                             <div className="bg-secondary-900 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
                                 <div className="absolute right-0 top-0 opacity-10 -mr-4 -mt-4"><Wallet size={120}/></div>
                                 <p className="text-gray-400 text-sm font-medium mb-1">Revenus Net (Perçu)</p>
                                 <h3 className="text-3xl font-black">{totalNet.toLocaleString()} Ar</h3>
                             </div>
                             <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                 <p className="text-gray-500 text-sm font-medium mb-1">Chiffre d'Affaires (Brut)</p>
                                 <h3 className="text-3xl font-black text-gray-900">{totalGross.toLocaleString()} Ar</h3>
                                 <p className="text-xs text-gray-400 mt-2">Avant commission plateforme</p>
                             </div>
                             <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                 <p className="text-gray-500 text-sm font-medium mb-1">Commissions Mcar</p>
                                 <h3 className="text-3xl font-black text-red-500">-{totalCommission.toLocaleString()} Ar</h3>
                                 <p className="text-xs text-gray-400 mt-2">15% sur les transactions</p>
                             </div>
                         </div>

                         {/* Detailed Transactions Table */}
                         <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                             <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                                 <h3 className="font-bold text-lg text-gray-900">Détail des transactions</h3>
                                 <span className="text-xs text-gray-400 italic">Cliquez sur une ligne pour voir le détail</span>
                             </div>
                             <div className="overflow-x-auto">
                                 <table className="w-full text-left">
                                     <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-bold">
                                         <tr>
                                             <th className="px-6 py-4">Booking ID</th>
                                             <th className="px-6 py-4">Date</th>
                                             <th className="px-6 py-4">Client</th>
                                             <th className="px-6 py-4">Détails Location</th>
                                             <th className="px-6 py-4 text-right">Montant Brut</th>
                                             <th className="px-6 py-4 text-right">Net Perçu</th>
                                             <th className="px-6 py-4 text-center">Statut</th>
                                         </tr>
                                     </thead>
                                     <tbody className="divide-y divide-gray-50 text-sm">
                                         {OWNER_FINANCE_DATA.map(item => (
                                             <tr 
                                                key={item.id} 
                                                onClick={() => setSelectedTransaction(item)}
                                                className="hover:bg-primary-50/50 transition-colors cursor-pointer group"
                                             >
                                                  <td className="px-6 py-4">
                                                     <span className="font-mono font-bold text-primary-600 bg-primary-50 px-2 py-0.5 rounded text-xs">{item.bookingRef}</span>
                                                  </td>
                                                 <td className="px-6 py-4 text-gray-900 font-bold">{item.date}</td>
                                                 <td className="px-6 py-4">
                                                     <div className="flex items-center gap-3">
                                                         <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden border border-white shadow-sm">
                                                             <img src={item.clientAvatar} alt="" className="w-full h-full object-cover"/>
                                                         </div>
                                                         <span className="font-bold text-gray-900">{item.clientName}</span>
                                                     </div>
                                                 </td>
                                                 <td className="px-6 py-4">
                                                     <div className="font-medium text-gray-900">{item.vehicle}</div>
                                                     <div className="text-xs text-gray-500 mt-1">{item.rentalType} • {item.duration}</div>
                                                 </td>
                                                 <td className="px-6 py-4 text-right font-medium text-gray-900">{item.gross.toLocaleString()} Ar</td>
                                                 <td className="px-6 py-4 text-right font-black text-green-600">{item.net.toLocaleString()} Ar</td>
                                                 <td className="px-6 py-4 text-center">
                                                     <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${item.status === 'PAYÉ' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                                                         {item.status}
                                                     </span>
                                                 </td>
                                             </tr>
                                         ))}
                                     </tbody>
                                 </table>
                             </div>
                         </div>
                     </div>
                )}
                
                {activeTab === 'PROFILE' && (
                    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
                        <div className="flex justify-between items-center">
                             <h2 className="text-2xl font-bold text-gray-900">Mon Profil Propriétaire</h2>
                             <button className="bg-secondary-900 text-white px-6 py-2 rounded-xl font-bold hover:bg-secondary-800 transition-colors flex items-center gap-2">
                                 <Save size={18}/> Enregistrer
                             </button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Avatar / Selfie Section */}
                            <div className="col-span-1 space-y-6">
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center relative group">
                                    <div className="w-32 h-32 mx-auto bg-gray-100 rounded-full mb-4 overflow-hidden border-4 border-white shadow-lg relative cursor-pointer">
                                        <img src={currentUser.avatar} alt="Profile" className="w-full h-full object-cover"/>
                                        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Camera className="text-white mb-1" size={24}/>
                                            <span className="text-white text-[10px] font-bold uppercase">Changer</span>
                                        </div>
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-1">Photo de Profil (Selfie)</h3>
                                    <p className="text-xs text-gray-400 mb-4">Pour la sécurité de la communauté, merci d'utiliser une photo récente de vous.</p>
                                    
                                    <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
                                        <CheckCircle size={12}/> Identité Vérifiée
                                    </div>
                                </div>
                                
                                <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl">
                                    <h4 className="font-bold text-blue-900 text-sm mb-2 flex items-center gap-2">
                                        <ShieldCheck size={16}/> Compte Certifié
                                    </h4>
                                    <p className="text-xs text-blue-800 leading-relaxed">
                                        Vos documents sont valides. Vous pouvez publier des annonces et recevoir des paiements.
                                    </p>
                                </div>
                            </div>

                            {/* Details Form */}
                            <div className="col-span-1 md:col-span-2 space-y-6">
                                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                                    <h4 className="font-bold text-lg text-gray-900 mb-6 pb-2 border-b border-gray-50 flex items-center gap-2">
                                        <UserIcon size={20} className="text-primary-600"/> Identité & Contact
                                    </h4>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-gray-400 uppercase">Nom</label>
                                            <input 
                                                type="text" 
                                                value={currentUser.lastName || ''} 
                                                onChange={e => setCurrentUser({...currentUser, lastName: e.target.value})}
                                                className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 font-semibold text-gray-900 focus:ring-2 focus:ring-primary-500 outline-none transition-all" 
                                                placeholder="Votre nom"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-gray-400 uppercase">Prénom</label>
                                            <input 
                                                type="text" 
                                                value={currentUser.firstName || ''} 
                                                onChange={e => setCurrentUser({...currentUser, firstName: e.target.value})}
                                                className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 font-semibold text-gray-900 focus:ring-2 focus:ring-primary-500 outline-none transition-all" 
                                                placeholder="Votre prénom"
                                            />
                                        </div>
                                        <div className="col-span-2 space-y-1">
                                            <label className="text-xs font-bold text-gray-400 uppercase flex items-center gap-2">
                                                Numéro CIN <span className="text-red-500">*</span>
                                            </label>
                                            <div className="relative">
                                                <CIDIcon size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
                                                <input 
                                                    type="text" 
                                                    value={currentUser.cinNumber || ''} 
                                                    onChange={e => setCurrentUser({...currentUser, cinNumber: e.target.value})}
                                                    placeholder="Ex: 101 211 589 442" 
                                                    className="w-full p-3 pl-10 bg-gray-50 rounded-xl border border-gray-200 font-mono text-gray-900 focus:ring-2 focus:ring-primary-500 outline-none transition-all" 
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-gray-400 uppercase">Téléphone</label>
                                            <input 
                                                type="tel" 
                                                value={currentUser.phone || ''} 
                                                onChange={e => setCurrentUser({...currentUser, phone: e.target.value})}
                                                className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 font-semibold text-gray-900" 
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-gray-400 uppercase">Email</label>
                                            <input 
                                                type="email" 
                                                value={currentUser.email || ''} 
                                                readOnly
                                                className="w-full p-3 bg-gray-100 rounded-xl border border-gray-200 font-semibold text-gray-500 cursor-not-allowed" 
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                                    <h4 className="font-bold text-lg text-gray-900 mb-6 pb-2 border-b border-gray-50 flex items-center gap-2">
                                        <Home size={20} className="text-primary-600"/> Adresse & Résidence
                                    </h4>
                                    <div className="space-y-4">
                                         <div className="space-y-1">
                                            <label className="text-xs font-bold text-gray-400 uppercase">Adresse Physique</label>
                                            <input 
                                                type="text" 
                                                value={currentUser.address || ''} 
                                                onChange={e => setCurrentUser({...currentUser, address: e.target.value})}
                                                placeholder="Lot, Ville, Code Postal..." 
                                                className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 font-semibold text-gray-900" 
                                            />
                                        </div>
                                        
                                        {/* Document Uploads Row */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                            {/* Certificat Résidence */}
                                            <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 flex flex-col items-center justify-center text-center hover:border-primary-400 hover:bg-primary-50 transition-all cursor-pointer group">
                                                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-gray-400 group-hover:text-primary-600 mb-2">
                                                    <FileText size={20}/>
                                                </div>
                                                <span className="text-sm font-bold text-gray-700">Certificat Résidence</span>
                                                <span className="text-[10px] text-gray-400 mt-1">Moins de 3 mois</span>
                                                {currentUser.documents?.residence?.status === 'VALID' ? (
                                                    <span className="mt-2 text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded flex items-center gap-1"><CheckCircle size={10}/> Validé</span>
                                                ) : (
                                                    <span className="mt-2 text-xs font-bold text-primary-600">Téléverser</span>
                                                )}
                                            </div>

                                            {/* CIN Upload */}
                                            <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 flex flex-col items-center justify-center text-center hover:border-primary-400 hover:bg-primary-50 transition-all cursor-pointer group">
                                                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-gray-400 group-hover:text-primary-600 mb-2">
                                                    <CIDIcon size={20}/>
                                                </div>
                                                <span className="text-sm font-bold text-gray-700">Scan CIN R/V</span>
                                                <span className="text-[10px] text-gray-400 mt-1">Lisible et clair</span>
                                                {currentUser.documents?.cin?.status === 'VALID' ? (
                                                    <span className="mt-2 text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded flex items-center gap-1"><CheckCircle size={10}/> Validé</span>
                                                ) : (
                                                    <span className="mt-2 text-xs font-bold text-primary-600">Téléverser</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                                    <h4 className="font-bold text-lg text-gray-900 mb-6 pb-2 border-b border-gray-50 flex items-center justify-between">
                                        <span className="flex items-center gap-2"><Briefcase size={20} className="text-primary-600"/> Infos Fiscales (Optionnel)</span>
                                    </h4>
                                    <div className="grid grid-cols-2 gap-6 mb-6">
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-gray-400 uppercase">NIF</label>
                                            <input type="text" value={currentUser.nif || ''} placeholder="Pour les pros" className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 font-mono text-gray-900" />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-gray-400 uppercase">STAT</label>
                                            <input type="text" value={currentUser.stat || ''} placeholder="Pour les pros" className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 font-mono text-gray-900" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
            
            {/* MODALS */}
            {selectedVehicle && <VehicleManageModal vehicle={selectedVehicle} onClose={() => setSelectedVehicle(null)} />}
            {isAddDriverOpen && <DriverManageModal driver={selectedDriver} onClose={() => setIsAddDriverOpen(false)} onSave={handleDriverAction} />}
            {selectedTransaction && <TransactionDetailModal transaction={selectedTransaction} onClose={() => setSelectedTransaction(null)} />}
            {selectedDriver && isDriverDetailOpen && <DriverDetailModal driver={selectedDriver} onClose={() => setIsDriverDetailOpen(false)} />}
        </div>
    );
};

// --- ICON MAPPER ---
const ICON_MAP: Record<string, any> = {
    'Wifi': Wifi,
    'Map': Map,
    'Baby': Baby,
    'Shield': Shield,
    'Music': Music,
    'Coffee': Coffee,
    'Snowflake': Snowflake,
    'BatteryCharging': BatteryCharging,
    'ShoppingBag': ShoppingBag,
    'Umbrella': Umbrella,
    'TabletSmartphone': Briefcase // Fallback for GPS
};

const CRMPipeline = () => {
    const [draggedUser, setDraggedUser] = useState<string | null>(null);
    
    // Group users by stage
    const usersByStage = MOCK_USERS_LIST.reduce((acc, user) => {
        const stage = user.pipelineStage || 'LEAD';
        if (!acc[stage]) acc[stage] = [];
        acc[stage].push(user);
        return acc;
    }, {} as Record<string, User[]>);

    const stages: {id: PipelineStage, label: string, color: string}[] = [
        { id: 'LEAD', label: 'Prospects (Nouveaux)', color: 'bg-gray-100 text-gray-600' },
        { id: 'INTERESTED', label: 'En Recherche', color: 'bg-blue-50 text-blue-600' },
        { id: 'NEGOTIATION', label: 'Devis / Panier', color: 'bg-orange-50 text-orange-600' },
        { id: 'WON', label: 'Clients (Gagnés)', color: 'bg-green-50 text-green-600' },
        { id: 'LOYAL', label: 'Fidèles (VIP)', color: 'bg-purple-50 text-purple-600' },
    ];

    return (
        <div className="h-[calc(100vh-200px)] overflow-x-auto">
             <div className="flex gap-6 h-full min-w-[1200px] pb-4">
                 {stages.map(stage => (
                     <div key={stage.id} className="flex-1 flex flex-col min-w-[280px]">
                         <div className={`p-3 rounded-t-xl font-bold text-sm uppercase flex justify-between items-center ${stage.color} border-b-2 border-white/50`}>
                             {stage.label}
                             <span className="bg-white/50 px-2 py-0.5 rounded text-xs">{(usersByStage[stage.id] || []).length}</span>
                         </div>
                         <div className="bg-gray-100/50 flex-1 rounded-b-xl p-3 space-y-3 overflow-y-auto">
                             {(usersByStage[stage.id] || []).map(user => (
                                 <div key={user.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all cursor-pointer group relative">
                                     <div className="flex items-center gap-3 mb-3">
                                         <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden">
                                             <img src={user.avatar} alt="" className="w-full h-full object-cover"/>
                                         </div>
                                         <div className="flex-1 min-w-0">
                                             <h4 className="font-bold text-gray-900 truncate">{user.name}</h4>
                                             <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                         </div>
                                     </div>
                                     
                                     <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                                         <div className="bg-gray-50 p-2 rounded">
                                             <span className="block text-gray-400 text-[10px] uppercase font-bold">Score</span>
                                             <span className={`font-black ${user.leadScore && user.leadScore > 70 ? 'text-green-600' : 'text-gray-700'}`}>{user.leadScore}/100</span>
                                         </div>
                                         <div className="bg-gray-50 p-2 rounded">
                                             <span className="block text-gray-400 text-[10px] uppercase font-bold">Activité</span>
                                             <span className="font-medium text-gray-700">{user.lastActive}</span>
                                         </div>
                                     </div>

                                     {user.internalNotes && (
                                         <div className="text-xs text-gray-500 bg-yellow-50 p-2 rounded border border-yellow-100 italic line-clamp-2">
                                             "{user.internalNotes}"
                                         </div>
                                     )}
                                     
                                     <div className="mt-3 pt-3 border-t border-gray-50 flex justify-between items-center">
                                         <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${user.role === 'OWNER' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>{user.role}</span>
                                         <button className="text-gray-300 hover:text-primary-600"><MoreHorizontal size={16}/></button>
                                     </div>
                                 </div>
                             ))}
                             {(usersByStage[stage.id] || []).length === 0 && (
                                 <div className="text-center py-8 text-gray-400 text-xs italic">Aucun client</div>
                             )}
                         </div>
                     </div>
                 ))}
             </div>
        </div>
    );
};

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('OVERVIEW');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    // Dynamic Categories State
    const [categories, setCategories] = useState([
        { id: 'car', label: 'Voitures', rate: 15 },
        { id: 'scooter', label: 'Scooters / Motos', rate: 12 },
        { id: 'truck', label: 'Camions / Utilitaires', rate: 20 },
    ]);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [newCategoryRate, setNewCategoryRate] = useState(15);

    // ADD-ONS STATE
    const [platformAddons, setPlatformAddons] = useState<AddOn[]>(DEFAULT_ADDONS);
    const [newAddon, setNewAddon] = useState<Partial<AddOn>>({ label: '', price: 0, iconKey: 'Wifi' });
    const availableIcons = Object.keys(ICON_MAP);

    // Blog State
    const [blogPosts, setBlogPosts] = useState(MOCK_BLOG_POSTS);
    const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
    const [newPost, setNewPost] = useState({ title: '', category: '', image: '', excerpt: '' });

    // Commission State
    const [commissionBaseRate, setCommissionBaseRate] = useState(15);

    // Filter Finance Data
    const filteredBookings = MOCK_BOOKINGS.filter(b => 
        b.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.renterName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalGMV = MOCK_BOOKINGS.reduce((acc, b) => acc + b.totalAmount, 0);
    const totalRevenue = MOCK_BOOKINGS.reduce((acc, b) => acc + b.commissionAmount, 0);
    const totalPayoutPending = MOCK_BOOKINGS.filter(b => b.payoutStatus === 'UNPAID').reduce((acc, b) => acc + b.netPayout, 0);

    const handleAddCategory = () => {
        if (!newCategoryName) return;
        setCategories([...categories, { id: newCategoryName.toLowerCase(), label: newCategoryName, rate: newCategoryRate }]);
        setNewCategoryName('');
    };

    const handleDeleteCategory = (id: string) => {
        setCategories(categories.filter(c => c.id !== id));
    };

    const handleAddAddon = () => {
        if (!newAddon.label || !newAddon.price) return;
        const addon: AddOn = {
            id: `addon-${Date.now()}`,
            label: newAddon.label,
            price: newAddon.price,
            iconKey: newAddon.iconKey || 'Wifi',
            description: newAddon.description
        };
        setPlatformAddons([...platformAddons, addon]);
        setNewAddon({ label: '', price: 0, iconKey: 'Wifi', description: '' });
    };

    const handleDeleteAddon = (id: string) => {
        setPlatformAddons(platformAddons.filter(a => a.id !== id));
    };

    const handleAddPost = () => {
        const post = {
            id: Date.now(),
            ...newPost,
            date: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }),
            author: 'Admin'
        };
        setBlogPosts([post, ...blogPosts]);
        setIsBlogModalOpen(false);
        setNewPost({ title: '', category: '', image: '', excerpt: '' });
    };

    const handleDeletePost = (id: number) => {
        setBlogPosts(blogPosts.filter(p => p.id !== id));
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* ADMIN SIDEBAR */}
            <aside className="w-64 bg-secondary-900 text-white fixed h-[calc(100vh-80px)] top-20 hidden lg:block">
                 <div className="p-6">
                     <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">Admin Panel</div>
                     <nav className="space-y-2">
                         <button onClick={() => setActiveTab('OVERVIEW')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'OVERVIEW' ? 'bg-primary-600 text-white' : 'text-gray-400 hover:bg-white/10 hover:text-white'}`}>
                             <Activity size={20}/> Cockpit
                         </button>
                         <button onClick={() => setActiveTab('CRM')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'CRM' ? 'bg-primary-600 text-white' : 'text-gray-400 hover:bg-white/10 hover:text-white'}`}>
                             <Briefcase size={20}/> Commercial (CRM)
                         </button>
                         <button onClick={() => setActiveTab('USERS')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'USERS' ? 'bg-primary-600 text-white' : 'text-gray-400 hover:bg-white/10 hover:text-white'}`}>
                             <Users size={20}/> Utilisateurs
                         </button>
                         <button onClick={() => setActiveTab('FINANCE')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'FINANCE' ? 'bg-primary-600 text-white' : 'text-gray-400 hover:bg-white/10 hover:text-white'}`}>
                             <Banknote size={20}/> Finance
                         </button>
                         <button onClick={() => setActiveTab('BLOG')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'BLOG' ? 'bg-primary-600 text-white' : 'text-gray-400 hover:bg-white/10 hover:text-white'}`}>
                             <BookOpen size={20}/> Blog & Contenu
                         </button>
                         <button onClick={() => setActiveTab('SETTINGS')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'SETTINGS' ? 'bg-primary-600 text-white' : 'text-gray-400 hover:bg-white/10 hover:text-white'}`}>
                             <Sliders size={20}/> Paramètres
                         </button>
                     </nav>
                 </div>
            </aside>

            {/* MAIN ADMIN CONTENT */}
            <main className="flex-1 lg:ml-64 p-6 lg:p-10">
                {activeTab === 'OVERVIEW' && (
                    <div className="space-y-8 animate-in fade-in">
                        {/* Server & Live Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <div className="bg-black text-green-400 p-6 rounded-2xl shadow-lg border border-gray-800 font-mono">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-xs uppercase">Server Status</span>
                                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <div className="text-xs text-gray-500 mb-1">CPU Load</div>
                                        <div className="text-2xl font-bold">{MOCK_LIVE_STATS.cpu}%</div>
                                        <div className="w-full bg-gray-800 h-1 mt-2 rounded-full overflow-hidden"><div className="bg-green-500 h-full w-[45%]"></div></div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-500 mb-1">RAM Usage</div>
                                        <div className="text-2xl font-bold">{MOCK_LIVE_STATS.ram}%</div>
                                        <div className="w-full bg-gray-800 h-1 mt-2 rounded-full overflow-hidden"><div className="bg-yellow-500 h-full w-[62%]"></div></div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Globe size={20}/></div>
                                    <span className="text-sm font-bold text-gray-500">En ligne</span>
                                </div>
                                <h3 className="text-3xl font-black text-gray-900">{MOCK_LIVE_STATS.onlineUsers}</h3>
                            </div>
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><UserIcon size={20}/></div>
                                    <span className="text-sm font-bold text-gray-500">Inscrits ajd.</span>
                                </div>
                                <h3 className="text-3xl font-black text-gray-900">{MOCK_LIVE_STATS.dailyRegistrations}</h3>
                            </div>
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 bg-green-50 text-green-600 rounded-lg"><DollarSign size={20}/></div>
                                    <span className="text-sm font-bold text-gray-500">Revenus Jour</span>
                                </div>
                                <h3 className="text-3xl font-black text-gray-900">1.2M <span className="text-sm text-gray-400">Ar</span></h3>
                            </div>
                        </div>

                        {/* COCKPIT ROW 2: INCIDENTS & LIVE FLEET */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Incident Center */}
                            <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                                        <AlertOctagon className="text-red-500" size={20}/> Centre d'Incidents
                                    </h3>
                                    <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded-full">{MOCK_INCIDENTS.length} Alertes</span>
                                </div>
                                <div className="space-y-4">
                                    {MOCK_INCIDENTS.map(inc => (
                                        <div key={inc.id} className="flex items-center justify-between p-4 bg-gray-50 border-l-4 border-red-500 rounded-r-xl">
                                            <div className="flex items-center gap-4">
                                                <div className="p-2 bg-white rounded-full shadow-sm text-red-500">
                                                    <AlertTriangle size={20}/>
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-gray-900 text-sm">{inc.type}</h4>
                                                    <p className="text-xs text-gray-500">{inc.vehicle} • {inc.user}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <span className="block text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded mb-1">{inc.severity}</span>
                                                <span className="text-[10px] text-gray-400">{inc.time}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Live Fleet Tracking */}
                            <div className="bg-secondary-900 text-white rounded-2xl shadow-lg p-6 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/20 rounded-full blur-3xl -mr-10 -mt-10 animate-pulse"></div>
                                <h3 className="font-bold text-lg mb-6 flex items-center gap-2 relative z-10">
                                    <MapPin className="text-green-400" size={20}/> Suivi Flotte Live
                                </h3>
                                <div className="space-y-4 relative z-10">
                                    {MOCK_ACTIVE_RENTALS.map(rental => (
                                        <div key={rental.id} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/10">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-2 h-2 rounded-full ${rental.status === 'WARNING' ? 'bg-red-500 animate-ping' : 'bg-green-500'}`}></div>
                                                <div>
                                                    <h4 className="font-bold text-sm">{rental.vehicle}</h4>
                                                    <p className="text-[10px] text-gray-400">{rental.location}</p>
                                                </div>
                                            </div>
                                            <span className={`text-[10px] font-bold px-2 py-1 rounded ${rental.status === 'WARNING' ? 'bg-red-500/20 text-red-300' : 'bg-green-500/20 text-green-300'}`}>
                                                {rental.returnTime}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                
                {activeTab === 'CRM' && (
                    <div className="space-y-6 animate-in fade-in h-full flex flex-col">
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">Pipeline Commercial</h2>
                                <p className="text-gray-500 text-sm">Suivi des prospects et clients en temps réel</p>
                            </div>
                            <div className="flex gap-2">
                                <button className="bg-secondary-900 text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-secondary-800 text-sm">
                                    <Target size={18}/> Nouveaux Leads (3)
                                </button>
                            </div>
                        </div>
                        <CRMPipeline />
                    </div>
                )}

                {/* ADMIN FINANCE TAB */}
                {activeTab === 'FINANCE' && (
                    <div className="space-y-8 animate-in fade-in">
                        {/* Finance Header & KPIs */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <h2 className="text-2xl font-bold text-gray-900">Comptabilité & Finance</h2>
                            <div className="flex gap-2">
                                <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-xl font-bold hover:bg-gray-50">
                                    <Download size={18}/> Exporter CSV
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                <p className="text-gray-500 text-sm font-medium mb-1">Volume d'Affaires (GMV)</p>
                                <h3 className="text-3xl font-black text-gray-900">{totalGMV.toLocaleString()} Ar</h3>
                                <div className="w-full bg-gray-100 h-1 mt-3 rounded-full overflow-hidden"><div className="bg-blue-500 h-full w-full"></div></div>
                            </div>
                            <div className="bg-secondary-900 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
                                <p className="text-gray-400 text-sm font-medium mb-1">Revenu Net (Commissions)</p>
                                <h3 className="text-3xl font-black">{totalRevenue.toLocaleString()} Ar</h3>
                                <div className="mt-4 text-xs bg-white/10 inline-block px-2 py-1 rounded text-green-300 font-bold">+18% vs Mois dernier</div>
                            </div>
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 border-l-4 border-l-orange-500">
                                <p className="text-gray-500 text-sm font-medium mb-1">À Reverser aux Propriétaires</p>
                                <h3 className="text-3xl font-black text-orange-500">{totalPayoutPending.toLocaleString()} Ar</h3>
                                <p className="text-xs text-gray-400 mt-2">{MOCK_BOOKINGS.filter(b => b.payoutStatus === 'UNPAID').length} virements en attente</p>
                            </div>
                        </div>

                        {/* Search & Filters */}
                        <div className="bg-white p-4 rounded-xl border border-gray-200 flex items-center gap-4">
                            <div className="relative flex-1">
                                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
                                <input 
                                    type="text" 
                                    placeholder="Rechercher par ID, Client ou Propriétaire..." 
                                    className="w-full pl-10 pr-4 py-2 bg-gray-50 rounded-lg outline-none focus:ring-2 focus:ring-primary-500"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <button className="flex items-center gap-2 text-gray-600 font-bold px-3 py-2 hover:bg-gray-50 rounded-lg">
                                <Filter size={18}/> Filtres
                            </button>
                        </div>

                        {/* Detailed Ledger Table */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                             <table className="w-full text-left">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr className="text-xs font-bold text-gray-500 uppercase">
                                        <th className="px-6 py-4">Réf. / Date</th>
                                        <th className="px-6 py-4">Détails Location</th>
                                        <th className="px-6 py-4">Participants</th>
                                        <th className="px-6 py-4 text-right">Total (Brut)</th>
                                        <th className="px-6 py-4 text-right text-green-600">Commission</th>
                                        <th className="px-6 py-4 text-right text-gray-400">Add-ons</th>
                                        <th className="px-6 py-4 text-right text-secondary-900">Net Proprio.</th>
                                        <th className="px-6 py-4 text-center">Statut</th>
                                        <th className="px-6 py-4 text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50 text-sm">
                                    {filteredBookings.map(bk => (
                                        <tr key={bk.id} className="hover:bg-gray-50 transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="font-mono text-xs font-bold text-primary-600 bg-primary-50 px-2 py-0.5 rounded w-fit mb-1">{bk.id}</div>
                                                <div className="text-gray-500 text-xs">{bk.date}</div>
                                                <div className="text-xs font-bold text-gray-400 mt-1">{bk.durationLabel}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="font-bold text-gray-900">{bk.vehicleName}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-xs text-gray-500">Prop: <span className="font-bold text-gray-700">{bk.ownerName}</span></span>
                                                    <span className="text-xs text-gray-500">Cli: <span className="font-bold text-gray-700">{bk.renterName}</span></span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right font-medium text-gray-500">{bk.totalAmount.toLocaleString()}</td>
                                            <td className="px-6 py-4 text-right font-bold text-green-600">+{bk.commissionAmount.toLocaleString()}</td>
                                            <td className="px-6 py-4 text-right text-xs text-gray-400">
                                                {bk.addOnRevenue > 0 ? `+${bk.addOnRevenue.toLocaleString()}` : '-'}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="font-black text-secondary-900">{bk.netPayout.toLocaleString()}</div>
                                                <div className={`text-[10px] uppercase font-bold mt-1 ${bk.payoutStatus === 'PAID' ? 'text-green-500' : 'text-orange-500'}`}>
                                                    {bk.payoutStatus === 'PAID' ? 'Viré' : 'En attente'}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${
                                                    bk.status === 'COMPLETED' ? 'bg-green-100 text-green-700' : 
                                                    bk.status === 'ONGOING' ? 'bg-blue-100 text-blue-700' :
                                                    'bg-gray-100 text-gray-600'
                                                }`}>
                                                    {bk.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <div className="flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button className="p-2 bg-white border border-gray-200 rounded-lg hover:text-primary-600 hover:border-primary-200" title="Télécharger Facture">
                                                        <Receipt size={16}/>
                                                    </button>
                                                    <button className="p-2 bg-white border border-gray-200 rounded-lg hover:text-primary-600 hover:border-primary-200" title="Imprimer">
                                                        <Printer size={16}/>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                             </table>
                        </div>
                    </div>
                )}

                {activeTab === 'USERS' && (
                     <div className="space-y-8 animate-in fade-in">
                         <div className="flex justify-between items-center">
                             <h2 className="text-2xl font-bold text-gray-900">Utilisateurs</h2>
                             <div className="flex gap-4">
                                <div className="relative">
                                    <input type="text" placeholder="Rechercher..." className="bg-white border border-gray-200 rounded-xl px-4 py-2 pl-10 text-sm focus:ring-2 focus:ring-primary-500 outline-none"/>
                                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
                                </div>
                                <button className="bg-white border border-gray-200 p-2 rounded-xl text-gray-600 hover:bg-gray-50"><Filter size={20}/></button>
                             </div>
                         </div>
                         
                         <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                             <table className="w-full text-left">
                                 <thead className="bg-gray-50 border-b border-gray-200">
                                     <tr className="text-xs font-bold text-gray-500 uppercase">
                                         <th className="px-6 py-4">Utilisateur</th>
                                         <th className="px-6 py-4">Rôle</th>
                                         <th className="px-6 py-4">Statut</th>
                                         <th className="px-6 py-4">CRM Status</th>
                                         <th className="px-6 py-4 text-center">Actions</th>
                                     </tr>
                                 </thead>
                                 <tbody className="divide-y divide-gray-50 text-sm">
                                     {MOCK_USERS_LIST.map(u => (
                                         <tr 
                                            key={u.id} 
                                            onClick={() => setSelectedUser(u)}
                                            className="hover:bg-primary-50/50 cursor-pointer transition-colors"
                                         >
                                             <td className="px-6 py-4">
                                                 <div className="flex items-center gap-3">
                                                     <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                                                         <img src={u.avatar} alt="" className="w-full h-full object-cover"/>
                                                     </div>
                                                     <div>
                                                         <div className="font-bold text-gray-900">{u.name}</div>
                                                         <div className="text-xs text-gray-500">{u.email}</div>
                                                     </div>
                                                 </div>
                                             </td>
                                             <td className="px-6 py-4">
                                                 <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${u.role === 'OWNER' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>{u.role}</span>
                                             </td>
                                             <td className="px-6 py-4">
                                                 <div className="flex items-center gap-2">
                                                     <div className={`w-2 h-2 rounded-full ${u.status === 'VERIFIED' ? 'bg-green-500' : u.status === 'SUSPENDED' ? 'bg-red-500' : 'bg-orange-500'}`}></div>
                                                     <span className="font-medium text-gray-700">{u.status}</span>
                                                 </div>
                                             </td>
                                             <td className="px-6 py-4">
                                                 <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded uppercase">{u.pipelineStage || 'LEAD'}</span>
                                             </td>
                                             <td className="px-6 py-4 text-center">
                                                 <button className="p-2 text-gray-400 hover:text-primary-600"><Eye size={18}/></button>
                                             </td>
                                         </tr>
                                     ))}
                                 </tbody>
                             </table>
                         </div>
                     </div>
                )}

                {activeTab === 'BLOG' && (
                    <div className="space-y-8 animate-in fade-in">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-bold text-gray-900">Blog & Contenu</h2>
                            <button onClick={() => setIsBlogModalOpen(true)} className="bg-secondary-900 text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-secondary-800 transition-colors">
                                <Plus size={20}/> Nouvel Article
                            </button>
                        </div>

                        <div className="grid grid-cols-1 gap-6">
                            {blogPosts.map(post => (
                                <div key={post.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-start gap-4 group">
                                    <img src={post.image} alt="" className="w-24 h-24 rounded-lg object-cover"/>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <h3 className="font-bold text-gray-900 text-lg">{post.title}</h3>
                                            <div className="flex gap-2">
                                                <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-500"><Edit size={16}/></button>
                                                <button onClick={() => handleDeletePost(post.id)} className="p-2 hover:bg-red-50 rounded-lg text-red-500"><Trash2 size={16}/></button>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 mt-1 mb-2">
                                            <span className="text-xs font-bold text-primary-600 bg-primary-50 px-2 py-0.5 rounded">{post.category}</span>
                                            <span className="text-xs text-gray-400">{post.date}</span>
                                        </div>
                                        <p className="text-sm text-gray-600 line-clamp-2">{post.excerpt}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* ADD BLOG MODAL */}
                        {isBlogModalOpen && (
                            <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4 backdrop-blur-sm">
                                <div className="bg-white rounded-2xl w-full max-w-2xl p-8 shadow-2xl">
                                    <div className="flex justify-between items-center mb-6">
                                        <h3 className="text-xl font-bold text-gray-900">Nouvel Article</h3>
                                        <button onClick={() => setIsBlogModalOpen(false)}><X className="text-gray-400 hover:text-red-500" /></button>
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-1">Titre</label>
                                            <input type="text" value={newPost.title} onChange={e => setNewPost({...newPost, title: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3"/>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-1">Catégorie</label>
                                                <input type="text" value={newPost.category} onChange={e => setNewPost({...newPost, category: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3"/>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-1">Image URL</label>
                                                <input type="text" value={newPost.image} onChange={e => setNewPost({...newPost, image: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3"/>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-1">Contenu (Extrait)</label>
                                            <textarea value={newPost.excerpt} onChange={e => setNewPost({...newPost, excerpt: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 h-24"></textarea>
                                        </div>
                                        <button onClick={handleAddPost} className="w-full bg-secondary-900 text-white font-bold py-3 rounded-xl hover:bg-secondary-800">Publier</button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'SETTINGS' && (
                    <div className="max-w-4xl space-y-8 animate-in fade-in">
                        <h2 className="text-2xl font-bold text-gray-900">Paramètres de la Plateforme</h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            
                             {/* ADD-ONS MANAGEMENT */}
                             <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 col-span-2">
                                <h3 className="font-bold text-lg mb-6 flex items-center gap-2"><ShoppingBag className="text-primary-600"/> Gestion des Extras (Add-ons)</h3>
                                
                                <div className="space-y-3 mb-6">
                                    {platformAddons.map(addon => {
                                        const Icon = ICON_MAP[addon.iconKey] || Wifi;
                                        return (
                                            <div key={addon.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-primary-600 shadow-sm">
                                                        <Icon size={20}/>
                                                    </div>
                                                    <div>
                                                        <span className="block font-bold text-gray-900">{addon.label}</span>
                                                        <span className="text-xs text-gray-500">{addon.price.toLocaleString()} Ar / jour</span>
                                                    </div>
                                                </div>
                                                <button onClick={() => handleDeleteAddon(addon.id)} className="p-2 text-gray-400 hover:bg-red-50 hover:text-red-500 rounded-lg transition-colors">
                                                    <Trash2 size={18}/>
                                                </button>
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className="pt-4 border-t border-gray-100 bg-gray-50/50 p-4 rounded-xl">
                                    <p className="text-xs font-bold text-gray-400 uppercase mb-3">Ajouter un nouvel extra</p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                        <input 
                                            type="text" 
                                            placeholder="Nom (ex: Siège Bébé)" 
                                            value={newAddon.label}
                                            onChange={e => setNewAddon({...newAddon, label: e.target.value})}
                                            className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm"
                                        />
                                        <input 
                                            type="number" 
                                            placeholder="Prix (Ar)" 
                                            value={newAddon.price || ''}
                                            onChange={e => setNewAddon({...newAddon, price: parseInt(e.target.value)})}
                                            className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm"
                                        />
                                    </div>
                                    
                                    <p className="text-xs font-bold text-gray-400 uppercase mb-2">Choisir une icône</p>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {availableIcons.map(iconKey => {
                                            const Icon = ICON_MAP[iconKey];
                                            return (
                                                <button 
                                                    key={iconKey}
                                                    onClick={() => setNewAddon({...newAddon, iconKey})}
                                                    className={`p-2 rounded-lg border transition-all ${newAddon.iconKey === iconKey ? 'bg-primary-600 text-white border-primary-600' : 'bg-white border-gray-200 text-gray-400 hover:border-primary-300'}`}
                                                >
                                                    <Icon size={18}/>
                                                </button>
                                            )
                                        })}
                                    </div>

                                    <button 
                                        onClick={handleAddAddon}
                                        disabled={!newAddon.label || !newAddon.price}
                                        className="w-full bg-secondary-900 text-white font-bold py-3 rounded-xl hover:bg-secondary-800 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Ajouter l'option
                                    </button>
                                </div>
                            </div>

                            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                                <h3 className="font-bold text-lg mb-6 flex items-center gap-2"><Percent className="text-primary-600"/> Commissions Globales</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Commission de base (%)</label>
                                        <div className="flex items-center gap-2">
                                            <input 
                                                type="number" 
                                                value={commissionBaseRate} 
                                                onChange={(e) => setCommissionBaseRate(parseInt(e.target.value))}
                                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-bold text-lg"
                                            />
                                            <span className="text-gray-500 font-bold">%</span>
                                        </div>
                                        <p className="text-xs text-gray-400 mt-2">Appliqué par défaut à toutes les nouvelles annonces.</p>
                                    </div>
                                    <div className="pt-4 border-t border-gray-50">
                                        <button className="w-full bg-secondary-900 text-white font-bold py-3 rounded-xl hover:bg-secondary-800">Sauvegarder</button>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                                <h3 className="font-bold text-lg mb-6 flex items-center gap-2"><Sliders className="text-primary-600"/> Catégories & Commissions</h3>
                                <div className="space-y-4">
                                    <div className="max-h-[300px] overflow-y-auto space-y-3 pr-2">
                                        {categories.map((cat) => (
                                            <div key={cat.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                                                <span className="text-sm font-medium text-gray-700">{cat.label}</span>
                                                <div className="flex items-center gap-3">
                                                    <div className="flex items-center gap-1">
                                                        <span className="font-bold text-gray-900">{cat.rate}</span>
                                                        <span className="text-xs text-gray-500">%</span>
                                                    </div>
                                                    <button onClick={() => handleDeleteCategory(cat.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                                                        <Trash2 size={16}/>
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    
                                    <div className="pt-4 mt-4 border-t border-gray-50">
                                        <p className="text-xs font-bold text-gray-400 uppercase mb-3">Ajouter une catégorie</p>
                                        <div className="flex gap-2">
                                            <input 
                                                type="text" 
                                                placeholder="Nom (ex: Quad)" 
                                                value={newCategoryName}
                                                onChange={e => setNewCategoryName(e.target.value)}
                                                className="flex-1 bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm"
                                            />
                                            <input 
                                                type="number" 
                                                placeholder="%" 
                                                value={newCategoryRate}
                                                onChange={e => setNewCategoryRate(parseInt(e.target.value))}
                                                className="w-16 bg-white border border-gray-200 rounded-lg px-2 py-2 text-sm font-bold text-center"
                                            />
                                            <button onClick={handleAddCategory} className="bg-primary-600 text-white p-2 rounded-lg hover:bg-primary-500">
                                                <Plus size={20}/>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
            
            {/* ADMIN MODALS */}
            {selectedUser && <AdminUserDetailModal user={selectedUser} onClose={() => setSelectedUser(null)} />}
        </div>
    );
};

const Dashboard: React.FC<{ role: UserRole }> = ({ role }) => {
  return (
    <div className="max-w-[1800px] mx-auto pt-8">
      {role === UserRole.CLIENT && (
        <div className="px-4 sm:px-6 lg:px-8">
             <ClientDashboard />
        </div>
      )}
      {role === UserRole.OWNER && <OwnerDashboard />}
      {role === UserRole.ADMIN && <AdminDashboard />}
      {role === UserRole.SUPPORT && <SupportDashboard />}
    </div>
  );
};

export default Dashboard;
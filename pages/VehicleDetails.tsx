

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, MapPin, Calendar, ShieldCheck, CheckCircle, User, ArrowLeft, Fuel, Gauge, Users, Settings, Lock, Smartphone, CreditCard, ArrowRight, Clock, Briefcase, ChevronLeft, ChevronRight, Grid, List, LayoutList, Wifi, Baby, Shield, TabletSmartphone, Milestone, Map, DollarSign, Infinity, Info, Check, CircleUser, Music, Coffee, Snowflake, BatteryCharging, ShoppingBag, Umbrella } from 'lucide-react';
import { MOCK_VEHICLES, DEFAULT_ADDONS } from '../constants';
import { DriverOption } from '../types';

// Icon Map used for dynamic rendering
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
    'TabletSmartphone': Briefcase
};

const VehicleDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const vehicle = MOCK_VEHICLES.find(v => v.id === id);

  // --- States for Booking ---
  const [step, setStep] = useState<'DETAILS' | 'PAYMENT' | 'CONFIRMATION'>('DETAILS');
  
  // Dates & Times Management
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dayAfter = new Date(tomorrow);
  dayAfter.setDate(tomorrow.getDate() + 2);

  const [pickupDate, setPickupDate] = useState(tomorrow.toISOString().split('T')[0]);
  const [pickupTime, setPickupTime] = useState('08:00');
  const [returnDate, setReturnDate] = useState(dayAfter.toISOString().split('T')[0]);
  const [returnTime, setReturnTime] = useState('18:00');

  // Calendar UI States
  const [calendarView, setCalendarView] = useState<'MONTH' | 'WEEK' | 'DAY'>('MONTH');
  const [currentCalendarDate, setCurrentCalendarDate] = useState(new Date());

  // Driver & Trip Options
  const [selectedDriverOption, setSelectedDriverOption] = useState<string>(vehicle?.driverOption === DriverOption.REQUIRED ? 'AVEC_CHAUFFEUR' : 'SANS_CHAUFFEUR');
  const [travelZone, setTravelZone] = useState<'TANA' | 'PROVINCE'>('TANA');
  
  // Add-ons State (Array of selected IDs)
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  const toggleAddon = (addonId: string) => {
      setSelectedAddons(prev => 
          prev.includes(addonId) ? prev.filter(id => id !== addonId) : [...prev, addonId]
      );
  };

  // Ensure Driver Option defaults correct based on vehicle type
  useEffect(() => {
    if (vehicle?.driverOption === DriverOption.REQUIRED) {
        setSelectedDriverOption('AVEC_CHAUFFEUR');
    } else if (vehicle?.driverOption === DriverOption.NONE) {
        setSelectedDriverOption('SANS_CHAUFFEUR');
    }
  }, [vehicle]);

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!vehicle) {
    return (
        <div className="min-h-screen flex items-center justify-center flex-col">
            <h2 className="text-2xl font-bold text-gray-900">Véhicule introuvable</h2>
            <button onClick={() => navigate('/search')} className="mt-4 text-primary-600 hover:underline">Retour aux résultats</button>
        </div>
    );
  }

  // --- Pricing Logic Engine ---
  const calculatePrice = () => {
      const start = new Date(`${pickupDate}T${pickupTime}`);
      const end = new Date(`${returnDate}T${returnTime}`);
      const diffMs = end.getTime() - start.getTime();
      const diffHours = diffMs / (1000 * 60 * 60);

      let price = 0;
      let durationLabel = "";
      let rateApplied = "";

      if (diffHours <= 0) return { price: 0, durationLabel: "Erreur dates", rateApplied: "-" };

      const isSameDay = pickupDate === returnDate;

      // Special Logic for Province: Usually 24h based rate
      if (travelZone === 'PROVINCE' && vehicle.pricingRates.provinceDay) {
          const days = Math.max(1, Math.ceil(diffHours / 24));
          price = days * vehicle.pricingRates.provinceDay;
          durationLabel = `${days} Jours (Province)`;
          rateApplied = "Tarif Province";
      } 
      // Urban Logic (Tana)
      else {
          if (diffHours <= 5 && vehicle.pricingRates.halfDay) {
              price = vehicle.pricingRates.halfDay;
              durationLabel = "Demi-journée";
              rateApplied = "Tarif réduit (4h)";
          } else if (diffHours <= 14 && isSameDay) {
              price = vehicle.pricingRates.day;
              durationLabel = "1 Journée";
              rateApplied = "Tarif Journée";
          } else {
              // 24H Logic
              const days24h = Math.ceil(diffHours / 24);
              let unitPrice = vehicle.pricingRates.twentyFourHours;
              let discount = 0;

              if (days24h >= 30) {
                  discount = vehicle.pricingRates.monthlyDiscount;
                  rateApplied = `Mensuel (-${discount}%)`;
              } else if (days24h >= 7) {
                  discount = vehicle.pricingRates.weeklyDiscount;
                  rateApplied = `Hebdo (-${discount}%)`;
              } else {
                  rateApplied = "Tarif 24h";
              }

              price = days24h * unitPrice * (1 - discount / 100);
              durationLabel = `${days24h} Jours`;
          }
      }

      return { price, durationLabel, rateApplied, durationDays: Math.max(1, Math.ceil(diffHours / 24)) };
  };

  const { price: basePrice, durationLabel, rateApplied, durationDays } = calculatePrice();

  const driverFee = (selectedDriverOption === 'OBLIGATOIRE' || selectedDriverOption === 'AVEC_CHAUFFEUR') 
    ? 40000 * durationDays 
    : 0; 
  
  // Calculate Add-ons total based on selection
  const totalAddOns = DEFAULT_ADDONS
    .filter(a => selectedAddons.includes(a.id))
    .reduce((sum, a) => sum + (a.price * durationDays), 0);
  
  const serviceFee = 5000;
  const totalPrice = basePrice + driverFee + totalAddOns + serviceFee;
  const deposit = vehicle.pricePerDay * 10;

  // --- Calendar Logic ---
  const MONTH_NAMES = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

  const handleDateClick = (dateStr: string) => {
    if (vehicle.unavailableDates?.includes(dateStr)) return;
    
    const clickedDate = new Date(dateStr);
    const currentPickup = new Date(pickupDate);
    
    if (clickedDate < currentPickup) {
        setPickupDate(dateStr);
    } else {
        setReturnDate(dateStr);
    }
  };

  const changeCalendarDate = (delta: number) => {
      const newDate = new Date(currentCalendarDate);
      if (calendarView === 'MONTH') newDate.setMonth(newDate.getMonth() + delta);
      if (calendarView === 'WEEK') newDate.setDate(newDate.getDate() + (delta * 7));
      if (calendarView === 'DAY') newDate.setDate(newDate.getDate() + delta);
      setCurrentCalendarDate(newDate);
  };

  const renderCalendar = () => {
    const today = new Date();
    const year = currentCalendarDate.getFullYear();
    const month = currentCalendarDate.getMonth();

    // VIEW: MONTH
    if (calendarView === 'MONTH') {
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 = Sun
        const startDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1; // Adjust for Mon start

        const grid = [];
        for(let i=0; i < startDay; i++) grid.push(<div key={`empty-${i}`} className="h-12 md:h-16"></div>);
        
        for(let i=1; i<=daysInMonth; i++) {
            const dateStr = `${year}-${String(month+1).padStart(2,'0')}-${String(i).padStart(2,'0')}`;
            const isUnavailable = vehicle.unavailableDates?.includes(dateStr);
            const isSelectedStart = dateStr === pickupDate;
            const isSelectedEnd = dateStr === returnDate;
            const isInRange = dateStr > pickupDate && dateStr < returnDate;
            const isPast = new Date(dateStr) < new Date(today.setHours(0,0,0,0));

            grid.push(
                <button 
                    key={i}
                    disabled={isUnavailable || isPast}
                    onClick={() => handleDateClick(dateStr)}
                    className={`h-12 md:h-16 rounded-xl flex flex-col items-center justify-center text-sm font-bold border transition-all relative group
                        ${isUnavailable || isPast ? 'bg-gray-50 text-gray-300 border-transparent cursor-not-allowed' : 
                          isSelectedStart || isSelectedEnd ? 'bg-secondary-900 text-white border-secondary-900 shadow-lg scale-105 z-10' :
                          isInRange ? 'bg-primary-50 text-primary-700 border-primary-100' :
                          'bg-white border-gray-100 text-gray-700 hover:border-primary-400 hover:shadow-md'}
                    `}
                >
                    {i}
                    {isUnavailable && <span className="absolute bottom-1 w-1 h-1 bg-red-400 rounded-full"></span>}
                    {(isSelectedStart || isSelectedEnd) && <span className="text-[8px] font-normal uppercase mt-1">{isSelectedStart ? 'Départ' : 'Retour'}</span>}
                </button>
            );
        }
        return (
            <div className="animate-in fade-in duration-300">
                <div className="grid grid-cols-7 gap-2 mb-2">
                    {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map(d => <div key={d} className="text-center text-xs font-bold text-gray-400 uppercase tracking-wider">{d}</div>)}
                </div>
                <div className="grid grid-cols-7 gap-2">
                    {grid}
                </div>
            </div>
        );
    }
     // VIEW: WEEK
    if (calendarView === 'WEEK') {
        const startOfWeek = new Date(currentCalendarDate);
        const day = startOfWeek.getDay();
        const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1);
        startOfWeek.setDate(diff);

        const days = [];
        for (let i = 0; i < 7; i++) {
            const d = new Date(startOfWeek);
            d.setDate(startOfWeek.getDate() + i);
            const dateStr = d.toISOString().split('T')[0];
            const isUnavailable = vehicle.unavailableDates?.includes(dateStr);
            const isSelectedStart = dateStr === pickupDate;
            const isSelectedEnd = dateStr === returnDate;
            const isInRange = dateStr > pickupDate && dateStr < returnDate;

            days.push(
                <button 
                    key={i}
                    disabled={isUnavailable}
                    onClick={() => handleDateClick(dateStr)}
                    className={`flex-1 py-4 px-2 rounded-2xl flex flex-col items-center justify-between min-h-[120px] transition-all border
                        ${isUnavailable ? 'bg-gray-50 border-gray-100 opacity-50' : 
                          isSelectedStart || isSelectedEnd ? 'bg-secondary-900 text-white border-secondary-900 shadow-lg scale-105' :
                          isInRange ? 'bg-primary-50 border-primary-200 text-primary-800' :
                          'bg-white border-gray-200 hover:border-primary-500 hover:shadow-md'}
                    `}
                >
                    <span className="text-xs uppercase font-bold opacity-70">{['Dim','Lun','Mar','Mer','Jeu','Ven','Sam'][d.getDay()]}</span>
                    <span className="text-2xl font-black my-2">{d.getDate()}</span>
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase ${isUnavailable ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-700'}`}>
                        {isUnavailable ? 'Indispo' : 'Libre'}
                    </span>
                </button>
            );
        }
        return <div className="flex gap-2 md:gap-4 overflow-x-auto pb-4 pt-2 animate-in slide-in-from-right-4 duration-300">{days}</div>;
    }

    // VIEW: DAY
    if (calendarView === 'DAY') {
        const hours = [];
        const dateStr = currentCalendarDate.toISOString().split('T')[0];
        const isUnavailableDay = vehicle.unavailableDates?.includes(dateStr);

        for (let h = 7; h <= 20; h++) {
            const timeLabel = `${h}:00`;
            const isBooked = isUnavailableDay; 
            
            hours.push(
                <div key={h} className="flex items-center gap-4 py-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 px-2 rounded-lg transition-colors">
                    <span className="text-sm font-bold text-gray-500 w-12 text-right">{timeLabel}</span>
                    <div className={`flex-1 h-3 rounded-full relative ${isBooked ? 'bg-gray-200' : 'bg-green-100'}`}>
                        <div className={`absolute inset-y-0 left-0 rounded-full ${isBooked ? 'bg-red-400 w-full' : 'bg-green-400 w-full opacity-30'}`}></div>
                    </div>
                    <span className={`text-xs font-bold uppercase ${isBooked ? 'text-red-500' : 'text-green-600'}`}>
                        {isBooked ? 'Occupé' : 'Disponible'}
                    </span>
                </div>
            );
        }
        return <div className="space-y-1 bg-white rounded-xl border border-gray-100 p-4 max-h-[400px] overflow-y-auto custom-scrollbar animate-in slide-in-from-bottom-4 duration-300">{hours}</div>;
    }
  };

  if (step === 'CONFIRMATION') {
      return (
          <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
              <div className="bg-white p-10 rounded-[2rem] shadow-2xl max-w-lg w-full text-center animate-in zoom-in duration-500 border border-gray-100">
                  <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner ring-8 ring-green-50/50">
                      <CheckCircle size={48} strokeWidth={3} />
                  </div>
                  <h2 className="text-3xl font-extrabold text-secondary-900 mb-3">C'est tout bon !</h2>
                  <p className="text-gray-500 mb-8 leading-relaxed">
                      Votre demande pour le <strong>{vehicle.title}</strong> a été envoyée. Le propriétaire {vehicle.ownerName || 'Andry'} va la valider sous 24h.
                  </p>
                  
                  <div className="bg-gray-50 rounded-2xl p-6 mb-8 text-left space-y-4 border border-gray-200">
                      <div className="flex justify-between items-center">
                          <span className="text-gray-500 text-sm font-medium">Acompte bloqué</span>
                          <span className="font-bold text-gray-900 text-lg">{(totalPrice * 0.3).toLocaleString()} Ar</span>
                      </div>
                      <div className="flex justify-between items-center">
                          <span className="text-gray-500 text-sm font-medium">Reste à payer (Check-in)</span>
                          <span className="font-bold text-gray-900">{(totalPrice * 0.7).toLocaleString()} Ar</span>
                      </div>
                      <div className="flex justify-between pt-4 border-t border-gray-200 mt-2">
                          <span className="text-gray-500 text-xs uppercase font-bold tracking-wider">Réf. Dossier</span>
                          <span className="font-mono text-primary-600 font-bold tracking-wider bg-primary-50 px-2 py-1 rounded">#MC-{Math.floor(Math.random()*10000)}</span>
                      </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                      <button onClick={() => navigate('/dashboard')} className="flex-1 bg-white border-2 border-gray-200 text-gray-700 font-bold py-4 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-colors">
                          Suivre ma demande
                      </button>
                      <button onClick={() => navigate('/')} className="flex-1 bg-secondary-900 text-white font-bold py-4 rounded-xl hover:bg-secondary-800 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                          Retour Accueil
                      </button>
                  </div>
              </div>
          </div>
      );
  }

  if (step === 'PAYMENT') {
      return (
          <div className="min-h-screen bg-gray-50 py-12 px-4 font-sans">
              <div className="max-w-4xl mx-auto">
                  <button onClick={() => setStep('DETAILS')} className="flex items-center text-gray-500 hover:text-secondary-900 mb-8 font-bold transition-colors group">
                      <div className="bg-white p-2 rounded-full shadow-sm mr-3 group-hover:scale-110 transition-transform"><ArrowLeft size={18}/></div>
                      Retour à la configuration
                  </button>
                  
                  <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-gray-100">
                      {/* Recap Left */}
                      <div className="md:w-5/12 bg-gray-50/80 backdrop-blur-sm p-8 border-r border-gray-100 flex flex-col relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -mr-32 -mt-32"></div>
                          
                          <h3 className="font-bold text-gray-900 mb-6 text-xl relative z-10">Récapitulatif</h3>
                          <div className="rounded-2xl overflow-hidden mb-6 shadow-md border border-white relative z-10">
                              <img src={vehicle.image} alt="" className="w-full h-40 object-cover transform hover:scale-110 transition-transform duration-700"/>
                          </div>
                          
                          <div className="relative z-10">
                            <h4 className="font-black text-gray-900 text-xl mb-1">{vehicle.title}</h4>
                            <p className="text-sm text-gray-500 mb-6 flex items-center gap-1 font-medium"><MapPin size={14} className="text-primary-500"/> {vehicle.location}</p>
                            
                            <div className="space-y-4 text-sm flex-1 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                                <div className="flex justify-between text-gray-600">
                                    <span>Durée</span>
                                    <span className="font-bold text-gray-900 bg-gray-100 px-2 py-0.5 rounded">{durationLabel}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Zone</span>
                                    <span className={`font-bold px-2 py-0.5 rounded ${travelZone === 'PROVINCE' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-900'}`}>{travelZone === 'PROVINCE' ? 'Province' : 'Urbain'}</span>
                                </div>
                                <div className="flex justify-between text-gray-600 border-b border-dashed border-gray-200 pb-2">
                                    <span>Dates</span>
                                    <div className="text-right">
                                        <div className="font-bold text-gray-900">{pickupDate}</div>
                                        <div className="font-bold text-gray-900">{returnDate}</div>
                                    </div>
                                </div>
                                <div className="flex justify-between items-end pt-2">
                                    <span className="text-gray-500 font-medium">Total Estimé</span>
                                    <span className="font-black text-2xl text-secondary-900">{totalPrice.toLocaleString()} Ar</span>
                                </div>
                            </div>
                          </div>
                      </div>

                      {/* Payment Form Right */}
                      <div className="md:w-7/12 p-8 md:p-10">
                          <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-black text-secondary-900">Paiement Sécurisé</h2>
                            <Lock size={20} className="text-green-500"/>
                          </div>
                          
                          {/* Payment Methods */}
                          <div className="flex gap-4 mb-8">
                              <button className="flex-1 py-4 px-4 border-2 border-primary-600 bg-primary-50 text-primary-700 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-sm">
                                  <Smartphone size={20}/> Mobile Money
                              </button>
                              <button className="flex-1 py-4 px-4 border-2 border-transparent bg-gray-50 text-gray-500 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-gray-100 transition-all">
                                  <CreditCard size={20}/> Carte Bancaire
                              </button>
                          </div>

                          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setStep('CONFIRMATION'); }}>
                              <div className="space-y-4">
                                  <label className="flex items-center gap-4 p-4 border-2 border-gray-100 rounded-2xl cursor-pointer hover:border-primary-500 hover:bg-primary-50/10 transition-all group relative overflow-hidden">
                                      <div className="absolute inset-0 bg-primary-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                      <input type="radio" name="provider" className="w-5 h-5 accent-primary-600 relative z-10" defaultChecked/>
                                      <div className="flex-1 font-bold text-gray-800 group-hover:text-primary-900 relative z-10">MVola</div>
                                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Mvola_logo.png/640px-Mvola_logo.png" className="h-8 object-contain relative z-10" alt="Mvola"/>
                                  </label>
                                  <label className="flex items-center gap-4 p-4 border-2 border-gray-100 rounded-2xl cursor-pointer hover:border-primary-500 hover:bg-primary-50/10 transition-all group relative overflow-hidden">
                                      <div className="absolute inset-0 bg-primary-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                      <input type="radio" name="provider" className="w-5 h-5 accent-primary-600 relative z-10"/>
                                      <div className="flex-1 font-bold text-gray-800 group-hover:text-primary-900 relative z-10">Orange Money</div>
                                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Orange_Money_logo.png/800px-Orange_Money_logo.png" className="h-8 object-contain relative z-10" alt="Orange Money"/>
                                  </label>
                              </div>

                              <div className="space-y-2 mt-6">
                                  <label className="font-bold text-gray-700 text-xs uppercase tracking-wider ml-1">Numéro de mobile</label>
                                  <input type="tel" placeholder="034 00 000 00" className="w-full bg-gray-50 border-2 border-transparent focus:border-primary-500 focus:bg-white rounded-xl p-4 font-bold text-lg outline-none transition-all placeholder-gray-300"/>
                              </div>

                              <div className="pt-4">
                                <button type="submit" className="w-full bg-gradient-to-r from-secondary-900 to-secondary-800 text-white font-bold py-5 rounded-2xl text-lg hover:shadow-lg hover:shadow-secondary-900/30 transition-all flex items-center justify-center gap-3 transform active:scale-[0.98]">
                                    <span>Payer l'acompte</span>
                                    <span className="bg-white/20 px-2 py-0.5 rounded text-sm">{(totalPrice * 0.3).toLocaleString()} Ar</span>
                                    <ArrowRight size={20}/>
                                </button>
                                <p className="text-center text-xs text-gray-400 mt-4 flex items-center justify-center gap-1">
                                    <ShieldCheck size={12}/> Transaction cryptée SSL et sécurisée
                                </p>
                              </div>
                          </form>
                      </div>
                  </div>
              </div>
          </div>
      );
  }

  // --- MAIN DETAILS VIEW ---
  return (
    <div className="bg-gray-50 min-h-screen pb-20 font-sans">
      
      {/* Immersive Header Image */}
      <div className="relative h-[65vh] w-full bg-secondary-900 overflow-hidden">
          <img src={vehicle.image} alt={vehicle.title} className="w-full h-full object-cover opacity-90 scale-105 animate-in fade-in duration-1000" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-gray-50"></div>
          
          <div className="absolute top-6 left-6 z-20">
              <button onClick={() => navigate('/search')} className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white px-4 py-3 rounded-full transition-all group flex items-center gap-2 border border-white/10">
                  <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform"/> <span className="font-bold text-sm">Retour</span>
              </button>
          </div>

          <div className="absolute bottom-0 left-0 right-0 pt-32 pb-12 px-4 sm:px-8 max-w-[1800px] mx-auto">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                        <span className="bg-primary-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider shadow-lg shadow-primary-900/20">{vehicle.type}</span>
                        {vehicle.isCertified && <span className="bg-blue-500/20 text-secondary-900 border border-blue-500/30 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-bold uppercase flex items-center gap-1"><ShieldCheck size={14}/> Véhicule Certifié</span>}
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-secondary-900 mb-4 tracking-tight drop-shadow-sm">{vehicle.title}</h1>
                    <div className="flex flex-wrap items-center gap-6 text-gray-600 text-sm font-bold bg-white/60 backdrop-blur-md px-6 py-3 rounded-2xl inline-flex border border-white/40 shadow-sm">
                        <span className="flex items-center gap-2"><MapPin size={18} className="text-primary-600"/> {vehicle.location}</span>
                        <div className="w-px h-4 bg-gray-300"></div>
                        <span className="flex items-center gap-2"><Star size={18} className="text-yellow-400" fill="currentColor"/> {vehicle.rating} <span className="text-gray-400 font-normal">(24 avis)</span></span>
                        <div className="w-px h-4 bg-gray-300"></div>
                        <span className="flex items-center gap-2"><Briefcase size={18} className="text-blue-500"/> {vehicle.trips} voyages</span>
                    </div>
                </div>
                
                <div className="hidden md:block">
                     <div className="text-right">
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Prix par jour</p>
                        <p className="text-5xl font-black text-secondary-900">{vehicle.pricePerDay.toLocaleString('fr-FR')} <span className="text-lg text-gray-500 font-bold">Ar</span></p>
                     </div>
                </div>
              </div>
          </div>
      </div>

      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
          <div className="flex flex-col lg:flex-row gap-8 xl:gap-12">
              
              {/* LEFT COLUMN: INFO & CALENDAR */}
              <div className="lg:w-2/3 space-y-8">
                  
                  {/* Detailed Resume & Info Section */}
                  <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-gray-200/50 border border-gray-100">
                      <h3 className="font-bold text-xl text-secondary-900 mb-6 flex items-center gap-3">
                          <span className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600"><Info size={20}/></span> Informations Véhicule
                      </h3>

                      {/* Owner Mini Profile */}
                      <div className="flex items-center gap-4 mb-8 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                           <div className="w-16 h-16 rounded-full bg-white border-2 border-white shadow-sm overflow-hidden">
                               <CircleUser className="w-full h-full text-gray-300" />
                           </div>
                           <div>
                               <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Propriétaire</p>
                               <p className="font-bold text-gray-900 text-lg">{vehicle.ownerName || 'Propriétaire Mcar'}</p>
                               <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                                   <span className="flex items-center gap-1 text-yellow-500 font-bold"><Star size={12} fill="currentColor"/> 4.8</span>
                                   <span>•</span>
                                   <span>Membre depuis 2023</span>
                               </div>
                           </div>
                      </div>
                      
                      {/* Synthesized Description */}
                      <div className="mb-8">
                          <h4 className="font-bold text-gray-900 mb-3">À propos de ce véhicule</h4>
                          <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                              Découvrez ce superbe <strong>{vehicle.title}</strong>, idéal pour vos déplacements à {vehicle.location}. 
                              {vehicle.type === 'Voiture' && " Ce véhicule offre un confort optimal pour la ville comme pour la route."}
                              {vehicle.type === 'Camion' && " Un utilitaire robuste, parfait pour le transport de marchandises ou les déménagements."}
                              {vehicle.type === 'Scooter' && " Faufilez-vous partout avec ce deux-roues économique et pratique."}
                              {vehicle.features.includes('4x4') && " Grâce à ses capacités 4x4, affrontez les pistes de Madagascar en toute sérénité."}
                              <br/><br/>
                              Le véhicule est régulièrement entretenu et inspecté par nos équipes pour garantir votre sécurité.
                              {vehicle.unlimitedMileage && " Profitez du kilométrage illimité pour explorer l'île sans compter !"}
                          </p>
                      </div>

                      {/* Tech Specs Grid */}
                      <div className="mb-8">
                          <h4 className="font-bold text-gray-900 mb-4">Fiche Technique</h4>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="p-4 bg-gray-50 rounded-xl border border-transparent hover:border-gray-200 transition-colors">
                                    <span className="block text-xs text-gray-400 uppercase font-bold mb-1">Boîte</span>
                                    <span className="font-bold text-gray-900">{vehicle.features.includes('Automatique') ? 'Automatique' : 'Manuelle'}</span>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-xl border border-transparent hover:border-gray-200 transition-colors">
                                    <span className="block text-xs text-gray-400 uppercase font-bold mb-1">Carburant</span>
                                    <span className="font-bold text-gray-900">{vehicle.features.includes('Diesel') ? 'Diesel' : 'Essence'}</span>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-xl border border-transparent hover:border-gray-200 transition-colors">
                                    <span className="block text-xs text-gray-400 uppercase font-bold mb-1">Places</span>
                                    <span className="font-bold text-gray-900">{vehicle.type === 'Scooter' ? '2' : vehicle.features.includes('7 places') ? '7' : '5'}</span>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-xl border border-transparent hover:border-gray-200 transition-colors">
                                    <span className="block text-xs text-gray-400 uppercase font-bold mb-1">Climatisation</span>
                                    <span className="font-bold text-gray-900">{vehicle.features.includes('Clim') || vehicle.features.includes('Climatisation') ? 'Oui' : 'Non'}</span>
                                </div>
                          </div>
                      </div>

                      {/* Full Features List */}
                      <div>
                          <h4 className="font-bold text-gray-900 mb-4">Équipements Inclus</h4>
                          <div className="flex flex-wrap gap-2">
                              {vehicle.features.map((feature, idx) => (
                                  <span key={idx} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-gray-200 text-sm font-medium text-gray-700 shadow-sm">
                                      <Check size={14} className="text-green-500"/> {feature}
                                  </span>
                              ))}
                              {vehicle.unlimitedMileage && (
                                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-100 text-sm font-medium text-blue-700 shadow-sm">
                                      <Check size={14} className="text-blue-500"/> Km Illimité
                                  </span>
                              )}
                          </div>
                      </div>
                  </div>

                   {/* New Conditions Section (Mileage) */}
                   <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-gray-200/50 border border-gray-100">
                      <h3 className="font-bold text-xl text-secondary-900 mb-6 flex items-center gap-3">
                          <span className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600"><Milestone size={20}/></span> Conditions de Location
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
                               <div className="p-3 bg-white rounded-lg shadow-sm text-gray-600">
                                   {vehicle.unlimitedMileage ? <Infinity size={24} className="text-blue-500"/> : <Gauge size={24}/>}
                               </div>
                               <div>
                                   <span className="block text-sm font-bold text-gray-900">Forfait Kilométrique</span>
                                   <span className="text-xs text-gray-500">
                                       {vehicle.unlimitedMileage ? <span className="text-blue-600 font-bold">Kilométrage illimité</span> : `${vehicle.mileageLimit || 200} km inclus / jour`}
                                   </span>
                               </div>
                           </div>
                           {!vehicle.unlimitedMileage && vehicle.mileageLimit && (
                               <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
                                   <div className="p-3 bg-white rounded-lg shadow-sm text-gray-600"><DollarSign size={24}/></div>
                                   <div>
                                       <span className="block text-sm font-bold text-gray-900">Km Supplémentaire</span>
                                       <span className="text-xs text-gray-500">Facturé {vehicle.extraKmPrice?.toLocaleString()} Ar / km</span>
                                   </div>
                               </div>
                           )}
                      </div>
                  </div>

                  {/* PRO CALENDAR WIDGET */}
                  <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                          <div>
                            <h3 className="font-bold text-xl text-secondary-900 flex items-center gap-3">
                                <span className="w-10 h-10 bg-primary-50 rounded-full flex items-center justify-center text-primary-600"><Calendar size={20}/></span> 
                                Disponibilités
                            </h3>
                            <p className="text-gray-500 text-sm mt-2 ml-14">Sélectionnez vos dates directement dans le calendrier.</p>
                          </div>

                          {/* View Switcher & Month Nav */}
                          <div className="flex flex-col sm:flex-row items-center gap-4 bg-gray-50 p-1.5 rounded-2xl w-full md:w-auto">
                              <div className="flex bg-white rounded-xl shadow-sm p-1">
                                  <button onClick={() => setCalendarView('DAY')} className={`p-2 rounded-lg transition-all ${calendarView === 'DAY' ? 'bg-secondary-900 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`} title="Jour"><LayoutList size={18}/></button>
                                  <button onClick={() => setCalendarView('WEEK')} className={`p-2 rounded-lg transition-all ${calendarView === 'WEEK' ? 'bg-secondary-900 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`} title="Semaine"><List size={18}/></button>
                                  <button onClick={() => setCalendarView('MONTH')} className={`p-2 rounded-lg transition-all ${calendarView === 'MONTH' ? 'bg-secondary-900 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`} title="Mois"><Grid size={18}/></button>
                              </div>
                              <div className="h-6 w-px bg-gray-200 hidden sm:block"></div>
                              <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
                                  <button onClick={() => changeCalendarDate(-1)} className="p-2 hover:bg-white rounded-xl transition-colors text-gray-600"><ChevronLeft size={20}/></button>
                                  <span className="font-bold text-sm min-w-[100px] text-center text-gray-800">
                                      {calendarView === 'MONTH' && `${MONTH_NAMES[currentCalendarDate.getMonth()]} ${currentCalendarDate.getFullYear()}`}
                                      {calendarView !== 'MONTH' && currentCalendarDate.toLocaleDateString('fr-FR')}
                                  </span>
                                  <button onClick={() => changeCalendarDate(1)} className="p-2 hover:bg-white rounded-xl transition-colors text-gray-600"><ChevronRight size={20}/></button>
                              </div>
                          </div>
                      </div>
                      
                      {/* Calendar Body */}
                      <div className="bg-gray-50/50 rounded-3xl p-4 md:p-6 border border-gray-100 min-h-[300px]">
                          {renderCalendar()}
                      </div>

                      <div className="flex items-center gap-6 mt-6 ml-4 text-sm font-medium text-gray-500">
                          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-white border border-gray-300"></div> Disponible</div>
                          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-secondary-900"></div> Sélectionné</div>
                          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-gray-200"></div> Indisponible</div>
                      </div>
                  </div>

                   {/* Reviews Preview */}
                  <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-gray-200/50 border border-gray-100">
                      <div className="flex justify-between items-center mb-8">
                          <h3 className="font-bold text-xl text-secondary-900">Avis récents</h3>
                          <span className="text-sm font-bold text-primary-600 hover:underline cursor-pointer bg-primary-50 px-3 py-1.5 rounded-lg">Voir les 24 avis</span>
                      </div>
                      <div className="grid md:grid-cols-2 gap-6">
                          {[1, 2].map(i => (
                              <div key={i} className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                                  <div className="flex items-center gap-3 mb-4">
                                      <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden flex-shrink-0 border-2 border-white shadow-sm">
                                          <img src={`https://i.pravatar.cc/150?img=${i+10}`} alt="User" />
                                      </div>
                                      <div>
                                          <h5 className="font-bold text-gray-900 text-sm">Jean Dupont</h5>
                                          <div className="flex text-yellow-400 text-[10px]"><Star size={10} fill="currentColor"/><Star size={10} fill="currentColor"/><Star size={10} fill="currentColor"/><Star size={10} fill="currentColor"/><Star size={10} fill="currentColor"/></div>
                                      </div>
                                  </div>
                                  <p className="text-gray-600 text-sm leading-relaxed italic">"Super véhicule, propriétaire très arrangeant. Je recommande pour la route du sud ! Confort au top."</p>
                              </div>
                          ))}
                      </div>
                  </div>
              </div>

              {/* RIGHT COLUMN: BOOKING WIDGET (Sticky) */}
              <div className="lg:w-1/3 relative z-30">
                  <div className="bg-white rounded-[2rem] shadow-2xl border border-gray-100 p-6 md:p-8 sticky top-24 transform transition-all">
                      
                      <div className="flex justify-between items-center mb-6">
                           <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">Total estimé</span>
                           <span className="text-3xl font-black text-secondary-900">{totalPrice.toLocaleString()} <span className="text-sm font-bold text-gray-400">Ar</span></span>
                      </div>

                      {/* Config Form */}
                      <div className="space-y-6">
                          
                          {/* Travel Zone Selector */}
                          <div>
                              <label className="text-xs font-bold text-gray-400 uppercase mb-3 block">Zone de déplacement</label>
                              <div className="grid grid-cols-2 gap-2 p-1 bg-gray-100 rounded-xl">
                                  <button 
                                    onClick={() => setTravelZone('TANA')}
                                    className={`py-2 px-3 rounded-lg text-xs font-bold transition-all ${travelZone === 'TANA' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:bg-gray-200'}`}
                                  >
                                      Urbain / Tana
                                  </button>
                                  <button 
                                    onClick={() => setTravelZone('PROVINCE')}
                                    className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 ${travelZone === 'PROVINCE' ? 'bg-purple-600 text-white shadow-sm' : 'text-gray-500 hover:bg-gray-200'}`}
                                  >
                                      <Map size={12}/> Province
                                  </button>
                              </div>
                              {travelZone === 'PROVINCE' && (
                                  <div className="mt-2 text-[10px] text-purple-600 bg-purple-50 p-2 rounded-lg flex items-center gap-2">
                                      <Milestone size={12}/>
                                      Tarif spécial appliqué pour les longs trajets.
                                  </div>
                              )}
                          </div>

                          {/* Dates Picker - Visual Box */}
                          <div className="bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden">
                              <div className="grid grid-cols-2 border-b border-gray-200">
                                  <div className="p-4 border-r border-gray-200 hover:bg-white transition-colors cursor-pointer group">
                                      <label className="text-[10px] font-bold text-gray-400 uppercase block mb-1">Départ</label>
                                      <input type="date" value={pickupDate} onChange={e => setPickupDate(e.target.value)} className="bg-transparent font-bold text-gray-900 w-full outline-none text-sm cursor-pointer group-hover:text-primary-600"/>
                                  </div>
                                  <div className="p-4 hover:bg-white transition-colors cursor-pointer group">
                                      <label className="text-[10px] font-bold text-gray-400 uppercase block mb-1">Retour</label>
                                      <input type="date" value={returnDate} onChange={e => setReturnDate(e.target.value)} className="bg-transparent font-bold text-gray-900 w-full outline-none text-sm cursor-pointer group-hover:text-primary-600"/>
                                  </div>
                              </div>
                              <div className="grid grid-cols-2 bg-white">
                                   <div className="p-3 border-r border-gray-200">
                                       <input type="time" value={pickupTime} onChange={e => setPickupTime(e.target.value)} className="bg-transparent font-bold text-gray-700 w-full outline-none text-xs text-center"/>
                                   </div>
                                   <div className="p-3">
                                       <input type="time" value={returnTime} onChange={e => setReturnTime(e.target.value)} className="bg-transparent font-bold text-gray-700 w-full outline-none text-xs text-center"/>
                                   </div>
                              </div>
                          </div>
                          
                          {/* Duration Badge */}
                          <div className="flex justify-between items-center bg-blue-50 text-blue-900 px-4 py-3 rounded-xl text-xs font-bold border border-blue-100">
                                <span>Durée: {durationLabel}</span>
                                <span className="bg-white px-2 py-0.5 rounded shadow-sm text-blue-600">{rateApplied}</span>
                          </div>

                          {/* Driver Selector */}
                          <div>
                              <label className="text-xs font-bold text-gray-400 uppercase mb-3 block">Option Chauffeur</label>
                              <div className="grid grid-cols-2 gap-3">
                                  {vehicle.driverOption !== DriverOption.REQUIRED && (
                                     <button 
                                        onClick={() => setSelectedDriverOption('SANS_CHAUFFEUR')}
                                        className={`p-3 rounded-xl border-2 text-left transition-all ${selectedDriverOption === 'SANS_CHAUFFEUR' ? 'border-secondary-900 bg-secondary-900 text-white shadow-lg' : 'border-gray-100 bg-white text-gray-500 hover:border-gray-300'}`}
                                     >
                                        <div className="font-bold text-sm mb-1">Je conduis</div>
                                        <div className={`text-[10px] ${selectedDriverOption === 'SANS_CHAUFFEUR' ? 'text-gray-300' : 'text-gray-400'}`}>Inclus</div>
                                     </button>
                                  )}
                                  
                                  <button 
                                        onClick={() => setSelectedDriverOption('AVEC_CHAUFFEUR')}
                                        disabled={vehicle.driverOption === DriverOption.REQUIRED}
                                        className={`p-3 rounded-xl border-2 text-left transition-all ${selectedDriverOption === 'AVEC_CHAUFFEUR' || vehicle.driverOption === DriverOption.REQUIRED ? 'border-primary-600 bg-primary-600 text-white shadow-lg shadow-primary-500/30' : 'border-gray-100 bg-white text-gray-500 hover:border-gray-300'}`}
                                     >
                                        <div className="font-bold text-sm mb-1">Chauffeur Pro</div>
                                        <div className={`text-[10px] ${selectedDriverOption === 'AVEC_CHAUFFEUR' || vehicle.driverOption === DriverOption.REQUIRED ? 'text-primary-100' : 'text-gray-400'}`}>+40k Ar/j</div>
                                     </button>
                              </div>
                          </div>

                          {/* Add-ons Toggles */}
                          <div>
                              <label className="text-xs font-bold text-gray-400 uppercase mb-3 block">Options Extra</label>
                              <div className="space-y-3">
                                  {DEFAULT_ADDONS.map(addon => {
                                      const Icon = ICON_MAP[addon.iconKey] || Wifi;
                                      const isSelected = selectedAddons.includes(addon.id);
                                      return (
                                          <div key={addon.id} onClick={() => toggleAddon(addon.id)} className={`flex justify-between items-center p-3 rounded-xl border cursor-pointer transition-all ${isSelected ? 'border-green-500 bg-green-50 shadow-sm' : 'border-gray-100 hover:bg-gray-50'}`}>
                                              <div className="flex items-center gap-3">
                                                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${isSelected ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-400'}`}>
                                                      <Icon size={16}/>
                                                  </div>
                                                  <div>
                                                    <span className={`text-sm font-bold block ${isSelected ? 'text-green-900' : 'text-gray-600'}`}>{addon.label}</span>
                                                    {addon.description && <span className="text-[10px] text-gray-400 hidden sm:block">{addon.description}</span>}
                                                  </div>
                                              </div>
                                              <span className={`text-xs font-bold ${isSelected ? 'text-green-700' : 'text-gray-400'}`}>+{addon.price.toLocaleString()} Ar/j</span>
                                          </div>
                                      );
                                  })}
                              </div>
                          </div>
                      </div>

                      {/* Summary Lines */}
                      <div className="mt-8 pt-6 border-t border-dashed border-gray-200 space-y-2">
                          <div className="flex justify-between text-xs text-gray-500">
                              <span>Location ({durationLabel})</span>
                              <span>{basePrice.toLocaleString()} Ar</span>
                          </div>
                          {driverFee > 0 && <div className="flex justify-between text-xs text-gray-500"><span>Chauffeur</span><span>{driverFee.toLocaleString()} Ar</span></div>}
                          {totalAddOns > 0 && <div className="flex justify-between text-xs text-gray-500"><span>Options</span><span>{totalAddOns.toLocaleString()} Ar</span></div>}
                          <div className="flex justify-between text-xs text-gray-500"><span>Frais service</span><span>{serviceFee.toLocaleString()} Ar</span></div>
                      </div>

                      {/* Action Button */}
                      <button 
                          onClick={() => setStep('PAYMENT')}
                          disabled={basePrice <= 0}
                          className="w-full bg-secondary-900 text-white font-bold py-5 rounded-2xl mt-6 hover:bg-secondary-800 transition-all shadow-xl hover:shadow-2xl hover:shadow-secondary-900/20 transform hover:-translate-y-1 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group"
                      >
                          Réserver maintenant <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform"/>
                      </button>
                      <p className="text-center text-[10px] text-gray-400 mt-4 flex items-center justify-center gap-1">
                          <ShieldCheck size={12}/> Caution de {deposit.toLocaleString()} Ar (non débitée)
                      </p>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
};

export default VehicleDetails;
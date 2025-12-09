
import React, { useState } from 'react';
import { Filter, ChevronDown, Map, Car, X, Check, SlidersHorizontal } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import VehicleCard from '../components/VehicleCard';
import { MOCK_VEHICLES, CITIES } from '../constants';
import { VehicleType } from '../types';

const Search: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialCity = searchParams.get('city');

  // Validate if initialCity is in CITIES list, otherwise default to All
  const defaultCity = initialCity && CITIES.includes(initialCity) ? initialCity : 'All';

  const [selectedCity, setSelectedCity] = useState(defaultCity);
  const [selectedTypes, setSelectedTypes] = useState<VehicleType[]>([]);
  const [priceRange, setPriceRange] = useState<number>(500000);
  const [showFilters, setShowFilters] = useState(false); // Mobile toggle

  const toggleType = (type: VehicleType) => {
    setSelectedTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const filteredVehicles = MOCK_VEHICLES.filter(v => {
    const cityMatch = selectedCity === 'All' || v.location === selectedCity;
    const typeMatch = selectedTypes.length === 0 || selectedTypes.includes(v.type);
    const priceMatch = v.pricePerDay <= priceRange;
    return cityMatch && typeMatch && priceMatch;
  });

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Trouvez votre véhicule</h1>
                <p className="text-gray-500 mt-2">Plus de 150 véhicules disponibles à travers Madagascar.</p>
            </div>
            <button 
                className="md:hidden flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-lg font-semibold text-gray-700"
                onClick={() => setShowFilters(!showFilters)}
            >
                <Filter size={18}/> Filtres
            </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
            
            {/* Filters Sidebar (Sticky on Desktop) */}
            <aside className={`lg:w-1/4 w-full bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24 self-start ${showFilters ? 'block' : 'hidden lg:block'}`}>
                <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                        <SlidersHorizontal size={20}/> Filtres
                    </h3>
                    {(selectedCity !== 'All' || selectedTypes.length > 0) && (
                        <button 
                            onClick={() => {setSelectedCity('All'); setSelectedTypes([]); setPriceRange(500000);}}
                            className="text-xs text-primary-600 font-semibold hover:text-primary-800"
                        >
                            Réinitialiser
                        </button>
                    )}
                </div>

                {/* City Filter */}
                <div className="mb-8">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 block">Ville de départ</label>
                    <div className="relative">
                        <select 
                            className="w-full appearance-none bg-gray-50 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded-xl leading-tight focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent font-medium"
                            value={selectedCity}
                            onChange={(e) => setSelectedCity(e.target.value)}
                        >
                            <option value="All">Toute l'île</option>
                            {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                            <ChevronDown size={16} />
                        </div>
                    </div>
                </div>

                {/* Categories Checkboxes */}
                <div className="mb-8">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 block">Type de véhicule</label>
                    <div className="space-y-3">
                        {Object.values(VehicleType).map(type => (
                            <label key={type} className="flex items-center gap-3 cursor-pointer group">
                                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${selectedTypes.includes(type) ? 'bg-primary-600 border-primary-600' : 'bg-white border-gray-300 group-hover:border-primary-400'}`}>
                                    {selectedTypes.includes(type) && <Check size={12} className="text-white"/>}
                                </div>
                                <input 
                                    type="checkbox" 
                                    className="hidden"
                                    checked={selectedTypes.includes(type)} 
                                    onChange={() => toggleType(type)}
                                />
                                <span className={`text-sm ${selectedTypes.includes(type) ? 'font-semibold text-gray-900' : 'text-gray-600'}`}>
                                    {type}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                    <div className="flex justify-between items-center mb-3">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Prix max. / jour</label>
                        <span className="text-xs font-bold text-primary-700 bg-primary-50 px-2 py-1 rounded">{priceRange.toLocaleString()} Ar</span>
                    </div>
                    <input 
                        type="range" 
                        min="50000" 
                        max="500000" 
                        step="10000"
                        value={priceRange}
                        onChange={(e) => setPriceRange(Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                    />
                    <div className="flex justify-between mt-2 text-[10px] text-gray-400">
                        <span>50k</span>
                        <span>500k+</span>
                    </div>
                </div>
            </aside>

            {/* Results Grid */}
            <div className="lg:w-3/4 w-full">
                {/* Active Filters Summary (Pills) */}
                {selectedTypes.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                        {selectedTypes.map(type => (
                            <button 
                                key={type} 
                                onClick={() => toggleType(type)}
                                className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-secondary-900 text-white text-xs font-medium hover:bg-secondary-800 transition-colors"
                            >
                                {type} <X size={12}/>
                            </button>
                        ))}
                        <button onClick={() => setSelectedTypes([])} className="text-xs text-gray-500 hover:text-gray-900 underline ml-2">Tout effacer</button>
                    </div>
                )}

                {filteredVehicles.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredVehicles.map(vehicle => (
                        <div key={vehicle.id} className="h-[320px]"> {/* Fixed height container to ensure consistent grid */}
                             <VehicleCard vehicle={vehicle} />
                        </div>
                    ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200">
                    <div className="inline-block p-4 bg-gray-100 rounded-full mb-4">
                        <Car size={32} className="text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">Aucun véhicule trouvé</h3>
                    <p className="text-gray-500 mt-2">Essayez d'ajuster vos critères de recherche.</p>
                    <button 
                        onClick={() => {setSelectedCity('All'); setSelectedTypes([]); setPriceRange(500000);}}
                        className="mt-4 text-primary-600 font-semibold hover:underline"
                    >
                        Réinitialiser tous les filtres
                    </button>
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default Search;

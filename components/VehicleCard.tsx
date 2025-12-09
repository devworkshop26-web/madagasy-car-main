
import React from 'react';
import { Star, MapPin, Fuel, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Vehicle } from '../types';

interface VehicleCardProps {
  vehicle: Vehicle;
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/vehicle/${vehicle.id}`);
  };

  return (
    <div 
      onClick={handleClick}
      className="bg-white rounded-xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden border border-gray-100 group flex flex-col h-full cursor-pointer"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={vehicle.image}
          alt={vehicle.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2 py-1 rounded-md text-[10px] font-bold text-gray-800 shadow-sm uppercase tracking-wide">
          {vehicle.type}
        </div>
        {!vehicle.isAvailable && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-[2px]">
            <span className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg uppercase tracking-wider transform -rotate-6 border-2 border-white">
              Actuellement Loué
            </span>
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
             <span className="text-white text-xs font-bold flex items-center gap-1">Voir détails <ArrowRight size={14}/></span>
        </div>
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-gray-900 text-base line-clamp-1 group-hover:text-primary-600 transition-colors">{vehicle.title}</h3>
          <div className="flex items-center text-yellow-500 text-xs font-bold flex-shrink-0 bg-yellow-50 px-2 py-1 rounded-md">
            <Star size={12} fill="currentColor" className="mr-1" />
            {vehicle.rating}
          </div>
        </div>

        <div className="flex items-center text-gray-500 text-xs mb-4">
          <MapPin size={14} className="mr-1 text-gray-400" />
          {vehicle.location} • {vehicle.trips} voyages
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
            {vehicle.features.slice(0, 3).map((feature, idx) => (
                <span key={idx} className="bg-gray-50 text-gray-600 text-[10px] px-2 py-1 rounded border border-gray-100 flex items-center">
                    <Fuel size={10} className="mr-1 opacity-50"/> {feature}
                </span>
            ))}
        </div>

        <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
          <div>
            <p className="text-[10px] text-gray-400 uppercase font-bold">À partir de</p>
            <p className="text-primary-600 font-extrabold text-lg leading-none">
              {vehicle.pricePerDay.toLocaleString('fr-MG')} <span className="text-xs text-gray-500 font-normal">Ar/j</span>
            </p>
          </div>
          <button 
            className="bg-secondary-900 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-primary-600 transition-colors shadow-sm group-hover:shadow-md"
          >
            Réserver
          </button>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;

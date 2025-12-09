

import { Vehicle, VehicleType, User, UserRole, BadgeLevel, Driver, DriverOption, BookingDetails, AddOn, SupportTicket } from './types';

export const CITIES = [
  "Antananarivo",
  "Nosy Be",
  "Mahajanga",
  "Toamasina",
  "Fianarantsoa",
  "Antsirabe",
  "Toliara",
  "Diego Suarez",
  "Fort-Dauphin"
];

export const DEFAULT_ADDONS: AddOn[] = [
    { id: 'insurancePlus', label: 'Assurance Sérénité+', price: 15000, iconKey: 'Shield', description: 'Réduit la franchise en cas d\'accident.' },
    { id: 'babySeat', label: 'Siège Bébé', price: 5000, iconKey: 'Baby', description: 'Pour la sécurité des tout-petits.' },
    { id: 'gps', label: 'GPS / Tablette', price: 10000, iconKey: 'TabletSmartphone', description: 'Navigation pré-chargée avec cartes hors-ligne.' },
    { id: 'wifi', label: 'Wifi 4G Pocket', price: 15000, iconKey: 'Wifi', description: 'Internet partout (2Go/jour inclus).' },
    { id: 'coolbox', label: 'Glacière Électrique', price: 5000, iconKey: 'Snowflake', description: 'Gardez vos boissons au frais.' },
];

export const HERO_SLIDES = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&q=80&w=1920",
    title: "Explorez la Grande Île",
    subtitle: "Des 4x4 robustes pour les pistes de la RN7."
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=1920",
    title: "Liberté sur deux roues",
    subtitle: "Scooters disponibles à Nosy Be et Sainte-Marie."
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=1920",
    title: "Confort Premium",
    subtitle: "Berlines de luxe pour vos déplacements professionnels à Tana."
  }
];

export const MOCK_DRIVERS: Driver[] = [
  { 
    id: 'd1', ownerId: 'owner1', name: 'Jean Rakoto', licenseNumber: 'PERM-9921-MG', phone: '034 05 111 22', avatar: 'https://i.pravatar.cc/150?u=d1', status: 'ACTIVE', 
    rating: 4.8, punctualityRating: 4.9, safetyRating: 5.0,
    totalTrips: 154, joinDate: '2022-05-10', currentVehicleId: '1' 
  },
  { 
    id: 'd2', ownerId: 'owner1', name: 'Luc Mamy', licenseNumber: 'PERM-8821-MG', phone: '033 11 222 33', avatar: 'https://i.pravatar.cc/150?u=d2', status: 'ACTIVE', 
    rating: 4.5, punctualityRating: 4.2, safetyRating: 4.8,
    totalTrips: 42, joinDate: '2023-01-15', currentVehicleId: undefined 
  },
  { 
    id: 'd3', ownerId: 'owner1', name: 'Hery Paul', licenseNumber: 'PERM-7721-MG', phone: '032 22 333 44', avatar: 'https://i.pravatar.cc/150?u=d3', status: 'BANNED', 
    rating: 2.2, punctualityRating: 1.5, safetyRating: 3.0,
    totalTrips: 12, joinDate: '2023-08-20', currentVehicleId: undefined 
  },
];

export const MOCK_VEHICLES: Vehicle[] = [
  {
    id: '1',
    title: 'Toyota Land Cruiser Prado',
    description: "Le compagnon idéal pour vos aventures à Madagascar. Ce Prado TXL est équipé pour les pistes (pneus AT, suspension renforcée) tout en offrant un confort exceptionnel (Clim bi-zone, cuir). Parfait pour la RN7 ou la côte Est.",
    type: VehicleType.CAR,
    pricePerDay: 250000,
    pricingRates: { 
        halfDay: 150000, 
        day: 250000, 
        twentyFourHours: 300000, 
        provinceDay: 350000,
        weeklyDiscount: 10, 
        monthlyDiscount: 25 
    },
    location: 'Antananarivo',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1bcfb0?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    trips: 42,
    ownerId: 'owner1',
    ownerName: 'Andry Rabe',
    features: ['4x4', 'Climatisation', 'GPS', '7 places'],
    isAvailable: true,
    status: 'AVAILABLE',
    vin: 'JTEBU29J800...',
    isCertified: true,
    driverOption: DriverOption.OPTIONAL,
    driverId: 'd1',
    unlimitedMileage: false,
    mileageLimit: 200,
    extraKmPrice: 1000,
    year: 2018,
    engine: "3.0L D-4D",
    doors: 5,
    transmission: 'Automatique',
    documents: {
        registration: { url: '#', expiryDate: '2025-01-01', status: 'VALID' },
        insurance: { url: '#', expiryDate: '2025-01-01', status: 'VALID' },
        technicalVisit: { url: '#', expiryDate: '2024-12-05', status: 'VALID' }
    },
    history: [
        { id: 'h1', date: '10/10/2023', client: 'Marc L.', amount: 750000, rating: 5 },
        { id: 'h2', date: '05/10/2023', client: 'Sophie T.', amount: 250000, rating: 4 },
        { id: 'h3', date: '20/09/2023', client: 'Rija A.', amount: 1500000, rating: 5 },
    ]
  },
  {
    id: '2',
    title: 'Peugeot 3008 SUV',
    description: "SUV urbain moderne et confortable. Idéal pour les déplacements professionnels à Tana ou les escapades sur route goudronnée. Toit panoramique pour profiter des paysages.",
    type: VehicleType.CAR,
    pricePerDay: 180000,
    pricingRates: { 
        halfDay: 100000, 
        day: 180000, 
        twentyFourHours: 220000, 
        provinceDay: 250000,
        weeklyDiscount: 15, 
        monthlyDiscount: 30 
    },
    location: 'Nosy Be',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=800',
    rating: 4.7,
    trips: 15,
    ownerId: 'owner2',
    ownerName: 'Sarah V.',
    features: ['Automatique', 'Bluetooth', 'Toit ouvrant'],
    isAvailable: true,
    status: 'AVAILABLE',
    vin: 'VF3M45...',
    isCertified: false,
    driverOption: DriverOption.NONE,
    unlimitedMileage: true,
    year: 2020,
    engine: "1.6L HDI",
    doors: 5,
    transmission: 'Automatique',
    documents: {
        registration: { url: '#', expiryDate: '2025-06-01', status: 'VALID' },
        insurance: { url: '#', expiryDate: '2025-06-15', status: 'VALID' },
        technicalVisit: { url: '#', expiryDate: '2024-08-10', status: 'EXPIRED' }
    }
  },
  {
    id: '3',
    title: 'Vespa GTS 300',
    description: "Le style italien à Madagascar. Scooter puissant et maniable, parfait pour éviter les embouteillages ou flâner en bord de mer.",
    type: VehicleType.SCOOTER,
    pricePerDay: 60000,
    pricingRates: { 
        halfDay: 40000, 
        day: 60000, 
        twentyFourHours: 80000, 
        weeklyDiscount: 5, 
        monthlyDiscount: 15 
    },
    location: 'Mahajanga',
    image: 'https://images.unsplash.com/photo-1628151016259-2a91219c27ee?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    trips: 89,
    ownerId: 'owner3',
    ownerName: 'Jean Kely',
    features: ['Casque inclus', 'Top case', 'Économique'],
    isAvailable: true,
    status: 'AVAILABLE',
    vin: 'ZAPM45...',
    isCertified: true,
    driverOption: DriverOption.NONE,
    unlimitedMileage: true,
    year: 2022,
    engine: "300cc",
    doors: 0,
    transmission: 'Automatique',
  },
  {
    id: '4',
    title: 'Mercedes Sprinter Fourgon',
    description: "Fourgon utilitaire grand volume. Fiable et robuste pour tous vos transports de marchandises.",
    type: VehicleType.VAN,
    pricePerDay: 300000,
    pricingRates: { 
        day: 300000, 
        twentyFourHours: 350000, 
        provinceDay: 400000, 
        weeklyDiscount: 20, 
        monthlyDiscount: 40 
    },
    location: 'Toamasina',
    image: 'https://images.unsplash.com/photo-1574620027503-455b5d19a0a8?auto=format&fit=crop&q=80&w=800',
    rating: 4.6,
    trips: 23,
    ownerId: 'owner4',
    ownerName: 'Transport Pro',
    features: ['Grand volume', 'Diesel', '3 places'],
    isAvailable: true,
    status: 'AVAILABLE',
    vin: 'WDB906...',
    isCertified: false,
    driverOption: DriverOption.REQUIRED,
    unlimitedMileage: false,
    mileageLimit: 300,
    extraKmPrice: 2000,
    year: 2016,
    engine: "316 CDI",
    doors: 4,
    transmission: 'Manuelle',
  },
  {
    id: '5',
    title: 'Renault Kerax Camion',
    description: "Camion benne pour chantier. Capacité de charge élevée.",
    type: VehicleType.TRUCK,
    pricePerDay: 450000,
    pricingRates: { day: 450000, twentyFourHours: 600000, provinceDay: 700000, weeklyDiscount: 0, monthlyDiscount: 10 },
    location: 'Antananarivo',
    image: 'https://images.unsplash.com/photo-1586058090333-d85452296c02?auto=format&fit=crop&q=80&w=800',
    rating: 4.5,
    trips: 10,
    ownerId: 'owner1',
    features: ['Benne basculante', 'Charge lourde'],
    isAvailable: false,
    status: 'RENTED',
    driverId: 'd1',
    vin: 'VF652...',
    isCertified: true,
    driverOption: DriverOption.REQUIRED,
    history: [],
    unlimitedMileage: false,
    mileageLimit: 0,
    extraKmPrice: 0,
    year: 2015,
    engine: "Heavy Duty",
    doors: 2,
    transmission: 'Manuelle',
  },
  {
    id: '6',
    title: 'Duster 4x4',
    description: "Le 4x4 économique par excellence. Passe partout sans se ruiner.",
    type: VehicleType.CAR,
    pricePerDay: 150000,
    pricingRates: { day: 150000, twentyFourHours: 180000, provinceDay: 200000, weeklyDiscount: 10, monthlyDiscount: 20 },
    location: 'Toliara',
    image: 'https://images.unsplash.com/photo-1503376763036-066120622c74?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    trips: 56,
    ownerId: 'owner2',
    features: ['Robuste', 'Clim', 'Manuel'],
    isAvailable: true,
    status: 'AVAILABLE',
    vin: 'VF1H...',
    isCertified: false,
    driverOption: DriverOption.OPTIONAL,
    unlimitedMileage: false,
    mileageLimit: 250,
    year: 2019,
    engine: "1.5 dCi",
    doors: 5,
    transmission: 'Manuelle',
  },
  {
    id: '13',
    title: 'Hyundai Starex SVX',
    description: "Minibus familial confortable. Idéal pour les vacances en famille ou les petits groupes.",
    type: VehicleType.VAN,
    pricePerDay: 220000,
    pricingRates: { day: 220000, twentyFourHours: 250000, provinceDay: 300000, weeklyDiscount: 5, monthlyDiscount: 10 },
    location: 'Antananarivo',
    image: 'https://images.unsplash.com/photo-1522037576655-7793c4420540?auto=format&fit=crop&q=80&w=800',
    rating: 4.7,
    trips: 22,
    ownerId: 'owner1',
    features: ['9 Places', 'Climatisé', 'Diesel', 'Familiale'],
    isAvailable: true,
    status: 'AVAILABLE',
    driverOption: DriverOption.OPTIONAL,
    unlimitedMileage: false,
    mileageLimit: 300,
    extraKmPrice: 1500,
    year: 2017,
    engine: "2.5 CRDi",
    doors: 4,
    transmission: 'Manuelle',
  },
  {
    id: '14',
    title: 'Nissan Patrol GR',
    description: "Le roi du franchissement. Équipé raid avec galerie et snorkel.",
    type: VehicleType.CAR,
    pricePerDay: 280000,
    pricingRates: { day: 280000, twentyFourHours: 320000, provinceDay: 380000, weeklyDiscount: 10, monthlyDiscount: 25 },
    location: 'Antananarivo',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    trips: 64,
    ownerId: 'owner1',
    features: ['4x4 Extrême', 'Snorkel', 'Galerie', '7 places'],
    isAvailable: true,
    status: 'AVAILABLE',
    driverOption: DriverOption.REQUIRED,
    unlimitedMileage: true,
    mileageLimit: 0,
    extraKmPrice: 0,
    year: 2010,
    engine: "4.2L Diesel",
    doors: 5,
    transmission: 'Manuelle',
  },
  {
    id: '7',
    title: 'Hyundai H1',
    type: VehicleType.VAN,
    pricePerDay: 200000,
    pricingRates: { day: 200000, twentyFourHours: 250000, weeklyDiscount: 15, monthlyDiscount: 30 },
    location: 'Antananarivo',
    image: 'https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&fit=crop&q=80&w=800',
    rating: 4.7,
    trips: 34,
    ownerId: 'owner5',
    features: ['9 places', 'Confort', 'Famille'],
    isAvailable: true,
    status: 'AVAILABLE',
    isCertified: true,
    driverOption: DriverOption.REQUIRED,
    year: 2018,
    doors: 4,
  },
  {
    id: '8',
    title: 'Yamaha NMAX',
    type: VehicleType.SCOOTER,
    pricePerDay: 50000,
    pricingRates: { day: 50000, twentyFourHours: 60000, weeklyDiscount: 5, monthlyDiscount: 10 },
    location: 'Nosy Be',
    image: 'https://images.unsplash.com/photo-1591638257805-47202390a789?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    trips: 112,
    ownerId: 'owner3',
    features: ['Maniable', 'Automatique', '2 Casques'],
    isAvailable: true,
    status: 'AVAILABLE',
    driverOption: DriverOption.NONE,
    year: 2021,
    engine: '125cc'
  },
  {
    id: '9',
    title: 'Ford Ranger Raptor',
    type: VehicleType.CAR,
    pricePerDay: 350000,
    pricingRates: { day: 350000, twentyFourHours: 400000, provinceDay: 450000, weeklyDiscount: 10, monthlyDiscount: 20 },
    location: 'Diego Suarez',
    image: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?auto=format&fit=crop&q=80&w=800',
    rating: 5.0,
    trips: 8,
    ownerId: 'owner6',
    features: ['Puissant', 'Tout-terrain', 'Luxe'],
    isAvailable: true,
    status: 'AVAILABLE',
    isCertified: true,
    driverOption: DriverOption.OPTIONAL,
    unlimitedMileage: false,
    mileageLimit: 150,
    extraKmPrice: 1500,
    year: 2023,
    engine: '2.0L Bi-Turbo',
    doors: 4,
  },
  {
    id: '10',
    title: 'Mitsubishi L200 Sportero',
    type: VehicleType.CAR,
    pricePerDay: 300000,
    pricingRates: { day: 300000, twentyFourHours: 350000, provinceDay: 400000, weeklyDiscount: 10, monthlyDiscount: 20 },
    location: 'Fort-Dauphin',
    image: 'https://images.unsplash.com/photo-1551830820-330a71b99659?auto=format&fit=crop&q=80&w=800',
    rating: 4.7,
    trips: 12,
    ownerId: 'owner6',
    features: ['4x4', 'Pickup', 'Diesel'],
    isAvailable: true,
    status: 'AVAILABLE',
    driverOption: DriverOption.OPTIONAL,
    year: 2019,
    engine: '2.4L DI-D',
    doors: 4,
  },
  {
    id: '11',
    title: 'Kia Picanto',
    type: VehicleType.CAR,
    pricePerDay: 80000,
    pricingRates: { day: 80000, twentyFourHours: 100000, weeklyDiscount: 5, monthlyDiscount: 15 },
    location: 'Antananarivo',
    image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=800',
    rating: 4.5,
    trips: 88,
    ownerId: 'owner2',
    features: ['Economique', 'Petite', 'Essence'],
    isAvailable: true,
    status: 'AVAILABLE',
    driverOption: DriverOption.NONE,
    year: 2018,
    doors: 5,
    engine: '1.0L'
  },
  {
    id: '12',
    title: 'Mazda Bus 20 Places',
    type: VehicleType.VAN,
    pricePerDay: 400000,
    pricingRates: { day: 400000, twentyFourHours: 500000, provinceDay: 600000, weeklyDiscount: 0, monthlyDiscount: 0 },
    location: 'Fianarantsoa',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800',
    rating: 4.3,
    trips: 5,
    ownerId: 'owner4',
    features: ['Groupe', 'Transport', 'Bagages'],
    isAvailable: true,
    status: 'AVAILABLE',
    driverOption: DriverOption.REQUIRED,
    year: 2015,
    doors: 3,
  }
];

export const MOCK_ADMIN_VEHICLES = MOCK_VEHICLES.map(v => ({
    ...v,
    owner: 'Propriétaire ' + v.ownerId,
    status: v.isAvailable ? 'ACTIVE' : 'MAINTENANCE',
    submittedDate: '01/01/2023'
}));

export const MOCK_USER: User = {
  id: 'u1',
  name: 'Andry Rabe',
  role: UserRole.OWNER,
  avatar: 'https://i.pravatar.cc/150?img=12',
  badgeLevel: BadgeLevel.GOLD,
  points: 1250,
  email: 'andry.r@madadrive.mg',
  phone: '034 12 345 67',
  status: 'VERIFIED',
  joinDate: '15 Oct 2022',
  companyName: 'Andry Transports',
  nif: '3000123456',
  stat: '712011201800123',
  documents: {
      cin: { status: 'VALID', url: '#' },
      nifStat: { status: 'VALID', url: '#' }
  }
};

export const MOCK_USERS_LIST: User[] = [
  { 
    id: 'u1', name: 'Rasoa Soa', email: 'rasoa@gmail.com', role: UserRole.CLIENT, status: 'VERIFIED', joinDate: '12 Jan 2023', avatar: 'https://i.pravatar.cc/150?img=5', points: 150,
    documents: { cin: { status: 'VALID' }, license: { status: 'VALID' } },
    pipelineStage: 'LOYAL', leadScore: 90, lastActive: 'Aujourd\'hui', lifetimeValue: 2500000, internalNotes: 'Client VIP, loue souvent des 4x4.'
  },
  { 
    id: 'u2', name: 'Andry Rabe', email: 'andry.r@yahoo.fr', role: UserRole.OWNER, status: 'PENDING', joinDate: '15 Oct 2023', avatar: 'https://i.pravatar.cc/150?img=12', points: 0,
    documents: { cin: { status: 'VALID' }, license: { status: 'PENDING' } },
    pipelineStage: 'WON', leadScore: 70, lastActive: 'Hier', lifetimeValue: 0, internalNotes: 'Propriétaire de 3 véhicules. Documents en attente.'
  },
  { 
    id: 'u3', name: 'Jean Kely', email: 'jean.k@orange.mg', role: UserRole.CLIENT, status: 'SUSPENDED', joinDate: '02 Mar 2023', avatar: 'https://i.pravatar.cc/150?img=3', points: 20,
    documents: { cin: { status: 'VALID' }, license: { status: 'MISSING' } },
    pipelineStage: 'CHURNED', leadScore: 10, lastActive: 'Il y a 3 mois', lifetimeValue: 150000, internalNotes: 'Mauvais payeur. Compte suspendu.'
  },
  { 
    id: 'u4', name: 'Sarah V.', email: 'sarah.v@gmail.com', role: UserRole.OWNER, status: 'VERIFIED', joinDate: '22 Jun 2023', avatar: 'https://i.pravatar.cc/150?img=9', points: 1200,
    documents: { cin: { status: 'VALID' }, license: { status: 'VALID' } },
    pipelineStage: 'WON', leadScore: 85, lastActive: 'Il y a 2h', lifetimeValue: 0, internalNotes: 'Partenaire fiable à Nosy Be.'
  },
  { 
    id: 'u5', name: 'Marc L.', email: 'marc.l@gmail.com', role: UserRole.CLIENT, status: 'VERIFIED', joinDate: '05 Nov 2023', avatar: 'https://i.pravatar.cc/150?img=15', points: 50,
    documents: { cin: { status: 'VALID' } },
    pipelineStage: 'NEGOTIATION', leadScore: 60, lastActive: 'Hier', lifetimeValue: 0, internalNotes: 'A demandé un devis pour 10 jours.'
  },
  { 
    id: 'u6', name: 'Sophie T.', email: 'sophie.t@hotmail.fr', role: UserRole.CLIENT, status: 'PENDING', joinDate: '10 Nov 2023', avatar: 'https://i.pravatar.cc/150?img=20', points: 0,
    documents: { cin: { status: 'PENDING' } },
    pipelineStage: 'INTERESTED', leadScore: 40, lastActive: 'Il y a 5 min', lifetimeValue: 0, internalNotes: 'Visite souvent la page des SUV.'
  },
  { 
    id: 'u7', name: 'Hery Zo', email: 'hery.zo@moov.mg', role: UserRole.CLIENT, status: 'VERIFIED', joinDate: '15 Sep 2023', avatar: 'https://i.pravatar.cc/150?img=33', points: 300,
    documents: { cin: { status: 'VALID' } },
    pipelineStage: 'WON', leadScore: 75, lastActive: 'Il y a 1 semaine', lifetimeValue: 450000, internalNotes: 'A loué une berline pour un mariage.'
  },
  { 
    id: 'u8', name: 'Entreprise BTP', email: 'contact@btp-mada.mg', role: UserRole.CLIENT, status: 'VERIFIED', joinDate: '01 Jan 2023', avatar: 'https://i.pravatar.cc/150?img=60', points: 5000,
    documents: { cin: { status: 'VALID' } },
    pipelineStage: 'LOYAL', leadScore: 99, lastActive: 'Aujourd\'hui', lifetimeValue: 15000000, internalNotes: 'Gros compte B2B. Loue des camions.'
  },
   { 
    id: 'u9', name: 'Nouveau User', email: 'new@gmail.com', role: UserRole.CLIENT, status: 'PENDING', joinDate: 'Aujourd\'hui', avatar: 'https://i.pravatar.cc/150?img=68', points: 0,
    documents: { cin: { status: 'MISSING' } },
    pipelineStage: 'LEAD', leadScore: 20, lastActive: 'A l\'instant', lifetimeValue: 0, internalNotes: 'Vient de s\'inscrire. A relancer.'
  }
];

export const MOCK_BLOG_CATEGORIES = [
  "Tous", "Road Trip", "Sécurité", "Entretien", "Législation", "Découverte"
];

export const MOCK_BLOG_POSTS = [
  {
    id: 1,
    title: "Road Trip : La RN7 de Tana à Tuléar",
    excerpt: "Découvrez les paysages époustouflants de la nationale 7, des hauts plateaux aux plages du sud.",
    image: "https://images.unsplash.com/photo-1517824806704-9040b037703b?auto=format&fit=crop&q=80&w=800",
    date: "12 Oct 2023",
    author: "MadaDrive Team",
    category: "Road Trip"
  },
  {
    id: 2,
    title: "Comment louer un scooter à Nosy Be en toute sécurité",
    excerpt: "Les règles de conduite, les pièges à éviter et nos meilleurs itinéraires pour l'île aux parfums.",
    image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=800",
    date: "05 Nov 2023",
    author: "Njaka R.",
    category: "Sécurité"
  },
  {
    id: 3,
    title: "Entretien véhicule : Préparer sa voiture pour la saison des pluies",
    excerpt: "Conseils essentiels pour les propriétaires : pneus, essuie-glaces et freins.",
    image: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&q=80&w=800",
    date: "20 Nov 2023",
    author: "Atelier Mecano",
    category: "Entretien"
  }
];

export const COMMISSION_CONFIG = {
    rate: 15,
};

export const MOCK_TICKETS = [
    { id: 1, subject: "Problème paiement", status: "OPEN" },
];

export const MOCK_TRANSACTIONS = [
    { id: 1, amount: 250000, date: "10 Oct", status: "COMPLETED" },
];

export const MOCK_BOOKINGS: BookingDetails[] = [
    { 
        id: 'BK-2023-001', date: '2023-10-12', duration: 3, durationLabel: '3 Jours', 
        vehicleName: 'Toyota Prado', ownerName: 'Andry Rabe', renterName: 'Jean Doe', 
        totalAmount: 750000, platformCommissionRate: 0.15, commissionAmount: 112500, addOnRevenue: 45000, netPayout: 637500,
        status: 'COMPLETED', payoutStatus: 'PAID' 
    },
    { 
        id: 'BK-2023-002', date: '2023-10-15', duration: 1, durationLabel: '1 Journée',
        vehicleName: 'Vespa GTS', ownerName: 'Jean Kely', renterName: 'Sarah V.', 
        totalAmount: 60000, platformCommissionRate: 0.12, commissionAmount: 7200, addOnRevenue: 5000, netPayout: 52800,
        status: 'COMPLETED', payoutStatus: 'UNPAID' 
    },
    { 
        id: 'BK-2023-003', date: '2023-10-18', duration: 5, durationLabel: '5 Jours (Province)',
        vehicleName: 'Renault Kerax', ownerName: 'Andry Rabe', renterName: 'Construction Co.', 
        totalAmount: 3500000, platformCommissionRate: 0.20, commissionAmount: 700000, addOnRevenue: 0, netPayout: 2800000,
        status: 'ONGOING', payoutStatus: 'UNPAID' 
    },
    { 
        id: 'BK-2023-004', date: '2023-10-20', duration: 1, durationLabel: '24 Heures',
        vehicleName: 'Duster 4x4', ownerName: 'Sarah V.', renterName: 'Touriste X', 
        totalAmount: 180000, platformCommissionRate: 0.15, commissionAmount: 27000, addOnRevenue: 15000, netPayout: 153000,
        status: 'PENDING', payoutStatus: 'UNPAID' 
    },
     { 
        id: 'BK-2023-005', date: '2023-10-22', duration: 7, durationLabel: '7 Jours',
        vehicleName: 'Ford Ranger', ownerName: 'Propriétaire 6', renterName: 'ONG Locale', 
        totalAmount: 2450000, platformCommissionRate: 0.15, commissionAmount: 367500, addOnRevenue: 100000, netPayout: 2182500,
        status: 'ONGOING', payoutStatus: 'UNPAID' 
    },
    { 
        id: 'BK-2023-006', date: '2023-10-23', duration: 2, durationLabel: '2 Jours',
        vehicleName: 'Kia Picanto', ownerName: 'Sarah V.', renterName: 'Etudiant Y', 
        totalAmount: 160000, platformCommissionRate: 0.15, commissionAmount: 24000, addOnRevenue: 0, netPayout: 136000,
        status: 'COMPLETED', payoutStatus: 'PAID' 
    },
];

export const MOCK_INCIDENTS = [
    { id: 1, type: 'ACCIDENT', vehicle: 'Toyota Prado', user: 'Jean R.', severity: 'HIGH', time: 'Il y a 2h', status: 'OPEN' },
    { id: 2, type: 'LATE_RETURN', vehicle: 'Hyundai H1', user: 'Sarah V.', severity: 'MEDIUM', time: 'Il y a 4h', status: 'OPEN' },
    { id: 3, type: 'PAYMENT_FAILED', vehicle: 'Duster 4x4', user: 'Marc L.', severity: 'LOW', time: 'Il y a 5h', status: 'RESOLVED' },
];

export const MOCK_LIVE_STATS = {
    cpu: 45,
    ram: 62,
    onlineUsers: 128,
    dailyRegistrations: 14
};

export const MOCK_ACTIVE_RENTALS = [
    { id: 'R-102', vehicle: 'Toyota Prado', client: 'Jean R.', location: 'RN7 - Antsirabe', returnTime: 'Demain 14:00', status: 'ON_TIME' },
    { id: 'R-105', vehicle: 'Mazda Bus', client: 'Transport Co.', location: 'Tana Ville', returnTime: 'Aujourd\'hui 18:00', status: 'WARNING' },
    { id: 'R-109', vehicle: 'Vespa GTS', client: 'Sophie M.', location: 'Nosy Be', returnTime: 'Dans 2 jours', status: 'ON_TIME' },
];

export const MOCK_SUPPORT_TICKETS: SupportTicket[] = [
    {
        id: 'T-2910', userId: 'u1', userName: 'Rasoa Soa', userRole: UserRole.CLIENT, bookingId: 'BK-2023-006',
        subject: 'Accident léger Tana', description: 'Un scooter m\'a rentré dedans sur Analakely. Pare-choc rayé.',
        category: 'ACCIDENT', priority: 'HIGH', status: 'OPEN', source: 'APP',
        createdAt: '10/11/2023 14:30', lastUpdate: '10/11/2023 14:35',
        messages: [{ sender: 'USER', text: 'Bonjour, je viens d\'avoir un accrochage. Que dois-je faire ?', time: '14:30' }]
    },
    {
        id: 'T-2911', userId: 'u2', userName: 'Andry Rabe', userRole: UserRole.OWNER, bookingId: 'BK-2023-001',
        subject: 'Paiement non reçu', description: 'La location BK-2023-001 est terminée mais je n\'ai pas eu le virement.',
        category: 'PAYMENT', priority: 'MEDIUM', status: 'IN_PROGRESS', source: 'EMAIL',
        createdAt: '09/11/2023 09:00', lastUpdate: '10/11/2023 10:00',
        messages: [{ sender: 'USER', text: 'Où est mon argent ?', time: '09:00' }]
    },
    {
        id: 'T-2912', userId: 'u4', userName: 'Sarah V.', userRole: UserRole.OWNER,
        subject: 'Demande changement RIB', description: 'Je veux changer mon numéro Mvola pour les virements.',
        category: 'TECHNICAL', priority: 'LOW', status: 'RESOLVED', source: 'PHONE',
        createdAt: '08/11/2023 11:20', lastUpdate: '08/11/2023 12:00'
    },
     {
        id: 'T-2915', userId: 'u3', userName: 'Jean Kely', userRole: UserRole.CLIENT, bookingId: 'BK-2023-002',
        subject: 'Annulation Réservation', description: 'Je dois annuler ma réservation pour demain cause maladie.',
        category: 'BOOKING', priority: 'MEDIUM', status: 'OPEN', source: 'APP',
        createdAt: '10/11/2023 15:45', lastUpdate: '10/11/2023 15:45'
    }
];
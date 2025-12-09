

export enum UserRole {
  CLIENT = 'CLIENT',
  OWNER = 'OWNER',
  ADMIN = 'ADMIN',
  SUPPORT = 'SUPPORT'
}

export enum VehicleType {
  CAR = 'Voiture',
  TRUCK = 'Camion',
  SCOOTER = 'Scooter',
  VAN = 'Fourgon'
}

export enum BadgeLevel {
  BRONZE = 'Bronze',
  SILVER = 'Silver',
  GOLD = 'Gold',
  PLATINUM = 'Platinum'
}

export type PipelineStage = 'LEAD' | 'INTERESTED' | 'NEGOTIATION' | 'WON' | 'LOYAL' | 'CHURNED';

export interface PricingRates {
  halfDay?: number; // 4h
  day: number;      // 8h - 18h
  twentyFourHours: number; // 24h
  provinceDay?: number; // New: Rate for province trips
  weeklyDiscount: number; // Percentage
  monthlyDiscount: number; // Percentage
}

export enum DriverOption {
  REQUIRED = 'OBLIGATOIRE',
  OPTIONAL = 'OPTIONNEL',
  NONE = 'SANS_CHAUFFEUR'
}

export interface Driver {
  id: string;
  ownerId: string;
  name: string;
  licenseNumber: string;
  phone: string;
  avatar: string;
  status: 'ACTIVE' | 'INACTIVE' | 'BANNED';
  rating: number; // Note globale
  punctualityRating: number;
  safetyRating: number;
  totalTrips: number;
  joinDate: string;
  address?: string;
  currentVehicleId?: string;
}

export interface VehicleDocument {
    url: string;
    expiryDate: string;
    status: 'VALID' | 'PENDING' | 'EXPIRED' | 'MISSING';
}

export interface Vehicle {
  id: string;
  title: string;
  description?: string; // New: Detailed description
  type: VehicleType;
  pricePerDay: number; // Base price
  pricingRates: PricingRates;
  location: string;
  image: string;
  rating: number;
  trips: number;
  ownerId: string;
  ownerName?: string;
  features: string[];
  isAvailable: boolean;
  status?: 'AVAILABLE' | 'RENTED' | 'MAINTENANCE';
  
  // Tech Specs
  year?: number;
  engine?: string; // e.g. "V6 Diesel", "2.0L"
  doors?: number;
  transmission?: 'Manuelle' | 'Automatique';
  
  // Driver config
  driverOption: DriverOption;
  driverId?: string;
  
  // Technical Details
  vin?: string;
  isCertified?: boolean;
  unavailableDates?: string[]; // ISO date strings
  
  // Documents
  documents?: {
      registration?: VehicleDocument;
      insurance?: VehicleDocument;
      technicalVisit?: VehicleDocument;
  };

  // Mileage Config
  unlimitedMileage?: boolean;
  mileageLimit?: number; // Km per day
  extraKmPrice?: number; // Ar per extra Km

  history?: {
    id: string;
    date: string;
    client: string;
    amount: number;
    rating: number;
  }[];
}

export interface User {
  id: string;
  name: string;
  email?: string;
  role: UserRole;
  avatar: string;
  badgeLevel?: BadgeLevel;
  points?: number;
  status?: 'VERIFIED' | 'PENDING' | 'SUSPENDED';
  phone?: string;
  address?: string;
  joinDate?: string;
  
  // CRM & Pipeline Data
  pipelineStage?: PipelineStage;
  leadScore?: number; // 0 to 100
  lastActive?: string;
  lifetimeValue?: number; // Total spent
  internalNotes?: string;
  
  // Owner specific
  companyName?: string;
  nif?: string;
  stat?: string;
  
  documents?: {
    cin?: { status: 'VALID' | 'PENDING' | 'MISSING', url?: string };
    license?: { status: 'VALID' | 'PENDING' | 'MISSING', url?: string };
    nifStat?: { status: 'VALID' | 'PENDING' | 'MISSING', url?: string };
  };
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface AddOn {
    id: string;
    label: string;
    price: number;
    iconKey: string; // Changed from 'any' to 'string' to allow storage and mapping
    description?: string;
}

export interface InsuranceOption {
    id: 'TIERS' | 'TOUS_RISQUES';
    label: string;
    price: number;
    description: string;
}

export interface BookingDetails {
    id: string;
    date: string;
    duration: number; // Days
    durationLabel: string;
    vehicleName: string;
    ownerName: string;
    renterName: string;
    
    // Financials
    totalAmount: number; // Gross GMV
    platformCommissionRate: number; // 0.15
    commissionAmount: number; // Revenue
    addOnRevenue: number; // Extra revenue
    netPayout: number; // Owed to owner
    
    status: 'COMPLETED' | 'PENDING' | 'CANCELLED' | 'ONGOING';
    payoutStatus: 'PAID' | 'UNPAID';
}

// SUPPORT TICKET TYPES
export type TicketStatus = 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
export type TicketPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type TicketCategory = 'PAYMENT' | 'ACCIDENT' | 'TECHNICAL' | 'BOOKING' | 'OTHER';
export type TicketSource = 'APP' | 'PHONE' | 'EMAIL';

export interface SupportTicket {
    id: string;
    userId: string;
    userName: string;
    userRole: UserRole; // Was it a client or owner?
    bookingId?: string; // NEW: Related booking ID for faster resolution
    subject: string;
    description: string;
    category: TicketCategory;
    priority: TicketPriority;
    status: TicketStatus;
    source: TicketSource;
    createdAt: string;
    lastUpdate: string;
    messages?: {
        sender: 'USER' | 'AGENT';
        text: string;
        time: string;
    }[];
}
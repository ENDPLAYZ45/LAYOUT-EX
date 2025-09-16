export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'citizen' | 'admin' | 'collector';
  points?: number;
  zone?: string;
}

export interface Bin {
  _id: string;
  binId: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  fillLevel: number;
  lastEmptied: Date;
  zone: string;
  status: 'normal' | 'full' | 'overflow' | 'maintenance';
  capacity: number;
}

export interface Feedback {
  _id: string;
  userId: string;
  binId: string;
  rating: number;
  comment: string;
  timestamp: Date;
  status: 'pending' | 'reviewed' | 'resolved';
}

export interface LeaderboardEntry {
  _id: string;
  zone: string;
  cleanlinessScore: number;
  lastUpdated: Date;
  badge: string;
  rank: number;
}

export interface Route {
  _id: string;
  truckId: string;
  routePoints: Array<{
    binId: string;
    location: { lat: number; lng: number };
    estimatedTime: string;
  }>;
  efficiencyScore: number;
  totalDistance: number;
  estimatedDuration: number;
  status: 'planned' | 'active' | 'completed';
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}
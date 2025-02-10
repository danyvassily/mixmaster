export interface Bar {
  id: string;
  name: string;
  address: string;
  description: string;
  rating: number;
  specialties: string[];
  imageUrl: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  openingHours?: {
    [key: string]: string;
  };
  contact?: {
    phone?: string;
    email?: string;
    website?: string;
  };
  priceRange?: string;
  atmosphere?: string[];
}

export const defaultBar: Bar = {
  id: '',
  name: '',
  address: '',
  description: '',
  rating: 0,
  specialties: [],
  imageUrl: '/images/default-bar.jpg',
  coordinates: undefined,
  openingHours: undefined,
  contact: undefined,
  priceRange: '€€',
  atmosphere: []
}; 
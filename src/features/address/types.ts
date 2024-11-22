// Types simplifiés pour l'interaction client-serveur

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export type AddressType = 'Résidence' | 'Bureau' | 'Magasin';

export interface ClientAddress {
  _id: string; // Utiliser string au lieu de Types.ObjectId pour le client
  placeName: string;
  addressType: AddressType;
  landmark?: string;
  phoneNumber: string;
  isVerified: boolean;
  coordinates: Coordinates;
  imageUrl: string;
}

export interface AddressInput {
  placeName: string;
  addressType: string;
  landmark: string;
  phoneNumber: string;
  image?: File;
  location: {
    lat: number;
    lng: number;
  };
}

// Si nécessaire pour afficher l'historique côté client
export interface SimpleAddressHistory {
  updatedAt: string; // Date sous forme de string
  previousPlaceName: string;
  previousAddressType: string;
}

// Si le partage est géré côté client
export interface SimpleSharedWith {
  recipientId: string;
  sharedDate: string; // Date sous forme de string
}

export interface AddressSearchParams {
  q?: string;
  placeName?: string;
  addressType?: AddressType;
  userId?: string;
  limit?: number;
  offset?: number;
}

export interface ShareWithData {
  phoneNumber: string;
}

export interface ShareAddressResponse {
  message: string;
  sharedAddress: ClientAddress;
}

export interface AddressListProps {
  limit?: number;
  onAddressClick?: (address: ClientAddress) => void;
}

export type FormErrors = {
  placeName?: string;
  addressType?: string;
  phoneNumber?: string;
  location?: string;
  landmark?: string;
};

export interface Address {
  _id: string;
  placeName: string;
  addressType: string;
  landmark: string;
  phoneNumber: string;
  imageUrl: string | null;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}
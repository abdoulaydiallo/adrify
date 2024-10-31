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
  addressType: AddressType;
  landmark?: string;
  phoneNumber: string;
  coordinates: Coordinates;
  imageFile?: File;
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
  recipientId: string;
  type: string;
}

export interface ShareAddressResponse {
  message: string;
  sharedAddress: ClientAddress;
}

export interface AddressListProps {
  limit?: number;
  onAddressClick?: (address: ClientAddress) => void;
}
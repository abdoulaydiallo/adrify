"use client";
import { useEffect, useState } from "react";
import { ClientAddress } from "@/features/address/types";
import CustomImage from '@/components/custom-image';
import {
  MapPin,
  Phone,
  Landmark,
  CheckCircle,
  XCircle,
  ShareIcon,
} from "lucide-react";

interface AddressInfoProps {
  address: ClientAddress;
}

export const AddressInfo = ({ address }: AddressInfoProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const {
    placeName,
    addressType,
    imageUrl,
    landmark,
    phoneNumber,
    coordinates,
    isVerified,
  } = address;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // ou un squelette de chargement
  }

  return (
    <>
      <div className="space-y-2">
        {/* Header avec badge de vérification */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">{placeName}</h2>
          {isVerified ? (
            <span
              className="text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center"
              style={{ color: "#166534", backgroundColor: "#dcfce7" }}
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Adresse Vérifié
            </span>
          ) : (
            <span
              className="text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center"
              style={{ color: "#991b1b", backgroundColor: "#fee2e2" }}
            >
              <XCircle className="w-4 h-4 mr-2" />
              Adresse non vérifié
            </span>
          )}
        </div>

        {/* Informations de l'adresse */}
        <div className="space-y-1">
          <p className="text-gray-600 text-xs"> {addressType}</p>

          <p className="text-gray-600 text-xs flex items-center">
            <Phone className="w-4 h-4 mr-2" />
            {phoneNumber}
          </p>

          <p className="text-gray-600 text-xs flex items-center">
            <Landmark className="w-4 h-4 mr-2" />
            {landmark}
          </p>
        </div>

        {/* Image du bâtiment */}
        <CustomImage
          src={imageUrl}
          alt="Building"
          height={258} // Hauteur fixe pour CustomImage
          priority
        />
      </div>
    </>
  );
};

"use client";

import Image from "next/image";
import { Share2, CheckCircle, MapPin, XCircle } from "lucide-react";
import { ClientAddress, AddressType } from "../types";
import { useRouter } from "next/navigation";

interface AddressCardProps {
  address: ClientAddress;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function AddressCard({ address, onEdit, onDelete }: AddressCardProps) {
  const router = useRouter();

  const handleImageClick = () => {
    router.push(`/addresses/${address._id}`);
  };
  const handleShareAddressClick = () => {
    router.push(`addresses/${address._id}/share`);
  };
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4 lg:mb-0">
      {address.imageUrl && (
        <div
          className="w-full relative"
          style={{ height: "180px", cursor: "pointer" }}
          onClick={handleImageClick}
        >
          <Image
            src={`${address.imageUrl}`}
            alt={`Image de ${address.placeName}`}
            fill
            className="object-cover" // Conservez la classe pour le style
            priority // Ajoutez cette ligne si l'image est importante
            style={{ objectFit: "cover" }} // Utilisez style pour appliquer objectFit
          />
        </div>
      )}
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-semibold">{address.placeName}</h3>
          <div className="flex gap-2">
            <button
              onClick={handleShareAddressClick}
              className="text-blue-500 hover:text-blue-700 cursor-pointer"
            >
              <Share2 className="w-5 h-5" />
            </button>
            <button
              onClick={() => onDelete(address._id)}
              className="text-green-500 hover:text-green-700"
            >
              {address.isVerified ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <XCircle className="w-5 h-5 bg-red-500" />
              )}
            </button>
          </div>
        </div>

        {address.landmark && (
          <p className="flex items-center text-xs text-gray-500 mb-2">
            <MapPin className="w-4 h-4 inline mr-1" />
            {address.landmark}
          </p>
        )}
      </div>
    </div>
  );
}

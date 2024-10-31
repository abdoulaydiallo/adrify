"use client";

import Image from "next/image";
import { Share2, CheckCircle, MapPin } from "lucide-react";
import { ClientAddress, AddressType } from "../types";
import { useRouter } from "next/navigation";

interface AddressCardProps {
  address: ClientAddress;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function AddressCard({ address, onEdit, onDelete }: AddressCardProps) {
  const router = useRouter();

  const addressTypeColor: Record<AddressType, string> = {
    Résidence: "text-blue-800 border-blue-800",
    Bureau: "text-green-800 border-green-800",
    Magasin: "text-purple-800 border-purple-800",
  };

  const handleImageClick = () => {
    router.push(`/addresses/${address._id}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {address.imageUrl && (
        <div
          className="w-full relative"
          style={{ height: "180px", cursor: "pointer" }}
          onClick={handleImageClick}
        >
          <Image
            src={`${address.imageUrl}`}
            alt={`Image de ${address.placeName}`}
            layout="fill"
            objectFit="cover"
            className="object-cover"
          />
        </div>
      )}
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-semibold">{address.placeName}</h3>
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(address._id)}
              className="text-blue-500 hover:text-blue-700"
            >
              <Share2 className="w-5 h-5" />
            </button>
            <button
              onClick={() => onDelete(address._id)}
              className="text-green-500 hover:text-green-700"
            >
              <CheckCircle className="w-5 h-5" />
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

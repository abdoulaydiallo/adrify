"use client";
import React, { useState, useEffect } from "react";
import { Loader } from "lucide-react";
import { useAddresses } from "@/features/address/hooks";
import { AddressListProps, ClientAddress } from "@/features/address/types";
import { AddressCard } from "@/features/address/components";
import { AddressCardSkeleton } from "@/features/address/components";

export const AddressList = ({
  limit = 10,
  onAddressClick,
}: AddressListProps) => {
  const { addresses, loading, error } = useAddresses({
    limit,
    offset: 0,
  });

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (loading) {
    return <AddressCardSkeleton />;
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center">
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Erreur !</strong>
          <span className="block sm:inline"> {error.message}</span>
        </div>
      </div>
    );
  }

  if (addresses.length === 0) {
    return <div className="text-center py-4">Aucune adresse trouvée.</div>;
  }

  return (
    <div className="md:flex md:items-center space-y-2 gap-4 mt-4">
      {addresses.map((address: ClientAddress) => (
        <div key={address._id} className=" w-full lg:w-1/3">
          <AddressCard
            address={address}
            onEdit={() => {}}
            onDelete={() => {}}
          />
        </div>
      ))}
    </div>
  );
};

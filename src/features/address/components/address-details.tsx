"use client";

import { useRouter } from "next/navigation";
import { useAddress } from "@/features/address/hooks/use-address";
import { AddressDetailsSkeleton } from "./address-details-skeleton";
import { ErrorMessage } from "./error-message";
import { AddressInfo } from "./address-info";
import { ActionButtons } from "./action-buttons";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const Map = dynamic(() => import("@/components/map"), { ssr: false });

export const AddressDetails = ({ id }: { id: string }) => {
  const router = useRouter();
  const { address, loading: isLoading, error } = useAddress(id);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // ou un placeholder approprié
  }

  if (isLoading) {
    return (
      <div className="w-full" style={{ width: "100%" }}>
        <AddressDetailsSkeleton />
      </div>
    );
  }

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  if (!address) {
    return <ErrorMessage message="Address not found" />;
  }
  return (
    <div className="max-h-screen lg:flex items-start gap-4 justify-between mt-4">
      <div className="w-full">
        <AddressInfo address={address} />
      </div>
      <div className="w-full mt-2 min-h-screen bg-gray-200 overflow-hidden lg:mt-4">
        <Map
          center={[address.coordinates.latitude, address.coordinates.longitude]}
          onCenter={() => {}}
        />
      </div>
    </div>
  );
};

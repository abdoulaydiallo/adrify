"use client";

import { AddressDetailsSkeleton } from "./address-details-skeleton";
import { ErrorMessage } from "./error-message";
import { AddressInfo } from "./address-info";
import dynamic from "next/dynamic";
import { useShared } from "../hooks";

const Map = dynamic(() => import("@/components/map"), { ssr: false });

export const AddressSharedDetails = ({ token }: { token: any }) => {
  const { address, loading, error } = useShared(token);

  // Loading state
  if (loading) {
    return (
      <div className="w-full">
        <AddressDetailsSkeleton />
      </div>
    );
  }

  // Error state
  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  // Address not found state
  if (!address) {
    return <ErrorMessage message="Address not found" />;
  }

  // Main content rendering
  return (
    <div className="max-h-screen lg:flex items-start gap-4 justify-between mt-4">
      <div className="w-full">
        <AddressInfo address={address} />
      </div>
      <div className="w-full mt-2 min-h-screen bg-gray-200 overflow-hidden lg:mt-4">
        {address.coordinates && (
          <Map
            center={[
              address.coordinates.latitude,
              address.coordinates.longitude,
            ]}
            onCenter={() => {}}
            zoom={16}
          />
        )}
      </div>
    </div>
  );
};

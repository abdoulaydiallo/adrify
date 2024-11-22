"use client"

import { useSearchParams } from "next/navigation";
import { ErrorMessage } from "@/features/address/components/error-message";
import { AddressSharedDetails } from "@/features/address/components/address-shared-details";

export const AddressDetails = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  if (!token) {
    return (
      <ErrorMessage message="Votre lien est incorrect. Veuillez vérifier l'URL et réessayer." />
    );
  }

  return <AddressSharedDetails token={token} />;
};

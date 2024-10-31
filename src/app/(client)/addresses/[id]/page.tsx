"use client";
import { AddressDetails } from "@/features/address/components/address-details";
import { useParams } from "next/navigation";
import { Container } from "@/components/container";
export default function AddressDetailsPage() {
  const params = useParams();
  return (
    <Container>
      <AddressDetails id={params.id as string} />
    </Container>
  );
}

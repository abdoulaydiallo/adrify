import { Suspense } from "react";
import { Container } from "@/components/container";
import { AddressDetails } from "./components/address-details";

export default function AddressDetailsPage() {
  return (
    <Container>
      <Suspense fallback={<div>Chargement...</div>}>
        <AddressDetails />
      </Suspense>
    </Container>
  );
}

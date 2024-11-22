"use client";

import { Container } from "@/components/container";
import { Heading } from "@/components/heading/heading";
import { ShareAddressForm } from "@/features/address/components";
import { useParams } from "next/navigation";

const ShareAddressPage = () => {
  const params = useParams();
  return (
    <Container>
      <div className="mt-4">
        <Heading
          title="Partage d'adresse"
          subtitle="Envoyer cette addresse de manière simple securisé."
        />
        <ShareAddressForm addressId={params.id as string} />
      </div>
    </Container>
  );
};

export default ShareAddressPage;

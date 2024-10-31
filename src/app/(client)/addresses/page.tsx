import { AddressList } from "@/features/address/components";
import { Heading } from "@/components/heading/heading";
import { Container } from "@/components/container";

export default function MyAddresses() {
  return (
    <Container className="w-full mt-4">
      <Heading title="Mes Addresses" subtitle="Liste complète des addresses" />
      <AddressList />
    </Container>
  );
}

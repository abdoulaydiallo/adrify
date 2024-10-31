import { AddressActions } from "@/components/heading/address-actions";
import PartnerCard from "@/components/heading/partner-card";
import { Container } from "@/components/container";

export default function Home() {
  return (
    <Container>
      <div className="mt-4">
        <div className="flex items-start gap-4">
          <AddressActions />
          <PartnerCard />
        </div>
      </div>
    </Container>
  );
}

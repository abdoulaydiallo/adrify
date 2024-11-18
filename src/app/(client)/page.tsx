import { AddressActions } from "@/components/heading/address-actions";
import PartnerCard from "@/components/heading/partner-card";
import { Container } from "@/components/container";
import Sidebar from "@/components/sidebar/sidebar";

export default function Home() {
  return (
    <Container>
      <div className="mt-4">
        <div className="flex flex-col lg:flex-row items-start gap-4">
          <AddressActions />
          <PartnerCard />
        </div>
        <div className="">
          <Sidebar />
        </div>
      </div>
    </Container>
  );
}

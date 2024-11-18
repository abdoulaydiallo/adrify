import { Skeleton } from "@/components/ui/skeleton";
import { MapPin, Phone, Landmark, CheckCircle } from "lucide-react";

export const AddressDetailsSkeleton = () => (
  <div className="overflow-hidden flex flex-col gap-4">
    <div className="mt-1" style={{ height: "20px", width: "60%" }}>
      <Skeleton className="h-full w-full" />
    </div>
    <div className="mt-1" style={{ height: "20px", width: "30%" }}>
      <Skeleton className="h-full w-full" />
    </div>
    <div className="relative" style={{ height: "320px", width: "100%" }}>
      <Skeleton className="h-full w-full" />
    </div>
    <div className="relative" style={{ height: "320px", width: "100%" }}>
      <Skeleton className="h-full w-full" />
    </div>
  </div>
);

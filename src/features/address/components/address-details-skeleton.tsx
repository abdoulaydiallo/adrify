import { Skeleton } from "@/components/ui/skeleton";
import { MapPin, Phone, Landmark, CheckCircle } from "lucide-react";

export const AddressDetailsSkeleton = () => (
  <div className="overflow-hidden" style={{ width: "50%" }}>
    <div>
      <Skeleton className="h-8 w-full mb-4" style={{ width: "40%" }} />
      <Skeleton className="h-4 w-3/4 mb-4" style={{ width: "20%" }} />
    </div>
    <div className="relative" style={{ height: "320px", width: "50%" }}>
      <Skeleton className="h-full w-full" />
    </div>
    <div className="p-6 space-y-4">
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Landmark className="h-4 w-4" />
          <Skeleton className="h-4 w-2/3" style={{ width: "66%" }} />
        </div>
        <div className="flex items-center space-x-2">
          <Phone className="h-4 w-4" />
          <Skeleton className="h-4 w-1/2" style={{ width: "50%" }} />
        </div>
        <div className="flex items-center space-x-2">
          <MapPin className="h-4 w-4" />
          <Skeleton className="h-4 w-3/4" style={{ width: "75%" }} />
        </div>
        <div className="flex items-center space-x-2">
          <CheckCircle className="h-4 w-4" />
          <Skeleton className="h-4 w-1/3" style={{ width: "33%" }} />
        </div>
      </div>
    </div>
  </div>
);

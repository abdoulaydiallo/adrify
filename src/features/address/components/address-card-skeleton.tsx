import { Skeleton } from "@/components/ui/skeleton";

export const AddressCardSkeleton = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-4 overflow-hidden">
      <div className="w-full lg:w-1/3" style={{ height: "220px" }}>
        <Skeleton className="h-full w-full" />
      </div>
      <div className="w-full lg:w-1/3" style={{ height: "220px" }}>
        <Skeleton className="h-full w-full" />
      </div>
      <div className="w-full lg:w-1/3" style={{ height: "220px" }}>
        <Skeleton className="h-full w-full" />
      </div>
    </div>
  );
};

import { Skeleton } from "@/components/ui/skeleton";
export const UserButtonSkeleton = () => {
  return (
    <div>
      <Skeleton
        className="rounded-full"
        style={{ width: "2rem", height: "2rem" }}
      />
    </div>
  );
};

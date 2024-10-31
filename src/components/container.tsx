import { ContainerProps } from "@/types";
import { cn } from "@/lib/utils";

export const Container = ({
  children,
  className,
}: Readonly<ContainerProps>) => {
  return (
    <div className={cn(" px-2 md:px-6 lg:px-8", className)}>{children}</div>
  );
};

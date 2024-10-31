"use client";
import { HeadingProps } from "@/types/components";

export const Heading = ({ title, subtitle, center }: HeadingProps) => {
  return (
    <div className={center ? "text-center" : "text-start"}>
      <div className="text-xl font-bold">{title}</div>
      <div className="font-light text-neutral-500 mt-1">{subtitle}</div>
    </div>
  );
};


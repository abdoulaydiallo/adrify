import React from "react";
import { Button } from "@/components/ui/button";
import { ActionCardProps } from "@/types";
import Link from "next/link";

export const ActionCard = ({
  title,
  description,
  color,
  action,
  icon,
}: ActionCardProps) => (
  <div className=" bg-white p-2 mb-2">
    <div className="flex items-center mb-2">
      <div className={`text-2xl text-${color}-600 mr-2`}>{icon}</div>
      <h3 className="text-sm font-bold">{title}</h3>
    </div>
    <div className="text-justify">
      <p className="text-gray-500 text-xs mb-2 line-clamp-4">{description}</p>
    </div>
  </div>
);

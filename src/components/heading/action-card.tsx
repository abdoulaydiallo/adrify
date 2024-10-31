import React from "react";
import { Button } from "@/components/ui/button";
import { ActionCardProps } from "@/types";

export const ActionCard = ({
  title,
  description,
  color,
  action,
  icon,
}: ActionCardProps) => (
  <div className="bg-white p-2 mb-2">
    <div className="flex items-center mb-2">
      <div className={`text-2xl text-${color}-600 mr-2`}>{icon}</div>
      <h3 className="text-sm font-bold">{title}</h3>
    </div>
    <div className="text-left">
      <p className="text-gray-500 text-xs mb-2 line-clamp-2">{description}</p>
      <Button variant="link" size="sm" className={`text-sky-600 p-0 h-auto`}>
        {action}
      </Button>
    </div>
  </div>
);

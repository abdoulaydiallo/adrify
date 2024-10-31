import Link from "next/link";
import { SidebarItemProps } from "@/types";

export const SidebarItem = ({
  icon: Icon,
  label,
  href,
  isActive,
}: SidebarItemProps) => {
  return (
    <Link
      href={href}
      className={`flex items-center py-2 px-3 text-xs text-gray-500 rounded-md transition-colors ${
        isActive
          ? "bg-gray-100 text-gray-900"
          : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
      }`}
    >
      {Icon && (
        <Icon className="mr-2 size-4" weight={isActive ? "fill" : "regular"} />
      )}
      {label}
    </Link>
  );
};

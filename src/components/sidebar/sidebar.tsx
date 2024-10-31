"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { House, Clock, ShareNetwork } from "@phosphor-icons/react";
import SidebarSection from "./sidebar-section";
import { SidebarItem } from "./sidebar-item";
import {
  CheckSquareOffset,
  MapPinArea,
  Share,
  Star,
} from "@phosphor-icons/react/dist/ssr";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="hidden md:block w-58 h-screen bg-white text-gray-600 p-3 space-y-4 overflow-y-auto border-gray-200">
      {/* Section Dashboard */}
      <SidebarSection title="">
        <SidebarItem
          icon={House}
          label="Aperçu"
          href="/"
          isActive={pathname === "/"}
        />
        <SidebarItem
          icon={Star}
          label="Avec une étoile"
          href="/stars"
          isActive={pathname === "/stars"}
        />
      </SidebarSection>

      {/* Section Adresses */}
      <SidebarSection title="Adresses">
        <SidebarItem
          icon={MapPinArea}
          label="Mes Adresses"
          href="/addresses"
          isActive={pathname === "/addresses"}
        />
        <SidebarItem
          icon={CheckSquareOffset}
          label="Adresses vérifiées"
          href="/addresses/verified"
          isActive={pathname === "/addresses/verified"}
        />
        <SidebarItem
          icon={Clock}
          label="Historique des Adresses"
          href="/addresses/history"
          isActive={pathname === "/addresses/history"}
        />
      </SidebarSection>

      {/* Section Partages */}
      <SidebarSection title="Partages">
        <SidebarItem
          icon={Share}
          label="Partagé par d'autres"
          href="/received-addresses"
          isActive={pathname === "/received-addresses"}
        />
        <SidebarItem
          icon={ShareNetwork}
          label="Partagé par moi"
          href="/shared-addresses"
          isActive={pathname === "/shared-addresses"}
        />
      </SidebarSection>
    </div>
  );
};

export default Sidebar;

import React from "react";
import { UserButton } from "@/features/auth/components/user-button";

const DesktopNav = () => (
  <div className="hidden md:flex">
    <UserButton />
  </div>
);

export default DesktopNav;

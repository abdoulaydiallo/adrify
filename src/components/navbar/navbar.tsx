"use client";
import React from "react";
import DesktopNav from "./desktop-nav";
import MobileNav from "./mobile-nav";
import Logo from "../logo";

const Navbar= () => {
  return (
    <nav className="border-b">
      <div className="flex h-12 items-center px-4">
        <Logo />

        <div className="ml-auto flex items-center space-x-4">
          <DesktopNav />
          <MobileNav />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

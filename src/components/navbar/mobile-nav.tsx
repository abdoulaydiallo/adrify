import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";

const MobileNav = () => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="outline" size="icon" className="md:hidden">
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle menu</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem>
        <Link href="/">Accueil</Link>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <Link href="/apropos">À propos</Link>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <Link href="/services">Services</Link>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <Link href="/contact">Contact</Link>
      </DropdownMenuItem>
      <DropdownMenuItem>Se connecter</DropdownMenuItem>
      <DropdownMenuItem>S&apos;inscrire</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

export default MobileNav;

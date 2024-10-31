"use client"
import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { MainNavProps } from "@/types";

const MainNav= ({ className, ...props }: MainNavProps) => {
  const pathname = usePathname()
  
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href="/"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/" ? "text-primary" : "text-muted-foreground"
        )}
      >
        Accueil
      </Link>
      <Link
        href="/apropos"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/apropos" ? "text-primary" : "text-muted-foreground"
        )}
      >
        À propos
      </Link>
      <Link
        href="/services"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/services" ? "text-primary" : "text-muted-foreground"
        )}
      >
        Services
      </Link>
      <Link
        href="/contact"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/contact" ? "text-primary" : "text-muted-foreground"
        )}
      >
        Contact
      </Link>
    </nav>
  )
}

export default MainNav

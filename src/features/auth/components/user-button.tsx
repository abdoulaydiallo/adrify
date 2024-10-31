"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCurrentUser } from "../hooks/use-current-user";
import { Bell, Loader, LogOut, User } from "lucide-react";
import { useAuthActions } from "../hooks/use-auth-actions";
import { UserButtonSkeleton } from "@/features/auth/components/user-button-skeleton";

export const UserButton = () => {
  const { user, isLoading, error } = useCurrentUser();
  const { signOut } = useAuthActions();
  if (isLoading) return <UserButtonSkeleton />;
  if (!user) return null;

  const avatarFallBack = user.name.charAt(0).toUpperCase();
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="outline-none relative">
        <Avatar
          className="hover:opacity-75 transition"
          style={{ width: "2rem", height: "2rem" }}
        >
          <AvatarImage />
          <AvatarFallback
            className="text-sm"
            style={{ backgroundColor: "#374151", color: "white" }}
          >
            {avatarFallBack}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="bottom" className="w-60">
        <DropdownMenuItem>
          <User className="mr-2" style={{ width: "1rem", height: "1rem" }} />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Bell className="mr-2" style={{ width: "1rem", height: "1rem" }} />
          Notifications
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => signOut()}
          className="h-8 cursor-pointer"
        >
          <LogOut
            className="text-xs mr-2"
            style={{ width: "1rem", height: "1rem" }}
          />
          Se déconnecter
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

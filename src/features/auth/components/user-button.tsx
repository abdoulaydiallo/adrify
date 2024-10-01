"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCurrentUser } from "../hooks/use-current-user";
import { Loader, LogOut } from "lucide-react";
import { useAuthActions } from "../hooks/use-auth-actions";

export const UserButton = () => {
  const { user, isLoading, error } = useCurrentUser();
  const { signOut } = useAuthActions();
  if (isLoading)
    return <Loader className="animate-spin size-4 text-muted-foreground" />;
  if (!user) return null;

  const avatarFallBack = user.name.charAt(0).toUpperCase();
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="outline-none relative">
        <Avatar
          className=" hover:opacity-75 transition"
          style={{ width: "2.5rem", height: "2.5rem" }}
        >
          <AvatarImage />
          <AvatarFallback
            className="bg-sky-500"
            style={{ backgroundColor: "#0ea5e9", color: 'white' }}
          >
            {avatarFallBack}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" side="right" className="w-60">
        <DropdownMenuItem
          onClick={() => signOut()}
          className="h-10 cursor-pointer"
        >
          <LogOut className="size-4 mr-2" />
          Se déconnecter
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

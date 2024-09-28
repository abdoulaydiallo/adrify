"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SignInFlow } from "../types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SignUpCardProps {
  setState: (state: SignInFlow) => void;
}

export const SignUpCard = ({ setState }: SignUpCardProps) => {
  return (
    <Card className="w-full h-full p-8">
      <CardHeader className="px-0 pb-0">
        <CardTitle>S'inscrire</CardTitle>
        <CardDescription>
          Créer votre compte pour gérer vos addresses
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <form className="flex flex-col space-y-1.5">
          <Input
            value=""
            disabled={false}
            onChange={() => {}}
            type="text"
            placeholder="Nom complet"
            className="w-full"
            required
          />
          <Input
            value=""
            disabled={false}
            onChange={() => {}}
            type="text"
            placeholder="Numéro de téléphone"
            className="w-full"
            required
          />
          <Input
            value=""
            disabled={false}
            onChange={() => {}}
            type="password"
            placeholder="Mot de passe"
            className="w-full"
            required
          />
          <Input
            value=""
            disabled={false}
            onChange={() => {}}
            type="password"
            placeholder="Confirmer le mot de passe"
            className="w-full"
            required
          />
          <Button type="submit" className="w-full" size="lg" disabled={false}>
            Continue
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-muted-foreground">
          Vous avez déjà un compte ?{" "}
          <span
            className="text-sky-700 hover:underline cursor-pointer"
            onClick={() => setState("signIn")}
          >
            se connecter
          </span>
        </p>
      </CardFooter>
    </Card>
  );
};

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
import { useState, FormEvent } from "react";
import { PhoneInput } from "@/components/ui/phone-input";
import { parsePhoneNumber, isValidPhoneNumber } from "libphonenumber-js";
import { signIn } from "../api/auth";
import { TriangleAlert, CheckCircle2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { setSecureCookie } from "@/lib/utils";
import { useRouter } from "next/navigation";
interface SignInCardProps {
  setState: (state: SignInFlow) => void;
}

export const SignInCard = ({ setState }: SignInCardProps) => {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("+224");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: ({
      phoneNumber,
      password,
    }: {
      phoneNumber: string;
      password: string;
    }) => signIn({ phoneNumber, password }),
    onSuccess: (data) => {
      setSecureCookie("jwt", data.token, 1);
      setSecureCookie("userId", data.user._id, 1);
      setSuccess("Connexion réussie !");
      router.push("/");
    },
    onError: (error) => {
      console.error("Erreur de connexion:", error);
      setError("Erreur lors de la connexion. Veuillez réessayer.");
    },
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!isValidPhoneNumber(phoneNumber, "GN")) {
      setError("Numéro de téléphone invalide");
      return;
    }
    mutation.mutate({ phoneNumber, password });
  };

  const handlePhoneChange = (value: string | undefined) => {
    if (value) {
      const cleanedValue = value.replace(/[^\d+]/g, "");
      try {
        const parsedNumber = parsePhoneNumber(cleanedValue, "GN");
        if (parsedNumber && isValidPhoneNumber(parsedNumber.number, "GN")) {
          setPhoneNumber(parsedNumber.format("E.164"));
        } else {
          setPhoneNumber(cleanedValue);
        }
      } catch (error) {
        setPhoneNumber(cleanedValue);
      }
    } else {
      setPhoneNumber("+224");
    }
  };

  return (
    <Card className="h-full w-full p-8">
      <CardHeader className="px-0 pb-0">
        <CardTitle>Se connecter</CardTitle>
        <CardDescription>
          Connectez vous pour gérer vos addresses
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-5">
        <form onSubmit={handleSubmit} className="flex flex-col space-y-1.5">
          <PhoneInput
            value={phoneNumber}
            disabled={mutation.isPending}
            onChange={(value) => handlePhoneChange(value)}
            placeholder="Numéro de téléphone"
            className="w-full pl-12"
            required
            defaultCountry="GN"
            countries={["GN"]}
          />
          <Input
            value={password}
            disabled={mutation.isPending}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Mot de passe"
            className="w-full"
            required
          />
          {error && (
            <div
              className="w-full rounded-md flex items-center gap-2 text-sm"
              style={{
                backgroundColor: "rgba(239, 68, 68, 0.1)",
                color: "#ef4444",
                padding: "0.5rem",
              }}
            >
              <TriangleAlert className="size-4" />
              <p>{error}</p>
            </div>
          )}
          {success && (
            <div
              className="w-full rounded-md flex items-center gap-2 text-sm"
              style={{
                backgroundColor: "rgba(34, 197, 94, 0.1)",
                color: "#22c55e",
                padding: "0.5rem",
              }}
            >
              <CheckCircle2 className="size-4" />
              <p>{success}</p>
            </div>
          )}
          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Chargement..." : "Se connecter"}
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-muted-foreground">
          Vous n&apos;avez pas de compte ?{" "}
          <span
            className="hover:underline cursor-pointer"
            onClick={() => setState("signUp")}
            style={{ color: "#0369a1", cursor: "pointer" }}
          >
            s&apos;inscrire
          </span>
        </p>
      </CardFooter>
    </Card>
  );
};

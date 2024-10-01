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
import { PhoneInput } from "@/components/ui/phone-input";
import { useState, FormEvent, useEffect } from "react";
import { parsePhoneNumber, isValidPhoneNumber } from "libphonenumber-js";
import { useToast } from "@/components/ui/use-toast";
import { signUp } from "../api/auth";
import { TriangleAlert, CheckCircle2 } from "lucide-react";

interface SignUpCardProps {
  setState: (state: SignInFlow) => void;
  setPhoneNumber: (phoneNumber: string) => void;
}

export const SignUpCard = ({
  setState,
  setPhoneNumber: setParentPhoneNumber,
}: SignUpCardProps) => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("+224");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    setParentPhoneNumber(phoneNumber);
  }, [phoneNumber, setParentPhoneNumber]);

  const handlePhoneChange = (value: string | undefined) => {
    if (value) {
      // Garder seulement les chiffres et le '+'
      const cleanedValue = value.replace(/[^\d+]/g, "");

      try {
        const parsedNumber = parsePhoneNumber(cleanedValue, "GN");
        if (parsedNumber && isValidPhoneNumber(parsedNumber.number, "GN")) {
          setPhoneNumber(parsedNumber.format("E.164"));
        } else {
          setPhoneNumber(cleanedValue);
        }
      } catch (error) {
        // Si le numéro est partiel ou invalide, on garde la valeur nettoyée
        setPhoneNumber(cleanedValue);
      }
    } else {
      setPhoneNumber("+224");
    }
  };

  const validatePassword = (password: string) => {
    if (password.length < 6) {
      setPasswordError("Le mot de passe doit contenir au moins 6 caractères.");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    // Vérifier si le numéro de téléphone est valide
    const isPhoneValid = isValidPhoneNumber(phoneNumber, "GN");

    if (!isPhoneValid) {
      setError("Le numéro de téléphone n'est pas valide.");
      setIsLoading(false);
      return;
    }

    if (!validatePassword(password)) {
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await signUp({ name, phoneNumber, password });
      setSuccess("Votre compte a été créé avec succès.");
      // Attendre un peu avant de passer à l'étape suivante
      setTimeout(() => {
        setState("verifyPhone");
      }, 2000);
    } catch (error) {
      setError("Une erreur est survenue lors de l'inscription. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full h-full p-8">
      <CardHeader className="px-0 pb-0">
        <CardTitle>S&apos;inscrire</CardTitle>
        <CardDescription>
          Créer votre compte pour gérer vos addresses
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <form onSubmit={handleSubmit} className="flex flex-col space-y-1.5">
          <Input
            value={name}
            disabled={false}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Nom complet"
            className="w-full"
            required
          />
          <PhoneInput
            value={phoneNumber}
            disabled={false}
            onChange={(value) => handlePhoneChange(value)}
            placeholder="Numéro de téléphone"
            className="w-full pl-12"
            required
            defaultCountry="GN"
            countries={["GN"]}
          />
          <div className="space-y-1">
            <Input
              value={password}
              disabled={false}
              onChange={(e) => {
                setPassword(e.target.value);
                validatePassword(e.target.value);
              }}
              type="password"
              placeholder="Mot de passe"
              className="w-full"
              required
              minLength={6}
            />
            {passwordError && (
              <p className="text-xs py-1" style={{ color: "#ef4444" }}>
                {passwordError}
              </p>
            )}
          </div>
          <Input
            value={confirmPassword}
            disabled={false}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            placeholder="Confirmer le mot de passe"
            className="w-full"
            required
            minLength={6}
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
            disabled={
              password !== confirmPassword || isLoading || !!passwordError
            }
          >
            {isLoading ? "Chargement..." : "Continuer"}
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-muted-foreground">
          Vous avez déjà un compte ?{" "}
          <span
            className="text-sky-700 hover:underline"
            onClick={() => setState("signIn")}
            style={{ color: "#0369a1", cursor: "pointer" }} // Ajout d'un style inline pour forcer la couleur
          >
            se connecter
          </span>
        </p>
      </CardFooter>
    </Card>
  );
};

import { useState, FormEvent, useEffect } from "react";
import { TriangleAlert, CheckCircle2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { verifyPhoneNumber } from "../api/auth";

interface VerifyPhoneCardProps {
  phoneNumber: string;
  onVerificationSuccess: () => void;
}

export const VerifyPhoneCard = ({
  phoneNumber,
  onVerificationSuccess,
}: VerifyPhoneCardProps) => {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorCount, setErrorCount] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (errorCount >= 3) {
      setIsBlocked(true);
      setError(
        "Compte bloqué. Trop de tentatives échouées. Veuillez réessayer plus tard."
      );
    }
  }, [errorCount]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isBlocked) return;
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await verifyPhoneNumber(phoneNumber, otp);
      setSuccess("Votre numéro de téléphone a été vérifié avec succès.");
      setTimeout(() => {
        onVerificationSuccess();
      }, 2000); // Attendre 2 secondes avant de passer à l'étape suivante
    } catch (error) {
      setErrorCount((prev) => prev + 1);
      setError(
        `Code de vérification incorrect. Il vous reste ${
          3 - errorCount
        } tentative(s).`
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full h-full p-8">
      <CardHeader className="px-0 pb-0">
        <CardTitle>Vérification</CardTitle>
        <CardDescription>
          Entrez le code de vérification envoyé à votre téléphone.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-between space-y-1.5"
        >
          <InputOTP
            maxLength={6}
            value={otp}
            onChange={(value) => setOtp(value)}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={isLoading || isBlocked}
          >
            {isLoading
              ? "Vérification..."
              : isBlocked
              ? "Compte bloqué"
              : "Vérifier"}
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        {error && (
          <div
            className="max-w-[200px] rounded-md flex items-center gap-2 text-sm"
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
            className="max-w-[300px] rounded-md flex items-center gap-2 text-sm"
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
      </CardFooter>
    </Card>
  );
};

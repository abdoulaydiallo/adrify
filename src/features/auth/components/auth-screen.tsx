"use client";

import { useState } from "react";
import { SignInFlow } from "../types";
import { SignInCard } from "./sign-in-card";
import { SignUpCard } from "./sign-up-card";
import { VerifyPhoneCard } from "./verify-phone-card"; // Nouveau composant à créer

export const AuthScreen = () => {
  const [state, setState] = useState<SignInFlow>("signIn");
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);

  const handleVerificationSuccess = () => {
    setState("signIn");
  };

  return (
    <div
      className="h-full flex items-center justify-center"
      style={{ backgroundColor: "#0369a1" }}
    >
      <div className="md:h-full" style={{ maxWidth: '320px' }}>
        {state === "signIn" && <SignInCard setState={setState} />}
        {state === "signUp" && (
          <SignUpCard setState={setState} setPhoneNumber={setPhoneNumber} />
        )}
        {state === "verifyPhone" && phoneNumber && (
          <VerifyPhoneCard
            phoneNumber={phoneNumber}
            onVerificationSuccess={handleVerificationSuccess}
          />
        )}
      </div>
    </div>
  );
};

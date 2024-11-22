"use client";

import React, { useCallback, useState } from "react";
import { shareAddress } from "../api/address";
import { PhoneInput } from "@/components/ui/phone-input";
import { isValidPhoneNumber, parsePhoneNumber } from "libphonenumber-js";
import { FormErrors } from "../types";
import { Button } from "@/components/ui/button";
import { useAddressActions } from "../hooks";

export const ShareAddressForm = ({ addressId }: { addressId: string }) => {
  const { share, loading } = useAddressActions();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: any = {};

    // Validation
    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = "Le numéro de téléphone est requis";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      await share(addressId, {phoneNumber});
      setMessage("Adresse partagée avec succès");
    } catch (error) {
      console.error(error);
      setMessage("Erreur lors du partage de l'adresse");
    } finally {
      setIsSubmitting(false);
    }
};
    
  const handlePhoneChange = useCallback((value: string | undefined) => {
    if (!value) {
      setPhoneNumber("+224");
      return;
    }

    if (!value.startsWith("+224")) {
      value = "+224" + value.replace(/[^\d]/g, "");
    }

    try {
      const parsedNumber = parsePhoneNumber(value, "GN");
      if (parsedNumber && isValidPhoneNumber(parsedNumber.number, "GN")) {
        setPhoneNumber(parsedNumber.format("E.164"));
        setErrors((prev) => ({ ...prev, phoneNumber: undefined }));
      } else {
        setPhoneNumber(value);
        if (value.length > 12) {
          setErrors((prev) => ({ ...prev, phoneNumber: "Numéro invalide" }));
        }
      }
    } catch (error) {
      setPhoneNumber(value);
    }
  }, []);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-1.5 mb-4">
      <div className="space-y-4">
        <div>
          <PhoneInput
            value={phoneNumber}
            onChange={handlePhoneChange}
            placeholder="Numéro de téléphone"
            className={`w-full mt-2 ${
              errors.phoneNumber ? "border-red-500" : ""
            }`}
            defaultCountry="GN"
            countries={["GN"]}
            international={false}
            required
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
          )}
        </div>
        <Button
          type="submit"
          className="w-full my-4 rounded-none"
          disabled={isSubmitting || loading}
        >
          {isSubmitting || loading ? "Envoi en cours..." : "Envoyer"}
        </Button>
      </div>
    </form>
  );
};

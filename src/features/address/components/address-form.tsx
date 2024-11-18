"use client";

import { useState, FormEvent, useCallback, useEffect } from "react";
import Map from "@/components/map";
import { Container } from "@/components/container";
import { Heading } from "@/components/heading/heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import { parsePhoneNumber, isValidPhoneNumber } from "libphonenumber-js";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormErrors } from "../types";
import { useAddressActions } from "../hooks/use-address-actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const AddressForm = () => {
  const router = useRouter();
  const [placeName, setPlaceName] = useState("");
  const [addressType, setAddressType] = useState("");
  const [landmark, setLandmark] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("+224");
  const [image, setImage] = useState<File | null>(null);
  const [latlng, setLatlng] = useState<L.LatLngExpression | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { create, loading } = useAddressActions();

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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (file.size > maxSize) {
        setErrors((prev) => ({
          ...prev,
          image: "L'image ne doit pas dépasser 5MB",
        }));
        return;
      }

      setImage(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      setErrors((prev) => ({ ...prev, image: undefined }));
    }
  };

  const handleCenter = useCallback(({ lat, lng }: L.LatLngExpression | any) => {
    setLatlng({ lat, lng });
    setErrors((prev) => ({ ...prev, location: undefined }));
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: any = {};

    // Validation
    if (!placeName.trim()) {
      newErrors.placeName = "Le nom de l'adresse est requis";
    }
    if (!addressType.trim()) {
      newErrors.addressType = "Le type d'adresse est requis";
    }
    if (!latlng) {
      newErrors.location = "La localisation est requise";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("placeName", placeName);
      formData.append("addressType", addressType);
      formData.append("landmark", landmark);
      formData.append("phoneNumber", phoneNumber);
      if (image) formData.append("image", image);
      if (latlng && "lat" in latlng && "lng" in latlng) {
        formData.append("latitude", latlng.lat.toString());
        formData.append("longitude", latlng.lng.toString());
      }

      await create(formData);
      toast.success("Adresse créée avec succès");
      router.push('/addresses');
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de la création de l'adresse");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    return () => {
      // Nettoyer l'URL de prévisualisation lors du démontage
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  return (
    <Container>
      <div className="mt-4">
        <Heading
          title="Nouvelle Adresse"
          subtitle="Ajouter une nouvelle addresse."
        />
        <form
          onSubmit={handleSubmit}
          className="flex flex-col space-y-1.5 mb-4"
        >
          <div className="space-y-4">
            <div>
              <Input
                id="placeName"
                value={placeName}
                onChange={(e) => {
                  setPlaceName(e.target.value);
                  setErrors((prev) => ({ ...prev, placeName: undefined }));
                }}
                type="text"
                placeholder="Nom ou numero de l'adresse"
                className={`w-full mt-2 ${
                  errors.placeName ? "border-red-500" : ""
                }`}
                required
                aria-label="Nom ou numéro de l'adresse"
              />
              {errors.placeName && (
                <p className="text-red-500 text-sm mt-1">{errors.placeName}</p>
              )}
            </div>

            <div>
              <Select
                value={addressType}
                onValueChange={(value) => {
                  setAddressType(value);
                  setErrors((prev) => ({ ...prev, addressType: undefined }));
                }}
              >
                <SelectTrigger
                  className={`w-full mt-2 ${
                    errors.addressType ? "border-red-500" : ""
                  }`}
                >
                  <SelectValue placeholder="Type d'adresse" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Résidence">Résidence</SelectItem>
                  <SelectItem value="Bureau">Bureau</SelectItem>
                  <SelectItem value="Magasin">Magasin</SelectItem>
                </SelectContent>
              </Select>
              {errors.addressType && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.addressType}
                </p>
              )}
            </div>

            <Input
              id="landmark"
              value={landmark}
              onChange={(e) => setLandmark(e.target.value)}
              type="text"
              placeholder="Point de repère"
              className="w-full mt-2"
              required
              aria-label="Point de repère"
            />

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
                <p className="text-red-500 text-sm mt-1">
                  {errors.phoneNumber}
                </p>
              )}
            </div>

            <div>
              <Input
                id="image"
                onChange={handleImageChange}
                type="file"
                accept="image/*"
                placeholder="upload l'image de l'adresse"
                className="w-full mt-2"
                aria-label="Image de l'adresse"
              />
              {imagePreview && (
                <div className="mt-2">
                  <img
                    src={imagePreview}
                    alt="Prévisualisation"
                    style={{
                      width: "auto",
                      height: "200px",
                      borderRadius: "0.375rem",
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          <div>
            <Map locate onCenter={handleCenter} />
            {errors.location && (
              <p className="text-red-500 text-sm mt-1">{errors.location}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full my-4 rounded-none"
            disabled={isSubmitting || loading}
          >
            {isSubmitting || loading ? "Envoi en cours..." : "Envoyer"}
          </Button>
        </form>
      </div>
    </Container>
  );
};

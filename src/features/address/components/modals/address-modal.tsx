"use client";

import { nanoid } from "nanoid";
import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";

import { useAddressModal } from "@/features/address/hooks";

import Modal from "./modal";
import { Heading } from "@/components/heading/heading";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
}

interface AddressModalProps {
  user?: Record<string, any>;
}

const AddressModal: React.FC<AddressModalProps> = ({ user }) => {
  const uniqueLink = nanoid(10);
  const router = useRouter();
  const userid = parseInt(user?.id as any, 10);
  const addressModal = useAddressModal();

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [step, setStep] = useState(STEPS.LOCATION);
  const [latlng, setLatlng] = useState<L.LatLngExpression | null>(null);
  const [isPanding, startTransition] = useTransition();

  // Soumission du formulaire

  // les actions sur le formulaires
  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.IMAGES) {
      return "Create";
    }

    return "Suivant";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }

    return "Retour";
  }, [step]);

  const handleCenter = ({ lat, lng }: L.LatLngExpression | any) => {
    setLatlng({ lat, lng });
  };

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Quelle option décrit le mieux votre lieu ?"
        subtitle="Choisissez une catégorie"
      />
    </div>
  );

  return (
    <Modal
      isOpen={addressModal.isOpen}
      onClose={addressModal.onClose}
      onSubmit={() => {}}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      title="Ajouter votre adresse"
      body={bodyContent}
    />
  );
};

export default AddressModal;

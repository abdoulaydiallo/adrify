import React from "react";
import {
  ShareNetwork,
  MapPinArea,
  ShieldCheck,
} from "@phosphor-icons/react/dist/ssr";
import { ActionCard } from "./action-card";

export const AddressActions = () => (
  <div className="w-full lg:w-3/4 h-48 border border-gray-200 rounded-lg p-4">
    <h2 className="text-md font-bold mb-2">Outils recommandés pour vous</h2>
    <div className="grid grid-cols-3 gap-2">
      <ActionCard
        title="Ajouter"
        description="Créer, enregistrer, localiser, gérer des adresses."
        color="blue"
        action="Create"
        icon={
          <MapPinArea
            size={24}
            weight="duotone"
            color="#dc2626"
            className="text-blue-200"
          />
        }
      />
      <ActionCard
        title="Vérifier"
        description="Vérifier, confirmer, valider, garantir l'exactitude."
        color="green"
        action="verified"
        icon={
          <ShieldCheck
            size={24}
            weight="duotone"
            color="#22C55E"
            className="text-green-200"
          />
        }
      />
      <ActionCard
        title="Partager"
        description="Envoyer, partager, transmettre, collaborer avec d'autres."
        color="yellow"
        action="Partager"
        icon={
          <ShareNetwork
            size={24}
            weight="duotone"
            color="#EAB308"
            className="text-yellow-200"
          />
        }
      />
    </div>
  </div>
);

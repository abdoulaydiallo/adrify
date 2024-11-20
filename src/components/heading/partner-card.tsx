import { BuildingApartment, MapPinArea } from "@phosphor-icons/react/dist/ssr";
import React from "react";

const PartnerCard = () => {
  return (
    <div className="hidden lg:block w-1/3 p-4 h-48 bg-white border border-gray-200 rounded-lg">
      <h2 className="flex items-center gap-2 text-sm lg:text-md font-bold mb-2 line-clamp-1">
        <BuildingApartment
          size={32}
          weight="duotone"
          color="#3B82F6"
          className="text-blue-200"
        />
        Ouvrez un compte partenaire
      </h2>
      <p className="text-xs text-gray-500 mb-6 line-clamp-3">
        Intégrez le système Adrify dans votre entreprise. Profitez d&apos;outils
        exclusifs pour améliorer vos services et offrir une meilleure expérience
        à vos clients.
      </p>
      <button className=" text-xs py-2 px-4 border-2 border-gray-700 hover:bg-gray-700 hover:text-white transition duration-200 rounded-full">
        Devenir partenaire
      </button>
    </div>
  );
};

export default PartnerCard;

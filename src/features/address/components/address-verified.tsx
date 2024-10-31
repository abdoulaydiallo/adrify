import React from 'react';

type PropriétésAdresseVérifiée = {
  nom: string;
  numéroTéléphone: string;
  adresse: {
    rue: string;
    ville: string;
    codePostal: string;
    pays: string;
  };
  coordonnées: {
    latitude: number;
    longitude: number;
  };
  urlPhotoBâtiment: string;
  urlCarte: string;
};

const AdresseVérifiée: React.FC<PropriétésAdresseVérifiée> = ({
  nom,
  numéroTéléphone,
  adresse,
  coordonnées,
  urlPhotoBâtiment,
  urlCarte
}) => {
  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md max-w-sm mx-auto">
      {/* Informations de l'utilisateur */}
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 rounded-full bg-gray-300">
          {/* Photo de profil de l'utilisateur (optionnelle) */}
        </div>
        <div className="ml-3">
          <p className="text-lg font-semibold">{nom}</p>
          <p className="text-sm text-gray-600">{numéroTéléphone}</p>
        </div>
      </div>

      {/* Badge vérifié */}
      <div className="flex items-center mb-4">
        <div className="bg-green-500 text-white rounded-full px-2 py-1 text-xs font-bold">VÉRIFIÉ</div>
      </div>

      {/* Informations sur l'adresse */}
      <div className="w-full text-center mb-4">
        <p className="font-semibold">{adresse.rue}</p>
        <p>{adresse.ville}, {adresse.codePostal}</p>
        <p>{adresse.pays}</p>
      </div>

      {/* Coordonnées GPS */}
      <div className="w-full text-center mb-4">
        <p className="text-sm text-gray-600">
          Latitude: {coordonnées.latitude}, Longitude: {coordonnées.longitude}
        </p>
      </div>

      {/* Photo du bâtiment */}
      <div className="w-full h-48 bg-gray-200 mb-4 rounded-lg">
        <img src={urlPhotoBâtiment} alt="Bâtiment" className="w-full h-full object-cover rounded-lg" />
      </div>

      {/* Carte */}
      <div className="w-full h-48 bg-gray-200 rounded-lg">
        <img src={urlCarte} alt="Carte" className="w-full h-full object-cover rounded-lg" />
      </div>
    </div>
  );
};

export default AdresseVérifiée;

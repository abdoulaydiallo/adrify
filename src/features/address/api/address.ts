import {
    ClientAddress,
    AddressInput,
    AddressSearchParams,
    ShareWithData,
    SimpleAddressHistory, 
    ShareAddressResponse
} from '../types';

import { ApiError, ConfigurationError } from '../errors';

const apiUrl = process.env.NEXT_PUBLIC_API_CLIENT;

function checkApiUrl() {
  if (!apiUrl) {
    throw new ConfigurationError("L'URL de l'API n'est pas définie dans le fichier .env");
  }
}

// Ajout d'un mécanisme de cache simple pour les réponses GET
const cache: { [key: string]: { data: any; timestamp: number } } = {};
const CACHE_EXPIRATION_TIME = 5 * 60 * 1000; // 5 minutes
const MAX_CACHE_SIZE = 100; // Limite du nombre d'entrées dans le cache

function manageCacheSize() {
    const keys = Object.keys(cache);
    if (keys.length > MAX_CACHE_SIZE) {
        delete cache[keys[0]]; // Supprime l'entrée la plus ancienne
    }
}

async function fetchWithAuth(url: string, options: RequestInit, token: string): Promise<Response> {
    checkApiUrl();
    
    const now = Date.now();
    // Vérification du cache pour les requêtes GET
    if (options.method === "GET" && cache[url] && (now - cache[url].timestamp < CACHE_EXPIRATION_TIME)) {
        return Promise.resolve(new Response(JSON.stringify(cache[url].data), { status: 200 }));
    }

    const response = await fetch(`${apiUrl}${url}`, {
        ...options,
        headers: {
            ...options.headers,
            "Authorization": `Bearer ${token}`
        }
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.log(errorData);
        throw new ApiError(response.status, errorData.message || "Une erreur est survenue lors de l'opération");
    }

    // Mise en cache de la réponse pour les requêtes GET
    if (options.method === "GET") {
        const data = await response.json();
        cache[url] = { data, timestamp: now }; // Stockage dans le cache avec timestamp
        manageCacheSize(); // Gestion de la taille du cache
        return new Response(JSON.stringify(data), { status: 200 });
    }

    return response;
}

export const createAddress = async (formData: FormData, token: string): Promise<ClientAddress> => {
  console.log('FormData content before send:');
  for (const [key, value] of Array.from(formData.entries())) {
    console.log(key + ': ' + value);
  }

  const response = await fetch(`${apiUrl}/addresses`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: formData
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Error response:', errorText);
    try {
      const errorJson = JSON.parse(errorText);
      throw new Error(errorJson.message || 'Failed to create address');
    } catch {
      throw new Error(`Failed to create address: ${response.status}`);
    }
  }

  return response.json();
};

export async function getAddressById(addressId: string, token: string): Promise<ClientAddress> {
  const response = await fetchWithAuth(`/addresses/${addressId}`, { method: "GET" }, token);
  return response.json();
}

export async function shareAddress(addressId: string, token: string, shareData: ShareWithData): Promise<ShareAddressResponse> {
  const response = await fetchWithAuth(`/addresses/${addressId}/share`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(shareData)
  }, token);

  return response.json();
}

export async function getAddressHistory(addressId: string, token: string): Promise<SimpleAddressHistory[]> {
  const response = await fetchWithAuth(`/addresses/${addressId}/history`, { method: "GET" }, token);
  return response.json();
}

export async function updateAddress(addressId: string, addressData: Partial<AddressInput>, token: string): Promise<ClientAddress> {
  const response = await fetchWithAuth(`/addresses/${addressId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(addressData)
  }, token);

  return response.json();
}

export async function deleteAddress(addressId: string, token: string): Promise<void> {
  await fetchWithAuth(`/addresses/${addressId}`, { method: "DELETE" }, token);
  delete cache[`/addresses/${addressId}`]; // Invalidation du cache
}

export async function searchAddresses(params: AddressSearchParams, token: string): Promise<ClientAddress[]> {
   
  const queryString = new URLSearchParams(
    Object.entries(params).filter(([, value]) => value !== undefined) as [string, string][]
  ).toString();
    const response = await fetchWithAuth(`/addresses/search?${queryString}`, {
        method: 'GET',
        headers: {
        "Content-Type": "application/json",
            },
        },
    token);
    
  return response.json();
}

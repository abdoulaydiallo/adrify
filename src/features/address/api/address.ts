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

async function fetchWithAuth(url: string, options: RequestInit, token: string): Promise<Response> {
    checkApiUrl();
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

  return response;
};

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

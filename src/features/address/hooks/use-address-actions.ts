'use client';

import { useState } from 'react';
import {
    AddressInput,
    ShareWithData,
    ShareAddressResponse,
    Address
} from '../types';
import {
    createAddress,
    updateAddress,
    deleteAddress,
    shareAddress
} from '../api/address';
import { getToken } from '@/lib/utils';

interface AddressActions {
  create: (data: FormData) => Promise<any>;
  update: (addressId: string, data: Partial<AddressInput>) => Promise<any>;
  remove: (addressId: string) => Promise<void>;
  share: (addressId: string, shareData: ShareWithData) => Promise<ShareAddressResponse>;
  loading: boolean;
  error: Error | null;
}

export const useAddressActions = (): AddressActions => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const token = getToken();

  const transformAddressData = (address: any): Address => {
    return {
      ...address,
      imageUrl: address.imageUrl 
        ? `${process.env.NEXT_PUBLIC_UPLOAD_URL}/${address.imageUrl}`
        : null
    };
  };

  const create = async (formData: FormData) => {
    if (!token) throw new Error('Not authenticated');
    setLoading(true);
    setError(null);
    try {
      const result = await createAddress(formData, token);
      return transformAddressData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const update = async (addressId: string, addressData: Partial<AddressInput>) => {
    if (!token) throw new Error('Not authenticated');
    setLoading(true);
    setError(null);
    try {
      const result = await updateAddress(addressId, addressData, token);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const remove = async (addressId: string) => {
    if (!token) throw new Error('Not authenticated');
    setLoading(true);
    setError(null);
    try {
      await deleteAddress(addressId, token);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const share = async (addressId: string, shareData: ShareWithData): Promise<ShareAddressResponse> => {
    if (!token) throw new Error('Not authenticated');
    setLoading(true);
    setError(null);
    try {
      const result = await shareAddress(addressId, token, shareData);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      throw err;
    } finally {
      setLoading(false);
    }
  };

 return { create, update, remove, share, loading, error };
}

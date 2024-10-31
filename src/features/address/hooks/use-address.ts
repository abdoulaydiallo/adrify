'use client';

import { useState, useEffect } from 'react';
import { ClientAddress } from '../types';
import { getAddressById } from '../api/address';
import { getToken } from '@/lib/utils';

export function useAddress(addressId: string) {
  const [address, setAddress] = useState<ClientAddress | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const token = getToken();

  useEffect(() => {
    if (!token) {
      setError(new Error('Not authenticated'));
      setLoading(false);
      return;
    }

    let isMounted = true;
    const fetchAddress = async () => {
      try {
        setLoading(true);
        const result = await getAddressById(addressId, token);
        if (isMounted) {
          setAddress(result);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('An unknown error occurred'));
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchAddress();

    return () => {
      isMounted = false;
    };
  }, [addressId, token]);

  return { address, loading, error };
}

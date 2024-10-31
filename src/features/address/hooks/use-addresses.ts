'use client';

import { useState, useEffect } from 'react';
import { ClientAddress, AddressSearchParams } from '../types';
import { searchAddresses } from '../api/address';
import { getToken } from '@/lib/utils';

export function useAddresses(initialParams?: AddressSearchParams) {
  const [addresses, setAddresses] = useState<ClientAddress[]>([]);
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
      const fetchAddresses = async () => {
          
      try {
        setLoading(true);
        const result = await searchAddresses(initialParams || {}, token);
        if (isMounted) {
          setAddresses(result);
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

    fetchAddresses();

    return () => {
      isMounted = false;
    };
  }, [token, JSON.stringify(initialParams)]);

  return { addresses, loading, error };
}

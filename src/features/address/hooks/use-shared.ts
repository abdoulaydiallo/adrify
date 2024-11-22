import { useEffect, useState } from "react";
import { ClientAddress } from "../types";
import { retrieveShareToken } from "../api/address";

export function useShared(tokenMapping: string) {
  const [address, setAdress] = useState<ClientAddress | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
    
    useEffect(() => {
        let isMounted = true;

        const getTokenMapping = async () => {
            try {
                setLoading(true);
                const result = await retrieveShareToken(tokenMapping);
                    if (isMounted) {
                        setAdress(result?.shareToken?.address);
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
        }
        getTokenMapping();

    return () => {
      isMounted = false;
    };
    }, [tokenMapping])
    
  return { address, loading, error };
}
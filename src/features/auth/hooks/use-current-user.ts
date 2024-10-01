import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchUserById } from "../api/auth";
import { getToken, getUserId } from "@/lib/utils";

const fetchUser = async (queryClient: ReturnType<typeof useQueryClient>, token: string) => {
  const cachedUser = queryClient.getQueryData<Record<string, any>>(["user"]);
  const userId = cachedUser?._id || getUserId();

  if (!userId) return null;

  try {
    const user = await fetchUserById(userId, token);
    queryClient.setQueryData(["user"], user);
    return user;
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur:", error);
    queryClient.setQueryData(["user"], null);
    return null;
  }
};

export const useCurrentUser = () => {
  const queryClient = useQueryClient();
  const { data: user, isLoading, error } = useQuery({
    queryKey: ["user"],
    queryFn: () => {
      const token = getToken();
      if (!token) return null;
      return fetchUser(queryClient, token);
    },
    staleTime: 300000, // 5 minutes
  });

  return { user, isLoading, error };
};


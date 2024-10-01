import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const removeCookie = (name: string) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

export const useAuthActions = () => {
    const queryClient = useQueryClient();
    const router = useRouter();

    const signOut = () => {
        // Supprimer le token et l'ID utilisateur des cookies
        ['jwt', 'userId'].forEach(removeCookie);

        // Supprimer les données de l'utilisateur du cache
        queryClient.removeQueries({ queryKey: ["user"] });

        // Rediriger vers la page d'authentification
        router.push("/auth");
    };

    return { signOut };
};
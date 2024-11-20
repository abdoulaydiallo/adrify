let apiUrl = process.env.NEXT_PUBLIC_API_URL;
import { SignUpData, SignUpResponse, SignInData, SignInResponse, User } from "../types";

export const fetchUserById = async (userId: string, token: string): Promise<User> => {
  if (!apiUrl) {
    console.error("L'URL de l'API n'est pas définie dans le fichier .env");
    throw new Error("Configuration de l'API manquante");
  }

  try {
    const response = await fetch(`${apiUrl}/users/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Une erreur est survenue lors de la récupération des données utilisateur");
    }

    return response.json();
  } catch (error) {
    console.error("Erreur lors de la récupération des données utilisateur :", error);
    throw error;
  }
};


export const signUp = async (data: SignUpData): Promise<SignUpResponse> => {
  if (!apiUrl) {
    console.error("L'URL de l'API n'est pas définie dans le fichier .env");
    throw new Error("Configuration de l'API manquante");
  }

  try {
    const response = await fetch(`${apiUrl}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Une erreur est survenue lors de l'inscription");
    }

    return response.json();
  } catch (error) {
    console.error("Erreur lors de l'inscription :", error);
    throw error;
  }
};

export const signIn = async (data: SignInData): Promise<SignInResponse> => {
  if (!apiUrl) {
    console.error("L'URL de l'API n'est pas définie dans le fichier .env");
    throw new Error("Configuration de l'API manquante");
  }

  try {
    const response = await fetch(`${apiUrl}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Une erreur est survenue lors de la connexion");
    }

    const responseData = await response.json();
    return {
      user: responseData.user,
      token: responseData.token
    };
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    throw error;
  }
};

export const verifyPhoneNumber = async (phoneNumber: string, otp: string): Promise<void> => {
  
  if (!apiUrl) {
    console.error("L'URL de l'API n'est pas définie dans le fichier .env");
    throw new Error("Configuration de l'API manquante");
  }

  try {
    const response = await fetch(`${apiUrl}/users/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phoneNumber, verificationCode: otp }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Une erreur est survenue lors de la vérification du numéro de téléphone");
    }

    // Si la réponse est OK, on ne retourne rien (void)
  } catch (error) {
    console.error("Erreur lors de la vérification du numéro de téléphone :", error);
    throw error;
  }
};



export type SignInFlow = "signIn" | "signUp" | "verifyPhone";

export interface SignUpData {
  name: string;
  phoneNumber: string;
  password: string;
}

export  interface SignUpResponse {
  user: {
    id: string;
    name: string;
    phoneNumber: string;
  };
  token: string;
}

export interface SignInData {
  phoneNumber: string;
  password: string;
}

export interface SignInResponse {
  user: Record<string, any>;
  token: string;
}

export interface User {
  id: string;
  name: string;
  phoneNumber: string;
}

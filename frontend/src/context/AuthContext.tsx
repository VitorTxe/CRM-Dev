import { signInWithPopup } from "firebase/auth";
import { createContext, type ReactNode, useContext, useState } from "react";
import { firebaseAuth, googleAuthProvider } from "../config/firebase";
import type { AuthState } from "../types/auth";

interface AuthContextProps {
  authState: AuthState;
  signWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const Authprovider = ({ children }: { children: ReactNode }) => {
  const [authState, _setAuthState] = useState<AuthState>({
    user: null,
    error: null,
    loading: false,
  });

  const signWithGoogle = async (): Promise<void> => {
    try {
      await signInWithPopup(firebaseAuth, googleAuthProvider);
    } catch (error: unknown) {
      console.error("Erro durante a autenticação com Google:", error);
    }
  };

  const signOut = async (): Promise<void> => {};

  return (
    <AuthContext.Provider value={{ authState, signWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um provider");
  }

  return context;
};

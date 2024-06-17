import { createContext, useContext, useState } from "react";

const STORAGE_KEYS = {
  ROLE: "role",
  TOKEN: "token",
};

type AuthProviderState = {
  role: "admin" | "moderator" | "user" | null;
  token: string | null;
  manageLogin: (
    token: AuthProviderState["token"],
    role: AuthProviderState["role"]
  ) => void;
};

const initialState: AuthProviderState = {
  role: null,
  token: null,
  manageLogin: () => {},
};

const AuthProviderContext = createContext<AuthProviderState>(initialState);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<AuthProviderState["role"]>(
    () => localStorage.getItem(STORAGE_KEYS.ROLE) as AuthProviderState["role"]
  );
  const [token, setToken] = useState<AuthProviderState["token"]>(() =>
    localStorage.getItem(STORAGE_KEYS.TOKEN)
  );

  const manageLogin = (
    token: AuthProviderState["token"],
    role: AuthProviderState["role"]
  ) => {
    setRole(role);
    setToken(token);

    if (role) {
      localStorage.setItem(STORAGE_KEYS.ROLE, role);
    } else {
      localStorage.removeItem(STORAGE_KEYS.ROLE);
    }

    if (token) {
      localStorage.setItem(STORAGE_KEYS.TOKEN, token);
    } else {
      localStorage.removeItem(STORAGE_KEYS.TOKEN);
    }
  };

  const value = {
    token,
    role,
    manageLogin,
  };

  return (
    <AuthProviderContext.Provider value={value}>
      {children}
    </AuthProviderContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthProviderContext);

  if (context === undefined)
    throw new Error("useAuth must be used within a AuthProvider");

  return context;
};

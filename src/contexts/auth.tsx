import { createContext, useContext, useState } from "react";

const STORAGE_KEYS = {
  ROLE: "roles",
  TOKEN: "token",
};

type AuthProviderState = {
  roles: ("admin" | "moderator" | "user")[] | null;
  token: string | null;
  manageLogin: (
    token: AuthProviderState["token"],
    role: AuthProviderState["roles"]
  ) => void;
};

const initialState: AuthProviderState = {
  roles: null,
  token: null,
  manageLogin: () => {},
};

const AuthProviderContext = createContext<AuthProviderState>(initialState);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [roles, setRole] = useState<AuthProviderState["roles"]>(
    () => localStorage.getItem(STORAGE_KEYS.ROLE) as AuthProviderState["roles"]
  );
  const [token, setToken] = useState<AuthProviderState["token"]>(() =>
    localStorage.getItem(STORAGE_KEYS.TOKEN)
  );

  const manageLogin = (
    token: AuthProviderState["token"],
    roles: AuthProviderState["roles"]
  ) => {
    setRole(roles);
    setToken(token);

    if (roles) {
      localStorage.setItem(STORAGE_KEYS.ROLE, JSON.stringify(roles));
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
    roles,
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

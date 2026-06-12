import { createContext, useContext, useEffect, useState } from "react";

import { me, signin, signup, logout } from "@/lib/api/auth";

import type { User, SigninPayload, SignupPayload } from "@/types/auth";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  initialized: boolean;
  signin: (payload: SigninPayload) => Promise<void>;
  signup: (payload: SignupPayload) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

const TOKEN_KEY = "accessToken";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [initialized, setInitialized] = useState(false);

  // TOKEN HELPERS
  const setToken = (token: string) => {
    localStorage.setItem(TOKEN_KEY, token);
  };

  const getToken = () => {
    return localStorage.getItem(TOKEN_KEY);
  };

  const removeToken = () => {
    localStorage.removeItem(TOKEN_KEY);
  };

  // FETCH CURRENT USER
  const refreshUser = async () => {
    try {
      const token = getToken();

      if (!token) {
        setUser(null);
        return;
      }

      const response = await me();
      setUser(response.data);
    } catch (error) {
      console.error("Failed to fetch user:", error);
      setUser(null);
      removeToken();
    }
  };

  // INIT ON APP LOAD
  useEffect(() => {
    (async () => {
      await refreshUser();
      setInitialized(true);
    })();
  }, []);

  // SIGN IN
  const handleSignin = async (payload: SigninPayload) => {
    setLoading(true);
    try {
      const res = await signin(payload);

      setToken(res.accessToken);
      setUser(res.data);
    } finally {
      setLoading(false);
    }
  };

  // SIGN UP
  const handleSignup = async (payload: SignupPayload) => {
    setLoading(true);
    try {
      const res = await signup(payload);

      setToken(res.accessToken);
      setUser(res.data);
    } finally {
      setLoading(false);
    }
  };

  // LOGOUT
  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();

      removeToken();
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        initialized,
        signin: handleSignin,
        signup: handleSignup,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

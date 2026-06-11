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

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [initialized, setInitialized] = useState(false);

  const refreshUser = async () => {
    try {
      const response = await me();
      const userData = response.data.user ?? response.data ?? null;
      setUser(userData);
    } catch (error) {
      console.error("Failed to fetch user:", error);
      setUser(null);
    }
  };

  useEffect(() => {
    refreshUser().finally(() => setInitialized(true));
  }, []);

  const handleSignin = async (payload: SigninPayload) => {
    setLoading(true);
    try {
      await signin(payload);
      await refreshUser();
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (payload: SignupPayload) => {
    setLoading(true);
    try {
      await signup(payload);
      await refreshUser();
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
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

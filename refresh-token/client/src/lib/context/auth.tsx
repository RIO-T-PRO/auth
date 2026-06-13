import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import {
  clearAccessToken,
  refreshAccessToken,
  setAccessToken,
} from "@/lib/api/refresh";

import { me, signin, signup, signout } from "@/lib/api/auth";

import type { User, SigninPayload, SignupPayload } from "@/types/auth";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  initialized: boolean;
  signin: (payload: SigninPayload) => Promise<void>;
  signup: (payload: SignupPayload) => Promise<void>;
  signout: () => Promise<void>;
  refreshSession: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [initialized, setInitialized] = useState(false);

  const loadCurrentUser = async () => {
    const response = await me();
    setUser(response.data);
  };

  const refreshSession = async () => {
    try {
      const token = await refreshAccessToken();

      setAccessToken(token);

      await loadCurrentUser();
    } catch {
      clearAccessToken();
      setUser(null);
    }
  };

  useEffect(() => {
    (async () => {
      await refreshSession();
      setInitialized(true);
    })();
  }, []);

  const handleSignin = async (payload: SigninPayload): Promise<void> => {
    setLoading(true);

    try {
      const response = await signin(payload);

      setAccessToken(response.accessToken);
      setUser(response.data.user);
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (payload: SignupPayload): Promise<void> => {
    setLoading(true);

    try {
      const response = await signup(payload);

      setAccessToken(response.accessToken);
      setUser(response.data.user);
    } finally {
      setLoading(false);
    }
  };

  const handleSignout = async (): Promise<void> => {
    setLoading(true);

    try {
      await signout();

      clearAccessToken();
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
        signout: handleSignout,
        refreshSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

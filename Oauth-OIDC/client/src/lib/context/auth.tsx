import {
  createContext,
  useState,
  useEffect,
  type ReactNode,
  useCallback,
  useContext,
} from "react";
import {
  getGoogleAuthorizeUrl,
  handleGoogleCallback,
  signout as signoutApi,
  userinfo,
} from "@/lib/api/auth";
import { getAccessToken, clearAccessToken } from "@/lib/api/refresh";
import type { AuthUser } from "@/types/auth";

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  initialized: boolean;
  loginWithGoogle: () => void;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  initialized: false,
  loginWithGoogle: () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

  // Called once on mount
  useEffect(() => {
    const init = async () => {
      try {
        if (getAccessToken()) {
          // We already have a token, fetch the user to hydrate state
          const me = await userinfo();
          setUser({
            id: me.sub,
            email: me.email,
            name: me.name,
            avatarUrl: me.picture,
          });
        } else {
          // No token – maybe we just got redirected from Google with a fresh cookie
          const user = await handleGoogleCallback();
          setUser(user);
        }
      } catch {
        // No token or invalid cookie – stay as guest
        clearAccessToken();
      } finally {
        setLoading(false);
        setInitialized(true);
      }
    };

    init();
  }, []);

  // Google login: redirect the browser to the backend authorization URL
  const loginWithGoogle = useCallback(() => {
    window.location.href = getGoogleAuthorizeUrl();
  }, []);

  const logout = useCallback(async () => {
    await signoutApi();
    clearAccessToken();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, loading, initialized, loginWithGoogle, logout }}
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

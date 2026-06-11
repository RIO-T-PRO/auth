import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import SignInForm from "@/components/signin-form";
import SignUpForm from "@/components/signup-form";
import SignOutCard from "@/components/signout";
import AuthLayout from "@/components/auth-layout";
import { useAuth } from "@/lib/context/auth";

type Mode = "signin" | "signup" | "signout";

const AuthPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [mode, setMode] = useState<Mode>("signin");

  useEffect(() => {
    const urlMode = searchParams.get("mode");

    if (urlMode === "signin" || urlMode === "signup" || urlMode === "signout") {
      setMode(urlMode);
    }
  }, [searchParams]);

  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  if (mode === "signout") {
    return <SignOutCard onSignOut={() => setMode("signin")} />;
  }

  return (
    <AuthLayout
      title={mode === "signin" ? "Welcome back" : "Create account"}
      subtitle={
        mode === "signin"
          ? "Login with your email and password"
          : "Sign up using email, username and password"
      }
    >
      {mode === "signin" ? (
        <SignInForm onSwitchToSignUp={() => setMode("signup")} />
      ) : (
        <SignUpForm onSwitchToSignIn={() => setMode("signin")} />
      )}
    </AuthLayout>
  );
};

export default AuthPage;

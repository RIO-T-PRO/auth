import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import Signin from "./signin";
import Signup from "./signup";

type AuthMode = "signin" | "signup";

const AuthPage = () => {
  const [params] = useSearchParams();

  const initialMode: AuthMode =
    params.get("mode") === "signup" ? "signup" : "signin";

  const [mode, setMode] = useState<AuthMode>(initialMode);

  return (
    <main className="min-h-screen w-full bg-background">
      {mode === "signin" ? (
        <Signin onSwitchToSignUp={() => setMode("signup")} />
      ) : (
        <Signup onSwitchToSignIn={() => setMode("signin")} />
      )}
    </main>
  );
};

export default AuthPage;

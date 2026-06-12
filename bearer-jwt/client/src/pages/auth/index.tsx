import { useState } from "react";
import Signin from "./signin";
import Signup from "./signup";

type AuthMode = "signin" | "signup";

const AuthPage = () => {
  const [mode, setMode] = useState<AuthMode>("signin");

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-8">
      <div className="w-full max-w-md">
        {mode === "signin" ? (
          <Signin onSwitchToSignUp={() => setMode("signup")} />
        ) : (
          <Signup onSwitchToSignIn={() => setMode("signin")} />
        )}
      </div>
    </main>
  );
};

export default AuthPage;

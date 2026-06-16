import { FaGoogle, FaHome } from "react-icons/fa";
import { useAuth } from "@/lib/context/auth";

const AuthPage = () => {
  const { loginWithGoogle, initialized, user } = useAuth();

  if (initialized && user) {
    window.location.href = "/";
    return null;
  }

  return (
    <div className="min-h-screen grid grid-cols-1 bg-background lg:grid-cols-2">
      <div className="relative hidden overflow-hidden bg-linear-to-br from-primary via-primary-container to-[#14142b] p-14 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="absolute -top-40 -left-40 h-125 w-125 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-100 w-100 rounded-full bg-white/10 blur-3xl" />

        <div className="relative z-10 flex items-center gap-2 text-sm opacity-80">
          <FaHome />
          Aura
        </div>

        <div className="relative z-10 max-w-md">
          <h1 className="text-5xl font-bold leading-tight">Welcome Back</h1>
          <p className="mt-5 text-white/75">
            Sign in to continue to your dashboard.
          </p>
        </div>

        <div className="relative z-10 text-xs text-white/60">
          Secure • Fast • Modern
        </div>
      </div>

      <div className="flex items-center justify-center p-6 lg:p-10">
        <div className="w-full max-w-md rounded-3xl border border-outline-variant bg-surface p-8 shadow-xl">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-semibold text-on-surface">Sign In</h1>
            <p className="mt-2 text-sm text-on-surface-variant">
              Continue with your Google account
            </p>
          </div>

          <button
            type="button"
            onClick={loginWithGoogle}
            className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-outline-variant bg-surface-container-low px-4 font-medium text-on-surface transition hover:bg-surface-container"
          >
            <FaGoogle />
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;

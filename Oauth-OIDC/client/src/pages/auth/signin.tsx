import { type ChangeEvent, type FormEvent, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaGoogle, FaHome, FaSignInAlt, FaSpinner } from "react-icons/fa";
import AuthInput from "../../components/ui/input";
import { useAuth } from "@/lib/context/auth";

const API_URL = import.meta.env.VITE_API_URL || "";

type SigninForm = {
  email: string;
  password: string;
};

type SigninErrors = Partial<Record<keyof SigninForm | "form", string>>;

const initialForm: SigninForm = {
  email: "",
  password: "",
};

const Signin = () => {
  const { user, initialized } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<SigninErrors>({});

  // Redirect authenticated users away from sign‑in page
  useEffect(() => {
    if (initialized && user) {
      navigate("/", { replace: true });
    }
  }, [initialized, user, navigate]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: undefined,
      form: undefined,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const nextErrors: SigninErrors = {};

    if (!form.email.trim()) {
      nextErrors.email = "Email is required";
    }

    if (!form.password.trim()) {
      nextErrors.password = "Password is required";
    }

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    try {
      setLoading(true);
      // TODO: connect your API
      console.log(form);
    } catch {
      setErrors({ form: "Failed to sign in" });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignin = () => {
    // Correct backend authorize endpoint
    window.location.href = `${API_URL}/auth/google/authorize`;
  };

  return (
    <div className="min-h-screen grid grid-cols-1 bg-background lg:grid-cols-2">
      {/* Left */}
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

      {/* Right */}
      <div className="flex items-center justify-center p-6 lg:p-10">
        <div className="w-full max-w-md rounded-3xl border border-outline-variant bg-surface p-8 shadow-xl">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-semibold text-on-surface">Sign In</h1>
            <p className="mt-2 text-sm text-on-surface-variant">Welcome back</p>
          </div>

          <button
            type="button"
            onClick={handleGoogleSignin}
            className="mb-6 flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-outline-variant bg-surface-container-low px-4 font-medium text-on-surface transition hover:bg-surface-container"
          >
            <FaGoogle />
            Continue with Google
          </button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-outline-variant" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-surface px-3 text-xs text-on-surface-variant">
                OR
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <AuthInput
              id="email"
              name="email"
              label="Email"
              type="email"
              value={form.email}
              onChange={handleChange}
              error={errors.email}
            />

            <AuthInput
              id="password"
              name="password"
              label="Password"
              type="password"
              value={form.password}
              onChange={handleChange}
              error={errors.password}
            />

            {errors.form && (
              <p className="text-sm font-medium text-error">{errors.form}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary font-semibold text-on-primary transition hover:opacity-95 disabled:opacity-60"
            >
              {loading ? (
                <FaSpinner className="animate-spin" />
              ) : (
                <FaSignInAlt />
              )}
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signin;

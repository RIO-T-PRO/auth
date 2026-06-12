import { type ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSignInAlt, FaSpinner, FaHome } from "react-icons/fa";
import AuthInput from "@/components/ui/input";
import { useAuth } from "@/lib/context/auth";

type SigninForm = {
  email: string;
  password: string;
};

type SigninErrors = Partial<Record<keyof SigninForm | "form", string>>;

type SigninProps = {
  onSwitchToSignUp: () => void;
};

const initialForm: SigninForm = {
  email: "",
  password: "",
};

const Signin = ({ onSwitchToSignUp }: SigninProps) => {
  const navigate = useNavigate();
  const { signin, loading } = useAuth();

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<SigninErrors>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));

    setErrors((prev) => ({
      ...prev,
      [name]: undefined,
      form: undefined,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const nextErrors: SigninErrors = {};

    if (!form.email.trim()) nextErrors.email = "Email is required";
    if (!form.password.trim()) nextErrors.password = "Password is required";

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    try {
      await signin(form);
      navigate("/");
    } catch (err: any) {
      setErrors({ form: err.message || "Failed to sign in" });
    }
  };

  return (
    <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-2 bg-background">
      {/* LEFT SIDE */}
      <div className="hidden lg:flex flex-col justify-between p-14 relative overflow-hidden bg-linear-to-br from-primary via-primary-container to-[#14142b] text-white">
        <div className="absolute -top-40 -left-40 h-125 w-125 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-100 w-100 rounded-full bg-white/10 blur-3xl" />

        <div className="relative z-10 flex items-center gap-2 text-sm opacity-80">
          <FaHome />
          Your App
        </div>

        <div className="relative z-10 max-w-md">
          <h1 className="text-5xl font-bold leading-tight">Welcome Back</h1>
          <p className="mt-5 text-white/75">
            Sign in to continue to your dashboard and manage everything in one
            place.
          </p>
        </div>

        <div className="relative z-10 text-xs text-white/60">
          Secure authentication • Fast experience • Modern UI
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center justify-center p-6 lg:p-10">
        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-8">
          {/* HEADER */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
              <FaSignInAlt className="text-xl text-primary" />
            </div>

            <h1 className="text-2xl font-semibold text-on-surface">
              Welcome Back
            </h1>

            <p className="mt-2 text-sm text-on-surface-variant">
              Sign in to continue
            </p>
          </div>

          {/* FORM */}
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
              <p className="text-sm text-error font-medium">{errors.form}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 font-semibold text-on-primary transition hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60"
            >
              {loading ? (
                <FaSpinner className="animate-spin" />
              ) : (
                <FaSignInAlt />
              )}
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          {/* SWITCH */}
          <p className="mt-6 text-center text-sm text-on-surface-variant">
            Don&apos;t have an account?{" "}
            <button
              type="button"
              onClick={onSwitchToSignUp}
              className="font-semibold text-primary hover:underline"
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signin;

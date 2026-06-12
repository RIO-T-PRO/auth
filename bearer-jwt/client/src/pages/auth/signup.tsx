import { type ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserPlus, FaSpinner, FaHome } from "react-icons/fa";
import AuthInput from "@/components/ui/input";
import { useAuth } from "@/lib/context/auth";

type SignupForm = {
  name: string;
  email: string;
  password: string;
};

type SignupErrors = Partial<Record<keyof SignupForm | "form", string>>;

type SignupProps = {
  onSwitchToSignIn: () => void;
};

const initialForm: SignupForm = {
  name: "",
  email: "",
  password: "",
};

const Signup = ({ onSwitchToSignIn }: SignupProps) => {
  const navigate = useNavigate();
  const { signup, loading } = useAuth();

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<SignupErrors>({});

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

    const nextErrors: SignupErrors = {};

    if (!form.name.trim()) nextErrors.name = "Name is required";
    if (!form.email.trim()) nextErrors.email = "Email is required";
    if (!form.password.trim()) nextErrors.password = "Password is required";

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    try {
      await signup({
        name: form.name,
        email: form.email,
        password: form.password,
      });

      navigate("/");
    } catch (err: any) {
      setErrors({
        form: err.message || "Failed to sign up",
      });
    }
  };

  return (
    <div className="h-screen w-full grid grid-cols-1 lg:grid-cols-2 overflow-hidden bg-background">
      {/* LEFT PANEL */}
      <div className="hidden lg:flex flex-col justify-between p-12 relative overflow-hidden bg-linear-to-br from-primary via-primary-container to-[#0f1020] text-white">
        {/* glow effects */}
        <div className="absolute -top-40 -left-40 h-125 w-125 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-100 w-100 rounded-full bg-white/10 blur-3xl" />

        {/* brand */}
        <div className="relative z-10 flex items-center gap-2 text-sm opacity-80">
          <FaHome />
          Your App
        </div>

        {/* text */}
        <div className="relative z-10 max-w-md">
          <h1 className="text-5xl font-bold leading-tight">Join Us Today</h1>

          <p className="mt-5 text-white/75">
            Create your account and unlock a fast, secure, and modern
            experience.
          </p>
        </div>

        <div className="relative z-10 text-xs text-white/60">
          Fast • Secure • Modern experience
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex items-center justify-center px-4 lg:px-10 h-full overflow-hidden">
        <div className="w-full max-w-md max-h-[95vh] overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-6 lg:p-8">
          {/* HEADER */}
          <div className="mb-6 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
              <FaUserPlus className="text-lg text-primary" />
            </div>

            <h1 className="text-xl lg:text-2xl font-semibold text-on-surface">
              Create Account
            </h1>

            <p className="mt-1 text-sm text-on-surface-variant">
              Sign up to get started
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-3">
            <AuthInput
              id="name"
              name="name"
              label="Name"
              type="text"
              value={form.name}
              onChange={handleChange}
              error={errors.name}
            />

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
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-2.5 font-semibold text-on-primary transition hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60"
            >
              {loading ? (
                <FaSpinner className="animate-spin" />
              ) : (
                <FaUserPlus />
              )}
              {loading ? "Creating..." : "Sign Up"}
            </button>
          </form>

          {/* SWITCH */}
          <p className="mt-4 text-center text-xs text-on-surface-variant">
            Already have an account?{" "}
            <button
              type="button"
              onClick={onSwitchToSignIn}
              className="font-semibold text-primary hover:underline"
            >
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;

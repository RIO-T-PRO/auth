import { type ChangeEvent, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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
      setErrors({
        form: err.message || "Failed to sign in",
      });
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-background px-4">
      {/* Card */}
      <div className="w-full max-w-md rounded-2xl border border-outline-variant bg-surface p-8 shadow-sm">
        {/* Back home */}
        <div className="mb-4 flex justify-start">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm font-medium text-on-surface-variant hover:text-primary"
          >
            <FaHome />
            Back Home
          </Link>
        </div>

        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-surface-container-high">
            <FaSignInAlt className="text-xl text-primary" />
          </div>

          <h1 className="text-2xl font-bold text-on-surface">Welcome Back</h1>
          <p className="mt-2 text-sm text-on-surface-variant">
            Sign in to continue
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
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
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 font-semibold text-on-primary disabled:opacity-60"
          >
            {loading ? <FaSpinner className="animate-spin" /> : <FaSignInAlt />}
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        {/* Switch to signup */}
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
  );
};

export default Signin;

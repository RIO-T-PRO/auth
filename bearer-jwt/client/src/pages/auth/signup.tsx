import { type ChangeEvent, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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
            <FaUserPlus className="text-xl text-primary" />
          </div>

          <h1 className="text-2xl font-bold text-on-surface">Create Account</h1>
          <p className="mt-2 text-sm text-on-surface-variant">
            Sign up to get started
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
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
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 font-semibold text-on-primary disabled:opacity-60"
          >
            {loading ? <FaSpinner className="animate-spin" /> : <FaUserPlus />}
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        {/* Switch */}
        <p className="mt-6 text-center text-sm text-on-surface-variant">
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
  );
};

export default Signup;

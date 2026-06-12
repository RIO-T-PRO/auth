import { type ChangeEvent, type SubmitEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSpinner, FaUserPlus } from "react-icons/fa";
import AuthInput from "@/components/ui/input";

type SignupForm = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type SignupErrors = Partial<Record<keyof SignupForm | "form", string>>;

type SignupProps = {
  onSwitchToSignIn: () => void;
};

const Signup = ({ onSwitchToSignIn }: SignupProps) => {
  const navigate = useNavigate();

  const [form, setForm] = useState<SignupForm>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<SignupErrors>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: undefined,
      form: undefined,
    }));
  };

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: SignupErrors = {};

    if (!form.name.trim()) {
      nextErrors.name = "Name is required";
    }

    if (!form.email.trim()) {
      nextErrors.email = "Email is required";
    }

    if (!form.password.trim()) {
      nextErrors.password = "Password is required";
    }

    if (!form.confirmPassword.trim()) {
      nextErrors.confirmPassword = "Confirm your password";
    }

    if (
      form.password &&
      form.confirmPassword &&
      form.password !== form.confirmPassword
    ) {
      nextErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    try {
      setLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 1200));

      navigate("/");
    } catch {
      setErrors({
        form: "Failed to create account",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-outline-variant bg-surface p-8 shadow-sm">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-surface-container-high">
          <FaUserPlus className="text-xl text-primary" />
        </div>

        <h1 className="text-2xl font-bold text-on-surface">Create Account</h1>

        <p className="mt-2 text-sm text-on-surface-variant">Join us today</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <AuthInput
          id="name"
          name="name"
          label="Name"
          placeholder="John Doe"
          value={form.name}
          onChange={handleChange}
          error={errors.name}
        />

        <AuthInput
          id="email"
          name="email"
          type="email"
          label="Email"
          placeholder="you@example.com"
          value={form.email}
          onChange={handleChange}
          error={errors.email}
        />

        <AuthInput
          id="password"
          name="password"
          type="password"
          label="Password"
          placeholder="••••••••"
          value={form.password}
          onChange={handleChange}
          error={errors.password}
        />

        <AuthInput
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          label="Confirm Password"
          placeholder="••••••••"
          value={form.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
        />

        {errors.form && (
          <p className="text-sm font-medium text-error">{errors.form}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 font-semibold text-on-primary transition hover:opacity-90 disabled:opacity-60"
        >
          {loading ? <FaSpinner className="animate-spin" /> : <FaUserPlus />}
          {loading ? "Creating Account..." : "Sign Up"}
        </button>
      </form>

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
  );
};

export default Signup;

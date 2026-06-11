import { useState, type SubmitEvent } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa6";

import { useAuth } from "@/lib/context/auth";
import { AuthInput } from "./ui/auth-input";

type Props = {
  onSwitchToSignUp?: () => void;
};

const SignInForm = ({ onSwitchToSignUp }: Props) => {
  const { signin, loading } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.email.trim() || !form.password.trim()) return;

    try {
      await signin(form);
      navigate("/", { replace: true });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="relative">
        <FaEnvelope className="pointer-events-none absolute left-4 top-[3.35rem] -translate-y-1/2 text-on-surface-variant" />
        <AuthInput
          id="signin-email"
          label="Email"
          type="email"
          placeholder="Enter your email"
          value={form.email}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, email: e.target.value }))
          }
          autoComplete="email"
          className="pl-12"
        />
      </div>

      <div className="relative">
        <FaLock className="pointer-events-none absolute left-4 top-[3.35rem] -translate-y-1/2 text-on-surface-variant" />
        <AuthInput
          id="signin-password"
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={form.password}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, password: e.target.value }))
          }
          autoComplete="current-password"
          className="pl-12"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-primary py-3 text-sm font-bold uppercase tracking-[0.16em] text-on-primary hover:bg-primary-container disabled:opacity-60"
      >
        {loading ? "Signing in..." : "Sign In"}
      </button>

      <p className="text-center text-sm text-on-surface-variant">
        No account?{" "}
        <button
          type="button"
          onClick={onSwitchToSignUp}
          className="font-medium text-primary"
        >
          Sign up
        </button>
      </p>
    </form>
  );
};

export default SignInForm;

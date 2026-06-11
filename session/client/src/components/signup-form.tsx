import { useState, type SubmitEvent } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa6";

import { useAuth } from "@/lib/context/auth";
import { AuthInput } from "./ui/auth-input";

type Props = {
  onSwitchToSignIn?: () => void;
};

const SignUpForm = ({ onSwitchToSignIn }: Props) => {
  const { signup, loading } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !username || !password) return;

    try {
      await signup({ email, username, password });
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
          id="signup-email"
          label="Email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          className="pl-12"
        />
      </div>

      <div className="relative">
        <FaUser className="pointer-events-none absolute left-4 top-[3.35rem] -translate-y-1/2 text-on-surface-variant" />
        <AuthInput
          id="signup-username"
          label="Username"
          type="text"
          placeholder="Choose a username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
          className="pl-12"
        />
      </div>

      <div className="relative">
        <FaLock className="pointer-events-none absolute left-4 top-[3.35rem] -translate-y-1/2 text-on-surface-variant" />
        <AuthInput
          id="signup-password"
          label="Password"
          type="password"
          placeholder="Create a password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
          className="pl-12"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-primary py-3 text-sm font-bold uppercase tracking-[0.16em] text-on-primary hover:bg-primary-container disabled:opacity-60"
      >
        {loading ? "Creating..." : "Create Account"}
      </button>

      <p className="text-center text-sm text-on-surface-variant">
        Already have an account?{" "}
        <button
          type="button"
          onClick={onSwitchToSignIn}
          className="font-medium text-primary"
        >
          Sign in
        </button>
      </p>
    </form>
  );
};

export default SignUpForm;

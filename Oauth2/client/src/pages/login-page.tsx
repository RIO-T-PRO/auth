import { FaGithub, FaGoogle } from "react-icons/fa";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

const LoginPage = () => {
  const handleGithubLogin = () => {
    window.location.href = `${API_URL}/auth/github`;
  };

  const handleGoogleLogin = () => {
    window.location.href = `${API_URL}/auth/google`;
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-4 inline-flex rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
          OAuth Demo
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Sign in
        </h1>

        <p className="mt-3 text-sm leading-6 text-slate-600">
          Authenticate using GitHub or Google.
        </p>

        <div className="mt-8 space-y-3">
          <button
            onClick={handleGithubLogin}
            className="flex w-full items-center justify-center gap-3 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            <FaGithub size={18} />
            Continue with GitHub
          </button>

          <button
            onClick={handleGoogleLogin}
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
          >
            <FaGoogle size={18} />
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

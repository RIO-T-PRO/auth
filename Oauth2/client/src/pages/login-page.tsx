const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

export default function LoginPage() {
  const handleGithubLogin = () => {
    window.location.href = `${API_URL}/api/auth/github`;
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 flex items-center justify-center">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-4 inline-flex rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
          GitHub OAuth Demo
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Sign in with GitHub
        </h1>

        <p className="mt-3 text-sm leading-6 text-slate-600">
          This is a simple React + TypeScript demo with GitHub OAuth.
        </p>

        <button
          onClick={handleGithubLogin}
          className="mt-6 w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Continue with GitHub
        </button>
      </div>
    </div>
  );
}

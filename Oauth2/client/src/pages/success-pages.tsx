import { Link, useLocation } from "react-router-dom";

type GitHubAuthUser = {
  id: number;
  username: string;
  name: string;
  avatarUrl: string;
  email: string;
};

export default function SuccessPage() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const userParam = params.get("user");
  const user: GitHubAuthUser | null = userParam ? JSON.parse(userParam) : null;

  return (
    <div className="min-h-screen bg-slate-50 px-4 flex items-center justify-center">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-4 inline-flex rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700">
          Success
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          GitHub login successful
        </h1>

        <p className="mt-3 text-sm leading-6 text-slate-600">
          The backend redirected back to this page after OAuth completed.
        </p>

        <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-800">
          <p className="py-1">
            <span className="font-semibold">Name:</span> {user?.name}
          </p>
          <p className="py-1">
            <span className="font-semibold">Username:</span> {user?.username}
          </p>
          <p className="py-1">
            <span className="font-semibold">Email:</span> {user?.email}
          </p>
        </div>

        <Link
          to="/"
          className="mt-6 inline-flex rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Back to login
        </Link>
      </div>
    </div>
  );
}

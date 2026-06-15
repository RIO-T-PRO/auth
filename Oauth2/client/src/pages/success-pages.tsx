import { Link, useLocation } from "react-router-dom";
import { FaGithub, FaGoogle, FaUser, FaEnvelope, FaAt } from "react-icons/fa";

type AuthUser = {
  provider: "github" | "google";
  id: number | string;
  username: string;
  name: string;
  avatarUrl: string;
  email: string;
};

const SuccessPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const userParam = params.get("user");

  let user: AuthUser | null = null;

  try {
    user = userParam ? JSON.parse(userParam) : null;
  } catch {
    user = null;
  }

  const ProviderIcon = user?.provider === "github" ? FaGithub : FaGoogle;

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-4 inline-flex rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700">
          Authentication Successful
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Welcome
        </h1>

        <p className="mt-3 text-sm leading-6 text-slate-600">
          OAuth authentication completed successfully.
        </p>

        {user ? (
          <>
            <div className="mt-6 flex flex-col items-center">
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="h-24 w-24 rounded-full border border-slate-200 object-cover"
              />

              <div className="mt-4 flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
                <ProviderIcon />
                <span className="capitalize">{user.provider}</span>
              </div>
            </div>

            <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center gap-3 py-2">
                <FaUser className="text-slate-500" />
                <div>
                  <p className="text-xs text-slate-500">Name</p>
                  <p className="font-medium text-slate-900">{user.name}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 py-2">
                <FaAt className="text-slate-500" />
                <div>
                  <p className="text-xs text-slate-500">Username</p>
                  <p className="font-medium text-slate-900">{user.username}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 py-2">
                <FaEnvelope className="text-slate-500" />
                <div>
                  <p className="text-xs text-slate-500">Email</p>
                  <p className="font-medium text-slate-900">{user.email}</p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            No user information was returned from the OAuth provider.
          </div>
        )}

        <Link
          to="/"
          className="mt-6 flex w-full items-center justify-center rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Back to Login
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;

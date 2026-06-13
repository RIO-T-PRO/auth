import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaSignOutAlt, FaSpinner, FaUser } from "react-icons/fa";
import { useAuth } from "@/lib/context/auth";

const Navbar = () => {
  const { user, signout, loading } = useAuth();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const getInitial = (name?: string) => {
    if (!name) return "U";
    return name.trim().charAt(0).toUpperCase();
  };

  const handleLogout = async () => {
    try {
      await signout();

      setOpen(false);

      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-outline-variant bg-surface shadow-sm">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold tracking-tight text-primary">
          Aura SaaS
        </Link>

        {/* Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <Link
            to="/features"
            className="text-sm font-medium text-on-surface-variant hover:text-primary"
          >
            Features
          </Link>

          <Link
            to="/pricing"
            className="text-sm font-medium text-on-surface-variant hover:text-primary"
          >
            Pricing
          </Link>

          <Link
            to="/about"
            className="text-sm font-medium text-on-surface-variant hover:text-primary"
          >
            About
          </Link>

          <Link
            to="/support"
            className="text-sm font-medium text-on-surface-variant hover:text-primary"
          >
            Support
          </Link>
        </div>

        {/* Auth Section */}
        {user ? (
          <div className="relative">
            <button
              type="button"
              onClick={() => setOpen((prev) => !prev)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-outline-variant bg-surface-container-high transition hover:border-primary"
            >
              <span className="text-sm font-semibold text-primary">
                {getInitial(user.name)}
              </span>
            </button>

            {open && (
              <div className="absolute right-0 mt-3 w-64 overflow-hidden rounded-xl border border-outline-variant bg-surface shadow-xl">
                {/* User Info */}
                <div className="border-b border-outline-variant p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <FaUser className="text-primary" />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate font-semibold text-on-surface">
                        {user.name}
                      </p>

                      <p className="truncate text-xs text-on-surface-variant">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="p-2">
                  <button
                    type="button"
                    onClick={handleLogout}
                    disabled={loading}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-error transition hover:bg-surface-container-low disabled:opacity-60"
                  >
                    {loading ? (
                      <FaSpinner className="animate-spin" />
                    ) : (
                      <FaSignOutAlt />
                    )}

                    {loading ? "Signing Out..." : "Sign Out"}
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link
              to="/auth?mode=signin"
              className="rounded-lg border border-outline-variant px-4 py-2 text-sm font-semibold text-on-surface hover:bg-surface-container-low"
            >
              Sign In
            </Link>

            <Link
              to="/auth?mode=signup"
              className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-on-primary hover:opacity-90"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

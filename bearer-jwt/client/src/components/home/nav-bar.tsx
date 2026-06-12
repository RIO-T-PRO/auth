import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "@/lib/context/auth";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const isAuthenticated = !!user;

  const getInitial = (name?: string) => {
    if (!name) return "U";
    return name.trim().charAt(0).toUpperCase();
  };

  const handleLogout = async () => {
    try {
      await logout();
      setOpen(false);
      navigate("/");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-outline-variant bg-surface shadow-sm">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold tracking-tight text-primary">
          Aura SaaS
        </Link>

        {/* Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <Link
            to="/features"
            className="text-sm font-semibold text-on-surface-variant hover:text-primary"
          >
            Features
          </Link>

          <Link
            to="/pricing"
            className="text-sm font-semibold text-on-surface-variant hover:text-primary"
          >
            Pricing
          </Link>

          <Link
            to="/about"
            className="text-sm font-semibold text-on-surface-variant hover:text-primary"
          >
            About
          </Link>

          <Link
            to="/support"
            className="text-sm font-semibold text-on-surface-variant hover:text-primary"
          >
            Support
          </Link>
        </div>

        {/* AUTH */}
        {isAuthenticated && user ? (
          <div className="relative">
            {/* Avatar button */}
            <button
              onClick={() => setOpen((prev) => !prev)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-outline-variant bg-surface-container-high transition hover:border-primary"
              title={user.name}
            >
              <span className="text-sm font-semibold text-primary">
                {getInitial(user.name)}
              </span>
            </button>

            {/* Dropdown */}
            {open && (
              <div className="absolute right-0 mt-2 w-40 rounded-lg border border-outline-variant bg-surface shadow-lg">
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 px-4 py-3 text-sm font-medium text-error hover:bg-surface-container-low"
                >
                  <FaSignOutAlt />
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link
              to="/auth?mode=signin"
              className="rounded-lg border border-outline-variant bg-surface px-4 py-2 text-sm font-semibold text-on-surface hover:bg-surface-container-low"
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

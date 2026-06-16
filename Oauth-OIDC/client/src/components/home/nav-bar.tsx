import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import { FaChevronDown, FaSignOutAlt, FaUser } from "react-icons/fa";
import Avatar from "../ui/avatar";
import { useAuth } from "@/lib/context/auth";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout, loading, initialized } = useAuth();

  const handleSignOut = async () => {
    await logout();
    setOpen(false);
    navigate("/auth");
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-outline-variant bg-surface/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="text-xl font-bold tracking-tight text-primary">
          Aura
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link
            to="/features"
            className="text-sm font-medium text-on-surface-variant transition-colors hover:text-primary"
          >
            Features
          </Link>

          <Link
            to="/pricing"
            className="text-sm font-medium text-on-surface-variant transition-colors hover:text-primary"
          >
            Pricing
          </Link>

          <Link
            to="/about"
            className="text-sm font-medium text-on-surface-variant transition-colors hover:text-primary"
          >
            About
          </Link>

          <Link
            to="/support"
            className="text-sm font-medium text-on-surface-variant transition-colors hover:text-primary"
          >
            Support
          </Link>
        </div>

        <div className="relative">
          {!initialized ? null : user ? (
            <>
              <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                className="flex items-center gap-2 rounded-full p-1 transition hover:bg-surface-container-low"
              >
                <Avatar name={user.name ?? user.email} size="md" />

                <FaChevronDown
                  className={`hidden text-xs text-on-surface-variant transition-transform md:block ${
                    open ? "rotate-180" : ""
                  }`}
                />
              </button>

              {open && (
                <>
                  <button
                    type="button"
                    aria-label="Close menu"
                    onClick={() => setOpen(false)}
                    className="fixed inset-0 z-40"
                  />

                  <div className="absolute right-0 z-50 mt-3 w-72 overflow-hidden rounded-2xl border border-outline-variant bg-surface shadow-xl">
                    <div className="border-b border-outline-variant p-4">
                      <div className="flex items-center gap-3">
                        <Avatar name={user.name ?? user.email} size="lg" />

                        <div className="min-w-0">
                          <p className="truncate font-semibold text-on-surface">
                            {user.name ?? "User"}
                          </p>

                          <p className="truncate text-sm text-on-surface-variant">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-2">
                      <button
                        type="button"
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-on-surface transition-colors hover:bg-surface-container-low"
                      >
                        <FaUser className="text-on-surface-variant" />
                        Profile
                      </button>

                      <button
                        type="button"
                        onClick={handleSignOut}
                        disabled={loading}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-error transition-colors hover:bg-surface-container-low disabled:opacity-60"
                      >
                        <FaSignOutAlt />
                        Sign Out
                      </button>
                    </div>
                  </div>
                </>
              )}
            </>
          ) : (
            <Link
              to="/auth"
              className="rounded-full border border-outline-variant px-4 py-2 text-sm font-medium text-on-surface transition hover:bg-surface-container-low"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

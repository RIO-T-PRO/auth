import { useEffect, useRef, useState } from "react";
import { FaBolt, FaPlay, FaChevronDown } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "@/lib/context/auth";

const LandingPage = () => {
  const { user, logout, initialized } = useAuth();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!initialized) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-on-surface-variant">Loading...</div>
      </div>
    );
  }

  console.log(user, "from landing page");

  const displayName = user?.username || user?.email || "User";
  const initial = displayName.charAt(0).toUpperCase();

  const handleLogout = async () => {
    await logout();
    setOpen(false);
    navigate("/", { replace: true });
  };

  return (
    <main className="flex min-h-screen flex-col bg-background font-manrope text-on-background antialiased">
      {/* NAV */}
      <nav className="sticky top-0 z-50 w-full border-b border-outline-variant bg-surface shadow-sm">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <Link to="/" className="text-xl font-bold text-primary">
            Aura SaaS
          </Link>

          {/* NAV LINKS */}
          <div className="hidden items-center gap-6 md:flex">
            <a
              href="#features"
              className="text-sm text-on-surface-variant hover:text-primary"
            >
              Features
            </a>
            <a
              href="#pricing"
              className="text-sm text-on-surface-variant hover:text-primary"
            >
              Pricing
            </a>
            <a
              href="#about"
              className="text-sm text-on-surface-variant hover:text-primary"
            >
              About
            </a>
            <a
              href="#support"
              className="text-sm text-on-surface-variant hover:text-primary"
            >
              Support
            </a>
          </div>

          {/* AUTH AREA */}
          <div className="flex items-center gap-3">
            {user ? (
              <div ref={menuRef} className="relative">
                {/* AVATAR BUTTON */}
                <button
                  onClick={() => setOpen((v) => !v)}
                  className="flex items-center gap-2 rounded-full border border-outline-variant bg-surface px-2 py-1.5 hover:bg-surface-container"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-outline-variant bg-surface-container text-sm font-semibold">
                    {initial}
                  </div>

                  <FaChevronDown
                    className={`text-xs text-on-surface-variant transition ${
                      open ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* DROPDOWN */}
                {open && (
                  <div className="absolute right-0 mt-3 w-56 overflow-hidden rounded-xl border border-outline-variant bg-surface shadow-xl">
                    <div className="border-b border-outline-variant p-4">
                      <p className="text-sm font-semibold">{user.username}</p>
                      <p className="text-xs text-on-surface-variant">
                        {user.email}
                      </p>
                    </div>

                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-3 text-left text-sm hover:bg-surface-container"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/auth?mode=signin"
                  className="rounded-lg bg-surface-container px-4 py-2 text-sm font-semibold hover:bg-surface-container-high"
                >
                  Log In
                </Link>

                <Link
                  to="/auth?mode=signup"
                  className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-on-primary"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="flex-1">
        <div className="mx-auto flex max-w-7xl flex-col items-center px-6 py-20 text-center md:py-32">
          <div className="mb-12 inline-flex items-center gap-2 rounded-full bg-surface-container-high px-3 py-1 text-sm font-semibold text-primary">
            <FaBolt />
            <span>v2.0 is now live</span>
          </div>

          <h1 className="max-w-4xl text-4xl font-extrabold md:text-6xl">
            Clarity and productivity in one place
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-on-surface-variant">
            Access your tasks, notes, and projects anytime.
          </p>

          <div className="mt-12 flex flex-col gap-6 sm:flex-row">
            <Link
              to="/auth?mode=signup"
              className="rounded-lg bg-primary px-8 py-4 font-semibold text-on-primary"
            >
              Get Started
            </Link>

            <Link
              to="/auth?mode=signin"
              className="rounded-lg bg-surface-container px-8 py-4 font-semibold"
            >
              Sign In
            </Link>
          </div>

          <div className="relative mt-20 aspect-video w-full max-w-5xl rounded-xl border border-outline-variant bg-surface-container-low">
            <div className="absolute inset-0 flex items-center justify-center">
              <FaPlay className="text-3xl text-primary" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default LandingPage;

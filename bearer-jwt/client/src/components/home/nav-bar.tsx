import { Link } from "react-router-dom";

type NavbarProps = {
  avatar?: string;
  name?: string;
};

const Navbar = ({ avatar, name = "User" }: NavbarProps) => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-outline-variant bg-surface shadow-sm">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold tracking-tight text-primary">
          Aura SaaS
        </Link>

        {/* Navigation Links */}
        <div className="hidden items-center gap-8 md:flex">
          <Link
            to="/features"
            className="text-sm font-semibold text-on-surface-variant transition-colors hover:text-primary"
          >
            Features
          </Link>

          <Link
            to="/pricing"
            className="text-sm font-semibold text-on-surface-variant transition-colors hover:text-primary"
          >
            Pricing
          </Link>

          <Link
            to="/about"
            className="text-sm font-semibold text-on-surface-variant transition-colors hover:text-primary"
          >
            About
          </Link>

          <Link
            to="/support"
            className="text-sm font-semibold text-on-surface-variant transition-colors hover:text-primary"
          >
            Support
          </Link>
        </div>

        {/* Avatar */}
        <button className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-outline-variant bg-surface-container-high hover:border-primary">
          {avatar ? (
            <img
              src={avatar}
              alt={name}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-sm font-semibold text-primary">
              {name.charAt(0).toUpperCase()}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

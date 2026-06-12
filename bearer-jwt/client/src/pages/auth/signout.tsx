import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt, FaSpinner } from "react-icons/fa";

const Signout = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSignout = async () => {
    const confirmed = window.confirm("Are you sure you want to sign out?");

    if (!confirmed) {
      return;
    }

    try {
      setLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 800));

      navigate("/signin");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleSignout}
      disabled={loading}
      className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 font-semibold text-on-primary transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {loading ? <FaSpinner className="animate-spin" /> : <FaSignOutAlt />}
      {loading ? "Signing Out..." : "Sign Out"}
    </button>
  );
};

export default Signout;

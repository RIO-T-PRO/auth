import { useState } from "react";
import { FaSignOutAlt, FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/context/auth";

const Signout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSignoutClick = () => {
    setShowConfirm(true);
  };

  const confirmLogout = async () => {
    try {
      setLoading(true);

      await logout();

      navigate("/");
    } finally {
      setLoading(false);
      setShowConfirm(false);
    }
  };

  const cancelLogout = () => {
    if (loading) return;
    setShowConfirm(false);
  };

  return (
    <>
      {/* BUTTON */}
      <button
        type="button"
        onClick={handleSignoutClick}
        disabled={loading}
        className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 font-semibold text-on-primary transition hover:opacity-90 disabled:opacity-60"
      >
        {loading ? <FaSpinner className="animate-spin" /> : <FaSignOutAlt />}
        Sign Out
      </button>

      {/* MODAL */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-sm rounded-xl bg-surface p-6 shadow-xl">
            <h2 className="text-lg font-semibold text-on-surface">
              Confirm Sign Out
            </h2>

            <p className="mt-2 text-sm text-on-surface-variant">
              Are you sure you want to sign out of your account?
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={cancelLogout}
                disabled={loading}
                className="rounded-lg px-4 py-2 text-sm font-medium text-on-surface hover:bg-surface-container disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={confirmLogout}
                disabled={loading}
                className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-on-primary disabled:opacity-60"
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
        </div>
      )}
    </>
  );
};

export default Signout;

import { useAuth } from "@/lib/context/auth";

type Props = {
  onSignOut?: () => void;
};

const SignOutCard = ({ onSignOut }: Props) => {
  const { logout, loading } = useAuth();

  const handleSignOut = async () => {
    try {
      await logout();
      onSignOut?.();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-background">
      <div className="space-y-4 text-center">
        <h1 className="text-[32px] font-bold">You're signed out</h1>

        <p className="text-on-surface-variant">
          Your session has been cleared.
        </p>

        <button
          onClick={handleSignOut}
          disabled={loading}
          className="rounded-lg bg-primary px-6 py-3 uppercase tracking-[0.16em] text-on-primary disabled:opacity-60"
        >
          {loading ? "Signing out..." : "Sign in again"}
        </button>
      </div>
    </div>
  );
};

export default SignOutCard;

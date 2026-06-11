import { useMemo } from "react";

type Props = {
  username?: string;
};

const Avatar = ({ username }: Props) => {
  const initial = useMemo(() => {
    return (username || "U").charAt(0).toUpperCase();
  }, [username]);

  return (
    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-outline-variant bg-surface-container text-sm font-semibold text-on-surface">
      {initial}
    </div>
  );
};

export default Avatar;

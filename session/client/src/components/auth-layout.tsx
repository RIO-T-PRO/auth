import type { ReactNode } from "react";
import AuthVisual from "./ui/auth-visual";

type Props = {
  title: string;
  subtitle?: string;
  children: ReactNode;
};

const AuthLayout = ({ title, subtitle, children }: Props) => {
  return (
    <div className="h-screen w-full grid grid-cols-1 md:grid-cols-2 bg-background text-on-background">
      {/* LEFT - FORM */}
      <div className="flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          <h1 className="text-[32px] font-bold tracking-[-0.02em]">{title}</h1>

          {subtitle && (
            <p className="mt-2 text-sm text-on-surface-variant">{subtitle}</p>
          )}

          <div className="mt-8">{children}</div>
        </div>
      </div>

      {/* RIGHT - VISUAL */}
      <div className="hidden md:block h-full">
        <AuthVisual />
      </div>
    </div>
  );
};

export default AuthLayout;

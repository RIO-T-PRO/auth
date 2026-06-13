import { forwardRef, type InputHTMLAttributes } from "react";

type AuthInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  hint?: string;
};

const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(
  ({ label, error, hint, className = "", id, ...props }, ref) => {
    return (
      <div>
        <label
          className="mb-2 block text-base font-normal text-on-surface"
          htmlFor={id}
        >
          {label}
        </label>

        <input
          ref={ref}
          id={id}
          {...props}
          className={[
            "w-full rounded-lg border bg-surface-container-lowest px-4 py-3 text-base text-on-surface",
            "placeholder:text-on-surface-variant/50 outline-none transition-all duration-200",
            "focus:border-primary focus:ring-2 focus:ring-primary/20",
            error
              ? "border-error focus:border-error focus:ring-error/20"
              : "border-outline-variant/80",
            className,
          ].join(" ")}
        />

        {error ? (
          <p className="mt-2 text-sm font-medium text-error">{error}</p>
        ) : hint ? (
          <p className="mt-2 text-sm text-on-surface-variant">{hint}</p>
        ) : null}
      </div>
    );
  },
);

AuthInput.displayName = "AuthInput";

export default AuthInput;

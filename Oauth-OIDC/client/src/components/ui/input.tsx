import { forwardRef, type InputHTMLAttributes } from "react";

type AuthInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  hint?: string;
};

const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(
  ({ label, error, hint, className = "", id, disabled, ...props }, ref) => {
    const messageId = error ? `${id}-error` : hint ? `${id}-hint` : undefined;

    return (
      <div className="space-y-2">
        <label
          htmlFor={id}
          className="block text-sm font-medium text-on-surface"
        >
          {label}
        </label>

        <input
          ref={ref}
          id={id}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={messageId}
          {...props}
          className={[
            "flex h-12 w-full rounded-xl border bg-surface-container-lowest px-4",
            "text-base text-on-surface",
            "placeholder:text-on-surface-variant/60",
            "outline-none transition-all duration-200",
            "focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/10",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error
              ? "border-error focus-visible:border-error focus-visible:ring-error/10"
              : "border-outline-variant/80",
            className,
          ].join(" ")}
        />

        {error ? (
          <p id={messageId} className="text-sm font-medium text-error">
            {error}
          </p>
        ) : hint ? (
          <p id={messageId} className="text-sm text-on-surface-variant">
            {hint}
          </p>
        ) : null}
      </div>
    );
  },
);

AuthInput.displayName = "AuthInput";

export default AuthInput;

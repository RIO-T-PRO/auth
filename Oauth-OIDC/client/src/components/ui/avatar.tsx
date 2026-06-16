import { forwardRef, useState } from "react";

type AvatarProps = React.HTMLAttributes<HTMLDivElement> & {
  src?: string;
  alt?: string;
  name?: string;
  size?: "sm" | "md" | "lg";
};

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ src, alt, name, size = "md", className = "", ...props }, ref) => {
    const [imageError, setImageError] = useState(false);

    const initial = name?.trim()?.charAt(0)?.toUpperCase() || "?";

    const sizeClasses = {
      sm: "h-8 w-8 text-xs",
      md: "h-10 w-10 text-sm",
      lg: "h-12 w-12 text-base",
    };

    return (
      <div
        ref={ref}
        className={[
          "relative flex shrink-0 items-center justify-center overflow-hidden rounded-full",
          "bg-primary/10 font-semibold text-primary",
          sizeClasses[size],
          className,
        ].join(" ")}
        {...props}
      >
        {src && !imageError ? (
          <img
            src={src}
            alt={alt ?? name ?? "Avatar"}
            onError={() => setImageError(true)}
            className="h-full w-full object-cover"
          />
        ) : (
          <span>{initial}</span>
        )}
      </div>
    );
  },
);

Avatar.displayName = "Avatar";

export default Avatar;

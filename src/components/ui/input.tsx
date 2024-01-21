import * as React from "react";
import { cn } from "@/lib/utils";
import { VscEye, VscEyeClosed } from "react-icons/vsc";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    return (
      <div className="relative">
        <input
          type={showPassword ? "text" : type}
          className={cn(
            "border-input placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          ref={ref}
          {...props}
        />
        {type === "password" && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex cursor-pointer items-center px-3"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? (
              <VscEye className="text-gray-500" />
            ) : (
              <VscEyeClosed className="text-gray-500" />
            )}
          </button>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
export { Input };

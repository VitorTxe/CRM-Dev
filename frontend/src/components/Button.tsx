import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "danger" | "outline" | "success";
  fullWidth?: boolean;
  isLoading?: boolean;
}

const Button = ({
  children,
  variant = "primary",
  className,
  fullWidth = false,
  isLoading = false,
  disabled,
  ...rest
}: ButtonProps) => {
  const variantClasses = {
    primary: "bg-primary-500 hover:bg-primary-600 text-white font-semibold active:translate-y-0",
    outline: "border border-primary-500 text-primary-500 hover:bg-primary-500/10",
    secondary: "bg-secondary-500 hover:bg-secondary-600 text-white",
    danger: "bg-red-500 hover:bg-danger-600 text-white",
    success: "bg-success-500 hover:bg-success-600 text-white",
  };

  const renderLoading = () => (
    <div className="flex items-center justify-center">
      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
        <title>Loading spinner</title>
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      {children}
    </div>
  );

  return (
    <div>
      <button
        type="button"
        disabled={isLoading || disabled}
        {...rest}
        className={`px-5 py2.5 rounded-xl font-medium trasition-all flex item-center justify-center cursor-pointer
                ${variantClasses[variant]} 
                ${fullWidth ? "w-full" : ""}
                ${className}
                ${disabled && "opacity-50 cursor-not-allowed"}
                `}
      >
        {isLoading ? renderLoading() : children}
      </button>
    </div>
  );
};

export default Button;

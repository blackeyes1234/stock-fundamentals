import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils/cn";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

export function Button({
  className,
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium transition",
        variant === "primary" &&
          "bg-zinc-950 text-white hover:bg-zinc-800 disabled:opacity-50",
        variant === "secondary" &&
          "border border-zinc-300 text-zinc-950 hover:bg-zinc-50 disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

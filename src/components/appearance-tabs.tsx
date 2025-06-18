import { type Appearance, useAppearance } from "../hooks/use-appearance";
import { cn } from "../lib/utils";
import { Monitor, Moon, Sun } from "lucide-react";
import type { ButtonHTMLAttributes } from "react";

export default function AppearanceToggleTab({
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  const { appearance, updateAppearance } = useAppearance();

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-full bg-neutral-100 p-2 transition-colors shadow-xs dark:bg-neutral-800",
        className
      )}
      onClick={() => {
        const order: Appearance[] = ["light", "dark", "system"];
        const next = order[(order.indexOf(appearance) + 1) % order.length];
        updateAppearance(next);
      }}
      aria-label={`Toggle appearance (current: ${appearance})`}
      type="button"
      {...props}
    >
      {appearance === "light" && <Sun className="h-5 w-5" />}
      {appearance === "dark" && (
        <Moon className="h-5 w-5 text-neutral-700 dark:text-neutral-100" />
      )}
      {appearance === "system" && <Monitor className="h-5 w-5 text-blue-500" />}
    </button>
  );
}

import * as React from "react"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string
  label?: string
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, error, label, ...props }, ref) => {
    return (
      <div className="w-full">
        <label className="flex items-start gap-3 cursor-pointer group">
          <div className="relative">
            <input
              type="checkbox"
              className="sr-only"
              ref={ref}
              {...props}
            />
            <div
              className={cn(
                "w-5 h-5 rounded border-2 border-border bg-background/50 backdrop-blur-sm transition-all duration-300 group-hover:border-lime-400/50 flex items-center justify-center",
                props.checked && "bg-lime-400 border-lime-400",
                error && "border-red-400",
                className
              )}
            >
              {props.checked && (
                <Check className="w-3 h-3 text-gray-900 animate-in zoom-in-50 duration-200" />
              )}
            </div>
          </div>
          {label && (
            <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300 leading-tight">
              {label}
            </span>
          )}
        </label>
        {error && (
          <p className="text-red-400 text-sm mt-1 animate-pulse">{error}</p>
        )}
      </div>
    )
  }
)
Checkbox.displayName = "Checkbox"

export { Checkbox }
import * as React from "react"
import { cn } from "@/lib/utils"

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: string
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, children, ...props }, ref) => {
    return (
      <div className="w-full">
        <select
          className={cn(
            "flex h-12 w-full rounded-xl border border-border bg-background/50 backdrop-blur-sm px-4 py-3 text-foreground focus:outline-none focus:border-lime-400 focus:ring-2 focus:ring-lime-400/20 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300 hover:border-lime-400/50",
            error && "border-red-400 focus:border-red-400 focus:ring-red-400/20",
            className
          )}
          ref={ref}
          {...props}
        >
          {children}
        </select>
        {error && (
          <p className="text-red-400 text-sm mt-1 animate-pulse">{error}</p>
        )}
      </div>
    )
  }
)
Select.displayName = "Select"

export { Select }
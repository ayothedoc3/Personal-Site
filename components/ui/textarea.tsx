import * as React from "react"
import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <div className="w-full">
        <textarea
          className={cn(
            "flex min-h-[120px] w-full rounded-xl border border-border bg-background/50 backdrop-blur-sm px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-lime-400 focus:ring-2 focus:ring-lime-400/20 disabled:cursor-not-allowed disabled:opacity-50 resize-none transition-all duration-300 hover:border-lime-400/50",
            error && "border-red-400 focus:border-red-400 focus:ring-red-400/20",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="text-red-400 text-sm mt-1 animate-pulse">{error}</p>
        )}
      </div>
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
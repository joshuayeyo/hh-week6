/* eslint-disable react-refresh/only-export-components */
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const checkboxVariants = cva(
  "peer size-4 shrink-0 rounded-sm border ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
  {
    variants: {
      variant: {
        default: "border-primary",
        error: "border-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

interface CheckboxProps
  extends Omit<React.ComponentProps<"input">, "type">,
    VariantProps<typeof checkboxVariants> {}

function Checkbox({ className, variant, checked, ...props }: CheckboxProps) {
  return (
    <div className="relative flex items-center">
      <input
        data-slot="checkbox"
        type="checkbox"
        data-state={checked ? "checked" : "unchecked"}
        className={cn(checkboxVariants({ variant }), className)}
        checked={checked}
        {...props}
      />
      {checked && (
        <svg
          className="absolute left-0 size-4 pointer-events-none text-primary-foreground"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={3}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      )}
    </div>
  )
}

export { Checkbox, checkboxVariants }

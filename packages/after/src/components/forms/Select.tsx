/* eslint-disable react-refresh/only-export-components */
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const selectVariants = cva(
  "flex w-full rounded-md border bg-transparent px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-input",
        error: "border-destructive focus-visible:ring-destructive",
      },
      size: {
        default: "h-9",
        sm: "h-8 text-xs",
        lg: "h-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

interface SelectProps
  extends Omit<React.ComponentProps<"select">, "size">,
    VariantProps<typeof selectVariants> {}

function Select({ className, variant, size, children, ...props }: SelectProps) {
  return (
    <select
      data-slot="select"
      className={cn(selectVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </select>
  )
}

function SelectOption({ className, ...props }: React.ComponentProps<"option">) {
  return <option className={cn(className)} {...props} />
}

export { Select, SelectOption, selectVariants }

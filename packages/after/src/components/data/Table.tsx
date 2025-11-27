/* eslint-disable react-refresh/only-export-components */
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const tableVariants = cva(
  "w-full caption-bottom text-sm",
  {
    variants: {
      variant: {
        default: "",
        striped: "[&_tbody_tr:nth-child(even)]:bg-muted/50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Table({
  className,
  variant,
  ...props
}: React.ComponentProps<"table"> & VariantProps<typeof tableVariants>) {
  return (
    <div className="relative w-full overflow-auto">
      <table
        data-slot="table"
        className={cn(tableVariants({ variant }), className)}
        {...props}
      />
    </div>
  )
}

export { Table, tableVariants }

/* eslint-disable react-refresh/only-export-components */
import type { ComponentProps } from "react"

import { cn } from "@/lib/utils"

export type TableHeaderProps = ComponentProps<"thead">

function TableHeader({ className, ...props }: TableHeaderProps) {
  return (
    <thead
      data-slot="table-header"
      className={cn("[&_tr]:border-b", className)}
      {...props}
    />
  )
}

export { TableHeader }

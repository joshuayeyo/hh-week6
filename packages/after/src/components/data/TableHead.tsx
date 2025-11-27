/* eslint-disable react-refresh/only-export-components */
import type { ComponentProps } from "react"

import { cn } from "@/lib/utils"

export type TableHeadProps = ComponentProps<"th">

function TableHead({ className, ...props }: TableHeadProps) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "h-10 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-0.5",
        className
      )}
      {...props}
    />
  )
}

export { TableHead }

/* eslint-disable react-refresh/only-export-components */
import type { ComponentProps } from "react"

import { cn } from "@/lib/utils"

export type TableCellProps = ComponentProps<"td">

function TableCell({ className, ...props }: TableCellProps) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "p-4 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-0.5",
        className
      )}
      {...props}
    />
  )
}

export { TableCell }

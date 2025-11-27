/* eslint-disable react-refresh/only-export-components */
import type { ComponentProps } from "react"

import { cn } from "@/lib/utils"

export type TableRowProps = ComponentProps<"tr">

function TableRow({ className, ...props }: TableRowProps) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
        className
      )}
      {...props}
    />
  )
}

export { TableRow }

/* eslint-disable react-refresh/only-export-components */
import type { ComponentProps } from "react"

import { cn } from "@/lib/utils"

export type TableCaptionProps = ComponentProps<"caption">

function TableCaption({ className, ...props }: TableCaptionProps) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("mt-4 text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

export { TableCaption }

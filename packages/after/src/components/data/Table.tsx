/* eslint-disable react-refresh/only-export-components */
import type { ComponentProps } from "react"
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

// Props 타입 정의
export type TableProps = ComponentProps<"table"> & VariantProps<typeof tableVariants>

/**
 * Table 컴포넌트 - 데이터 테이블 컨테이너
 * @example
 * // 기본 테이블
 * <Table>...</Table>
 *
 * // Striped 테이블 (짝수 행 배경색)
 * <Table variant="striped">...</Table>
 */
function Table({ className, variant, ...props }: TableProps) {
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

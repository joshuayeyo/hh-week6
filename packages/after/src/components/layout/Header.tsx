/* eslint-disable react-refresh/only-export-components */
import type { ComponentProps } from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const headerVariants = cva(
  "w-full border-b bg-background",
  {
    variants: {
      variant: {
        default: "shadow-sm",
        elevated: "shadow-md",
        flat: "shadow-none",
      },
      position: {
        static: "",
        sticky: "sticky top-0 z-50",
        fixed: "fixed top-0 left-0 right-0 z-50",
      },
    },
    defaultVariants: {
      variant: "default",
      position: "sticky",
    },
  }
)

// Props 타입 정의
export type HeaderProps = ComponentProps<"header"> & VariantProps<typeof headerVariants>
export type HeaderContentProps = ComponentProps<"div">
export type HeaderLogoProps = ComponentProps<"div">
export type HeaderNavProps = ComponentProps<"nav">
export type HeaderActionsProps = ComponentProps<"div">

/**
 * Header 컴포넌트 - 페이지 상단 헤더 컨테이너
 * @slot header-content - 내부 컨텐츠 래퍼 (max-width, padding 적용)
 * @slot header-logo - 좌측 로고/브랜드 영역
 * @slot header-nav - 중앙 네비게이션 링크 영역
 * @slot header-actions - 우측 액션 버튼 영역
 */
function Header({ className, variant, position, ...props }: HeaderProps) {
  return (
    <header
      data-slot="header"
      className={cn(headerVariants({ variant, position }), className)}
      {...props}
    />
  )
}

/** 내부 컨텐츠 래퍼 - max-width 제한 및 반응형 padding 적용 */
function HeaderContent({ className, ...props }: HeaderContentProps) {
  return (
    <div
      data-slot="header-content"
      className={cn(
        "mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8",
        className
      )}
      {...props}
    />
  )
}

/** 좌측 로고/브랜드 영역 - 아이콘 + 텍스트 배치용 */
function HeaderLogo({ className, ...props }: HeaderLogoProps) {
  return (
    <div
      data-slot="header-logo"
      className={cn("flex items-center gap-3", className)}
      {...props}
    />
  )
}

/** 중앙 네비게이션 영역 - 링크/메뉴 배치용 */
function HeaderNav({ className, ...props }: HeaderNavProps) {
  return (
    <nav
      data-slot="header-nav"
      className={cn("flex items-center gap-6", className)}
      {...props}
    />
  )
}

/** 우측 액션 영역 - 버튼/유저 정보 배치용 */
function HeaderActions({ className, ...props }: HeaderActionsProps) {
  return (
    <div
      data-slot="header-actions"
      className={cn("flex items-center gap-3", className)}
      {...props}
    />
  )
}

export {
  Header,
  HeaderContent,
  HeaderLogo,
  HeaderNav,
  HeaderActions,
  headerVariants,
}

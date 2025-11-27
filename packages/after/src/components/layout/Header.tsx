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

function Header({ className, variant, position, ...props }: HeaderProps) {
  return (
    <header
      data-slot="header"
      className={cn(headerVariants({ variant, position }), className)}
      {...props}
    />
  )
}

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

function HeaderLogo({ className, ...props }: HeaderLogoProps) {
  return (
    <div
      data-slot="header-logo"
      className={cn("flex items-center gap-3", className)}
      {...props}
    />
  )
}

function HeaderNav({ className, ...props }: HeaderNavProps) {
  return (
    <nav
      data-slot="header-nav"
      className={cn("flex items-center gap-6", className)}
      {...props}
    />
  )
}

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

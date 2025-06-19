"use client"

import * as React from "react"
import * as DrawerPrimitive from "@radix-ui/react-dialog"
import { XIcon } from "lucide-react"

import { cn } from "~/lib/utils"

function Drawer({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) {
  return <DrawerPrimitive.Root data-slot="drawer" {...props} />
}

function DrawerTrigger({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Trigger>) {
  return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />
}

function DrawerPortal({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Portal>) {
  return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />
}

function DrawerClose({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Close>) {
  return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />
}

function DrawerOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Overlay>) {
  return (
    <DrawerPrimitive.Overlay
      data-slot="drawer-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-black/50",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        className
      )}
      {...props}
    />
  )
}

type DrawerContentProps = React.ComponentProps<typeof DrawerPrimitive.Content> & {
  side?: "left" | "right" | "top" | "bottom"
}

function DrawerContent({
  className,
  children,
  side = "left",
  ...props
}: DrawerContentProps) {
  const sideClasses = {
    left: cn(
      "inset-y-0 left-0 h-full w-3/4 border-r",
      "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left"
    ),
    right: cn(
      "inset-y-0 right-0 h-full w-3/4 border-l",
      "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right"
    ),
    top: cn(
      "inset-x-0 top-0 w-full border-b",
      "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top"
    ),
    bottom: cn(
      "inset-x-0 bottom-0 w-full border-t",
      "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom"
    ),
  }

  return (
    <DrawerPortal>
      <DrawerOverlay />
      <DrawerPrimitive.Content
        data-slot="drawer-content"
        className={cn(
          "fixed z-50 bg-background shadow-lg",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          sideClasses[side],
          className
        )}
        {...props}
      >
        {children}
        <DrawerPrimitive.Close className="absolute right-4 top-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
          <XIcon className="size-4" />
          <span className="sr-only">Close</span>
        </DrawerPrimitive.Close>
      </DrawerPrimitive.Content>
    </DrawerPortal>
  )
}

function DrawerHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-header"
      className={cn("flex flex-col space-y-2 p-4", className)}
      {...props}
    />
  )
}

function DrawerFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-footer"
      className={cn("flex items-center justify-end p-4", className)}
      {...props}
    />
  )
}

function DrawerTitle({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Title>) {
  return (
    <DrawerPrimitive.Title
      data-slot="drawer-title"
      className={cn("text-lg font-semibold", className)}
      {...props}
    />
  )
}

function DrawerDescription({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Description>) {
  return (
    <DrawerPrimitive.Description
      data-slot="drawer-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

function DrawerBody({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-body"
      className={cn("flex-1 overflow-y-auto p-4", className)}
      {...props}
    />
  )
}

export {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerBody,
  DrawerOverlay,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
}

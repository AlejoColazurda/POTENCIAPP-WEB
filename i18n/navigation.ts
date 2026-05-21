import { createNavigation } from "next-intl/navigation"
import { routing } from "./routing"

/**
 * Locale-aware navigation helpers. Use these inside the app instead of
 * `next/link` / `next/navigation` when you need to switch locales — they
 * handle the prefix stripping/adding automatically.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing)

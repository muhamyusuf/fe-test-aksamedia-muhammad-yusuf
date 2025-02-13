"use client"

import { useState, useEffect } from "react"
import { Moon, Sun, Monitor } from "lucide-react"
import { useTheme } from "next-themes"

export function ToggleTheme() {
  const { setTheme, theme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Hindari SSR dengan memastikan komponen hanya diakses setelah mount
  useEffect(() => {
    setMounted(true)
  }, [])

  // Jika masih SSR, tampilkan button kosong untuk menghindari error
  if (!mounted)
    return (
      <button className="w-8 h-8 bg-white dark:bg-stone-800 rounded-full" />
    )

  return (
    <div className="relative z-20">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full border border-stone-300 bg-white text-stone-950 dark:bg-stone-800 dark:text-white dark:border-stone-600 hover:bg-stone-200 dark:hover:bg-stone-700 transition"
      >
        {theme === "dark" ? (
          <Moon className="h-5 w-5 text-stone-500 dark:text-stone-300" />
        ) : theme === "light" ? (
          <Sun className="h-5 w-5 text-stone-500 dark:text-stone-300" />
        ) : (
          <Monitor className="h-5 w-5 text-stone-500 dark:text-stone-300" />
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-700 rounded-lg shadow-lg dark:shadow-stone-800 text-black dark:text-white">
          <button
            onClick={() => {
              setTheme("light")
              setIsOpen(false)
            }}
            className={`block w-full text-left px-4 py-2 hover:bg-stone-200 dark:hover:bg-stone-800 rounded-lg ${
              theme === "light" ? "font-bold" : ""
            }`}
          >
            Light Mode
          </button>
          <button
            onClick={() => {
              setTheme("dark")
              setIsOpen(false)
            }}
            className={`block w-full text-left px-4 py-2 hover:bg-stone-200 dark:hover:bg-stone-800 rounded-lg ${
              theme === "dark" ? "font-bold" : ""
            }`}
          >
            Dark Mode
          </button>
          <button
            onClick={() => {
              setTheme("system")
              setIsOpen(false)
            }}
            className={`block w-full text-left px-4 py-2 hover:bg-stone-200 dark:hover:bg-stone-800 rounded-lg ${
              theme === "system" ? "font-bold" : ""
            }`}
          >
            System Mode
          </button>
        </div>
      )}
    </div>
  )
}

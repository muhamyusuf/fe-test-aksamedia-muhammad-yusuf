"use client"

import { createContext, useState, useContext, ReactNode } from "react"

interface AlertContextType {
  showAlert: (message: string, type?: "success" | "error" | "info") => void
}

const AlertContext = createContext<AlertContextType | undefined>(undefined)

export function AlertProvider({ children }: { children: ReactNode }) {
  const [alert, setAlert] = useState<{ message: string; type: string } | null>(
    null
  )

  const showAlert = (
    message: string,
    type: "success" | "error" | "info" = "info"
  ) => {
    setAlert({ message, type })

    setTimeout(() => {
      setAlert(null)
    }, 3000) // Alert hilang setelah 3 detik
  }

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}

      {/* Alert Box */}
      {alert && (
        <div
          className={`fixed top-5 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg text-white text-center z-[100] 
          transition-all duration-500 ease-in-out w-auto max-w-[90%] sm:max-w-md
          ${
            alert.type === "success"
              ? "bg-green-600"
              : alert.type === "error"
                ? "bg-red-600"
                : "bg-blue-600"
          }`}
        >
          {alert.message}
        </div>
      )}
    </AlertContext.Provider>
  )
}

export function useAlert() {
  const context = useContext(AlertContext)

  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider")
  }

  return context
}

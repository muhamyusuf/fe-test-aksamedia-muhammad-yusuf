"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated, getUser, logout } from "@/utils/auth";
import { User, LogOut, ChevronDown } from "lucide-react";
import Link from "next/link";
import { ToggleTheme } from "@/components/toggle-theme";

export default function Navbar() {
  const [user, setUser] = useState<{ username: string } | null>(null);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Delay untuk mendapatkan data user setelah login
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isAuthenticated()) {
        setUser(getUser());
      }
      setLoading(false); // Hapus loading setelah data didapat
    }, 500); // Delay 500ms agar cookies bisa diperbarui terlebih dahulu

    return () => clearTimeout(timer);
  }, []);

  // Handler Logout
  const handleLogout = () => {
    logout();
    setUser(null);
    router.push("/sign-in");
  };

  // Mendapatkan inisial user dari username
  const getInitials = (name: string) => name.charAt(0).toUpperCase();

  return (
    <nav className="bg-white dark:bg-stone-950 p-2 md:p-4 text-black dark:text-white flex justify-between items-center shadow-md">
      <h1 className="text-2xl font-bold tracking-tighter">InternTest</h1>

      <div className="flex items-center gap-4">
        <ToggleTheme />

        {loading ? (
          // Skeleton Loading untuk User Avatar & Username
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-stone-300 dark:bg-stone-700 rounded-full animate-pulse"></div>
            <div className="w-24 h-4 bg-stone-300 dark:bg-stone-700 rounded animate-pulse hidden sm:block"></div>
          </div>
        ) : user ? (
          <div className="relative">
            {/* Profile Button */}
            <button
              onClick={() => setDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 px-4 py-2 rounded-full shadow-md hover:bg-stone-200 dark:hover:bg-stone-700 transition"
            >
              {/* Avatar */}
              <div className="w-8 h-8 flex items-center justify-center bg-stone-300 dark:bg-stone-700 text-black dark:text-white font-bold rounded-full">
                {getInitials(user.username)}
              </div>

              {/* Username */}
              <span className="hidden sm:block">{user.username}</span>

              {/* Dropdown Icon */}
              <ChevronDown size={20} />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-stone-900 text-black dark:text-white rounded-lg shadow-lg overflow-hidden z-40 animate-fade-in border border-stone-300 dark:border-stone-700">
                {/* Profile */}
                <Link
                  href={"/profile"}
                  className="flex items-center gap-2 px-4 py-3 dark:bg-stone-800 hover:bg-gray-200 dark:hover:bg-stone-700 transition"
                >
                  <User
                    size={20}
                    className="text-gray-600 dark:text-gray-300"
                  />
                  <span className="font-medium tracking-tighter">Profile</span>
                </Link>

                <hr className="border-gray-300 dark:border-stone-700" />

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-4 py-3 hover:bg-gray-200 dark:hover:bg-stone-700 transition tracking-tighter"
                >
                  <LogOut
                    size={20}
                    className="text-red-500 dark:text-red-400"
                  />
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </nav>
  );
}

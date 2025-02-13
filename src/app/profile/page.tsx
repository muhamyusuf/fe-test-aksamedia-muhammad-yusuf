"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated, getUser, updateUser, logout } from "@/utils/auth";
import { Save, LogOut, MoveLeftIcon } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/navbar";

export default function ProfilePage() {
  const [user, setUser] = useState<{ username: string } | null>(null);
  const [newUsername, setNewUsername] = useState("");
  const router = useRouter();

  // Periksa apakah user sudah login
  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/sign-in");
      return;
    }
    const loggedInUser = getUser();
    setUser(loggedInUser);
    setNewUsername(loggedInUser?.username || "");
  }, [router]);

  // Menangani perubahan username
  const handleSaveChanges = () => {
    if (!newUsername.trim()) return;
    updateUser({ username: newUsername });
    setUser({ username: newUsername });
  };

  // Logout user
  const handleLogout = () => {
    logout();
    router.push("/sign-in");
  };

  return (
    <>
      <Navbar />

      <div className="p-6 mx-auto min-h-screen bg-white dark:bg-stone-950 text-black dark:text-white flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-6">Profile</h1>

        {/* Link back to / */}
        <div className="mb-10 self-start">
          <Link
            href="/"
            className="flex gap-3 items-center text-stone-600 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 transition"
          >
            <MoveLeftIcon size={18} />
            Back to Dashboard
          </Link>
        </div>

        {user ? (
          <div className="w-full bg-stone-200 dark:bg-stone-900 p-6 rounded-lg shadow-md dark:shadow-stone-800">
            {/* Profile Icon & Username */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 flex items-center justify-center bg-stone-300 text-black dark:bg-stone-700 dark:text-white font-bold text-2xl rounded-full">
                {user.username.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="text-xl font-semibold">{user.username}</h2>
                <p className="text-stone-500 dark:text-stone-400">
                  User Profile
                </p>
              </div>
            </div>

            {/* Form untuk Mengubah Username */}
            <div className="mb-4">
              <label className="block text-stone-700 dark:text-stone-300 mb-2">
                Username
              </label>
              <input
                type="text"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                className="w-full p-2 border border-stone-400 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 rounded text-stone-900 dark:text-white focus:ring focus:ring-stone-500 outline-none transition"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-3 flex-col md:flex-row">
              <button
                onClick={handleSaveChanges}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition"
              >
                <Save size={18} />
                Save Changes
              </button>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>
        ) : (
          <p className="text-stone-500 dark:text-stone-400">
            Loading user data...
          </p>
        )}
      </div>
    </>
  );
}

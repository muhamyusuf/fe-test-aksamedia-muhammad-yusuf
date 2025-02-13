"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { isAuthenticated, login } from "@/utils/auth";

export default function SignInPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Jika user sudah login, arahkan ke dashboard
    if (isAuthenticated()) {
      router.push("/");
    }
  }, [router]);

  const handleLogin = () => {
    setError(""); // Reset error sebelum login

    if (username.trim() === "" || password.trim() === "") {
      setError("Username and password are required!");
      return;
    }

    const success = login(username, password);

    if (!success) {
      setError("Invalid username or password!");
      return;
    }

    router.push("/"); // Redirect ke dashboard jika sukses
  };

  // Menangani event Enter untuk login langsung
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white text-black dark:bg-stone-950 dark:text-white transition-colors">
      <div className="bg-stone-200 dark:bg-stone-900 p-6 rounded-lg shadow-lg w-96 transition-colors">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500 text-white text-center p-2 mb-4 rounded transition">
            {error}
          </div>
        )}

        {/* Username Input */}
        <label className="block text-stone-600 dark:text-stone-400 mb-1">
          Username
        </label>
        <input
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={handleKeyDown} // Event Enter diinput username
          className="w-full p-2 border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 rounded text-black dark:text-white focus:ring focus:ring-stone-500 mb-4 transition"
        />

        {/* Password Input */}
        <label className="block text-stone-600 dark:text-stone-400 mb-1">
          Password
        </label>
        <div className="relative w-full">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown} // Event Enter diinput password
            className="w-full p-2 border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 rounded text-black dark:text-white focus:ring focus:ring-stone-500 transition"
          />
          <button
            type="button"
            className="absolute right-3 top-2 text-stone-500 dark:text-stone-400 hover:text-stone-400 dark:hover:text-stone-300 transition"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="w-full bg-stone-600 dark:bg-stone-700 hover:bg-stone-500 dark:hover:bg-stone-600 text-white font-bold py-2 px-4 rounded transition mt-4"
        >
          Login
        </button>
      </div>
    </div>
  );
}

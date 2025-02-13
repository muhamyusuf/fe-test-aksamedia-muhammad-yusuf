// Mock data pengguna yang diperbolehkan login
const mockUsers = [
  { username: "admin", password: "admin123" },
  { username: "user1", password: "password1" },
  { username: "guest", password: "guestpass" },
];

export const isAuthenticated = (): boolean => {
  if (typeof window === "undefined") return false; // Hindari akses di SSR

  return document.cookie
    .split("; ")
    .some((cookie) => cookie.startsWith("user="));
};

export const getUser = (): { username: string } | null => {
  if (typeof window === "undefined") return null; // Hindari akses di SSR

  const cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("user="));

  if (!cookie) return null;

  return JSON.parse(decodeURIComponent(cookie.split("=")[1]));
};

export const updateUser = (updatedData: { username: string }) => {
  if (typeof document !== "undefined") {
    const userData = JSON.stringify(updatedData);
    document.cookie = `user=${encodeURIComponent(userData)}; path=/; max-age=${
      7 * 24 * 60 * 60
    }; Secure`;
  }
};

export const login = (username: string, password: string): boolean => {
  if (!username || !password) return false;

  // Cek apakah user ada di mock data
  const userExists = mockUsers.find(
    (user) => user.username === username && user.password === password
  );

  if (!userExists) {
    return false; // Login gagal jika tidak ditemukan
  }

  const userData = JSON.stringify({ username });

  // Set cookie dengan user data (expires dalam 7 hari)
  document.cookie = `user=${encodeURIComponent(userData)}; path=/; max-age=${
    7 * 24 * 60 * 60
  }; Secure`;

  return true; // Login berhasil
};

export const logout = () => {
  // Hapus cookie dengan mengatur max-age ke 0
  document.cookie = "user=; path=/; max-age=0";
};

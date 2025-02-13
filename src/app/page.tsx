"use client"
import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { isAuthenticated, getUser } from "@/utils/auth"
import { getItems, addItem, deleteItem, updateItem } from "@/utils/storage"
import { Trash2, Plus, Search, Edit } from "lucide-react"
import Navbar from "@/components/navbar"
import { useAlert } from "@/context/alert-context"

export default function PageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Page />
    </Suspense>
  )
}

function Page() {
  const [user, setUser] = useState<{ username: string } | null>(null)
  const [items, setItems] = useState<{ id: number; name: string }[]>([])
  const [search, setSearch] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [editItem, setEditItem] = useState<{ id: number; name: string } | null>(
    null
  )
  const itemsPerPage = 5
  const router = useRouter()
  const searchParams = useSearchParams()
  const { showAlert } = useAlert()

  // Periksa apakah user sudah login
  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/sign-in")
      return
    }
    setUser(getUser())
    setItems(getItems())
  }, [router, setUser])

  // Baca query string saat halaman dimuat atau berubah
  useEffect(() => {
    const querySearch = searchParams.get("search") || ""
    const queryPage = parseInt(searchParams.get("page") || "1", 10)

    setSearch(querySearch)
    setDebouncedSearch(querySearch)
    setCurrentPage(queryPage)
  }, [searchParams])

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      if (debouncedSearch !== search) {
        setDebouncedSearch(search)
        router.push(`/?search=${search}&page=${currentPage}`)
      }
    }, 500)

    return () => clearTimeout(handler)
  }, [search, debouncedSearch, currentPage, router])

  // Handle search input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearch = e.target.value

    setSearch(newSearch)

    // Reset pagination to first page
    if (currentPage !== 1) {
      setCurrentPage(1)
      router.push(`/?search=${newSearch}&page=1`)
    }
  }

  // Handle pagination
  const handlePageChange = (newPage: number) => {
    if (newPage !== currentPage) {
      setCurrentPage(newPage)
      router.push(`/?search=${debouncedSearch}&page=${newPage}`)
    }
  }

  // Menambahkan item baru
  const handleAddItem = () => {
    console.log("Add Item...")
    const updatedItems = addItem(`Item ${items.length + 1}`)
    setItems(updatedItems)
    showAlert("Item added successfully!", "success")
  }

  // Menghapus item berdasarkan ID
  const handleDeleteItem = (id: number) => {
    const updatedItems = deleteItem(id)
    setItems(updatedItems)
    showAlert("Item deleted successfully!", "success")
  }

  // Membuka modal edit
  const handleEditItem = (item: { id: number; name: string }) => {
    setEditItem(item)
  }

  // Menyimpan perubahan nama item
  const handleSaveEdit = () => {
    if (!editItem || !editItem.name.trim()) return
    const updatedItems = updateItem(editItem.id, editItem.name)
    setItems(updatedItems)
    setEditItem(null) // Tutup modal setelah edit
    showAlert("Item updated successfully!", "success")
  }

  // Filter berdasarkan pencarian
  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(debouncedSearch.toLowerCase())
  )

  // Pagination Logic
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage)
  const displayedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <>
      <Navbar />

      <div className="p-2 md:p-6 mx-auto min-h-screen bg-white dark:bg-stone-950">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-black dark:text-white tracking-tighter">
            Dashboard
          </h1>
        </div>

        {user && (
          <p className="mb-4 text-black dark:text-white tracking-tighter">
            Welcome, {user.username}!
          </p>
        )}

        {/* Search Input */}
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={handleSearchChange}
            className="w-full p-2 border border-stone-600 bg-white dark:bg-stone-800 dark:border-stone-700 rounded-lg text-black dark:text-white focus:ring focus:ring-stone-500 tracking-tighter"
          />

          <Search className="absolute right-3 top-3 text-stone-400" size={20} />
        </div>

        {/* Add Item Button */}
        <button
          onClick={handleAddItem}
          className="flex items-center gap-2 bg-stone-100 dark:bg-stone-800 text-black dark:text-white font-bold py-2 px-4 rounded-lg w-full hover:bg-stone-200 dark:hover:bg-stone-700 mb-4 transition"
        >
          <Plus size={20} />
          Add Item
        </button>

        {/* Items List */}
        <ul className="border border-stone-300 dark:border-stone-600 rounded-lg p-4 bg-white dark:bg-stone-900 tracking-tighter">
          <h2 className="text-2xl font-bold text-black dark:text-white tracking-tighter">
            List Items
          </h2>

          {displayedItems.length > 0 ? (
            displayedItems.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center py-2 border-b border-stone-200 dark:border-stone-700"
              >
                <span className="text-black dark:text-white">{item.name}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditItem(item)}
                    className="text-yellow-600 dark:text-yellow-400 hover:text-yellow-500 transition"
                  >
                    <Edit size={20} />
                  </button>

                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="text-red-600 dark:text-red-400 hover:text-red-500 transition"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </li>
            ))
          ) : (
            <p className="text-stone-500 dark:text-stone-400 text-center">
              No items found.
            </p>
          )}
        </ul>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-4 gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 border border-stone-300 dark:border-stone-500 rounded-lg ${
                  page === currentPage
                    ? "bg-stone-200 dark:bg-stone-700 text-black dark:text-white"
                    : "bg-stone-100 dark:bg-stone-800 text-black dark:text-white"
                } transition hover:bg-stone-300 dark:hover:bg-stone-600`}
              >
                {page}
              </button>
            ))}
          </div>
        )}

        {/* Modal Edit Item */}
        {editItem && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-md transition-opacity duration-300 z-50"
            onClick={() => setEditItem(null)} // Klik di luar modal untuk menutup
          >
            <div
              className="relative bg-white dark:bg-stone-900 p-6 rounded-lg shadow-xl text-black dark:text-white w-96 animate-fadeIn"
              onClick={(e) => e.stopPropagation()} // Hindari modal tertutup saat diklik di dalamnya
            >
              {/* Header */}
              <div className="flex justify-between items-center border-b border-stone-300 dark:border-stone-700 pb-3">
                <h2 className="text-xl font-bold">Edit Item</h2>
                <button
                  onClick={() => setEditItem(null)}
                  className="text-stone-500 dark:text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 transition"
                >
                  ✕
                </button>
              </div>

              {/* Input Field */}
              <div className="mt-4">
                <label className="block text-stone-600 dark:text-stone-300 text-sm mb-2">
                  Item Name
                </label>
                <input
                  type="text"
                  value={editItem.name}
                  onChange={(e) =>
                    setEditItem({ ...editItem, name: e.target.value })
                  }
                  className="w-full p-2 border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 rounded-lg text-black dark:text-white focus:ring focus:ring-stone-500 outline-none transition"
                  autoFocus
                />
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-1 mt-5">
                <button
                  onClick={() => setEditItem(null)}
                  className="px-4 py-2 rounded-lg bg-stone-300 dark:bg-stone-800 hover:bg-stone-400 dark:hover:bg-stone-600 text-black dark:text-white transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="px-4 py-2 rounded-lg bg-stone-500 dark:bg-stone-700 hover:bg-stone-600 dark:hover:bg-stone-600 text-white transition"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

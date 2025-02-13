export const getItems = (): { id: number; name: string }[] => {
  return JSON.parse(localStorage.getItem("items") || "[]")
}

export const addItem = (name: string): { id: number; name: string }[] => {
  const newItem = { id: Date.now(), name }
  const updatedItems = [...getItems(), newItem]
  localStorage.setItem("items", JSON.stringify(updatedItems))
  return updatedItems
}

export const deleteItem = (id: number): { id: number; name: string }[] => {
  const updatedItems = getItems().filter((item) => item.id !== id)
  localStorage.setItem("items", JSON.stringify(updatedItems))
  return updatedItems
}

export const updateItem = (id: number, newName: string) => {
  const items = JSON.parse(localStorage.getItem("items") || "[]")
  const updatedItems = items.map((item: { id: number; name: string }) =>
    item.id === id ? { ...item, name: newName } : item
  )
  localStorage.setItem("items", JSON.stringify(updatedItems))
  return updatedItems
}

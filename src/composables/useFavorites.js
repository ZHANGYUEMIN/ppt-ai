import { ref, watch } from 'vue'

const STORAGE_KEY = 'ai-ppt-toolkit-favorites'

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function useFavorites() {
  const favoriteIds = ref(load())

  watch(
    favoriteIds,
    (v) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(v))
    },
    { deep: true }
  )

  function toggleFavorite(id) {
    const i = favoriteIds.value.indexOf(id)
    if (i >= 0) favoriteIds.value = favoriteIds.value.filter((x) => x !== id)
    else favoriteIds.value = [...favoriteIds.value, id]
  }

  function isFavorite(id) {
    return favoriteIds.value.includes(id)
  }

  return { favoriteIds, toggleFavorite, isFavorite }
}

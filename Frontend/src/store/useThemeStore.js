import { create } from 'zustand'

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("echooo-theme") || "forest",
  setTheme: (theme) => {
    localStorage.setItem("echooo-theme",theme);
    set({theme})
  },
}))
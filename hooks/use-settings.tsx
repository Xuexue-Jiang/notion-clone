"use client"

import { create } from "zustand"


type SettingsStor = {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export const useSettings = create<SettingsStor>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}))
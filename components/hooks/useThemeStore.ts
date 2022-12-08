import create from 'zustand'
import { getThemeMode } from '@utils/cookies'
import { Mode } from '@kalidao/reality/dist/types/tokens'

type ThemeStore = {
  mode: Mode
  toggleMode: () => void
}

export const useThemeStore = create<ThemeStore>((set) => ({
  mode: getThemeMode() ?? 'dark',
  toggleMode: () => set((state) => ({ mode: state.mode === 'dark' ? 'light' : 'dark' })),
}))

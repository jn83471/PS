export type ThemeId =
  | 'default'
  | 'dark'
  | 'pino'
  | 'oceano'
  | 'lavanda'
  | 'atardecer'
  | 'arena'
  | 'rosa'
  | 'grafito'
  | 'aurora'

export type ThemeOption = {
  id: ThemeId
  name: string
  description: string
  colors: [string, string, string]
}



const storageKey = 'tkg-color-theme'


export function readThemePreference(): string  {
  try {
    const savedTheme = window.localStorage.getItem(storageKey)
    return savedTheme??'default'
  } catch (error) {
    console.error('No se pudo leer el tema guardado en este equipo:', error)
    return 'default'
  }
}

export function saveThemePreference(theme: string): void {
  window.localStorage.setItem(storageKey, theme)
}

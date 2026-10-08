/** Acceso a localStorage tolerante a fallos (modo privado, storage bloqueado, etc.). */
export function readStorage(key: string): string | null {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

export function writeStorage(key: string, value: string) {
  try {
    localStorage.setItem(key, value)
  } catch {
    // sin persistencia: el valor vive solo en memoria
  }
}

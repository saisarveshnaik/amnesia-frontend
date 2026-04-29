import type { AuthUser } from '../api/authApi'

export const AUTH_TOKEN_KEY = 'amnesia_token'
export const AUTH_USER_KEY = 'amnesia_user'

export const getAuthToken = (): string | null => localStorage.getItem(AUTH_TOKEN_KEY)

export const getStoredUser = (): AuthUser | null => {
  const rawUser = localStorage.getItem(AUTH_USER_KEY)

  if (!rawUser) {
    return null
  }

  try {
    return JSON.parse(rawUser) as AuthUser
  } catch {
    return null
  }
}

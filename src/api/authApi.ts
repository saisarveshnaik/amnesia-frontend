import { AUTH_ENDPOINTS } from './endpoints'

export type AuthUser = {
  id: string
  name: string
  email: string
}

type AuthResponse = {
  success: boolean
  message: string
  token: string
  user: AuthUser
}

type RegisterPayload = {
  name: string
  email: string
  password: string
}

type LoginPayload = {
  email: string
  password: string
}

const FALLBACK_ERROR_MESSAGE = 'Unable to connect to server. Please try again.'

const callAuthApi = async (url: string, payload: RegisterPayload | LoginPayload): Promise<AuthResponse> => {
  let response: Response

  try {
    response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
  } catch {
    throw new Error(FALLBACK_ERROR_MESSAGE)
  }

  let data: Partial<AuthResponse> & { message?: string }

  try {
    data = (await response.json()) as Partial<AuthResponse> & { message?: string }
  } catch {
    throw new Error(FALLBACK_ERROR_MESSAGE)
  }

  if (!response.ok || !data.success) {
    throw new Error(data.message || FALLBACK_ERROR_MESSAGE)
  }

  if (!data.token || !data.user) {
    throw new Error(FALLBACK_ERROR_MESSAGE)
  }

  return {
    success: true,
    message: data.message || 'Success',
    token: data.token,
    user: data.user,
  }
}

export const registerUser = (payload: RegisterPayload) => callAuthApi(AUTH_ENDPOINTS.register, payload)

export const loginUser = (payload: LoginPayload) => callAuthApi(AUTH_ENDPOINTS.login, payload)

const baseUrlFromEnv = import.meta.env.VITE_API_URL?.trim()

export const BASE_URL = baseUrlFromEnv && baseUrlFromEnv.length > 0
  ? baseUrlFromEnv
  : 'http://localhost:5001'

export const AUTH_ENDPOINTS = {
  register: `${BASE_URL}/api/auth/register`,
  login: `${BASE_URL}/api/auth/login`,
}

export const PAYMENT_ENDPOINTS = {
  create: `${BASE_URL}/api/payments/create`,
  status: (transactionId: string) => `${BASE_URL}/api/payments/status/${encodeURIComponent(transactionId)}`,
  store: `${BASE_URL}/api/payments/store`,
  freeSubscribe: `${BASE_URL}/api/payments/free`,
  freeStatus: `${BASE_URL}/api/payments/free/status`,
}

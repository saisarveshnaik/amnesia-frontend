import { PAYMENT_ENDPOINTS } from './endpoints'

export type CreatePaymentResponse = {
  transactionId: string
  status: string
  amount: number
  currency: string
  checkoutUrl: string
}

export type PaymentStatusResponse = {
  transactionId: string
  status: string
  amount: number
  currency: string
  paymentMethod?: string
  provider?: string
  providerTransactionId?: string
  reference?: string
  metadata?: Record<string, unknown>
}

export type StoredPaymentResponse = {
  transactionId: string
  status: string
  amount: number
  currency: string
  vpnCode: string
}

const FALLBACK_ERROR_MESSAGE = 'Unable to process payment request. Please try again.'

const callPaymentApi = async <T>(url: string, token: string, options: RequestInit = {}): Promise<T> => {
  let response: Response

  try {
    response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        ...(options.headers || {}),
      },
    })
  } catch {
    throw new Error(FALLBACK_ERROR_MESSAGE)
  }

  let data: { success?: boolean; message?: string; data?: T }

  try {
    data = (await response.json()) as { success?: boolean; message?: string; data?: T }
  } catch {
    throw new Error(FALLBACK_ERROR_MESSAGE)
  }

  if (!response.ok || !data.success || !data.data) {
    throw new Error(data.message || FALLBACK_ERROR_MESSAGE)
  }

  return data.data
}

export const createPremiumPayment = (token: string) =>
  callPaymentApi<CreatePaymentResponse>(PAYMENT_ENDPOINTS.create, token, {
    method: 'POST',
    body: JSON.stringify({}),
  })

export const getPaymentStatus = (token: string, transactionId: string) =>
  callPaymentApi<PaymentStatusResponse>(PAYMENT_ENDPOINTS.status(transactionId), token)

export const storeCompletedPayment = (token: string, transactionId: string) =>
  callPaymentApi<StoredPaymentResponse>(PAYMENT_ENDPOINTS.store, token, {
    method: 'POST',
    body: JSON.stringify({ transactionId }),
  })

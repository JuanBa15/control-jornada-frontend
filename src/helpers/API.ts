export const JSON_HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json'
}

export class ApiError extends Error {
  status: number
  body: unknown

  constructor(status: number, message: string, body: unknown) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.body = body
  }
}

const readBody = async (response: Response): Promise<unknown> => {
  const text = await response.text()
  if (!text) return null
  try {
    return JSON.parse(text)
  } catch {
    return text
  }
}

const getBodyMessage = (body: unknown): string => {
  if (typeof body === 'string') return body

  if (typeof body !== 'object' || body === null) return ''

  const record = body as Record<string, unknown>
  // Spring suele enviar también `error: "Conflict"`, pero ese valor
  // describe el estado HTTP y no es el mensaje que debe ver el usuario.
  const messageFields = ['message', 'detail', 'exception', 'error']

  return messageFields.reduce((message, field) => {
    if (message) return message

    const value = record[field]
    return typeof value === 'string' ? value : ''
  }, '')
}

export const handleResponse = async <T>(response: Response): Promise<T> => {
  const body = await readBody(response)

  if (!response.ok) {
    const message = getBodyMessage(body) || `Error ${response.status}`
    throw new ApiError(response.status, message, body)
  }

  return body as T
}

export const request = async <T>(
  input: RequestInfo,
  init?: RequestInit
): Promise<T> => {
  try {
    const response = await fetch(input, init)

    return handleResponse<T>(response)
  } catch (error) {
    if (error instanceof TypeError) {
      throw new TypeError('No se pudo conectar con el servidor', {
        cause: error
      })
    }

    throw error
  }
}

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof ApiError) {
    // Cuando el backend entrega un conflicto, su mensaje es la fuente de verdad.
    if (error.status === 409) return error.message

    const fullMessage = `${error.message} ${getBodyMessage(error.body)}`.toLowerCase()

    if (
      fullMessage.includes('foreign key') ||
      fullMessage.includes('referential') ||
      fullMessage.includes('constraint') ||
      fullMessage.includes('violates')
    ) {
      return 'No se puede eliminar este registro porque está siendo utilizado'
    }

    if (error.status === 404) return 'El registro no existe'
    if (error.status >= 500) return 'Error en el servidor, intenta más tarde'
    return error.message
  }
  if (error instanceof TypeError) {
    return 'No se pudo conectar con el servidor'
  }
  return 'Ocurrió un error inesperado'
}

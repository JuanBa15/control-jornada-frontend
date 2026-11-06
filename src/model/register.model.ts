
import type { JustificationModel } from './justification.model'

export interface RegisterModel {
  id: number
  employeeId: number
  startOfTheDay: string
  entry: string | null
  exit: string | null
  breakTime: string | null
  backToWork: string | null
  day: string
  justificationId: number | null

  // Objeto completo devuelto por el backend
  justification: JustificationModel | null

  active?: boolean
  inUse?: boolean
}

export type RegisterRequest = Omit<
  RegisterModel,
  'id' | 'justification'
>

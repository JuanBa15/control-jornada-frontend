export interface MaritalStatusModel {
  id: number
  name: string
}

export type MaritalStatusRequest = Omit<MaritalStatusModel, 'id'>
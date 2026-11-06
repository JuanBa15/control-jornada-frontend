
export interface JustificationTypeOption {
  id: number
  name: string
}

export interface JustificationModel {
  id: number
  comments: string | null
  attachment: string | null

  // Propiedad utilizada por main
  justificationType: JustificationTypeOption

  // Propiedades utilizadas por tu CRUD de registros
  justificationTypeId?: number
  justificationTypeName?: string | null
}

export type JustificationRequest = Omit<
  JustificationModel,
  'id' | 'justificationType'
>

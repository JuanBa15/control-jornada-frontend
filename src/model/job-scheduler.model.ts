export interface JobSchedulerModel {
  id: number
  name: string

  monday?: boolean
  monday_from?: string | null
  monday_to?: string | null

  tuesday?: boolean
  tuesday_from?: string | null
  tuesday_to?: string | null

  wednesday?: boolean
  wednesday_from?: string | null
  wednesday_to?: string | null

  thursday?: boolean
  thursday_from?: string | null
  thursday_to?: string | null

  friday?: boolean
  friday_from?: string | null
  friday_to?: string | null

  saturday?: boolean
  saturday_from?: string | null
  saturday_to?: string | null

  sunday?: boolean
  sunday_from?: string | null
  sunday_to?: string | null
}
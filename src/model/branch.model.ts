import { CommuneModel } from './commune.model'
import { CompanyModel } from './company.model'

export interface BranchModel {
  id: number
  company: Pick<CompanyModel, 'id' | 'name'>
  commune: Pick<CommuneModel, 'id' | 'name'>
  name: string
  address: string
  phone?: string | null
  alias?: string | null
  active?: boolean | null
}

export interface BranchRequest {
  company: Pick<CompanyModel, 'id'>
  commune: Pick<CommuneModel, 'id'>
  name: string
  address: string
  phone?: string
  alias?: string
  active?: boolean
}

import { CompanyModel } from './company.model'

export interface JobTypeModel {
  id: number
  name: string
  company: Pick<CompanyModel, 'id' | 'name'>
  branch: BranchOption
}

export interface BranchOption {
  id: number
  name: string
  company?: Pick<CompanyModel, 'id'>
}

export interface JobTypeRequest {
  name: string
  company: Pick<CompanyModel, 'id'>
  branch: Pick<BranchOption, 'id'>
}

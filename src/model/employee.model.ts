
import type { BranchModel } from './branch.model'
import type { CommuneModel } from './commune.model'
import type { ContractTypeModel } from './contract-type.model'
import type { CountryModel } from './country.model'
import type { GenderModel } from './gender.model'
import type { JobSchedulerModel } from './job-scheduler.model'
import type { JobTypeModel } from './job-type.model'
import type { MaritalStatusModel } from './marital-status.model'

// Modelo completo de empleados (main)
export interface EmployeeModel {
  id: number
  uuid?: string
  code: string
  name: string
  lastName: string
  motherLastName?: string
  address?: string
  email?: string
  phone?: string
  birthDate?: string
  contractDate?: string
  contractEndDate?: string | null
  active?: boolean
  inUse?: boolean

  branch?: BranchModel
  jobScheduler?: JobSchedulerModel
  commune?: Pick<CommuneModel, 'id' | 'name'>
  country?: CountryModel
  gender?: GenderModel
  maritalStatus?: MaritalStatusModel
  contractType?: ContractTypeModel
  jobType?: JobTypeModel
}

// Modelo para enviar datos al backend (main)
export interface EmployeeRequest {
  code: string
  name: string
  lastName: string
  motherLastName?: string
  birthDate?: string
  email?: string
  phone?: string
  address?: string
  contractDate?: string
  contractEndDate?: string | null
  branch?: { id: number }
  jobScheduler?: { id: number }
  commune?: { id: number }
  country?: { id: number }
  gender?: { id: number }
  maritalStatus?: { id: number }
  contractType?: { id: number }
  jobType?: { id: number }
  active?: boolean
}

// Modelo reducido para tu selector de empleados
export type EmployeeOption = Pick<
  EmployeeModel,
  'id' | 'code' | 'name' | 'lastName' | 'motherLastName'
>

// Función para obtener el nombre completo
export const getEmployeeFullName = (
  employee: EmployeeOption
): string =>
  [
    employee.name,
    employee.lastName,
    employee.motherLastName
  ]
    .filter(Boolean)
    .join(' ')

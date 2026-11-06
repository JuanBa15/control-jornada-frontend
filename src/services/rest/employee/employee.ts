import { handleResponse, JSON_HEADERS } from '@/helpers/API'
import {
  BranchModel,
  EmployeeModel,
  EmployeeRequest,
  GenderModel,
  JobSchedulerModel,
  JobTypeModel
} from '@/model'

const apiUrl = 'http://localhost:8080/v1/template/employee'

// ============================================================
// CRUD de empleados (backend real)
// ============================================================

export const allEmployees = async (): Promise<EmployeeModel[]> => {
  const response = await fetch(apiUrl)
  return handleResponse<EmployeeModel[]>(response)
}

export const employeeById = async (id: string | number): Promise<EmployeeModel> => {
  const response = await fetch(`${apiUrl}/${id}`)
  return handleResponse<EmployeeModel>(response)
}

export const saveEmployee = async (employee: EmployeeRequest): Promise<EmployeeModel> => {
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: JSON_HEADERS,
    body: JSON.stringify(employee)
  })
  return handleResponse<EmployeeModel>(response)
}

export const updateEmployee = async (
  id: string | number,
  employee: EmployeeRequest
): Promise<EmployeeModel> => {
  const response = await fetch(`${apiUrl}/${id}`, {
    method: 'PUT',
    headers: JSON_HEADERS,
    body: JSON.stringify(employee)
  })
  return handleResponse<EmployeeModel>(response)
}

export const deleteEmployee = async (id: string | number): Promise<void> => {
  const response = await fetch(`${apiUrl}/${id}`, { method: 'DELETE' })
  return handleResponse<void>(response)
}

// ============================================================
// CATÁLOGOS SIN SERVICE REAL TODAVÍA (mock temporal)
// Reemplaza cada uno por su service cuando tengas el endpoint.
// ============================================================

const delay = (ms = 150) => new Promise((r) => setTimeout(r, ms))

export const mockJobSchedulers = async (): Promise<JobSchedulerModel[]> => {
  await delay()
  return [
    { id: 1, name: 'Standard Day' }
  ]
}

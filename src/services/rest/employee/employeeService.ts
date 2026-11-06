import { handleResponse } from '@/helpers/API'
import type { EmployeeModel, EmployeeOption } from '@/model/employee.model'

const apiUrl = `${process.env.BASE_URL_API}/v1/template/employee`

export const getEmployees = async (): Promise<EmployeeOption[]> => {
  const response = await fetch(apiUrl)

  const employees = await handleResponse<EmployeeModel[]>(response)

  return employees.map(employee => ({
    id: employee.id,
    code: employee.code,
    name: employee.name,
    lastName: employee.lastName,
    motherLastName: employee.motherLastName
  }))
}
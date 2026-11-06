import { handleResponse, JSON_HEADERS } from '@/helpers/API'
import { MaritalStatusModel, MaritalStatusRequest } from '@/model/marital-status.model';

const apiUrl = 'http://localhost:8080/v1/template/maritialStatus'

export const allMaritalStatus = async (): Promise<MaritalStatusModel[]> => {
  const response = await fetch(apiUrl)
  return handleResponse<MaritalStatusModel[]>(response)
}

export const maritalStatusById = async (
  id: string | number
): Promise<MaritalStatusModel> => {
  const response = await fetch(`${apiUrl}/${id}`)
  return handleResponse<MaritalStatusModel>(response)
}

export const saveMaritalStatus = async (
  maritalStatus: MaritalStatusRequest
): Promise<MaritalStatusModel> => {
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: JSON_HEADERS,
    body: JSON.stringify(maritalStatus)
  })
  return handleResponse<MaritalStatusModel>(response)
}

export const updateMaritalStatus = async (
  id: string | number,
  maritalStatus: MaritalStatusModel
): Promise<MaritalStatusModel> => {
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: JSON_HEADERS,
    body: JSON.stringify(maritalStatus)
  })
  return handleResponse<MaritalStatusModel>(response)
}

export const deleteMaritalStatus = async (id: string | number): Promise<void> => {
  const response = await fetch(`${apiUrl}/${id}`, { method: 'DELETE' })
  return handleResponse<void>(response)
}
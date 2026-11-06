import { handleResponse } from '@/helpers/API'
import { GenderModel } from '@/model'

const apiUrl = 'http://localhost:8080/v1/template/gender'

export const allGenders = async (): Promise<GenderModel[]> => {
  const response = await fetch(apiUrl)
  return handleResponse<GenderModel[]>(response)
}

export const genderById = async (id: string | number): Promise<GenderModel> => {
  const response = await fetch(`${apiUrl}/${id}`)
  return handleResponse<GenderModel>(response)
}
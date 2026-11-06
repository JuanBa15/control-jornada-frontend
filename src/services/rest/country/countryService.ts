import { handleResponse, JSON_HEADERS } from '@/helpers/API'
import { CountryModel, CountryRequest } from '@/model/country.model'

//const apiUrl = `${process.env.BASE_URL_EXAMPLE}/country`
const apiUrl = 'http://localhost:8080/v1/template/country'

export const allCountries = async (): Promise<CountryModel[]> => {
  const response = await fetch(apiUrl)
  return handleResponse<CountryModel[]>(response)
}

export const countryById = async (id: string | number): Promise<CountryModel> => {
  const response = await fetch(`${apiUrl}/${id}`)
  return handleResponse<CountryModel>(response)
}

export const saveCountry = async (country: CountryRequest): Promise<CountryModel> => {
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: JSON_HEADERS,
    body: JSON.stringify(country)
  })
  return handleResponse<CountryModel>(response)
}

export const updateCountry = async (
  id: string | number,
  country: CountryRequest
  //country: CountryModel
): Promise<CountryModel> => {
  const response = await fetch(`${apiUrl}/${id}`, {
  //const response = await fetch(`${apiUrl}`, {
    method: 'PUT',
    headers: JSON_HEADERS,
    body: JSON.stringify(country)
  })
  return handleResponse<CountryModel>(response)
}

export const deleteCountry = async (id: string | number): Promise<void> => {
  const response = await fetch(`${apiUrl}/${id}`, { method: 'DELETE' })
  return handleResponse<void>(response)
}

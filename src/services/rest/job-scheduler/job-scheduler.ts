import { handleResponse } from '@/helpers/API'
import { JobSchedulerModel } from '@/model'

const apiUrl = 'http://localhost:8080/v1/template/job-scheduler'

export const allJobSchedulers = async (): Promise<JobSchedulerModel[]> => {
  const response = await fetch(apiUrl)
  return handleResponse<JobSchedulerModel[]>(response)
}

export const jobSchedulerById = async (id: string | number): Promise<JobSchedulerModel> => {
  const response = await fetch(`${apiUrl}/${id}`)
  return handleResponse<JobSchedulerModel>(response)
}
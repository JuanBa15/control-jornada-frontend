import * as Yup from 'yup'
import * as yup from 'yup'

export const TABLE_HEAD = [
  { id: 'id', label: 'ID' },
  { id: 'name', label: 'Nombre' },
  { id: '', label: '' }
]

export type MaritalStatusFormValues = {
  name: string
}

export const MARITAL_STATUS_DEFAULT_VALUES: MaritalStatusFormValues = {
  name: ''
}

export const MaritalStatusSchema = yup.object().shape({
  name: yup.string().required('El nombre es obligatorio')
})
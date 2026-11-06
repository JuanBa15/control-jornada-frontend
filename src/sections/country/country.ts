import * as Yup from 'yup'

import { TableHeadItem } from '@/components/table'

export const TABLE_HEAD: TableHeadItem[] = [
  { id: 'id', label: '#', width: 80 },
  { id: 'name', label: 'Nombre' },
  { id: 'nationality', label: 'Nacionalidad', sortable: false },
  //{ id: 'completed', label: 'Activo', width: 140 },
  { id: '', width: 110, align: 'right' }
]

const maxLengthName = 20;
const maxLengthNationality = 20;

export const CountrySchema = Yup.object({
  name: Yup.string().trim()
    .required('El nombre del país es obligatorio')
    .max(maxLengthName, `Máximo ${maxLengthName} caracteres`),

  nationality: Yup.string()
    .trim()
    .required('La nacionalidad es obligatoria')
    .max(maxLengthNationality, `Máximo ${maxLengthName} caracteres`),
})

export type CountryFormValues = Yup.InferType<typeof CountrySchema>

export const COUNTRY_DEFAULT_VALUES: CountryFormValues = {
  name: '',
  nationality: ''
}

import * as Yup from 'yup'

import { TableHeadItem } from '@/components/table'

export const TABLE_HEAD: TableHeadItem[] = [
  { id: 'id', label: '#', width: 70 },
  { id: 'name', label: 'Nombre' },
  { id: 'company', label: 'Empresa', sortable: false },
  { id: 'commune', label: 'Comuna', sortable: false },
  { id: 'address', label: 'Dirección' },
  { id: 'phone', label: 'Teléfono' },
  { id: 'alias', label: 'Alias' },
  { id: 'active', label: 'Activa', width: 100 },
  { id: '', width: 110, align: 'right' }
]

export const BranchSchema = Yup.object({
  companyId: Yup.number()
    .typeError('Selecciona una empresa')
    .required('La empresa es obligatoria')
    .moreThan(0, 'Selecciona una empresa válida'),
  communeId: Yup.number()
    .typeError('Selecciona una comuna')
    .required('La comuna es obligatoria')
    .moreThan(0, 'Selecciona una comuna válida'),
  name: Yup.string()
    .trim()
    .required('El nombre de la sucursal es obligatorio')
    .max(200, 'El nombre no puede superar los 200 caracteres'),
  address: Yup.string()
    .trim()
    .required('La dirección es obligatoria')
    .max(500, 'La dirección no puede superar los 500 caracteres'),
  phone: Yup.string()
    .max(20, 'El teléfono no puede superar los 20 caracteres')
    .matches(
      /^[0-9+()\-\s]*$/,
      'El teléfono solo puede contener números y símbolos telefónicos'
    )
    .default(''),
  alias: Yup.string()
    .max(200, 'El alias no puede superar los 200 caracteres')
    .default(''),
  active: Yup.boolean().default(true)
})

export type BranchFormValues = Yup.InferType<typeof BranchSchema>

export const BRANCH_DEFAULT_VALUES: BranchFormValues = {
  companyId: 0,
  communeId: 0,
  name: '',
  address: '',
  phone: '',
  alias: '',
  active: true
}

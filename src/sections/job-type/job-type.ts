import * as Yup from 'yup'

import { TableHeadItem } from '@/components/table'

export const TABLE_HEAD: TableHeadItem[] = [
  { id: 'id', label: '#', width: 70 },
  { id: 'name', label: 'Nombre' },
  { id: 'company', label: 'Empresa', sortable: false },
  { id: 'branch', label: 'Sucursal', sortable: false },
  { id: '', width: 110, align: 'right' }
]

export const JobTypeSchema = Yup.object({
  name: Yup.string()
    .trim()
    .required('El nombre del tipo de trabajo es obligatorio')
    .max(100, 'El nombre no puede superar los 100 caracteres'),
  companyId: Yup.number()
    .typeError('Selecciona una empresa')
    .required('La empresa es obligatoria')
    .moreThan(0, 'Selecciona una empresa válida'),
  branchId: Yup.number()
    .typeError('Selecciona una sucursal')
    .required('La sucursal es obligatoria')
    .moreThan(0, 'Selecciona una sucursal válida')
})

export type JobTypeFormValues = Yup.InferType<typeof JobTypeSchema>

export const JOB_TYPE_DEFAULT_VALUES: JobTypeFormValues = {
  name: '',
  companyId: 0,
  branchId: 0
}

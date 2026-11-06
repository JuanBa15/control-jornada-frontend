import * as Yup from 'yup'

import { TableHeadItem } from '@/components/table'

export const TABLE_HEAD: TableHeadItem[] = [
  { id: 'code', label: 'Código', width: 120 },
  { id: 'name', label: 'Nombre' },
  { id: 'lastName', label: 'Apellido', sortable: false },
  { id: 'country', label: 'Nacionalidad', sortable: false },
  { id: 'maritalStatus', label: 'Estado civil', sortable: false },
  { id: '', width: 110, align: 'right' }
]

// esquema de una FK: { id, name? }. Validamos que venga el id.
const refSchema = Yup.object({
  id: Yup.number().required(),
  name: Yup.string()
})

export const EmployeeSchema = Yup.object({
  // Datos personales
  code: Yup.string().trim().required('El código es obligatorio').max(20, 'Máximo 20 caracteres'),
  name: Yup.string().trim().required('El nombre es obligatorio').max(200, 'Máximo 200 caracteres'),
  lastName: Yup.string()
    .trim()
    .required('El apellido paterno es obligatorio')
    .max(200, 'Máximo 200 caracteres'),
  motherLastName: Yup.string().max(200, 'Máximo 200 caracteres').default(''),
  birthDate: Yup.string().required('La fecha de nacimiento es obligatoria'),

  // Contacto
  email: Yup.string().trim().email('Correo inválido').required('El correo es obligatorio'),
  phone: Yup.string().max(20, 'Máximo 20 caracteres').default(''),
  address: Yup.string().max(255, 'Máximo 255 caracteres').default(''),

  // Contrato
  contractDate: Yup.string().required('La fecha de contratación es obligatoria'),
  contractEndDate: Yup.string().nullable().default(null),

  // Clasificación (dropdowns)
  gender: refSchema.required('El género es obligatorio').nullable(),
  maritalStatus: refSchema.required('El estado civil es obligatorio').nullable(),
  jobType: refSchema.required('El tipo de puesto es obligatorio').nullable(),
  contractType: refSchema.nullable().default(null),

  // Relaciones grandes (modal)
  country: refSchema.required('La nacionalidad es obligatoria').nullable(),
  branch: refSchema.required('La sede es obligatoria').nullable(),
  commune: refSchema.required('La comuna es obligatoria').nullable(),
  jobScheduler: refSchema.required('El horario es obligatorio').nullable()
})

export type EmployeeFormValues = Yup.InferType<typeof EmployeeSchema>

export const EMPLOYEE_DEFAULT_VALUES: EmployeeFormValues = {
  code: '',
  name: '',
  lastName: '',
  motherLastName: '',
  birthDate: '',
  email: '',
  phone: '',
  address: '',
  contractDate: '',
  contractEndDate: null,
  gender: null,
  maritalStatus: null,
  jobType: null,
  contractType: null,
  country: null,
  branch: null,
  commune: null,
  jobScheduler: null
}
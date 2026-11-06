import * as Yup from 'yup'

import { TableHeadItem } from '@/components/table'

export const TABLE_HEAD: TableHeadItem[] = [
  { id: 'employeeId', label: 'Empleado' },
  { id: 'day', label: 'Fecha', align: 'left' },
  { id: 'startOfTheDay', label: 'Inicio de jornada', align: 'center' },
  { id: 'entry', label: 'Entrada', align: 'center' },
  { id: 'exit', label: 'Salida', align: 'center' },
  { id: 'breakTime', label: 'Inicio del descanso', align: 'center' },
  { id: 'backToWork', label: 'Fin del descanso', align: 'center' },
  { id: 'justificationId', label: 'Justificación'},
  { id: 'actions', label: 'Acciones', align: 'right' }
]

export const RegisterSchema = Yup.object({
  employeeId: Yup.number()
    .typeError('Selecciona un empleado')
    .required('Selecciona un empleado')
    .positive('Selecciona un empleado')
    .integer('El ID debe ser un número entero'),

  startOfTheDay: Yup.string().required(
    'La hora de inicio es obligatoria'
  ),

  entry: Yup.string().default(''),
  exit: Yup.string().default(''),
  breakTime: Yup.string().default(''),
  backToWork: Yup.string().default(''),

  day: Yup.string().required('La fecha es obligatoria'),

  justificationId: Yup.string().default(''),

  hasJustification: Yup.boolean().required(),

  justificationTypeId: Yup.number().nullable().when('hasJustification', {
    is: true,
    then: (schema) =>
    schema.required('Selecciona un tipo de justificación'),
    otherwise: (schema) => schema.notRequired()
  }),

    justificationComments: Yup.string()
    .max(200, 'Máximo 200 caracteres')
    .default(''),
})

export type RegisterFormValues = Yup.InferType<typeof RegisterSchema>

export const REGISTER_DEFAULT_VALUES: RegisterFormValues = {
  employeeId: 0,
  startOfTheDay: '',
  entry: '',
  exit: '',
  breakTime: '',
  backToWork: '',
  day: '',
  justificationId: '',
  hasJustification: false,
  justificationTypeId: null,
  justificationComments: '',
}
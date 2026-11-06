import { yupResolver } from '@hookform/resolvers/yup'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CircularProgress from '@mui/material/CircularProgress'
import Stack from '@mui/material/Stack'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import FormProvider, { RHFTextField } from '@/components/hook-form'
import { useSnackbar } from '@/components/snackbar'
import { getErrorMessage } from '@/helpers/API'
import {
  createJustificationType,
  justificationTypeById,
  updateJustificationType
} from '@/services/rest'

import {
  JUSTIFICATION_TYPE_DEFAULT_VALUES,
  JustificationTypeFormValues,
  JustificationTypeSchema
} from './justificationType'
import { JustificationTypeModel } from '@/model'
import Typography from '@mui/material/Typography'

interface Props {
  justTypeId?: string
  onClose: () => void
  onSuccess: () => void
}

export default function JustificationTypeNewEditForm({ justTypeId, onClose, onSuccess }: Props) {
  const { enqueueSnackbar } = useSnackbar()
  const [loading, setLoading] = useState(!!justTypeId)

  const methods = useForm<JustificationTypeFormValues>({
    resolver: yupResolver(JustificationTypeSchema),
    defaultValues: JUSTIFICATION_TYPE_DEFAULT_VALUES
  })

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting }
  } = methods

  useEffect(() => {
    if (!justTypeId) return

    const getJustificationType = async () => {
      try {
        const justType = await justificationTypeById(justTypeId)
        reset({
          name: justType.name
        })
      } catch (error) {
        enqueueSnackbar(getErrorMessage(error), { variant: 'error' })
      } finally {
        setLoading(false)
      }
    }

    getJustificationType()
  }, [justTypeId, reset, enqueueSnackbar])

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (justTypeId) {
        const justType: JustificationTypeModel = {
          ...data,
          id: parseInt(justTypeId)
        }
        await updateJustificationType(justType)
        enqueueSnackbar('Tipo actualizado')
      } else {
        await createJustificationType(data)
        enqueueSnackbar('Tipo creado')
      }

      onSuccess()
      onClose()
    } catch (error) {
      enqueueSnackbar(getErrorMessage(error), { variant: 'error' })
    }
  })

  if (loading) {
    return (
      <Stack alignItems="center" sx={{ py: 8 }}>
        <CircularProgress />
      </Stack>
    )
  }

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Card sx={{ p: 3 }}>
        <Typography variant='h5' fontWeight={600} sx={{ pb: 3 }}>
          { justTypeId ? "Editar tipo" : "Crear tipo" }
        </Typography>

        <Stack spacing={3}>
          <RHFTextField name="name" label="Nombre" required />

          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button
              onClick={onClose}
              variant="outlined"
              color="inherit"
            >
              Cancelar
            </Button>
            <Button type="submit" variant="contained" loading={isSubmitting}>
              {justTypeId ? 'Guardar cambios' : 'Crear tipo'}
            </Button>
          </Stack>
        </Stack>
      </Card>
    </FormProvider>
  )
}

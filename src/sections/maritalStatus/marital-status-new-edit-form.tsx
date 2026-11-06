'use client'

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
import { MaritalStatusModel } from '@/model/marital-status.model'
import { RouterLink } from '@/routes/components'
import { useRouter } from '@/routes/hooks'
import { paths } from '@/routes/paths'
import {
  maritalStatusById,
  saveMaritalStatus,
  updateMaritalStatus
} from '@/services/rest/maritalStatus/maritalStatus'

import {
  MARITAL_STATUS_DEFAULT_VALUES,
  MaritalStatusFormValues,
  MaritalStatusSchema
} from './marital-status'

interface Props {
  maritalStatusId?: string
  onSuccess?: () => void
  onCancel?: () => void
}

export default function MaritalStatusNewEditForm({
  maritalStatusId,
  onSuccess,
  onCancel
}: Props) {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const [loading, setLoading] = useState(!!maritalStatusId)

  const methods = useForm<MaritalStatusFormValues>({
    resolver: yupResolver(MaritalStatusSchema),
    defaultValues: MARITAL_STATUS_DEFAULT_VALUES
  })

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting }
  } = methods

  useEffect(() => {
    if (!maritalStatusId) return

    const getMaritalStatus = async () => {
      try {
        const maritalStatus = await maritalStatusById(maritalStatusId)
        reset({ name: maritalStatus.name })
      } catch (error) {
        enqueueSnackbar(getErrorMessage(error), { variant: 'error' })
        if (onCancel) onCancel()
        else router.push(paths.maritalStatus.list)
      } finally {
        setLoading(false)
      }
    }

    getMaritalStatus()
  }, [maritalStatusId, reset, enqueueSnackbar, router, onCancel])

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (maritalStatusId) {
        const m: MaritalStatusModel = { ...data, id: Number(maritalStatusId) }
        await updateMaritalStatus(maritalStatusId, m)
        enqueueSnackbar('Estado civil actualizado')
      } else {
        await saveMaritalStatus(data)
        enqueueSnackbar('Estado civil creado')
      }
      if (onSuccess) onSuccess()
      else router.push(paths.maritalStatus.list)
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
        <Stack spacing={3}>
          <RHFTextField name="name" label="Nombre" required />

          <Stack direction="row" spacing={2} justifyContent="flex-end">
            {onCancel ? (
              <Button onClick={onCancel} variant="outlined" color="inherit">
                Cancelar
              </Button>
            ) : (
              <Button
                component={RouterLink}
                href={paths.maritalStatus.list}
                variant="outlined"
                color="inherit"
              >
                Cancelar
              </Button>
            )}
            <Button type="submit" variant="contained" loading={isSubmitting}>
              {maritalStatusId ? 'Guardar cambios' : 'Crear estado civil'}
            </Button>
          </Stack>
        </Stack>
      </Card>
    </FormProvider>
  )
}
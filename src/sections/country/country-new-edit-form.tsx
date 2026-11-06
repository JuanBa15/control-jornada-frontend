import { yupResolver } from '@hookform/resolvers/yup'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CircularProgress from '@mui/material/CircularProgress'
import Stack from '@mui/material/Stack'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import FormProvider, { RHFSwitch, RHFTextField } from '@/components/hook-form'
import { useSnackbar } from '@/components/snackbar'
import { getErrorMessage } from '@/helpers/API'
import { RouterLink } from '@/routes/components'
import { useRouter } from '@/routes/hooks'
import { paths } from '@/routes/paths'
import { countryById, saveCountry, updateCountry } from '@/services/rest'
import { COUNTRY_DEFAULT_VALUES, CountryFormValues, CountrySchema } from './country'
import { CountryModel } from '@/model'



interface Props {
  countryId?: string
  onSuccess?: (country: CountryModel) => void
  onCancel?: () => void
}

export default function CountryNewEditForm({ countryId, onSuccess, onCancel }: Props) {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const [loading, setLoading] = useState(!!countryId)

  const methods = useForm<CountryFormValues>({
    resolver: yupResolver(CountrySchema),
    defaultValues: COUNTRY_DEFAULT_VALUES
  })

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting }
  } = methods

  useEffect(() => {
    if (!countryId) return

    const getCountry = async () => {
      try {
        const country = await countryById(countryId)
        reset({
          name: country.name,
          nationality: country.nationality
        })
      } catch (error) {
        enqueueSnackbar(getErrorMessage(error), { variant: 'error' })
        if (onCancel) {
          onCancel()
        } else {
          router.push(paths.country.list)
        }
      } finally {
        setLoading(false)
      }
    }

    getCountry()
  }, [countryId, reset, enqueueSnackbar, router, onCancel])

  const onSubmit = handleSubmit(async (data) => {
    try {
      let country: CountryModel
      if (countryId) {
        const c: CountryModel = {...data, id: Number(countryId)};
        country = await updateCountry(countryId, c)
        enqueueSnackbar('País actualizada')
      } else {
        country = await saveCountry(data)
        enqueueSnackbar('País creada')
      }
      if (onSuccess) {
        onSuccess(country)
      } else {
        router.push(paths.country.list)
      }
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
      <Card sx={onCancel ? { pt: 1, boxShadow: 'none', overflow: 'visible' } : { p: 3 }}>
        <Stack spacing={3}>
          <RHFTextField 
            name="name" 
            label="Nombre" 
            required 
          />
          <RHFTextField
            name="nationality"
            label="Nacionalidad"
            required
          />
          
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            {onCancel ? (
              <Button variant="outlined" color="inherit" onClick={onCancel}>
                Cancelar
              </Button>
            ) : (
              <Button
                component={RouterLink}
                href={paths.country.list}
                variant="outlined"
                color="inherit"
              >
                Cancelar
              </Button>
            )}
            <Button type="submit" variant="contained" loading={isSubmitting}>
              {countryId ? 'Guardar cambios' : 'Crear país'}
            </Button>
          </Stack>
        </Stack>
      </Card>
    </FormProvider>
  )
}

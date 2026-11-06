'use client'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useState } from 'react'

import EntitySelectModal from './entity-select-modal'

interface Props<T extends { id: number; name?: string }> {
  label: string
  modalTitle: string
  options: T[]
  value?: T
  required?: boolean
  getSubtitle?: (option: T) => string
  onChange: (option: T) => void
}

// Campo tipo "caja con boton Cambiar" que abre el modal de seleccion.
// Usalo para FK con muchas opciones (nacionalidad, sede, comuna...).
export default function EntitySelectField<T extends { id: number; name?: string }>({
  label,
  modalTitle,
  options,
  value,
  required,
  getSubtitle,
  onChange
}: Props<T>) {
  const [open, setOpen] = useState(false)

  return (
    <Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
        {label} {required && <span style={{ color: 'red' }}>*</span>}
      </Typography>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 1,
          px: 1.5,
          py: 1
        }}
      >
        <Typography variant="body2" color={value ? 'text.primary' : 'text.disabled'}>
          {value?.name ?? 'Sin seleccionar'}
        </Typography>
        <Button size="small" variant="outlined" onClick={() => setOpen(true)}>
          {value ? 'Cambiar' : 'Seleccionar'}
        </Button>
      </Stack>

      <EntitySelectModal
        open={open}
        title={modalTitle}
        options={options}
        selectedId={value?.id}
        getSubtitle={getSubtitle}
        onClose={() => setOpen(false)}
        onSelect={onChange}
      />
    </Box>
  )
}
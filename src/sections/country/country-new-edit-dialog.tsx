import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'

import { CountryModel } from '@/model/country.model'

import CountryNewEditForm from './country-new-edit-form'

interface Props {
  open: boolean
  countryId?: string
  onClose: () => void
  onSaved: (country: CountryModel) => void
}

export default function CountryNewEditDialog({ open, countryId, onClose, onSaved }: Props) {
  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose}>
      <DialogTitle>{countryId ? 'Editar país' : 'Crear país'}</DialogTitle>

      <DialogContent>
        <CountryNewEditForm countryId={countryId} onSuccess={onSaved} onCancel={onClose} />
      </DialogContent>
    </Dialog>
  )
}

'use client'

import Container from '@mui/material/Container'

import JustificationTypeNewEditForm from '../justification-type-new-edit-form'

interface Props {
  id: string
  onClose: () => void
  onSuccess: () => void
}

export default function JustificationTypeEditView({ id, onClose, onSuccess }: Props) {
  return (
    <Container disableGutters>
      <JustificationTypeNewEditForm justTypeId={id} onClose={onClose} onSuccess={onSuccess}/>
    </Container>
  )
}

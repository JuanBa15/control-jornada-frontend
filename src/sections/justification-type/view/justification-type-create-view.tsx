'use client'

import Container from '@mui/material/Container'

import JustificationTypeNewEditForm from '../justification-type-new-edit-form'

interface Props {
  onClose: () => void
  onSuccess: () => void
}

export default function JustificationTypeCreateView({ onClose, onSuccess } : Props) {
  return (
    <Container disableGutters>
      <JustificationTypeNewEditForm onClose={onClose} onSuccess={onSuccess}/>
    </Container>
  )
}

'use client'

import Container from '@mui/material/Container'

import CommuneNewEditForm from '../commune-new-edit-form'

interface Props {
  onSuccess: () => void
  onClose: () => void
}

export default function CommuneCreateView({ onSuccess, onClose } : Props) {
  return (
    <Container disableGutters>
      <CommuneNewEditForm onSuccess={onSuccess} onClose={onClose}/>
    </Container>
  )
}

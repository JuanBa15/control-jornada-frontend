'use client'

import Container from '@mui/material/Container'

import CommuneNewEditForm from '../commune-new-edit-form'

interface Props {
  id: string
  onSuccess: () => void
  onClose: () => void
}

export default function CommuneEditView({ id, onSuccess, onClose }: Props) {
  return (
    <Container disableGutters>
      <CommuneNewEditForm communeId={id} onSuccess={onSuccess} onClose={onClose}/>
    </Container>
  )
}
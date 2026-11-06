'use client'

import Container from '@mui/material/Container'

import CustomBreadcrumbs from '@/components/custom-breadcrumbs'
import { paths } from '@/routes/paths'

import MaritalStatusNewEditForm from '../marital-status-new-edit-form'

export default function MaritalStatusCreateView() {
  return (
    <Container maxWidth="md">
      <CustomBreadcrumbs
        heading="Crear estado civil"
        links={[
          { name: 'Estados civiles', href: paths.maritalStatus.root },
          { name: 'Agregar' }
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <MaritalStatusNewEditForm />
    </Container>
  )
}
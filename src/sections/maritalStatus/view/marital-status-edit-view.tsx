'use client'

import Container from '@mui/material/Container'

import CustomBreadcrumbs from '@/components/custom-breadcrumbs'
import { paths } from '@/routes/paths'

import MaritalStatusNewEditForm from '../marital-status-new-edit-form'

interface Props {
  id: string
}

export default function MaritalStatusEditView({ id }: Props) {
  return (
    <Container maxWidth="md">
      <CustomBreadcrumbs
        heading="Editar estado civil"
        links={[
          { name: 'Estados civiles', href: paths.maritalStatus.root },
          { name: `Estado civil #${id}` }
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />
      <MaritalStatusNewEditForm maritalStatusId={id} />
    </Container>
  )
}
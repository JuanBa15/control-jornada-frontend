'use client'

import Container from '@mui/material/Container'

import CustomBreadcrumbs from '@/components/custom-breadcrumbs'
import { paths } from '@/routes/paths'

import EmployeeNewEditForm from '../employee-new-edit-form'

interface Props {
  id: string
}

export default function EmployeeEditView({ id }: Props) {
  return (
    <Container maxWidth="md">
      <CustomBreadcrumbs
        heading="Editar empleado"
        links={[
          { name: 'Empleados', href: paths.employee.root },
          { name: `Empleado #${id}` }
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <EmployeeNewEditForm employeeId={id} />
    </Container>
  )
}

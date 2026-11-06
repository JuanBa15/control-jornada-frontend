'use client'

import Container from '@mui/material/Container'

import CustomBreadcrumbs from '@/components/custom-breadcrumbs'
import { paths } from '@/routes/paths'

import EmployeeNewEditForm from '../employee-new-edit-form'

export default function EmployeeCreateView() {
  return (
    <Container maxWidth="md">
      <CustomBreadcrumbs
        heading="Crear empleado"
        links={[
          { name: 'Empleados', href: paths.employee.root },
          { name: 'Agregar' }
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <EmployeeNewEditForm />
    </Container>
  )
}

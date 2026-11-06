import Button from '@mui/material/Button'
import Container from '@mui/material/Container'

import { EmptyContent } from '@/components/empty-content'
import { RouterLink } from '@/routes/components'
import { paths } from '@/routes/paths'

export const metadata = {
  title: 'Página no encontrada'
}

export default function NotFound() {
  return (
    <Container maxWidth="md" sx={{ textAlign: 'center', py: 5 }}>
      <EmptyContent
        image="/assets/illustrations/page-not-exist.svg"
        message="La página no existe"
        imageWidth={280}
      />
      <Button component={RouterLink} href={paths.home} variant="contained">
        Ir al inicio
      </Button>
    </Container>
  )
}

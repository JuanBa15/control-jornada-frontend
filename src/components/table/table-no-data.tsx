import { Box } from '@mui/material'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'

interface Props {
  colSpan: number
  message?: string
  image?: string
}

export default function TableNoData({
  colSpan,
  message = 'No hay registros para mostrar',
  image
}: Props) {
  return (
    <TableRow>
      <TableCell colSpan={colSpan} align="center" sx={{ py: 6 }}>
    
        {image && (
          <Box
            component="img"
            src={image}
            alt=""
            sx={{ display: 'block', width: 200, maxWidth: '100%', mx: 'auto', mb: 2 }}
          />
        )}

        <Typography variant="body2" color="text.secondary">
          {message}
        </Typography>
        
        
      </TableCell>
    </TableRow>
  )
}

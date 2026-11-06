import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

interface Props {
  image: string
  message: string
  imageWidth?: number
}

export default function EmptyContent({
  image,
  message,
  imageWidth = 240
}: Props) {
  return (
    <Box sx={{ py: 8, px: 2, textAlign: 'center' }}>
      <Box
        component="img"
        src={image}
        alt=""
        sx={{
          display: 'block',
          width: imageWidth,
          maxWidth: '100%',
          mx: 'auto',
          mb: 2
        }}
      />

      <Typography variant="body2" color="text.secondary" fontSize={17}>
        {message}
      </Typography>
    </Box>
  )
}

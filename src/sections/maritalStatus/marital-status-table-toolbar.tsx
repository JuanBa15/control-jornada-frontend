import SearchIcon from '@mui/icons-material/Search'
import InputAdornment from '@mui/material/InputAdornment'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'

interface Props {
  text: string
  onChangeText: (value: string) => void
}

export default function MaritalStatusTableToolbar({ text, onChangeText }: Props) {
  return (
    <Stack direction="row" sx={{ p: 2.5 }}>
      <TextField
        fullWidth
        value={text}
        onChange={(event) => onChangeText(event.target.value)}
        placeholder="Buscar por nombre..."
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            )
          }
        }}
      />
    </Stack>
  )
}
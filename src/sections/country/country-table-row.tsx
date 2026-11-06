import DeleteIcon from '@mui/icons-material/DeleteOutline'
import EditIcon from '@mui/icons-material/EditOutlined'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'

import { ConfirmDialog } from '@/components/custom-dialog'
import { useBoolean } from '@/hooks/use-boolean'
import { CountryModel } from '@/model/country.model'

export type DeleteResult = 'deleted' | 'conflict' | 'error'

interface Props {
  row: CountryModel
  onEditRow: VoidFunction
  onDeleteRow: () => Promise<DeleteResult>
  // Se llama al cerrarse el modal de "País eliminado", para quitar la fila
  onRemoved: VoidFunction
  // Milisegundos que permanecen visibles los modales de resultado (eliminado / con dependencias)
  resultDialogDuration?: number
}

export default function CountryTableRow({
  row,
  onEditRow,
  onDeleteRow,
  onRemoved,
  resultDialogDuration = 3000
}: Props) {
  const confirm = useBoolean()
  const [result, setResult] = useState<DeleteResult>()
  const [deleting, setDeleting] = useState(false)

  const { value: confirmOpen, onFalse: closeConfirm } = confirm
  const showResult = result === 'deleted' || result === 'conflict'

  useEffect(() => {
    if (!confirmOpen || !showResult) return
    const timer = setTimeout(closeConfirm, resultDialogDuration)
    return () => clearTimeout(timer)
  }, [confirmOpen, showResult, resultDialogDuration, closeConfirm])

  const handleOpenConfirm = () => {
    setResult(undefined)
    confirm.onTrue()
  }

  const handleDelete = async () => {
    setDeleting(true)
    const deleteResult = await onDeleteRow()
    setDeleting(false)
    setResult(deleteResult)
    if (deleteResult === 'error') confirm.onFalse()
  }

  const handleExited = () => {
    if (result === 'deleted') onRemoved()
  }

  const renderResult = (
    image: string,
    color: string,
    message: React.ReactNode
  ) => (
    <>
      <Box
        component="img"
        src={image}
        alt=""
        sx={{
          display: 'block',
          width: 160,
          maxWidth: '100%',
          mx: 'auto',
          mb: 2
        }}
      />
      <Typography sx={{ color }} align="center">
        {message}
      </Typography>
    </>
  )

  const content =
    result === 'deleted' ? (
      renderResult(
        '/assets/illustrations/deleted-success.svg',
        '#22c55e',
        'País eliminado'
      )
    ) : result === 'conflict' ? (
      renderResult(
        '/assets/illustrations/cancelled.svg',
        'error.main',
        <>
          No se puede eliminar el país <strong>{row.name}</strong> porque tiene
          dependencias
        </>
      )
    ) : (
      <>
        ¿Seguro que quieres eliminar el país <strong>{row.name}</strong>?
      </>
    )

  return (
    <>
      <TableRow hover>
        <TableCell>{row.id}</TableCell>
        <TableCell>{row.name}</TableCell>
        <TableCell>{row.nationality}</TableCell>
        <TableCell align="right" sx={{ whiteSpace: 'nowrap' }}>
          <Tooltip title="Editar">
            <IconButton onClick={onEditRow}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Eliminar">
            <IconButton color="error" onClick={handleOpenConfirm}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        onExited={handleExited}
        title={showResult ? undefined : 'Eliminar'}
        hideCancel={showResult}
        content={content}
        action={
          !showResult && (
            <Button
              variant="contained"
              color="error"
              disabled={deleting}
              onClick={handleDelete}
            >
              Eliminar
            </Button>
          )
        }
      />
    </>
  )
}

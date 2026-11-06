import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'

import { ConfirmDialogProps } from './types'

export default function ConfirmDialog({
  open,
  title,
  content,
  action,
  onClose,
  cancelLabel = 'Cancelar',
  hideCancel = false,
  onExited
}: ConfirmDialogProps) {
  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={open}
      onClose={onClose}
      slotProps={{ transition: { onExited } }}
    >
      {title && <DialogTitle sx={{ pb: 2 }}>{title}</DialogTitle>}

      {content && (
        <DialogContent sx={{ typography: 'body2', pt: title ? 0 : 3 }}>
          {content}
        </DialogContent>
      )}

      {(action || !hideCancel) && (
        <DialogActions>
          {action}
          {!hideCancel && (
            <Button variant="outlined" color="inherit" onClick={onClose}>
              {cancelLabel}
            </Button>
          )}
        </DialogActions>
      )}
    </Dialog>
  )
}

export interface ConfirmDialogProps {
  open: boolean
  title?: React.ReactNode
  content?: React.ReactNode
  action: React.ReactNode
  onClose: VoidFunction
  cancelLabel?: string
  hideCancel?: boolean
  // Se ejecuta cuando termina la animación de cierre
  onExited?: VoidFunction
}

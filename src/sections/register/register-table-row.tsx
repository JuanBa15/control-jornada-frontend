
import DeleteIcon from '@mui/icons-material/DeleteOutline'
import EditIcon from '@mui/icons-material/EditOutlined'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import Tooltip from '@mui/material/Tooltip'

import { ConfirmDialog } from '@/components/custom-dialog'
import { useBoolean } from '@/hooks/use-boolean'
import type { RegisterModel } from '@/model'
import type { EmployeeOption } from '@/model/employee.model'
import { getEmployeeFullName } from '@/model/employee.model'

interface Props {
  row: RegisterModel
  employees: EmployeeOption[]
  onEditRow: VoidFunction
  onDeleteRow: VoidFunction
}

export default function RegisterTableRow({
  row,
  employees,
  onEditRow,
  onDeleteRow
}: Props) {
  const confirm = useBoolean()

  // Buscar al empleado real asociado al registro
  const employee = employees.find(
    employee => employee.id === row.employeeId
  )

  // Mostrar código y nombre completo
  const employeeName = employee
  ? getEmployeeFullName(employee)
  : 'Empleado no disponible'

  return (
    <>
      <TableRow hover>
        <TableCell>{employeeName}</TableCell>

        <TableCell>{row.day}</TableCell>

        <TableCell align="center">
          {row.startOfTheDay?.slice(0, 5) || '-'}
        </TableCell>

        <TableCell align="center">
          {row.entry?.slice(0, 5) || '-'}
        </TableCell>

        <TableCell align="center">
          {row.exit?.slice(0, 5) || '-'}
        </TableCell>

        <TableCell align="center">
          {row.breakTime?.slice(0, 5) || '-'}
        </TableCell>

        <TableCell align="center">
          {row.backToWork?.slice(0, 5) || '-'}
        </TableCell>

        <TableCell align="center">
          {row.justification?.justificationTypeName ?? '-'}
        </TableCell>

        <TableCell align="right" sx={{ whiteSpace: 'nowrap' }}>
          <Tooltip title="Editar">
            <IconButton onClick={onEditRow}>
              <EditIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Eliminar">
            <IconButton
              color="error"
              onClick={confirm.onTrue}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Eliminar"
        content={
          <>
            ¿Seguro que quieres eliminar el registro{' '}
            <strong>{row.id}</strong>?
          </>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              confirm.onFalse()
              onDeleteRow()
            }}
          >
            Eliminar
          </Button>
        }
      />
    </>
  )
}

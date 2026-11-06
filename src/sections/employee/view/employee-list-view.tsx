'use client'

import AddIcon from '@mui/icons-material/Add'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import Container from '@mui/material/Container'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import { useEffect, useState } from 'react'

import CustomBreadcrumbs from '@/components/custom-breadcrumbs'
import { useSnackbar } from '@/components/snackbar'
import {
  TableHeadCustom,
  TableLoading,
  TableNoData,
  TablePaginationCustom,
  useTable
} from '@/components/table'
import { getErrorMessage } from '@/helpers/API'
import { EmployeeModel } from '@/model/employee.model'
import { paths } from '@/routes/paths'
import { allEmployees, deleteEmployee } from '@/services/rest/employee/employee'
import { getComparator, includesText, Order } from '@/utils/table-filter'

import { TABLE_HEAD } from '../employee'
import EmployeeNewEditForm from '../employee-new-edit-form'
import EmployeeTableRow from '../employee-table-row'
import EmployeeTableToolbar from '../employee-table-toolbar'

function applyFilter({
  employeeList,
  searchText,
  order,
  orderBy
}: {
  employeeList: EmployeeModel[]
  searchText: string
  order: Order
  orderBy: keyof EmployeeModel
}) {
  return [...employeeList]
    .filter(
      (e) =>
        !searchText ||
        includesText(e.name, searchText) ||
        includesText(e.lastName, searchText) ||
        includesText(e.code, searchText)
    )
    .sort(getComparator<EmployeeModel>(order, orderBy))
}

export default function EmployeeListView() {
  const table = useTable()
  const { enqueueSnackbar } = useSnackbar()

  const [employeeList, setEmployeeList] = useState<EmployeeModel[]>([])
  const [loading, setLoading] = useState(true)
  const [searchText, setSearchText] = useState('')
  const [openCreate, setOpenCreate] = useState(false)
  const [editId, setEditId] = useState<string>()

  const refresh = () => allEmployees().then(setEmployeeList)

  useEffect(() => {
    const getEmployeeList = async () => {
      try {
        const response = await allEmployees()
        setEmployeeList(response)
      } catch (error) {
        enqueueSnackbar(getErrorMessage(error), { variant: 'error' })
      } finally {
        setLoading(false)
      }
    }

    getEmployeeList()
  }, [enqueueSnackbar])

  // --- Datos derivados ---
  const dataFiltered = applyFilter({
    employeeList,
    searchText,
    order: table.order,
    orderBy: table.orderBy as keyof EmployeeModel
  })

  const dataInPage = dataFiltered.slice(
    table.page * table.rowsPerPage,
    table.page * table.rowsPerPage + table.rowsPerPage
  )

  const handleSearch = (value: string) => {
    table.onResetPage()
    setSearchText(value)
  }

  const handleDeleteRow = async (id: number) => {
    try {
      await deleteEmployee(id)
      enqueueSnackbar('Empleado eliminado')
      setEmployeeList((prev) => prev.filter((e) => e.id !== id))
      if (dataInPage.length === 1 && table.page > 0) {
        table.onChangePage(null, table.page - 1)
      }
    } catch (error) {
      enqueueSnackbar(getErrorMessage(error), { variant: 'error' })
    }
  }

  const handleCreateSuccess = () => {
    setOpenCreate(false)
    refresh()
  }

  const handleEditSuccess = () => {
    setEditId(undefined)
    refresh()
  }

  // --- Render ---
  return (
    <Container maxWidth="xl">
      <CustomBreadcrumbs
        heading="Lista de empleados"
        links={[
          { name: 'Empleados', href: paths.employee.root },
          { name: 'Lista' }
        ]}
        action={
          <Button
            onClick={() => setOpenCreate(true)}
            variant="contained"
            startIcon={<AddIcon />}
          >
            Agregar
          </Button>
        }
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <Card>
        <EmployeeTableToolbar text={searchText} onChangeText={handleSearch} />

        <TableContainer>
          <Table sx={{ minWidth: 720 }}>
            <TableHeadCustom
              headLabel={TABLE_HEAD}
              order={table.order}
              orderBy={table.orderBy}
              onSort={table.onSort}
            />

            <TableBody>
              {loading && <TableLoading colSpan={TABLE_HEAD.length} />}

              {!loading &&
                dataInPage.map((row) => (
                  <EmployeeTableRow
                    key={row.id}
                    row={row}
                    onEditRow={() => setEditId(String(row.id))}
                    onDeleteRow={() => handleDeleteRow(row.id)}
                  />
                ))}

              {!loading && !dataFiltered.length && (
                <TableNoData colSpan={TABLE_HEAD.length} />
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePaginationCustom
          count={dataFiltered.length}
          page={table.page}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          onRowsPerPageChange={table.onChangeRowsPerPage}
        />
      </Card>

      {/* Modal: crear */}
      <Dialog open={openCreate} onClose={() => setOpenCreate(false)} fullWidth maxWidth="md">
        <DialogTitle>Agregar empleado</DialogTitle>
        <EmployeeNewEditForm
          onSuccess={handleCreateSuccess}
          onCancel={() => setOpenCreate(false)}
        />
      </Dialog>

      {/* Modal: editar */}
      <Dialog open={Boolean(editId)} onClose={() => setEditId(undefined)} fullWidth maxWidth="md">
        <DialogTitle>Editar empleado</DialogTitle>
        {editId && (
          <EmployeeNewEditForm
            employeeId={editId}
            onSuccess={handleEditSuccess}
            onCancel={() => setEditId(undefined)}
          />
        )}
      </Dialog>
    </Container>
  )
}
'use client'

import AddIcon from '@mui/icons-material/Add'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import Container from '@mui/material/Container'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import { useEffect, useState } from 'react'

import CustomBreadcrumbs from '@/components/custom-breadcrumbs'
import { EmptyContent } from '@/components/empty-content'
import { useSnackbar } from '@/components/snackbar'
import {
  TableHeadCustom,
  TableLoading,
  TableNoData,
  TablePaginationCustom,
  useTable
} from '@/components/table'
import { ApiError, getErrorMessage } from '@/helpers/API'
import { useBoolean } from '@/hooks/use-boolean'
import { paths } from '@/routes/paths'
import { allCountries, deleteCountry } from '@/services/rest'
import { getComparator, includesText, Order } from '@/utils/table-filter'

import { TABLE_HEAD } from '../country'
import { CountryModel } from '@/model/country.model'
import CountryNewEditDialog from '../country-new-edit-dialog'
import CountryTableRow, { DeleteResult } from '../country-table-row'
import CountryTableToolbar from '../country-table-toolbar'

export default function CountryListView() {
  const table = useTable()
  const dialog = useBoolean()
  const { enqueueSnackbar } = useSnackbar()

  const [countryList, setCountryList] = useState<CountryModel[]>([])
  const [loading, setLoading] = useState(true)
  const [searchText, setSearchText] = useState('')
  const [editingId, setEditingId] = useState<string>()
  const [loadError, setLoadError] = useState<string>()

  useEffect(() => {
    const getCountries = async () => {
      try {
        const response = await allCountries()
        setCountryList(response)
      } catch (error) {
        if (error instanceof TypeError) {
          setLoadError(getErrorMessage(error))
        } else {
          enqueueSnackbar(getErrorMessage(error), { variant: 'error' })
        }
      } finally {
        setLoading(false)
      }
    }

    getCountries()
  }, [enqueueSnackbar])

  const dataFiltered = applyFilter({
    countryList,
    searchText,
    order: table.order,
    orderBy: table.orderBy as keyof CountryModel
  })

  const dataInPage = dataFiltered.slice(
    table.page * table.rowsPerPage,
    table.page * table.rowsPerPage + table.rowsPerPage
  )

  const notFound = !loading && countryList.length > 0 && !dataFiltered.length

  const handleSearch = (value: string) => {
    table.onResetPage()
    setSearchText(value)
  }

  const handleDeleteRow = async (id: number): Promise<DeleteResult> => {
    try {
      await deleteCountry(id)
      return 'deleted'
    } catch (error) {
      if (error instanceof ApiError && error.status === 409) return 'conflict'
      enqueueSnackbar(getErrorMessage(error), { variant: 'error' })
      return 'error'
    }
  }

  // Se llama cuando se cierra el modal de "País eliminado"
  const handleRemoveRow = (id: number) => {
    setCountryList((prev) => prev.filter((country) => country.id !== id))
    if (dataInPage.length === 1 && table.page > 0) {
      table.onChangePage(null, table.page - 1)
    }
  }

  const handleAdd = () => {
    setEditingId(undefined)
    dialog.onTrue()
  }

  const handleEdit = (id: number) => {
    setEditingId(String(id))
    dialog.onTrue()
  }

  const handleSaved = (saved: CountryModel) => {
    setCountryList((prev) =>
      prev.some((country) => country.id === saved.id)
        ? prev.map((country) => (country.id === saved.id ? saved : country))
        : [...prev, saved]
    )
    dialog.onFalse()
  }

  return (
    <Container maxWidth="xl">
      <CustomBreadcrumbs
        heading="Lista de países"
        links={[
          { name: 'Países', href: paths.country.root },
          { name: 'Lista' }
        ]}
        action={
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAdd}
          >
            Agregar
          </Button>
        }
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      {loadError ? (
        <EmptyContent
          image="/assets/illustrations/server-down.svg"
          message={loadError}
        />
      ) : (
        <>
          <Card>
            <CountryTableToolbar
              text={searchText}
              onChangeText={handleSearch}
            />

            {notFound ? (
              <EmptyContent
                image="/assets/illustrations/item-not-found.svg"
                message="No existe el país que busca"
              />
            ) : (
              <>
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
                          <CountryTableRow
                            key={row.id}
                            row={row}
                            onEditRow={() => handleEdit(row.id)}
                            onDeleteRow={() => handleDeleteRow(row.id)}
                            onRemoved={() => handleRemoveRow(row.id)}
                          />
                        ))}

                      {!loading && !countryList.length && (
                        <TableNoData
                          colSpan={TABLE_HEAD.length}
                          message="No hay países por mostrar"
                          image="/assets/illustrations/empty-table.svg"
                        />
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
              </>
            )}
          </Card>
        </>
      )}

      <CountryNewEditDialog
        open={dialog.value}
        countryId={editingId}
        onClose={dialog.onFalse}
        onSaved={handleSaved}
      />
    </Container>
  )
}

function applyFilter({
  countryList,
  searchText,
  order,
  orderBy
}: {
  countryList: CountryModel[]
  searchText: string
  order: Order
  orderBy: keyof CountryModel
}) {
  return [...countryList]
    .filter(
      (country) =>
        !searchText ||
        includesText(country.name, searchText) ||
        includesText(country.nationality, searchText)
    )
    .sort(getComparator<CountryModel>(order, orderBy))
}

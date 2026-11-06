'use client'

import AddIcon from '@mui/icons-material/Add'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import Container from '@mui/material/Container'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import { useCallback, useEffect, useState } from 'react'

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
import { CommuneModel } from '@/model'
import { paths } from '@/routes/paths'
import { allCommunes, deleteCommune } from '@/services/rest'
import { getComparator, includesText, Order } from '@/utils/table-filter'

import { TABLE_HEAD } from '../commune'
import CommuneTableRow from '../commune-table-row'
import CommuneTableToolbar from '../commune-table-toolbar'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import CommuneCreateView from './commune-create-view'
import CommuneEditView from './commune-edit-view'

type ModalSelectedId = number | "no-id" | undefined

const modalBoxStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  boxShadow: 24,
  borderRadius: 3
};

export default function CommuneListView() {
  const table = useTable()
  const { enqueueSnackbar } = useSnackbar()

  const [communeList, setCommuneList] = useState<
    CommuneModel[]
  >([])
  const [loading, setLoading] = useState(true)
  const [searchText, setSearchText] = useState('')
  const [modalSelectedId, setModalSelectedId] = useState<
    ModalSelectedId
  >(undefined)

  const getCommunes = useCallback(async () => {
    try {
      const response = await allCommunes()
      setCommuneList(response)
    } catch (error) {
      enqueueSnackbar(getErrorMessage(error), { variant: 'error' })
    } finally {
      setLoading(false)
    }
  }, [enqueueSnackbar])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- [lo mismo que en JustificationType]
    getCommunes()
  }, [getCommunes])

  const dataFiltered = applyFilter({
    communeList,
    searchText,
    order: table.order,
    orderBy: table.orderBy as keyof CommuneModel
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
      await deleteCommune(id)
      enqueueSnackbar('Tipo eliminado')
      setCommuneList((prev) =>
        prev.filter((justType) => justType.id !== id)
      )
      if (dataInPage.length === 1 && table.page > 0) {
        table.onChangePage(null, table.page - 1)
      }
    } catch (error) {
      enqueueSnackbar(getErrorMessage(error), { variant: 'error' })
    }
  }

  const handleAddClick = () => {
    setModalSelectedId("no-id")
  }

  const handleEditClick = (id : number) => {
    setModalSelectedId(id)
  }
  
  const handleModalClose = () => {
    setModalSelectedId(undefined)
  }

  const handleAddEditSuccess = () => {
    setLoading(true)
    getCommunes()
  }

  return (
    <>
      <Container maxWidth="xl">
        <CustomBreadcrumbs
          heading="Lista de comunas"
          links={[
            {
              name: 'Comunas',
              href: paths.commune.root
            },
            { name: 'Lista' }
          ]}
          action={
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddClick}
            >
              Agregar
            </Button>
          }
          sx={{ mb: { xs: 3, md: 5 } }}
        />

        <Card>
          <CommuneTableToolbar
            text={searchText}
            onChangeText={handleSearch}
          />

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
                    <CommuneTableRow
                      key={row.id}
                      row={row}
                      onEditRow={() => handleEditClick(row.id)}
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
      </Container>

      <Modal
        open={!!modalSelectedId}
        onClose={handleModalClose}
      >
        <Box sx={modalBoxStyle}>
          {
            modalSelectedId && (
              modalSelectedId === 'no-id' ? (
                <CommuneCreateView onSuccess={handleAddEditSuccess} onClose={handleModalClose}/>
              ) : (
                <CommuneEditView id={modalSelectedId.toString()} onSuccess={handleAddEditSuccess} onClose={handleModalClose}/>
              )
            )
          }
        </Box>
      </Modal>
    </>
  )
}

function applyFilter({
  communeList,
  searchText,
  order,
  orderBy
}: {
  communeList: CommuneModel[]
  searchText: string
  order: Order
  orderBy: keyof CommuneModel
}) {
  return [...communeList]
    .filter(
      (commune) => !searchText || includesText(commune.name, searchText)
    )
    .sort(getComparator<CommuneModel>(order, orderBy))
}

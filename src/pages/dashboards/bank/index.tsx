// ** React Imports
import { MouseEvent, useState, useEffect, useCallback } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import CardContent from '@mui/material/CardContent'
import { DataGrid, GridColDef, useGridApiRef } from '@mui/x-data-grid'
import Select, { SelectChangeEvent } from '@mui/material/Select'

// ** Store Imports
import { useSelector } from 'react-redux'

// ** Types Imports
import { AppDispatch, RootState } from 'src/store'

// ** Custom Table Components Imports
import TableHeader from 'src/views/dashboards/shipments/filter/TableHeader'

// import { connectToServer } from 'src/libs/socket.io'

import { Bank, ResponseBank, fetchData, filterData } from 'src/store/apps/bank'

import { fileExporter } from 'src/libs/xlsx/xlsx'

// ** Imports Highcharts
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

import { useDebounce } from 'src/hooks/useDebounce';
import { useDispatch } from 'react-redux';
import { Bar } from 'src/typesBar/bar';

interface CellType {
  row: ResponseBank
}

const columns: GridColDef[] = [
  {
    flex: 0.15,
    field: 'category',
    sortable: false,
    minWidth: 300,
    headerName: 'Categoría',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography
          noWrap
          sx={{
            display: 'flex',
            overflow: 'auto',
            width: 'fit-content',
            maxWidth: '100vw',
            position: 'relative',
            scrollbarWidth: '0.1rem',
            '&::-webkit-scrollbar': {
              width: '10px',
              height: '5px'
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: 'primary.main',
              width: '0.1rem',
              borderRadius: 2
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'background.default',
              width: '0.1rem',
              borderRadius: 2
            }
          }}
        >
          {row.category}
        </Typography>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 150,
    field: 'accountCategory',
    sortable: false,
    headerName: 'Tipo de cuenta',
    renderCell: ({ row }: CellType) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
          <Typography noWrap variant='caption'>
            {`${row.accountCategory}`}
          </Typography>
        </Box>
      )
    }
  },
  {
    flex: 0.15,
    field: 'merchant',
    sortable: false,
    minWidth: 340,
    headerName: 'Compañía',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography
          noWrap
          sx={{
            display: 'flex',
            overflow: 'auto',
            width: 'fit-content',
            maxWidth: '100vw',
            position: 'relative',
            scrollbarWidth: '0.1rem',
            '&::-webkit-scrollbar': {
              width: '10px',
              height: '5px'
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: 'primary.main',
              width: '0.1rem',
              borderRadius: 2
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'background.default',
              width: '0.1rem',
              borderRadius: 2
            }
          }}
        >
          {row.merchantName}
        </Typography>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 100,
    maxWidth: 100,
    field: 'amount',
    sortable: false,
    headerName: 'Cantidad',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap variant='body2'>
          {row.amount}
        </Typography>
      )
    }
  },
  {
    flex: 0.15,
    maxWidth: 110,
    minWidth: 110,
    headerName: 'type',
    field: 'Tipo',
    sortable: false,
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap variant='body2'>
          {row.type}
        </Typography>
      )
    }
  },
  {
    flex: 0.15,
    maxWidth: 120,
    minWidth: 120,
    headerName: 'status',
    field: 'Estado',
    sortable: false,
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap variant='body2'>
          {row.status}
        </Typography>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 100,
    field: 'balance',
    sortable: false,
    headerName: 'Balance',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap variant='body2'>
          {row.balance}
        </Typography>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 120,
    field: 'value',
    sortable: false,
    headerName: 'Fecha',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap variant='body2'>
          {row.valueDate}
        </Typography>
      )
    }
  },
]

const ShipmentsDashboard = () => {
  // ** State
  const [accountCategory, setAccountCategory] = useState<string>('');
  const [isIncome, setIsIncome] = useState<string>('');

  // const [category, setCategory] = useState<string>('');
  const [value, setValue] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
  const apiRef = useGridApiRef();
  const debouncedValue = useDebounce(value)
  const [chartOptions, setChartOptions] = useState<object>({})
  const [size, setSize] = useState<object>({ height: 0 })
  
  // ** Hooks
  const dispatch = useDispatch<AppDispatch>();
  const store = useSelector((state: RootState) => state.bank);
  const [rowCountState, setRowCountState] = useState(store.total || 0);

  useEffect(() => {
    setRowCountState((prevRowCountState) =>
    store.total !== undefined ? store.total : prevRowCountState,
    );
  }, [store.total, setRowCountState]);

  useEffect(() => {
    // connectToServer(dispatch);
    dispatch(
      fetchData({
        limit: paginationModel.pageSize,
        skip: (paginationModel.pageSize * paginationModel.page) + 1
      })
    );

    // eslint-disable-next-line
  }, []);
  
  useEffect(() => {
    dispatch(filterData({
      limit: paginationModel.pageSize,
      skip: (paginationModel.pageSize * paginationModel.page),
      ...(accountCategory.length && { accountCategory }),
      ...(isIncome.length && { type: isIncome }),
      ...(status.length && { status }),

    }));

    // eslint-disable-next-line
  }, [paginationModel, store.total]);

  useEffect(() => {
    setPaginationModel({ pageSize: paginationModel.pageSize, page: 0 })

    // eslint-disable-next-line
  }, [dispatch, accountCategory, isIncome, status, debouncedValue, store.allData]);

  const handleFilter = useCallback((val: string) => {
    setValue(val);
  }, []);

  const handleIncomeChange = useCallback((e: SelectChangeEvent) => {
    setIsIncome(e.target.value);
  }, []);

  const handleAccountCategory = useCallback((e: SelectChangeEvent) => {
    setAccountCategory(e.target.value);
  }, []);

  const handleStatusChange = useCallback((e: SelectChangeEvent) => {
    setStatus(e.target.value);
  }, []);

  useEffect(() => {
    const url = `${process.env.NEXT_PUBLIC_BACK}/bank?format=bar&flow=OUTFLOW&limit=0&skip=0`

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        valueDate: '2024-01-1'
      })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }

        return response.json()
      })
      .then((data: Bar) => {
        const heigthLength = data.xAxis.categories.length * 25
        setSize({ height: `${heigthLength + 200}px` })
        setChartOptions(data)
      })
      .catch(error => {
        console.error('Error fetching data:', error)
      })
  }, [])

  const onClick = (e: MouseEvent) => {
    e.preventDefault();
    const selectedRows = apiRef.current.getSelectedRows() as unknown as Bank[];
    const toExport: Bank[] = [];

    selectedRows.forEach((row) => toExport.push(row));
    if (!toExport.length) return;

    const formattedData = fileExporter.formatData(toExport);

    fileExporter.export(formattedData);
  };

  return (
    <Grid container style={{ justifyContent: 'center', gap: '30px' }} spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader
            title='Filtros de búsqueda'
            sx={{ pb: 4, '& .MuiCardHeader-title': { letterSpacing: '.15px' } }}
          />
          <CardContent>
            <Grid container spacing={6}>
              <Grid item sm={4} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='type-select'>Type</InputLabel>
                  <Select
                    fullWidth
                    value={isIncome}
                    id='select-type'
                    label='Select Type'
                    labelId='Type-select'
                    onChange={handleIncomeChange}
                    inputProps={{ placeholder: 'Type' }}
                  >
                    <MenuItem value=''>All types</MenuItem>
                    {store?.filters?.type.map(status => (
                      <MenuItem key={status} value={status}>
                        {status}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sm={4} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='category-select'>Account category</InputLabel>
                  <Select
                    fullWidth
                    value={accountCategory}
                    id='select-account-category'
                    label='Select Account Category'
                    labelId='account-category-select'
                    onChange={handleAccountCategory}
                    inputProps={{ placeholder: 'Category' }}
                  >
                    <MenuItem value=''>All categories</MenuItem>
                    {store?.filters?.accountCategory.map(cat => (
                      <MenuItem key={cat} value={cat}>
                        {cat}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sm={4} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='status-select'>Estado</InputLabel>
                  <Select
                    fullWidth
                    value={status}
                    id='select-status'
                    label='Select Status'
                    labelId='status-select'
                    onChange={handleStatusChange}
                    inputProps={{ placeholder: 'Estado' }}
                  >
                    <MenuItem value=''>Todos los estados</MenuItem>
                    {store?.filters?.status.map(status => (
                      <MenuItem key={status} value={status}>
                        {status}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <Grid
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginRight: 8
            }}
          >
            <TableHeader value={value} handleFilter={handleFilter} />
            <Button
              onClick={e => onClick(e)}
              sx={{
                marginLeft: 4,
                backgroundColor: 'primary.main',
                color: '#FFF',
                mb: 2
              }}
            >
              Exportar
            </Button>
          </Grid>
          <DataGrid
            autoHeight
            rows={store.data}
            columns={columns}
            apiRef={apiRef}
            checkboxSelection
            disableColumnMenu={true}
            disableRowSelectionOnClick
            pageSizeOptions={[10, 25, 50]}
            paginationMode='server'
            paginationModel={paginationModel}
            rowCount={rowCountState}
            onPaginationModelChange={setPaginationModel}
            sx={{
              '& .MuiDataGrid-columnHeaders': { borderRadius: 0 },
              '& .MuiDataGrid-virtualScroller::-webkit-scrollbar': {
                width: '10px',
                height: '5px'
              },
              '& .MuiDataGrid-virtualScroller::-webkit-scrollbar-track': {
                backgroundColor: 'primary.main',
                width: '0.1rem',
                borderRadius: 2
              },
              '& .MuiDataGrid-virtualScroller::-webkit-scrollbar-thumb': {
                backgroundColor: 'background.default',
                width: '0.1rem',
                borderRadius: 2
              }
            }}
          />
        </Card>
      </Grid>
      <div style={{ width: '1300px' }}>
        <HighchartsReact highcharts={Highcharts} options={{ ...chartOptions, chart: { ...size, type: 'bar' } }} />
      </div>
    </Grid>
  )
}

export default ShipmentsDashboard

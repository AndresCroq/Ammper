// ** React Imports
import { MouseEvent, useState, useEffect, useCallback } from 'react';

// ** MUI Imports
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import CardContent from '@mui/material/CardContent';
import { DataGrid, GridColDef, useGridApiRef } from '@mui/x-data-grid';
import Select, { SelectChangeEvent } from '@mui/material/Select';

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux';

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip';

// ** Types Imports
import { RootState, AppDispatch } from 'src/store';
import { ThemeColor } from 'src/@core/layouts/types';

// ** Custom Table Components Imports
import TableHeader from 'src/views/dashboards/shipments/filter/TableHeader';

import { connectToServer } from 'src/libs/socket.io';

import { CoreData, ResponseShipment, fetchData, filterData } from 'src/store/apps/shipments';
import { fileExporter } from 'src/libs/xlsx/xlsx';
import { useDebounce } from 'src/hooks/useDebounce';


interface UserStatusType {
  [key: string]: ThemeColor;
}

interface CellType {
  row: ResponseShipment;
}

const userStatusObj: UserStatusType = {
  residential: 'success',
  business: 'secondary'
};

const columns: GridColDef[] = [
  {
    flex: 0.2,
    minWidth: 150,
    maxWidth: 150,
    field: 'códigoDeEnvío',
    sortable: false,
    headerName: 'Código de envío',
    renderCell: ({ row }: CellType) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
          <Typography noWrap variant='caption'>
            {`${row.coreData.id}`}
          </Typography>
        </Box>
      );
    }
  },
  {
    flex: 0.2,
    minWidth: 150,
    maxWidth: 150,
    field: 'codigo de venta',
    sortable: false,
    headerName: 'Código de venta',
    renderCell: ({ row }: CellType) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
          <Typography noWrap variant='caption'>
            {`${row.coreData.order}`}
          </Typography>
        </Box>
      );
    }
  },
  {
    flex: 0.2,
    minWidth: 300,
    field: 'Destino',
    sortable: false,
    headerName: 'Destino',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography sx={{
            display: 'flex',
            overflow: 'auto',
            width: 'fit-content',
            maxWidth: '100vw',
            position: 'relative',
            scrollbarWidth: '0.1rem',
            "&::-webkit-scrollbar": {
              width: '10px',
              height: '5px'
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: 'primary.main',
              width: '0.1rem',
              borderRadius: 2
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: 'background.default',
              width: '0.1rem',
              borderRadius: 2
            }
          }}
          noWrap variant='body2'>
          {row.coreData.address}
        </Typography>
      );
    }
  },
  {
    flex: 0.2,
    minWidth: 160,
    maxWidth: 160,
    field: 'FechaDeEnvío',
    sortable: false,
    headerName: 'Fecha de envío',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap variant='body2'>
          {row.coreData.deliveryTime || 'No establecida'}
        </Typography>
      );
    }
  },
  {
    flex: 0.15,
    maxWidth: 100,
    minWidth: 100,
    headerName: 'Zip',
    field: 'Zip',
    sortable: false,
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap variant='body2'>
          {row.coreData.zipCode}
        </Typography>
      );
    }
  },
  {
    flex: 0.1,
    maxWidth: 120,
    minWidth: 120,
    field: 'envío',
    sortable: false,
    headerName: 'Envío',
    renderCell: ({ row }: CellType) => {
      return (
        <CustomChip
          skin='light'
          size='small'
          label={row.coreData.deliveryPreferences}
          color={userStatusObj[row.coreData.deliveryPreferences] || 'warning'}
          sx={{ textTransform: 'capitalize', '& .MuiChip-label': { lineHeight: '18px' } }}
        />
      );
    }
  },
  {
    flex: 0.2,
    minWidth: 150,
    field: 'Estado',
    sortable: false,
    headerName: 'Estado',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap variant='body2'>
          {row.coreData.status}
        </Typography>
      );
    }
  },
  {
    flex: 0.15,
    field: 'comprador',
    maxWidth: 280,
    minWidth: 280,
    headerName: 'Comprador',
    sortable: false,
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap sx={{
          display: 'flex',
          overflow: 'auto',
          width: 'fit-content',
          maxWidth: '100vw',
          position: 'relative',
          scrollbarWidth: '0.1rem',
          "&::-webkit-scrollbar": {
            width: '10px',
            height: '5px'
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: 'primary.main',
            width: '0.1rem',
            borderRadius: 2
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: 'background.default',
            width: '0.1rem',
            borderRadius: 2
          }
        }}>
            {row.coreData.buyer}
      </Typography>);
    }
  },
  {
    flex: 0.15,
    field: 'vendedeor',
    sortable: false,
    minWidth: 240,
    headerName: 'Vendedor',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap sx={{
          display: 'flex',
          overflow: 'auto',
          width: 'fit-content',
          maxWidth: '100vw',
          position: 'relative',
          scrollbarWidth: '0.1rem',
          "&::-webkit-scrollbar": {
            width: '10px',
            height: '5px'
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: 'primary.main',
            width: '0.1rem',
            borderRadius: 2
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: 'background.default',
            width: '0.1rem',
            borderRadius: 2
          }
        }}>
          {row.coreData.seller}
        </Typography>
      );
    }
  },
  {
    flex: 0.2,
    minWidth: 140,
    field: 'Latitud',
    sortable: false,
    headerName: 'Latitud',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap variant='body2'>
          {row.coreData.destinationLatitude}
        </Typography>
      );
    }
  },
  {
    flex: 0.2,
    minWidth: 140,
    field: 'Longitud',
    sortable: false,
    headerName: 'Longitud',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap variant='body2'>
          {row.coreData.destinationLongitude}
        </Typography>
      );
    }
  },
  {
    flex: 0.15,
    field: 'Origen',
    sortable: false,
    minWidth: 340,
    headerName: 'Origen',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap sx={{
          display: 'flex',
          overflow: 'auto',
          width: 'fit-content',
          maxWidth: '100vw',
          position: 'relative',
          scrollbarWidth: '0.1rem',
          "&::-webkit-scrollbar": {
            width: '10px',
            height: '5px'
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: 'primary.main',
            width: '0.1rem',
            borderRadius: 2
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: 'background.default',
            width: '0.1rem',
            borderRadius: 2
          }
        }}>
          {row.coreData.sellerAddress}
        </Typography>
      );
    }
  },
];

const ShipmentsDashboard = () => {
  // ** State
  const [deliveryPreferences, setDeliveryPreferences] = useState<string>('');
  const [sellerAddress, setSellerAddress] = useState<string>('');
  const [deliveryTime, setDeliveryTime] = useState<string>('');
  const [value, setValue] = useState<string>('');
  const [seller, setSeller] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
  const apiRef = useGridApiRef();
  const debouncedValue = useDebounce(value)
  
  // ** Hooks
  const dispatch = useDispatch<AppDispatch>();
  const store = useSelector((state: RootState) => state.shipment);
  const [rowCountState, setRowCountState] = useState(store.total || 0);

  useEffect(() => {
    setRowCountState((prevRowCountState) =>
    store.total !== undefined ? store.total : prevRowCountState,
    );
  }, [store.total, setRowCountState]);

  useEffect(() => {
    connectToServer(dispatch);
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
      ...(deliveryPreferences.length && { deliveryPreferences }),
      ...(deliveryTime.length && { deliveryTime }),
      ...(seller.length && { seller }),
      ...(status.length && { status }),
      ...(sellerAddress.length && { sellerAddress }),
      ...(value.length && { q: value }),
    }));

    // eslint-disable-next-line
  }, [paginationModel, store.total]);

  useEffect(() => {
    setPaginationModel({ pageSize: paginationModel.pageSize, page: 0 })

    // eslint-disable-next-line
  }, [dispatch, sellerAddress, deliveryPreferences, deliveryTime, status, seller, debouncedValue, store.allData]);

  const handleFilter = useCallback((val: string) => {
    setValue(val);
  }, []);

  const handleDeliveryPreferenceChange = useCallback((e: SelectChangeEvent) => {
    setDeliveryPreferences(e.target.value);
  }, []);

  const handleDeliveryTimeChange = useCallback((e: SelectChangeEvent) => {
    setDeliveryTime(e.target.value);
  }, []);

  const handleAddressChange = useCallback((e: SelectChangeEvent) => {
    setSellerAddress(e.target.value);
  }, []);

  const handleSellerChange = useCallback((e: SelectChangeEvent) => {
    setSeller(e.target.value);
  }, []);

  const handleStatusChange = useCallback((e: SelectChangeEvent) => {
    setStatus(e.target.value);
  }, []);

  const onClick = (e: MouseEvent) => {
    e.preventDefault();
    const selectedRows = apiRef.current.getSelectedRows();
    const toExport: CoreData[] = [];

    selectedRows.forEach((row) => toExport.push(row.coreData));
    if (!toExport.length) return;

    const formattedData = fileExporter.formatData(toExport);

    fileExporter.export(formattedData);
  };

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Filtros de búsqueda' sx={{ pb: 4, '& .MuiCardHeader-title': { letterSpacing: '.15px' } }} />
          <CardContent>
            <Grid container spacing={6}>
              <Grid item sm={4} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='delivery-preference-select'>Tipo de envío</InputLabel>
                  <Select
                    fullWidth
                    value={deliveryPreferences}
                    id='select-delivery-preference'
                    label='Select Delivery Preference'
                    labelId='delivery-preference-select'
                    onChange={handleDeliveryPreferenceChange}
                    inputProps={{ placeholder: 'Origen' }}
                  >
                    <MenuItem value=''>Todos los tipos de envío</MenuItem>
                    <MenuItem value='residential'>Residential</MenuItem>
                    <MenuItem value='business'>Business</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sm={4} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='origin-select'>Origen</InputLabel>
                  <Select
                    fullWidth
                    value={sellerAddress}
                    id='select-origin'
                    label='Select Origin'
                    labelId='origin-select'
                    onChange={handleAddressChange}
                    inputProps={{ placeholder: 'Origen' }}
                  >
                    <MenuItem value=''>Todos los orígenes</MenuItem>
                    {store?.filters?.sellerAddress.map((address) => (
                      <MenuItem key={address} value={address}>{address}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sm={4} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='origin-select'>Fecha de envío</InputLabel>
                  <Select
                    fullWidth
                    value={deliveryTime}
                    id='select-date'
                    label='Select Date'
                    labelId='date-select'
                    onChange={handleDeliveryTimeChange}
                    inputProps={{ placeholder: 'Fecha de envío' }}
                  >
                    <MenuItem value=''>Fecha de envío</MenuItem>
                    {store?.filters?.deliveryTime?.map((deliveryTime, index) => (
                      <MenuItem key={index} value={deliveryTime}>{deliveryTime}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sm={4} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='status-select'>Vendedor</InputLabel>
                  <Select
                    fullWidth
                    value={seller}
                    id='select-seller'
                    label='Select Seller'
                    labelId='seller-select'
                    onChange={handleSellerChange}
                    inputProps={{ placeholder: 'Vendedor' }}
                  >
                    <MenuItem value=''>Todos los vendedores</MenuItem>
                    {store?.filters?.seller.map((seller) => (
                      <MenuItem key={seller} value={seller}>{seller}</MenuItem>
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
                    {store?.filters?.status.map((status) => (
                      <MenuItem key={status} value={status}>{status}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <Grid sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginRight: 8
          }} >
            <TableHeader value={value} handleFilter={handleFilter} />
            <Button
              onClick={(e) => onClick(e)}
              sx={{
                marginLeft: 4,
                backgroundColor: 'primary.main',
                color: '#FFF',
                mb: 2
              }}
            >Exportar</Button>
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
              "& .MuiDataGrid-virtualScroller::-webkit-scrollbar": {
                width: '10px',
                height: '5px'
              },
              "& .MuiDataGrid-virtualScroller::-webkit-scrollbar-track": {
                backgroundColor: 'primary.main',
                width: '0.1rem',
                borderRadius: 2
              },
              "& .MuiDataGrid-virtualScroller::-webkit-scrollbar-thumb": {
                backgroundColor: 'background.default',
                width: '0.1rem',
                borderRadius: 2
              }
            }}
          />
        </Card>
      </Grid>
    </Grid>
  );
};

export default ShipmentsDashboard;

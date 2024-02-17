// ** React Imports
import { useState, useEffect } from 'react';

// ** MUI Imports
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux';

// ** Types Imports
import { RootState, AppDispatch } from 'src/store';

// ** Custom Table Components Imports
import { UrlWithId, fetchData } from 'src/store/apps/urls';

interface CellType {
  row: UrlWithId;
}

function onClick({ row }: CellType) {
  navigator.clipboard.writeText(
    `URL de autorización: ${row.url}, CLAVE: ${row.code}`
  );
}

const columns: GridColDef[] = [
  {
    flex: 0.1,
    maxWidth: 90,
    sortable: false,
    field: 'copiar',
    hideable: false,
    headerName: 'Copiar',
    renderCell: (cell: CellType) => (
      <IconButton onClick={() => onClick(cell)} sx={{ marginRight: 2 }}>
        <ContentCopyIcon />
      </IconButton>)
  },
  {
    flex: 0.2,
    maxWidth: 140,
    field: 'clave',
    sortable: false,
    headerName: 'Clave',
    renderCell: ({ row }: CellType) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
          <Typography noWrap variant='caption'>
            {`${row.code}`}
          </Typography>
        </Box>
      );
    }
  },
  {
    flex: 0.2,
    minWidth: 250,
    field: 'url',
    sortable: false,
    headerName: 'URL',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap variant='body2'>
          {row.url}
        </Typography>
      );
    }
  },
];

const UrlsDashboard = () => {
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>();
  const store = useSelector((state: RootState) => state.url);

  useEffect(() => {
    dispatch(
      fetchData()
    );
  }, [dispatch]);

  const onClick = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_BACK}/admin`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'GET'
    });
    dispatch(fetchData());
  };

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='URLs de autorización' sx={{ pb: 4, '& .MuiCardHeader-title': { letterSpacing: '.15px' } }} />
          <Button
            onClick={onClick}
            sx={{
              marginLeft: 4,
              backgroundColor: 'primary.main',
              color: '#FFF',
              mb: 2
            }}
          >Generar URL</Button>
          <DataGrid
            autoHeight
            rows={store.data}
            columns={columns}
            disableColumnMenu={true}
            disableRowSelectionOnClick
            pageSizeOptions={[10, 25, 50]}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
          />
        </Card>
      </Grid>
    </Grid>
  );
};

export default UrlsDashboard;

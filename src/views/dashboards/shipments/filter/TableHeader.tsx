// ** MUI Imports
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

interface TableHeaderProps {
  value: string;
  handleFilter: (val: string) => void;
}

const TableHeader = (props: TableHeaderProps) => {
  // ** Props
  const { handleFilter, value } = props;

  return (
    <Box sx={{ p: 5, pb: 3, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        <TextField
          size='small'
          value={value}
          sx={{ mr: 6, mb: 2 }}
          placeholder='Buscar'
          onChange={e => handleFilter(e.target.value)}
        />
      </Box>
    </Box>
  );
};

export default TableHeader;

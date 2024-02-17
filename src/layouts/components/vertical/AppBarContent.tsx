// ** MUI Imports
import Box from '@mui/material/Box';

// ** Type Import
import { Settings } from 'src/@core/context/settingsContext';

// ** Components
import ModeToggler from 'src/@core/layouts/components/shared-components/ModeToggler';
import UserDropdown from 'src/@core/layouts/components/shared-components/UserDropdown';

// ** Hook Import
import { useAuth } from 'src/hooks/useAuth';

interface Props {
  hidden: boolean;
  settings: Settings;
  toggleNavVisibility: () => void;
  saveSettings: (values: Settings) => void;
}


const AppBarContent = (props: Props) => {
  // ** Props
  const { settings, saveSettings } = props;

  // ** Hook
  const auth = useAuth();

  return (
    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Box className='actions-left' sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
      </Box>
      <Box className='actions-right' sx={{ display: 'flex', alignItems: 'center' }}>
        <ModeToggler settings={settings} saveSettings={saveSettings} />
        {auth.user && (
          <UserDropdown />
        )}
      </Box>
    </Box>
  );
};

export default AppBarContent;

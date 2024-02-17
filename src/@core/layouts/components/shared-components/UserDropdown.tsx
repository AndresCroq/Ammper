// ** React Imports
import { useState } from 'react';

// ** Next Import
import { useRouter } from 'next/router';

// ** MUI Imports
import MenuItem from '@mui/material/MenuItem';

// ** Icon Imports
import Icon from 'src/@core/components/icon';

// ** Context
import { useAuth } from 'src/hooks/useAuth';

const UserDropdown = () => {
  // ** States
  const [, setAnchorEl] = useState<Element | null>(null);

  // ** Hooks
  const router = useRouter();
  const { logout } = useAuth();

  const handleDropdownClose = (url?: string) => {
    if (url) {
      router.push(url);
    }
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleDropdownClose();
  };

  return (
    <MenuItem
      onClick={handleLogout}
      sx={{ py: 2, '& svg': { mr: 2, fontSize: '1.375rem', color: 'text.primary' } }}
    >
      <Icon icon='mdi:logout-variant' />
      Logout
    </MenuItem>
  );
};

export default UserDropdown;

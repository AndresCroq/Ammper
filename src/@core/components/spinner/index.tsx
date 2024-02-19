// ** MUI Imports
import { useTheme } from '@mui/material/styles'
import Box, { BoxProps } from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

const FallbackSpinner = ({ sx }: { sx?: BoxProps['sx'] }) => {
  // ** Hook
  const theme = useTheme()

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        ...sx
      }}
    >
      <svg
        style={{ marginRight: '110px' }}
        width={310}
        fill='none'
        height={46}
        viewBox='0 0 268 150'
        xmlns='http://www.w3.org/5000/svg'
      >
        <image xlinkHref='/images/logos/ammper-logo.png' height={178} fill='white' />
      </svg>

      <CircularProgress disableShrink sx={{ mt: 6 }} />
    </Box>
  )
}

export default FallbackSpinner

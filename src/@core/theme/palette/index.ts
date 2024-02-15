// ** Type Imports
import { Palette } from '@mui/material'
import { Skin } from 'src/@core/layouts/types'

const DefaultPalette = (mode: Palette['mode'], skin: Skin): Palette => {
  // ** Vars
  const whiteColor = '#ffd6a4'
  const lightColor = '76, 78, 100'
  const darkColor = '255, 255, 255'
  const mainColor = mode === 'light' ? lightColor : darkColor

  const defaultBgColor = () => {
    if (skin === 'bordered' && mode === 'light') {
      return whiteColor
    } else if (skin === 'bordered' && mode === 'dark') {
      return '#30334E'
    } else if (mode === 'light') {
      //   return '#ff9300'
      // } else return '#ed8900'
      return '#EEEEEE'
    } else return '#2B2B2B'
  }

  return {
    customColors: {
      dark: darkColor,
      main: mainColor,
      light: lightColor,
      darkBg: '#ff9300',
      lightBg: '#F7F7F9',
      bodyBg: mode === 'light' ? '#ff9300' : '#ff9300', // Same as palette.background.default but doesn't consider bordered skin
      trackBg: mode === 'light' ? '#ff9300' : '#ff9300',
      avatarBg: mode === 'light' ? '#ff9300' : '#ff9300',
      tooltipBg: mode === 'light' ? '#ff9300' : '#ff9300',
      tableHeaderBg: mode === 'light' ? '#ff9300' : '#ff9300'
    },
    mode: mode,
    common: {
      black: '#000',
      white: whiteColor
    },
    primary: {
      light: '#ffb959',
      main: '#ee8200',
      dark: '#5A5FE0',
      contrastText: whiteColor
    },
    secondary: {
      light: '#5A5FE0',
      main: mode === 'light' ? '#7f82e7' : '#26C6F9',
      dark: '#7f82e7',
      contrastText: whiteColor
    },
    error: {
      light: '#FF625F',
      main: mode === 'light' ? '#FF4D49' : '#df9473',
      dark: '#E04440',
      contrastText: whiteColor
    },
    warning: {
      light: '#FDBE42',
      main: '#FDB528',
      dark: '#DF9F23',
      contrastText: whiteColor
    },
    info: {
      light: '#40CDFA',
      main: '#26C6F9',
      dark: '#21AEDB',
      contrastText: whiteColor
    },
    success: {
      light: '#83E542',
      main: mode === 'light' ? '#45a505' : '#50bb09',
      dark: '#64C623',
      contrastText: whiteColor
    },
    grey: {
      50: '#FAFAFA',
      100: '#F5F5F5',
      200: '#EEEEEE',
      300: '#E0E0E0',
      400: '#BDBDBD',
      500: '#9E9E9E',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
      A100: '#F5F5F5',
      A200: '#EEEEEE',
      A400: '#BDBDBD',
      A700: '#616161'
    },
    text: {
      primary: `rgba(${mainColor}, 0.87)`,
      secondary: `rgba(${mainColor}, 0.6)`,
      disabled: `rgba(${mainColor}, 0.38)`
    },
    divider: `rgba(${mainColor}, 0.12)`,
    background: {
      paper: mode === 'light' ? whiteColor : '#bf590e',
      default: defaultBgColor()
    },
    action: {
      active: `rgba(${mainColor}, 0.54)`,
      hover: `rgba(${mainColor}, 0.05)`,
      hoverOpacity: 0.05,
      selected: `rgba(${mainColor}, 0.08)`,
      disabled: `rgba(${mainColor}, 0.26)`,
      disabledBackground: `rgba(${mainColor}, 0.12)`,
      focus: `rgba(${mainColor}, 0.12)`
    }
  } as Palette
}

export default DefaultPalette

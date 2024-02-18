// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Datos de la cuenta',
      icon: 'mdi:home-outline',
      path: '/dashboards/bank'
    },
  ]
}

export default navigation

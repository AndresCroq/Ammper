// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Envíos',
      icon: 'mdi:home-outline',
      path: '/dashboards/shipments'
    },
    {
      title: 'Generar permisos',
      icon: 'mdi:file-document-outline',
      path: '/dashboards/generate-urls'
    }
  ]
}

export default navigation

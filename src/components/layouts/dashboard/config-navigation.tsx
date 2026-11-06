import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined'
import ApartmentIcon from '@mui/icons-material/Apartment'
import BusinessIcon from '@mui/icons-material/BusinessOutlined'
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined'
import DescriptionIcon from '@mui/icons-material/DescriptionOutlined'
import WorkIcon from '@mui/icons-material/WorkOutlineOutlined'
import LocationCityIcon from '@mui/icons-material/LocationCityOutlined'
import TaskIcon from '@mui/icons-material/TaskAltOutlined'
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';

import { paths } from '@/routes/paths'

export interface NavItem {
  title: string
  path: string
  icon: React.ReactNode
}

export interface NavGroup {
  subheader: string
  items: NavItem[]
}

export const navData: NavGroup[] = [
  {
    subheader: 'Opciones',
    items: [
      { title: 'Tareas', path: paths.task.root, icon: <TaskIcon /> },
      {
        title: 'Registros de jornada',
        path: paths.register.root,
        icon: <AccessTimeOutlinedIcon />
      },
      {
        title: 'Tipo de justificación',
        path: paths.justificationType.root,
        icon: <CommentOutlinedIcon />
      },
      {
        title: 'Tipos de contrato',
        path: paths.contractType.root,
        icon: <DescriptionIcon />
      },
      { title: 'Países', path: paths.country.root, icon: <PublicOutlinedIcon /> },
      { title: 'Estados civiles', path: paths.maritalStatus.root, icon: <TaskIcon /> },
      { title: 'Empleados', path: paths.employee.root, icon: <TaskIcon /> },
      { title: 'Regiones', path: paths.region.root, icon: <TaskIcon /> },
      { title: 'Justificaciones', path: paths.justification.root, icon: <DescriptionIcon /> },
      { title: 'Ciudades', path: paths.city.root, icon: <LocationCityIcon /> },
      { title: 'Comunas', path: paths.commune.root, icon: <ApartmentIcon /> },
      { title: 'Empresas', path: paths.company.root, icon: <BusinessIcon /> },
      { title: 'Sucursales', path: paths.branch.root, icon: <BusinessIcon /> },
      { title: 'Tipos de trabajo', path: paths.jobType.root, icon: <WorkIcon /> }

    ]
  }
]

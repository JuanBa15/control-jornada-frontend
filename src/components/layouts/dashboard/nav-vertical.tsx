import Box from '@mui/material/Box'
import ButtonBase from '@mui/material/ButtonBase'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListSubheader from '@mui/material/ListSubheader'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { IoMenu } from 'react-icons/io5'

import { RouterLink } from '@/routes/components'
import { usePathname } from '@/routes/hooks'

import { HEADER, NAV } from '../config-layout'
import { navData } from './config-navigation'

interface Props {
  openNav: boolean
  onCloseNav: VoidFunction
  collapsed: boolean
  onToggleCollapse: VoidFunction
}

const isActive = (pathname: string, path: string) => {
  const root = path.split('/').slice(0, 2).join('/')
  return pathname.startsWith(root)
}

export default function NavVertical({
  openNav,
  onCloseNav,
  collapsed,
  onToggleCollapse
}: Props) {
  const pathname = usePathname()
  const navWidth = collapsed ? NAV.W_MINI : NAV.W_VERTICAL

  const renderBrand = () => {
    if (collapsed) {
      return (
        <IconButton onClick={onToggleCollapse} aria-label="Expandir menú">
          <IoMenu />
        </IconButton>
      )
    }

    return (
      <ButtonBase
        onClick={onToggleCollapse}
        aria-label="Colapsar menú"
        sx={{ borderRadius: 1 }}
      >
        <Typography variant="h6" color="primary">
          Bennu
        </Typography>
      </ButtonBase>
    )
  }

  const renderContent = (desktop: boolean) => {
    const mini = desktop && collapsed

    return (
      <Box>
        <Box
          sx={{
            height: { xs: HEADER.H_MOBILE, lg: HEADER.H_DESKTOP },
            display: 'flex',
            alignItems: 'center',
            justifyContent: mini ? 'center' : 'flex-start',
            px: mini ? 0 : 3
          }}
        >
          {desktop ? (
            renderBrand()
          ) : (
            <Typography variant="h6" color="primary">
              Bennu
            </Typography>
          )}
        </Box>

        {navData.map((group) => (
          <List
            key={group.subheader}
            subheader={
              mini ? undefined : (
                <ListSubheader
                  disableSticky
                  sx={{ typography: 'overline', color: 'text.disabled' }}
                >
                  {group.subheader}
                </ListSubheader>
              )
            }
            sx={{ px: 1.5 }}
          >
            {group.items.map((item) => (
              <Tooltip
                key={item.path}
                title={mini ? item.title : ''}
                placement="right"
              >
                <ListItemButton
                  component={RouterLink}
                  href={item.path}
                  selected={isActive(pathname, item.path)}
                  onClick={onCloseNav}
                  aria-label={item.title}
                  sx={{
                    borderRadius: 1,
                    mb: 0.5,
                    justifyContent: mini ? 'center' : 'flex-start'
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: mini ? 0 : 40,
                      justifyContent: 'center'
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  {!mini && <ListItemText primary={item.title} />}
                </ListItemButton>
              </Tooltip>
            ))}
          </List>
        ))}
      </Box>
    )
  }

  return (
    <Box
      component="nav"
      sx={{
        width: { lg: navWidth },
        flexShrink: { lg: 0 },
        transition: (theme) => theme.transitions.create('width')
      }}
    >
      <Drawer
        variant="temporary"
        open={openNav}
        onClose={onCloseNav}
        sx={{
          display: { xs: 'block', lg: 'none' },
          '& .MuiDrawer-paper': { width: NAV.W_VERTICAL }
        }}
      >
        {renderContent(false)}
      </Drawer>

      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: 'none', lg: 'block' },
          '& .MuiDrawer-paper': {
            width: navWidth,
            overflowX: 'hidden',
            borderRight: '1px dashed',
            borderColor: 'divider',
            transition: (theme) => theme.transitions.create('width')
          }
        }}
      >
        {renderContent(true)}
      </Drawer>
    </Box>
  )
}

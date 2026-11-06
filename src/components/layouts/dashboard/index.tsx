'use client'

import Box from '@mui/material/Box'

import { useBoolean } from '@/hooks/use-boolean'

import Header from './header'
import Main from './main'
import NavVertical from './nav-vertical'

interface Props {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: Props) {
  const nav = useBoolean()
  const collapsed = useBoolean()

  return (
    <>
      <Header onOpenNav={nav.onTrue} collapsed={collapsed.value} />

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' } }}>
        <NavVertical
          openNav={nav.value}
          onCloseNav={nav.onFalse}
          collapsed={collapsed.value}
          onToggleCollapse={collapsed.onToggle}
        />
        <Main collapsed={collapsed.value}>{children}</Main>
      </Box>
    </>
  )
}

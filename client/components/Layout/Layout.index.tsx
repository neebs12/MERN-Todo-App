import React from 'react'

import { useAppSelector } from '../../hooks'

import { Box, Toolbar } from '@mui/material'

import ModalManager from './ModalManager'
import Header from '../Header/Header.index'
import Sidebar from '../Sidebar/Sidebar.index'

type LayoutProps = {
  // Inspiration: https://www.carlrippon.com/react-children-with-typescript/
  children: React.ReactNode
}

// This will contain the 
const Layout: React.FC<LayoutProps> = ({ children }) => {
  const id = useAppSelector(state => state.session.id)

  return (
    <div>
      <Box sx={{ display: 'flex' }}>
        {/* modals via Modal Manager */}
        <ModalManager />
        {/* header */}
        <Header />
        {/* sidebar, optionally rendered */}
        {id && <Sidebar /> } 
        <Box component="main" maxWidth="xs" sx={{flexGrow: 1}}>
          <Toolbar />
          { children }
        </Box>
      </Box>
    </div>
  )
}

export default Layout
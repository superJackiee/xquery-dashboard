import React from 'react'
import { ThemeProvider } from "@mui/material/styles"
import { light, dark } from "./theme"
import { useSelector } from 'react-redux'
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom"
import './App.css'

import { Dashboard, Login } from "./pages"
import { useConnectWallet } from '@web3-onboard/react'

const App = () => {
  const [{ wallet }] = useConnectWallet()
  const mode = useSelector((state) => state.toogle.darkMode)

  return (
    <ThemeProvider theme={mode === 'true' ? dark : light}>
      <BrowserRouter>
        <Routes>
          {!wallet && <Route path="/login" element={<Login />} />}
          {!!wallet && <Route path="/" element={<Dashboard />} />}
          <Route path='/' element={<Navigate replace to="/login" />} />
          <Route path='/login' element={<Navigate replace to="/" />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App

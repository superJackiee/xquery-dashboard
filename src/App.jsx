import React from 'react'
import { ThemeProvider } from "@mui/material/styles"
import { light, dark } from "./theme"
import { useSelector } from 'react-redux'
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom"
import './App.css'

import { Dashboard, Login } from "./pages"
import { useConnectWallet } from '@web3-onboard/react'
import { useVerifySignature } from './hooks'

const App = () => {
  const [{ wallet }] = useConnectWallet()
  const { loading, signature, setDirect } = useVerifySignature()
  const mode = useSelector((state) => state.toogle.darkMode)

  return (
    <ThemeProvider theme={mode === 'true' ? dark : light}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={!wallet || !signature ? <Login loading={loading} setDirect={setDirect} /> : <Navigate replace to="/" />} />
          <Route path="/" element={wallet && signature ? <Dashboard signature={signature} /> : <Navigate replace to="/login" />} />
          {/* <Route path='/' element={<Navigate replace to="/login" />} />
          <Route path='/login' element={<Navigate replace to="/" />} /> */}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App

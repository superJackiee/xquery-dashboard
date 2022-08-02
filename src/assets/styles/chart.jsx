import React from "react"
import { useSelector } from "react-redux"
import styled from "@emotion/styled"
import { Button } from "@mui/material"
import { light, dark } from "../../theme"

const MenuWrapper = styled(Button)`
  width: 94px;
  height: 36px;
  font-size: 14px;
  box-shadow: none;
  padding: 8px 12px;
  margin-right: 3px;
  color: ${({ active, theme }) => active === true ? theme.palette.primary.dark : theme.palette.text.primary};
  background-color: ${({ active, theme }) => active === true ? theme.palette.primary.light : 'transparent'};
  &:hover {
    color: white;
  }
`

export const MenuItem = ({ active, onClick, children }) => {
  const mode = useSelector((state) => state.toogle.darkMode)
  const theme = mode === 'true' ? dark : light

  return (
    <MenuWrapper active={active} theme={theme} onClick={() => onClick()}>
      {children}
    </MenuWrapper>
  )
}

const OutsideWrapper = styled(Button)`
  width: 152px;
  height: 36px;
  font-size: 14px;
  font-weight: 500;
  box-shadow: none;
  padding: 8px 14px;
  color: ${({ theme }) => theme.palette.primary.dark};
  background-color: ${({ theme }) => theme.palette.primary.light};
  border: solid 1px #bdb4fe;
  border-radius: 6px;
  &:hover {
    box-shadow: none;
    background-color: ${({ theme }) => theme.palette.primary.light};
  }
`

export const OutsideButton = ({ children }) => {
  const mode = useSelector((state) => state.toogle.darkMode)
  const theme = mode === 'true' ? dark : light

  return (
    <OutsideWrapper theme={theme}>
      {children}
    </OutsideWrapper>
  )
}
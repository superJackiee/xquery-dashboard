import React from "react"
import { useSelector } from "react-redux"
import styled from "@emotion/styled"
import { FlexColumn } from "../Layout"
import { light, dark } from "../../theme"

const Wrapper = styled(FlexColumn)`
  gap: 20px;
  border: 1px solid ${({ theme }) => theme.palette.background.default};
  padding: 12px;
  padding-top: 16px;
  border-radius: 12px;
  justify-content: flex-start;
  background-color: ${({ theme }) => theme.palette.info.dark};
`

export const Card = ({ children, className }) => {
  const mode = useSelector((state) => state.toogle.darkMode)
  const theme = mode === 'true' ? dark : light

  return (
    <Wrapper theme={theme} className={className}>
      {children}
    </Wrapper>
  )
}
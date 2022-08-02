import React from "react"
import { useSelector } from "react-redux"
import styles from "./index.module.scss"
import styled from "@emotion/styled"
import { light, dark } from "../../theme"

const Process = styled.div`
  max-width: 70px;
  width: ${({ value }) => value * 0.7}px;
  height: 8px;
  border-radius: 4px;
  background-color: ${({ value, theme }) => value >= 100 ? theme.palette.error.main : theme.palette.success.light};
  z-index: 100;
`

const ProgressBar = ({ process }) => {
  const mode = useSelector((state) => state.toogle.darkMode)
  const theme = mode === 'true' ? dark : light
  return (
    <div className={`${styles.back}`}>
      <Process value={process} theme={theme} />
    </div>
  )
}

export default ProgressBar
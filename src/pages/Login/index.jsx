import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useAccountCenter, useConnectWallet, useWallets } from "@web3-onboard/react"
import { createStyles, makeStyles } from "@mui/styles"
import { initWeb3Onboard } from '../../services'
import { Box, Button, Typography } from "@mui/material"
import { FlexColumn } from "../../components/Layout"
import styles from "./index.module.scss"
import logo from "../../assets/logo.svg"
import { dark, light } from "../../theme"

const useStyles = makeStyles((theme) =>
  createStyles({
    logTitle: {
      textAlign: 'center !important',
      marginTop: '30px !important',
      marginBottom: '12px !important',
      [theme.breakpoints.down(960)]: {
        fontSize: '20px !important',
        fontWeight: '500 !important'
      }
    },
    logo: {
      width: '194px',
      height: '61px',
      [theme.breakpoints.down(960)]: {
        width: '160px',
        height: '50px'
      }
    },
    connectBtn: {
      [theme.breakpoints.down(960)]: {
        fontSize: '14px !important'
      }
    }
  })
);

const Login = () => {
  const mode = useSelector((state) => state.toogle.darkMode)
  const theme = mode === 'true' ? dark : light
  const classes = useStyles()

  const [{ wallet }, connect] = useConnectWallet() // eslint-disable-line
  const connectedWallets = useWallets()
  const [web3Onboard, setWeb3Onboard] = useState(null) // eslint-disable-line
  const updateAccountCenter = useAccountCenter()
  updateAccountCenter({ position: 'bottomRight' })

  useEffect(() => {
    setWeb3Onboard(initWeb3Onboard)
  }, [])

  useEffect(() => {
    if (!connectedWallets.length) return

    const connectedWalletsLabelArray = connectedWallets.map(
      ({ label }) => label
    )
    window.localStorage.setItem('connectedWallets', JSON.stringify(connectedWalletsLabelArray))
  }, [connectedWallets, wallet])

  return (
    <div className={styles.back} style={{ background: theme.palette.info.main }}>
      <Box className={styles.wrapper}>
        <FlexColumn className={styles.alignCenter}>
          <img className={classes.logo} src={logo} alt='logo' width={194} height={61} />
          <Typography className={classes.logTitle} variant='h2' color='common.black' textAlign='center' mt='30px'>Connect a wallet to login.</Typography>
          <Typography className={styles.subtitle} variant='h4' color='text.primary'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit
          </Typography>
          <Button variant='contained' fullWidth sx={{ mt: '32px', padding: '10px 18px' }} onClick={() => connect().then(console.log)}>
            <Typography className={classes.connectBtn} variant='button' color='white'>Connect Wallet</Typography>
          </Button>
        </FlexColumn>
      </Box>
    </div>
  )
}

export default Login
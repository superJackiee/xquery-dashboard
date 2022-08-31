import React, { useState } from "react"
import { useSelector } from "react-redux"
import { useMedia } from "react-use"
// import { setDarkMode } from "../../redux/slice/toogleSlice"
import { Button, IconButton, Typography } from "@mui/material"
import { ApexChart, Card, FlexColumn, FlexRow, Table } from "../../components"
import { MenuItem as CustomMenuItem, OutsideButton } from "../../assets/styles/chart"
import { light, dark } from "../../theme"
import styles from "./index.module.scss"
import logo from "../../assets/logo.svg"
import rocket from "../../assets/icons/rocket.svg"
import launch from "../../assets/icons/launch.svg"
import twitter from "../../assets/icons/twitter.svg"
import reddit from "../../assets/icons/reddit.svg"
import discord from "../../assets/icons/discord.svg"
import telegram from "../../assets/icons/telegram.svg"
import github from "../../assets/icons/github.svg"
import book from "../../assets/icons/book.svg"
import website from "../../assets/icons/website.svg"
// import darkIcon from "../../assets/icons/dark.svg"
// import lightIcon from "../../assets/icons/light.svg"
import avatar1 from "../../assets/avatar/avatar1.png"

import ProjectModal from "../../components/Modal"

// mui select
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

import { ContentCopy, DateRangeOutlined, Check } from "@mui/icons-material"

import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { makeStyles } from "@mui/styles"

const Code = `curl http://<NODE-URL>/xrs/evm_passthrough/AVAX/<PROJECT-ID> \\
  - X POST \\
  -H "Content-Type: application/json" \\
  -H "Api-Key: <API-KEY>" \\
  -d
'{"jsonrpc":"2.0","method":"eth_blockNumber","params": [],"id":1}`

const JsonInfo = `{
    "jsonrpc" : "2.0",
    "id": 1,
    "result": "0x16c131ea72" 
}`

const Header = () => {
  const mode = useSelector((state) => state.toogle.darkMode)
  const theme = mode === 'true' ? dark : light
  // const dispatch = useDispatch()

  const [createOpen, setCreateOpen] = useState(false)
  const handleOpen = () => setCreateOpen(true)
  const handleClose = () => setCreateOpen(false)

  // const toogleTheme = () => {
  //   localStorage.setItem('darkMode', mode === 'true' ? 'false' : 'true')
  //   dispatch(setDarkMode(mode === 'true' ? 'false' : 'true'))
  // }

  return (
    <div style={{ background: theme.palette.info.light, borderBottom: `1px solid ${theme.palette.background.paper}` }}>
      <div className={`${styles.header}`}>
        <img src={logo} alt='logo' width={115} height={36} />
        <div className={`${styles.innerFlex}`}>
          {/* <IconButton sx={{ width: '40px', height: '40px' }} onClick={() => toogleTheme()}>
            <img src={mode === 'true' ? darkIcon : lightIcon} alt='mode' width={32} height={32} />
          </IconButton> */}
          <Button variant='contained' onClick={handleOpen} >
            <span className={styles.newProject}>New Project</span>
            <img src={rocket} alt='rocket' />
          </Button>
          <img src={avatar1} alt='avatar' width={40} height={40} />
        </div>
      </div>
      <ProjectModal open={createOpen} handleClose={handleClose} />
    </div >
  )
}

const useStyles = makeStyles((theme) => ({
  formControl: {
    m: 1,
    minWidth: 200,
    minHieght: 2,
    height: 20,
    mb: 3,
    width: '100%'
  },
  formSelect: {
    position: 'relative',
    width: '100%',
    paddingLeft: '35px',
    height: '40px',
    backgroundColor: theme.palette.secondary.main,
    borderRadius: '8px'
  },
  dateIcon: {
    position: 'absolute',
    top: '8px',
    left: '15px',
    zIndex: 10,
    color: `${theme.palette.common.black} !important`
  },
  overview: {
    [theme.breakpoints.down(960)]: {
      fontSize: '20px !important',
      fontWeight: '500 !important',
      lineHeight: '1.5 !important'
    }
  }
}))

const Chart = () => {
  const [activeStatus, setActiveStatus] = useState(0)
  const durations = ['12 months', '3 months', '30 days', '7 days', '24 hours']
  const classes = useStyles()

  const changeStatus = (newStatus) => {
    setActiveStatus(newStatus)
  }

  const [value, setValue] = useState(0);

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  return (
    <Card className={`${styles.chart}`}>
      <Typography variant='h3' color='common.black'>Data Usage Summary</Typography>
      <div className={styles.mobileSelect}>
        <FormControl className={classes.formControl} >
          <DateRangeOutlined className={classes.dateIcon} />

          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={value}
            // label="Select Period"
            onChange={handleChange}
            IconComponent={(props) => (<ExpandMoreIcon sx={{ color: '#667085', marginRight: '15px' }} />)}
            className={classes.formSelect}
          >
            {
              durations.map((duration, index) => {
                return (
                  <MenuItem key={index} value={index}>{duration}</MenuItem>
                )
              })
            }
          </Select>
        </FormControl>
      </div>
      <div className={styles.desktopSelect}>
        <FlexRow>
          {
            durations.map((duration, index) => {
              return (
                <CustomMenuItem
                  key={index}
                  variant='contained'
                  active={activeStatus === index}
                  onClick={() => changeStatus(index)}
                >{duration}</CustomMenuItem>
              )
            })
          }
        </FlexRow>
      </div>
      <ApexChart />
    </Card>
  )
}

const Dashboard = () => {
  const classes = useStyles()
  const isMobile = useMedia('(max-width: 576px)')
  const mode = useSelector((state) => state.toogle.darkMode)
  const theme = mode === 'true' ? dark : light
  const [viewModal, setViewModal] = useState(false)
  const [copyFlag, setCopyFlag] = useState(false)

  const copyClip = () => {
    if (!Code) {
      return
    }
    let textField = document.createElement('textarea')
    textField.innerText = Code
    document.body.appendChild(textField)
    textField.select()
    document.execCommand('copy')
    textField.remove()

    setCopyFlag(true)
  }

  const openViewModal = () => {
    setViewModal(true)
  }

  const closeViewModal = () => {
    setViewModal(false)
  }

  return (
    <>
      <Header />
      <div className={`${styles.content}`} style={{ background: theme.palette.info.main, paddingTop: '48px' }}>
        <div className={styles.container} >
          <Typography className={classes.overview} variant='h1' color='common.black' mb='4px'>
            Projects Overview
          </Typography>
          <Typography variant='h4' color='text.primary' mb='30px'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit
          </Typography>
          <FlexRow style={{ gap: '20px' }} className={styles.subContainer}>
            <FlexColumn style={{ gap: '20px' }} className={styles.leftSubContainer}>
              <Chart />
              <Table theme={theme} open={viewModal} handleClose={closeViewModal} handleOpen={openViewModal} />
            </FlexColumn>
            <FlexColumn style={{ gap: '20px' }} className={styles.rightSubContainer}>
              <Card className={`${styles.about}`}>
                <div className={styles.aboutHead}>
                  <Typography variant='h4' color='common.black' className={styles.title}>Getting Started with XQuery</Typography>
                </div>
                <div className={styles.aboutBody1}>
                  <Typography variant='h5' color='text.primary'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Rhoncus elit interdum aliquet.</Typography>
                  <FlexRow className={`${styles.spaceBetween}`}>
                    <OutsideButton variant='contained'>
                      Support docs
                      <img src={launch} width='20px' height='20px' alt="launch" />
                    </OutsideButton>
                    <OutsideButton variant='contained'>
                      Join Discord
                      <img src={launch} width='20px' height='20px' alt="launch" />
                    </OutsideButton>
                  </FlexRow>
                </div>
              </Card>
              <Card className={`${styles.about2}`}>
                <Accordion sx={{ bgColor: 'none', background: 'none', boxShadow: 'none', width: '100%', minWidth: '200px' }}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: "common.black" }} />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    sx={{ padding: 0, alignItems: 'flex-start', margin: '0px !important' }}
                  >
                    <div>
                      <Typography variant='h4' color='common.black' className={styles.title}>Your First Request</Typography>
                      <Typography variant='h5' color='text.primary' sx={{ mt: '20px', width: 'calc(100% + 25px)' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis sit facilisi non, suspendisse.</Typography>
                    </div>

                  </AccordionSummary>
                  <AccordionDetails sx={{ padding: 0, minWidth: '200px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {/* <Typography sx={{ mb: 2 }} variant='h4' color='text.primary'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis sit facilisi non, suspendisse.</Typography> */}
                    <Typography variant="h5" color='common.white' sx={{ backgroundColor: theme.palette.warning.main, mt: '20px', padding: 2, borderRadius: 2, wordBreak: 'break-all', position: 'relative' }}>
                      <pre className={styles.codes} style={{ color: theme.palette.common.white }}>{Code}</pre>
                      {
                        copyFlag ? <Check sx={{ position: 'absolute', right: '10px', bottom: '10px' }} /> : (
                          <Button onClick={() => copyClip()} variant='contained' size='small' sx={{ position: 'absolute', right: '10px', bottom: '10px' }}>
                            <ContentCopy sx={{ fontSize: '16px' }} />   Copy
                          </Button>
                        )
                      }
                    </Typography>
                    <Typography variant='h5' color='text.primary'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis sit facilisi non, suspendisse.</Typography>
                    <Typography variant="h5" sx={{ backgroundColor: theme.palette.warning.main, padding: 2, borderRadius: 2, wordBreak: 'break-all', position: 'relative' }}>
                      <pre className={classes.codes} style={{ color: theme.palette.common.white }}>{JsonInfo}</pre>
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </Card>
              <Card className={`${styles.about}`}>
                <div className={styles.aboutHead}>
                  <Typography variant='h4' color='common.black' className={styles.title}>Get the latest updates</Typography>
                </div>
                <div className={styles.aboutBody2}>
                  <Typography variant='h5' color='text.primary'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis sit facilisi non, suspendisse.</Typography>
                  <FlexRow className={`${styles.flexStart}`}>
                    <IconButton>
                      <img src={twitter} alt='twitter' />
                    </IconButton>
                    <IconButton>
                      <img src={reddit} alt='reddit' />
                    </IconButton>
                    <IconButton>
                      <img src={discord} alt='discord' />
                    </IconButton>
                    <IconButton>
                      <img src={telegram} alt='telegram' />
                    </IconButton>
                    <IconButton>
                      <img src={github} alt='github' />
                    </IconButton>
                  </FlexRow>
                </div>
              </Card>
              <Card className={`${styles.about1}`}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  <Typography variant='h4' color='common.black' className={styles.title}>About XQuery</Typography>
                  <Typography variant='h5' color='text.primary' sx={{ lineHeight: '1.43 !important', marginTop: isMobile ? '-15px' : '0px' }}>
                    XQuery decentralizes access to indexed blockchain data, removing a critical burden of trust from the blockchain stack: centralized data providers.
                  </Typography>
                  <div className={`${styles.divider}`} style={{ background: `${theme.palette.divider}` }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  <Typography variant='h4' color='common.black' className={styles.title}>Built by The Blocknet</Typography>
                  <Typography variant='h5' color='text.primary' sx={{ lineHeight: '1.43 !important' }}>Dolor enim eu tortor urna sed duis nulla. Aliquam vestibulum, nulla odio nisl vitae. In aliquet pellentesque aenean hac vestibulum turpis mi bibendum diam. Tempor integer aliquam in vitae malesuada fringilla. Elit nisi in eleifend sed nisi. Pulvinar at orci, proin imperdiet commodo consectetur convallis risus.</Typography>
                  <FlexRow className={`${styles.flexStart}`}>
                    <img src={website} alt='website' />
                    <a className={`${styles.link}`} href='https://blocknet.co' target='_blank' rel='noopener noreferrer'>Blocknet.co</a>
                  </FlexRow>
                  <FlexRow className={`${styles.flexStart}`}>
                    <img src={book} alt='book' />
                    <a className={`${styles.link}`} href='https://docs.blocknet.co' target='_blank' rel='noopener noreferrer'>docs.blocknet.co</a>
                  </FlexRow>
                  <FlexRow className={`${styles.flexStart}`}>
                    <img src={discord} alt='discord' />
                    <a className={`${styles.link}`} href='#' target='_blank' rel='noreferrer'>Discord</a>{/* eslint-disable-line */}
                  </FlexRow>
                  <FlexRow className={`${styles.flexStart}`}>
                    <img src={telegram} alt='telegram' />
                    <a className={`${styles.link}`} href='#' target='_blank' rel='noreferrer'>Telegram</a>{/* eslint-disable-line */}
                  </FlexRow>
                </div>
              </Card>
            </FlexColumn>
          </FlexRow>
        </div>
      </div>
    </>
  )
}

export default Dashboard
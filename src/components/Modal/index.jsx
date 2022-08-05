import * as React from 'react'
import api from '../../apis'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// mui
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import styled from "@emotion/styled"
import { light, dark } from "../../theme"
import { createStyles, makeStyles } from "@mui/styles"
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import CopyToClipboard from 'react-copy-to-clipboard'
import { NEW_PROJECT_MSG } from '../../configs'
import { Avatar } from '@mui/material'

import {
  FilterList, Close, HelpOutline, CheckCircleOutline, RadioButtonUnchecked,
  ArrowForward, ArrowBack, ContentCopy, VisibilityOutlined, VisibilityOffOutlined
} from '@mui/icons-material'

// local file
import info from "../../assets/icons/info.svg"
import styles from './index.module.scss'
import layer2 from '../../assets/icons/layer2.svg'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'


import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { setProject } from '../../redux/slice/projectSlice'
import { useConnectWallet } from '@web3-onboard/react'
import { ethers } from 'ethers'


const style = {
  bgcolor: 'background.paper',
  border: 'none',
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.warning.dark,
    color: theme.palette.text.primary,
    whiteSpace: 'nowrap'
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  }
}));

const useStyles = makeStyles((theme) =>
  createStyles({
    table: {
      // minWidth: 650
    },
    sticky: {
      position: "sticky",
      right: 0,
      background: theme.palette.info.dark,
      padding: "10px",
      backgroundColor: '#F2F4F7'
    },
    cell: {
      width: '86px !important',
      borderBottom: `1px solid ${theme.palette.divider} !important`,
      whiteSpace: 'nowrap',
      textAlign: 'left',
      [theme.breakpoints.up(860)]: {
        width: '15% !important'
      }
    },
    rowInline: {
      [theme.breakpoints.up(860)]: {
        display: "inline !important"
      }
    },
    key: {
      fontSize: '14px',
      [theme.breakpoints.down(576)]: {
        fontSize: '12px',
        wordWrap: 'break-word !important',
        width: '265px !important'
      }
    },
  })
);

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(even)': {
    backgroundColor: '#F2F4F7',
    color: theme.palette.primary.text
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const rows = [
  {
    ip: ['65.119.157.65', '02qb4032...'],
    networks: ['ETH', 'AVAX', 'BSC'],
    cost: [35, 200],
  },
  {
    ip: ['65.119.157.65', '02qb4032...'],
    networks: ['ETH', 'AVAX', 'BSC'],
    cost: [35, 200],
  },
  {
    ip: ['65.119.157.65', '02qb4032...'],
    networks: ['ETH', 'AVAX', 'BSC'],
    cost: [35, 200],
  },
  {
    ip: ['65.119.157.65', '02qb4032...'],
    networks: ['ETH', 'AVAX', 'BSC'],
    cost: [35, 200],
  },
  {
    ip: ['65.119.157.65', '02qb4032...'],
    networks: ['ETH', 'AVAX', 'BSC'],
    cost: [35, 200],
  }
]

const titles = [
  'New Project - Step 1 Title',
  'New Project - Step 2 Title',
  'New Project - Step 3 Title',
  'Title - Project Info',
  'Title - Cancel Project',
  'Title - Project Cancelled',
  'Title - Extend Project - Payment'
]


const filterlist = [
  'ETH',
  'AVAX',
  'BSC'
]

const ProjectModal = (props) => {
  const { open, handleClose } = props
  const [{ wallet }] = useConnectWallet()

  const mode = useSelector((state) => state.toogle.darkMode)
  const dispatch = useDispatch()
  const theme = mode === 'true' ? dark : light

  const classes = useStyles()

  const dots = [0, 1, 2]

  const [newProj, setNewProj] = useState(null)
  const [active, setActive] = useState(0)
  const [tabIndex, setTabIndex] = useState(0)
  const [serviceLevel, setServiceLevel] = useState(0)
  const [keyVisibility, setKeyVisibility] = useState(false)


  // const [scroll, setScroll] = React.useState<DialogProps['scroll']>('body');

  // const [loading, setLoading] = useState(false)

  const onClickDetail = async () => {
    const body = {
      "id": 1,
      "method": "request_project",
      "params": []
    }
    try {
      const provider = new ethers.providers.Web3Provider(wallet.provider, 'any')
      const signer = provider.getSigner()
      const signature = await signer.signMessage(NEW_PROJECT_MSG)
      console.log(signature, wallet.accounts[0])
      const verify = await api.project.verifySignature({ signature: signature, wallet: wallet.accounts[0].address })
      console.log("verify:", verify)
      const result = await api.project.createProject(body)
      dispatch(setProject(result?.data?.result))
      setNewProj(result?.data?.result)
      setTabIndex(1)
    } catch (error) {
      console.log("error:", error)
    }
  }

  const [copyFlag, setCopyFlag] = useState(false)

  useEffect(() => {
    if (tabIndex === 0) {
      setActive(0)
    } else if (tabIndex === 1) {
      setActive(1)
    } else {
      setActive(2)
    }
  }, [tabIndex])


  const [toFilter, setToFilter] = useState([])
  const [fromFilter, setFromFilter] = useState(filterlist)

  const handleChange = (event) => {
    let fromTemp = fromFilter
    let toTemp = toFilter

    toTemp.push(event.target.value)
    setToFilter(toTemp)
    fromTemp = fromFilter.filter((item) => item !== event.target.value)
    setFromFilter(fromTemp)
  };


  const handleDelete = (newValue) => {
    let fromTemp = fromFilter
    let toTemp = toFilter

    fromTemp.push(newValue)
    setFromFilter(fromTemp)
    toTemp = toFilter.filter((item) => item !== newValue)
    setToFilter(toTemp)
  };

  const recover = (len) => {
    const ch = '*'
    let pass = ''
    for (let i = 0; i < len; i++) pass += ch
    return pass
  }

  return (
    <div>
      <Modal
        open={open}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        // scroll={scroll}
        sx={{ overflowX: 'hidden', overflowY: 'scroll' }}
      >
        <Box sx={style} className={styles.modalNewBox}>
          <Stack direction='row' justifyContent='flex-end'>
            <Close sx={{ fontSize: '25px', cursor: 'pointer', color: 'common.black' }} onClick={handleClose} />
          </Stack>
          <Typography id="modal-modal-title" variant="h2" component="h2"
            className={styles.title}
            color='common.black'
          >
            {
              tabIndex === 0 ? titles[0] : tabIndex === 1 ? titles[1] : titles[2]
            }
          </Typography>
          <div className={`${styles.divider}`} style={{ background: `${theme.palette.divider}` }} />
          <Typography className={styles.subTitle} color='common.black'>
            Your Project Detail1
          </Typography>
          <Typography className={styles.desc} color='text.primary' sx={{ mb: '10px' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non.
          </Typography>
          {
            tabIndex === 0 && (
              <div className={styles.tab0}>
                <div className={styles.tableBox}>
                  {/* <div className={styles.tableFilter} >
                    <Stack direction="row" spacing={1} sx={{ color: 'common.black' }}>
                      <Chip label="ETH" color="primary" sx={{ bgcolor: '#b9a7e1', color: '#7f56d9', fontWeight: 'bold' }} onDelete={handleDelete} />
                      <Chip label="AVAX" color="primary" onDelete={handleDelete} />
                      <Button variant='outlined'><FilterList />Filters</Button>
                    </Stack>
                  </div> */}

                  <div className={styles.tableFilter} >
                    <Stack direction="row" justifyContent="flex-end" alignItems="center" sx={{ gap: '10px' }}>
                      {
                        toFilter.map((item) => {
                          return (
                            <button className={styles.toModalFilterBtn}>
                              {item} <Close sx={{ cursor: 'pointer', fontSize: '12px' }} onClick={() => handleDelete(item)} />
                            </button>
                          )
                        })
                      }

                      <Select
                        id="demo-simple-select-autowidth"
                        value={0}
                        onChange={handleChange}
                        autoWidth
                        sx={{
                          '.MuiSvgIcon-root.MuiSelect-iconOutlined': { display: 'none !important' },
                          '.css-1foykdk-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.css-1foykdk-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.css-1foykdk-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input': {
                            padding: '6.5px 20px !important',
                            color: 'warning.main',
                            backgroundColor: 'secondary.main'
                          },
                          // '.css-i4bv87-MuiSvgIcon-root': { color: 'common.black' },
                          boxSizing: 'border-box',
                          // width: '50px', height: '40px',
                          color: 'common.black',
                          borderRadius: '6px'
                        }}
                      >
                        <MenuItem value={0} sx={{ display: 'none' }}>
                          <Stack direction='row' gap='8px' alignItems='center' >
                            <FilterList />
                            <div>Filters</div>
                          </Stack>
                        </MenuItem>
                        {
                          fromFilter.map((item) => {
                            return <MenuItem key={item} value={item} sx={{ fontFamily: 'Inter', width: '100px' }}>{item}</MenuItem>
                          })
                        }
                      </Select>
                    </Stack>
                  </div>

                  <TableContainer component={Paper} className={styles.tableBody} style={{ maxWidth: '640px', width: '100%' }}>
                    <Table sx={{ minWidth: 400 }} aria-label="customized table" >
                      <TableHead sx={{ backgroundColor: '#eaecf0' }}>
                        <TableRow>
                          <StyledTableCell className={styles.headItem}>Host Server IP</StyledTableCell>
                          <StyledTableCell align="left" className={styles.headItem}>Supported Networks</StyledTableCell>
                          <StyledTableCell align="left" className={styles.headItem}>Monthly cost</StyledTableCell>
                          <StyledTableCell align="left" className={`${styles.headItem} ${classes.sticky}`}>Server info</StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody sx={{ backgroundColor: 'white' }}>
                        {rows.map((row, index) => (
                          <StyledTableRow key={index}>
                            <StyledTableCell component="th" scope="row">
                              <Stack direction={'column'}>
                                <div style={{ color: '#344054' }}>{row.ip[0]}</div>
                                <div style={{ color: '#344054' }}>{row.ip[1]}</div>
                              </Stack>
                            </StyledTableCell>
                            <StyledTableCell align="left">
                              <Stack display="flex" gap="5px" flexDirection="row">
                                {/* {
                                  row.networks.map((network) => {
                                    return <Chip key={network} label={network} size='small' color="primary" />
                                  })
                                } */}
                                <Chip label={'ETH'} size='small' sx={{ color: '#175cd3', backgroundColor: '#eff8ff', width: 'fit-content' }} />
                                <Chip label={'AVAX'} size='small' sx={{ color: '#c01048', backgroundColor: '#fff1f3', width: 'fit-content' }} />
                                <Chip label={'BSC'} size='small' sx={{ color: '#854a0e', backgroundColor: '#fef7c3', width: 'fit-content' }} />
                              </Stack>
                            </StyledTableCell>
                            <StyledTableCell align="left">
                              <Stack direction='column'>
                                <div style={{ color: '#344054', whiteSpace: 'nowrap' }}>Tier 1: ${row.cost[0]}</div>
                                <div style={{ color: '#344054', whiteSpace: 'nowrap' }}>Tier 2: ${row.cost[1]}</div>
                              </Stack>
                            </StyledTableCell>
                            <StyledTableCell align="left" className={classes.sticky}>
                              <Button variant='contained' className={styles.info} fullWidth endIcon={<img src={info} alt='info' />}
                                onClick={onClickDetail}
                              >
                                <Typography variant='h5' >
                                  View details
                                </Typography>
                              </Button>
                              <Button variant='contained' className={styles.infoMobile} onClick={onClickDetail}><img src={info} alt='info' /></Button>
                            </StyledTableCell>
                          </StyledTableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>

                  {/* <TableContainer component={Paper} className={styles.tableMobileBody} >
                    <Table sx={{ minWidth: 400 }} aria-label="customized table" >
                      <TableHead>
                        <TableRow>
                          <StyledTableCell sx={{ width: '100px' }} >Host Server IP</StyledTableCell>
                          <StyledTableCell sx={{ width: '120px' }} align="left">Supported Networks</StyledTableCell>
                          <StyledTableCell sx={{ width: '100px' }} align="left">Server info</StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.map((row, index) => (
                          <StyledTableRow key={index}>
                            <StyledTableCell component="th" scope="row">
                              <Stack direction={'column'}>
                                <div>{row.ip[0]}</div>
                                <div>{row.ip[1]}</div>
                              </Stack>
                            </StyledTableCell>
                            <StyledTableCell align="left">
                              <Stack direction="row" spacing={0.5} justifyContent='flex-start'
                                sx={{ flexWrap: 'wrap' }}
                              >
                                {
                                  row.networks.map((network) => {
                                    return <Chip key={network} label={network} size='small' color="primary" />
                                  })
                                }
                              </Stack>
                            </StyledTableCell>

                            <StyledTableCell align="left">
                              <Button variant='contained' fullWidth
                                onClick={onClickDetail}
                              >
                                <img src={info} alt='info' />
                              </Button>
                            </StyledTableCell>
                          </StyledTableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer> */}

                </div>

              </div>
            )
          }

          {
            tabIndex === 1 && ( // Step 2
              <div className={styles.tab1}>
                {/* <div className={styles.info}> */}
                <Stack sx={{ p: 3, mt: 1.5, border: 'none', borderRadius: 1, background: theme.palette.warning.dark, color: theme.palette.text.primary }} spacing={3}>
                  <Stack direction='row' justifyContent={'space-between'} className={styles.mobileDisplay}>
                    <Stack direction='row' justifyContent={'flex-start'} spacing={0.5}>
                      <Typography>Project ID:</Typography> <HelpOutline sx={{ fontSize: '20px' }} />
                    </Stack>
                    <div>
                      {newProj?.project_id}
                    </div>
                  </Stack>
                  <Stack direction='row' justifyContent={'space-between'} className={styles.mobileDisplay}>
                    <Stack direction='row' justifyContent={'flex-start'} spacing={0.5}>
                      <Typography>API Key:</Typography> <HelpOutline sx={{ fontSize: '20px' }} />
                    </Stack>
                    <Stack direction='row' alignItems='center' spacing={1}>
                      <span className={classes.key}>
                        {keyVisibility ? newProj?.api_key : recover(newProj?.api_key?.length)}
                      </span>
                      {keyVisibility ? <VisibilityOffOutlined sx={{ cursor: 'pointer' }} onClick={() => setKeyVisibility(false)} /> : <VisibilityOutlined sx={{ cursor: 'pointer' }} onClick={() => setKeyVisibility(true)} />}
                    </Stack>
                  </Stack>
                  <Stack direction={'row'} justifyContent='space-between' className={styles.mobileDisplay}>
                    <Stack direction={'row'} justifyContent='flex-start' alignItems="center" spacing={0.5}>
                      <div>Supported Networks: </div><HelpOutline sx={{ fontSize: '20px' }} />
                    </Stack>
                    <Stack direction={'row'} justifyContent='flex-end' spacing={1} >
                      <Chip label={'ETH'} size='small' sx={{ color: '#175cd3', backgroundColor: '#eff8ff' }} />
                      <Chip label={'AVAX'} size='small' sx={{ color: '#c01048', backgroundColor: '#fff1f3' }} />
                      <Chip label={'BSC'} size='small' sx={{
                        color: '#854a0e', backgroundColor: '#fef7c3'
                      }} />
                    </Stack>
                  </Stack>
                  <Stack direction='row' justifyContent={'space-between'} className={styles.mobileDisplay}>
                    <Stack direction='row' justifyContent={'flex-start'} spacing={0.5}>
                      <Typography>Accepted Payment Currencies:</Typography> <HelpOutline sx={{ fontSize: '20px' }} />
                    </Stack>
                    <div>
                      ETH, aaBLOCK, aBLOCK, BNB, AVAX
                    </div>
                  </Stack>
                  <Stack direction='row' justifyContent={'space-between'} flexWrap={'wrap'} className={styles.apiKey}>
                    <Stack direction='row' justifyContent={'flex-start'} spacing={0.5}>
                      <Typography>Host Server IP:</Typography> <HelpOutline sx={{ fontSize: '20px' }} />
                    </Stack>
                    <div>
                      65.119.157.65
                    </div>
                  </Stack>
                </Stack>

                {/* </div> */}

                <Typography className={styles.subTitle} sx={{ mt: 3 }} color='common.black'>
                  Choose from one of the following service levels:
                </Typography>

                <Stack direction={'row'} justifyContent='space-between' sx={{ mt: 1.5, color: 'common.black' }}
                  className={styles.tierBody}
                >
                  <div className={styles.tier}>
                    <div style={{ padding: '8px 16px', background: '#f9f5ff', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}>
                      <Stack direction='row' justifyContent={'space-between'} alignItems='center'
                        onClick={() => setServiceLevel(0)}
                        sx={{ cursor: 'pointer', borderBottom: '1 px ' }}
                      >
                        <Stack direction={'row'} justifyContent='flex-start' alignItems={'center'} spacing={2}>
                          <Avatar alt="tie" src={layer2} /> <div className={styles.tierLetter}>Tier1</div>
                        </Stack>
                        {
                          serviceLevel === 1 ? <RadioButtonUnchecked /> : <CheckCircleOutline />
                        }

                      </Stack>
                    </div>

                    <div style={{ padding: '8px 16px', background: '#ffffff', borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px' }}>
                      <Stack className={styles.price} direction='row' alignItems='center' justifyContent={'flex-start'}>
                        <span>$35</span> 6 million calls
                      </Stack>
                      <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit.
                      </Typography>
                      <Stack direction={'row'} spacing={1} sx={{ mt: 3 }}>
                        <Chip label={'ETH'} size='small' sx={{ color: '#175cd3', backgroundColor: '#eff8ff' }} />
                        <Chip label={'AVAX'} size='small' sx={{ color: '#c01048', backgroundColor: '#fff1f3' }} />
                        <Chip label={'BSC'} size='small' sx={{
                          color: '#854a0e', backgroundColor: '#fef7c3'
                        }} />
                      </Stack>
                    </div>

                  </div>
                  <div className={styles.tier}>
                    <div style={{ padding: '8px 16px', background: '#f9f5ff', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}>
                      <Stack direction='row' justifyContent={'space-between'} alignItems='center'
                        onClick={() => setServiceLevel(1)} sx={{ cursor: 'pointer' }}>
                        <Stack direction={'row'} justifyContent='flex-start' alignItems={'center'} spacing={2}>
                          <Avatar alt="tie" src={layer2} /> <div>Tier2</div>
                        </Stack>
                        {
                          serviceLevel === 0 ? <RadioButtonUnchecked /> : <CheckCircleOutline />
                        }
                      </Stack>
                    </div>
                    <div style={{ padding: '8px 16px', background: '#ffffff', borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px' }}>
                      <Stack className={styles.price} direction='row' alignItems='center' justifyContent={'flex-start'}>
                        <span>$200</span> 32 million calls
                      </Stack>
                      <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit.
                      </Typography>
                      <Stack direction={'row'} spacing={1} sx={{ mt: 3 }}>
                        <Chip label={'ETH'} size='small' sx={{ color: '#175cd3', backgroundColor: '#eff8ff' }} />
                        <Chip label={'AVAX'} size='small' sx={{ color: '#c01048', backgroundColor: '#fff1f3' }} />
                        <Chip label={'BSC'} size='small' sx={{
                          color: '#854a0e', backgroundColor: '#fef7c3'
                        }} />
                      </Stack>
                    </div>
                  </div>
                </Stack>
              </div>
            )
          }

          {
            tabIndex === 2 && ( // Step 3
              <div className={styles.tab2}>
                <Stack sx={{ p: 3, mt: 1.5, border: 'none', borderRadius: 1, background: theme.palette.warning.dark, color: theme.palette.text.primary }} spacing={3}>
                  <Stack direction='row' justifyContent={'space-between'}>
                    <Stack direction={'row'} justifyContent='flex-start' spacing={0.5}>
                      <div>Project ID: </div><HelpOutline sx={{ fontSize: '20px' }} />
                    </Stack>
                    <div>a357ab69-8ddc-4966-833f-4ddc38b8c11</div>
                  </Stack>
                  <Stack direction='row' justifyContent={'space-between'}>
                    <Stack direction={'row'} justifyContent='flex-start' spacing={0.5}>
                      <div>Supported Networks: </div><HelpOutline sx={{ fontSize: '20px' }} />
                    </Stack>
                    <Stack direction={'row'} justifyContent='flex-end' spacing={1}>
                      <Chip label={'ETH'} size='small' sx={{ color: '#175cd3', backgroundColor: '#eff8ff' }} />
                      <Chip label={'AVAX'} size='small' sx={{ color: '#c01048', backgroundColor: '#fff1f3' }} />
                      <Chip label={'BSC'} size='small' sx={{
                        color: '#854a0e', backgroundColor: '#fef7c3'
                      }} />
                    </Stack>
                  </Stack>
                  <Stack direction='row' justifyContent={'space-between'}>
                    <Stack direction={'row'} justifyContent='flex-start' spacing={0.5}>
                      <div>Monthly cost in $USD: </div><HelpOutline sx={{ fontSize: '20px' }} />
                    </Stack>
                    <div>$200</div>
                  </Stack>
                  <Stack direction='row' justifyContent={'space-between'}>
                    <Stack direction={'row'} justifyContent='flex-start' spacing={0.5}>
                      <div>Service Level: </div><HelpOutline sx={{ fontSize: '20px' }} />
                    </Stack>
                    <div>Tier 2 - 32 million requests / month</div>
                  </Stack>
                </Stack>
                <div className={styles.detail}>
                  <Typography className={styles.subTitle} color='common.black' sx={{ mt: 1.5 }}>
                    Payment Info
                  </Typography>
                  <Typography className={styles.desc} color='text.primary'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non.
                  </Typography>
                </div>

                <Stack sx={{ p: 3, mt: 1.5, border: 'none', borderRadius: 1, background: theme.palette.warning.dark, color: theme.palette.text.primary }} spacing={3}>
                  {/* <div className={styles.info}> */}
                  <Stack direction={'row'} justifyContent='space-between' className={styles.amount}>
                    <Stack direction='row' justifyContent={'flex-start'} className={styles.amountLeft} spacing={1}>
                      <div >
                        Amount to pay:
                      </div>
                      <HelpOutline sx={{ fontSize: '20px' }} />
                    </Stack>
                    <Stack direction='column' justifyContent={'flex-start'} className={styles.amountRight} alignItems={'flex-start'}>
                      <div><span>aaBlock: 19.652</span>includes a 10% discount</div>
                      <div><span>aaBlock: 21.342</span>includes a 10% discount</div>
                      <div><span>aaBlock: 0.23</span>includes a 10% discount</div>
                      <div><span>aaBlock: 0.21</span>includes a 10% discount</div>
                    </Stack>
                  </Stack>
                  <Stack direction='row' justifyContent={'space-between'} alignItems='center' className={styles.payAddress}>
                    <Stack direction='row' justifyContent={'flex-start'} alignItems='center' sx={{ width: '40%' }} className={styles.left} spacing={1}>
                      Payment&nbsp;address: <HelpOutline sx={{ fontSize: '20px' }} />
                    </Stack>
                    <Stack direction='row' justifyContent={'flex-start'} alignItems='center' sx={{ width: '60%' }} className={styles.right} spacing={1}>
                      {/* <ContentCopy  /> */}
                      <CopyToClipboard text={(newProj['payment_eth_address'])} onCopy={() => setCopyFlag(true)}>
                        <Stack direction='row' alignItems='center' spacing={1}>
                          <span className={classes.key}>
                            {newProj['payment_eth_address']}
                          </span>
                          {copyFlag ? <CheckCircleOutline sx={{ cursor: 'pointer' }} /> : <ContentCopy sx={{ cursor: 'pointer' }} />}
                        </Stack>
                      </CopyToClipboard>
                    </Stack>
                  </Stack>
                  <Typography sx={{ fontStyle: 'italic' }}>
                    Text content to explain max 1 hour wait for pending tx and what happens next after payment has been made.
                  </Typography>
                  {/* </div> */}
                </Stack>
              </div>
            )
          }


          <Stack
            direction={'row'} justifyContent='center' spacing={2}
            className={styles.dotsBody}
          >
            {
              dots.map((item, index) => {
                return <button key={index} className={styles.dot} style={{ backgroundColor: index === active ? '#b692f6' : '#e9d7fe' }} ></button>
              })
            }
          </Stack>

          {
            tabIndex === 0 && (
              <Stack direction='row' justifyContent='center' className={styles.cancelBtn}>
                <Button variant='outlined' onClick={handleClose} sx={{ color: 'common.black' }} >Cancel</Button>
              </Stack>
            )
          }

          {
            tabIndex === 1 && (
              <Stack direction={'row'} justifyContent='space-between'>
                <Button variant='outlined' startIcon={<ArrowBack />}
                  onClick={() => {
                    setTabIndex(0)
                    setActive(0)
                  }}
                  sx={{ color: 'common.black' }}
                >
                  <Typography variant='h4'>
                    Go&nbsp;back
                  </Typography>
                </Button>
                <Button variant='contained' endIcon={<ArrowForward />}
                  onClick={() => setTabIndex(2)}
                  sx={{ height: '44px' }}
                >
                  <Typography variant='h4'>
                    Continue&nbsp;to&nbsp;payment
                  </Typography>
                </Button>
              </Stack>
            )
          }

          {
            tabIndex === 2 && (
              <Stack direction={'row'} justifyContent='space-between' sx={{ mt: 3 }}>
                <Button variant='outlined' startIcon={<ArrowBack />}
                  sx={{ color: 'common.black' }}
                  onClick={() => {
                    setTabIndex(1)
                    setActive(1)
                  }}
                >
                  <Typography variant='h4'>
                    Go&nbsp;back
                  </Typography>
                </Button>
                <Button variant='contained' endIcon={<ArrowForward />}
                  onClick={() => {
                    setTabIndex(0)
                    handleClose()
                  }}
                  sx={{ height: '44px' }}
                >
                  <Typography variant='h4'>
                    Return&nbsp;to&nbsp;dashboard
                  </Typography>
                </Button>
              </Stack>
            )
          }
        </Box >
      </Modal >
    </div >
  )
}

export default ProjectModal
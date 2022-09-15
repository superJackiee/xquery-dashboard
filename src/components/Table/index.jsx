import React, { useState } from "react"
import usePagination from "@mui/material/usePagination"
import { useSelector } from "react-redux"
import { useMedia } from 'react-use'
import styled from "@emotion/styled"
import { Button, Typography, IconButton } from "@mui/material"
import { FlexColumn } from "../Layout"
import { createStyles, makeStyles } from "@mui/styles"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableRow from "@mui/material/TableRow"
import ProgressBar from "../ProgressBar"
import { Card } from "../Card"
import { light, dark } from "../../theme"
import styles from "./index.module.scss"
import searchIcon from "../../assets/icons/search.svg"
import info from "../../assets/icons/info.svg"
import forward from "../../assets/icons/forward.svg"
import backward from "../../assets/icons/backward.svg"
import { Stack } from "@mui/material"
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { FilterList, Close } from "@mui/icons-material"
import OutlinedInput from '@mui/material/OutlinedInput'
// custom components
import ProjectInfoModal from "../ViewInfoModal"

const List = styled('ul')({
  listStyle: 'none',
  padding: 0,
  margin: 0,
  display: 'flex',
  alignItems: 'center'
})

const MobileList = styled('ul')({
  listStyle: 'none',
  padding: 0,
  margin: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
})

const filterlist = [
  'Active',
  'Inactive',
  'Pending'
]

const StyledPagination = (props) => {
  const { items, curPage, length, setPage } = props
  const classes = useStyles()
  const mobile = useMedia('(max-width: 576px)')
  const mode = useSelector((state) => state.toogle.darkMode)
  const theme = mode === 'true' ? dark : light

  return (
    <nav className={`${styles.footer}`}>
      {mobile ?
        <MobileList>
          <Button
            style={{ color: theme.palette.common.black }}
            className={`${styles.arrow}`}
            onClick={() => setPage(curPage <= 1 ? curPage : curPage - 1)}
            startIcon={<img src={backward} alt='backward' />}
          >
          </Button>
          <Typography variant='h5' color='common.black'>Page {curPage} of {Math.ceil(length / 10) + (length === 0 ? 1 : 0)}</Typography>
          <Button
            style={{ color: theme.palette.common.black }}
            className={`${styles.arrow}`}
            onClick={() => setPage(curPage > Math.ceil(items.length / 10) ? curPage : curPage + 1)}
            startIcon={<img src={forward} alt='forward' />}
          >
          </Button>
        </MobileList>
        : <List>
          {items.map(({ page, type, selected, ...item }, index) => {
            let children = null;

            if (type === 'start-ellipsis' || type === 'end-ellipsis') {
              children = (
                <IconButton
                  style={{ color: theme.palette.common.black }}
                  className={`${styles.page}`}>…</IconButton>
              );
            } else if (type === 'page') {
              children = (
                <IconButton
                  style={{ color: theme.palette.text.primary }}
                  onClick={() => setPage(page)}
                  className={`${styles.page} ${curPage === page && styles.active}`}>{page}</IconButton>
              );
            } else {
              children = (
                <Button
                  style={{ color: theme.palette.common.black }}
                  className={`${styles.arrow}`}
                  onClick={() => type === 'previous' ? setPage(curPage <= 1 ? curPage : curPage - 1) : setPage(curPage >= Math.ceil(length / 10) ? curPage : curPage + 1)}
                  startIcon={type === 'previous' && <img src={backward} width="21px" height="21px" alt='backward' style={{ marginBottom: '2px' }} />}
                  endIcon={type === 'next' && <img src={forward} width="21px" height="21px" alt='forward' style={{ marginBottom: '2px' }} />}
                >
                  {!mobile && <span className={classes.pageBtn}>{type === 'previous' ? 'Previous' : 'Next'}</span>}
                </Button>
              );
            }

            return <li
              key={index}
              className={`${type === 'previous' ? styles.left : type === 'next' ? styles.right : ''}`}>{children}</li>;
          })}
        </List>}
    </nav>
  )
}

const useStyles = makeStyles((theme) =>
  createStyles({
    sticky: {
      position: "sticky",
      right: 0,
      background: theme.palette.info.dark,
      padding: "3px 10px"
    },
    cell: {
      width: '86px !important',
      borderBottom: `1px solid ${theme.palette.divider} !important`,
      whiteSpace: 'nowrap',
      textAlign: 'left',
      [theme.breakpoints.up(960)]: {
        width: '15% !important'
      }
    },
    rowInline: {
      [theme.breakpoints.up(960)]: {
        maxHeight: '66px !important',
        display: "inline !important"
      }
    },
    bottomDiv: {
      borderBottom: `1px solid ${theme.palette.divider}`
    },
    filtSelect: {
      backgroundColor: theme.palette.secondary.main,
      textAlign: 'center',
      color: 'white'
    },
    search: {
      height: '40px',
      width: '400px',
      fontSize: '14px',
      background: theme.palette.secondary.main,
      borderColor: theme.palette.background.default,
      borderRadius: '8px',
      [theme.breakpoints.down(960)]: {
        width: '100%'
      }
    },
    stacks: {
      [theme.breakpoints.down(960)]: {
        minWidth: '100%',
        flexWrap: 'wrap'
      }
    },
    filtText: {
      color: theme.palette.text.primary,
      fontSize: '14px !important',
      [theme.breakpoints.up(960)]: {
        display: 'none'
      }
    },
    icon: {
      borderRadius: '6px !important'
    },
    pageBtn: {
      fontSize: '14px !important'
    },
    filterList: {
      [theme.breakpoints.down(960)]: {
        width: '20px',
        height: '20px'
      }
    }
  })
);

const StyledTable = (props) => {
  const response = [
    { projectId: 'c9f0f895fb98ab9159f51fd0297e236d', status: 'Active', usage: 25, expires: 'Aug 01, 2022' },
    { projectId: 'c9f0f895fb98ab9159f51fd0297e236e', status: 'Pending', usage: 0, expires: '-' },
    { projectId: 'c9f0f895fb98ab9159f51fd0297e236f', status: 'Active', usage: 8, expires: 'Aug 01, 2022' },
    { projectId: 'c9f0f895fb98ab9159f51fd0297e236g', status: 'Inactive', usage: 100, expires: 'Aug 01, 2022' },
    { projectId: 'c9f0f895fb98ab9159f51fd0297e236h', status: 'Active', usage: 50, expires: 'Aug 01, 2022' },
    { projectId: 'c9f0f895fb98ab9159f51fd0297e236i', status: 'Active', usage: 25, expires: 'Aug 01, 2022' },
    { projectId: 'c9f0f895fb98ab9159f51fd0297e236j', status: 'Active', usage: 25, expires: 'Aug 01, 2022' },
    { projectId: 'c9f0f895fb98ab9159f51fd0297e236k', status: 'Active', usage: 25, expires: 'Aug 01, 2022' },
    { projectId: 'c9f0f895fb98ab9159f51fd0297e236l', status: 'Active', usage: 25, expires: 'Aug 01, 2022' },
    { projectId: 'c9f0f895fb98ab9159f51fd0297e236m', status: 'Active', usage: 25, expires: 'Aug 01, 2022' },
    { projectId: 'c9f0f895fb98ab9159f51fd0297e236o', status: 'Active', usage: 25, expires: 'Aug 01, 2022' },
    { projectId: 'c9f0f895fb98ab9159f51fd0297e236p', status: 'Pending', usage: 0, expires: '-' },
    { projectId: 'c9f0f895fb98ab9159f51fd0297e236q', status: 'Inactive', usage: 100, expires: 'Aug 01, 2022' },
    { projectId: 'c9f0f895fb98ab9159f51fd0297e236r', status: 'Inactive', usage: 100, expires: 'Aug 01, 2022' },
    { projectId: 'c9f0f895fb98ab9159f51fd0297e236s', status: 'Active', usage: 50, expires: 'Aug 01, 2022' },
    { projectId: 'c9f0f895fb98ab9159f51fd0297e236t', status: 'Pending', usage: 0, expires: '-' },
    { projectId: 'c9f0f895fb98ab9159f51fd0297e236u', status: 'Active', usage: 25, expires: 'Aug 01, 2022' },
    { projectId: 'c9f0f895fb98ab9159f51fd0297e236v', status: 'Active', usage: 25, expires: 'Aug 01, 2022' }
  ]

  const { theme, open, handleClose, handleOpen } = props
  const [search, setSearch] = useState('')
  const [toFilter, setToFilter] = useState([])
  const [fromFilter, setFromFilter] = useState(filterlist)
  const classes = useStyles()
  const filteredList = response.filter(data => data.projectId.startsWith(search) && (toFilter.length > 0 ? toFilter.includes(data.status) : 1))
  const { items } = usePagination({
    count: Math.ceil(filteredList.length / 10)
  })
  const [page, setPage] = useState(1)


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

  const filterTags = () => {
    return (
      <>
        {
          toFilter.map((item) => {
            return (
              <button className={styles.toFilterBtn}>
                {item} <Close sx={{ cursor: 'pointer', width: '20px', height: '20px' }} onClick={() => handleDelete(item)} />
              </button>
            )
          })
        }
      </>
    )
  }

  return (
    <Card className={`${styles.mt10}`}>
      <div className={`${styles.header} ${classes.bottomDiv}`}>
        <FlexColumn>
          <Typography variant='h3' color='common.black' className={`${styles.title}`}>Your Projects</Typography>
          <Typography variant='p' color='text.primary' fontWeight='normal !important'>Lorem ipsum dolor sit amet, consectetur adipiscing elit</Typography>
        </FlexColumn>
      </div>
      <div className={`${styles.filter} ${classes.bottomDiv}`}>
        <OutlinedInput
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            setPage(1)
          }}
          className={classes.search}
          id="outlined-adornment-amount"
          placeholder='Search by name or project ID'
          startAdornment={<img src={searchIcon} alt='search' />}
        />

        <Stack className={classes.stacks} direction="row" justifyContent="flex-end" alignItems="center"
          sx={{
            gap: '10px'
          }}>
          <div className={styles.tag1}>
            {filterTags()}
          </div>
          <Select
            id="demo-simple-select-autowidth"
            value={0}
            className={`${styles.filtSelect} ${classes.filtSelect}`}
            onChange={handleChange}
            sx={{
              '.MuiSvgIcon-root.MuiSelect-iconOutlined': { display: 'none !important' },
              '.css-i4bv87-MuiSvgIcon-root': { color: 'warning.main' },
              color: 'transparent',
            }}
          >
            <MenuItem value={0} sx={{ display: 'none' }}>
              <div className={`${styles.flexCenter} ${classes.icon}`}>
                <FilterList className={classes.filterList} sx={{ color: theme.palette.common.black }} /><span className={classes.filtText}>Filter</span>
              </div>
            </MenuItem>
            {
              fromFilter.map((item) => {
                return <MenuItem key={item} value={item} className={classes.item}>{item}</MenuItem>
              })
            }
          </Select>
          <div className={styles.tag2}>
            {filterTags()}
          </div>
        </Stack>
      </div>
      {/* </div> */}

      <TableContainer style={{ maxWidth: '860px', width: '100%' }}>
        <Table
          className={classes.table}
          aria-label="simple table"
          style={{ tableLayout: "fixed" }}
        >
          <TableBody>
            {filteredList.slice((page - 1) * 10, page * 10).map((data, index) => (
              <TableRow className={classes.rowInline} key={index}>
                <TableCell className={classes.cell} padding="none" component="th" scope="row">
                  <FlexColumn className={`${styles.column} ${styles.flexStart}`}>
                    <Typography className={`${styles.title}`} color='common.black' variant='h6'>Project ID</Typography>
                    <Typography variant='h6' color='#475467' sx={{ fontWeight: '400 !important' }}>{data.projectId.slice(0, 8).concat('...')}</Typography>
                  </FlexColumn>
                </TableCell>
                <TableCell className={classes.cell} padding="none" align="right">
                  <FlexColumn className={`${styles.column} ${styles.flexStart}`}>
                    <Typography className={`${styles.title}`} color='common.black' variant='h6'>Status</Typography>
                    <Typography variant='h6' color='#475467'>{data.status}</Typography>
                  </FlexColumn>
                </TableCell>
                <TableCell className={classes.cell} padding="none" align="right">
                  <FlexColumn className={`${styles.column} ${styles.flexStart}`}>
                    <Typography className={`${styles.title}`} color='common.black' variant='h6'>Usage</Typography>
                    <ProgressBar process={data.usage} />
                  </FlexColumn>
                </TableCell>
                <TableCell className={classes.cell} padding="none" align="right">
                  <FlexColumn className={`${styles.column}`}>
                    <Typography className={`${styles.title}`} color='common.black' variant='h6'>Expires</Typography>
                    <Typography variant='h6' color='#475467'>{data.expires}</Typography>
                  </FlexColumn>
                </TableCell>
                <TableCell className={`${classes.cell} ${classes.sticky}`} padding="none" align="right">
                  <FlexColumn className={`${styles.column}`} style={{ padding: '12px 0px 12px 35px' }}>
                    <div className={styles.infoBtn} onClick={handleOpen}>
                      <Typography variant='h5' color='white' className={styles.info} style={{ whiteSpace: 'nowrap' }}>
                        View project info
                      </Typography>
                      <img src={info} alt='info' />
                    </div>
                  </FlexColumn>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <StyledPagination items={items} curPage={page} length={filteredList.length} setPage={setPage} />

      <ProjectInfoModal open={open} handleClose={handleClose} />
    </Card>
  )
}

export default StyledTable
import { Box, makeStyles } from '@material-ui/core'
import { Chat } from '@material-ui/icons'
import React, { useContext, useState } from 'react'
import { AccountContext } from '../../context/AccountProvider'
import InfoDrawer from '../drawer/InfoDrawer'
import Headermenu from './Headermenu'

const useStyles = makeStyles({
  heder:{
    height: 35,
    background: "#ededed",
    padding: "10px 16px",
    display: "flex",
    alignItems: "center"
  },
  avatar:{
    height: 37,
    width: 37,
    borderRadius: "50%",
    cursor: "pointer"
  },
  icons:{
    marginLeft: "auto",
    "& > *":{
      marginLeft: 2,
      padding: 8,
      color: "#54656f",
      cursor: "pointer"
    },
    "&: first-child":{
      fontSize: 22,
      marginRight: 8,
      marginTop: 3
    }
  }
})

const Header = () => {
  const { account } = useContext(AccountContext)
  const classes = useStyles()
  const [open, setOpen] = useState(false)

  const toggleDrawer = () => {
    setOpen(true)
  }

  return (
    <>
    <Box className={classes.heder}>
      <img src={account.imageUrl} onClick={toggleDrawer} alt="display" className={classes.avatar}/>

      <Box className={classes.icons}>
        <Chat/>
        <Headermenu/>
      </Box>

    </Box>

    <InfoDrawer open={open} setOpen={setOpen}/>
    </>
  )
}

export default Header
import { makeStyles, Menu, MenuItem } from '@material-ui/core'
import { MoreVert } from '@material-ui/icons'
import React, { useContext, useState } from 'react'
import { GoogleLogout } from 'react-google-login'
import { AccountContext } from '../../context/AccountProvider'
import { CLIENT_ID } from '../../Variables'
import InfoDrawer from '../drawer/InfoDrawer'

const useStyles = makeStyles({
    menuItem:{
        fontSize: 14,
        padding: "15px 60px 5px 24px",
        color: "#4a4a4a"
    },
    logout:{
        border: "none!important",
        boxShadow: "none!important",
        "& > *":{
            padding: "0px!important"
        }
    }
})

const Headermenu = () => {
    const [open, setOpen] = useState(false)
    const { setAccount } = useContext(AccountContext)
    const classes = useStyles()
    const [openDrawer, setOpenDrawer] = useState(false)

    const handleClose = () => {
        setOpen(false)
    }

    const handleClick = (event) => {
        setOpen(event.currentTarget)
    }

    const onLogoutSuccess = () => {
        alert("You have been logged out!")
        console.clear()
        setAccount('')
    }

    const toggleDrawer = () => {
        setOpenDrawer(true)
      }

    return (
        <>
            <MoreVert onClick={handleClick} />
            <Menu
                anchorEl={open}
                open={Boolean(open)}
                onClose={handleClose}
                getContentAnchorEl={null}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center"
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                }}
            >
                <MenuItem onClick={() => {handleClose(); toggleDrawer()}} className={classes.menuItem}>Profile</MenuItem>
                <MenuItem onClick={handleClose} className={classes.menuItem}>
                    <GoogleLogout 
                    buttonText='Logout'
                    clientId={CLIENT_ID}
                    onLogoutSuccess={onLogoutSuccess}
                    className={classes.logout}
                    >

                    </GoogleLogout>
                </MenuItem>
            </Menu>
            <InfoDrawer open={openDrawer} setOpen={setOpenDrawer}/>
        </>
    )
}

export default Headermenu
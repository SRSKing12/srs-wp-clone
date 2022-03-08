import { Box, Drawer, Typography } from '@material-ui/core'
import { ArrowBack } from '@material-ui/icons'
import { makeStyles } from '@material-ui/styles'
import React from 'react'
import Profile from './Profile'

const useStyles = makeStyles({
    header: {
        background: "#00a884",
        height: 97,
        color: "white",
        display: "flex",
        "& > *":{
            marginTop: "auto",
            padding: 15,
            fontWeight: 600,
        }
    },
    component:{
        background: "#ededed",
        height: "86%"
    }
})

const InfoDrawer = ({open, setOpen}) => {
    const classes = useStyles()

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <Drawer open={open} onClose={handleClose}>
            <Box className={classes.header}>
                <ArrowBack onClick={handleClose} style={{cursor: "pointer"}}/>
                <Typography>Profile</Typography>
            </Box>

            <Box className={classes.component}>
                <Profile/>
            </Box>
        </Drawer>
    )
}

export default InfoDrawer
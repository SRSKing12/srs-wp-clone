import { AppBar, Box, makeStyles, Toolbar, Typography } from '@material-ui/core'
import React, { useContext } from 'react'
import { AccountContext } from '../context/AccountProvider';
import Chatbox from './Chatbox';
import Login from './Login';
import myLogo from "../SRS Logo.png"

const useStyle = makeStyles({
    component:{
        background: "#dcdcdc",
        height: "100vh"
    },
    loginHeader: {
        height: 200,
        background: "#00bfa5",
        boxShadow: "none"
    },
    header: {
        height: 115,
        background: "#128c73",
        boxShadow: "none"
    },
    logoContainer:{
        position: "relative",
        display: "flex",
        alignItems: "center",
        top: 10
    },
    logo:{
        height: 70,
        width: 70,
        borderRadius: "50%"
    },
    logoTxt:{
        fontSize: 40,
        fontFamily: "Times New Roman"
    }
})

const Messenger = () => {
    const classes = useStyle();
    const { account } = useContext(AccountContext)

    return (
        <div className={classes.component}>
            <AppBar className={account ? classes.header : classes.loginHeader}>
                {
                    !account ? <Box className={classes.logoContainer}><img src={myLogo} alt="Logo" className={classes.logo}/><Typography className={classes.logoTxt}>SRS Chat App</Typography></Box> : ""
                }
                <Toolbar></Toolbar>
            </AppBar>
            { account ? <Chatbox/> : <Login/> }
        </div>
    )
}

export default Messenger
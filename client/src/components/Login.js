import { Box, Dialog, List, ListItem, Typography, withStyles } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React, { useContext } from 'react'
import GoogleLogin from 'react-google-login'
import { AccountContext } from '../context/AccountProvider'
import { addUser } from '../service/api'
import { CLIENT_ID } from '../Variables'

const style = {
    dialogPaper: {
        height: "95%",
        width: "60%",
        marginTop: "12%",
        boxShadow: "none",
        borderRadius: "0",
        maxHeight: "100%",
        maxWidth: "100%",
        overflow: "hidden"
    }
}

const useStyle = makeStyles({
    title: {
        fontSize: "26px",
        marginBottom: "25",
        color: "#525252",
        fontFamily: "Segoe UI, Helvetica Neue, Helvetica, Lucida Grande, Arial, Ubuntu, Cantare 11, Fire Sans, sans-serif",
        fontWeight: 300

    },
    component: {
        display: "flex"
    },
    leftComponent: {
        padding: "56px 0 56px 56px"
    },
    qrCode: {
        height: "264",
        width: "264",
        padding: "50px 0 0 50px"
    },
    list: {
        // All child components ---> & > *
        "& > *": {
            fontSize: 18,
            padding: 0,
            marginTop: 15,
            lineHeight: "28px",
            color: "#4a4a4a"
        }
    }
})

const Login = ({ classes }) => {
    const classname = useStyle()
    const qrUrl = "https://www.ginifab.com/feeds/qr_code/img/qrcode.jpg"

    const { account, setAccount } = useContext(AccountContext)

    const onLoginSuccess = async (res) => {
        console.log("Login Successful!");
        // console.log(res)
        setAccount(res.profileObj)
        await addUser(res.profileObj)
    }

    const onLoginFailure = () => {
        console.log("Login Failed!");
    }

    return (
        <Dialog open={true} classes={{ paper: classes.dialogPaper }} BackdropProps={{ style: { background: "none" } }}>
            <Box className={classname.component}>
                <Box className={classname.leftComponent}>
                    <Typography className={classname.title}>To start chatting on your Computer:</Typography>
                    <List className={classname.list}>
                        <ListItem>1. Make sure you have a google account.</ListItem>
                        <ListItem>2. Click on the button to login with your google account.</ListItem>
                        <ListItem>3. You can start using the app now!</ListItem>
                    </List>
                </Box>

                <Box style={{position: "relative"}}>
                    <img src={qrUrl} alt='qr' className={classname.qrCode} />
                    <Box style={{position: "absolute", left:"50%", top: "50%"}}>
                        <GoogleLogin
                            buttonText=''
                            clientId={CLIENT_ID}
                            cookiePolicy={'single_host_origin'}
                            onSuccess={onLoginSuccess}
                            onFailure={onLoginFailure}
                        />
                    </Box>
                </Box>
            </Box>
        </Dialog>
    )
}

export default withStyles(style)(Login)
import { Box, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React, { useContext } from 'react'
import { AccountContext } from '../../context/AccountProvider'

const useStyles = makeStyles({
    imgContainer:{
        display: "flex",
        justifyContent: "center"
    },
    dp:{
        width: 200,
        height: 200,
        borderRadius: "50%",
        padding: "18px 0"
    },
    nameContainer:{
        background: "white",
        padding: "12px 30px 2px",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.08)",
        "& :first-child":{
            fontSize: 14,
            color: "#009688"
        },
        "& :last-child":{
            color: "$484848",
            margin: "14px 0"
        }
    },
    desc:{
        padding: "10px 20px 28px 14px",
        "& > *":{
            fontSize: 14,
            color: "rgba(0, 0, 0, 0.45)"
        }
    }
})

const Profile = () => {
    const {account} = useContext(AccountContext)
    const classes = useStyles()

    return (
        <>
            <Box className={classes.imgContainer}>
                <img src={account.imageUrl} className={classes.dp} alt="DP"/>
            </Box>

            <Box className={classes.nameContainer}>
                <Typography>Your Name</Typography>
                <Typography>{account.name}</Typography>
            </Box>

            <Box className={classes.desc}>
                <Typography>This is not your username or pin. This name will be visible to your contacts.</Typography>
            </Box>

            <Box className={classes.nameContainer}>
                <Typography>Your Email</Typography>
                <Typography>{account.email}</Typography>
            </Box>
        </>
    )
}

export default Profile
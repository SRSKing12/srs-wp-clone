import { Box, makeStyles, Typography } from '@material-ui/core'
import React, { useContext } from 'react'
import { AccountContext } from '../../context/AccountProvider'

const useStyles = makeStyles({
    wrapper:{
        background: "#ffffff",
        padding: 5,
        maxWidth: "60%",
        display: "flex",
        borderRadius: 10,
        width: "fit-content",
        wordBreak: "break-word",
        marginTop: 8
    },
    text:{
        fontSize: 14,
        padding: "0 25px 0 5px"
    },
    time:{
        fontSize: 10,
        marginTop: 6,
        color: "#919191",
        wordBreak: "keep-all"
    },
    own:{
        background: "#dcf8c6",
        padding: 5,
        maxWidth: "60%",
        display: "flex",
        borderRadius: 10,
        width: "fit-content",
        wordBreak: "break-word",
        marginLeft: "auto",
        marginTop: 8,
    }    
})

const Message = ({message}) => {
    const classes = useStyles()
    const {account} = useContext(AccountContext)

    const formatDate = (date) => {
        var hours = date.getHours()
        var minutes = date.getMinutes()
        var ampm = hours>=12 ? 'PM' : 'AM'
        hours %= 12
        hours = hours ? hours : 12
        minutes = minutes < 10 ? '0'+minutes : minutes
        var strTime = hours + ':' + minutes + ' ' + ampm
        return strTime
    }

  return (
    <Box className={account.googleId === message.sender ? classes.own : classes.wrapper}>
        <Typography className={classes.text}>{message.text}</Typography>
        <Typography className={classes.time}>{formatDate(new Date(message.createdAt))}</Typography>
    </Box>
  )
}

export default Message
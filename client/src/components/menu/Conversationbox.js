import { Box, makeStyles, Typography } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'
import { AccountContext } from '../../context/AccountProvider'
import { UserContext } from '../../context/UserProvider'
import { getConversation, setConversation } from '../../service/api'

const useStyles = makeStyles({
  component:{
    display: "flex",
    height: 48,
    padding: "13px 0",
    cursor: "pointer"
  },
  dispPic:{
    height: 50,
    width: 50,
    borderRadius: "50%",
    padding: "0 14px"
  },
  time:{
    fontSize: 12,
    marginLeft: "auto",
    marginRight: 20,
    color: "#00000099"
  },
  text:{
    color: "rgba(0, 0, 0, 0.6)",
    fontSize: 14
  }
})

const Conversationbox = ({user}) => {
  const classes = useStyles()
  const {account, socket, setActiveUsers, isNewMsg} = useContext(AccountContext)
  const {setPerson} = useContext(UserContext)
  const [msg, setMsg] = useState({})

  useEffect(() => {
    const getConversationMsg = async () => {
      const data = await getConversation({sender: account.googleId, receiver: user.googleId})
      setMsg({text: data.message, timestamp: data.updatedAt})
    }
    getConversationMsg()
  }, [isNewMsg, account.googleId, user.googleId])

  const setUser = async () => {
    setPerson(user)
    await setConversation({senderId: account.googleId, receiverId: user.googleId})
  }

  useEffect(() => {
    socket.current.emit("addUser", account.googleId)
    socket.current.on("getUsers", users => {
      setActiveUsers(users)
    }, [account])
  })

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
    <Box className={classes.component} onClick={setUser}>
        <Box>
            <img src={user.imageUrl} className={classes.dispPic} alt="dp"/>
        </Box>

        <Box style={{width: "100%"}}>
          <Box style={{display: "flex"}}>
            <Typography>{user.name}</Typography>
            {
              msg.text && <Typography className={classes.time}>{formatDate(new Date(msg.timestamp))}</Typography>
            }
          </Box>

          <Box>
            <Typography className={classes.text}>{msg.text}</Typography>
          </Box>
        </Box>
    </Box>
  )
}

export default Conversationbox
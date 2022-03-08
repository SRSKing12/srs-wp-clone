import { Box, makeStyles } from '@material-ui/core'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { AccountContext } from '../../context/AccountProvider'
import { newMessage, getMessages } from '../../service/api'
import Footer from './Footer'
import Message from './Message'

const useStyles = makeStyles({
  wrapper:{
    backgroundImage: `url(${'https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png'})`,
    backgroundSize: "50%"
  },
  component:{
    height: "79vh",
    overflowY: "scroll"
  },
  container:{
    padding: "1px 80px"
  }
})

const Messages = ({person, conversation}) => {
  const classes = useStyles()
  const [value, setValue] = useState()
  const {account, socket, isNewMsg, setIsNewMsg} = useContext(AccountContext)
  const [messages, setMessages] = useState([])
  const [incomingMsg, setIncomingMsg] = useState()
  const scrollRef = useRef()

  useEffect(() => {
    socket.current.on("getMessage", data => {
      setIncomingMsg({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now()
      })
    })
  }, [])

  useEffect(() => {
    incomingMsg && conversation?.members?.includes(incomingMsg.sender) && setMessages((prev) => [...prev, incomingMsg])
  }, [incomingMsg, conversation])

  useEffect(() => {
    const getMessageDetails = async () => {
      let response = await getMessages(conversation._id)
      setMessages(response.data)
    }
    getMessageDetails()
  }, [conversation?._id, person._id, isNewMsg])

  useEffect(() => {
    scrollRef.current?.scrollIntoView({transition: 'smooth'})
  }, [messages])

  const receiverId = conversation?.members?.find(member => member !== account.googleId)

  const sendText = async (e) => {
    let code = e.keyCode || e.which
    if(!value) return;

    if(code === 13){
      let message = {
        sender: account.googleId,
        conversationId: conversation._id,
        text: value
      }

      socket.current.emit("sendMessage", {
        senderId: account.googleId,
        receiverId: receiverId,
        text: value
      })

      await newMessage(message)
      setValue('')
      setIsNewMsg(prev => !prev)
    }
  }

  return (
    <Box className={classes.wrapper}>
      <Box className={classes.component}>
        {
          messages && messages.map(message => {
            return <Box className={classes.container} ref={scrollRef}><Message message={message}/></Box>
          })
        }
      </Box>

      <Footer sendText={sendText} setValue={setValue} value={value}/>
    </Box>
  )
}

export default Messages
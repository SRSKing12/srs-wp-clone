import { Box } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'
import { AccountContext } from '../../context/AccountProvider'
import { UserContext } from '../../context/UserProvider'
import { getConversation } from '../../service/api'
import Chatheader from './Chatheader'
import Messages from './Messages'

const Chat = () => {
  const {person} = useContext(UserContext)
  const {account} = useContext(AccountContext)
  const [conversation, setConversation] = useState({})

  useEffect(() => {
    const getConversationDetails = async () => {
      let data = await getConversation({sender: account.googleId, receiver: person.googleId})
      setConversation(data)
    }
    getConversationDetails()
  }, [person.googleId, account.googleId])

  return (
    <Box>
      <Chatheader />
      <Messages conversation={conversation} person={person}/>
    </Box>
  )
}

export default Chat
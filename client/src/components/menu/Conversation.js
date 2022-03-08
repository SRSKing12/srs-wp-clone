import React, { useContext, useEffect, useState } from 'react'
import { getUser } from '../../service/api'
import { Box, makeStyles } from '@material-ui/core'
import Conversationbox from './Conversationbox'
import { AccountContext } from '../../context/AccountProvider'

const useStyles = makeStyles({
  component:{
    height: "81vh",
    overflow: "overlay"
  }
})

const Conversation = ({text}) => {
  const [users, setUsers] = useState([])
  const {account} = useContext(AccountContext)
  const classes = useStyles()

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUser()
      const filteredData = data.filter(user => user.name.toLowerCase().includes(text.toLowerCase()))
      setUsers(filteredData)
    }
    fetchData() 
  }, [text])

  return (
    <Box className={classes.component}>
        {
          users.map(user => {
            return user.googleId !== account.googleId &&
            <Conversationbox user={user}/>
          })
        }
    </Box>
  )
}

export default Conversation
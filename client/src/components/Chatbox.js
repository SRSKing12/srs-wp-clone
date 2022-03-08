import { Box, Dialog, makeStyles, withStyles } from '@material-ui/core'
import React, { useContext } from 'react'
import { UserContext } from '../context/UserProvider'
import Chat from './chat/Chat'
import Emptychat from './chat/Emptychat'
import Menu from './menu/Menu'

const style = {
  dialogPaper: {
      height: "95%",
      width: "91%",
      boxShadow: "none",
      borderRadius: "0",
      maxHeight: "100%",
      maxWidth: "100%",
      overflow: "hidden"
  }
}

const useStyles = makeStyles({
  component:{
    display: "flex"
  },
  leftComponent:{
    minWidth: 380
  },
  rightComponent:{
    borderLeft: "1px solid rgba(0, 0, 0, 0.14)",
    width: "73%",
    minWidth: 300,
    height: "100%"
  }
})

const Chatbox = ({ classes }) => {
  const classname = useStyles()
  const {person} = useContext(UserContext)

  return (
      <Dialog open={true} classes={{ paper: classes.dialogPaper }} BackdropProps={{style: {backgroundColor: "unset"}}}>
        <Box className={classname.component}>
          <Box className={classname.leftComponent}>
            <Menu/>
          </Box>

          <Box className={classname.rightComponent}>
            {
              Object.keys(person).length ? <Chat/> : <Emptychat/>
            }
          </Box>

        </Box>
      </Dialog>
  )
}

export default withStyles(style)(Chatbox)
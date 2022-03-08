import { Box, InputBase, makeStyles } from '@material-ui/core'
import React from 'react'
import { AttachFile, EmojiEmotionsOutlined, Mic } from '@material-ui/icons'

const useStyles = makeStyles(theme => ({
  footer: {
    height: 58,
    background: "#ededed",
    width: "100%",
    display: "flex",
    alignItems: "center",
    padding: "0 15px",
    "& > *": {
      margin: 5,
      color: "#54656E",
      cursor: "pointer"
    }
  },
  clip: {
    transform: "rotate(40deg)"
  },
  inputRoot: {
    width: "100%"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: 25,
    fontSize: 14,
    height: 20,
    width: '100%',
    transition: theme.transitions.create('width')
  },
  chatbox: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    width: "calc(95% - 100px)"
  }
}))

const Footer = ({ sendText, setValue, value }) => {
  const classes = useStyles()

  return (
    <Box className={classes.footer}>
      <EmojiEmotionsOutlined />
      <AttachFile className={classes.clip} />

      <Box className={classes.chatbox}>
        <InputBase placeholder='Type a message' inputProps={{ 'aria-label': 'search' }}
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput
          }}
          onKeyPress={(e) => sendText(e)}
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
      </Box>

      <Mic />
    </Box>
  )
}

export default Footer
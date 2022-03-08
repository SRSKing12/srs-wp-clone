import { Box, makeStyles } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles({
    component:{
        background: "#f8f9fa",
        height: "100%",
        padding: "50px 0",
        textAlign: "center"
    },
    image:{
        width: 420
    }
})

const Emptychat = () => {
    const classes = useStyles()

  return (
    <Box className={classes.component}>
        <img className={classes.image} src={"https://ik.imagekit.io/ag/wp-content/uploads/2015/01/QR-connected.png"} alt="no-chat"/>
    </Box>
  )
}

export default Emptychat
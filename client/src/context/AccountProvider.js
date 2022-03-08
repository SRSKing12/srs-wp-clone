import React, { createContext, useEffect, useRef, useState } from 'react'
import { io } from "socket.io-client"

export const AccountContext = createContext()

let socketHost = "https://srs-chatapp.herokuapp.com" || "http://localhost:9000"

const AccountProvider = ({children}) => {
    const [account, setAccount] = useState()
    const [activeUsers, setActiveUsers] = useState([])
    const [isNewMsg, setIsNewMsg] = useState(false)

    const socket = useRef()
    useEffect(() => {
        socket.current = io(`${socketHost}`)
    }, [])

    return (
        <AccountContext.Provider value={{ account, setAccount, socket, setActiveUsers, activeUsers, isNewMsg, setIsNewMsg }}>
            {children}
        </AccountContext.Provider>
    )
}

export default AccountProvider
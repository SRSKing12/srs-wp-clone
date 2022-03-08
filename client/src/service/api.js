import axios from "axios"

let host = "https://srs-chatapp.herokuapp.com/" || "http://localhost:8000"

export const addUser = async (data) => {
    try{
        return await axios.post(`${host}/add`, data)
    }catch(err){
        console.log("Some error occured!", err)
    }
}

export const getUser = async () => {
    try{
        let response = await axios.get(`${host}/users`)
        return response.data
    }catch(err){
        console.log("Some error occured!", err)
    }
}

export const setConversation = async (data) => {
    try{
        await axios.post(`${host}/conversation/add`, data)
    }catch(err){
        console.log("Failed to set Conversation!", err)
    }
}

export const getConversation = async (data) => {
    try {
        let response = await axios.post(`${host}/conversation/get`, data)
        return response.data
    } catch (err) {
        console.log("Failed to get Conversation!", err)
    }
}

export const newMessage = async (data) => {
    try {
        await axios.post(`${host}/message/add`, data)
    } catch (err) {
        console.log("Failed to send new message!", err)
    }
}

export const getMessages = async (id) => {
    try {
        return await axios.get(`${host}/message/get/${id}`)
    } catch (err) {
        console.log("Failed to get messages!", err)
    }
}
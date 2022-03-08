import Conversation from "../model/Conversation.js"
import Message from "../model/Message.js"

export const newMessage = async (req, res) => {
    const newMessage = new Message(req.body)

    try {
        await newMessage.save()
        await Conversation.findByIdAndUpdate(req.body.conversationId, {message: req.body.text})
        res.status(200).json("Message saved successfully!")
    } catch (err) {
        res.status(500).json(err)
    }
}

export const getMessage = async (req, res) => {
    try {
        let messages = await Message.find({conversationId: req.params.id})
        res.status(200).json(messages)
    } catch (err) {
        res.status(500).json(err)
    }
}
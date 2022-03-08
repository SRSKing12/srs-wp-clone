import Conversation from "../model/Conversation.js"

export const newConversation = async (req, res) => {
    const senderId = req.body.senderId
    const receiverId = req.body.receiverId

    try{
        const exist = await Conversation.findOne({members: {$all: [receiverId, senderId]}})

        if(exist){
            res.status(200).json("Conversation already exists!")
            return;
        }

        const newConversation = new Conversation({
            members: [senderId, receiverId]
        })
        await newConversation.save()
        res.status(200).json("New conversation started!")
    }catch(err){
        res.status(500).json(err)
    }
}

export const getConversation = async (req, res) => {
    try {
      const conversation = await Conversation.findOne({members: {$all: [req.body.sender, req.body.receiver]}})  
      res.status(200).json(conversation)
    } catch (err) {
        res.status(500).json(err)
    }
}
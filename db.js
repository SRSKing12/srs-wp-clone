import mongoose from "mongoose"

const connection = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI, {useUnifiedTopology: true, useNewUrlParser: true})
        console.log("Connected to MongoDB sucessfully!")
    } catch(err){
        console.log("Error while connecting to MongoDB!", err)
    }
}

export default connection
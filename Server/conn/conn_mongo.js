import mongoose from 'mongoose'
import 'dotenv/config'

// const URI = `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster0.10thi.mongodb.net/`

const URI = 'mongodb+srv://suvojitpal418:nFvUopSJvCcAmJdh@cluster0.10thi.mongodb.net/'
// const URI = 'mongodb+srv://suvojitpal418:nFvUopSJvCcAmJdh@cluster0.10thi.mongodb.net/Posts?retryWrites=true&w=majority'

mongoose.connect(URI).then(()=>{
    console.log("connection is successful")
}).catch((err)=>{
    console.log("error:", err)
})
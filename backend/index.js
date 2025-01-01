import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import { userRoutes } from './routes/userRoutes.js';



const app = express()
dotenv.config()
app.use(express.json())
app.use(cors())





app.get('/',(req , res)=>{
    res.status(200).send('Welcome to Backend')
})
app.use('/user',userRoutes)











const PORT = process.env.PORT || 3000
const MONGODB_URI = process.env.MONGODB_URI


mongoose.connect(MONGODB_URI)
.then((response)=>{
    console.log('db connected successfully')
})
.catch((error)=>{
    console.error('error connecting to db', error)
})


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors"
import authRoute from "./src/routes/authRoute.js"

const connectDB =  async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`mongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`error ${error.message}`);
        process.exit(1)
    }
};

connectDB();

const app = express();

app.use(express.json());
app.use(cors())
app.use('/api/auth', authRoute)

app.get("/", (req,res) => {
    res.send('api is running')
})

const PORT = process.env.PORT

app.listen(PORT, ()=>{
    console.log(`Server berjalan di port ${PORT}`)
})
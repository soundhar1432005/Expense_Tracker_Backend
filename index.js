const express=require("express")
const connectDB=require("./config/db")
const useRoute=require("./routes/userRoutes")
require("dotenv").config();
const cors=require('cors');
const app=express()
connectDB();
app.use(cors());
app.use(express.json());

app.use("/api",useRoute);
app.get('/',(req,res)=>{
    res.send('Hello from Express!');
});
app.get('/text',(req,res)=>{
    res.send('Hello text from Express!');
});
PORT=process.env.PORT
app.listen(PORT,()=>{
    console.log(`server connected to http://localhost:${PORT}`);
});

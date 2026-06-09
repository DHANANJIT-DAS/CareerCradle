import dotenv from "dotenv";
dotenv.config();
import connectDB from "./db/index.js";
import httpServer from "./app.js";


connectDB()
.then(()=>{
    httpServer.listen(process.env.PORT,()=>{
        console.log(`Server is listening at port ${process.env.PORT}`);
    });
})
.catch((error)=>{
    console.log(error);
});
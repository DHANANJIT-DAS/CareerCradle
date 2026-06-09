import express from "express";
import cors from "cors";
import { createServer } from "http";


const app = express();
const httpServer = createServer(app);


export default httpServer;
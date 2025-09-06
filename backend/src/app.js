import express from "express";
import { createServer } from "node:http";
import { Server } from "node:http";
import mongoose from "mongoose";
import cors from "cors";
import connectToSocket from "./controllers/socketManager.js";


const app = express();
const server = new Server(app);
const io = connectToSocket(server)
const port = 8000;
app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));
app.set("port", process.env.PORT || 8000);


// app.get("/test", (req, res) => {
//     res.send("Tested")
// })
// app.listen(port, () => {
//     console.log("App is Listening at 8080");
// })

const start = async () => {
    mongoose.connect('mongodb+srv://thisissairam:thisissairam@vidoo.fbav48a.mongodb.net/?retryWrites=true&w=majority&appName=vidoo')
        .then(() => console.log('Connected to dataBase !'));
    server.listen(app.get("port"), () => {
        console.log("App is Listening at 8080");
    });
};

start();
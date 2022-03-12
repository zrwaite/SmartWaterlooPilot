import express from "express";
import cors from "cors";
import env from "dotenv";
import path from "path";
import {response} from "./models/response"; //Created pre-formatted uniform response
import {Request, Response} from "express"; //Typescript types

const app = express();

//configs
env.config();

// utilities
app.use(cors());
app.use(express.json());


// routes
import apiRoute from "./routes/api.route";

// api routing
app.use("/api", apiRoute);

app.get("/test", (req:Request, res:Response) => {
	let result = new response(200, [], {page: "test"}, true);
	res.status(result.status).json(result); //Return 200 result
});


export default app; //Export server for use in index.ts

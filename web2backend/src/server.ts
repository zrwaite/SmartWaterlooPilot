import express from "express";
import cors from "cors";
import env from "dotenv";
import {response} from "./models/response"; //Created pre-formatted uniform response
import {Request, Response} from "express"; //Typescript types
import path from "path";

const app = express();

//configs
env.config();

// utilities
app.use(cors());
app.use(express.json());


// routes
import getFrontend from "./routes/frontend.route";
import apiRoute from "./routes/api.route";
import functionRoute from "./routes/function.route";

// api routing
app.use("/api", apiRoute);
app.use("/function", functionRoute);

app.get("/test", (req:Request, res:Response) => {
	let result = new response(200, [], {page: "test"}, true);
	res.status(result.status).json(result); //Return 200 result
});

app.get("/", getFrontend);
app.get("/*", getFrontend);

export default app; //Export server for use in index.ts

import {Request, Response} from "express"; //Typescript types

const notFound = async(req: Request, res: Response) => {
	res.status(404).json("Not found"); //Return whatever result remains
}

export default notFound
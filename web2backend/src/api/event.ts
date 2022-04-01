import {Request, Response} from "express"; //Typescript types
import {response, responseInterface} from "../models/response"; //Created pre-formatted uniform response
import {postEvent} from "../modules/postDatabaseInfo";
import {getEvent, getEvents, getOrgEvents} from "../modules/getDatabaseInfo";
import {getBodyParams, getQueryParams} from "../modules/getParams";
import {eventData} from "../database/eventData";

/* register controller */
export default class eventController {
	static async getEvent(req: Request, res: Response) {
		let result:responseInterface = new response(); //Create new standardized response
		let {success:eventSuccess, params:eventParams, errors:eventErrors} = await getQueryParams(req, ["event_id"]);
		if (eventSuccess) {
			const eventId = eventParams[0];
			const getEventResponse = await getEvent(eventId);
			result.status = getEventResponse.status;
			if (result.status == 200) {
				result.success = true;
				result.response = getEventResponse.event;
			}
			else if (result.status == 404) result.errors.push("event not found");
			else result.errors.push(...eventErrors);
		} else {
			let {success:orgEventSuccess, params:orgEventParams, errors:orgEventErrors} = await getQueryParams(req, ["org_id"]);
			if (orgEventSuccess) {
				const orgId = orgEventParams[0];
				const getEventResponse = await getOrgEvents(orgId);
				result.status = getEventResponse.status;
				if (result.status == 200) {
					result.success = true;
					result.response = getEventResponse.events;
				}
				else if (result.status == 404) result.errors.push("events not found");
				else result.errors.push(...orgEventErrors);
			} else {
				const allEvents = await getEvents();
				result.response = allEvents.events;
				result.status = allEvents.status;
				result.success = true;
			}
		}
		// errors.forEach((error) => result.errors.push(error));
		res.status(result.status).json(result); //Return whatever result remains
	}
	static async postEvent(req: Request, res: Response) {
		let result:responseInterface = new response(); //Create new standardized response
		let {success:eventSuccess, params:eventParams, errors:eventErrors} = await getBodyParams(req, eventData.baseEventKeys);
		if (eventSuccess) {
			let {params: additionalParams} = await getBodyParams(req, eventData.nullableEventKeys);
			let postResult = await postEvent([...eventParams, ...additionalParams]);
			if (postResult.success) {
				result.status = 201;
				result.success = true;
				result.response = {
					eventData: postResult.newEvent,
				}
			} else postResult.errors.forEach((error) => {result.errors.push(error)});
		} else eventErrors.forEach((param)=>{result.errors.push("missing "+param)});
		res.status(result.status).json(result); //Return whatever result remains
	}
	static async putEvent(req: Request, res: Response) {
		let result:responseInterface = new response(); //Create new standardized response
		//Put request code
		res.status(result.status).json(result); //Return whatever result remains
	}
	static async deleteEvent(req: Request, res: Response) {
		let result:responseInterface = new response(); //Create new standardized response
		//Delete request code
		res.status(result.status).json(result); //Return whatever result remains
	}
}

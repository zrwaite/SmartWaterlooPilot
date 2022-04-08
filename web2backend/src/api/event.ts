import {Request, Response} from "express"; //Typescript types
import {response, responseInterface} from "../models/response"; //Created pre-formatted uniform response
import {postEvent} from "../modules/postDatabaseInfo";
import {getEvent, getEvents, getOrgEvents} from "../modules/getDatabaseInfo";
import {getBodyParams, getQueryParams} from "../modules/getParams";
import {eventData} from "../database/eventData";
import {verifyOrgMember, getToken} from "../auth/tokenFunctions";

/* register controller */
export default class eventController {
	static async getEvent(req: Request, res: Response) {
		let result:responseInterface = new response(); //Create new standardized response
		let {success:eventSuccess, params:eventParams, errors:eventErrors} = await getQueryParams(req, ["event_id"]);
		if (eventSuccess) {
			const eventId = eventParams[0];
			if (!isNaN(eventId)){
				const getEventResponse = await getEvent(eventId);
				result.status = getEventResponse.status;
				if (result.status == 200) {
					result.success = true;
					result.response = getEventResponse.event;
				}
				else if (result.status == 404) result.errors.push("event not found");
				else result.errors.push(...eventErrors);
			} else {
				result.errors.push("invalid event_id");
				result.status = 404;
			}
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
				result.status = allEvents.status;
				if (allEvents.status === 200) {
					result.response = allEvents.events;
					result.success = true;
				}
			}
		}
		// errors.forEach((error) => result.errors.push(error));
		res.status(result.status).json(result); //Return whatever result remains
	}
	static async postEvent(req: Request, res: Response) {
		let result:responseInterface = new response(); //Create new standardized response
		let {success:eventSuccess, params:eventParams, errors:eventErrors} = await getBodyParams(req, eventData.baseEventKeys);
		if (eventSuccess) {
			let orgId = eventParams[0];
			let {success: tokenSuccess, error: tokenError} = await verifyOrgMember(orgId, getToken(req.headers));
			if (tokenSuccess ){
				let {params: additionalParams} = await getBodyParams(req, eventData.nullableEventKeys);
				let postResult = await postEvent([...eventParams, ...additionalParams]);
				if (postResult.success) {
					result.status = 201;
					result.success = true;
					result.response = {
						eventData: postResult.newEvent,
					}
				} else postResult.errors.forEach((error) => {result.errors.push(error)});
			} else {
				result.errors.push(tokenError)
				result.status = 401;
			}
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

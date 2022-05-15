import cookies from "../../modules/cookies"
import { addQueryParam } from "../../modules/other";
import { DEV } from "../dataConstants";
const baseURL = DEV?"https://imported-amsterdam-segments-betty.trycloudflare.com":"https://swrdataplayground.ca";


const httpReq = async (url:string, method:string = "GET", params:any = {}) => {
    url = baseURL + url;
    if (method !== "GET" && method !== "POST" && method !== "PUT" && method !== "DELETE") {
        console.error("invalid method");
        return false;
    }
    let headers:any = {}
    if (cookies.get("token")) headers = {
        Authorization: "Bearer "+ cookies.get("token")
    }
    try {
        let response;
        if (method === "GET") {
            response = await fetch(addQueryParam(url, 'dev', DEV?"true":"false"), {
                cache: 'no-cache',
                headers: headers
            });
        } else {
            response = await fetch(url, {
                method: method, // *GET, POST, PUT, DELETE, etc.
                cache: 'no-cache',
                // mode: 'no-cors',
                headers: {
                    ...headers,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({...params, dev:DEV?"true":"false"}) // body data type must match "Content-Type" header
            });
        }
        const data = await response.json();
        if (!response.ok) {
            return Promise.resolve(JSON.stringify(data));
        }
        return Promise.resolve(JSON.stringify(data));
    } catch (error) {
        console.error(error);
        return Promise.reject(JSON.stringify(error));
    }
}

export {httpReq, baseURL};
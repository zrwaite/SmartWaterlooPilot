import cookies from "../../modules/cookies"
const baseURL = "https://smart-waterloo-region.herokuapp.com";
// const baseURL = "https://bet-retrieve-transfers-continue.trycloudflare.com";

const httpReq = async (url:string, method:string = "GET", params:any = {}) => {
    url = baseURL + url;
    if (method !== "GET" && method !== "POST" && method !== "PUT" && method !== "DELETE") {
        console.error("invalid method");
        return false;
    }
    let headers = {}
    if (cookies.get("token")) headers = {Authorization: "Bearer "+ cookies.get("token")}
    try {
        let response;
        if (method === "GET") {
            response = await fetch(url, {
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
                body: JSON.stringify(params) // body data type must match "Content-Type" header
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
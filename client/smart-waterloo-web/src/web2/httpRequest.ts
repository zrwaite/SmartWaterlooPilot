const baseURL = "localhost:8006";

const httpReq = async (url:string, method:string = "GET", params:any = {}) => {
    url = baseURL + url;
    if (method !== "GET" && method !== "POST" && method !== "PUT" && method !== "DELETE") {
        console.error("invalid method");
        return false;
    }
    try {
        let response;
        if (method === "GET") {
            response = await fetch(url, {cache: 'no-cache'});
        } else {
            response = await fetch(url, {
                method: method, // *GET, POST, PUT, DELETE, etc.
                cache: 'no-cache',
                // mode: 'same-origin',
                headers: {
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
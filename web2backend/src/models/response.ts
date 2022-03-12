class response {
    success: boolean;
    status: number;
    errors: string[];
    response: object;
    auth: object;
    constructor(status=400, errors=[], response={}, success=false, auth={}) {
        this.success = success;
        this.status = status;
        this.auth = auth;
        this.errors = [];
        this.errors.push(...errors);
        this.response = response;
    }
}
interface responseInterface {
    success: boolean;
    status: number;
    errors: string[];
    response: object;
}

export {responseInterface, response}
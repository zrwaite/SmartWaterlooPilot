const getParams = async (req:any, params:string[], type:string) =>{
	let success = true;
	let undefinedParams: string[] = [];
	let allParams: any[] = [];
	params.forEach((param) => {
		if (req[type][param]==undefined) {
			success = false;	
			undefinedParams.push(param);
		} 
		allParams.push(req[type][param]);
	});
	return {success: success, params: allParams, errors: undefinedParams};
}

const getBodyParams = async (req:any, params:string[]) =>{
	return getParams(req, params, "body");
};

const getQueryParams = async (req:any, params:string[]) =>{
	return getParams(req, params, "query");
};

export {getBodyParams, getQueryParams}
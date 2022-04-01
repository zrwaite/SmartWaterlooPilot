const getParams = (obj:any, params: readonly string[]) => {
	let success = true;
	let undefinedParams: string[] = [];
	let allParams: any[] = [];
	params.forEach((param) => {
		if (obj[param]==undefined) {
			success = false;	
			undefinedParams.push(param);
		} 
		allParams.push(obj[param]);
	});
	return {success: success, params: allParams, errors: undefinedParams};
}
const getBodyParams = (req:any, params: readonly string[]) =>{
	return getParams(req['body'], params);
};

const getQueryParams = (req:any, params: readonly string[]) =>{
	return getParams(req['query'], params);
};

export {getBodyParams, getQueryParams, getParams}
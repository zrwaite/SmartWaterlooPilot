import pool from "../database/db";

const updateOrgVerification = async (businessNumber: string) => {
	let result;
	let status = 400;
	try {
		result = await pool.query(
			"UPDATE orgs SET verified='1' WHERE business_number = $1",
			[businessNumber]
		);
		if (result && result.rowCount) status = 201;
		else status = 404;
	} catch (e) {
		status = 400;
		console.log(e);
	}
	return {status: status, result: result};
}

export {updateOrgVerification}
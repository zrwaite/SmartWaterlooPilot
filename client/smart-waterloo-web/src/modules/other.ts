const looseIncludes = (array: any[], value: any) => {
	for (let i = 0; i < array.length; i++) {
		if (array[i] == value) return true;
	}
	return false;
};

const isUrl = (maybeUrl: string) => {
	let url;
	try {
		url = new URL(maybeUrl);
	} catch (_) {
		return false;
	}

	return url.protocol === "http:" || url.protocol === "https:";
};

export {looseIncludes, isUrl};

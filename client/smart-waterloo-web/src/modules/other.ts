const looseIncludes = (array: any[], value: any) => {
	for (let i=0; i<array.length; i++) {
		if (array[i]==value) return true;
	}
	return false;
}

export {looseIncludes}
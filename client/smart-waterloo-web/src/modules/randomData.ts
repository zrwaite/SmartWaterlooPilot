const randomString = () => {
    let result           = '';
    let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for ( let i = 0; i < 8; i++ ) {
      	result += characters.charAt(Math.floor(Math.random() * characters.length));
   	}
   	return result;
}

export {randomString}
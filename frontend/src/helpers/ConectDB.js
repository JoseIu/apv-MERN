const conectDB = async (endpoint, method, content = null) => {
	const url = `${import.meta.env.VITE_BACKED_URL}/api/${endpoint}`;
	const requestOptions = {
		method,
		headers: { 'Content-Type': 'application/json' }
	};

	if (method === 'POST' && content) {
		requestOptions.body = JSON.stringify(content);
	}

	const req = await fetch(url, requestOptions);
	const data = await req.json();
	return data;
};
export default conectDB;

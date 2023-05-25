const conectDB = async (endpoint, method, content = null, token = null) => {
	const url = `${import.meta.env.VITE_BACKED_URL}/api/${endpoint}`;
	const requestOptions = {
		method,
		headers: { 'Content-Type': 'application/json' }
	};
	if (token) {
		requestOptions.headers.Authorization = `Bearer ${token}`;
	}
	if ((method === 'POST' || 'PUT') && content) {
		requestOptions.body = JSON.stringify(content);
	}
	console.log(content);
	const req = await fetch(url, requestOptions);
	const data = await req.json();
	return data;
};
export default conectDB;

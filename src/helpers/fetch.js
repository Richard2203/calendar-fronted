const baseURl = process.env.REACT_APP_API_URL;

const fetchSinToken = (endpoint, data, method = 'GET') => {
	const url = `${baseURl}/${endpoint}`;

	if (method === 'GET') return fetch(url);
	else
		return fetch(url, {
			method,
			// estableciendo de que tipo de dato va a recibir
			headers: { 'Content-type': 'application/json' },
			// enviando datos mediante el body
			body: JSON.stringify(data),
		});
};

const fetchConToken = (endpoint, data, method = 'GET') => {
	const url = `${baseURl}/${endpoint}`;
	const token = localStorage.getItem('token') || '';

	if (method === 'GET')
		return fetch(url, {
			method,
			// estableciendo de que tipo de dato va a recibir
			headers: { 'x-token': token },
		});
	else
		return fetch(url, {
			method,
			// estableciendo de que tipo de dato va a recibir
			headers: { 'Content-type': 'application/json', 'x-token': token },
			// enviando datos mediante el body
			body: JSON.stringify(data),
		});
};

export { fetchSinToken, fetchConToken };

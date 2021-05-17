async function send({ data, method, token }) {
	const opts = { method, headers: {} };

	if (data) {
		opts.headers['Content-Type'] = 'application/json';
		opts.body = data;
	}

	if (token) {
		opts.headers['Authorization'] = `Bearer ${token.token}`;
	}

	opts.headers['Notion-Version'] = '2021-05-13';

	// console.log('Headers:', opts);

	// return await buildQuery;
	return fetch(
		'https://thingproxy.freeboard.io/fetch/https://api.notion.com/v1/' + `${token.params}`,
		opts
	)
		.then((r) => r.text())
		.then((json) => {
			try {
				return JSON.parse(json);
			} catch (err) {
				return json;
			}
		});
}

export function get(token) {
	return send({ method: 'GET', token });
}

export function del(token) {
	return send({ method: 'DELETE', token });
}

export function post(data, token) {
	return send({ method: 'POST', data, token });
}

export function put(data, token) {
	return send({ method: 'PUT', data, token });
}

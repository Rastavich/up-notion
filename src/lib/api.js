async function send({ data, method, token, url }) {
	const opts = { method, headers: {} };

	if (data) {
		opts.headers['Content-Type'] = 'application/json';
		opts.body = data;
	}

	if (token) {
		opts.headers['Authorization'] = `Bearer ${token.token}`;
	}

	if (url == 'https://thingproxy.freeboard.io/fetch/https://api.notion.com/v1/') {
		opts.headers['Notion-Version'] = '2021-05-13';
	}

	console.log('Headers:', opts, 'URL: ', url, 'Token: ', token);

	// return await buildQuery;
	return fetch(
		url + `${token.params}`,
		// 'https://thingproxy.freeboard.io/fetch/https://api.notion.com/v1/' + `${token.params}`,
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

export function get(token, url) {
	return send({ method: 'GET', token, url });
}

export function del(token, url) {
	return send({ method: 'DELETE', token, url });
}

export function post(data, token, url) {
	return send({ method: 'POST', data, token, url });
}

export function put(data, token, url) {
	return send({ method: 'PUT', data, token, url });
}

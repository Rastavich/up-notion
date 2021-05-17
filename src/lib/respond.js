export function respond(body) {
	if (body.errors) {
		return { status: 401, body };
	}

	return {
		body
	};
}

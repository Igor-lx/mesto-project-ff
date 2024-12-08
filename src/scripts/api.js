const configApi = {
	baseUrl: 'https://nomoreparties.co/v1/wff-cohort-28',
	headers: {
		authorization: '4539d8f5-d367-42ca-b41c-d2390bc8734d',
		'Content-Type': 'application/json',
	},
}

function getResponse(responseObject) {
	if (responseObject.ok) {
			return responseObject.json();
	}
	return Promise.reject(`Ошибка ${responseObject.status}`);
}

 function getUserData() {
	return fetch(`${configApi.baseUrl}/users/me`, {
			headers: configApi.headers,
	}).then(getResponse);
}

export { getUserData };
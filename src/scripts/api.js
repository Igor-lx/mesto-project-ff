/* CONFIG TEMPLATE
const configApi = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-28",
  headers: {
    authorization: "4539d8f5-d367-42ca-b41c-d2390bc8734d",
    "Content-Type": "application/json",
  },
};
*/

function getResponse(responseObject) {
  if (responseObject.ok) {
    return responseObject.json();
  }
  return Promise.reject(`Ошибка ${responseObject.status}`);
}

function getUserData(config) {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then(getResponse);
}

function getInitialCards(config) {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then(getResponse);
}

function editUserData(userName, userJob, config) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: userName,
      about: userJob,
    }),
  }).then(getResponse);
}

export { getUserData, getInitialCards, editUserData };

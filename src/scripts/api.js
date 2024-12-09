/* CONFIG TEMPLATE
const configAPI = {
  baseUrl: "https://",
  userDataEndpoint: "/...",
  userAvatarEndpoint: "/...",
  cardsEndpoint: "/...",
  likesEndpoint: "/...",
  headers: {
    authorization: "",
    "Content-Type": "",
  },
};
*/

function getResponse(responseObject) {
  if (responseObject.ok) {
    return responseObject.json();
  }
  return Promise.reject(`Ошибка ${responseObject.status}`);
}
/* ---------------------------------------------------- */

function getUserData(config) {
  return fetch(`${config.baseUrl}${config.userDataEndpoint}`, {
    headers: config.headers,
  }).then(getResponse);
}

function getInitialCards(config) {
  return fetch(`${config.baseUrl}${config.cardsEndpoint}`, {
    headers: config.headers,
  }).then(getResponse);
}

function editUserData(userDataArray, config) {
  return fetch(`${config.baseUrl}${config.userDataEndpoint}`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify(userDataArray),
  }).then(getResponse);
}

function addNewplace(newplaceDataArray, config) {
  return fetch(`${config.baseUrl}${config.cardsEndpoint}`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify(newplaceDataArray),
  }).then(getResponse);
}

function deleteNewplace(cardId, config) {
  return fetch(`${config.baseUrl}${config.cardsEndpoint}/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(getResponse);
}

function toggleLike(cardId, isLiked, config) {
  const APImethod = isLiked ? "DELETE" : "PUT";
  return fetch(`${config.baseUrl}${config.likesEndpoint}${cardId}`, {
    method: APImethod,
    headers: config.headers,
  }).then(getResponse);
}

function editAvatar(avatarUrl, config) {
  return fetch(`${config.baseUrl}${config.userAvatarEndpoint}`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({ avatar: avatarUrl }),
  }).then(getResponse);
}

export {
  getUserData,
  getInitialCards,
  editUserData,
  editAvatar,
  addNewplace,
  deleteNewplace,
  toggleLike,
};

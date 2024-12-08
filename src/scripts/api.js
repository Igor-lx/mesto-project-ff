/* CONFIG TEMPLATE
const configApi = {
  baseUrl: "https://...",
  headers: {
    authorization: "",
    "Content-Type": "",
  },
  userEndpoint: "/...",
  cardsEndpoint: "/...",
  likesEndpoint: "/.../"
};
*/

function getResponse(responseObject) {
  if (responseObject.ok) {
    return responseObject.json();
  }
  return Promise.reject(`Ошибка ${responseObject.status}`);
}
/* ---------------------------------------------------- */
/* ---------------------------------------------------- */

function getUserData(config) {
  return fetch(`${config.baseUrl}${config.userEndpoint}`, {
    headers: config.headers,
  }).then(getResponse);
}

function getInitialCards(config) {
  return fetch(`${config.baseUrl}${config.cardsEndpoint}`, {
    headers: config.headers,
  }).then(getResponse);
}

function editUserData(userDataArray, config) {
  return fetch(`${config.baseUrl}${config.userEndpoint}`, {
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
/*
function toggleLike(cardId, isLiked, config) {
  const APImethod = isLiked ? "DELETE" : "PUT";
  return fetch(`${config.baseUrl}${config.likesEndpoint}${cardId}`, {
    method: APImethod,
    headers: config.headers,
  }).then(getResponse);
}
*/

export { getUserData, getInitialCards, editUserData, addNewplace };

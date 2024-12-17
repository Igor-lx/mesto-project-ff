//

export function validateFileType(apiFunc, url, headerName, pattern) {
  return apiFunc(url).then((response) => {
    if (!response.ok) {
      throw new Error(`Ошибка: ${response.status}`);
    }

    const headerValue = response.headers.get(headerName);
    if (!headerValue) {
      throw new Error(`Заголовок "${headerName}" отсутствует в ответе.`);
    }

    if (!headerValue.startsWith(pattern)) {
      throw new Error(
        `Недопустимое значение заголовка "${headerName}": ${headerValue}`
      );
    }

    return url; // Если всё ок -  возвращаем валидный URL
  });
}

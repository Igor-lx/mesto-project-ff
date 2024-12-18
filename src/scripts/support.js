//

export function switchModal(from, to, openFunc, closeFunc) {
  closeFunc(from);
  openFunc(to);
}

export function clearObjectValues(object) {
  Object.keys(object).forEach((key) => {
    object[key] = null;
  });
}

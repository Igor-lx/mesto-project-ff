//

export function switchModal(from, to, openFunc, closeFunc) {
  closeFunc(from);
  openFunc(to);
}

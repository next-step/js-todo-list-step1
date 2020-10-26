export const action = {
  publish: (actor, type, payload) => {
    document.dispatchEvent(
      new CustomEvent(`${actor}-${type}`, {
        detail: payload,
      })
    );
  },
  subscribe: (actor, type, listener) => {
    document.addEventListener(`${actor}-${type}`, listener);
  },
};

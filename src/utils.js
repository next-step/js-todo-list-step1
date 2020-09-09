export const addEventBubblingListener = ($target, action, className, callback) => {
    $target.addEventListener(action, event => {
        const { target } = event;
        const index = target?.closest('[data-index]')?.dataset?.index;
        target.classList.contains(className) && callback({ index, event });
    });
};

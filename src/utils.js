export const addEventBubblingListener = ($target, action, className, callback) => {
    $target.addEventListener(action, event => {
        const { target } = event;
        const index = target?.parentNode?.dataset?.index;
        target.classList.contains(className) && callback({ index, event });
    });
};

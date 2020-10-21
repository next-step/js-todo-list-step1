function qs(selector, scope) {
    return (scope || document).querySelector(selector);
};
function qsa(selector, scope) {
    return (scope || document).querySelectorAll(selector);
};

export { qs, qsa }
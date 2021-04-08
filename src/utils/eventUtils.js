export function convertId(event) {
    return findClosest(event).querySelector("#item-id").value;
}

export function getClassName(event) {
  return event.target.className;
}

export function checkClassName(event, name) {
    return getClassName(event) === name;
}

export function checkClosestClassName(event, name) {
    return findClosest(event).className === name;
}

export function checkKey(event, key) {
    return event.key === key;
}

export function hasClosest(event) {
    return findClosest(event) !== null;
}

export function findClosest(event) {
    return event.target.closest("li");
}
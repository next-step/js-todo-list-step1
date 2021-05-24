/* 
* Event 관련 함수들을 관리
*/

export function convertId(event) {
    return parseInt(findClosest(event).querySelector("#item-id").value);
}

export function getClassName(event) {
  return event.target.className;
}

export function getValue(event) {
  return event.target.value;
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
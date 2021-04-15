/* 
* localStorage의 Serialize를 관리
*/

export function getElement(name) {
    return JSON.parse(localStorage.getItem(name));
}

export function setElement(name, value) {
    localStorage.setItem(name, JSON.stringify(value));
}

export function hasElement(name) {
    return localStorage.getItem(name) !== null || localStorage.getItem(name) === "[]";
}
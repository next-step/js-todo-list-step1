import { MESSAGE, TYPE } from "./constant.js"

export const checkTarget = ($target) => {
    if(!$target instanceof HTMLElement) {
        throw new TypeError(`${$target} : ${MESSAGE.INVALID_HTML_ELEMENT}`)
    }
}

export const checkType = (target, type) => {
    if(typeof target != type) {
        throw new TypeError(`${target} : ${MESSAGE.INVALID_TYPE} - ${type}`)
    }
}

export const checkInstance = (target, instance) => {
    if(!target instanceof instance) {
        throw new TypeError(`${target} : ${MESSAGE.INVALID_INSTANCE} - ${instance}`)
    }
}

export const checkFunction = (func) => {
    if(!func || checkType(func, TYPE.FUNCTION)) {
        throw new TypeError(`${func} : ${MESSAGE.INVALID_TYPE}`)
    }
}

export const checkArray = (target) => {
    if(!Array.isArray(target)) {
        throw new TypeError(`${target} : ${MESSAGE.INVALID_TYPE}`)
    }
}

export const checkString = (...target) => {
    checkArray(target)
    target.forEach(each => checkType(each, TYPE.STRING))
}
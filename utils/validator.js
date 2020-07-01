import { errorMessageMap } from "./constants.js";

export const validator = {
  isNewInstance(it, targetInstance) {
    if (!(it instanceof targetInstance)) {
      throw new Error(errorMessageMap.SHOuLD_BE_CREATED_BY_NEW);
    }
    return true;
  },
  isObject(it) {
    if (typeof it !== "object") {
      throw new Error(errorMessageMap.SHOULD_BE_OBJECT);
    }
    return true;
  },
  isElement(it) {
    if (!(it instanceof Element)) {
      throw new Error(errorMessageMap.SHOULD_BE_ELEMENT);
    }
    return true;
  },
  isArray(it) {
    if (!(it instanceof Array)) {
      throw new Error(errorMessageMap.SHOULD_BE_ARRAY);
    }
    return true;
  },
  isBoolean(it) {
    if (typeof it !== "boolean") {
      throw new Error(errorMessageMap.SHOULD_BE_BOOLEAN);
    }
    return true;
  },
  isString(it) {
    if (typeof it !== "string") {
      throw new Error(errorMessageMap.SHOULD_BE_STRING);
    }
    return true;
  },
  isNotZeroLengthString(it) {
    if (it.length === 0) {
      throw new Error(errorMessageMap.SHOULD_NOT_BE_ZERO_LENGTH);
    }
    return true;
  },
  isFunction(it) {
    if (typeof it !== "function") {
      throw new Error(errorMessageMap.NOT_FUNCTION);
    }
    return true;
  },
};

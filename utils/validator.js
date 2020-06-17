export const validator = {
  isNewInstance(it, targetInstance) {
    if (!(it instanceof targetInstance)) {
      throw new Error("It Should be created by new");
    }
    return true;
  },
  isObject(it) {
    if (typeof it !== "object") {
      throw new Error("It Should be object type");
    }
    return true;
  },
  isElement(it) {
    if (!(it instanceof Element)) {
      throw new Error("It Should be Element");
    }
    return true;
  },
  isArray(it) {
    if (!(it instanceof Array)) {
      throw new Error("It Should be Array");
    }
    return true;
  },
  isBoolean(it) {
    if (typeof it !== "boolean") {
      throw new Error("It Should be Boolean");
    }
    return true;
  },
  isString(it) {
    if (typeof it !== "string") {
      throw new Error("It Should be string");
    }
    return true;
  },
  isNotZeroLengthString(it) {
    if (it.length === 0) {
      throw new Error("It Should not be 0 length");
    }
    return true;
  },
};

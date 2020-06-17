function TodoList(params) {
  if (!(this instanceof TodoList)) {
    throw new Error("It Should be created by new");
  }

  if (typeof params !== "object") {
    throw new Error("It Should be object type");
  }

  const { $target, data } = params;

  if (!($target instanceof Element)) {
    throw new Error("It Should be Element");
  } else if (!(data instanceof Array)) {
    throw new Error("It Should be Array");
  }

  data.forEach((todo) => {
    if (typeof todo.content !== "string") {
      throw new Error("It Should be string");
    } else if (todo.content.length === 0) {
      throw new Error("It Should not be 0 length");
    } else if (typeof todo.isCompleted !== "boolean") {
      throw new Error("It Should be Boolean");
    }
  });
}

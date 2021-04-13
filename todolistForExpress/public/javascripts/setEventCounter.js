let counter = (status) => {
  let count = 0;
  if (status === "all") {
    if (localStorage.getItem("TODO") !== "") {
      count += localStorage.getItem("TODO").split(",").length;
    }
    if (localStorage.getItem("DONE") !== "") {
      count += localStorage.getItem("DONE").split(",").length;
    }
  }
  if (status === "active") {
    if (localStorage.getItem("TODO") !== "") {
      count += localStorage.getItem("TODO").split(",").length;
    }
  }
  if (status === "completed") {
    if (localStorage.getItem("DONE") !== "") {
      count += localStorage.getItem("DONE").split(",").length;
    }
  }

  let countElement = document.querySelector(".todo-count");
  countElement.children[0].textContent = count;
};

export default counter;

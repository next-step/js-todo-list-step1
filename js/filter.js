import { listItems, allBtn, activeBtn, completedBtn } from "./selectElement.js";

allBtn.addEventListener("click", () => {
  listItems.forEach((listItem) => {
    listItem.removeAttribute("style");
  });
});

activeBtn.addEventListener("click", () => {
  listItems.forEach((listItem) => {
    if (listItem.classList[0] === "completed") {
      listItem.setAttribute("style", "display: none;");
    } else {
      listItem.removeAttribute("style");
    }
  });
});

completedBtn.addEventListener("click", () => {
  listItems.forEach((listItem) => {
    if (!listItem.classList[0]) {
      listItem.setAttribute("style", "display: none;");
    } else {
      listItem.removeAttribute("style");
    }
  });
});

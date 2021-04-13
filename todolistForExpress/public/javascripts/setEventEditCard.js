let editEvent = () => {
  let cards = document.querySelectorAll(".todo-list > li");
  // cards[0].children[0].children[1];
  cards.forEach((card) => {
    card.children[1].addEventListener("dblcick", function () {
      card[1].classList.toggle("editing");
    });
  });
};

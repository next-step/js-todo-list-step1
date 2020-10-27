window.onload = () => {
	const app = new TodoApp();

	const all = document.querySelector(".all");
	addBubblingEvent("click", all, function(e) {
		app.renderAsState("all");
	});

	const active = document.querySelector(".active");
	addBubblingEvent("click", active, function(e) {
		app.renderAsState("active");
	});

	const completed = document.querySelector(".completed");
	addBubblingEvent("click", completed, function(e) {
		app.renderAsState("completed");
	});
};
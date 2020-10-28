window.onload = () => {
	const app = new TodoApp();

	const all = document.querySelector(".filters a.all");
	addBubblingEvent("click", all, function(e) {
		selectFilter("all");

		app.renderAsState("all");
	});

	const active = document.querySelector(".filters a.active");
	addBubblingEvent("click", active, function(e) {
		selectFilter("active");

		app.renderAsState("active");
	});

	const completed = document.querySelector(".filters a.completed");
	addBubblingEvent("click", completed, function(e) {
		selectFilter("completed");

		app.renderAsState("completed");
	});

	const filters = document.querySelector(".filters");

	function selectFilter(filter) {
		objectForEach(filters.children, item => {
			if(typeof item === "object") {
				if(item.children[0].classList[0] == filter) {
					item.children[0].classList.add("selected");

					return;
				};

				item.children[0].classList.remove("selected");
			};
		});
	};
};
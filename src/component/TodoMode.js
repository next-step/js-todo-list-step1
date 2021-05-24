function TodoMode({ target, onChangeMode }) {
	const refineMode = (mode) => {
		const [result] = mode.split("selected");
		return result;
	};

	const selectedMode = (mode) => {
		const aList = Array.from(target.querySelectorAll("a"));
		aList.forEach((a) => {
			if (a.classList.contains(mode) && !a.classList.contains("selected")) {
				a.classList.add("selected");
			} else if (!a.classList.contains(mode) && a.classList.contains("selected")) {
				a.classList.remove("selected");
			}
		});
	};

	target.addEventListener("click", (e) => {
		if (e.target.tagName === "UL") {
			return;
		}
		let target;
		if (e.target.tagName === "LI") {
			target = e.target.querySelector("a");
		} else if (e.target.tagName === "A") {
			target = e.target.getAttribute("class");
		}

		const refinedMode = refineMode(target);
		onChangeMode(refinedMode);
		selectedMode(refinedMode);
	});
}

export default TodoMode;

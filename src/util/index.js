export const $ = function (query, target = document) {
	const selectAll = target.querySelectorAll(query);

	return selectAll.length > 1 ? [...selectAll] : target.querySelector(query);
};

const isElement = function (el) {
	return obj instanceof HTMLElement;
};

export const removeClass = (el, className) => {
	el.classList.remove(className);
};

export const addClass = (el, className) => {
	el.classList.add(className);
};

export const hasClass = (el, className) => {
	el.classList.contains(className);
};

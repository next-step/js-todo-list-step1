import { options } from '../constants/contants.js';

const getFilter = (option) => {
  return options
    .map(
      ({ type, value }) =>
        `<li>
      <a
        class="${type} ${option === type && 'selected'}"
        href="#"
        data-type="${type}"
      >
        ${value}
      </a>
    </li>`
    )
    .join('');
};

export default getFilter;

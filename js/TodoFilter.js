export default function TodoFilter(props) {
    const {
        $target,
        filter,
        handleFilter: onFilter
    } = props;

    console.log(filter);

    $target.addEventListener(
        "click",
        (e) => {
            onFilter(e.target.className);
            const $aes = $target.querySelectorAll("li a");
            for (let $a of $aes) {
                $a.classList.remove("selected");
            }
            e.target.classList.toggle("selected");
        }
    );
};
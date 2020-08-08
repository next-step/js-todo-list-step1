export default function TodoInput(props) {
    const {
        $target,
        onKeydown,
    } = props;

    $target.addEventListener(
        "keydown",
        (e) => {
            if (e.key === "Enter" && $target.value) {
                onKeydown($target.value);
                $target.value = "";
            }
        }
    );
};
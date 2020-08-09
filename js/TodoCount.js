export default function TodoCount(props) {
    const {$target} = props;
    let count = props.count || 0;

    this.setState = (newCount) => {
        count = newCount;
    };

    this.render = () => {
        $target.innerHTML = `총 ${count}개`;
    };

    this.render();
};
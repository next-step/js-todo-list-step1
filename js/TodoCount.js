export default function TodoCount(props) {
    const {$target} = props;
    this.count = props.count || 0;

    this.setState = (count) => {
        this.count = count;
    };

    this.render = () => {
        $target.innerHTML = `총 ${this.count}개`;
    };

    this.render();
};
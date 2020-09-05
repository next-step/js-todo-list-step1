class Filters {
    $target;
    props;

    constructor (target, props) {
        this.$target = target;
        this.props = props;
        this.setEvent();
    }

    clickFilter = ({ target }) => {
        const { classList } = target;
        const { $target } = this;

        if (classList.contains('selected')) return;

        $target.querySelector('.selected').classList.remove('selected');
        this.props.setFilter(classList[0]);
        classList.add('selected');
    };

    setEvent() {
        const { $target, clickFilter } = this;

        $target.addEventListener('click', clickFilter)
    }
}

export default Filters;
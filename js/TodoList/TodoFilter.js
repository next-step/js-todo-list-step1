class TodoFilter {
    constructor (parent) {
        this.$TodoFilters = document.querySelector('.filters')
        window.addEventListener('hashchange', (e) => {
            const status = /#(.*)$/g.exec(e.newURL)[1]
            this.changeSelected(status)
            parent.changeStatus(status)
        })
    }
    changeSelected (status) {
        const selected = document.querySelector('.selected')
        selected.className = selected.className.replace(' selected', '')

        switch(status) {
            case 'active':
                const active = document.querySelector('.active')
                active.className = active.className + ' selected'
                break;
            case 'completed':
                const completed = document.querySelector('.completed')
                completed.className = completed.className + ' selected'
                break;
            default:
                const all = document.querySelector('.all')
                all.className = all.className + ' selected'
                break;
        }
    }
}
export { TodoFilter }
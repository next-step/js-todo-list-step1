const filterItem = (hash) => {
    return `
    <li>
        <a class="all${(hash === 'all' ? ' selected' : '')}" href="/#">전체보기</a>
    </li>
    <li>
        <a class="active${(hash === 'active' ? ' selected' : '')}" href="#active">해야할 일</a>
    </li>
    <li>
        <a class="completed${(hash === 'completed' ? ' selected' : '')}" href="#completed">완료한 일</a>
    </li>
    `
}
export default filterItem;
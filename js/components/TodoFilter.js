const TodoFilter = (filter) => `
	<li>
		<a class="all${filter === 'all' ? ' selected' : ''}" href="/#">전체보기</a>
	</li>
	<li>
		<a class="active${filter === 'active' ? ' selected' : ''}" href="#active">해야할 일</a>
	</li>
	<li>
	  	<a class="completed${filter === 'completed' ? ' selected' : ''}" href="#completed">완료한 일</a>
	</li>
`;

export default TodoFilter;
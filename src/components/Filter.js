import Component from "../core/component.js";

class Filter extends Component{
    setup(){
        this.$state = this.$props.$state;
    }

    template(){
        const mode = this.$state.Filtermode;
        const totalNum = ((mode)=>{
            if(mode==0){
                return this.$state.List.length;
            }else if(mode==1){
                return this.$state.List.filter(item => item.activate!=true).length;
            }else{
                return this.$state.List.filter(item => item.activate!=false).length;
            }
        })(mode)
        return `
        <span class="todo-count">총 <strong>${totalNum}</strong> 개</span>
        <ul class="filters">
          <li>
            <a class="all ${mode==0?"selected":""}" id="0" href="#">전체보기</a>
          </li>
          <li>
            <a class="active ${mode==1?"selected":""}" id="1" href="#active">해야할 일</a>
          </li>
          <li>
            <a class="completed ${mode==2?"selected":""}" id="2" href="#completed">완료한 일</a>
          </li>
        </ul>
        `
    }
    mounted(){
        const filterBtn = document.querySelectorAll('.filters > li > a');
        filterBtn.forEach(element =>{
            element.addEventListener('click',(e)=>{
                this.$props.onFilterTodo(e.target.id);
            })
        });
    }
}

export default Filter;
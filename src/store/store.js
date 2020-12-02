import PubSub from '../lib/pubsub.js';

const Store = class {
    constructor({actions, mutations, state }){
        let $this = this;
        $this.status = 'resting';
        //이벤트 속성에 pubsub 클래스 할당
        $this.events = new PubSub();

        $this.actions = actions;
        $this.mutations = mutations;
        
        //state를 proxy 생성자로 재정의 
        $this.state = new Proxy((state||{}), {
            //set 이라는 트랩
            //set을 이용했을 때 오브젝트의 변화 감지
            set: function(setState, setKey, setValue){ 
                //key로 값 설정
                setState[setKey] = setValue;
                $this.events.publish('stateChange', $this.state);
                if($this.status !== 'mutation') {
                    console.warn(`You should use a mutation to set ${setKey}`);
                }
                $this.status = 'resting';

                return true;
            }
        })
    }
    //dispatch는 action을 불러옴 
    dispatch(actionKey, payload){

        //actionKey로 찾은 action이 함수일 때
        if(typeof this.actions[actionKey] !== 'function'){
            console.error(`Action "${actionKey}" doesn't exist.`);
            return false;
        }
        console.groupCollapsed(`ACTION: ${actionKey}`)
        //status를 action으로 변경 
        this.status = 'action';
        //action key에 맞는 함수를 store와 payload를 받아서 수행 
        this.actions[actionKey](this, payload);
        
        console.groupEnd();//콘솔 그룹 묶은거 풀음

        return true;
    }

    //commit은 mutation을 불러옴
    commit(mutationKey, payload){

        //mutationKey로 찾은 mutation 함수일 때
        if(typeof this.mutations[mutationKey] !== 'function'){
            console.error(`Mutation "${mutationKey}" doesn't exist.`);
            return false;
        }
        //status를 mutation으로 수정
        this.status = 'mutation';
        //newState에 mutationkey에 맞는 함수를 store의 상태와 payload받아서 담아줌
        let newState = this.mutations[mutationKey](this.state, payload);
        //state값 변경
        this.state = Object.assign(this.state, newState);

        return true;
    }
}
export default Store;

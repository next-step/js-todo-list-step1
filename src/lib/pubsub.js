const PubSub = class {
    constructor(){
        this.events = {}//리스트를 담는데 사용
    }
    subscribe(event, callback){
        //이벤트 없으면 빈 배열 세팅
        this.events[event] = this.events[event]||[];
        //콜백함수 푸시
        this.events[event].push(callback);
    }
    publish(event, data){
        //이벤트 있으면 data를 subscribed 하는 것들을 반환
        if(this.events[event]){
            this.events[event].forEach(f =>{
                f(data)
            })
        }
    }
}
export default PubSub;

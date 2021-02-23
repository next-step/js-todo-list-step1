import {initTodos} from './todoelement.js'
import {initFilters} from './filterview.js'


// 웹페이지 로드 시 init() 함수 실행
window.onload = () => init()

function init(){
    initTodos()
    initFilters()
}


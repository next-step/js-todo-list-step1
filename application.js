// 필요 변수, 함수 import
import {initTodos} from './todoelement.js'
import {initFilters} from './filterview.js'


// 웹페이지 로드 시 init() 함수 실행
window.onload = () => init()

// 웹페이지 로드 시 실행되는 함수
function init(){
    initTodos()
    initFilters()
}


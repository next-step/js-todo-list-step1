// 아이디 새로 생성하기 (겹치지 않게)
// 다른 방법 있는지 생각해보기
export function createNewId() {
  const date = new Date();
  const newId =
    date.getFullYear().toString() +
    date.getMonth().toString() +
    date.getDay().toString() +
    date.getHours().toString() +
    date.getMinutes().toString() +
    date.getMilliseconds().toString();
  return newId;
}

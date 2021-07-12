export function $(selector) {
    return document.querySelector(selector);
}
export function checklength(item) {
    if (item.length === 0) {
      return alert("아이템 내용을 입력해주세요");
    } else {}
}

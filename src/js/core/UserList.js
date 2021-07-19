const getUserList = async () => {
  const BASE_URL = 'https://js-todo-list-9ca3a.df.r.appspot.com';
  try {
    const res = await fetch(`${BASE_URL}/api/users`);
    if (res.ok) {
      // console.log('응답 josn', res.json());
      return await res.json();
    } else {
      return null;
    }
  } catch (e) {
    throw new Error(`오류가 생겼습니다 ${e.message}`);
  }
};
export default getUserList;

const getUserData = async (userId) => {
  const BASE_URL = 'https://js-todo-list-9ca3a.df.r.appspot.com';
  try {
    const res = await fetch(`${BASE_URL}/api/users/:userId`);
    if (res.ok) {
      console.log('유저만의데이터', res);
      return await res.json();
    } else {
      return null;
    }
  } catch (e) {
    throw new Error(`오류가 생겼습니다 ${e.message}`);
  }
};
export default getUserData;

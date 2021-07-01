export default (type, payload = {}) => ({
  type,
  payload: { ...payload },
});

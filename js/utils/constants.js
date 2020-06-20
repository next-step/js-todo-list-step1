export const exData = [
  {
    id: 1,
    text: 'JS 공부하기',
    isCompleted: false,
  },
  {
    id: 2,
    text: 'JS 복습하기',
    isCompleted: true,
  },
];

export const STORAGE_NAME = 'MY_TODO'

export const FILTER_NAME = {
  ALL: 'all',
  ACTIVE: 'active',
  COMPLETED: 'completed',
};

export const KEY_NAME = {
  ESC: 'Escape',
  ENTER: 'Enter',
};

export const METHOD_NAME = {
  GET: 'GET',
  SET: 'SET',
  REMOVE: 'REMOVE'
};

export const ERROR_TYPE = {
  NO_MATCH_CLASS: '버튼을 정확히 눌러주세요',
  NO_MATCH_FILTER: '필터를 정확히 눌러주세요',
  CAN_NOT_GET_STORAGE: '로컬스토리지를 가져올 수 없습니다',
  CAN_NOT_SET_STORAGE: '로컬스토리지에 저장할 수 없습니다',
};

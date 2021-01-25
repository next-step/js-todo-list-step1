/**
 * @readonly
 * @enum {string}
 */
export const FILTER_NAMES = new Map([
  ["all", "전체보기"],
  ["active", "남은 투두"],
  ["completed", "완료한 투두"]
]);

/**
 * @readonly
 * @enum {"all" | "active" | "completed"}
 */
export const FILTER_ENUM = {
  ALL: "all",
  ACTIVE: "active",
  COMPLETED: "completed"
};

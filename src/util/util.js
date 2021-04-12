export function checkKey(eventKey, key) {
  if (eventKey === key) {
    return true;
  }

  return false;
}

export function getClosestTag(event, tag) {
  return event.target.closest(tag);
}

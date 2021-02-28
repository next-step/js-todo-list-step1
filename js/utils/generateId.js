let idSequence = 0;

export function generateId() {
    return String(idSequence++);
}
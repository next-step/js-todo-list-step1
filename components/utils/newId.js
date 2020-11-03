function newId(prefix='id_') {
    const id = Date.now();
    return `${prefix}${id}`;
}

export default newId;
let lastId = 0;

function newId(prefix='id_') {
    lastId++;
    return `${prefix}${lastId}`;
}

export default newId;
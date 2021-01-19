export default class Storage {
    static getItem (key, defaultItem) {
        const storedItem = localStorage.getItem(key);
        return JSON.parse(storedItem) || defaultItem;
    };

    static setItem (key, item) {
        return localStorage.setItem(key, JSON.stringify(item));
    };
}
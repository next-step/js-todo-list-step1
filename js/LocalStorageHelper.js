'use strict'
const whatType = data => {
    if (typeof data === "string")
        return "string";
    else if (!isNaN(data))
        return "number";
    else
        return "object";
};

class LocalStorageHelper {
    constructor() {
    }

    set = (name, contents, days) => {
        let addDays = days || 1;//default는 하루
        const exdate = new Date();
        exdate.setDate(exdate.getDate() + addDays);
        let info = {};
        info.typeOf = whatType(contents);
        info.contents = info.typeOf === "object" ? JSON.stringify(contents) : contents;
        info.expires = exdate.getTime();

        localStorage.setItem(name, JSON.stringify(info));
    };

    get = name => {
        var item = JSON.parse(localStorage.getItem(name));
        try {
            if (!item) return null;
            if (item.typeOf === "object")
                item.contents = JSON.parse(item.contents);
            return item.contents;
        } catch (e) {
            return item.contents;
        }
    };

    getAll = () => {
        let newList = [];
        this.keys().forEach(key => newList.push(this.get(key)));
        return newList;
    };

    keys = () => (Object.getOwnPropertyNames(localStorage));

    remove = name => {
        if (!!this.get(name))
            localStorage.removeItem(name);
    };
    /**
     * localStorage 전체 삭제 로직 실수로 호출 할 수도 있기 때문에 true 값을 줘야지만 삭제를 수행한다.
     * @param bool
     */
    removeAll = bool => {
        if (bool)
            this.keys().forEach(key => (this.remove(key)));
        else
            throw "If you really want to delete the entire file, give true as a parameter.";
    };

    removeExpiredItems = () => {
        const keys = this.keys();
        const today = new Date().getTime();
        keys.forEach(key => {
            let item = JSON.parse(localStorage.getItem(key));
            let expiredDate = item.expires;
            if (today > expiredDate)
                this.remove(key);
        });
    };
}
const lsg = new LocalStorageHelper();

export default class Section {
    constructor({ items, renderer }, containerSelector) {
        this._items = items;
        this._renderer = renderer;
        this._contrainer = document.querySelector(containerSelector);
    }

    addItem(element) {
        this._contrainer.append(element);
    }

    _clear() {
        this._contrainer.innerHTML = '';
    }

    setItems() {
        this._clear();
        this._items.forEach((item) => {
            this._renderer(item);
        });
    }
}

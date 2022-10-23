export default class Section {
    constructor({ items, renderer }, containerSelector) {
        this._items = items;
        this._renderer = renderer;
        this._conrainer = document.querySelector(containerSelector);
    }

    addItem(element) {
        this._conrainer.prepend(element);
    }

    setItems() {
        this._items.reverse().forEach((item) => {
            this._renderer(item);
        });
    }
}
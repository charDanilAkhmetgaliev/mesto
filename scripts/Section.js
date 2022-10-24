export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._containerSelector = containerSelector;
    this._container = document.querySelector(containerSelector);
  }

  addItem() {

  }

  setItems() {
    // this._items.forEach((item) => {
    //   this._renderer(item);
    // });
  }
}

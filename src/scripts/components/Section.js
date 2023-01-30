export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this.renderItem = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(element) {
    this._container.prepend(element);
  }

  _clear() {
    this._contrainer.innerHTML = '';
  }

  renderItems() {
    this._items.reverse().forEach((item) => {
      this.renderItem(item);
    });
  }
}

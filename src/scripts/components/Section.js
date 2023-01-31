export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items.reverse();
    this.renderItem = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(element) {
    this._container.prepend(element);
  }

  renderItems() {
    this._items.forEach((item) => {
      this.renderItem(item);
    });
  }
}

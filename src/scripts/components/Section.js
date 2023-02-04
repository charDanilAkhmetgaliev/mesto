export default class Section {
  constructor({ renderer }, containerSelector) {
    this.renderItem = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(element) {
    this._container.prepend(element);
  }

  renderItems(cards) {
    cards.forEach((card) => {
      this.renderItem(card);
    });
  }
}

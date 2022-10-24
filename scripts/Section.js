export default class Section {
<<<<<<< HEAD
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
=======
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
>>>>>>> 355b46196a5fc1d72c83ca346c24ae64cbd96105

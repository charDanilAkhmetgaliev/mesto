import { rootContainerSelector,
         elementsListSelector} from '../utils/constants.js';
export default class Section {
  constructor({ renderer }) {
    this._renderItem = renderer;
    this._rootContainer = document.querySelector(rootContainerSelector);
  }

  _addItem(data) {
    const element = this._renderItem(data);
    this._sectionContainer.prepend(element);
  }

  _fillSection(elementsData) {
    elementsData.forEach((elementData) => {
      this._addItem(elementData);
    })
  }

  _renderSection(elementsData) {
    console.log(this._sectionContainer);
    this._fillSection(elementsData);
    this._rootContainer.append(this._sectionContainer);
  }

  _createSection(tagName, className) {
    this._sectionContainer = document.createElement(tagName);
    this._sectionContainer.classList.add(className);
  }

  _removeSection() {
    this._sectionContainer.remove();
  }

  initCardListSection(elementsData) {
    if (this._sectionContainer) {
      this._removeSection()
    };
    this._createSection('ul', elementsListSelector);
    this._renderSection(elementsData);
  }
}

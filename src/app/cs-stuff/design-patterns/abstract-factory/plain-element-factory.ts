import type ElementFactory from './element-factory';

export default class PlainElementFactory implements ElementFactory {
  createText(text: string): Text {
    return document.createTextNode(text);
  }
  createList(): HTMLElement {
    const list = document.createElement('ol');
    list.style.paddingLeft = '1rem';
    list.style.marginTop = '0.25rem';
    return list;
  }
  createListItem(): HTMLElement {
    const item = document.createElement('li');
    return item;
  }
  createLabel(): HTMLElement {
    const label = document.createElement('label');
    label.style.marginLeft = '0.5rem';
    label.style.color = 'gray';
    return label;
  }
}

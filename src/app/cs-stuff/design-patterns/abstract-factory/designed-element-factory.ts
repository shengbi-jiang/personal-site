import type ElementFactory from './element-factory';

export default class DesignedElementFactory implements ElementFactory {
  createText(text: string): Text {
    return document.createTextNode(text);
  }
  createList(): HTMLElement {
    const list = document.createElement('ol');
    list.style.padding = '0.25rem 1rem 0.5rem 1.5rem';
    list.style.backgroundColor = '#fff5df';
    list.style.opacity = '0.8';
    list.style.backgroundImage = `
      linear-gradient(#fce8ae 2px, transparent 2px),
      linear-gradient(90deg, #fce8ae 2px, transparent 2px),
      linear-gradient(#fce8ae 1px, transparent 1px),
      linear-gradient(90deg, #fce8ae 1px, #fff5df 1px)
    `;
    list.style.backgroundSize = '50px 50px, 50px 50px, 10px 10px, 10px 10px';
    list.style.backgroundPosition = `-2px -2px, -2px -2px, -1px -1px, -1px -1px`;
    list.style.border = '1px solid gray';
    list.style.borderRadius = '0.25rem';
    list.style.marginTop = '0.25rem';
    return list;
  }
  createListItem(): HTMLElement {
    const item = document.createElement('li');
    item.style.marginTop = '0.25rem';
    item.style.fontStyle = 'italic';
    return item;
  }
  createLabel(): HTMLElement {
    const label = document.createElement('label');
    label.style.fontSize = '0.75rem';
    label.style.fontStyle = 'normal';
    label.style.background = 'orange';
    label.style.padding = '2px 4px';
    label.style.borderRadius = '4px';
    label.style.marginTop = '0.25rem';
    label.style.marginLeft = '0.5rem';
    return label;
  }
}

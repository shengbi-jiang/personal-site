export default interface ElementFactory {
  createText(text: string): Text;
  createList(): HTMLElement;
  createListItem(): HTMLElement;
  createLabel(): HTMLElement;
}

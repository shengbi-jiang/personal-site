import type ElementFactory from './element-factory';

type ItemData = {
  name: string;
  status: string;
};

export default class TodoListContext {
  private readonly dataList: ItemData[] = [
    { name: 'Buy groceries', status: 'Completed' },
    { name: 'Clean the house', status: 'Completed' },
    { name: 'Practice playing guitar', status: 'Pending' },
  ];

  constructor(private factory: ElementFactory) {}

  updateFactory(factory: ElementFactory) {
    this.factory = factory;
  }

  private createItem = (data: ItemData) => {
    const name = this.factory.createText(data.name);
    const status = this.factory.createText(data.status);
    const item = this.factory.createListItem();
    const label = this.factory.createLabel();
    label.appendChild(status);
    item.appendChild(name);
    item.appendChild(label);
    return item;
  };

  createElement() {
    const list = this.factory.createList();
    const items = this.dataList.map(this.createItem);
    list.append(...items);
    return list;
  }
}

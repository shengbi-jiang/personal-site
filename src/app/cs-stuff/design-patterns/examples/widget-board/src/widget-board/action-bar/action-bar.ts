import { WidgetType } from '../../widgets/widget-factory';

type WidgetOption = { name: string; type: WidgetType };
type AddWidgetEventHandler = (widgetType: WidgetType) => void;
type CancelEventHandler = () => void;

export default class ActionBar {
  private static readonly widgetOptions: WidgetOption[] = [
    { name: 'Clock', type: WidgetType.Clock },
    { name: 'Stopwatch', type: WidgetType.Stopwatch },
    { name: 'Reminder', type: WidgetType.Reminder },
    { name: 'Picture', type: WidgetType.Picture },
    { name: 'Color', type: WidgetType.Color },
  ];

  private readonly divContainer = document.createElement('div');
  private readonly btnAdd = document.createElement('button');
  private readonly sltWidgetType = document.createElement('select');
  private readonly divSpacing = document.createElement('div');
  private readonly spanDescription = document.createElement('span');
  private readonly btnCancel = document.createElement('button');

  private addWidgetEventHandler: AddWidgetEventHandler | null = null;
  private cancelEventHandler: CancelEventHandler | null = null;

  public constructor() {
    this.style();
    this.btnAdd.textContent = 'Add';
    this.btnAdd.addEventListener('click', this.handleBtnAddClick);
    this.sltWidgetType.append(...this.createOptions());
    this.btnCancel.textContent = 'Cancel';
    this.divContainer.append(
      this.sltWidgetType,
      this.btnAdd,
      this.divSpacing,
      this.spanDescription,
      this.btnCancel
    );
  }

  private createOptions(): HTMLOptionElement[] {
    return ActionBar.widgetOptions.map((item) => {
      const option = document.createElement('option');
      option.textContent = item.name;
      option.value = item.name;
      return option;
    });
  }

  private style() {
    this.divContainer.style.display = 'flex';
    this.divContainer.style.background = 'lightgray';
    this.divContainer.style.padding = '4px';
    this.divContainer.style.alignItems = 'center';
    this.sltWidgetType.style.marginRight = '4px';
    this.divSpacing.style.flexGrow = '1';
    this.spanDescription.style.display = 'inline-block';
    this.spanDescription.style.fontSize = '0.75rem';
    this.spanDescription.style.marginRight = '4px';
    this.btnCancel.style.display = 'none';
  }

  private getWidgetTypeFromSelectedOption(): WidgetType {
    const selectedOption = this.sltWidgetType.selectedOptions[0];
    const name = selectedOption.value;
    const option = ActionBar.widgetOptions.find((w) => w.name === name);
    if (!option) {
      throw new Error(
        `ActionBar: cannot find a widget option with name ${name}`
      );
    }
    return option.type;
  }

  private handleBtnAddClick = () => {
    if (!this.addWidgetEventHandler) {
      return;
    }

    const widgetType = this.getWidgetTypeFromSelectedOption();
    this.addWidgetEventHandler(widgetType);
  };

  public setWidgetAdditionEnabled(enabled: boolean) {
    this.sltWidgetType.disabled = !enabled;
    this.btnAdd.disabled = !enabled;
  }

  public setStatusDescription(description: string) {
    this.spanDescription.textContent = description;
  }

  public setCancelButtonVisible(visible: boolean) {
    const display = visible ? 'inline-block' : 'none';
    this.btnCancel.style.display = display;
  }

  public getSelectedWidgetType(): WidgetType {
    return this.getWidgetTypeFromSelectedOption();
  }

  public setAddWidgetEventHandler(handler: AddWidgetEventHandler) {
    this.addWidgetEventHandler = handler;
  }

  public setCancelEventHandler(handler: CancelEventHandler) {
    if (this.cancelEventHandler) {
      this.btnCancel.removeEventListener('click', this.cancelEventHandler);
    }
    this.btnCancel.addEventListener('click', handler);
    this.cancelEventHandler = handler;
  }

  public getElement() {
    return this.divContainer;
  }
}

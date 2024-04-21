import Point from '../../point';
import Widget from '../../widgets/widget';
import DragDropController from './drag-drop-controller';
import GridPlacementChecker from './grid-placement-checker';
import SelectorGrid, { PlaceWidgetEventHandler } from './selector-grid';

export default class WidgetGrid implements GridPlacementChecker {
  // unit: pixel
  public static readonly cellWidth = 96;
  public static readonly cellHeight = 96;
  public static readonly cellGap = 4;

  private readonly rows: number;
  private readonly columns: number;
  private readonly divRoot: HTMLDivElement;
  private readonly divGrid: HTMLDivElement;

  private readonly selectorGrid: SelectorGrid;
  private readonly dragDropController: DragDropController;
  private readonly widgets: Widget[] = [];

  public constructor(rows: number, columns: number) {
    this.rows = rows;
    this.columns = columns;

    this.divGrid = document.createElement('div');
    this.dragDropController = new DragDropController(
      this,
      this.divGrid.getBoundingClientRect.bind(this.divGrid)
    );

    this.divGrid.addEventListener(
      'dragover',
      this.dragDropController.handleDragOver
    );
    this.divGrid.addEventListener('drop', this.dragDropController.handleDrop);
    this.styleDivGrid();

    this.selectorGrid = new SelectorGrid(this);
    this.selectorGrid.setGridSize(this.rows, this.columns);
    this.selectorGrid.setSelectedAreaSize(2, 2);

    this.divRoot = document.createElement('div');
    this.divRoot.append(this.divGrid, this.selectorGrid.getElement());
    this.styleDivRoot();
  }

  private styleDivRoot() {
    const { style } = this.divRoot;
    style.position = 'relative';
    style.width = `${
      this.columns * WidgetGrid.cellWidth +
      (this.columns + 1) * WidgetGrid.cellGap
    }px`;
    style.height = `${
      this.rows * WidgetGrid.cellHeight + (this.rows + 1) * WidgetGrid.cellGap
    }px`;
  }

  private styleDivGrid() {
    const { style } = this.divGrid;
    style.display = 'grid';
    style.position = 'relative';
    style.width = `${
      this.columns * WidgetGrid.cellWidth +
      (this.columns + 1) * WidgetGrid.cellGap
    }px`;
    style.height = `${
      this.rows * WidgetGrid.cellHeight + (this.rows + 1) * WidgetGrid.cellGap
    }px`;
    style.padding = `${WidgetGrid.cellGap}px`;

    style.gridTemplateColumns = `repeat(${this.columns}, ${WidgetGrid.cellWidth}px)`;
    style.gridTemplateRows = `repeat(${this.rows}, ${WidgetGrid.cellHeight}px)`;
    style.gap = `${WidgetGrid.cellGap}px`;

    style.backgroundImage = `linear-gradient(#a8a8a8 4px, transparent 4px), linear-gradient(to right, #a8a8a8 4px, #e5e5f7 4px)`;
    style.backgroundSize = `${WidgetGrid.cellWidth + WidgetGrid.cellGap}px ${
      WidgetGrid.cellHeight + WidgetGrid.cellGap
    }px`;
  }

  public isOutOfBound(position: Point) {
    return (
      position.x < 0 ||
      position.x >= this.columns ||
      position.y < 0 ||
      position.y >= this.rows
    );
  }

  public isPlacementConflict(
    startPos: Point,
    endPos: Point,
    excludedWidgets: Widget[] = []
  ) {
    const widgets = this.widgets.filter((w) => !excludedWidgets.includes(w));
    return widgets.some((widget) => {
      const size = widget.getSize();
      const widgetStartPos = widget.getPosition();
      const widgetEndPos = new Point(
        widgetStartPos.x + size.width - 1,
        widgetStartPos.y + size.height - 1
      );
      return (
        widgetStartPos.x <= endPos.x &&
        widgetEndPos.x >= startPos.x &&
        widgetStartPos.y <= endPos.y &&
        widgetEndPos.y >= startPos.y
      );
    });
  }

  public setSelectorGridEnabled(enabled: boolean) {
    this.selectorGrid.setEnabled(enabled);
  }

  public setSelectedAreaSize(width: number, height: number) {
    this.selectorGrid.setSelectedAreaSize(width, height);
  }

  public addWidget(widget: Widget) {
    if (this.widgets.includes(widget)) {
      return;
    }

    const handler = this.dragDropController.toHandleDragStart(widget);
    widget.setDragStartEventHandler(handler);
    this.widgets.push(widget);
    this.divGrid.appendChild(widget.getElement());
  }

  public removeWidget(widget: Widget) {
    const index = this.widgets.findIndex((w) => w === widget);
    if (index < 0) {
      return;
    }
    widget.removeDragStartEventHandler();
    this.widgets.splice(index, 1);
    this.divGrid.removeChild(widget.getElement());
  }

  public getWidgets(): Widget[] {
    return this.widgets.slice();
  }

  public setPlaceWidgetEventHandler(handler: PlaceWidgetEventHandler) {
    this.selectorGrid.setPlaceWidgetEventHandler(handler);
  }

  public cleanUp() {
    const controller = this.dragDropController;
    this.divGrid.removeEventListener('dragover', controller.handleDragOver);
    this.divGrid.removeEventListener('drop', controller.handleDrop);
  }

  public getElement() {
    return this.divRoot;
  }
}

import Point from '../../point';
import Widget from '../../widgets/widget';
import GridPlacementChecker from './grid-placement-checker';
import WidgetGrid from './widget-grid';

type GetBoundingClientRect = () => DOMRect;

export default class DragDropController {
  private readonly gridPlacementChecker: GridPlacementChecker;
  private readonly getGridBoundingClientRect: GetBoundingClientRect;
  private draggedGridOffset: Point | null = null;
  private draggedWidget: Widget | null = null;

  public constructor(
    gridPlacementChecker: GridPlacementChecker,
    getGridBoundingClientRect: GetBoundingClientRect
  ) {
    this.gridPlacementChecker = gridPlacementChecker;
    this.getGridBoundingClientRect = getGridBoundingClientRect;
  }

  public toHandleDragStart(widget: Widget) {
    return (event: DragEvent) => {
      const rect = widget.getElement().getBoundingClientRect();
      const cursorPos = new Point(
        event.clientX - rect.left,
        event.clientY - rect.top
      );
      this.draggedGridOffset = new Point(
        Math.floor(cursorPos.x / (WidgetGrid.cellWidth + WidgetGrid.cellGap)),
        Math.floor(cursorPos.y / (WidgetGrid.cellHeight + WidgetGrid.cellGap))
      );
      this.draggedWidget = widget;
    };
  }

  public handleDragOver(event: DragEvent) {
    // prevent the default handling of the element to allow a drop
    event.preventDefault();
  }

  private getCursorPositionFromMouseEvent(event: DragEvent) {
    const rect = this.getGridBoundingClientRect();
    return new Point(event.clientX - rect.left, event.clientY - rect.top);
  }

  private getGridPositionFromCursorPosition(cursorPos: Point) {
    return new Point(
      Math.floor(
        (cursorPos.x - WidgetGrid.cellGap) /
          (WidgetGrid.cellWidth + WidgetGrid.cellGap)
      ),
      Math.floor(
        (cursorPos.y - WidgetGrid.cellGap) /
          (WidgetGrid.cellHeight + WidgetGrid.cellGap)
      )
    );
  }

  public handleDrop = (event: DragEvent) => {
    if (!this.draggedWidget || !this.draggedGridOffset) {
      return;
    }
    event.preventDefault();
    const targetWidget = this.draggedWidget;
    this.draggedWidget = null;

    const cursorPos = this.getCursorPositionFromMouseEvent(event);
    const cursorGridPos = this.getGridPositionFromCursorPosition(cursorPos);
    const startPos = new Point(
      cursorGridPos.x - this.draggedGridOffset.x,
      cursorGridPos.y - this.draggedGridOffset.y
    );
    if (this.gridPlacementChecker.isOutOfBound(startPos)) {
      return;
    }

    const targetWidgetSize = targetWidget.getSize();
    const endPos = new Point(
      startPos.x + targetWidgetSize.width - 1,
      startPos.y + targetWidgetSize.height - 1
    );
    if (this.gridPlacementChecker.isOutOfBound(endPos)) {
      return;
    }

    if (
      this.gridPlacementChecker.isPlacementConflict(startPos, endPos, [
        targetWidget,
      ])
    ) {
      return;
    }

    targetWidget.setPosition(startPos);
  };
}

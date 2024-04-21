import Point from '../../point';
import Rect from '../../rect';
import GridPlacementChecker from './grid-placement-checker';
import WidgetGrid from './widget-grid';

export type PlaceWidgetEventHandler = (position: Point) => void;

export default class SelectorGrid {
  private static readonly nonplaceableBgColor = 'rgba(245, 66, 66, 25%)';
  private static readonly placeableBgColor = 'rgba(230, 245, 66, 25%)';

  private readonly divGrid: HTMLDivElement;
  private readonly divSelectedArea: HTMLDivElement;
  private readonly placementChecker: GridPlacementChecker;
  private rows: number = 1;
  private columns: number = 1;

  private position = new Point(0, 0);
  private selectedAreaSize = new Rect(1, 1);

  private placeWidgetEventHandler: PlaceWidgetEventHandler | null = null;

  public constructor(placementChecker: GridPlacementChecker) {
    this.placementChecker = placementChecker;
    this.divSelectedArea = document.createElement('div');
    this.divGrid = document.createElement('div');
    this.divGrid.appendChild(this.divSelectedArea);
    this.divGrid.addEventListener('mousemove', this.handleMouseMove);
    this.divGrid.addEventListener('click', this.handleClick);
    this.styleDivGrid();
    this.styleDivSelectedArea();
  }

  private styleDivGrid() {
    const { style } = this.divGrid;
    style.display = 'none';
    style.position = 'absolute';
    style.top = '0';
    style.left = '0';
    style.width = '100%';
    style.height = '100%';
    style.backgroundColor = `rgba(0, 0, 0, 25%)`;
    style.padding = `${WidgetGrid.cellGap}px`;
    style.cursor = 'pointer';
    style.gap = `${WidgetGrid.cellGap}px`;
    this.setGridSize(1, 1);
  }

  private styleDivSelectedArea() {
    this.divSelectedArea.style.borderRadius = '4px';
    this.hintIsPlaceable(true);
    this.updateSelectedArea(
      this.selectedAreaSize.width,
      this.selectedAreaSize.height
    );
  }

  private updateSelectedArea(width: number, height: number) {
    const { style } = this.divSelectedArea;
    const { x, y } = this.position;
    style.gridColumn = `${x + 1} / span ${width}`;
    style.gridRow = `${y + 1} / span ${height}`;
  }

  private hintIsPlaceable(placeable: boolean) {
    const bgColor = placeable
      ? SelectorGrid.placeableBgColor
      : SelectorGrid.nonplaceableBgColor;
    this.divSelectedArea.style.backgroundColor = bgColor;
  }

  private getGridPositionFromMouseEvent(event: MouseEvent) {
    const rect = this.divGrid.getBoundingClientRect();
    const cursorPos = new Point(
      event.clientX - rect.left,
      event.clientY - rect.top
    );
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

  private handleMouseMove = (event: MouseEvent) => {
    const gridStartPos = this.getGridPositionFromMouseEvent(event);
    if (this.placementChecker.isOutOfBound(gridStartPos)) {
      return;
    }

    const gridEndPos = gridStartPos.clone();
    gridEndPos.x += this.selectedAreaSize.width - 1;
    gridEndPos.y += this.selectedAreaSize.height - 1;
    if (this.placementChecker.isOutOfBound(gridEndPos)) {
      this.hintIsPlaceable(false);
      this.position = gridStartPos;
      this.updateSelectedArea(
        this.selectedAreaSize.width -
          Math.max(gridEndPos.x - this.columns + 1, 0),
        this.selectedAreaSize.height - Math.max(gridEndPos.y - this.rows + 1, 0)
      );
      return;
    }

    const overlapping = this.placementChecker.isPlacementConflict(
      gridStartPos,
      gridEndPos
    );
    this.hintIsPlaceable(!overlapping);

    this.position = gridStartPos;
    this.updateSelectedArea(
      this.selectedAreaSize.width,
      this.selectedAreaSize.height
    );
  };

  private handleClick = (event: MouseEvent) => {
    if (!this.placeWidgetEventHandler) {
      return;
    }
    const gridStartPos = this.getGridPositionFromMouseEvent(event);
    if (this.placementChecker.isOutOfBound(gridStartPos)) {
      return;
    }

    const gridEndPos = gridStartPos.clone();
    gridEndPos.x += this.selectedAreaSize.width - 1;
    gridEndPos.y += this.selectedAreaSize.height - 1;
    if (this.placementChecker.isOutOfBound(gridEndPos)) {
      return;
    }

    const overlapping = this.placementChecker.isPlacementConflict(
      gridStartPos,
      gridEndPos
    );
    if (overlapping) {
      return;
    }
    this.placeWidgetEventHandler(this.position.clone());
  };

  public setPlaceWidgetEventHandler(handler: PlaceWidgetEventHandler) {
    this.placeWidgetEventHandler = handler;
  }

  public setEnabled(enabled: boolean) {
    this.divGrid.style.display = enabled ? 'grid' : 'none';
  }

  public setGridSize(rows: number, columns: number) {
    this.rows = rows;
    this.columns = columns;

    const { style } = this.divGrid;
    style.gridTemplateColumns = `repeat(${columns}, ${WidgetGrid.cellWidth}px)`;
    style.gridTemplateRows = `repeat(${rows}, ${WidgetGrid.cellHeight}px)`;
  }

  public setSelectedAreaSize(width: number, height: number) {
    this.selectedAreaSize = new Rect(width, height);
    this.position = new Point(0, 0);
    this.updateSelectedArea(width, height);
  }

  public getElement(): HTMLDivElement {
    return this.divGrid;
  }
}

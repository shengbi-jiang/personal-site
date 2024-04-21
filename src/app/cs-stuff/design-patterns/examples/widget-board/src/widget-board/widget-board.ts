import Point from '../point';
import ActionBar from './action-bar/action-bar';
import WidgetGrid from './widget-grid/widget-grid';
import { WidgetType } from '../widgets/widget-factory';
import Widget from '../widgets/widget';
import TickProvider from '../tick-provider/tick-provider';
import IdleState from './board-state/idle-state';
import BoardState from './board-state/board-state';

export class WidgetBoard {
  private readonly tickProvider: TickProvider;
  private readonly actionBar: ActionBar;
  private readonly widgetGrid: WidgetGrid;

  private readonly divRoot = document.createElement('div');
  private readonly divWidgetGrid = document.createElement('div');
  private readonly divPositionGrid = document.createElement('div');

  private state: BoardState;

  public constructor(
    rows: number,
    columns: number,
    tickProvider: TickProvider
  ) {
    this.tickProvider = tickProvider;
    this.actionBar = new ActionBar();
    this.actionBar.setAddWidgetEventHandler(this.handleAddWidget);
    this.actionBar.setCancelEventHandler(this.handleCancel);

    this.widgetGrid = new WidgetGrid(rows, columns);
    this.widgetGrid.setPlaceWidgetEventHandler(this.handlePlaceWidget);

    this.state = new IdleState(this, tickProvider);

    this.divWidgetGrid.append(this.divPositionGrid);
    this.divRoot.append(
      this.actionBar.getElement(),
      this.widgetGrid.getElement()
    );
    this.style(rows, columns);
  }

  private style(rows: number, columns: number) {
    const { cellWidth, cellHeight, cellGap } = WidgetGrid;
    const width = columns * (cellWidth + cellGap) + cellGap;
    const height = rows * (cellHeight + cellGap) + cellGap;
    this.divRoot.style.width = `${width}px`;
    this.divRoot.style.height = `${height}px`;
  }

  public handleAddWidget = (widgetType: WidgetType) => {
    this.state.prepareAddingWidget(widgetType);
  };

  public handlePlaceWidget = (position: Point) => {
    this.state.placeWidget(position);
  };

  public handleCloneWidget = (widget: Widget) => {
    this.state.prepareCloningWidget(widget);
  };

  public handleRemoveWidget = (widget: Widget) => {
    this.state.removeWidget(widget);
  };

  public handleCancel = () => {
    this.state.cancel();
  };

  public setState(state: BoardState): void {
    this.state = state;
  }

  public getActionBar(): ActionBar {
    return this.actionBar;
  }

  public getWidgetGrid(): WidgetGrid {
    return this.widgetGrid;
  }

  public cleanUp() {
    const widgets = this.widgetGrid.getWidgets();
    widgets.forEach((w) => this.tickProvider.unsubscribe(w.elapse));

    this.widgetGrid.cleanUp();
  }

  public getElement(): HTMLDivElement {
    return this.divRoot;
  }
}

import Point from '../../point';
import TickProvider from '../../tick-provider/tick-provider';
import Widget from '../../widgets/widget';
import { WidgetType } from '../../widgets/widget-factory';
import { WidgetBoard } from '../widget-board';
import BoardState from './board-state';
import IdleState from './idle-state';

export default class CloningState extends BoardState {
  private readonly widget: Widget;

  public constructor(
    widgetBoard: WidgetBoard,
    tickProvider: TickProvider,
    widget: Widget
  ) {
    super(widgetBoard, tickProvider);
    this.widget = widget;
  }

  public prepareAddingWidget(widgetType: WidgetType): void {
    // do nothing
  }

  public prepareCloningWidget(widget: Widget): void {
    // do nothing
  }

  public placeWidget(position: Point): void {
    const actionBar = this.widgetBoard.getActionBar();
    actionBar.setWidgetAdditionEnabled(true);
    actionBar.setStatusDescription('');
    actionBar.setCancelButtonVisible(false);

    const widgetBoard = this.widgetBoard;
    widgetBoard.getWidgetGrid().setSelectorGridEnabled(false);

    const widget = this.widget.clone();

    widget.setPosition(position);
    widget.setBtnRemoveEventHandler(() =>
      widgetBoard.handleRemoveWidget(widget)
    );
    widget.setBtnCloneEventHandler(() => widgetBoard.handleCloneWidget(widget));
    widgetBoard.getWidgetGrid().addWidget(widget);
    this.tickProvider.subscribe(widget.elapse);
    widgetBoard.setState(new IdleState(widgetBoard, this.tickProvider));
  }

  public removeWidget(widget: Widget): void {
    // do nothing
  }

  public cancel(): void {
    const actionBar = this.widgetBoard.getActionBar();
    actionBar.setWidgetAdditionEnabled(true);
    actionBar.setStatusDescription('');
    actionBar.setCancelButtonVisible(false);
    this.widgetBoard.getWidgetGrid().setSelectorGridEnabled(false);
    this.widgetBoard.setState(
      new IdleState(this.widgetBoard, this.tickProvider)
    );
  }
}

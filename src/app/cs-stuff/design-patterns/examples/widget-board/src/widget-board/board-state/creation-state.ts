import Point from '../../point';
import TickProvider from '../../tick-provider/tick-provider';
import Widget from '../../widgets/widget';
import WidgetFactory, { WidgetType } from '../../widgets/widget-factory';
import { WidgetBoard } from '../widget-board';
import BoardState from './board-state';
import IdleState from './idle-state';

export default class CreationState extends BoardState {
  private readonly widgetFactory = new WidgetFactory();
  private readonly widgetType: WidgetType;

  public constructor(
    widgetBoard: WidgetBoard,
    tickProvider: TickProvider,
    widgetType: WidgetType
  ) {
    super(widgetBoard, tickProvider);
    this.widgetType = widgetType;
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

    const widgetGrid = this.widgetBoard.getWidgetGrid();
    widgetGrid.setSelectorGridEnabled(false);

    const widgetBoard = this.widgetBoard;
    const widgetType = actionBar.getSelectedWidgetType();
    const widget = this.widgetFactory.create(widgetType);
    widget.setPosition(position);
    widget.setBtnRemoveEventHandler(() =>
      widgetBoard.handleRemoveWidget(widget)
    );
    widget.setBtnCloneEventHandler(() => widgetBoard.handleCloneWidget(widget));
    widgetGrid.addWidget(widget);
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

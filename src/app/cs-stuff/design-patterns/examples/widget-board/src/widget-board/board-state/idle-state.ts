import Point from '../../point';
import Widget from '../../widgets/widget';
import { WidgetType } from '../../widgets/widget-factory';
import WidgetMeta from '../../widgets/widget-meta';
import BoardState from './board-state';
import CloningState from './cloning-state';
import CreationState from './creation-state';

export default class IdleState extends BoardState {
  public prepareAddingWidget(widgetType: WidgetType): void {
    const actionBar = this.widgetBoard.getActionBar();
    actionBar.setWidgetAdditionEnabled(false);
    actionBar.setCancelButtonVisible(true);
    actionBar.setStatusDescription('Choosing a place for the new widget ...');

    const widgetSize = WidgetMeta.getWidgetSize(widgetType);
    const widgetGrid = this.widgetBoard.getWidgetGrid();
    widgetGrid.setSelectorGridEnabled(true);
    widgetGrid.setSelectedAreaSize(widgetSize.width, widgetSize.height);

    this.widgetBoard.setState(
      new CreationState(this.widgetBoard, this.tickProvider, widgetType)
    );
  }

  public prepareCloningWidget(widget: Widget): void {
    const actionBar = this.widgetBoard.getActionBar();
    actionBar.setWidgetAdditionEnabled(false);
    actionBar.setCancelButtonVisible(true);
    actionBar.setStatusDescription(
      'Choosing a place for the cloned widget ...'
    );

    const widgetSize = widget.getSize();
    const widgetGrid = this.widgetBoard.getWidgetGrid();
    widgetGrid.setSelectorGridEnabled(true);
    widgetGrid.setSelectedAreaSize(widgetSize.width, widgetSize.height);

    this.widgetBoard.setState(
      new CloningState(this.widgetBoard, this.tickProvider, widget)
    );
  }

  public placeWidget(position: Point): void {
    // do nothing
  }

  public removeWidget(widget: Widget): void {
    this.widgetBoard.getWidgetGrid().removeWidget(widget);
    this.tickProvider.unsubscribe(widget.elapse);
    widget.cleanUp();
  }

  public cancel(): void {
    // do nothing
  }
}

import Point from '../../point';
import Widget from '../../widgets/widget';

export default interface GridPlacementChecker {
  isPlacementConflict(
    startPos: Point,
    endPos: Point,
    excludedWidgets?: Widget[]
  ): boolean;

  isOutOfBound(position: Point): boolean;
}

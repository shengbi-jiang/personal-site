import type GraphicsBuilder from './graphics-builder';
import Point from './point';

export default class Director {
  public constructor(private builder: GraphicsBuilder) {}

  setBuilder(builder: GraphicsBuilder) {
    this.builder = builder;
  }

  build(): Element {
    this.builder.reset();
    this.builder.setSize(600, 400);
    this.builder.addCircle(new Point(100, 100), 50, '#FF0000');
    this.builder.addRectangle(new Point(200, 200), 200, 100, '#00FF00');
    this.builder.addTriangle(new Point(300, 300), 100, '#0000FF');
    return this.builder.getElement();
  }
}

import { Arrow } from './../arrow.model';
import { Bar } from './../bar.model';
import { Config } from './../config.model';

describe('Arrow model', () => {
  const config: Config = {
    intervalsAmount: 12,

    titleColumnWidth: 150,
    intervalColumnWidth: 80,

    headerHeight: 80,
    rowHeight: 60,

    verticalBorderWidth: 1,
    horizontalBorderHeight: 1,

    barRadius: 20,

    upperLowerPadding: 10,
    sidesPadding: 5,
  };

  it('should calculate no path when no dependency', () => {
    const tasks = [
      {id: 0, name: 'feature1', start: 1, end: 4, span: 4, depends: []},
      {id: 1, name: 'feature2', start: 3, end: 3, span: 1, depends: []},
    ];

    let bar = new Bar(config, tasks);
    let arrow = new Arrow(config, tasks, bar.getBars());
    let arrows = arrow.getArrows();

    expect(arrows).toEqual([]);
  });

  it('should calculate path when source starts later than destination', () => {
    const tasks = [
      {id: 0, name: 'feature1', start: 3, end: 3, span: 1, depends: [1]},
      {id: 1, name: 'feature2', start: 1, end: 4, span: 4, depends: []},
    ];

    let bar = new Bar(config, tasks);
    let arrow = new Arrow(config, tasks, bar.getBars());
    let arrows = arrow.getArrows();
    expect(arrows).toEqual(["M 400 130 v 0.5 a 2 2 0 0 1 -2 2 H 230 a 2 2 0 0 0 -2 2 V 168 a 2 2 0 0 0 2 2 L 235 170 m -5 -5 l 5 5 l -5 5"]);
  });

  it('should calculate path when source starts earlier than destination', () => {
    const tasks = [
      {id: 0, name: 'feature1', start: 1, end: 4, span: 4, depends: [1]},
      {id: 1, name: 'feature2', start: 3, end: 3, span: 1, depends: []},
    ];

    let bar = new Bar(config, tasks);
    let arrow = new Arrow(config, tasks, bar.getBars());
    let arrows = arrow.getArrows();

    expect(arrows).toEqual(["M 390 130 V 168 a 2 2 0 0 0 2 2 L 395 170 m -5 -5 l 5 5 l -5 5"]);
  });
});

import { Bar } from './../bar.model';

describe('Bar model', () => {
  const config = {
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

  const tasks = [
    {name: 'feature1', start: 1, end: 4, span: 4},
    {name: 'feature2', start: 3, end: 3, span: 1},
  ];

  beforeEach(() => {
    let bar = new Bar(config, tasks);
    this.bars = bar.getBars();

  });

  it('should return bar dimensions', () => {
    expect(this.bars[0].x).toEqual(235);
    expect(this.bars[0].y).toEqual(90);
    expect(this.bars[0].width).toEqual(310);
    expect(this.bars[0].height).toEqual(40);
    expect(this.bars[0].radius).toEqual(20);

    expect(this.bars[1].x).toEqual(395);
    expect(this.bars[1].y).toEqual(150);
    expect(this.bars[1].width).toEqual(70);
    expect(this.bars[1].height).toEqual(40);
    expect(this.bars[1].radius).toEqual(20);
  });
});

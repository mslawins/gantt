import { Gantt } from './gantt.model';

describe('Gantt model', () => {
  const config = {
    intervalsAmount: 12,

    titleColumnWidth: 150,
    intervalColumnWidth: 50,

    headerHeight: 100,
    rowHeight: 80
  };

  beforeEach(() => {
    this.gantt = new Gantt(config, 4);
  });

  it('should return chart dimensions', () => {
    const dimensions = this.gantt.getDimensions();

    expect(dimensions.overallWidth).toEqual(750);
    expect(dimensions.overallHeight).toEqual(420);
    expect(dimensions.headerWidth).toEqual(750);
    expect(dimensions.headerHeight).toEqual(100);
    expect(dimensions.rows[0].x).toEqual(0);
    expect(dimensions.rows[0].y).toEqual(100);
    expect(dimensions.rows[0].width).toEqual(750);
    expect(dimensions.rows[0].height).toEqual(80);
    expect(dimensions.rows[1].x).toEqual(0);
    expect(dimensions.rows[1].y).toEqual(180);
    expect(dimensions.rows[1].width).toEqual(750);
    expect(dimensions.rows[1].height).toEqual(80);
    expect(dimensions.rows[2].x).toEqual(0);
    expect(dimensions.rows[2].y).toEqual(260);
    expect(dimensions.rows[2].width).toEqual(750);
    expect(dimensions.rows[2].height).toEqual(80);
    expect(dimensions.rows[3].x).toEqual(0);
    expect(dimensions.rows[3].y).toEqual(340);
    expect(dimensions.rows[3].width).toEqual(750);
    expect(dimensions.rows[3].height).toEqual(80);
  });
});

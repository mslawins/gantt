import { Gantt } from './../gantt.model';

describe('Gantt model', () => {
  const config = {
    intervalsAmount: 12,

    titleColumnWidth: 150,
    intervalColumnWidth: 50,

    headerHeight: 100,
    rowHeight: 80,

    verticalBorderWidth: 1,
    horizontalBorderHeight: 1,
  };

  beforeEach(() => {
    let gantt = new Gantt(config, 4);
    this.dimensions = gantt.getDimensions();
  });

  it('should return chart dimensions', () => {
    expect(this.dimensions.overallWidth).toEqual(750);
    expect(this.dimensions.overallHeight).toEqual(420);
    expect(this.dimensions.headerWidth).toEqual(750);
    expect(this.dimensions.headerHeight).toEqual(100);
  });

  it('should return rows dimensions', () => {
    expect(this.dimensions.rows[0].x).toEqual(0);
    expect(this.dimensions.rows[0].y).toEqual(100);
    expect(this.dimensions.rows[0].width).toEqual(750);
    expect(this.dimensions.rows[0].height).toEqual(80);

    expect(this.dimensions.rows[1].x).toEqual(0);
    expect(this.dimensions.rows[1].y).toEqual(180);
    expect(this.dimensions.rows[1].width).toEqual(750);
    expect(this.dimensions.rows[1].height).toEqual(80);

    expect(this.dimensions.rows[2].x).toEqual(0);
    expect(this.dimensions.rows[2].y).toEqual(260);
    expect(this.dimensions.rows[2].width).toEqual(750);
    expect(this.dimensions.rows[2].height).toEqual(80);

    expect(this.dimensions.rows[3].x).toEqual(0);
    expect(this.dimensions.rows[3].y).toEqual(340);
    expect(this.dimensions.rows[3].width).toEqual(750);
    expect(this.dimensions.rows[3].height).toEqual(80);
  });

  it('should return vertical borders dimensions', () => {
    expect(this.dimensions.verticalBorders[0].x).toEqual(150);
    expect(this.dimensions.verticalBorders[0].y).toEqual(0);
    expect(this.dimensions.verticalBorders[0].width).toEqual(1);
    expect(this.dimensions.verticalBorders[0].height).toEqual(420);

    expect(this.dimensions.verticalBorders[1].x).toEqual(200);
    expect(this.dimensions.verticalBorders[1].y).toEqual(0);
    expect(this.dimensions.verticalBorders[1].width).toEqual(1);
    expect(this.dimensions.verticalBorders[1].height).toEqual(420);

    expect(this.dimensions.verticalBorders[2].x).toEqual(250);
    expect(this.dimensions.verticalBorders[2].y).toEqual(0);
    expect(this.dimensions.verticalBorders[2].width).toEqual(1);
    expect(this.dimensions.verticalBorders[2].height).toEqual(420);

    expect(this.dimensions.verticalBorders[3].x).toEqual(300);
    expect(this.dimensions.verticalBorders[3].y).toEqual(0);
    expect(this.dimensions.verticalBorders[3].width).toEqual(1);
    expect(this.dimensions.verticalBorders[3].height).toEqual(420);

    expect(this.dimensions.verticalBorders[4].x).toEqual(350);
    expect(this.dimensions.verticalBorders[4].y).toEqual(0);
    expect(this.dimensions.verticalBorders[4].width).toEqual(1);
    expect(this.dimensions.verticalBorders[4].height).toEqual(420);

    expect(this.dimensions.verticalBorders[5].x).toEqual(400);
    expect(this.dimensions.verticalBorders[5].y).toEqual(0);
    expect(this.dimensions.verticalBorders[5].width).toEqual(1);
    expect(this.dimensions.verticalBorders[5].height).toEqual(420);

    // there is more
  });

  it('should return horizontal borders dimensions', () => {
    expect(this.dimensions.horizontalBorders[0].x).toEqual(0);
    expect(this.dimensions.horizontalBorders[0].y).toEqual(100);
    expect(this.dimensions.horizontalBorders[0].width).toEqual(750);
    expect(this.dimensions.horizontalBorders[0].height).toEqual(1);

    expect(this.dimensions.horizontalBorders[1].x).toEqual(0);
    expect(this.dimensions.horizontalBorders[1].y).toEqual(180);
    expect(this.dimensions.horizontalBorders[1].width).toEqual(750);
    expect(this.dimensions.horizontalBorders[1].height).toEqual(1);

    expect(this.dimensions.horizontalBorders[2].x).toEqual(0);
    expect(this.dimensions.horizontalBorders[2].y).toEqual(260);
    expect(this.dimensions.horizontalBorders[2].width).toEqual(750);
    expect(this.dimensions.horizontalBorders[2].height).toEqual(1);

    expect(this.dimensions.horizontalBorders[3].x).toEqual(0);
    expect(this.dimensions.horizontalBorders[3].y).toEqual(340);
    expect(this.dimensions.horizontalBorders[3].width).toEqual(750);
    expect(this.dimensions.horizontalBorders[3].height).toEqual(1);
  });

  it('should return header text anchors', () => {
    expect(this.dimensions.headerTextAnchors[0].x).toEqual(175);
    expect(this.dimensions.headerTextAnchors[0].y).toEqual(50);

    expect(this.dimensions.headerTextAnchors[1].x).toEqual(225);
    expect(this.dimensions.headerTextAnchors[1].y).toEqual(50);

    expect(this.dimensions.headerTextAnchors[2].x).toEqual(275);
    expect(this.dimensions.headerTextAnchors[2].y).toEqual(50);

    expect(this.dimensions.headerTextAnchors[3].x).toEqual(325);
    expect(this.dimensions.headerTextAnchors[3].y).toEqual(50);

    expect(this.dimensions.headerTextAnchors[4].x).toEqual(375);
    expect(this.dimensions.headerTextAnchors[4].y).toEqual(50);

    // there is more
  });

  it('should return title text anchors', () => {
    expect(this.dimensions.titleTextAnchors[0].x).toEqual(75);
    expect(this.dimensions.titleTextAnchors[0].y).toEqual(140);

    expect(this.dimensions.titleTextAnchors[1].x).toEqual(75);
    expect(this.dimensions.titleTextAnchors[1].y).toEqual(220);

    expect(this.dimensions.titleTextAnchors[2].x).toEqual(75);
    expect(this.dimensions.titleTextAnchors[2].y).toEqual(300);

    expect(this.dimensions.titleTextAnchors[3].x).toEqual(75);
    expect(this.dimensions.titleTextAnchors[3].y).toEqual(380);
  });
});

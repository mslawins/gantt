import { GanttConfig } from './../models/gantt.model';
import { Release, ReleaseConfig, ReleaseGraph } from './../models/release.model';

import { ganttConfig, anchor } from './test-data';

describe('Release model', () => {
  beforeEach(() => {
    const releaseConfig: ReleaseConfig = {
      padding: 10,
      barHeight: 18,
      barRadius: 4,
      offset: 1
    };

    const releases: Release[] = [
      {name: 'rel1', start: 0, end: 3, span: 4},
      {name: 'rel2', start: 2, end: 5, span: 4},
    ];

    const timeIntervals = ['18.01', '18.02', '18.03', '18.04', '18.05', '18.06',
                           '18.07', '18.08', '18.09', '18.10', '18.11', '18.12'];
    this.release = new ReleaseGraph(anchor, ganttConfig, releaseConfig, releases, timeIntervals);
  });

  it('should return overall dimensions', () => {
    const dimensions = this.release.getOverallDimension();

    expect(dimensions.x).toBe(10);
    expect(dimensions.y).toBe(10);
    expect(dimensions.width).toBe(750);
    expect(dimensions.height).toBe(66);
  });

  it('should return vertical borders', () => {
    const borders = this.release.getVerticalBorders();

    expect(borders[0].x).toBe(160);
    expect(borders[0].y).toBe(10);
    expect(borders[0].width).toBe(1);
    expect(borders[0].height).toBe(66);

    expect(borders[1].x).toBe(210);
    expect(borders[1].y).toBe(10);
    expect(borders[1].width).toBe(1);
    expect(borders[1].height).toBe(66);

    expect(borders[2].x).toBe(260);
    expect(borders[2].y).toBe(10);
    expect(borders[2].width).toBe(1);
    expect(borders[2].height).toBe(66);

    // there is more
  });

  it('should return bars', () => {
    const bars = this.release.getBars();

    expect(bars[0].x).toBe(170);
    expect(bars[0].y).toBe(20);
    expect(bars[0].width).toBe(180);
    expect(bars[0].height).toBe(18);
    expect(bars[0].radius).toBe(4);

    expect(bars[1].x).toBe(270);
    expect(bars[1].y).toBe(48);
    expect(bars[1].width).toBe(180);
    expect(bars[1].height).toBe(18);
    expect(bars[1].radius).toBe(4);
  });

  it('should return texts', () => {
    const texts = this.release.getText();

    expect(texts[0].x).toBe(260);
    expect(texts[0].y).toBe(30);

    expect(texts[1].x).toBe(360);
    expect(texts[1].y).toBe(58);
  });
});

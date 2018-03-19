import { Bar, BarGraph } from './../models/bar.model';
import { GanttConfig } from './../models/gantt.model';
import { Task } from './../models/task.model';

import { ganttConfig, anchor } from './test-data';

describe('Bar model', () => {
  const tasks: Task[] = [
    {id: 1, name: 'feature1', start: 1, end: 4, span: 4, depends: []},
    {id: 2, name: 'feature2', start: 3, end: 3, span: 1, depends: []},
  ];

  beforeEach(() => {
    let bar = new BarGraph(anchor, ganttConfig, tasks);
    this.bars = bar.getBars();
  });

  it('should return bar dimensions', () => {
    expect(this.bars[0].x).toEqual(220);
    expect(this.bars[0].y).toEqual(125);
    expect(this.bars[0].width).toEqual(180);
    expect(this.bars[0].height).toEqual(50);
    expect(this.bars[0].radius).toEqual(3);

    expect(this.bars[1].x).toEqual(320);
    expect(this.bars[1].y).toEqual(205);
    expect(this.bars[1].width).toEqual(30);
    expect(this.bars[1].height).toEqual(50);
    expect(this.bars[1].radius).toEqual(3);
  });
});

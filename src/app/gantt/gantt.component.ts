import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { Gantt } from './gantt.model';
import { Bar } from './bar.model';
import { Task } from './task.model';

declare var Snap: any;

@Component({
  selector: 'gantt',
  templateUrl: './gantt.component.html',
  styleUrls: ['./gantt.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GanttComponent implements OnInit {
  gantt: Gantt;
  config: any;
  canvas: any;
  tasks: Task[];
  timeIntervals: string[];
  bar: Bar;

  ngOnInit() {
    this.config = {
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

    this.tasks = [
      {name: 'feature1', start: 1, end: 4, span: 4},
      {name: 'feature2', start: 3, end: 3, span: 1},
      {name: 'feature3', start: 2, end: 8, span: 7},
      {name: 'feature4', start: 7, end: 10, span: 4},
      {name: 'feature5', start: 5, end: 12, span: 7},
    ];

    this.timeIntervals = ['18.01', '18.02', '18.03', '18.04', '18.05', '18.06',
                          '18.07', '18.08', '18.09', '18.10', '18.11', '18.12'];

    this.gantt = new Gantt(this.config, this.tasks.length);
    this.bar = new Bar(this.config, this.tasks);

    this.canvas = Snap('.gantt');
    this.drawGantt();
    this.drawBars();
  }

  drawGantt() {
    const dimensions = this.gantt.getDimensions();
    this.canvas.attr({width: dimensions.overallWidth, height: dimensions.overallHeight});

    this.canvas.rect(0, 0, dimensions.overallWidth, dimensions.overallHeight).addClass('background')
    this.canvas.rect(0, 0, dimensions.headerWidth, dimensions.headerHeight).addClass('header')

    dimensions.rows.forEach((row) => {
      this.canvas.rect(row.x, row.y, row.width, row.height).addClass('row');
    });

    dimensions.verticalBorders.forEach((border) => {
      this.canvas.rect(border.x, border.y, border.width, border.height).addClass('vertical-border');
    });

    dimensions.horizontalBorders.forEach((border) => {
      this.canvas.rect(border.x, border.y, border.width, border.height).addClass('horizontal-border');
    });

    dimensions.headerTextAnchors.forEach((anchor, index) => {
      this.canvas.text(anchor.x, anchor.y, this.timeIntervals[index]).addClass('header-text');
    });

    dimensions.titleTextAnchors.forEach((anchor, index) => {
      this.canvas.text(anchor.x, anchor.y, this.tasks[index].name).addClass('title-text');
    });
  }

  drawBars() {
    const bars = this.bar.getBars()

    bars.forEach((bar) => {
      this.canvas.rect(bar.x, bar.y, bar.width, bar.height, bar.radius).addClass('bar');
    });
  }
}

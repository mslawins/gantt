import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { Gantt } from './gantt.model';
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

  ngOnInit() {
    this.config = {
      intervalsAmount: 12,

      titleColumnWidth: 150,
      intervalColumnWidth: 80,

      headerHeight: 80,
      rowHeight: 60,

      verticalBorderWidth: 1,
      horizontalBorderHeight: 1,
    };

    this.tasks = [
      {name: 'feature1', start: '18.01', end: '18.02'},
      {name: 'feature2', start: '18.02', end: '18.03'},
      {name: 'feature3', start: '18.03', end: '18.04'},
      {name: 'feature3', start: '18.04', end: '18.05'},
      {name: 'feature3', start: '18.05', end: '18.06'},
    ];

    this.gantt = new Gantt(this.config, this.tasks.length);


    this.canvas = Snap('.gantt');
    this.draw();
  }

  draw() {
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
  }
}

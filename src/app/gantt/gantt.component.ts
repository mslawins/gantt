import { Component, OnInit } from '@angular/core';

import { Gantt } from './gantt.model';

@Component({
  selector: 'gantt',
  templateUrl: './gantt.component.html',
  styleUrls: ['./gantt.component.scss']
})
export class GanttComponent implements OnInit {
  gantt: Gantt;

  ngOnInit() {
    this.gantt = new Gantt();
  }
}

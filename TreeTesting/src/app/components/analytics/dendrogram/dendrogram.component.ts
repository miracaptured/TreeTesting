import { Component, Input, OnInit } from '@angular/core';
import { Dendrogram } from 'src/app/models/dendrogram';
import { CardSortTaskInfo } from 'src/app/models/task-info';

@Component({
  selector: 'app-dendrogram',
  templateUrl: './dendrogram.component.html',
  styleUrls: ['./dendrogram.component.scss']
})
export class DendrogramComponent implements OnInit {

  range = (start, stop, step) => 
    Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step))

  @Input()
  taskInfo: CardSortTaskInfo;

  @Input()
  xShowInPercents: boolean = false;

  buildData() {
    this.dendrogram.data = [];
    let maxValY = Math.max(...this.taskInfo.dendrogramData['icoord'].flat());
    let maxValX = Math.max(...this.taskInfo.dendrogramData['dcoord'].flat());
    for (let i = 0; i < this.taskInfo.dendrogramData['icoord'].length; i++) {
      this.dendrogram.data.push({
        yaxis: 'y',
        y: this.taskInfo.dendrogramData['icoord'][i],
        mode: 'lines',
        xaxis: 'x',
        x: this.taskInfo.dendrogramData['dcoord'][i],
        type: 'scatter',
      });
    }
    this.dendrogram.layout = {
      colorway: [
          '#3EA942', '#D3C0D4', '#E76A6C', '#9c3f2f', '#5c8c46', '#7c468c'
      ],
      autosize: true,
      showlegend: false,
      yaxis: {
        showticklabels: true,
        tickmode: 'array',
        ticks: 'outside',
        showgrid: false,
        mirror: 'allticks',
        zeroline: false,
        showline: true,
        ticktext: this.taskInfo.dendrogramData['ivl'],
        rangemode: 'tozero',
        type: 'linear',
        tickvals: this.range(5, maxValY, 10),
        autorange: false,
        range: [0, maxValY + 10],
        fixedrange: true
      },
      xaxis: !this.xShowInPercents ? {
        showticklabels: true,
        ticks: 'outside',
        showgrid: false,
        mirror: 'allticks',
        zeroline: false,
        showline: true,
        rangemode: 'tozero',
        type: 'linear',
        range: [-0.1, maxValX + 1],
        fixedrange: true
      } :
      {
        showticklabels: true,
        ticks: 'outside',
        showgrid: false,
        mirror: 'allticks',
        zeroline: false,
        showline: true,
        rangemode: 'tozero',
        type: 'array',
        ticktext: this.taskInfo.dendrogramData['dcoord'].flat().map(tick => `${100 - Math.round((tick / maxValX) * 100)}%`),
        tickvals: this.taskInfo.dendrogramData['dcoord'].flat(),
        range: [-0.1, maxValX + 0.1],
        fixedrange: true
      },
      hovermode: false,
    };

    this.dendrogram.config = {
      displayModeBar: false  
    };    
  }
  
  public dendrogram : Dendrogram = new Dendrogram;

  ngOnInit(): void {
    this.buildData();
  }
}

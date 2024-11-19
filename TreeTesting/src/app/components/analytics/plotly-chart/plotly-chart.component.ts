import { Component } from '@angular/core';


@Component({
  selector: 'app-plotly-chart',
  templateUrl: './plotly-chart.component.html',
  styleUrls: ['./plotly-chart.component.scss']
})
export class PlotlyChartComponent {

  ngOnInit(): void {
    /*this.http.get('assets/dendro_data.json').subscribe((data: any) => {
      const dendroData = {
        x: [],
        y: [],
        text: [],
        mode: 'markers+text',
        type: 'scatter',
        marker: { color: 'black' },
        textposition: 'top center',
        hoverinfo: 'none'
      };

      for (let i = 0; i < data.dcoord.length; i++) {
        for (let j = 0; j < 2; j++) {
          dendroData.x.push(data.icoord[i][j * 2]);
          dendroData.y.push(data.dcoord[i][j * 2]);
          dendroData.text.push('');
        }
      }

      for (let i = 0; i < data.ivl.length; i++) {
        dendroData.x.push(i * 10);
        dendroData.y.push(0);
        dendroData.text.push(data.ivl[i]);
      }

      this.graph = {
        data: [dendroData],
        layout: {
          title: 'Dendrogram',
          xaxis: { title: 'Index', showgrid: false, zeroline: false },
          yaxis: { title: 'Distance', showgrid: false, zeroline: false }
        }
      };
    });*/
  }

  dendrogram = {
    data: [
      {
        yaxis: 'y2',
        y: [ 0., 0.82173426, 0.82173426,  0. ],
        mode: 'lines',
        xaxis: 'x',
        marker: {
          color: 'rgb(61,153,112)'
        },
        x: [ 5., 5., 15., 15. ],
        type: 'scatter'
      },
      {
        yaxis: 'y2',
        y: [ 0., 0.77955946, 0.77955946, 0. ],
        mode: 'lines',
        xaxis: 'x',
        marker: {
          color: 'rgb(61,153,112)'
        },
        x: [ 35., 35., 45., 45. ],
        type: 'scatter'
      },
      {
        yaxis: 'y2',
        y: [ 0., 1.17208582, 1.17208582, 0.77955946 ],
        mode: 'lines',
        xaxis: 'x',
        marker: {
          color: 'rgb(61,153,112)'
        },
        x: [ 25., 25., 40., 40. ],
        type: 'scatter'
      },
      {
        yaxis: 'y2',
        y: [ 0.82173426, 1.36246313, 1.36246313, 1.17208582 ],
        mode: 'lines',
        xaxis: 'x',
        marker: {
          color: 'rgb(61,153,112)'
        },
        x: [ 10., 10., 32.5, 32.5 ],
        type: 'scatter'
      },
      {
        yaxis: 'y2',
        y: [ 0., 0.76612453, 0.76612453, 0. ],
        mode: 'lines',
        xaxis: 'x',
        marker: {
          color: 'rgb(255,65,54)'
        },
        x: [ 75., 75., 85., 85. ],
        type: 'scatter'
      },
      {
        yaxis: 'y2',
        y: [ 0., 0.84423537, 0.84423537, 0.76612453 ],
        mode: 'lines',
        xaxis: 'x',
        marker: {
          color: 'rgb(255,65,54)'
        },
        x: [ 65., 65., 80., 80. ],
        type: 'scatter'
      },
      {
        yaxis: 'y2',
        y: [ 0., 1.65955591, 1.65955591, 0.84423537 ],
        mode: 'lines',
        xaxis: 'x',
        marker: {
          color: 'rgb(0,116,217)'
        },
        x: [ 55., 55., 72.5, 72.5 ],
        type: 'scatter'
      },
      {
        yaxis: 'y2',
        y: [ 1.36246313, 2.0157622, 2.0157622, 1.65955591 ],
        mode: 'lines',
        xaxis: 'x',
        marker: {
          color: 'rgb(0,116,217)'
        },
        x: [ 21.25, 21.25, 63.75, 63.75 ],
        type: 'scatter'
      }
    ],
    layout: {
      width: '100%',
      showlegend: false,
      xaxis: {
        showticklabels: true,
        tickmode: 'array',
        ticks: 'outside',
        showgrid: false,
        mirror: 'allticks',
        zeroline: false,
        showline: true,
        ticktext: ['e', 'f', 'g', 'a', 'h', 'c', 'b', 'd', 'i'],
        rangemode: 'tozero',
        type: 'linear',
        tickvals: [5.0, 15.0, 25.0, 35.0, 45.0, 55.0, 65.0, 75.0, 85.0]
      },
      yaxis: {
        showticklabels: true,
        ticks: 'outside',
        showgrid: false,
        mirror: 'allticks',
        zeroline: false,
        showline: true,
        rangemode: 'tozero',
        type: 'linear'
      },
      hovermode: 'closest',
      autosize: false,
      height: '100%'
    },
    config: {
      displayModeBar: false  
    }
  };

  public graph = {
    data: [
      {
        z: [[1, 20, 30], [20, 1, 60], [30, 60, 1]],
        type: 'heatmap',
      }
    ],
      layout: {width: 400, height: 400, title: 'A Fancy Plot'}
  };

  constructor() {
    //this. = this.dendrogram;
    //this.graph.data = [trace4];
  }
}

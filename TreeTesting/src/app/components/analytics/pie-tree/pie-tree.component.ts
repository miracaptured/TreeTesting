import { Component, AfterViewInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-pie-tree',
  templateUrl: './pie-tree.component.html',
  styleUrls: ['./pie-tree.component.scss']
})
export class PieTreeComponent implements AfterViewInit {

  root: any;
  svg: any;
  treemap: any;
  width: number = 960;
  height: number = 500;
  red = "#f5696d";
  green = "#40bc96";
  orange = "#fabd57";
  treeData = {
    "health": [{
      "value": 60
    }, {
      "value": 10
    }, {
      "value": 30
    }],
    "color": this.orange,
    "children": [{
      "health": [{
        "value": 60
      }, {
        "value": 20
      }, {
        "value": 20
      }],
      "color": this.green
    }, {
      "health": [{
        "value": 40
      }, {
        "value": 30
      }, {
        "value": 30
      }],
      "color": this.orange
    }]
  };
  duration = 750;
  i = 0;


  ngAfterViewInit(): void {
    this.svg = d3
      .select("figure#pie-tree")
      .append('svg')
      .attr('viewBox', '0 0 960 500')
      .append('g');

    this.treemap = d3.tree().size([this.height, this.width]);
    this.root = d3.hierarchy(this.treeData, (d: any) => {
      return d.children;
    });

    this.root.x0 = this.height / 2;
    this.root.y0 = 0;
    // Collapse after the second level
    //this.root.children?.forEach((d: any) => {
    //  this.collapse(d);
    //});
    this.update(this.root);
  }

  drawPie(d) {
    let pie = d3.pie();

    let arc = d3.arc<any>()
    .outerRadius(30)
    .innerRadius(0);

    d3
      .selectAll('path')
      .data(pie(d.health))
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', function(d, i) {
        let color = ['#40bc96', '#fabd57', '#f5696d'];
         return color[i];
      });
  }

  update(source: any) {
    // Assigns the x and y position for the nodes
    const treeData = this.treemap(this.root);

    // Compute the new tree layout.
    const nodes = treeData.descendants();
    const links = treeData.descendants().slice(1);

    // Normalize for fixed-depth.
    nodes.forEach((d: any) => {
      d.y = d.depth * 180;
    });

    // ****************** Nodes section ***************************

    // Update the nodes...
    const node = this.svg.selectAll('g.node').data(nodes, (d: any) => {
      return d.id || (d.id = ++this.i);
    });

    // Enter any new modes at the parent's previous position.
    const nodeEnter = node
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', (d: any) => {
        return 'translate(' + source.y0 + ',' + source.x0 + ')';
      })
      .on('click', (_, d) => this.click(d));

    // Add Circle for the nodes
    nodeEnter
      .append('circle')
      .attr('class', (d: any) => (d._children ? 'node fill' : 'node'))
      .attr('r', 1e-6);
    // Add labels for the nodes
    nodeEnter
      .append('text')
      .attr('text-rendering','optimizeLegibility')
      .attr('dy', '.35em')

      .attr('x', (d) => {
        return d.children || d._children ? -13 : 13;
      })
      .attr('text-anchor', (d: any) => {
        return d.children || d._children ? 'end' : 'start';
      })
      .text((d) => {
        return d.data.name;
      });

    nodeEnter.each(this.drawPie);
    // UPDATE
    const nodeUpdate = nodeEnter.merge(node);

    // Transition to the proper position for the node
    nodeUpdate
      .transition()
      .duration(this.duration)
      .attr('transform', (d: any) => {
        return 'translate(' + d.y + ',' + d.x + ')';
      });

    // Update the node attributes and style
    nodeUpdate
      .select('circle.node')
      .attr('r', 10)
      .attr('class', (d: any) => (d._children ? 'node fill' : 'node'))
      .attr('cursor', 'pointer');

    // Remove any exiting nodes
    const nodeExit = node
      .exit()
      .transition()
      .duration(this.duration)
      .attr('transform', (d: any) => {
        return 'translate(' + source.y + ',' + source.x + ')';
      })
      .remove();

    // On exit reduce the node circles size to 0
    nodeExit.select('circle').attr('r', 1e-6);

    // On exit reduce the opacity of text labels
    nodeExit.select('text').style('fill-opacity', 1e-6);

    // ****************** links section ***************************

    // Update the links...
    const link = this.svg.selectAll('path.link').data(links, (d: any) => {
      return d.id;
    });

    // Enter any new links at the parent's previous position.
    const linkEnter = link
      .enter()
      .insert('path', 'g')
      .attr('class', 'link')
      .attr('d', (d: any) => {
        const o = { x: source.x0, y: source.y0 };
        return this.diagonal(o, o);
      });

    // UPDATE
    const linkUpdate = linkEnter.merge(link);

    // Transition back to the parent element position
    linkUpdate
      .transition()
      .duration(this.duration)
      .attr('d', (d: any) => {
        return this.diagonal(d, d.parent);
      });

    // Remove any exiting links
    const linkExit = link
      .exit()
      .transition()
      .duration(this.duration)
      .attr('d', (d: any) => {
        const o = { x: source.x, y: source.y };
        return this.diagonal(o, o);
      })
      .remove();

    // Store the old positions for transition.
    nodes.forEach((d: any) => {
      d.x0 = d.x;
      d.y0 = d.y;
    });
  }

  collapse(d: any) {
    if (d.children) {
      d._children = d.children;
      d._children.forEach((d: any) => this.collapse(d));
      d.children = null;
    }
  }

  diagonal(s: any, d: any) {
    const path = `M ${s.y} ${s.x} C ${(s.y + d.y) / 2} ${s.x}, ${(s.y + d.y) / 2} ${d.x}, ${d.y} ${d.x}`;

    return path;
  }

  click(d: any) {
    if (d.children) {
      d._children = d.children;
      d.children = null;
    } else {
      d.children = d._children;
      d._children = null;
    }
    this.update(d);
  }

}

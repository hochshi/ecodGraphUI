import {Component, OnInit, OnChanges, SimpleChanges, ViewEncapsulation} from '@angular/core';
// import {CytoscapeService} from '../services/cytoscape.service';
import {Router} from '@angular/router';
import {CyGraph} from '../models/cy.graph';
import {EcodService} from '../services/ecod.service';
let Cytoscape = require('cytoscape');

@Component({
  selector: 'cytoscape-view',
  template: require('./cytoscape.component.html'),
  styles: [require('./cytoscape.component.css')],
  encapsulation: ViewEncapsulation.None
})
export class CytoscapeComponent implements OnInit, OnChanges {

  public graph: CyGraph;

  public errorMessage: string;

  private cyInstance: any;

  // constructor(private router: Router, private cytoscapeService: CytoscapeService) {
  // }
  constructor(private router: Router, private ecodService: EcodService) {
  }

  ngOnInit(): void {
    this.cyInstance = Cytoscape({container: document.getElementById('cytoscape-component')});
    this.getGraph();
  }

  getGraph(): void {
    this.ecodService.getGraph()
      .then(graph => this.drawGraph(graph));
  }

  drawGraph(graph: CyGraph): void {
    this.graph = graph;
    this.cyInstance.startBatch();
    this.cyInstance.add(this.graph.nodes);
    this.cyInstance.add(this.graph.edges);
    this.cyInstance.endBatch();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.drawGraph(this.graph);
  }
}

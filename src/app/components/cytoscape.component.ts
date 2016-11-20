import {Component, OnInit, OnChanges, SimpleChanges, ViewEncapsulation, ChangeDetectionStrategy} from '@angular/core';
import {Router} from '@angular/router';
import {CyGraph} from '../models/cy.graph';
import {EcodService} from '../services/ecod.service';
import {CytoscapeSelectionService} from '../services/cytoscape.service';
import {IDomainAlignment} from '../models/domain.alignment';
// import {CytoscapeService} from '../services/cytoscape.service';

class CySettings {
  public layout = {name: 'cytoscape-ngraph.forcelayout'};
  public nodeStyle = {
    selector: 'node',
    style: {
      content: 'data(id)',
      'text-valign': 'center',
      'text-halign': 'center',
      'background-color': 'mapData(size,1,3896, green, red)',
      'text-outline-color': '#555',
      'text-outline-width': '2px',
      color: '#000'
    }
  };
  public edgeStyle = {
    selector: 'edge',
    style: {
      'line-color': 'mapData(size, 1,100, grey, black)',
    }
  };
}

@Component({
  selector: 'cytoscape-view',
  template: require('./cytoscape.component.html'),
  styles: [require('./cytoscape.component.css')],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CytoscapeComponent implements OnInit, OnChanges {

  graph: CyGraph;
  cySettings: CySettings;

  alignments: IDomainAlignment[];

  public errorMessage: string;

  private cyInstance: any;

  // constructor(private router: Router, private cytoscapeService: CytoscapeService) {
  // }
  constructor(private router: Router, private ecodService: EcodService, private cyser: CytoscapeSelectionService) {
  }

  ngOnInit(): void {
    var cytoscape = require('cytoscape');
    var cyforcelayout = require('cytoscape-ngraph.forcelayout');
    cyforcelayout(cytoscape);
    this.cySettings = new CySettings();
    this.cyInstance = cytoscape({container: document.getElementById('cytoscape-component')});
    this.getGraph();
    this.getAlignments();
    this.cyser.selectedNode.subscribe(res => console.log(res), err => console.log(err));
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (let propName in changes) {
      let chng = changes[propName];
      let cur = JSON.stringify(chng.currentValue);
      let prev = JSON.stringify(chng.previousValue);
      console.log(`${propName}: currentValue = ${cur}, previousValue = ${prev}`);
    }
  }

  getAlignments(): void {
    this.ecodService.getAlignments()
      .subscribe(alignments => this.changeAlg(alignments),
        error => this.changeErrorMessage(error));
  }

  changeAlg(alignments: IDomainAlignment[]) {
    this.alignments = alignments;
  }

  getGraph(): void {
    this.ecodService.getGraph()
      .subscribe(graph => this.changeGraph(graph),
        error => this.changeErrorMessage(error));
  }

  private changeGraph(graph: CyGraph): void {
    this.graph = graph;
    this.drawGraph();
    this.cyser.setSelectedNode(this.graph.nodes[0]);
  }

  private changeErrorMessage(error: string): void {
    this.errorMessage = error;
  }

  private drawGraph(): void {
    this.cyInstance.startBatch();

    this.cyInstance.remove(this.cyInstance.nodes());
    this.cyInstance.add(this.graph.nodes);
    this.cyInstance.add(this.graph.edges);
    this.cyInstance.layout(this.cySettings.layout);

    var nodeSizeMax = Math.max(...this.cyInstance.nodes().map(function (n) {
      return n.data('size')
    }));
    var nodeSizeMin = Math.min(...this.cyInstance.nodes().map(function (n) {
      return n.data('size')
    }));

    this.cySettings.nodeStyle.style['background-color'] = 'mapData(size,' + nodeSizeMin + ',' + nodeSizeMax + ',grey, green)';

    var edgeSizeMax = Math.max(...this.cyInstance.edges().map(function (n) {
      return n.data('size')
    }));
    var edgeSizeMin = Math.min(...this.cyInstance.edges().map(function (n) {
      return n.data('size')
    }));

    this.cySettings.edgeStyle.style['line-color'] = 'mapData(size,' + edgeSizeMin + ',' + edgeSizeMax + ',grey, red)';

    this.cyInstance.style([this.cySettings.nodeStyle, this.cySettings.edgeStyle]);

    this.cyInstance.endBatch();
  }

}

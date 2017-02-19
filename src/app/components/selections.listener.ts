import {CytoscapeSelectionService} from "../services/cytoscape.service";
import {OnInit} from "@angular/core";

export class SelectionListener implements OnInit {

  constructor(private cyser: CytoscapeSelectionService){}

  ngOnInit(): void {
    this.cyser.selectedEdge.subscribe(selection => console.log(selection), error => console.log(error));
    this.cyser.selectedNode.subscribe(selection => console.log(selection), error => console.log(error));
  }
}

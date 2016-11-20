import {CyNode, CyEdge} from '../models/cy.graph';
import {Observable, BehaviorSubject} from 'rxjs';


export class CytoscapeSelectionService {

  private _selectedNode: BehaviorSubject<CyNode> = new BehaviorSubject(null);
  private _selectedEdge: BehaviorSubject<CyEdge> = new BehaviorSubject(null);

  public selectedNode: Observable<CyNode> = this._selectedNode.asObservable();
  public selectedEdge: Observable<CyEdge> = this._selectedEdge.asObservable();

  /*  ngOnInit(): void {
   this._selectedNode = new BehaviorSubject(null);
   this._selectedEdge = new BehaviorSubject(null);

   this.selectedNode = this._selectedNode.asObservable();
   this.selectedEdge = this._selectedEdge.asObservable();
   }
   */

  public setSelectedNode(newE: CyNode): void {
    this._selectedNode.next(newE);
  }

  public setSelectedEdge(newE: CyEdge): void {
    this._selectedEdge.next(newE);
  }

}


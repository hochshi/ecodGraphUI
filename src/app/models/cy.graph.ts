interface ICyElementData {
  id: string | number;
  size: number;
}

interface ICyEdgeData extends ICyElementData {
  source: string | number;
  target: string | number;
}

export class CyGraph {

  constructor(public id: string, public edges: CyEdge[], public nodes: CyNode[]) {
  }

}

interface ICyElement {
  group: string;
}

abstract class CyElement {
  constructor(data: ICyElementData) {
    this.data = data;
  }

  get data(): ICyElementData {
    return this.data;
  }

  set data(data: ICyElementData) {
    this.data = data;
  }
}

export class CyEdge extends CyElement implements ICyElement {

  constructor(data: ICyEdgeData) {
    super(data);
  }

  get group(): string {
    return 'edges';
  }

  get data(): ICyEdgeData {
    return this.data;
  }

  set data(data: ICyEdgeData) {
    this.data = data;
  }
}

export class CyNode extends CyElement implements ICyElement {
  get group(): string {
    return 'nodes';
  }
}

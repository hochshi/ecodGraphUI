import {IDomainAlignment} from '../models/domain.alignment';
import {IOverviewEdge, IOverviewNode} from '../models/overview.models';
import * as collection from '../actions/collection';
import * as graph from '../actions/graph';
import {CyGraph, CyEdge, CyNode} from '../models/cy.graph';
import {Map} from 'immutable';
import {toInteger} from '@ng-bootstrap/ng-bootstrap/util/util';

export interface IState {
  ids: string[];
  entities: Map<string, IDomainAlignment>;
  selected: IOverviewEdge | IOverviewNode | null;
  graph: CyGraph | null;
}
;

const initialState: IState = {
  ids: [],
  entities: Map<string, IDomainAlignment>(),
  selected: null,
  graph: null
};

function neqDomFilter(da: IDomainAlignment, prefid: number): boolean {
  const dom1FidList = da.dom1_fid.split('.').slice(prefid);
  const dom2FidList = da.dom2_fid.split('.').slice(prefid);

  if (dom1FidList.length === 0 || dom2FidList.length === 0) {
    return false;
  }

  if (dom1FidList[0] !== dom2FidList[0]) {
    return true;
  }

  return false;
}

function subArchfilter(da: IDomainAlignment, fid: string): boolean {
  return da.dom1_fid.startsWith(fid) || da.dom2_fid.startsWith(fid);
}

function subArchNodeGen(entities: Map<string, IDomainAlignment>, fidlen: number): CyNode[] {
  var nodes: CyNode[] = entities
    .flatMap(da => {
      var x = Map<string, number>();
      var k1 = da.dom1_fid.split('.').slice(0, fidlen + 1).join('.');
      var k2 = da.dom2_fid.split('.').slice(0, fidlen + 1).join('.');
      return x.set(k1, 1).set(k2, 1);
    })
    .countBy(fid => fid).map((count, fid) => new CyNode({
      'id': fid,
      'size': count
    })).toArray();
  return nodes;
}

function subArchEdgeKey(dom1_fid: string, dom2_fid: string, fidlen: number): String[][] {
  let fid1 = dom1_fid.split('.').slice(0, fidlen + 1);
  let fid2 = dom2_fid.split('.').slice(0, fidlen + 1);

  var key = toInteger(fid1[fid1.length - 1]) <= toInteger(fid2[fid2.length - 1]) ? [[fid1.join('.')], [fid2.join('.')]] : [[fid2.join('.')], [fid1.join('.')]];
  return key;
}

function algnFilter(da: IDomainAlignment, fid1: string, fid2: string): boolean {
  const fid1Arr = fid1.split('.');
  const fid2Arr = fid2.split('.');
  const dom1FidArr = da.dom1_fid.split('.');
  const dom2FidArr = da.dom2_fid.split('.');

  return (dom1FidArr.slice(0, fid1Arr.length) === fid1Arr && dom2FidArr.slice(0, fid2Arr.length) === fid2Arr) ||
    (dom1FidArr.slice(0, fid2Arr.length) === fid2Arr && dom2FidArr.slice(0, fid1Arr.length) === fid1Arr);
}

function subArchEdgeGen(entities: Map<string, IDomainAlignment>, fidlen: number): CyEdge[] {
  return entities
    .filter(da => neqDomFilter(da, fidlen))
    .groupBy(da => {
      subArchEdgeKey(da.dom1_fid, da.dom2_fid, fidlen);
    }).map((group, key) => group.count())
    .map((count, key) => new CyEdge({
      'id': key[0][0] + '_' + key[0][1],
      'size': count,
      'source': key[0][0],
      'target': key[0][1]
    })).toArray();
}

export function reducer(state: IState = initialState, action: graph.Actions | collection.Actions): IState {
  switch (action.type) {
    case collection.ActionTypes.LOAD_SUCCESS: {
      const alignments: IDomainAlignment[] = action.payload;
      const newAlignments = alignments.filter(alignment => !state.entities.has(alignment.id));

      const newAlignmentsIds = newAlignments.map(alignment => alignment.id);

      const entities: Map<string, IDomainAlignment> = newAlignments.reduce(
        function (acc: Map<string, IDomainAlignment>, cur: IDomainAlignment): Map<string, IDomainAlignment> {
          return acc.set(cur.id, cur);
        },
        state.entities);

      var edges = subArchEdgeGen(entities, 0);

      var nodes = subArchNodeGen(entities, 0);

      return {
        ids: [...state.ids, ...newAlignmentsIds],
        entities: entities,
        selected: state.selected,
        graph: new CyGraph('Init', edges, nodes)
      };
    }

    case graph.ActionTypes.DRAW_SUBARCH: {
      const fid = action.payload.fid;
      const fidlen = fid.split('.').length;
      const newEntities: Map<string, IDomainAlignment> = state.entities.filter(da => subArchfilter(da, fid)).toMap();
      const newEdges = subArchEdgeGen(newEntities, fidlen);
      const newNodes = subArchNodeGen(newEntities, fidlen);

      return {
        ids: [...newEntities.keySeq().toArray()],
        entities: newEntities,
        selected: state.selected,
        graph: new CyGraph(fid, newEdges, newNodes)
      };
    }

    case graph.ActionTypes.DRAW_ALIGNMENTS: {
      const fid1 = action.payload.fid1;
      const fid2 = action.payload.fid2;
      const fid1Len = fid1.split('.').length;
      const fid2Len = fid2.split('.').length;

      const newEntities: Map<string, IDomainAlignment> = state.entities.filter(
        da => algnFilter(da, fid1, fid2)).toMap();
      // there should be no difference. The assumption is that fid1Len is equal ro fid2Len
      const newNodes = subArchNodeGen(newEntities, fid1Len);
      const newEdges = subArchEdgeGen(newEntities, fid2Len);

      return {
        ids: [...newEntities.keySeq().toArray()],
        entities: newEntities,
        selected: state.selected,
        graph: new CyGraph(fid1 + '_' + fid2, newEdges, newNodes)
      };
    }

    default: {
      return state;
    }
  }
}

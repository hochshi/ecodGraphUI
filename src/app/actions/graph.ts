import {type} from '../util';
import {Action} from '@ngrx/store';
import {IOverviewNode, IOverviewEdge} from '../models/overview.models';

export const ActionTypes = {
  DRAW_SUBARCH: type('[Graph] Draw Subarch'),
  DRAW_ALIGNMENTS: type('[Graph] Draw Alignments'),
};

export class DrawSubArchAction implements Action {
  type = ActionTypes.DRAW_SUBARCH;

  constructor(public payload: IOverviewNode) {
  }
}

export class DrawAlignments implements Action {
  type = ActionTypes.DRAW_ALIGNMENTS;

  constructor(public payload: IOverviewEdge) {
  }
}

export type Actions
  = DrawSubArchAction
  | DrawAlignments

import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import * as collection from '../actions/collection';
import {IDomainAlignment} from '../models/domain.alignment';


export interface IState {
  loaded: boolean;
  loading: boolean;
  ids: string[];
}
;

const initialState: IState = {
  loaded: false,
  loading: false,
  ids: []
};

export function reducer(state: IState = initialState, action: collection.Actions): IState {
  switch (action.type) {
    case collection.ActionTypes.LOAD:
      return Object.assign({}, state, {
        loading: true
      });

    case collection.ActionTypes.LOAD_SUCCESS:
      const alignments: IDomainAlignment[] = action.payload;

      return {
        loaded: true,
        loading: false,
        ids: alignments.map(alignment => alignment.id)
      };

    default:
      return state;
  }
}


export function getLoaded(state$: Observable<IState>) {
  return state$.select(s => s.loaded);
}

export function getLoading(state$: Observable<IState>) {
  return state$.select(s => s.loading);
}

export function getAlignmentIds(state$: Observable<IState>) {
  return state$.select(s => s.ids);
}

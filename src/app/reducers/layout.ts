import '@ngrx/core/add/operator/select';
import {Observable} from 'rxjs/Observable';
import * as layout from '../actions/layout';


export interface IState {
  showSidenav: boolean;
}

const initialState: IState = {
  showSidenav: false,
};

export function reducer(state: IState = initialState, action: layout.Actions): IState {
  switch (action.type) {
    case layout.ActionTypes.CLOSE_SIDENAV:
      return {
        showSidenav: false
      };

    case layout.ActionTypes.OPEN_SIDENAV:
      return {
        showSidenav: true
      };

    default:
      return state;
  }
}

export function getShowSidenav(state$: Observable<IState>) {
  return state$.select(state => state.showSidenav);
}

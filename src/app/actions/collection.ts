import {Action} from '@ngrx/store';
import {type} from '../util';
import {IDomainAlignment} from '../models/domain.alignment';


export const ActionTypes = {
  LOAD: type('[Collection] Load'),
  LOAD_SUCCESS: type('[Collection] Load Success'),
  LOAD_FAIL: type('[Collection] Load Fail'),
};

/**
 * Load Collection Actions
 */
export class LoadAction implements Action {
  type = ActionTypes.LOAD;

  constructor() {
  }
}

export class LoadSuccessAction implements Action {
  type = ActionTypes.LOAD_SUCCESS;

  constructor(public payload: IDomainAlignment[]) {
  }
}

export class LoadFailAction implements Action {
  type = ActionTypes.LOAD_FAIL;

  constructor(public payload: any) {
  }
}


export type Actions
  = LoadAction
  | LoadSuccessAction
  | LoadFailAction

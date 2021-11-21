import * as types from './actionTypes'

const initialState = {

}

export default function post(state = initialState, action = {}) {
  switch(action.type) {
    case types.GET_POST:
      return {
        ...state,
      }
    default:
      return state
  }
}
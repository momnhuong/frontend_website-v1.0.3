import * as types from './actionTypes'

export function getPost(response) {
  return {
    type: types.GET_POST,
    response
  }
}
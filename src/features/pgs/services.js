import * as actions from './actions'
import * as appAPIs from '../../api/appAPIs'
import {history} from '../../store/history'

export {
  getPost,
  createPost,
  deletePost,
  detailPost,
  updatePost
}

function getPost(page, pageSize) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      appAPIs.getPost(page, pageSize)
        .then(response => {
          dispatch(actions.getPost(response))
          resolve(response)
        })
        .catch(err => {
          console.log('getPost', err)
          reject(err)
        })
    })
  }
}

function createPost(data) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      appAPIs.createPost(data)
        .then(response => {
          history.push('/post')
          window.location.reload()
        })
        .catch(err => {
          console.log('createPost', err)
          reject(err)
        })
    })
  }
}

function deletePost(post_id) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      appAPIs.deletePost(post_id)
        .then(response => {
          window.location.reload()
        })
        .catch(err => {
          console.log('deletePost', err)
          reject(err)
        })
    })
  }
}

function detailPost(post_id) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      appAPIs.detailPost(post_id)
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          console.log('detailPost', err)
          reject(err)
        })
    })
  }
}


function updatePost(data, post_id) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      appAPIs.updatePost(data, post_id)
        .then(response => {
          window.location.reload()
        })
        .catch(err => {
          console.log('updatePost', err)
          reject(err)
        })
    })
  }
}

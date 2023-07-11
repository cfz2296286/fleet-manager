import request from '../utils/request'

const modulePath = 'server/dicttype'

export const queryList = (params) => {
  return request({
    method: 'GET',
    url: modulePath + '/list',
    params: params
  })
}

export const queryOne = (id) => {
  return request({
    method: 'GET',
    url: modulePath + '/info/' + id
  })
}

export const createOne = (data) => {
  return request({
    method: 'POST',
    url: modulePath + '/add',
    data: data
  })
}

export const modifyOne = (data) => {
  return request({
    method: 'POST',
    url: modulePath + '/update',
    data: data
  })
}

export const deleteOne = (id) => {
  return request({
    method: 'POST',
    url: modulePath + '/delete',
    data: { id }
  })
}

export const deleteMany = async (ids) => {
  for (let id of ids) {
    await deleteOne(id)
  }
}
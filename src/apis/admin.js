import request from '../utils/request'

const modulePath = '/server/operators_info_new/'

export const queryList = (params) => {
  return request({
    method: 'GET',
    url: modulePath,
    params: params
  })
}

export const queryOne = (id) => {
  return request({
    method: 'GET',
    url: modulePath,
    params: {
      id: id
    }
  })
}

export const createOne = (data) => {
  return request({
    method: 'POST',
    url: modulePath ,
    data: data
  })
}


export const modifyOne = (data) => {
  return request({
    method: 'PUT',
    url: modulePath + data.operators_id + "/",
    data: data
  })
}

export const deleteOne = (id) => {
  return request({
    method: 'DELETE',
    url: modulePath + id + "/",
    data: { id }
  })
}

export const deleteMany = async (ids) => {
  for (let id of ids) {
    await deleteOne(id)
  }
}

export const bindRole = (data) => {
  return request({
    method: 'POST',
    url: modulePath + '/bindRole',
    data: data
  })
}

export const resetPass = (data) => {
  return request({
    method: 'POST',
    url: modulePath + '/reset',
    data: data
  })
}
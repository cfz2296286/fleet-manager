import request from '../utils/request'

const modulePath = 'server/car_info/'

export const queryList = (params) => {
  return request({
    method: 'GET',
    url: modulePath,
    params: params
  })
}

export const createOne = (data) => {
  return request({
    method: 'POST',
    url: modulePath,
    data: data
  })
}

export const modifyOne = (data) => {
  return request({
    method: 'PUT',
    url: modulePath + data.car_id + "/",
    data: data
  })
}

export const deleteOne = (id) => {
  return request({
    method: 'DELETE',
    url: modulePath + id + "/",
  })
}

export const deleteMany = async (ids) => {
  for (let id of ids) {
    await deleteOne(id)
  }
}
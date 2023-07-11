import request from '../utils/request'

const modulePath = '/server/data_info/'

export const queryList = (params) => {
  return request({
    method: 'POST',
    url: modulePath,
    params: params
  })
}

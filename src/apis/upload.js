import request from '../utils/request'

// 查询工厂系统
export const uploadFile = (data) => {
  return request({
    method: 'POST',
    url: 'common/file/upload',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: data
  })
}
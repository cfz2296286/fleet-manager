import request from '../utils/request'

const modulePath = 'server/user'

export const queryList = (params) => {
	return new Promise((resolve, reject)=>{
	setTimeout(()=>{
	  resolve({
		total: 3,
		records:[
			{
				userName: 1,
				nickName: '123',
				phone: '订单管理',
				email:"23",
				createTime: 187213456
			},
		]
	  })
	},800)
	})
  return request({
    method: 'GET',
    url: modulePath + '/list',
    params: params
  })
}

import request from '../utils/request'

const modulePath = 'server/statement_info/'

export const queryList = (params) => {
	// return new Promise((resolve, reject)=>{
	// setTimeout(()=>{
	//   resolve({
	// 	total: 3,
	// 	records:[
	// 		{
	// 			userName: 1,
	// 			nickName: '123',
	// 			phone: '2022-12',
	// 			email:"23",
	// 			verhicle:"23",
	// 			createTime: 187213456
	// 		},
	// 	]
	//   })
	// },800)
	// })
  return request({
    method: 'GET',
    url: modulePath,
    params: params
  })
}

export const download = (params) =>{
	return request({
	method: 'GET',
	url: 'server/statement_url/',
	params: params
	})
}

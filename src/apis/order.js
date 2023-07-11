import request from '../utils/request'

const modulePath = '/server/charge_order/'

export const queryList = (params) => {
  // return new Promise((resolve, reject)=>{
  //   setTimeout(()=>{
  //     resolve({
  //       results: [
  //         {order_id: 1,order_start_datetime:'2023-02-03 13:12:22',order_end_datetime:'2023-02-03 13:12:22',charge_capacity:'123',order_fee:'12',pile_id_fk:'11',user_id_fk:'123'},
  //         {order_id: 1,order_start_datetime:'2023-02-03 13:12:22',order_end_datetime:'2023-02-03 13:12:22',charge_capacity:'123',order_fee:'12',pile_id_fk:'11',user_id_fk:'123'},
  //         {order_id: 1,order_start_datetime:'2023-02-03 13:12:22',order_end_datetime:'2023-02-03 13:12:22',charge_capacity:'123',order_fee:'12',pile_id_fk:'11',user_id_fk:'123'},
  //         {order_id: 1,order_start_datetime:'2023-02-03 13:12:22',order_end_datetime:'2023-02-03 13:12:22',charge_capacity:'123',order_fee:'12',pile_id_fk:'11',user_id_fk:'123'},
  //         {order_id: 1,order_start_datetime:'2023-02-03 13:12:22',order_end_datetime:'2023-02-03 13:12:22',charge_capacity:'123',order_fee:'12',pile_id_fk:'11',user_id_fk:'123'},
  //         {order_id: 1,order_start_datetime:'2023-02-03 13:12:22',order_end_datetime:'2023-02-03 13:12:22',charge_capacity:'123',order_fee:'12',pile_id_fk:'11',user_id_fk:'123'},
  //         {order_id: 1,order_start_datetime:'2023-02-03 13:12:22',order_end_datetime:'2023-02-03 13:12:22',charge_capacity:'123',order_fee:'12',pile_id_fk:'11',user_id_fk:'123'},
  //         {order_id: 1,order_start_datetime:'2023-02-03 13:12:22',order_end_datetime:'2023-02-03 13:12:22',charge_capacity:'123',order_fee:'12',pile_id_fk:'11',user_id_fk:'123'},
  //         {order_id: 1,order_start_datetime:'2023-02-03 13:12:22',order_end_datetime:'2023-02-03 13:12:22',charge_capacity:'123',order_fee:'12',pile_id_fk:'11',user_id_fk:'123'},
  //         {order_id: 1,order_start_datetime:'2023-02-03 13:12:22',order_end_datetime:'2023-02-03 13:12:22',charge_capacity:'123',order_fee:'12',pile_id_fk:'11',user_id_fk:'123'},
  //       ],
  //       count: 101
  //     })
  //   }, 800)
  // })
  return request({
    method: 'GET',
    url: modulePath,
    params: params
  })
}
export const queryOne= (id)=>{
  return request({
    method: 'GET',
    url: modulePath + id + "/",
  })
}

export const deleteOne = (id) => {
  return request({
    method: 'DELETE',
    url: modulePath + id + "/",
    data: { id }
  })
}

export const modifyOne = (data) => {
  return request({
    method: 'PUT',
    url: modulePath + data.order_id + "/",
    data: data
  })
}

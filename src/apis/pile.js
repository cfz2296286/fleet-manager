import request from '../utils/request'

const modulePath = '/server/get_charge_pile/'

export const queryList = (params) => {
  // return new Promise((resolve, reject)=>{
  //   setTimeout(()=>{
  //     resolve({
  //       results: [
  //         {pile_id: 1,pile_type:'2023-02-03 13:12:22',pile_model:'2023-02-03 13:12:22',address:'123',pile_sn:'12',pile_vendor:'11',pile_metrfirmwareversion:'123',pile_ratekw:'255',pile_connect_no:'123',pile_outputcurrentmax:'44',is_operation:'是'},
  //         {pile_id: 1,pile_type:'2023-02-03 13:12:22',pile_model:'2023-02-03 13:12:22',address:'123',pile_sn:'12',pile_vendor:'11',pile_metrfirmwareversion:'123',pile_ratekw:'255',pile_connect_no:'123',pile_outputcurrentmax:'44',is_operation:'是'},
  //         {pile_id: 1,pile_type:'2023-02-03 13:12:22',pile_model:'2023-02-03 13:12:22',address:'123',pile_sn:'12',pile_vendor:'11',pile_metrfirmwareversion:'123',pile_ratekw:'255',pile_connect_no:'123',pile_outputcurrentmax:'44',is_operation:'是'},
  //         {pile_id: 1,pile_type:'2023-02-03 13:12:22',pile_model:'2023-02-03 13:12:22',address:'123',pile_sn:'12',pile_vendor:'11',pile_metrfirmwareversion:'123',pile_ratekw:'255',pile_connect_no:'123',pile_outputcurrentmax:'44',is_operation:'是'},
  //         {pile_id: 1,pile_type:'2023-02-03 13:12:22',pile_model:'2023-02-03 13:12:22',address:'123',pile_sn:'12',pile_vendor:'11',pile_metrfirmwareversion:'123',pile_ratekw:'255',pile_connect_no:'123',pile_outputcurrentmax:'44',is_operation:'是'},
  //         {pile_id: 1,pile_type:'2023-02-03 13:12:22',pile_model:'2023-02-03 13:12:22',address:'123',pile_sn:'12',pile_vendor:'11',pile_metrfirmwareversion:'123',pile_ratekw:'255',pile_connect_no:'123',pile_outputcurrentmax:'44',is_operation:'是'},
  //         {pile_id: 1,pile_type:'2023-02-03 13:12:22',pile_model:'2023-02-03 13:12:22',address:'123',pile_sn:'12',pile_vendor:'11',pile_metrfirmwareversion:'123',pile_ratekw:'255',pile_connect_no:'123',pile_outputcurrentmax:'44',is_operation:'是'},
  //         {pile_id: 1,pile_type:'2023-02-03 13:12:22',pile_model:'2023-02-03 13:12:22',address:'123',pile_sn:'12',pile_vendor:'11',pile_metrfirmwareversion:'123',pile_ratekw:'255',pile_connect_no:'123',pile_outputcurrentmax:'44',is_operation:'是'},
  //         {pile_id: 1,pile_type:'2023-02-03 13:12:22',pile_model:'2023-02-03 13:12:22',address:'123',pile_sn:'12',pile_vendor:'11',pile_metrfirmwareversion:'123',pile_ratekw:'255',pile_connect_no:'123',pile_outputcurrentmax:'44',is_operation:'是'},
  //         {pile_id: 1,pile_type:'2023-02-03 13:12:22',pile_model:'2023-02-03 13:12:22',address:'123',pile_sn:'12',pile_vendor:'11',pile_metrfirmwareversion:'123',pile_ratekw:'255',pile_connect_no:'123',pile_outputcurrentmax:'44',is_operation:'是'},
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

export const queryOne = (id) => {
  return request({
    method: 'GET',
    url: modulePath,
    data: { id }
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
    method: 'put',
    url: modulePath + data.pile_id + "/",
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

export const startOne = (data) => {
  return request({
    method: 'POST',
    url: '/server/start_ocpp/',
    timeout: 999 * 1000,
    data: data
  })
}


export const stopOne = (data) => {
  return request({
    method: 'POST',
    url: '/server/stop_ocpp/',
    timeout: 999 * 1000,
    data: data
  })
}
import request from '@/utils/request'

// 登录
export const login = (data) => {
  return request({
    method: 'POST',
    url: '/server/login/',
    data:data
  })
}

// 退出登录
export const logout = (data) => {
  return request({
    method: 'POST',
    url: '/server/logout/',
    data:data
  })
}

// 获取当前登录用户
export const queryCurUser = ({ noErrorMessage } = {}) => {
  return request({
    method: 'GET',
    url: '/server/currentuser/',
    noErrorMessage
  })
}

// 修改密码功能
export const changePwd = (data) => {
  return request({
    method: 'POST',
    url: '/server/password/',
    data
  })
}

// 获取当前用户菜单
export const queryCurUserNavs = ()=>{
  if(localStorage.getItem("is_superuser")=='true'){
    return new Promise((resolve, reject)=>{
      resolve([
        {
          menuId: 1,
          path: '/',
          name: 'Dashboard',
        },
        {
          menuId: 1,
          path: '/order',
          name: 'Order Management',
        },
        {
          menuId: 1,
          path: '/station',
          name: 'Charging Station Management',
        },
        {
          menuId: 2,
          path: '/pile',
          name: 'Charging Pile Management',
          children:[
            {
              menuId: 1,
              path: '/pile',
              name: 'Charging Pile Management',
            },
            {
              menuId: 2,
              path: '/equipment',
              name: 'Equipment Monitoring',
            },
            // {
            //   menuId: 2,
            //   path: '/electricity',
            //   name: '用电监控',
            // },
          ]
        },
        {
          menuId: 3,
          path: '/user',
          name: 'User Management',
        },
        {
          menuId: 4,
          path: '/admin',
          name: 'Operator Management',
        },
        // {
        //   menuId: 5,
        //   path: '/dict',
        //   name: '字典管理',
        // },
        {
          menuId: 6,
          path: '/vehicle',
          name: 'Vehicle Management',
        },
        {
          menuId: 7,
          path: '/record',
          name: 'Price Management',
        },
        // 暂时隐藏
        // {
        //   menuId: 8,
        //   path: '/integral',
        //   name: '积分管理',
        // },
        {
          menuId: 10,
          path: '/reconciliation',
          name: 'Statement Management',
        },
      ])
    })
  }else{
    return new Promise((resolve, reject)=>{
      resolve([
        {
          menuId: 1,
          path: '/',
          name: 'Dashboard',
        },
        {
          menuId: 1,
          path: '/order',
          name: 'Order Management',
        },
        {
          menuId: 1,
          path: '/station',
          name: 'Charging Station Management',
        },
        {
          menuId: 2,
          path: '/pile',
          name: 'Charging Pile Management',
          children:[
            {
              menuId: 1,
              path: '/pile',
              name: 'Charging Pile Management',
            },
            {
              menuId: 2,
              path: '/equipment',
              name: 'Equipment Monitoring',
            },
          ]
        },
        {
          menuId: 6,
          path: '/vehicle',
          name: 'Vehicle Management',
        },
        {
          menuId: 7,
          path: '/record',
          name: 'Price Management',
        },
        // 暂时隐藏
        // {
        //   menuId: 8,
        //   path: '/integral',
        //   name: '积分管理',
        // },
        {
          menuId: 10,
          path: '/reconciliation',
          name: 'Statement Management',
        },
      ])
    })
  }
  // return request({
  //   method: 'GET',
  //   url: '/server/sys/menu/nav'
  // })
}
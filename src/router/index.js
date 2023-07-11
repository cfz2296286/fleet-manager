import { createRouter, createWebHashHistory } from 'vue-router'
import { message} from 'ant-design-vue';
import routes from './routes'

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.needLogin) {
    //页面是否登录
    if (localStorage.getItem("token")) {
      //本地存储中是否有token(uid)数据
      next(); //表示已经登录
    } else {
      message.warning('Operate after logging in')
      //next可以传递一个路由对象作为参数 表示需要跳转到的页面
      next({
        name: "Login"
      });
    }
  } else {
    //表示不需要登录
    next(); //继续往后走
  }
  // if (window.loadingBar) {
  //   window.loadingBar.start()
  // }
  document.title = to?.meta?.title
})

// router.afterEach((to, from) => {
//   if (window.loadingBar) {
//     window.loadingBar.finish()
//   }
// })

export default router
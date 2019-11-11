import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

Vue.use(Router)

import Layout from '@/layout'
import NavTest from './modules/nav-test'
import {
  Message
} from 'element-ui'
import getTitle from '@/utils/getTitle'
import DemandManage from './modules/demand-manage'

import Home from '@/components/tabbar/HomeContainer.vue'
import Cateory from '@/components/tabbar/CateoryContainer.vue'
import Shopcar from '@/components/tabbar/ShopcarContainer.vue'
import Member from '@/components/tabbar/MemberContainer.vue'
/**
 * 路由相关属性说明
 * hidden: 当设置hidden为true时，意思不在sideBars侧边栏中显示
 * mete{
 * title: xxx,  设置sideBars侧边栏名称
 * icon: xxx,  设置ideBars侧边栏图标
 * noCache: true  当设置为true时不缓存该路由页面
 * }
 */

/*通用routers*/
export const currencyRoutes = [
  { path: '/', redirect: '/home' },
  { path: '/home', component: Home },
  { path: '/cateory', component: Cateory },
  { path: '/shopcar', component: Shopcar },
  { path: '/member', component: Member }
]
/*动态添加routers*/
export const asyncRoutes = []
const creatRouter = () => {
  return new Router({
    routes: currencyRoutes,
    scrollBehavior() {
      return {
        x: 0,
        y: 0
      }
    },
    linkActiveClass: 'mui-active'
  })
}

const router = creatRouter()

// 解决addRoute不能删除动态路由问题
export function resetRouter() {
  // const reset = creatRouter()
  // router.matcher = reset.matcher
}

// 导航守卫
router.beforeEach(async (to, from, next) => {
  next()
  // document.title = getTitle(to.meta.title)
  // if (to.path === '/login') {
  //   next()
  // } else {
  //   if (store.getters.token) {
  //     const hasRoles = store.getters.roles.length > 0
  //     if (hasRoles) {
  //       next()
  //     } else {
  //       try {
  //         const { roles } = await store.dispatch('user/_getInfo')
  //         const addRoutes = await store.dispatch(
  //           'permission/getAsyncRoutes',
  //           roles
  //         )
  //         router.addRoutes(addRoutes)

  //         // hack method to ensure that addRoutes is complete
  //         // set the replace: true, so the navigation will not leave a history record
  //         next({ ...to, replace: true })
  //       } catch (error) {
  //         Message.error(error)
  //       }
  //     }
  //   } else {
  //     next({
  //       path: '/login',
  //       query: {
  //         redirect: to.fullPath
  //       }
  //     })
  //   }
  // }
}) 

export default router

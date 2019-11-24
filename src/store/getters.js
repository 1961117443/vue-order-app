const getters = {
  token: state => state.user.token,
  userName: state => state.user.userName,
  roles: state => state.user.roles,
  introduce: state => state.user.introduce,
  routes: state => state.permission.routes,
  addRoutes: state => state.permission.addRoutes,
  opened: state => {
    if (state.app.opened === 'false') {
      return false
    } else if (state.app.opened === 'true') {
      return true
    }
  },
  msgIsShow: state => state.app.msgIsShow,
  showDriver: state => state.app.showDriver,
  shopCarAllCount: state => {
    let c = 0
    state.order.car.forEach(item => {
      c += item.count
    })
    return c
  },
  showCarList: state => state.order.car
}
export default getters

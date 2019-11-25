var car = JSON.parse(localStorage.getItem('car') || '[]')
const state = {
  //购物车中的数据: {id：商品id,count:数量,price:商品单价,selected:是否被选中}
  car: car
}
const mutations = {
  addToCar(state, data) {
    console.log('addToCar')
    let flag = false
    state.car.some(item => {
      if (item.id == data.id) {
        item.count = parseInt(item.count) + parseInt(data.count)
        flag = true
        return true
      }
    })
    if (!flag) {
      state.car.push(data)
    }
    localStorage.setItem('car', JSON.stringify(state.car))
  },
  removeFromCar(state, data) {
    state.car.some((item, i) => {
      if (item.id == data.id) {
        state.car.splice(i, 1)
        return true
      }
    })
    localStorage.setItem('car', JSON.stringify(state.car))
  },
  //是否全选
  selectedAll(state, data) {
    state.car.forEach(item => {
      item.selected = data.selected
    })
    localStorage.setItem('car', JSON.stringify(state.car))
  }
}
// const actions = {

// }
export default {
  namespaced: true,
  state,
  mutations
}

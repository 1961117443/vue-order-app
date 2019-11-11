import $axios from './index'
const baseURL = `https://www.fastmock.site/mock/e673cd93eab0f0753118b7505c4f245b/admin`
export function getPageTab1(params) {
  const url = '/getPageData1'
  return $axios.get(url, params)
}
export function getPageTab2() {
  const url = '/getPageData2'
  return $axios.get(url)
}
export function getDemandList(params) {
  const url = baseURL + '/demands/list'
  // const url = '/getPageData2'
  return $axios.get(url, params)
}

export function create(data) {
  const url = baseURL + '/demands/create'
  // const url = '/getPageData2'
  return $axios.post(url, data)
}

export function confirm(data) {
  const url = baseURL + '/demands/audit'
  return $axios.post(url, data)
}

export function getDemandAssign() {
  const url = baseURL + '/demands/assign'
  return $axios.get(url)
}

export function getDemandJobs(data) {
  const url = baseURL + '/demands/jobs'
  return $axios.get(url, data)
}

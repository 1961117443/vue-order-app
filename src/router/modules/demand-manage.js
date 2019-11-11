import Layout from '@/layout'
const demandManage = {
  path: '/demand',
  component: Layout,
  name: 'DemandManage',
  meta: { title: '需求管理', icon: 'el-icon-s-grid' },
  redirect: '/nav-test/nav1',
  children: [
    {
      path: 'list',
      name: 'DemandList',
      component: () => import('@/views/demand/list'),
      meta: { title: '需求列表', icon: 'el-icon-coffee' }
    },
    {
      path: 'assign',
      name: 'DemandAssign',
      component: () => import('@/views/demand/assign'),
      meta: { title: '需求指派', icon: 'el-icon-cherry' }
    },
    {
      path: 'jobs',
      name: 'DemandJobs',
      component: () => import('@/views/demand/jobs'),
      meta: { title: '任务列表', icon: 'el-icon-cherry' }
    }
  ]
}
export default demandManage

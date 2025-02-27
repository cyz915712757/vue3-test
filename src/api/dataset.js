import request from 'axios'

export default {
  //获取数据集列表
  getFusionList(params) {
    return request({
      url: '/linkcenter/admin/linkrulev2/list',
      method: 'get',
      params,
    })
  },
  //获取数据集列表
  getDataSetList(params) {
    return request({
      url: '/ai/dataset/list',
      method: 'get',
      params,
    })
  },
  //获取数据集详情
  getDataSetDetail(id) {
    return request({
      url: '/ai/dataset/detail',
      method: 'get',
      params: {
        id,
      },
    })
  },
}

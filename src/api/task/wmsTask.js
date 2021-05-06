import request from '@/utils/request'

export function selectWmsTaskList (data) {
  return request({
    url: '/wms/list',
    method: 'get',
    params: data
  })
}

export function doWmsTask (wmsTaskId) {
  return request({
    url: '/wms/do/' + wmsTaskId,
    method: 'post',
  })
}
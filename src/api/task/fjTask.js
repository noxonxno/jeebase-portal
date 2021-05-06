import request from '@/utils/request'

export function selectFjTaskList (data) {
  return request({
    url: '/fj/list',
    method: 'get',
    params: data
  })
}

export function doFjTask (fjTaskId) {
  return request({
    url: '/fj/do/' + fjTaskId,
    method: 'post',
  })
}
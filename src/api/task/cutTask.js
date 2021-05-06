import request from '@/utils/request'

export function selectCutTaskList (data) {
  return request({
    url: '/cut/list',
    method: 'get',
    params: data
  })
}

export function doCutTask (cutTaskId) {
  return request({
    url: '/cut/do/' + cutTaskId,
    method: 'post',
  })
}
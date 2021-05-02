import request from '@/utils/request'

export function selectTrayList(data) {
  return request({
    url: '/tary/list',
    method: 'get',
    params: data
  })
}

export function addTary(data) {
  return request({
    url: '/tary/addTary',
    method: 'post',
    data
  })
}

export function updateTary(data) {
  return request({
    url: '/tary/updateTary',
    method: 'post',
    data
  })
}

export function deleteTaryById(taryId) {
  return request({
    url: '/tary/deleteTaryById/' + taryId,
    method: 'post'
  })
}

export function batchUpdate(taryFixNum) {
  return request({
    url: '/tary/batchUpdate/' + taryFixNum,
    method: 'post'
  })
}


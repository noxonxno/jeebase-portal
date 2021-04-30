import request from '@/utils/request'

export function selectLapiList(data) {
    return request({
      url: '/api/apiList',
      method: 'get',
      params: data
    })
}

export function addApiInfo(data) {
  return request({
    url: '/api/addApiInfo',
    method: 'post',
    data
  })
}

export function updateApiInfo(data) {
  return request({
    url: '/api/updateApiInfo',
    method: 'post',
    data
  })
}

export function deleteApiInfo(apiId) {
  return request({
    url: '/api/deleteApiInfo/' + apiId,
    method: 'post'
  })
}

export function testApiInfo(data) {
  return request({
    url: '/api/testApiInfo',
    method: 'post',
    data
  })
}


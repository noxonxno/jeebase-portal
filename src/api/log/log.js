import request from '@/utils/request'

export function listDeviceLog(data) {
  return request({
    url: '/devicelog/listDeviceLog',
    method: 'get',
    params: data
  })
}

export function listErrLog(data) {
  return request({
    url: '/errlog/listErrLog',
    method: 'get',
    params: data
  })
}

export function listTaskLog(data) {
  return request({
    url: '/tasklog/listTaskLog',
    method: 'get',
    params: data
  })
}


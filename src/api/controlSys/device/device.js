import request from '@/utils/request'

export function selectDeviceList(data) {
    return request({
      url: '/device/deviceList',
      method: 'get',
      params: data
    })
}

export function addDevice(data) {
  return request({
    url: '/device/addDevice',
    method: 'post',
    data
  })
}

export function updateDevice(data) {
  return request({
    url: '/device/updateDevice',
    method: 'post',
    data
  })
}

export function deleteDevice(deviceId) {
  return request({
    url: '/device/deleteDevice/' + deviceId,
    method: 'post'
  })
}


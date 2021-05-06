import request from '@/utils/request'

export function selectListPlcInfo(data) {
  return request({
    url: '/plc/listPlcInfo',
    method: 'get',
    params: data
  })
}

export function addPlcInfo(data) {
  return request({
    url: '/plc/addPlcInfo',
    method: 'post',
    data
  })
}

export function updatePlcInfo(data) {
  return request({
    url: '/plc/updatePlcInfo',
    method: 'post',
    data
  })
}

export function deletePlcInfo(plcId) {
  return request({
    url: '/plc/deletePlcInfo/' + plcId,
    method: 'post'
  })
}

export function selectDeviceCodeMap() {
  return request({
    url: '/device/selectDeviceCodeMap',
    method: 'post'
  })
}


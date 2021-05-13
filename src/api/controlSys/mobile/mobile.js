import request from '@/utils/request'

export function selectPartList(data) {
  return request({
    url: '/part/partList',
    method: 'get',
    params: data
  })
}

export function addPart(data) {
  return request({
    url: '/part/addPart',
    method: 'get',
    params: data
  })
}



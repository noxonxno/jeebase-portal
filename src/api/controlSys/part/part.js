import request from '@/utils/request'

export function pcPartList(data) {
  return request({
    url: '/part/pcPartList',
    method: 'get',
    params: data
  })
}

export function pcAddPart(data) {
  return request({
    url: '/part/pcAddPart',
    method: 'post',
    data
  })
}

export function updatePart(data) {
  return request({
    url: '/part/updatePart',
    method: 'post',
    data
  })
}

export function removePart(partId) {
  return request({
    url: '/part/removePart/' + partId,
    method: 'post'
  })
}


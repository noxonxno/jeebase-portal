import request from '@/utils/request'

export function selectMesAdivceist (data) {
  return request({
    url: '/plan/mesAdivce/list',
    method: 'get',
    params: data
  })
}




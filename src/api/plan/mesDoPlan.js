import request from '@/utils/request'

export function selectMesDoPlanList (data) {
  return request({
    url: '/plan/mesDoPlan/list',
    method: 'get',
    params: data
  })
}



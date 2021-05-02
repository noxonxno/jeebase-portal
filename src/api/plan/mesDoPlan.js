import request from '@/utils/request'

export function selectMesDoPlanList (data) {
  return request({
    url: '/mesDoPlan/list',
    method: 'get',
    params: data
  })
}



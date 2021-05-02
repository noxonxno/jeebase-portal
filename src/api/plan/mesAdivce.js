import request from '@/utils/request'

export function selectMesAdviceList (data) {
  return request({
    url: '/mesAdvice/list',
    method: 'get',
    params: data
  })
}

export function importExl (data) {
  return request({
    url: '/mesAdvice/importExcel',
    method: 'post',
    data
  })
}

export function getDetails (id) {
  return request({
    url: '/mesAdvice/details?mesAdviceId=' + id,
    method: 'get',

  })
}




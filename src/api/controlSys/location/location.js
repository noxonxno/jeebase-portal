import request from '@/utils/request'

export function selectLocationList(data) {
    return request({
      url: '/location/locationList',
      method: 'get',
      params: data
    })
}

export function addLocation(data) {
  return request({
    url: '/location/addLocation',
    method: 'post',
    data
  })
}

export function updateLocation(data) {
  return request({
    url: '/location/updateLocation',
    method: 'post',
    data
  })
}

export function removeLocation(locationId) {
  return request({
    url: '/location/removeLocation/' + locationId,
    method: 'post'
  })
}


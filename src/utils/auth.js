import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const PcOrMobile = 'PcOrMobile'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getPcOrMobile() {
  return Cookies.get(PcOrMobile)
}

export function setPcOrMobile(pcOrMobile) {
  return Cookies.set(PcOrMobile, pcOrMobile)
}

export function removePcOrMobile() {
  return Cookies.remove(PcOrMobile)
}

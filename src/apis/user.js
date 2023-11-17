import axios from '../axios'

export const apiRegister = (data) =>
  axios({
    url: '/register',
    method: 'post',
    data
  })

export const apiLogin = (data) =>
  axios({
    url: '/login',
    method: 'post',
    data
  })

export const showProfile = () =>
  axios({
    url: '/show-profile',
    method: 'get'
  })

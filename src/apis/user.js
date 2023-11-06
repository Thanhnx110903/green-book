import axios from '../axios'

export const apiRegister = (data) =>
  axios({
    url: '/user/sign-up',
    method: 'post',
    data
  })

export const apiLogin = (data) =>
  axios({
    url: '/user/sign-in',
    method: 'post',
    data
  })

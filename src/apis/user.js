import axiosClent from '../axios'
import axios from 'axios'
export const apiRegister = (data) =>
  axios({
    url: 'http://localhost:8000/api/register',
    method: 'post',
    data,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
      // Thêm các header khác nếu cần
    }
  })

export const apiLogin = (data) =>
  axiosClent({
    url: '/login',
    method: 'post',
    data
  })

export const showProfile = () =>
  axiosClent({
    url: '/show-profile',
    method: 'get'
  })

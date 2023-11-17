import axios from '../axios'

export const apiBooks = (param) =>
  axios({
    url: '/book',
    method: 'get',
    param
  })

export const getBook = (pid) =>
  axios({
    url: '/book/show/' + pid,
    method: 'get'
  })

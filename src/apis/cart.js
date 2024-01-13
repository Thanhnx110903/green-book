import axios from '../axios'
export const getCarts = (param) =>
  axios({
    url: '/cart',
    method: 'get',
    param
  })

export const addCart = (pid) =>
  axios({
    url: '/cart/add-new/' + pid,
    method: 'post'
  })

export const updateCart = (Cart, pid) =>
  axios({
    url: '/cart/update/' + pid,
    method: 'put',
    data: Cart
  })

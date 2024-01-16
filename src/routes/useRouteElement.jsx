import React from 'react'
import { useRoutes } from 'react-router-dom'
import Home from '../pages/Home'
import News from '../pages/News'
import LayoutDefault from '../Layouts/LayoutDefault'
import Login from '../pages/Login'
import Register from '../pages/Register'
import ProductDetail from '../pages/ProductDetail'
import Cart from '../pages/Cart'
import Polyci from '../pages/Polyci'
import ListProducts from '../pages/ListProducts/ListProducts'
import NotFound from '../pages/NotFound'
import Profile from '../pages/Profile'
import Checkout from '../pages/Checkout'
import BillDetail from '../pages/BillDetail'
import Voucher from '../pages/Voucher'
import Otp from '../pages/Otp'
import ForgotPassword from '../pages/ForgotPassword'
import ChangePassword from '../pages/ChangePassword'
import SeachOrder from '../pages/SearchOrder'

export default function useRoutElement() {
  const routeElement = useRoutes([
    {
      path: '/',
      element: (
        <LayoutDefault>
          <Home />
        </LayoutDefault>
      )
    },
    {
      path: '/:category',
      element: (
        <LayoutDefault>
          <ListProducts />
        </LayoutDefault>
      )
    },
    {
      path: '/news',
      element: (
        <LayoutDefault>
          <News />
        </LayoutDefault>
      )
    },
    {
      path: '/checkout',
      element: (
        <>
          <Checkout />
        </>
      )
    },
    {
      path: 'product/:id',
      element: (
        <LayoutDefault>
          <ProductDetail />
        </LayoutDefault>
      )
    },
    {
      path: '/cart',
      element: (
        <LayoutDefault>
          <Cart />
        </LayoutDefault>
      )
    },
    {
      path: '/polyci',
      element: (
        <Polyci>
          <Cart />
        </Polyci>
      )
    },
    {
      path: '/search-order',
      element: (
        <LayoutDefault>
          <SeachOrder />
        </LayoutDefault>
      )
    },
    {
      path: '/login',
      element: (
        <LayoutDefault>
          <Login />
        </LayoutDefault>
      )
    },
    {
      path: '/register',
      element: (
        <LayoutDefault>
          <Register />
        </LayoutDefault>
      )
    },
    {
      path: '/profile',
      element: (
        <LayoutDefault>
          <Profile />
        </LayoutDefault>
      )
    },
    {
      path: '/order/:id',
      element: (
        <LayoutDefault>
          <BillDetail />
        </LayoutDefault>
      )
    },
    {
      path: '/otp',
      element: (
        <LayoutDefault>
          <Otp />
        </LayoutDefault>
      )
    },
    {
      path: '/forgot_password',
      element: (
        <LayoutDefault>
          <ForgotPassword />
        </LayoutDefault>
      )
    },
    {
      path: '/change_password',
      element: (
        <LayoutDefault>
          <ChangePassword />
        </LayoutDefault>
      )
    },
    {
      path: '/voucher',
      element: (
        <LayoutDefault>
          <Voucher />
        </LayoutDefault>
      )
    },
    {
      path: '*',
      element: <NotFound />
    }
  ])
  return routeElement
}

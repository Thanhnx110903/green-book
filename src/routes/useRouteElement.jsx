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
      path: '/:pid/:name',
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
    }
  ])
  return routeElement
}

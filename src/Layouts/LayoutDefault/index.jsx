import React, { useEffect } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

// eslint-disable-next-line react/prop-types
export default function LayoutDefault({ children }) {
  return (
    <div className='mx-2'>
      <Header />
      {children}
      <Footer />
    </div>
  )
}

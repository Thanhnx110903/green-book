import React, { useEffect } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

// eslint-disable-next-line react/prop-types
export default function LayoutDefault({ children }) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  )
}

import React, { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { message } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'
export default function ProtectRouter({ children }) {
  const navigate = useNavigate()
  const [cookies] = useCookies(['userInfor'])
  const location = useLocation()
  useEffect(() => {
    if (!cookies?.userInfor?.access_token) {
      message.success('Vui lòng đăng nhập để thực hiện tính năng này')
      navigate('/login')
    }
  }, [cookies?.userInfor, location.pathname, location])
  return <div>{children}</div>
}

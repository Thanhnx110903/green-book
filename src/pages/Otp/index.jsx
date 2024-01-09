import React, { useEffect } from 'react'
import classNames from 'classnames/bind'
import { Checkbox, Form, Input, Select, DatePicker, message } from 'antd'
import styles from './Otp.module.css'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import Button from '../../components/Button/Button'
import { useSendOtpMutation, useVetifyAccoutMutation } from '../../redux/api/auth'
import { useCookies } from 'react-cookie'
const cx = classNames.bind(styles)
export default function Otp() {
  const [cookies] = useCookies(['userInfor'])
  const location = useLocation()
  const [sendOtp] = useSendOtpMutation()
  const [verifyAcc] = useVetifyAccoutMutation()
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const onFinish = (values) => {
    if (values) {
      const email = JSON.parse(localStorage.getItem('emailverify'))
      console.log(email)
      verifyAcc({
        otp: values?.otp,
        email
      })
        .unwrap()
        .then((item) => {
          message.success(item?.message)
          form.resetFields()
          navigate('/login')
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }
  useEffect(() => {
    if (cookies?.userInfor?.access_token) {
      navigate('/')
    }
  }, [cookies?.userInfor, location.pathname, location])
  return (
    <div>
      <div className={cx('bg-[#f6f6f6] py-[6px] mb-[36px]')}>
        <div className={cx('container-wrap text-[1.4rem] ')}>
          <Link className={cx('text-[#999]')} to='/'>
            Trang chủ /
          </Link>
          <span>Otp</span>
        </div>
      </div>
      <div className='flex min-h-full flex-col justify-center lg:px-8'>
        <div className='sm:mx-auto w-full max-w-lg'>
          <h4 className=' text-center text-[2.5rem] mb-[10px] leading-9 tracking-tight text-gray-900'>
            NHẬP MÃ XÁC MINH
          </h4>
          <div>
            <h3 className='text-[1.8rem] font-medium text-center mt-[60px] mb-[20px]'>Nhập mã</h3>
          </div>
        </div>
        <Form
          name='basic'
          className='max-w-[500px] mx-auto w-full text-[20px]'
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete='off'
          layout='vertical'
          form={form}
        >
          <Form.Item
            label='Mã xác minh'
            name='otp'
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập mã otp'
              }
            ]}
          >
            <Input className='min-h-[40px] rounded-lg text-[16px]' />
          </Form.Item>
          <span className='text-[13px] cursor-pointer'>Gửi lại otp</span>
          <div className='mt-6'>
            <Button type='submit' name='Xác nhận' />
          </div>
          <div className='sm:mx-auto w-full max-w-lg mb-[50px]'>
            <h3 className='mt-[40px] mb-[16px] text-center text-[1.6rem] leading-9 text-[#6c757d]'>
              Hoặc đăng nhập bằng
            </h3>
            <div className='flex justify-center gap-2'>
              <Link to='#'>
                <img
                  className='w-[129px] h-[37px]'
                  src='https://bizweb.dktcdn.net/assets/admin/images/login/fb-btn.svg'
                  alt=''
                />
              </Link>
              <Link to='#'>
                <img
                  className='w-[129px] h-[37px]'
                  src='	https://bizweb.dktcdn.net/assets/admin/images/login/gp-btn.svg'
                  alt=''
                />
              </Link>
            </div>
          </div>
        </Form>
      </div>
    </div>
  )
}

import { Form, Input, message } from 'antd'
import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import Button from '../../components/Button/Button'
import InputField from '../../components/InputField/InputField'
import styles from './Register.module.css'
import { useRegisterMutation } from '../../redux/api/auth'
import { useCookies } from 'react-cookie'
const cx = classNames.bind(styles)

export default function Register() {
  const navigate = useNavigate()
  const [cookies] = useCookies(['userInfor'])
  const location = useLocation()
  const [registerAccount, { isLoading }] = useRegisterMutation()
  const onFinish = (values) => {
    if (values) {
      delete values['confirm-password']
      registerAccount(values)
        .unwrap()
        .then((item) => {
          localStorage.setItem('emailverify', JSON.stringify(values?.email))
          message.success(item?.message)
          form.resetFields()
          navigate('/otp')
        })
        .catch((error) => {
          message.error(error?.data?.message)
        })
    }
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }
  const [form] = Form.useForm()
  const phonePattern = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/
  const validatePhoneNumber = (_, value) => {
    if (!phonePattern.test(value) && value) {
      return Promise.reject('Số điện thoại không hợp lệ!')
    }
    return Promise.resolve()
  }
  const passwordValidator = (_, value) => {
    if (value && value.length <= 7) {
      return Promise.reject('Mật khẩu phải có ít nhất 8 ký tự')
    }
    return Promise.resolve()
  }
  const confirmPasswordValidator = (_, value) => {
    if (value && value !== form.getFieldValue('password')) {
      return Promise.reject('Không trùng khớp với mật khẩu.')
    }
    return Promise.resolve()
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
          <span>Đăng ký tài khoản</span>
        </div>
      </div>
      <div className='flex min-h-full flex-col justify-center lg:px-8'>
        <div className='sm:mx-auto w-full max-w-lg'>
          <h4 className=' text-center text-[2.5rem] mb-[10px] leading-9 tracking-tight text-gray-900'>
            ĐĂNG KÝ TÀI KHOẢN
          </h4>
          <div className='flex justify-center '>
            <h2 className={cx('mr-[4px]')}>Bạn chưa có tài khoản ?</h2>
            <Link to='/Login' className={cx('underline')}>
              Đăng nhập tại đây
            </Link>
          </div>
          <div>
            <h3 className='text-[1.8rem] font-medium text-center mt-[60px] mb-[20px]'>THÔNG TIN CÁ NHÂN</h3>
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
            label='Tên'
            name='name'
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập tên người dùng'
              }
            ]}
          >
            <Input className='min-h-[40px] rounded-lg text-[16px]' />
          </Form.Item>
          <Form.Item
            name='phone_number'
            label={'Số điện thoại'}
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập số điện thoại!'
              },
              {
                validator: validatePhoneNumber
              }
            ]}
          >
            <Input className='min-h-[40px] rounded-lg text-[16px]' />
          </Form.Item>
          <Form.Item
            label='Email'
            name='email'
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập email'
              },
              {
                type: 'email',
                message: 'Địa chỉ email không hợp lệ!'
              }
            ]}
          >
            <Input className='min-h-[40px] rounded-lg text-[16px]' />
          </Form.Item>

          <Form.Item
            label='Mật khẩu'
            name='password'
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập mật khẩu'
              },
              {
                validator: passwordValidator
              }
            ]}
          >
            <Input.Password className='min-h-[40px] rounded-lg text-[16px]' />
          </Form.Item>
          <Form.Item
            label='Nhập lại mật khẩu'
            name='confirm-password'
            rules={[
              {
                required: true,
                message: 'Vui lòng xác nhận mật khẩu'
              },
              {
                validator: confirmPasswordValidator
              }
            ]}
          >
            <Input.Password className='min-h-[40px] rounded-lg text-[16px]' />
          </Form.Item>
          <div className='flex justify-start mt-4'>
            <h2 className='text-2xl mr-1'>Quên mật khẩu</h2>
            <span className='text-2xl mr-1'>?</span>
            <p className='text-2xl mr-1'>Nhấn </p>
            <Link to='' className='text-2xl mr-1 text-[#007bff]'>
              vào đây
            </Link>
          </div>
          <div className='mt-6'>
            <Button type='submit' name='Đăng ký' isLoading={isLoading} />
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

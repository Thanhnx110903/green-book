import { Form, Input, message } from 'antd'
import classNames from 'classnames/bind'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import Button from '../../components/Button/Button'
import styles from './Login.module.css'
import { useForgotPasswordMutation, useResetPasswordMutation, useSignInMutation } from '../../redux/api/auth'
import { cookies as cookies2 } from '../../config/cookies'
import { useCookies } from 'react-cookie'
import { useEffect } from 'react'
const cx = classNames.bind(styles)

export default function ChangePassword() {
  const navigate = useNavigate()
  const [changePassword] = useResetPasswordMutation()
  const [signIn, { isLoading }] = useSignInMutation()
  const [cookies, setCookie] = useCookies(['userInfor'])
  const location = useLocation()
  const [form] = Form.useForm()
  const passwordValidator = (_, value) => {
    if (value && value.length <= 7) {
      return Promise.reject('Mật khẩu phải có ít nhất 8 ký tự')
    }
    return Promise.resolve()
  }
  const onFinish = (values) => {
    if (values) {
      changePassword(values)
        .unwrap()
        .then((item) => {
          message.success(item?.message)
          form.resetFields()
          navigate('/login')
        })
        .catch((err) => {
          console.log(err)
          message.error(err?.data?.error)
        })
    }
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
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
          <span> Đăng nhập tài khoản</span>
        </div>
      </div>
      <div className=''>
        <div>
          <div className='sm:mx-auto w-full max-w-lg'>
            <div className={cx('text-center')}>
              <h1 className={cx('text-[2.5rem]')}>ĐỔI MẬT KHẨU</h1>
              <div className='flex justify-center '>
                <h2 className={cx('mr-[4px]')}>Bạn chưa có tài khoản ?</h2>
                <Link to='/register' className={cx('underline')}>
                  Đăng ký tại đây
                </Link>
              </div>
            </div>
          </div>
          <Form
            name='basic-changpass'
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
              name='password_confirmation'
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
            <div className='mt-6'>
              <Button type='submit' name='Gửi' />
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
    </div>
    // </div>
  )
}

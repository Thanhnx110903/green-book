import classNames from 'classnames/bind'
import styles from './Login.module.css'
import { Link, useNavigate } from 'react-router-dom'
import InputField from '../../components/InputField/InputField'
import { useCallback, useState } from 'react'
import Button from '../../components/Button/Button'
import { apiLogin, showProfile } from '../../apis'
import Swal from 'sweetalert2'
const cx = classNames.bind(styles)
import { login } from '../../redux/user/userSlice'
import { useDispatch } from 'react-redux'

export default function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [payload, setpayload] = useState({
    email: '',
    password: ''
  })

  const handleSubmit = useCallback(async () => {
    const response = await apiLogin(payload)
    console.log("dang nhap",response)
    if (response.message) {
      dispatch(login({ isLoggedIn: true, token: response.access_token }))
      Swal.fire('Congratulation', response.message, 'success').then(() => {
        
        navigate('/')
      })
    } else {
      Swal.fire('Oops!', response.error, 'error')
    }
  }, [payload])
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
              <h1 className={cx('text-[2.5rem]')}>ĐĂNG NHẬP TÀI KHOẢN</h1>
              <div className='flex justify-center '>
                <h2 className={cx('mr-[4px]')}>Bạn chưa có tài khoản ?</h2>
                <Link to='/register' className={cx('underline')}>
                  Đăng ký tại đây
                </Link>
              </div>
            </div>
          </div>

          <div className='mt-10 mx-auto sm:w-full max-w-[500px]'>
            <form className='space-y-6'>
              <div>
                <label htmlFor='email' className='block text-[14px] my-3 font-semibold leading-6 text-gray-900'>
                  Email
                  <span className={cx('text-[#ff0000] ml-[3px]')}>*</span>
                </label>
                <InputField value={payload.email} nameKey='email' setValue={setpayload} />
              </div>

              <div>
                <div className='flex items-center justify-between'>
                  <label htmlFor='password' className='text-[14px] my-3 block font-semibold leading-6 text-gray-900'>
                    Mật khẩu
                    <span className={cx('text-[#ff0000] ml-[3px]')}>*</span>
                  </label>
                </div>
                <InputField value={payload.password} nameKey='password' setValue={setpayload} />
              </div>
              <div className='flex justify-start'>
                <h2 className='text-xl mr-1'>Quên mật khẩu</h2>
                <span className='text-xl mr-1'>?</span>
                <p className='text-xl mr-1'>Nhấn vào </p>
                <p className='text-xl mr-1 text-[#007bff]'>đây</p>
              </div>
              <div>
                <Button name='Đăng nhập' handleonClick={handleSubmit} />
              </div>
            </form>

            <div className='sm:mx-auto w-full max-w-lg mb-[50px]'>
              <h3 className='mt-[40px] mb-[16px] text-center text-[1.6rem] leading-9 text-[#6c757d]'>
                Hoặc đăng nhập bằng
              </h3>
              <div className='flex justify-center gap-2'>
                <Link to='!#'>
                  <img
                    className='w-[129px] h-[37px]'
                    src='https://bizweb.dktcdn.net/assets/admin/images/login/fb-btn.svg'
                    alt=''
                  />
                </Link>
                <Link to='!#'>
                  <img
                    className='w-[129px] h-[37px]'
                    src='	https://bizweb.dktcdn.net/assets/admin/images/login/gp-btn.svg'
                    alt=''
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

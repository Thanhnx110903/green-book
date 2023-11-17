import classNames from 'classnames/bind'
import styles from './Register.module.css'
import { Link, useNavigate } from 'react-router-dom'
import InputField from '../../components/InputField/InputField'
import { useCallback, useState } from 'react'
import Button from '../../components/Button/Button'
import { apiRegister } from '../../apis'
import Swal from 'sweetalert2'
const cx = classNames.bind(styles)

export default function Register() {
  const navigate = useNavigate()
  const [payload, setpayload] = useState({
    email: '',
    name: '',
    password: ''
    // phone: '',
    // confirmPassword: ''
  })
  const resetPayload = () => {
    setpayload({ email: '', name: '', password: '' })
  }
  const handleRegisterSubmit = useCallback(async () => {
    const response = await apiRegister(payload)
    console.log(response)
    if (response.message) {
      Swal.fire('Congratulation', response.message, 'success').then(() => {
        resetPayload()
        navigate('/login')
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

        <div className='mx-auto sm:w-full max-w-[500px]'>
          <form className='space-y-5' action='#' method='POST'>
            <div>
              <label htmlFor='email' className='block text-[14px] mb-[8px] font-semibold leading-6 text-gray-900'>
                Tên
                <span className={cx('text-[#ff0000] ml-[3px]')}>*</span>
              </label>
              <InputField value={payload.name} nameKey='name' setValue={setpayload} />
            </div>
            {/* <div>
              <label htmlFor='email' className='block text-[14px] mb-[8px] my-3 font-semibold leading-6 text-gray-900'>
                Tên
                <span className={cx('text-[#ff0000] ml-[3px]')}>*</span>
              </label>
              <div className='mt-2'>
                <input
                  id='tên'
                  name='tên'
                  type='tên'
                  placeholder='Tên'
                  required
                  className='placeholder:text-2xl pl-[16px] block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 h-[40px]'
                />
              </div>
            </div> */}

            <div>
              <label htmlFor='email' className='block text-[14px] mb-[8px] my-3 font-semibold leading-6 text-gray-900'>
                Email
                <span className={cx('text-[#ff0000] ml-[3px]')}>*</span>
              </label>
              <InputField value={payload.email} nameKey='email' setValue={setpayload} />
            </div>
            <div>
              <div className='flex items-center justify-between'>
                <label htmlFor='password' className='text-[14px] my-3 block font-semibold leading-6 text-gray-900'>
                  Password
                  <span className={cx('text-[#ff0000] ml-[3px]')}>*</span>
                </label>
              </div>
              <InputField value={payload.password} nameKey='password' setValue={setpayload} type='password' />
            </div>
            {/* <div>
              <div className='flex items-center justify-between'>
                <label
                  htmlFor='confirmPassword'
                  className='text-[14px] my-3 block font-semibold leading-6 text-gray-900'
                >
                  confirmPassword
                  <span className={cx('text-[#ff0000] ml-[3px]')}>*</span>
                </label>
              </div>
              <InputField
                value={payload.confirmPassword}
                nameKey='confirmPassword'
                setValue={setpayload}
                type='password'
              />
            </div> */}
            <div className='pt-5'>
              <Button name='Đăng ký' handleonClick={handleRegisterSubmit} />
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
  )
}

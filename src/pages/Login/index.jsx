import classNames from 'classnames/bind'
import styles from './Login.module.css'
import { Link } from 'react-router-dom'

const cx = classNames.bind(styles)

export default function Login() {
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
            <form className='space-y-6' action='#' method='POST'>
              <div>
                <label htmlFor='email' className='block text-[14px] my-3 font-semibold leading-6 text-gray-900'>
                  Email
                  <span className={cx('text-[#ff0000] ml-[3px]')}>*</span>
                </label>
                <div className='mt-2'>
                  <input
                    id='email'
                    name='email'
                    type='email'
                    autoComplete='email'
                    placeholder='Email'
                    required
                    className='placeholder:text-2xl pl-[16px] Hoặc đăng nhập bằnglock w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 h-[40px]'
                  />
                </div>
              </div>

              <div>
                <div className='flex items-center justify-between'>
                  <label htmlFor='password' className='text-[14px] my-3 block font-semibold leading-6 text-gray-900'>
                    Mật khẩu
                    <span className={cx('text-[#ff0000] ml-[3px]')}>*</span>
                  </label>
                </div>
                <div className='mt-2'>
                  <input
                    id='password'
                    name='password'
                    type='password'
                    autoComplete='current-password'
                    placeholder='Mật khẩu'
                    required
                    className='h-[40px] pl-[16px] block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:text-2xl focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  />
                </div>
              </div>
              <div className='flex justify-start'>
                <h2 className='text-xl mr-1'>Quên mật khẩu</h2>
                <span className='text-xl mr-1'>?</span>
                <p className='text-xl mr-1'>Nhấn vào </p>
                <p className='text-xl mr-1 text-[#007bff]'>đây</p>
              </div>
              <div>
                <button
                  type='submit'
                  className=' text-3xl h-[45px] flex w-full justify-center items-center rounded-[999px] bg-[#fbd947] px-3 py-1.5 font-normal leading-6 text-[#bb141a] shadow-sm hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                >
                  Đăng nhập
                </button>
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

import classNames from 'classnames/bind'
import styles from './Cart.module.css'
const cx = classNames.bind(styles)
import { Link } from 'react-router-dom'
import { Space, DatePicker } from 'antd'

const onChange = (date, dateString) => {
  console.log(dateString)
}
export default function Cart() {
  return (
    <>
      <div className={cx('bg-[#f6f6f6] py-[6px] mb-[36px]')}>
        <div className={cx('container-wrap text-[1.4rem] ')}>
          <Link className={cx('text-[#999]')} to='/'>
            Trang chủ /
          </Link>
          <span> Giỏ hàng</span>
        </div>
      </div>
      <div className={cx('container-wrap')}>
        <h3 className={cx('font-bold text-[2.3rem]')}>Giỏ hàng</h3>
        <div className={cx('flex')}>
          <div className={cx('w-[70%]')}>
            <div className={cx('flex items-center mt-[20px]')}>
              <div className={cx('mr-[8px]')}>
                <i className={cx('fa-solid fa-xmark p-[8px]', 'times')}></i>
              </div>
              <img
                className={cx('w-[100px] h-[100px]')}
                src='https://bizweb.dktcdn.net/thumb/compact/100/441/742/products/f96d4cc1-1f2c-4e7a-99a5-d35956152e8c.jpg'
                alt=''
              />
              <div className={cx('text-[1.4rem]')}>Cậu Ma Nhà Xí Hanako - Tập 10</div>
              <div className={cx('text-[#bb141a] ml-auto font-bold')}>
                1200 <span className={cx('underline decoration-solid')}>đ</span>
              </div>
              <div className={cx('px-[27px]')}>
                <button className={cx('btn-quantity')}>-</button>
                <input type='text' value={1} className={cx('w-[48px] text-[13px]', 'quantity')} />
                <button className={cx('btn-quantity')}>+</button>
              </div>
            </div>
          </div>
          <div className={cx('w-[30%] bg-[#f7f7f7] p-[20px]')}>
            <h3 className={cx('font-bold text-[1.8rem] mb-[16px]')}>HẸN GIỜ NHẬN HÀNG</h3>
            <div className={cx('flex')}>
              <div>
                <p className={cx('text-[14px]')}>Ngày nhận hàng</p>
                <Space direction='vertical'>
                  <DatePicker onChange={onChange} />
                </Space>
              </div>
              <div className={cx('ml-auto')}>
                <p className={cx('text-[14px]')}>Thời gian nhận hàng</p>
                <select className={cx('select-time')} name='' id=''>
                  <option value=''>Chọn thời gian</option>
                  <option value=''>08h00 - 12h00</option>
                  <option value=''>14h00 - 18h00</option>
                  <option value=''>19h00 - 21h00</option>
                </select>
              </div>
            </div>
            <div>
              <div className={cx('flex mt-[30px]')}>
                <h3 className={cx('font-bold text-[1.8rem] mb-[16px]')}>Tổng cộng</h3>
                <div className={cx('text-[#bb141a] ml-auto font-bold')}>
                  1200 <span className={cx('underline decoration-solid')}>đ</span>
                </div>
              </div>
              <div className={cx('text-right', 'vat')}>(Đã bao gồm VAT nếu có)</div>
            </div>
            <div>
              <Link className={cx('bg-primary', 'btn-order')} to='/orderDetail'>
                Thanh toán
              </Link>
            </div>
            <div className={cx('mt-[10px]')}>
              <h3 className={cx('font-bold text-[1.8rem] mb-[20px]')}>Liên hệ</h3>
              <img
                src='https://bizweb.dktcdn.net/100/441/742/themes/842637/assets/footer_trustbadge.jpg?1680964744883'
                alt=''
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

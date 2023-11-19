import classNames from 'classnames/bind'
import styles from './OrderDetail.module.css'
const cx = classNames.bind(styles)
import { Link } from 'react-router-dom'

export default function Cart() {
  return (
    <div className={cx('container-wrap')}>
      <div className={cx('bg-[#f6f6f6] py-[6px] mb-[36px]')}>
        <div className={cx('container-wrap text-[1.4rem] ')}>
          <Link className={cx('text-[#999]')} to='/'>
            Trang chủ /
          </Link>
          <span> Giỏ hàng</span>
        </div>
      </div>

      <h3 className={cx('font-bold text-[2.3rem]')}>Giỏ hàng</h3>
    </div>
  )
}

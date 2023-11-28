import classNames from 'classnames/bind'
import styles from './Cart.module.css'
const cx = classNames.bind(styles)
import { Link } from 'react-router-dom'
import { Space, DatePicker } from 'antd'

import { getCarts, updateCart } from '../../apis'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import CartItem from './CartItem/CartItem'

const onChange = (date, dateString) => {
  console.log(dateString)
}

export default function Cart() {
  const [data, setData] = useState(null)
  const { isLoggedIn, current } = useSelector((state) => state.user)
  const getCart = async () => {
    const res = await getCarts()
    setData(res.data)
    console.log(res.data)
  }
  useEffect(() => {
    if (current) {
      getCart()
    }
  }, [current])
  const handleUpdateCartQty = async (newQuantity,lineItemId ) => {
    try {
      const response = await updateCart({ quantity: newQuantity }, lineItemId);
      setData((prevData) => {
        return prevData?.map((item) => {
          if (item?.book_id === lineItemId) {
            return { ...item, quantity: newQuantity };
          }
          return item;
        });
      });
    } catch (error) {
      console.error("Lỗi khi cập nhật số lượng sản phẩm:", error);
    }
  };
  // useEffect(()=>{
  //   handleUpdateCartQty(11,6)
  // },[])
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
            {data?.map((cart) => (
              <CartItem key={cart.id} cart={cart} onUpdateCartQty={handleUpdateCartQty} />
            ))}
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

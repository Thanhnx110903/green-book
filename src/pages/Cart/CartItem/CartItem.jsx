import React from 'react'
import classNames from 'classnames/bind'
const cx = classNames.bind(styles)

import styles from '../../Cart/Cart.module.css'
const CartItem = ({ cart, onUpdateCartQty }) => {
  return (
    <div className={cx('flex items-center mt-[20px]')}>
      <div className={cx('mr-[8px]')}>
        <i className={cx('fa-solid fa-xmark p-[8px]', 'times')}></i>
      </div>
      <img className={cx('w-[100px] h-[100px]')} src={cart?.book?.image} alt='' />
      <div className={cx('text-[1.4rem]')}>{cart?.book?.name}</div>
      <div className={cx('text-[#bb141a] ml-auto font-bold')}>
        {cart?.book?.price} <span className={cx('underline decoration-solid')}>đ</span>
      </div>
      <div className={cx('px-[27px]')}>
        <button
          onClick={() => {
            const newQuantity = cart.quantity - 1
            if (newQuantity >= 1) {
              onUpdateCartQty(newQuantity,cart?.book_id)
            }
          }}
          className={cx('btn-quantity')}
        >
          -
        </button>
        <input type='text' value={cart?.quantity} className={cx('w-[48px] text-[13px]', 'quantity')} />
        <button
          onClick={() => {
            const newQuantity = cart.quantity + 1
            if (newQuantity <= cart.book.quantity) {
              onUpdateCartQty(newQuantity,cart?.book_id )
            } else {
              toast.warn('Sản phẩm chỉ còn: ' + cart.products.quantity)
            }
          }}
          className={cx('btn-quantity')}
        >
          +
        </button>
      </div>
    </div>
  )
}

export default CartItem

import React from 'react'
import styles from './Cart.module.css'
import classNames from 'classnames/bind'
import { NavLink } from 'react-router-dom'
import { Button } from 'antd'
const cx = classNames.bind(styles)

export default function Cart() {
  return (
    <div className={cx(' mt-[50px] bg-white ml-[245px] w-[1420px] container')}>
      <div className={cx('cart-header')}>
        <div className={cx('cart-header__left')} >Sản phẩm</div>
        <div className={cx('cart-header__right')}>
          <div className={cx('cart-header-item')}>Đơn giá</div>
          <div className={cx('cart-header-item')}>Số lượng</div>
          <div className={cx('cart-header-item')}>Số tiền</div>
          <div className={cx('cart-header-item')}>Thao tác</div>
        </div>
      </div>
      <div className={cx("cart-wrapper")}>

        <div className={cx("cart-content")} >
          <div className={cx("cart-content__left")}>
            <div className={cx("cart-content__info")}>
              <img src="https://picsum.photos/80/125" />
              <span>sss</span>
            </div>
          </div>
          <div className={cx("cart-content__right")}>
            <div className={cx("cart-price")}>aađ</div>
            <div className={cx("cart-content-item")}>
              <div className={cx("quantity-wrapper")}>
                <button
                  className={cx("quantity-button")}>
                  -
                </button>

                <span className={cx("quantity-value")}>111</span>
                <button
                  className={cx("quantity-button")}

                >
                  +
                </button>
              </div>
            </div>
            <div className={cx("cart-content-item")}>
              <span className={cx("price")}>
                121121đ
              </span>
            </div>
            <div
              className={cx("cart-delete")}

            >
              Xoá
            </div >
          </div >
        </div >

        {/* <div className={cx("no-cart")}>
        <img
          className={cx("w-[300px]")}
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTn8T6ADaMld2sfLFu6mR1dK7_G53ibKSnoCJTMkwP4YWvi64XuLZMPYDRoRWyXvGTqpIM&usqp=CAU"
          alt=""
        />
        <p>Không có sản phẩm nào trong giỏ hàng</p>
        <NavLink to={"/product"}>
          <Button width={"250px"}>Mua ngay</Button>
        </NavLink>
      </div > */}

      </div >
      <div className={cx("cart-bottom")}>
        <div className={cx("totalPrice")}>
          Tổng tiền:12121đ
        </div>
        <div className={cx("cart-header-item")}>
          <NavLink to={"/checkout"}>
            <Button className={cx('bg-orange-400')} height={"50px"} width={"250px"}>
              Thanh toán
            </Button>
          </NavLink>
        </div>
      </div>
    </div>
  )
}

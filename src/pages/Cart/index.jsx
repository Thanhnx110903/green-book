import { LoadingOutlined } from '@ant-design/icons'
import { message } from 'antd'
import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  useGetCartQuery,
  useRemoveAllCartMutation,
  useRemoveCartMutation,
  useUpdateCartMutation
} from '../../redux/api/cart'
import FormatPrice from '../../untils/formatPrice'

import styles from './Cart.module.css'
import PcLoading from '../../components/PcLoading'
const cx = classNames.bind(styles)

export default function Cart() {
  const { data: dataCart, refetch, isLoading } = useGetCartQuery()
  const [total, setTotal] = useState(0)
  const [data, setData] = useState([])
  const [updatedQuantities, setUpdatedQuantities] = useState({})
  const [removeItem, { isLoading: loadingRemoveAItem }] = useRemoveCartMutation()
  const [removeItems, { isLoading: loadingRemoveAItems }] = useRemoveAllCartMutation()
  const [updateCart, { isLoading: loadingUpdate }] = useUpdateCartMutation()
  const handleIncreaseQuantity = (id, defaultValue) => {
    const indexItem = data.findIndex((item) => item.id === id)
    let newDataArr = [...data]
    newDataArr[indexItem] = {
      ...newDataArr[indexItem],
      quantity: defaultValue + 1
    }

    setData(newDataArr)
    updateCart({
      id,
      data: {
        quantity: defaultValue + 1
      }
    })
      .unwrap()
      .then((item) => {})
      .catch((error) => {
        console.log(error)
      })
  }
  const handleDecreaseQuantity = (id, defaultValue) => {
    if (defaultValue > 1) {
      const indexItem = data.findIndex((item) => item.id === id)
      let newDataArr = [...data]
      newDataArr[indexItem] = {
        ...newDataArr[indexItem],
        quantity: defaultValue - 1
      }
      setData(newDataArr)
      updateCart({
        id,
        data: {
          quantity: defaultValue - 1
        }
      })
        .unwrap()
        .then((item) => {})
        .catch((error) => {
          console.log(error)
        })
    }
  }

  const handleRemoveAllItem = () => {
    removeItems()
      .unwrap()
      .then((item) => {
        message.success(item?.message)
        setData([])
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const handleRemoveItem = (id) => {
    removeItem(id)
      .unwrap()
      .then((item) => {
        message.success(item?.message)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  useEffect(() => {
    if (dataCart?.data && dataCart.data !== data) {
      const total = dataCart.data.reduce((acc, item) => {
        const price = item?.quantity > 20 ? item.warehouse.wholesale_price : item.warehouse.retail_price
        return acc + item?.quantity * price
      }, 0)
      setTotal(total)
    }
  }, [isLoading, dataCart?.data, refetch, data])
  useEffect(() => {
    if (dataCart?.data) {
      setData(dataCart.data)
    }
  }, [isLoading, dataCart?.data])

  const hanldeUpdateQuantities = (e) => {}

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
      {!isLoading ? (
        <div className={cx('container-wrap mb-[100px]')}>
          <h3 className={cx('font-bold text-[2.3rem]')}>Giỏ hàng</h3>
          {dataCart?.data?.length ? (
            <div className={cx('flex mt-[50px] gap-[75px]')}>
              <div className={cx('w-[70%] ')}>
                <div className='max-h-[450px] overflow-y-auto'>
                  {data &&
                    data?.map((item) => {
                      return (
                        <div key={item?.id} className={cx('flex items-center mb-[20px]')}>
                          <div className={cx('mr-[8px] cursor-pointer')} onClick={() => handleRemoveItem(item?.id)}>
                            <i className={cx('fa-solid fa-xmark p-[8px]', 'times')}></i>
                          </div>
                          <img className={cx('w-[100px] h-[100px]', 'object-contain')} src={item?.book.image} alt='' />
                          <div className={cx('text-[1.4rem]')}>{item?.book?.name}</div>
                          <div className={cx('text-[#bb141a] ml-auto font-bold')}>
                            <FormatPrice
                              price={
                                item?.quantity < 20 ? item?.warehouse?.retail_price : item?.warehouse?.wholesale_price
                              }
                            />
                          </div>
                          <div className={cx('px-[27px]')}>
                            <button
                              className={cx('btn-quantity')}
                              onClick={() => handleDecreaseQuantity(item?.id, item?.quantity)}
                            >
                              -
                            </button>
                            <input
                              type='text'
                              value={
                                updatedQuantities[item?.id] !== undefined ? updatedQuantities[item?.id] : item?.quantity
                              }
                              onChange={hanldeUpdateQuantities}
                              className={cx('w-[48px] text-[13px]', 'quantity')}
                            />
                            <button
                              className={cx('btn-quantity')}
                              onClick={() => handleIncreaseQuantity(item?.id, item?.quantity)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      )
                    })}
                </div>
                <div className='flex justify-end mr-[20px]'>
                  <div onClick={handleRemoveAllItem} className={cx('bg-primary max-w-[400px] px-[20px]', 'btn-order')}>
                    {!loadingRemoveAItems ? <span>Xóa toàn bộ giỏ hàng</span> : <LoadingOutlined />}
                  </div>
                </div>
              </div>
              <div className={cx('w-[30%] bg-[#f7f7f7] p-[20px]')}>
                <div>
                  <div className={cx('flex mt-[30px]')}>
                    <h3 className={cx('font-bold text-[1.8rem] mb-[16px]')}>Tổng cộng</h3>
                    <div className={cx('text-[#bb141a] ml-auto font-bold')}>
                      <FormatPrice price={total} />
                    </div>
                  </div>
                  <div className={cx('text-right', 'vat')}>(Đã bao gồm VAT nếu có)</div>
                </div>
                <div>
                  <Link className={cx('bg-primary', 'btn-order')} to='/checkout'>
                    Thanh toán
                  </Link>
                </div>
                <div className={cx('mt-[10px]')}>
                  <h3 className={cx('font-bold text-[1.8rem] mt-6 mb-[20px]')}>Liên hệ</h3>
                  <img
                    src='https://bizweb.dktcdn.net/100/441/742/themes/842637/assets/footer_trustbadge.jpg?1680964744883'
                    alt=''
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className='w-full py-[100px] flex justify-center items-center'>
              <div className='flex flex-col gap-4 items-center'>
                <img src='/src/assets/imgs/cart_empty_background.webp' alt='' />
                <p className='text-[20px] font-bold'>“Hổng” có gì trong giỏ hết</p>
                <p className='text-[16px] text-[#ccc] italic'>Về trang cửa hàng để chọn mua sản phẩm bạn nhé!!</p>
                <Link to='/' className={cx('action-news', 'd-flex items-center justify-center')}>
                  <p>Xem tất cả</p>
                  <i className={cx('fa-solid fa-chevron-right', 'text-[1.1rem] mt-[3px] ml-[6px]')}></i>
                </Link>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className='mt-5 w-full'>
          {Array.from({ length: 3 }).map((_, index) => (
            <PcLoading key={index} />
          ))}
        </div>
      )}
    </>
  )
}

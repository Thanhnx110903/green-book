import React, { useEffect, useState } from 'react'
import styles from './ProductCard.module.css'
import classNames from 'classnames/bind'
import { message } from 'antd'
const cx = classNames.bind(styles)
import { Link, useNavigate } from 'react-router-dom'
import FormatPrice from '../../untils/formatPrice'
import { useAddCartMutation } from '../../redux/api/cart'
import { HeartOutlined, HeartFilled } from '@ant-design/icons'
import { useCookies } from 'react-cookie'
import { FaPlus } from 'react-icons/fa'
import { useAddFavoriteMutation, useGetFavoriteQuery, useRemoveFavoriteMutation } from '../../redux/api/favorite'

const ProductCard = ({ books }) => {
  const [dataFavorites, setDataFavorites] = useState([])
  const [cookies] = useCookies(['userInfor'])
  const navigate = useNavigate()
  const [addToCart, { isLoading: cartLoading }] = useAddCartMutation()
  const { data: listFavorites, isLoading: loadingFavorite } = useGetFavoriteQuery()
  const [addToFavorite, { isLoading: addFavoriteLoading }] = useAddFavoriteMutation()
  const [removeFavorite, { isLoading: removeFavoriteLoading }] = useRemoveFavoriteMutation()
  const handleAddFavorite = (id) => {
    if (!cookies?.userInfor?.access_token) {
      message.error('Bạn cần đăng nhập để thực hiện tính năng này')
      return navigate('/login')
    }
    addToFavorite(id)
      .unwrap()
      .then(() => {
        message.success('Đã thêm vào yêu thích')
      })
      .catch((err) => {
        console.log(err)
        message.error(err?.data?.message)
      })
  }
  const handleRemoveFavorite = (id) => {
    const removeData = listFavorites?.data?.data?.find((item) => {
      return item?.book?.id == id
    })
    removeFavorite(removeData?.id)
      .unwrap()
      .then((item) => {
        message.success(item?.message)
      })
      .catch((err) => {
        console.log(err)
        message.error(err?.data?.message)
      })
  }
  const handleAddToCart = (id) => {
    const data = {
      id,
      data: {
        quantity: 1
      }
    }
    addToCart(data)
      .unwrap()
      .then((item) => {
        if (item?.message == 'Sản phẩm có sẵn không đủ') {
          return message.error(item?.message)
        }
        message.success(item?.message)
      })
      .catch((err) => {
        message.error('Thêm sản phẩm thất bại')
        console.log(err)
      })
  }
  useEffect(() => {
    if (listFavorites?.data?.data?.length) {
      const dataBooks = listFavorites?.data?.data?.map((item) => {
        return item.book
      })
      setDataFavorites(dataBooks)
    }
    if (!cookies?.userInfor?.access_token) {
      setDataFavorites([])
    }
  }, [loadingFavorite, listFavorites])
  return (
    <>
      <li className={cx('product-item', 'shadow-md')} key={books?.id}>
        <Link to={`/product/${books?.id}`}>
          <img className='h-[280px] m-auto' src={books?.image} alt='' />
        </Link>
        <div className={cx('p-[10px]')}>
          <Link to={`/product/${books?.id}`}>
            <p className={cx('text-[18px] font-bold line-clamp-2 leading-relaxed my-[10px] max-w-[200px] truncate')}>
              {books?.name}
            </p>
          </Link>
          <div className={cx('d-flex items-center justify-between')}>
            <div className={cx('text-primary font-medium')}>
              <FormatPrice price={books.warehouse?.retail_price} />
              {/* <p>Mã giảm giá</p> */}
            </div>
            <div className='flex items-center gap-2'>
              {dataFavorites.length ? (
                dataFavorites.find((item) => item?.id == books?.id) ? (
                  <div
                    className='w-[30px] h-[30px] flex items-center cursor-pointer'
                    onClick={() => handleRemoveFavorite(books?.id)}
                  >
                    <HeartFilled className='text-red-500' />
                  </div>
                ) : (
                  <div
                    className='w-[30px] h-[30px] flex items-center cursor-pointer'
                    onClick={() => handleAddFavorite(books?.id)}
                  >
                    <HeartOutlined />
                  </div>
                )
              ) : (
                <div
                  className='w-[30px] h-[30px] flex items-center cursor-pointer'
                  onClick={() => handleAddFavorite(books?.id)}
                >
                  <HeartOutlined />
                </div>
              )}

              <div
                className={cx(
                  'shadow-xl w-[35px] h-[35px] bg-primary d-flex items-center justify-center text-[#ffffff] cursor-pointer rounded-full'
                )}
                onClick={() => handleAddToCart(books?.id)}
              >
                <FaPlus />
              </div>
            </div>
          </div>
        </div>
      </li>
    </>
  )
}

export default ProductCard

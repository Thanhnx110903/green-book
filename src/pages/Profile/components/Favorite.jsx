import React, { useEffect, useState } from 'react'
import { useGetFavoriteQuery, useRemoveFavoriteMutation } from '../../../redux/api/favorite'
import { Link } from 'react-router-dom'
import FormatPrice from '../../../untils/formatPrice'
import dayjs from 'dayjs'
import { message } from 'antd'
import { HeartFilled } from '@ant-design/icons'
export default function Favorite() {
  const [dataFavorites, setDataFavorites] = useState([])
  const { data: listFavorites, isLoading: loadingFavorite } = useGetFavoriteQuery()
  const [removeFavorite, { isLoading: removeFavoriteLoading }] = useRemoveFavoriteMutation()
  const handleRemoveFavorite = (id) => {
    removeFavorite(id)
      .unwrap()
      .then((item) => {
        message.success(item?.message)
      })
      .catch((err) => {
        console.log(err)
        message.error(err?.data?.message)
      })
  }
  useEffect(() => {
    if (listFavorites?.data?.data?.length) {
      setDataFavorites(listFavorites?.data?.data)
    }
  }, [loadingFavorite, listFavorites])
  if (loadingFavorite) {
    return <>loading...</>
  }
  return (
    <div>
      {dataFavorites?.length ? (
        dataFavorites?.map((item) => {
          console.log(item)
          return (
            <div className='px-5 border-t pt-[10px] ' key={item?.id}>
              <div className='flex-col md:flex-row  flex gap-[30px] pb-[30px] '>
                <Link to={`/user/profile/roomBooked/${item?.id}`}>
                  <img
                    className='w-full md:max-w-[126px] overflow-hidden object-cover rounded-[10px]'
                    src={
                      item?.book?.image ||
                      'https://cdn.hoanghamobile.com/tin-tuc/wp-content/uploads/2023/08/ve-bia-sach.jpg'
                    }
                    alt=''
                  />
                </Link>
                <div className='mb-2  w-full'>
                  <div className='mb-2  w-full'>
                    <div className='text-[18px] font-bold flex justify-between items-center'>
                      <Link to=''>
                        <h1 className='text-[18px] font-bold'>{item?.book?.name}</h1>
                      </Link>
                      <div
                        className='w-[30px] h-[30px] flex items-center cursor-pointer'
                        onClick={() => handleRemoveFavorite(item?.id)}
                      >
                        <HeartFilled className='text-red-500' />
                      </div>
                    </div>
                    <span className='block font-bold'>
                      {' '}
                      <FormatPrice price={item?.book?.price} />
                    </span>
                    <p className='text-[#6B7280] w-full tracking-[1px] text-[13px]'>{item?.book?.short_description}</p>
                  </div>
                  <div className='flex gap-3 flex-wrap'>
                    <div className='flex flex-col'>
                      <p>
                        Tác giả: <span>{item?.book?.author}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })
      ) : (
        <div>Hiện chưa có sản phẩm yêu thích</div>
      )}
    </div>
  )
}

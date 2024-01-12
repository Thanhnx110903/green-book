import React from 'react'
import styles from './Voucher.module.css'
import classNames from 'classnames/bind'
import { useGetCouponsQuery } from '../../redux/api/coupon'
import { message } from 'antd'
import dayjs from 'dayjs'
import FormatPrice from '../../untils/formatPrice'
import { useGetVoucherMutation } from '../../redux/api/user'
import PcLoading from '../../components/PcLoading'
import { Link } from 'react-router-dom'

const cx = classNames.bind(styles)

export default function Voucher() {
  const { data, isLoading, refetch } = useGetCouponsQuery()
  const [getVoucher] = useGetVoucherMutation()
  const handleGetVoucher = (id) => {
    getVoucher(id)
      .unwrap()
      .then((item) => {
        message.success(item?.message)
        refetch()
      })
      .catch((err) => {
        message.error(err?.data?.message)
      })
  }
  return (
    <>
      <div className='w-full p-4 bg-[#f6f6f6]'>
        <div className='container-wrap'>
          <ul className='flex m-0'>
            <li className='m-0'>
              <Link to='/' className='text-[#999]'>
                <span className=''>Trang chủ</span>
                <span className='px-2'>/</span>
              </Link>
            </li>
            <li className='m-0'>
              <div className='text-[#999]'>
                <span>Vourcher</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className='mb-10 px-8 container-wrap'>
        <div className='bg-bgr pt-[20px]'>
          <div className='container mx-auto py-5 '>
            <h1 className='mb-6 font-bold text-[30px]'>Tất cả mã giảm giá</h1>
          </div>
          <div className='grid-cols-4 gap-[20px] grid'>
            {/* coupon */}
            {data?.data?.data?.length ? (
              data?.data?.data?.map((item) => {
                console.log(item)
                return (
                  <div
                    key={item?.code}
                    className='container bg-gradient-to-r bg-[#bc141b] text-white p-8 rounded-lg shadow-lg mx-auto'
                  >
                    <div className='text-3xl font-bold mb-4'>{item?.name}</div>
                    <div className='text-lg mb-4'>
                      Đơn tối đa:{' '}
                      <span className='text-[#fbd947] font-bold'>
                        <FormatPrice price={item?.price_required} />
                      </span>
                    </div>
                    <div className='text-base mb-4'>Số lượng: {item?.quantity}</div>
                    <div className='bg-white text-gray-800 rounded-lg px-4 py-2 flex items-center justify-between'>
                      <span className='text-[1.5rem] font-semibold'>
                        Ưu đãi:{' '}
                        {item?.type == 'percent' ? (
                          'giảm ' + item?.value + '%'
                        ) : item?.type == 'number' ? (
                          <FormatPrice price={item?.value} />
                        ) : (
                          'Miễn phí giao hàng'
                        )}
                      </span>
                      <span
                        onClick={() => handleGetVoucher(item?.id)}
                        className='text-[13px] border px-3 py-2 cursor-pointer'
                      >
                        Lấy ngay
                      </span>
                    </div>
                    <div className='text-sm mt-4'>
                      <p>
                        Ngày hết hạn:
                        <span className='font-semibold'> {dayjs(item?.end_date).format('DD-MM-YYYY')}</span>
                      </p>
                      <p>Số điểm: {item?.point_required}đ</p>
                    </div>
                  </div>
                )
              })
            ) : (
              <div className='mt-5 w-full'>
                {Array.from({ length: 6 }).map((_, index) => (
                  <PcLoading key={index} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

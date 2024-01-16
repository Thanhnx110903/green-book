import React from 'react'
import { useGetCouponsQuery } from '../../redux/api/coupon'
import { message } from 'antd'
import dayjs from 'dayjs'
import FormatPrice from '../../untils/formatPrice'
import { useGetProfileQuery, useGetVoucherMutation } from '../../redux/api/user'
import PcLoading from '../../components/PcLoading'
import ProtectRouter from '../../components/ProtectRouter'
import classNames from 'classnames/bind'
import styles from './Voucher.module.css'
import { Link } from 'react-router-dom'

const cx = classNames.bind(styles)

export default function Voucher() {
  const { data, isLoading, refetch } = useGetCouponsQuery()
  const { data: dataProfile, isLoading: isLoadingProfile } = useGetProfileQuery()
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
    <ProtectRouter>
      <div className={cx('mb-[20px]')}>
        <div className={cx('bg-[#f6f6f6] py-[6px]')}>
          <div className={cx('container-wrap text-[1.4rem]')}>
            <Link className={cx('text-[#999]')} to='/'>
              Trang chủ /
            </Link>
            <span> Voucher</span>
          </div>
        </div>
      </div>

      <div className='container-wrap mb-10 '>
        <div className='bg-bg px-2'>
          <div className='container mx-auto py-5 mb-6 '>
            <h1 className='font-bold text-[30px]'>Tất cả mã giảm giá</h1>
            <p>Điểm hiện tại: {dataProfile?.user?.point || 0}</p>
          </div>
          <div className='grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 grid'>
            {data?.data?.data?.length ? (
              data?.data?.data?.map((item) => {
                console.log(item)
                return (
                  <div
                    key={item?.code}
                    className='max-h-[300px] container bg-gradient-to-r bg-[#bc141b] text-white p-3 lg:p-8 rounded-lg shadow-lg mx-auto'
                  >
                    <div className='text-2xl  lg:text-3xl font-bold mb-2'>
                      {' '}
                      Ưu đãi:{' '}
                      {item?.type == 'percent' ? (
                        'giảm ' + item?.value + '%'
                      ) : item?.type == 'number' ? (
                        <FormatPrice price={item?.value} />
                      ) : (
                        'Miễn phí giao hàng'
                      )}
                    </div>
                    <div className='text-lg mb-2'>
                      Áp dụng đơn hàng trên:{' '}
                      <span className='text-[#fbd947] font-bold'>
                        <FormatPrice price={item?.price_required} />
                      </span>
                    </div>
                    <div className='text-base mb-2'>Số lượng: {item?.quantity}</div>
                    <div className='bg-white text-gray-800 rounded-lg px-4 py-2 flex items-center justify-between'>
                      <span className='text-[1.5rem] font-semibold'>{item?.code}</span>
                      <span
                        onClick={() => handleGetVoucher(item?.id)}
                        className='text-[8px] md:text-[13px] font-semibold  border px-3 py-1 md:px-3 md:py-2  cursor-pointerv bg-[#fbd947] text-[#bc141b] cursor-pointer hover:opacity-[0.8]'
                      >
                        Lấy ngay
                      </span>
                    </div>
                    <div className='text-[11px] mt-4 mb-2'>
                      <p>
                        Ngày hết hạn:
                        <span className='font-semibold '> {dayjs(item?.end_date).format('DD-MM-YYYY')}</span>
                      </p>
                      <p>Số điểm: {item?.point_required}</p>
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
    </ProtectRouter>
  )
}

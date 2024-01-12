import React from 'react'
import { useGetCouponsQuery } from '../../redux/api/coupon'
import { message } from 'antd'
import dayjs from 'dayjs'
import FormatPrice from '../../untils/formatPrice'
import { useGetVoucherMutation } from '../../redux/api/user'
import PcLoading from '../../components/PcLoading'
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
    <div className='mb-10 px-8'>
      <div className='bg-bgr pt-[60px]'>
        <div className='container mx-auto py-5 '>
          <h1 className='mb-6 font-bold text-[30px]'>Tất cả mã giảm giá</h1>
        </div>
        <div className='flex gap-8 flex-wrap'>
          {data?.data?.data?.length ? (
            data?.data?.data?.map((item) => {
              return (
                <div className='w-[450px] flex gap-3 shadow-lg' key={item?.code}>
                  <img src={`data:image/svg+xml;utf8,${encodeURIComponent(item?.image)}`} alt='' />
                  <div className='py-2 w-full pr-4 pb-3'>
                    <div className='flex justify-between flex-wrap'>
                      <h1 className='font-bold'>{item?.name}</h1>
                      <span className='text-[14px]'>số lượng: {item?.quantity}</span>
                    </div>
                    <div className='flex flex-wrap gap-4 mb-3'>
                      <div>
                        <p className='text-[13px]'>
                          Đơn tối đa: <FormatPrice price={item?.price_required} />
                        </p>
                        <p className='text-[13px]'>Số điểm: {item?.point_required}</p>
                      </div>
                      <div>
                        <p className='text-[13px]'>
                          Ưu đãi:{' '}
                          {item?.type == 'percent' ? (
                            'giảm ' + item?.value + '%'
                          ) : item?.type == 'number' ? (
                            <FormatPrice price={item?.value} />
                          ) : (
                            'Miễn phí giao hàng'
                          )}
                        </p>
                        <p className='text-[13px]'>Ngày hết hạn: {dayjs(item?.end_date).format('DD-MM-YYYY')}</p>
                      </div>
                    </div>
                    <span
                      onClick={() => handleGetVoucher(item?.id)}
                      className='text-[13px] border px-3 py-2 cursor-pointer'
                    >
                      Lấy ngay
                    </span>
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
  )
}

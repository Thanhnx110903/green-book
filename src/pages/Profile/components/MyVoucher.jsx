import React, { useState } from 'react'
import { useGetMyVoucherQuery, useGetVoucherByFilterQuery } from '../../../redux/api/user'
import FormatPrice from '../../../untils/formatPrice'
import dayjs from 'dayjs'
import { Button, Form, Input, Select } from 'antd'
export default function MyVoucher() {
  const [form] = Form.useForm()
  const [dataQuery, setDataQuery] = useState(null)
  const { data, isLoading } = useGetVoucherByFilterQuery(dataQuery)
  const onFinish = (values) => {
    setDataQuery(values)
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }
  if (isLoading) {
    return <>loading...</>
  }
  return (
    <div>
      <div>
        <Form
          form={form}
          name='basic'
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete='off'
          layout='vertical'
        >
          <div className='flex items-center w-full gap-3 justify-end'>
            <Form.Item name='type'>
              <Select
                placeholder='Loại'
                className='min-h-[20px] rounded-lg text-[16px] min-w-[150px]'
                options={[
                  {
                    value: 'percent',
                    label: 'Phần trăm'
                  },
                  {
                    value: 'number',
                    label: 'Số tiền'
                  },
                  {
                    value: 'free_ship',
                    label: 'Miễn phí vận chuyển'
                  }
                ]}
              />
            </Form.Item>
            <Form.Item name='name'>
              <Input
                className='min-h-[20px] rounded-lg text-[16px] min-w-[150px] border-[#ddd]'
                placeholder='Tìm kiếm...'
              />
            </Form.Item>
            <Form.Item>
              <div className='flex gap-2'>
                <Button htmlType='submit'>Tìm kiếm</Button>
                <Button
                  htmlType='button'
                  onClick={() => {
                    form.resetFields()
                    setDataQuery(null)
                  }}
                >
                  Làm mới
                </Button>
              </div>
            </Form.Item>
          </div>
        </Form>
      </div>
      <div className='flex gap-8 flex-wrap px-5 border-t pt-[10px]'>
        {data?.data?.data?.length
          ? data?.data?.data?.map((item) => {
              return (
                <div className='w-[450px] flex gap-3 shadow-lg' key={item?.id}>
                  <img src={`data:image/svg+xml;utf8,${encodeURIComponent(item?.coupon?.image)}`} alt='' />
                  <div className='py-2 w-full pr-4 pb-3'>
                    <div className='flex justify-between flex-wrap'>
                      <h1 className='font-bold'>{item?.coupon?.name}</h1>
                    </div>
                    <div className='flex flex-wrap gap-4 mb-3'>
                      <div>
                        <p className='text-[13px]'>
                          Đơn tối đa: <FormatPrice price={item?.coupon?.price_required} />
                        </p>
                        <p className='text-[13px]'>Số điểm: {item?.coupon?.point_required}</p>
                      </div>
                      <div>
                        <p className='text-[13px]'>
                          Ưu đãi:{' '}
                          {item?.coupon?.type == 'percent' ? (
                            'giảm ' + item?.coupon?.value + '%'
                          ) : item?.coupon?.type == 'number' ? (
                            <FormatPrice price={item?.coupon?.value} />
                          ) : (
                            'Miễn phí giao hàng'
                          )}
                        </p>
                        <p className='text-[13px]'>
                          Ngày hết hạn: {dayjs(item?.coupon?.end_date).format('DD-MM-YYYY')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          : 'Không có voucher nào'}
      </div>
    </div>
  )
}

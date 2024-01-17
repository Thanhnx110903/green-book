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
          name='myvourcher'
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
      <div className='grid grid-cols-3 gap-5 px-5 border-t pt-[10px]'>
        {data?.data?.data?.length
          ? data?.data?.data?.map((item, index) => {
              console.log(item)
              return (
                <div
                  key={index}
                  className='container bg-gradient-to-r bg-[#bc141b] text-white p-8 rounded-lg shadow-lg mx-auto'
                >
                  <div className='text-3xl font-bold mb-2'>
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
                      <FormatPrice price={item?.coupon?.price_required} />
                    </span>
                  </div>
                  <div className='bg-white text-gray-800 rounded-lg px-4 py-2 flex items-center justify-between'>
                    <span className='text-[1.5rem] font-semibold'>{item?.coupon?.code}</span>
                  </div>
                  <div className='text-[11px] mt-4 mb-2'>
                    <p>
                      Ngày hết hạn:
                      <span className='font-semibold '> {dayjs(item?.end_date).format('DD-MM-YYYY')}</span>
                    </p>
                  </div>
                </div>
              )
            })
          : 'Không có voucher nào'}
      </div>
    </div>
  )
}

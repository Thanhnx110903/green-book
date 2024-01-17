import React, { useState } from 'react'
import { useGetOrderQuery, useGetOrdersQuery, usePaymentMomoMutation } from '../../../redux/api/order'
import { Link } from 'react-router-dom'
import FormatPrice from '../../../untils/formatPrice'
import dayjs from 'dayjs'
import { Button, Checkbox, Form, Input, Select, DatePicker } from 'antd'

export default function MyOrder() {
  const [form] = Form.useForm()
  const [handlePaymentMomo] = usePaymentMomoMutation()
  const [dataQuery, setDataQuery] = useState(null)
  const { data, isLoading, error } = useGetOrdersQuery(dataQuery)
  const onFinish = (values) => {
    let date = undefined
    if (values?.date) {
      date = dayjs(values.date).format('YYYY-MM-DD')
    }
    setDataQuery({
      ...values,
      date: values?.date ? date : null
    })
  }
  const handlePayment = (id) => {
    handlePaymentMomo(id)
      .unwrap()
      .then((item) => {
        console.log(item)
      })
      .catch((err) => {
        console.log(err)
      })
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
          name='myorder'
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete='off'
          layout='vertical'
        >
          <div className='flex items-center w-full gap-3 justify-end'>
            <Form.Item name='payment'>
              <Select
                placeholder='Hình thức thanh toán'
                className='min-h-[20px] rounded-lg text-[16px] min-w-[150px]'
                options={[
                  {
                    value: 'Paid',
                    label: 'Đã thanh toán'
                  },
                  {
                    value: 'Waiting',
                    label: 'Chờ thanh toán'
                  },
                  {
                    value: 'COD',
                    label: 'COD'
                  }
                ]}
              />
            </Form.Item>
            <Form.Item name='status'>
              <Select
                placeholder='Trạng thái'
                className='min-h-[20px] rounded-lg text-[16px] min-w-[150px]'
                options={[
                  {
                    value: 'pending',
                    label: 'Đang chờ'
                  },
                  {
                    value: 'shipping',
                    label: 'Đang giao'
                  },
                  {
                    value: 'shipped',
                    label: 'Đã giao đến nơi'
                  },
                  {
                    value: 'completed',
                    label: 'Hoàn thành'
                  },
                  {
                    value: 'failed',
                    label: 'Thất bại'
                  },
                  {
                    value: 'cancel',
                    label: 'Hủy'
                  }
                ]}
              />
            </Form.Item>
            <Form.Item name='date'>
              <DatePicker className='min-h-[20px] rounded-lg text-[16px] min-w-[150px]' placeholder='Ngày đặt' />
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
      {data?.data?.length
        ? data?.data?.map((item) => {
            return (
              <div className='px-5 border-t pt-[10px] ' key={item?.id}>
                <div className='flex-col md:flex-row  flex gap-[30px] pb-[30px] '>
                  <Link to={`/order/${item?.id}`}>
                    <img
                      className='w-full md:max-w-[200px] max-h-[200px] overflow-hidden object-cover rounded-[10px]'
                      src={
                        item?.image ||
                        'https://cdn.hoanghamobile.com/tin-tuc/wp-content/uploads/2023/08/ve-bia-sach.jpg'
                      }
                      alt=''
                    />
                  </Link>
                  <div className='mb-2  w-full'>
                    <Link to={`/order/${item?.id}`} className='text-[18px] font-bold'>
                      <h1 className='text-[18px] italic font-bold'>Đơn hàng {item?.order_code}</h1>
                    </Link>
                    <p className='text-[#6B7280] w-full tracking-[1px] text-[16px]'>Rất hân hạnh được đón tiếp bạn</p>
                    <div className='flex gap-3 flex-wrap'>
                      <div className='flex flex-col'>
                        <p>
                          Người nhận: <span>{item?.name}</span>
                        </p>
                        <p>
                          Số điện thoại: <span>{item?.phone_number}</span>
                        </p>
                      </div>
                      <div className='flex flex-col'>
                        <p className='max-w-[200px]'>
                          Phí ship:{' '}
                          <span>
                            <FormatPrice price={item?.ship_fee} />
                          </span>
                        </p>
                        <p>
                          Địa điểm: <span>{item?.address}</span>
                        </p>
                      </div>
                    </div>
                    <div className='w-full border-[#cccc] border-b h-[1px] py-2'></div>
                    <div className='mt-2'>
                      <h2 className='text-[16px] font-medium'>
                        Được đặt vào ngày {dayjs(item?.created_at).format('DD/MM/YYYY')}
                      </h2>
                      <div>
                        <div className=''>
                          Trạng thái: <span className='font-bold'>{item?.status}</span>
                        </div>
                        <div className='flex gap-5 items-center'>
                          <p className='text-[15px] font-bold mb-2'>
                            Tổng tiền: <FormatPrice price={item?.total} />
                          </p>
                          {item?.payment == 'Đang chờ thanh toán' ? (
                            <Button onClick={() => handlePayment(item?.id)}>Thanh toán đơn hàng</Button>
                          ) : (
                            ''
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        : 'Không có đơn hàng nào'}
    </div>
  )
}

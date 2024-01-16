import { Form, Input } from 'antd'
import dayjs from 'dayjs'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import FormatPrice from '../../../untils/formatPrice'
import axios from 'axios'
import { message } from 'antd'

export default function SearchDetailOrder({}) {
  const [dataSearch, setDataSearch] = useState({})
  const onFinish = (values) => {
    console.log(values)
    if (values) {
      axios({
        method: 'POST',
        url: `${import.meta.env.VITE_URL_API}/check-order`,
        data: {
          id: values.billing_id
        }
      })
        .then((item) => {
          console.log(item)
          message.success('Lấy đơn hàng thành công')
          setDataSearch(item?.data?.data)
        })
        .catch((err) => {
          setDataSearch({})
          console.log(err)
          message?.error(err?.response?.data?.message)
        })

      // .get(`${import.meta.env.VITE_URL_API}/check-order`, { id: 'aa6ac821-a420-4417-adbb-2c014f9b333d' })
      // .then((item) => {
      //   console.log(item)
      // })
      // .catch((err) => {
      //   console.log(err)
      // })
    }
  }
  console.log(dataSearch)

  function getCountNights(checkin, checkout) {
    const checkinDate = dayjs(checkin)
    const checkoutDate = dayjs(checkout)
    return checkoutDate.diff(checkinDate, 'day')
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }
  return (
    <div className=''>
      <div className='flex items-center flex-col justify-center mx-auto w-[525px] bg-[#e4e4e4] min-h-[250px] shadow-xl rounded-[5px] px-[40px]'>
        <h1 className='text-2xl font-bold text-center text-[20px] mb-[10px]'>Kiểm tra đơn hàng</h1>
        <Form
          name='basic'
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete='off'
          layout='vertical'
          className='w-full mt-2'
        >
          <Form.Item
            label='Nhập mã đơn hàng'
            name='billing_id'
            rules={[{ required: true, message: 'Nhập mã đơn hàng của bạn' }]}
          >
            <Input className='min-h-[40px] rounded-lg text-[14px] border-[#ccc]' placeholder='Mã đơn hàng...' />
          </Form.Item>

          <Form.Item className='flex justify-end'>
            <button className='bg-[#357ebd] hover:opacity-[0.8] flex gap-2 items-center text-white py-2 px-4 border border-blue-700 rounded'>
              <span>Kiểm tra</span>
              {/* {isLoading ? <LoadingOutlined /> : <SearchOutlined />} */}
            </button>
          </Form.Item>
        </Form>
      </div>
      {Object.keys(dataSearch)?.length ? (
        <div className='px-5 border-t pt-[10px] max-w-[700px] flex mx-auto' key={dataSearch?.id}>
          <div className='flex-col md:flex-row  flex gap-[30px] pb-[30px] '>
            <div className='mb-2  w-full'>
              <Link to={`/order/${dataSearch?.id}`} className='text-[18px] font-bold'>
                <h1 className='text-[18px] italic font-bold'>Đơn hàng {dataSearch?.order_code}</h1>
              </Link>
              <p className='text-[#6B7280] w-full tracking-[1px] text-[16px]'>Rất hân hạnh được đón tiếp bạn</p>
              <div className='flex gap-3 flex-wrap'>
                <div className='flex flex-col'>
                  <p>
                    Người nhận: <span>{dataSearch?.name}</span>
                  </p>
                  <p>
                    Số điện thoại: <span>{dataSearch?.phone_number}</span>
                  </p>
                </div>
                <div className='flex flex-col'>
                  <p className='max-w-[200px]'>
                    Phí ship:{' '}
                    <span>
                      <FormatPrice price={dataSearch?.ship_fee} />
                    </span>
                  </p>
                  <p>
                    Địa điểm: <span>{dataSearch?.address}</span>
                  </p>
                </div>
              </div>
              <div className='w-full border-[#cccc] border-b h-[1px] py-2'></div>
              <div className='mt-2'>
                <h2 className='text-[16px] font-medium'>
                  Được đặt vào ngày {dayjs(dataSearch?.created_at).format('DD/MM/YYYY')}
                </h2>
                <div>
                  <div className=''>
                    Trạng thái: <span className='font-bold'>{dataSearch?.status}</span>
                  </div>
                  <div className='flex gap-5 items-center'>
                    <p className='text-[15px] font-bold mb-2'>
                      Tổng tiền: <FormatPrice price={dataSearch?.total} />
                    </p>
                    {dataSearch?.payment == 'Đang chờ thanh toán' ? (
                      <Button onClick={() => handlePayment(dataSearch?.id)}>Thanh toán đơn hàng</Button>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  )
}

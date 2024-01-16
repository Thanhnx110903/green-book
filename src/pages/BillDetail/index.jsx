import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import dayjs from 'dayjs'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { Form, Input, message, Button, Select, Radio, Divider } from 'antd'
const MySwal = withReactContent(Swal)
import axios from 'axios'
import { useCancelOrderMutation, useGetOrderQuery, useUpdateOrderMutation } from '../../redux/api/order'
import FormatPrice from '../../untils/formatPrice'
import { useCookies } from 'react-cookie'
import {
  useGetCityQuery,
  useGetDistrictQuery,
  useGetShippingOrderQuery,
  useGetShippingPriceQuery,
  useGetWardQuery
} from '../../redux/api/address'
import PcLoading from '../../components/PcLoading'
const BillDetail = () => {
  const { id } = useParams()
  const [cookies] = useCookies(['userInfor'])
  const [provinceId, setProvinceId] = useState(null)
  const [districtId, setDistrictId] = useState(null)
  const [totalAmount, setTotalAmount] = useState(0)
  const [update, setIsUpdate] = useState(false)
  const [serviceId, setServiceId] = useState(null)
  const [wardCode, setWardCode] = useState(null)
  const [updateOrder] = useUpdateOrderMutation()
  const { data: dataCity, isLoading: loadingCity } = useGetCityQuery()
  const { data: shippingOrder, isLoading: loadingShippingOrder } = useGetShippingOrderQuery(districtId)
  const { data: dataPriceShipping, isLoading: loadingPrice } = useGetShippingPriceQuery({
    district_id: districtId,
    service_id: serviceId,
    insurance_value: +totalAmount,
    to_ward_code: wardCode
  })
  const { data: dataDistrict, isLoading: loadingDistrict } = useGetDistrictQuery(provinceId)
  const { data: dataWard, isLoading: loadingWard } = useGetWardQuery(districtId)
  const [form] = Form.useForm()
  const { data, refetch, isLoading } = useGetOrderQuery(id)
  console.log(data)
  const phonePattern = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/
  const onFinish = (values) => {
    if (values) {
      const city = dataCity?.data.find((item) => item?.ProvinceID == values.city)?.ProvinceName
      const district = dataDistrict?.data.find((item) => item?.DistrictID == values.district)?.DistrictName
      const ward = dataWard?.data.find((item) => item?.WardCode == values.ward)?.WardName
      const dataCreate = {
        id,
        name: values?.name,
        phone_number: values?.phone_number,
        address: `${values?.address}, ${city}, ${district}, ${ward}`,
        ship_fee: serviceId ? dataPriceShipping?.data?.total : 50000,
        service_id: serviceId,
        province_id: provinceId,
        district_id: districtId,
        ward_id: wardCode
      }
      axios({
        method: 'PUT',
        url: import.meta.env.VITE_URL_API + '/order' + `/update-order/${dataCreate?.id}`,
        headers: {
          Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNGNkZTBlMzBhZjFlYjI0MWY1NTFmZjdhZjkxNDJjODkwNWFhZDFhZGExYzZjZDEzYWExZWNlN2RjYzM0YjdkOTU4NTllM2Y3MmJlYTU5MTUiLCJpYXQiOjE3MDQ3MDQzMTMuMjc2NzQ0LCJuYmYiOjE3MDQ3MDQzMTMuMjc2NzQ2LCJleHAiOjE3MzYzMjY3MTMuMjcxNDY0LCJzdWIiOiIzMiIsInNjb3BlcyI6W119.AHE9vsHRuzt1c7jgDNviNRS5UvNsVUxKYUrs-1HpMUYyP4luR6ZeyE7ujVyWbCFNrqa470AlcKt7_2QFhcuOfwc0_au4Isv6GvBnvHHC1st7YQSl12VSWRa9Gj18mUZb-e8aMoqyfpL_IwOyUzfrWBiHmXexWJ4PoEkatDKE3bAbDG-E3Oh5hQJ03-VwOkRFL1KuOkjJnCdbGM2DIWeD2TN6cUTPKUWs2r5gcDc2-5nsUHhemw6cjYOe4Cg_8UXZW6KkVtlU04rBWIPeBXk3Waw5AwT2ax8iV6vu9gALgSR2O7m3-CFYAWps3JHhfLuJLRVSdD9F2jiIb_xOQRPaG8nmTNyo7TFNCsdPOIdZ12FFPuL02nKVsZfJy8dTYex-8RFqzV3fEMHTvjKhoAuGk5CwlUKriIbaT0vodrxEaRWJNTz33OxKL15WVZwGARHski5z1LSFDBCVbV39rFI1aL057mIDy54mpKVMUSAe_E_gRMmcJKD6lPz0kxe7oJoBnT1BV_JRmw25hX6vW93QOG6zHtbSzUvL5KWFQ9qOCvP3YHffRGOYrZPK_kJOwxX-1JXgNbtz1LABrRbPeU6wsDaOSjJupW8t4NSNhHX3DCcpgab6RoMNjyeRTjreXjd7n3kKbSiWA3VJvwPS7CNkWyNXJsxov97u2wwXxe6S-Fg`,
          'Content-Type': 'application/json'
        },
        data: dataCreate
      })
        .then((item) => {
          console.log(item)
          message.success(item?.data?.message)
          setIsUpdate(false)
          refetch()
        })
        .catch((err) => {
          console.log(err)
          message.error('Cập nhật thất bại')
        })
      // updateOrder(dataCreate)
      //   .unwrap()
      //   .then((item) => {
      //     console.log(item)
      //     message.success(item?.message)
      //     setIsUpdate(false)
      //   })
      //   .catch((error) => {
      //     console.log(error)
      //     message.error('Đặt hàng thất bại')
      //   })
    }
  }
  const validatePhoneNumber = (_, value) => {
    if (value) {
      if (!phonePattern.test(value)) {
        return Promise.reject('Số điện thoại không hợp lệ!')
      }
    }
    return Promise.resolve()
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }
  const onChangeChooseShipping = (value) => {
    if (value?.target?.value) {
      if (value?.target?.value != 1) {
        setServiceId(value?.target?.value)
      } else {
        setServiceId(null)
      }
    }
  }

  const [cancelOrder, { isLoading: loadingCancel }] = useCancelOrderMutation()

  const onChangeCity = (value) => {
    if (value) {
      setProvinceId(value)
      setDistrictId(null)
      setWardCode(null)
      form.setFieldValue('district', undefined)
      form.setFieldValue('ward', undefined)
    }
  }
  const changeDistrict = (value) => {
    if (value) {
      setDistrictId(value)
      setWardCode(null)
      form.setFieldValue('ward', undefined)
    }
  }
  const changeWard = (value) => {
    if (value) {
      setWardCode(value)
    }
  }
  const cancelBooking = () => {
    if (data?.order?.status != 'Chờ xử lý') {
      return
    }
    MySwal.fire({
      width: '500px',
      height: '600px',
      html: `
        <div className="text-left !py-[50px] !text-[18px] flex">
          <p>Bạn có chắc là muốn hủy đặt hàng</p>
        </div>
      `,
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: `
        Xác nhận
      `,
      cancelButtonText: `
        Hủy
      `
    }).then((result) => {
      if (result.isConfirmed) {
        cancelOrder(id)
          .unwrap()
          .then((res) => {
            message.success(res?.message)
          })
          .catch((err) => {
            console.log(err)
          })
      } else {
      }
    })
  }

  useEffect(() => {
    if (data?.data?.length) {
      setProvinceId(data?.order?.province_id)
      setDistrictId(data?.order?.district_id)
      setTotalAmount(data?.order?.total)
      setServiceId(data?.order?.service_id ? data?.order?.service_id : 1)
      setWardCode(data?.order?.ward_id)
      form.setFieldValue('name', data?.order?.name)
      form.setFieldValue('phone_number', data?.order?.phone_number)
      form.setFieldValue('address', data?.order?.address.split(',')?.[0])
      form.setFieldValue('city', data?.order?.province_id)
      form.setFieldValue('district', data?.order?.district_id)
      form.setFieldValue('ward', data?.order?.ward_id.toString())
      form.setFieldValue('shipping', data?.order?.service_id ? +data?.order?.service_id : 1)
    }
  }, [data, isLoading, loadingShippingOrder])
  useEffect(() => {
    refetch()
  }, [])
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div>
      {isLoading ? (
        <div>
          {Array.from({ length: 8 }).map((_, index) => (
            <PcLoading key={index} />
          ))}
        </div>
      ) : (
        <div className='pt-[30px] pb-[100px] bg-bgr  px-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 mb-4 max-w-[1600px] mx-auto bg-bgr border border-gray-200'>
            <div className='bg-bgr border border-gray-200 rounded-lg shadow mx-auto '>
              <Link to='#'>
                <img className='rounded-t-lg  max-h-[400px] object-cover' src={data?.data[0]?.book_image} alt='' />
              </Link>
              <div className='p-5'>
                <Link to='#'>
                  <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 flex gap-3'>
                    <p className='mb-3 text-[18px] font-bold text-gray-700 '>{data?.data?.[0].book_name}</p>
                    <span>(x{data?.data?.[0]?.quantity})</span>
                  </h5>
                </Link>
                <div>
                  <span className='font-bold'>
                    <FormatPrice price={data?.data?.[0]?.book_price} />
                  </span>
                </div>
              </div>
            </div>
            <div className='grid md:grid-rows-1 grid-rows-1 gap-4'>
              <div className='grid md:grid-cols-1 gap-4'>
                <div className='block h-full p-6 bg-bgr border border-gray-200 rounded-lg shadow'>
                  <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900'>Thông tin đặt hàng</h5>
                  <div className='font-normal text-gray-700'>
                    <ul className='space-y-3 text-gray-500 list-disc list-inside '>
                      <li>Mã đơn hàng: {data?.order?.order_code}</li>
                      <li>Địa chỉ nhận hàng: {data?.order?.address}</li>
                      <li>Ngày đặt: {dayjs(data?.order?.create_at).format('HH:mm DD/MM/YYYY')}</li>
                      <li>Trạng thái thanh toán: {data?.order?.payment} </li>
                      <li>Trạng thái đơn hàng: {data?.order?.status}</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div>
                <div className='block h-full p-6 bg-bgr border border-gray-200 rounded-lg shadow'>
                  <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900'>Thông tin khách hàng</h5>
                  <div className='font-normal text-gray-700'>
                    <ul className='max-w-md space-y-1 text-gray-500 list-disc list-inside'>
                      <li>Tên người đặt: {data?.order?.name}</li>
                      <li>Số điện thoại: {data?.order?.phone_number}</li>
                    </ul>
                  </div>
                  <div className='mt-1 mb-3'></div>
                  <h5 className='mb-2 text-md font-bold tracking-tight text-gray-900'>Trạng thái đơn hàng</h5>
                  <div className='font-normal text-gray-700'>
                    <ul className='max-w-md space-y-1 text-gray-500 list-disc list-inside'>
                      <li>Trạng thái: {data?.order?.status}</li>
                    </ul>
                  </div>
                  <div className='mt-1 mb-3'></div>
                  <div className='font-normal text-gray-700 flex gap-2 flex-wrap'>
                    {data?.order?.status == 'Chờ xử lý' && cookies?.userInfor?.user?.access_token ? (
                      <button
                        className={` hover:bg-red-500
                   hover:text-white  bg-transparent text-red-500 border border-red-500  text-[15px] py-1 px-4 rounded`}
                        onClick={cancelBooking}
                      >
                        Hủy đơn hàng
                      </button>
                    ) : (
                      <button
                        className={`
                   hover:text-white  bg-transparent  text-[15px] py-1 px-4 rounded cursor-not-allowed !bg-gray-200 !border-gray-200 !text-gray-500 
                   }`}
                      >
                        Hủy đơn hàng
                      </button>
                    )}
                    {data?.order?.status == 'Hoàn thành' && (
                      <Link
                        to={`/product/${data?.data?.[0]?.book_id}`}
                        className='hover:bg-blue-500
                   hover:text-white  bg-transparent text-blue-500 border border-blue-500  text-[15px] py-1 px-4 rounded'
                      >
                        <button>Đánh giá ngay</button>
                      </Link>
                    )}
                    {data?.order?.status == 'Chờ xử lý' && cookies?.userInfor?.access_token && (
                      <Link
                        to={``}
                        onClick={() => setIsUpdate((prev) => !prev)}
                        className='hover:bg-blue-500
                   hover:text-white  bg-transparent text-blue-500 border border-blue-500  text-[15px] py-1 px-4 rounded'
                      >
                        <button>Sửa thông tin</button>
                      </Link>
                    )}
                  </div>
                  {update ? (
                    <Form
                      name='basic'
                      className='w-full text-[20px]'
                      onFinish={onFinish}
                      onFinishFailed={onFinishFailed}
                      autoComplete='off'
                      layout='vertical'
                      form={form}
                    >
                      <div className='flex gap-10 lg:flex-row flex-col w-full'>
                        <div className='mt-8 w-full'>
                          <h1 className='text-[18px] font-bold  mb-3'>Thông tin mua hàng</h1>
                          <Form.Item
                            name='name'
                            rules={[
                              {
                                required: true,
                                message: 'Vui lòng nhập tên'
                              },
                              {
                                min: 5,
                                message: 'Tên cần tối thiểu 5 kí tự'
                              }
                            ]}
                          >
                            <Input placeholder='Họ tên' className='min-h-[40px] rounded-lg text-[16px]' />
                          </Form.Item>
                          <Form.Item
                            name='phone_number'
                            rules={[
                              {
                                required: true,
                                message: 'Vui lòng nhập số điện thoại!'
                              },
                              {
                                validator: validatePhoneNumber
                              }
                            ]}
                          >
                            <Input placeholder='Số điện thoại' className='min-h-[40px] rounded-lg text-[16px]' />
                          </Form.Item>
                          <Form.Item
                            name='address'
                            rules={[
                              {
                                required: true,
                                message: 'Vui lòng nhập địa chỉ'
                              }
                            ]}
                          >
                            <Input placeholder='Địa chỉ' className='min-h-[40px] rounded-lg text-[16px]' />
                          </Form.Item>
                          <Form.Item
                            name='city'
                            rules={[
                              {
                                required: true,
                                message: 'Vui lòng chọn thông tin'
                              }
                            ]}
                          >
                            <Select
                              // showSearch
                              // filterOption={filterOption}
                              onChange={onChangeCity}
                              placeholder='Tỉnh thành'
                              className='min-h-[40px] rounded-lg text-[26px] '
                              options={dataCity?.data?.map((item) => {
                                return {
                                  value: item?.ProvinceID,
                                  label: item?.ProvinceName
                                }
                              })}
                            />
                          </Form.Item>
                          <Form.Item
                            name='district'
                            rules={[
                              {
                                required: true,
                                message: 'Vui lòng chọn thông tin'
                              }
                            ]}
                          >
                            <Select
                              placeholder='Quận huyện'
                              disabled={provinceId && !loadingDistrict ? false : true}
                              className='min-h-[40px] rounded-lg text-[16px]'
                              onChange={changeDistrict}
                              options={dataDistrict?.data?.map((item) => {
                                return {
                                  value: item?.DistrictID,
                                  label: item?.DistrictName
                                }
                              })}
                            />
                          </Form.Item>
                          <Form.Item
                            name='ward'
                            rules={[
                              {
                                required: true,
                                message: 'Vui lòng chọn thông tin'
                              }
                            ]}
                          >
                            <Select
                              placeholder='Phường xã'
                              className='min-h-[40px] rounded-lg text-[16px]'
                              onChange={changeWard}
                              disabled={districtId && provinceId && !loadingWard ? false : true}
                              options={dataWard?.data?.map((item) => {
                                return {
                                  value: item?.WardCode,
                                  label: item?.WardName
                                }
                              })}
                            />
                          </Form.Item>
                        </div>
                        <div className='flex flex-col w-full gap-3 mt-8'>
                          <div>
                            <h1 className='text-[18px] font-bold  mb-3 '>Vận chuyển</h1>
                            <Form.Item name='shipping'>
                              <Radio.Group
                                onChange={onChangeChooseShipping}
                                className='flex flex-col gap-3'
                                defaultValue={1}
                              >
                                <Radio
                                  className='border-[1px] rounded-lg border-[rgba(0,0,0,0.5)] flex items-center p-5'
                                  value={1}
                                >
                                  Giao hàng tận nơi
                                </Radio>
                                {shippingOrder?.data?.map((item) => {
                                  return (
                                    <Radio
                                      className='border-[1px] rounded-lg border-[rgba(0,0,0,0.5)] flex items-center p-5'
                                      value={item?.service_id}
                                    >
                                      {item?.short_name}
                                    </Radio>
                                  )
                                })}
                              </Radio.Group>
                            </Form.Item>
                          </div>
                        </div>
                      </div>
                      <div className='flex justify-end items-center gap-5'>
                        <Button htmlType='submit' className='h-[50px] text-[18px] w-[200px]'>
                          Lưu
                        </Button>
                      </div>
                    </Form>
                  ) : (
                    ''
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className='block h-full bg-bgr border border-gray-200 rounded-lg shadow max-w-[1600px] mx-auto'>
            <h5 className='mb-2 p-6 text-2xl font-bold tracking-tight text-gray-900'>Thông tin hoá đơn</h5>
            <div className='relative overflow-x-auto rounded-xl '>
              <table className='w-full text-sm text-left text-gray-500'>
                <thead className='text-xs text-gray-700 uppercase '>
                  <tr className='text-[14px]'>
                    <th scope='col' className='px-6 py-3'></th>
                    <th scope='col' className='px-6 py-3 '>
                      Số lượng
                    </th>
                    <th scope='col' className='px-6 py-3'>
                      Giá
                    </th>
                    <th scope='col' className='px-6 py-3'>
                      Phí ship
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className='bg-bgr border-b text-[14px]'>
                    <th scope='col' className='px-6 py-3'></th>
                    <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap '>
                      {data?.data?.[0]?.quantity}
                    </th>
                    <td className='px-6 py-4'>
                      <FormatPrice price={data?.data?.[0]?.book_price} />
                    </td>
                    <td className='px-6 py-4'>
                      <FormatPrice price={data?.order?.ship_fee} />
                    </td>
                    {/* <td className='px-6 py-4'>
                      <FormatPrice
                        price={+data?.data?.booking?.detail?.[0].price * +data?.data?.booking?.amount_room}
                      />
                    </td> */}
                  </tr>
                </tbody>
                <tfoot>
                  <tr className='bg-bgr border-b text-[14px] '>
                    <th></th>
                    <td className='px-6 py-4'></td>
                    <td className='px-6 py-4 font-bold'>Tổng thanh toán</td>
                    <td className='px-6 py-4'>
                      <FormatPrice price={+data?.order?.total} />
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default BillDetail

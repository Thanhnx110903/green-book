import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Input, message, Button, Select, Radio, Divider } from 'antd'
import FormatPrice from '../../untils/formatPrice'
import { useCreateOrderMutation, useGetCartQuery } from '../../redux/api/cart'
import {
  useGetCityQuery,
  useGetDistrictQuery,
  useGetShippingOrderQuery,
  useGetShippingPriceQuery,
  useGetWardQuery
} from '../../redux/api/address'
import ProtectRouter from '../../components/ProtectRouter'
import { useGetVoucherByFilterQuery } from '../../redux/api/user'
import './checkout.module.css'
import { useCookies } from 'react-cookie'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export default function Checkout() {
  const [cookies] = useCookies(['userInfor'])
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const { data: dataVoucherd, isLoading: idLoadingVocher } = useGetVoucherByFilterQuery({})
  const [provinceId, setProvinceId] = useState(null)
  const [dataVoucher, setDataVoucher] = useState(null)
  const [addVoucher, setAddVoucher] = useState(null)
  const [districtId, setDistrictId] = useState(null)
  const [serviceId, setServiceId] = useState(null)
  const [wardCode, setWardCode] = useState(null)
  const [totalAmount, setTotalAmount] = useState(0)
  const [createOrder, { isLoading: isLoadingCreate }] = useCreateOrderMutation()
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
  const { data: dataCart, refetch, isLoading } = useGetCartQuery()
  const [data, setData] = useState([])
  const onFinish = (values) => {
    console.log(values)
    if (values) {
      const city = dataCity?.data.find((item) => item?.ProvinceID == values.city)?.ProvinceName
      const district = dataDistrict?.data.find((item) => item?.DistrictID == values.district)?.DistrictName
      const ward = dataWard?.data.find((item) => item?.WardCode == values.ward)?.WardName
      let dataCreate = {}
      if (addVoucher) {
        dataCreate = {
          name: values?.name,
          phone_number: values?.phone_number,
          address: `${values?.address}, ${city}, ${district}, ${ward}`,
          payment: values?.payment ? values?.payment : 'COD',
          ship_fee: serviceId ? dataPriceShipping?.data?.total : 50000,
          service_id: serviceId,
          province_id: provinceId,
          district_id: districtId,
          ward_id: wardCode,
          coupon: addVoucher?.id,
          email: values?.email
        }
      }
      dataCreate = {
        name: values?.name,
        phone_number: values?.phone_number,
        address: `${values?.address}, ${city}, ${district}, ${ward}`,
        payment: values?.payment ? values?.payment : 'COD',
        ship_fee: serviceId ? dataPriceShipping?.data?.total : 50000,
        service_id: serviceId,
        province_id: provinceId,
        district_id: districtId,
        ward_id: wardCode,
        email: values?.email
      }
      createOrder(dataCreate)
        .unwrap()
        .then((item) => {
          console.log(item)
          message.success('Đặt hàng thành công')
          if (values?.payment && values?.payment != 'COD') {
            window.open(item?.url?.original?.url)
          }
          navigate('/')
        })
        .catch((error) => {
          console.log(error)
          message.error('Đặt hàng thất bại')
        })
    }
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }
  const phonePattern = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/
  const validatePhoneNumber = (_, value) => {
    if (value) {
      if (!phonePattern.test(value)) {
        return Promise.reject('Số điện thoại không hợp lệ!')
      }
    }
    return Promise.resolve()
  }

  const discountAmount = addVoucher?.coupon?.type
    ? addVoucher?.coupon?.type === 'free_ship'
      ? serviceId
        ? dataPriceShipping?.data?.total
          ? dataPriceShipping?.data?.total
          : 0
        : 0
      : addVoucher?.coupon?.type === 'percent'
      ? (totalAmount * addVoucher?.coupon?.value) / 100
      : addVoucher?.coupon?.value
    : 0
  const filterOption = (input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
  const onChange = (value) => {
    if (value) {
      const data = dataVoucherd?.data?.data?.filter((item) => {
        return item?.coupon_id == value
      })?.[0]
      setAddVoucher(data)
    }
  }
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
  const onChangeChooseShipping = (value) => {
    if (value?.target?.value) {
      if (value?.target?.value != 1) {
        setServiceId(value?.target?.value)
      } else {
        setServiceId(null)
      }
    }
  }
  useEffect(() => {
    if (totalAmount) {
      const voucher = dataVoucherd?.data?.data
        ?.filter((item) => {
          return item?.coupon?.price_required >= totalAmount
        })
        .map((item) => {
          return {
            label: item?.coupon?.name,
            value: item?.coupon_id
          }
        })
      setDataVoucher(voucher)
    }
  }, [totalAmount, dataVoucherd])
  useEffect(() => {
    if (cookies['userInfor'] && cookies['userInfor']?.access_token) {
      form.setFieldValue('name', cookies['userInfor']?.data?.name)
      form.setFieldValue('phone_number', cookies['userInfor']?.data?.phone_number)
      form.setFieldValue('email', cookies['userInfor']?.data?.email)
    }
  }, [])
  useEffect(() => {
    const calculateTotalAmount = () => {
      const newTotalAmount = data.reduce((total, item) => {
        const price = item?.quantity > 20 ? item.warehouse.wholesale_price : item.warehouse.retail_price
        const lineTotal = item.quantity * price
        return total + lineTotal
      }, 0)

      setTotalAmount(newTotalAmount)
    }

    calculateTotalAmount()
  }, [data])
  useEffect(() => {
    if (dataCart?.data?.length) {
      setData(dataCart?.data)
    }
  }, [isLoading, dataCart?.data, refetch])

  return (
    <>
      <Header />
      <div className='flex lg:flex-row flex-col-reverse gap-5 min-h-screen'>
      <div className='mt-[30px] lg:!w-[60%] px-[10%] lg:px-[160px] lg:pl-[130px]'>
          <div>
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
                    name='email'
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng nhập email'
                      },
                      {
                        type: 'email',
                        message: 'Địa chỉ email không hợp lệ!'
                      }
                    ]}
                  >
                    <Input placeholder='Email' className='min-h-[40px] rounded-lg text-[16px]' />
                  </Form.Item>
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
                      // defaultValue={'jack'}
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
                      <Radio.Group onChange={onChangeChooseShipping} className='flex flex-col gap-3' defaultValue={1}>
                        <Radio
                          className='border-[1px] rounded-lg border-[rgba(0,0,0,0.5)] flex items-center p-5'
                          value={1}
                        >
                          Giao hàng tiết kiệm
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
                  <div>
                    <h1 className='text-[18px] font-bold  mb-3 '>Thanh toán</h1>
                    <Form.Item name='payment'>
                      <Radio.Group className='flex flex-col gap-3' defaultValue={'COD'}>
                        <Radio
                          className='border-[1px] rounded-lg border-[rgba(0,0,0,0.5)] flex items-center p-5'
                          value={'MOMO'}
                        >
                          Chuyển khoản
                        </Radio>
                        <Radio
                          className='border-[1px] rounded-lg border-[rgba(0,0,0,0.5)] flex items-center p-5'
                          value={'COD'}
                        >
                          COD
                        </Radio>
                      </Radio.Group>
                    </Form.Item>
                  </div>
                </div>
              </div>
              <div className='flex justify-end items-center gap-5'>
                <Link to='/cart' className='text-blue-600 text-[18px]'>
                  Quay về giỏ hàng
                </Link>
                <Button htmlType='submit' className='h-[50px] text-[18px] w-[200px]'>
                  Đặt hàng
                </Button>
              </div>
            </Form>
          </div>
        </div>
        <div className='flex-1 d:pr-[160px] pt-[30px] bg-[#fafafa] border border-r-[1px] pb-8'>
          <h2 className='text-[20px] font-bold mb-3  px-8'>Đơn hàng ({data?.length} sản phẩm)</h2>
          <Divider />
          <div className='flex flex-col gap-4 max-h-[400px] overflow-y-auto'>
            {data?.map((item) => {
              return (
                <div key={item?.id} className='px-8 flex justify-between items-center  '>
                  <div className='flex items-center gap-3'>
                    <img className='w-[70px] h-[70px] object-cover rounded-3xl' src={item?.book?.image} alt='' />
                    <span className='py-3 max-w-[300px]'>
                      {item?.book?.name} (x{item?.quantity})
                    </span>
                  </div>
                  <span>
                    <FormatPrice
                      price={
                        +(item?.quantity > 20 ? item?.warehouse?.wholesale_price : item.warehouse.retail_price) *
                        +item?.quantity
                      }
                    />
                  </span>
                </div>
              )
            })}
          </div>
          <Divider />
          <div className='flex items-center px-8 gap-5'>
            <Select
              showSearch
              placeholder='Chọn mã giảm giá'
              optionFilterProp='children'
              className='min-h-[40px] rounded-lg !text-[20px]'
              onChange={onChange}
              filterOption={filterOption}
              options={dataVoucher}
            />
          </div>
          <Divider />
          <div>
            <div className='px-8 text-[18px] flex gap-5 flex-col text-gray-500'>
              <div className='flex justify-between'>
                <p>Tạm tính</p>
                <FormatPrice price={totalAmount} />
              </div>
              <div className='flex justify-between'>
                <p>Phí vận chuyển</p>
                {serviceId ? (
                  dataPriceShipping?.data?.total ? (
                    <FormatPrice price={dataPriceShipping?.data?.total} />
                  ) : (
                    ''
                  )
                ) : (
                  <FormatPrice price={50000} />
                )}
              </div>
              <div className='flex justify-between'>
                <p>Mã giảm giá</p>
                {addVoucher
                  ? addVoucher?.coupon?.type == 'free_ship'
                    ? 'Miễn phí vận chuyển'
                    : addVoucher?.coupon?.type == 'percent'
                    ? 'giảm ' + addVoucher?.coupon?.value + '%'
                    : 'Giảm ' + addVoucher?.coupon?.value + ' đ'
                  : ''}
              </div>
            </div>
            <Divider />
            <div className='flex justify-between px-8 text-[18px] text-gray-500'>
              <p>Tổng tiền</p>
              <FormatPrice
                price={totalAmount - discountAmount + (serviceId ? dataPriceShipping?.data?.total || 50000 : 50000)}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

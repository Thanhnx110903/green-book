import { LoadingOutlined, RedoOutlined } from '@ant-design/icons'
import { Form, Rate, message, Pagination } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import classNames from 'classnames/bind'
import { useEffect, useMemo, useState } from 'react'
import { useCookies } from 'react-cookie'
import { Link, useParams, useNavigate } from 'react-router-dom'
import Slider from 'react-slick'
import parse from 'html-react-parser'
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb'
import ProductCard from '../../components/ProductCard/ProductCard'
import { useGetDetailBookQuery, useGetRelatedBookQuery, useGetTopBooksQuery } from '../../redux/api/book'
import { useAddCartMutation } from '../../redux/api/cart'
import { useAddRatingMutation, useGetRatingQuery } from '../../redux/api/user'
import FormatPrice from '../../untils/formatPrice'
import styles from './ProductDetail.module.css'
import { useQueryParams } from '../ListProducts/ListProducts'
import PcLoading from '../../components/PcLoading'
const cx = classNames.bind(styles)

export default function ProductDetail() {
  const [commentForm] = Form.useForm()
  const [cookies] = useCookies(['userInfor'])
  const { id } = useParams()
  const { getAll } = useQueryParams()
  const queryParams = useMemo(() => getAll(), [getAll])
  const [page, setPage] = useState(1)
  const [idCate, setIdCate] = useState(null)
  const { data, isLoading } = useGetDetailBookQuery(id)
  const { data: dataRelated, isLoading: isLoadingRelatedBook } = useGetRelatedBookQuery(idCate)
  const { data: dataRating, isLoading: isLoadingRating } = useGetRatingQuery({
    id,
    page: page
  })
  const { data: dataTopBook, isLoading: isLoadingTopBook } = useGetTopBooksQuery()
  const [addRating, { isLoading: loadingRating }] = useAddRatingMutation()
  const [total, setTotal] = useState(1)
  let [baseQty, setBaseQty] = useState(1)
  const navigate = useNavigate()
  const [addToCart, { isLoading: cartLoading }] = useAddCartMutation()
  const handleQuantity = (e) => {
    if (!Number(e) || Number(e) < 1) {
      return
    } else {
      setBaseQty(e)
    }
  }
  const onFinishComment = async (values) => {
    if (values) {
      addRating({
        id,
        data: {
          ...values,
          id
        }
      })
        .unwrap()
        .then((item) => {
          message.success(item?.message)
          commentForm.resetFields()
        })
        .catch((err) => {
          commentForm.resetFields()
          message.error(err?.data?.message)
        })
    }
  }

  const handlePaginationChange = (page) => {
    setPage(page)
    const newQueryParams = { ...queryParams }
    newQueryParams.page = page
    navigate(`${window.location.pathname}?${new URLSearchParams(newQueryParams).toString()}`)
  }

  const onFinishFailedComment = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }
  const handleAddToCart = () => {
    const data = {
      id,
      data: {
        quantity: baseQty
      }
    }
    addToCart(data)
      .unwrap()
      .then((item) => {
        if (item?.message == 'Sản phẩm có sẵn không đủ') {
          return message.error(item?.message)
        }
        message.success(item?.message)
      })
      .catch((err) => {
        message.error('Thêm sản phẩm thất bại')
        console.log(err)
      })
  }

  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1
  }
  useEffect(() => {
    if (data?.data?.category_id) {
      setIdCate(data?.data?.category_id)
    }
  }, [isLoading, data])
  useEffect(() => {
    if (!isLoadingRating && dataRating?.data?.last_page) {
      setTotal(dataRating?.data?.last_page)
    }
  }, [isLoadingRating, dataRating])
  useEffect(() => {
    if (queryParams?.page) {
      setPage(+queryParams.page)
    }
  }, [])
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <>
      <Breadcrumb
        params={[
          {
            label: 'Trang chủ',
            href: '/'
          },
          {
            label: data?.data?.category?.name,
            href: '/' + data?.data?.category?.slug
          },
          {
            label: data?.data?.name,
            href: '/'
          }
        ]}
        currenParam={data?.data?.name}
      />
      {isLoading || isLoadingTopBook || isLoadingRelatedBook ? (
        <div className='mt-5 w-full'>
          {Array.from({ length: 5 }).map((_, index) => (
            <PcLoading key={index} />
          ))}
        </div>
      ) : (
        <div className={cx('container-wrap')}>
          <div className='d-flex mt-[55px]'>
            <div className='mx-auto'>
              <img className='w-[494px] h-[494px] object-contain' src={data?.data?.image} alt={data?.data?.name} />
            </div>
            <div className='lg:col-span-2 ml-6 w-2/3'>
              <div>
                <h1 className='font-normal text-4xl'>{data?.data?.name}</h1>
                <div className='flex my-4 pb-5 border-b'>
                  <div className='flex items-center'>
                    <p className='font-normal text-lg text-left '>Tình trạng :</p>
                    <span className='font-normal text-lg text-red-500'>
                      {data?.data?.warehouse?.quantity > 0
                        ? data?.data?.warehouse?.quantity > 30
                          ? 'Còn hàng'
                          : 'Sắp hết'
                        : 'Hết hàng'}
                    </span>
                  </div>
                  <span className='mx-4'>|</span>
                  <div className='flex items-center'>
                    <p className='font-normal text-lg text-left '>Số lượng: </p>
                    <span className='font-normal text-lg text-red-500'>{data?.data?.warehouse?.quantity}</span>
                  </div>
                </div>
                <div>
                  <h2 className='font-semibold text-4xl text-[#ba141a] my-4'>
                    <FormatPrice price={data?.data?.warehouse?.retail_price} />
                  </h2>
                  <p className='text-gray-400 italic'>
                    Giá sỉ: <FormatPrice price={data?.data?.warehouse?.wholesale_price} /> (Mua trên 20 sản phẩm)
                  </p>
                </div>
                <div className='my-10 flex items-center'>
                  <p className='text-[#727272] font-normal text-2xl'>Số lượng:</p>
                  <div className='flex items-center pl-20'>
                    <button
                      onClick={() => setBaseQty(Number(baseQty) === 1 ? Number((baseQty = 1)) : Number(baseQty) - 1)}
                      className='border w-12 h-12 rounded-full flex items-center justify-center  font-medium text-3xl  text-[#ced4da] pb-1'
                    >
                      -
                    </button>
                    <input
                      type='text'
                      name=''
                      id=''
                      value={baseQty}
                      onChange={(e) => handleQuantity(e.target.value)}
                      className=' p-2 text-center outline-none w-[28px] text-[1.6rem] border-none focus:outline-none focus:shadow-none focus:border-none'
                    />
                    <button
                      onClick={() => setBaseQty(Number(baseQty) + 1)}
                      className='border w-12 h-12 rounded-full font-medium text-3xl flex items-center justify-center text-[#ced4da] pb-1'
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className='flex'>
                  <button
                    onClick={handleAddToCart}
                    className='d-flex items-center justify-center w-[196px] p-[10px] rounded-full font-normal text-3xl  text-[#ffffff]  bg-[#bb141a;] hover:opacity'
                  >
                    {!cartLoading ? <span>Thêm vào giỏ</span> : <LoadingOutlined />}
                  </button>
                </div>
                <div className='my-7 border-b'>
                  <span className=' font-medium text-2xl '>Liên hệ</span>
                  <div>
                    <a href='!#'>
                      <img
                        src='https://bizweb.dktcdn.net/100/441/742/themes/842637/assets/footer_trustbadge.jpg?1680964744883'
                        alt=''
                      />
                    </a>
                  </div>
                </div>
              </div>

              <div>
                <ul className='grid grid-cols-2 gap-3'>
                  <li>
                    <div className='flex items-center font-normal text-2xl'>
                      <img
                        className='w-12 mr-4'
                        src='https://bizweb.dktcdn.net/100/441/742/themes/842637/assets/policy_product_image_1.png?1680964744883'
                        alt=''
                      />
                      <div>Giao hàng toàn quốc</div>
                    </div>
                  </li>
                  <li>
                    <div className='flex items-center font-normal text-2xl'>
                      <img
                        className='w-12 mr-4'
                        src='https://bizweb.dktcdn.net/100/441/742/themes/842637/assets/policy_product_image_2.png?1680964744883'
                        alt=''
                      />
                      <div>Tích điểm tất cả sản phẩm </div>
                    </div>
                  </li>
                  <li>
                    <div className='flex items-center font-normal text-2xl'>
                      <img
                        className='w-12 mr-4'
                        src='	https://bizweb.dktcdn.net/100/441/742/themes/842637/assets/policy_product_image_3.png?1680964744883'
                        alt=''
                      />
                      <div>Giảm 5% khi thanh tóan online</div>
                    </div>
                  </li>
                  <li>
                    <div className='flex items-center font-normal text-2xl'>
                      <img
                        className='w-12 mr-4'
                        src='https://bizweb.dktcdn.net/100/441/742/themes/842637/assets/policy_product_image_4.png?1680964744883'
                        alt=''
                      />
                      <div>Cam kết chính hãng</div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div>
            <div className='p-3'>
              <div className='mt-9'>
                <div className=''>
                  <h1 className='font-medium text-4xl py-5 border-b border-black'>Mô tả sản phẩm</h1>
                  <div className='my-7 font-normal text-2xl'>{parse(data?.data?.description)}</div>
                </div>
              </div>
            </div>
            <div className='m-6'>
              <div className='flex lg:flex-row border justify-between p-4 md:flex-col'>
                <div className='flex items-center gap-4'>
                  <div>
                    <img className='w-36' src={data?.data?.image} alt='' />
                  </div>
                  <div className=''>
                    <h1 className='font-medium text-2xl p-2'>{data?.data?.name}</h1>
                    <p className=' text-[#ba141a] font-medium text-2xl p-2'>
                      {' '}
                      <FormatPrice price={data?.data?.warehouse?.wholesale_price} />
                    </p>
                  </div>
                </div>
                <div className='flex items-center'>
                  <div className='my-10 flex items-center'>
                    <p className='text-[#727272] font-normal text-2xl'>Số lượng :</p>
                    <div className='flex items-center pl-20'>
                      <button
                        className='border w-12 h-12 rounded-full font-medium text-3xl  text-[#ced4da] pb-1'
                        onClick={() => setBaseQty(Number(baseQty) === 1 ? Number((baseQty = 1)) : Number(baseQty) - 1)}
                      >
                        -
                      </button>
                      <input
                        type='text'
                        name=''
                        id=''
                        min={0}
                        value={baseQty || 1}
                        className=' p-2 px-4 outline-none w-[28px] text-[1.6rem] border-none focus:outline-none focus:border-none'
                      />
                      <button
                        className='border w-12 h-12 rounded-full text -[1.6rem] text-3xl  text-[#ced4da] pb-1'
                        onClick={() => setBaseQty(Number(baseQty) + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={handleAddToCart}
                      className='d-flex items-center  justify-center p-[6px] w-64 rounded-full font-normal text-[16px] text-[#ffffff]  mx-4 bg-[#bb141a;]'
                    >
                      {!cartLoading ? <span>Thêm vào giỏ</span> : <LoadingOutlined />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className='m-6'>
              {cookies?.userInfor?.access_token ? (
                <Form
                  name='basic'
                  onFinish={onFinishComment}
                  onFinishFailed={onFinishFailedComment}
                  autoComplete='off'
                  form={commentForm}
                >
                  <Form.Item name='rating' rules={[{ required: true, message: 'Đánh giá sao' }]}>
                    <Rate allowHalf />
                  </Form.Item>
                  <Form.Item
                    name='comment'
                    rules={[{ required: true, message: 'Vui lòng nhập bình luận' }]}
                    className=''
                  >
                    <TextArea
                      rows={4}
                      placeholder='Đánh giá của bạn....'
                      className='pt-3 border bg-none outline-none'
                    />
                  </Form.Item>

                  <Form.Item>
                    <button
                      className={`bg-blue-500 flex items-center gap-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded }`}
                    >
                      <span className={`${!loadingRating ? 'block' : 'hidden'}`}>Đánh giá</span>
                      <span className={`${loadingRating ? 'block' : 'hidden'} animate-spin`}>
                        <RedoOutlined className='text-[15px]' />
                      </span>
                    </button>
                  </Form.Item>
                </Form>
              ) : (
                <span>
                  Bàn cần đăng nhập để có thể đánh giá.{' '}
                  <Link className='text-blue-500' to='/auth/login'>
                    Đăng nhập ngay
                  </Link>
                </span>
              )}
              <div>
                {dataRating?.data?.data.length ? (
                  dataRating?.data?.data.map((item) => {
                    return (
                      <section key={item?.id} className='px-8 md:px-[200px] pt-8 m-auto'>
                        <div className=' mx-auto '>
                          <article
                            className='text-base rounded-lg '
                            style={{
                              background: 'white'
                            }}
                          >
                            <footer
                              className='flex justify-between items-center pb-2 '
                              style={{
                                background: 'white'
                              }}
                            >
                              <div className='flex items-center '>
                                <p className='inline-flex text-[14px]  items-center mr-3 text-sm text-gray-900  font-semibold'>
                                  <img
                                    className='mr-2 w-[40px] h-[40px] rounded-full'
                                    src={'https://cdn-icons-png.flaticon.com/512/149/149071.png'}
                                    alt={item?.user?.name}
                                  />
                                  <span className='text-[16px]'>{item?.user?.name}</span>
                                </p>
                              </div>
                            </footer>
                            <div className=' pb-2'>
                              <div className='flex items-center space-x-1 '>
                                <Rate
                                  allowHalf
                                  disabled
                                  defaultValue={5}
                                  value={+item?.rating}
                                  className='text-[18px]'
                                />
                              </div>
                            </div>
                            <p className='text-gray-500 text-[14px]'>{item.comment}</p>
                          </article>
                        </div>
                      </section>
                    )
                  })
                ) : (
                  <h1 className='text-[20px] italic'>Chưa có đánh giá nào</h1>
                )}
                <div className='flex justify-end my-5'>
                  <Pagination
                    defaultCurrent={1}
                    total={(total || 1) * 10}
                    onChange={handlePaginationChange}
                    current={page}
                  />
                </div>
              </div>
            </div>
            <div className='m-6'>
              <div>
                <h1 className='font-medium text-4xl py-5'>Sản phẩm cùng loại</h1>
                <Slider {...settings} className='grid lg:grid-cols-5  py-5 sm:grid-cols-2 md:grid-cols-4'>
                  {dataRelated?.data?.data?.slice(0, 5).map((productbyCategory) => (
                    <div key={productbyCategory?.id} className='px-8'>
                      <ProductCard key={productbyCategory?.id} books={productbyCategory} />
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
            <div className='m-6'>
              <div>
                <h1 className='font-medium text-4xl py-5 '>Sản phẩm mua nhiều</h1>
                <Slider {...settings} className='grid lg:grid-cols-5  py-5 sm:grid-cols-2 md:grid-cols-4'>
                  {dataTopBook?.data?.data?.slice(0, 5).map((productbyCategory) => (
                    <div key={productbyCategory?.id} className='px-8'>
                      <ProductCard key={productbyCategory?.id} books={productbyCategory} />
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

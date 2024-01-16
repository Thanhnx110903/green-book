import classNames from 'classnames/bind'
import React, { useEffect, useState, useMemo, useRef } from 'react'
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb'
import ProductCard from '../../components/ProductCard/ProductCard'
import SidebarCategory from '../../components/Sidebar/SidebarCategory'
import { useGetBookByQueryQuery, useGetBooksQuery, useGetTopBooksQuery } from '../../redux/api/book'
import { useGetCategoriesQuery } from '../../redux/api/category'
import styles from './ListProducts.module.css'
import { Slider, Pagination, Input, Form, Button } from 'antd'
import { useParams, useLocation, Link, useNavigate } from 'react-router-dom'
import FormatPrice from '../../untils/formatPrice'
import PcLoading from '../../components/PcLoading'

const cx = classNames.bind(styles)

export const useQueryParams = () => {
  const location = useLocation()

  const queryParams = new URLSearchParams(location.search)
  return {
    get: (param) => queryParams.get(param),
    getAll: () => Object.fromEntries(queryParams.entries())
  }
}

const ListProducts = () => {
  const { data: dataTopBook, isLoading: isLoadingTopBook } = useGetTopBooksQuery()
  const currenRef = useRef(null)
  const { category } = useParams()
  const { getAll } = useQueryParams()
  const queryParams = useMemo(() => getAll(), [getAll])
  const {
    data: dataQuery,
    isLoading,
    refetch,
    error
  } = useGetBookByQueryQuery({ ...queryParams, category_id: category } || {})
  console.log(dataTopBook)
  const [data, setData] = useState([])
  const [filterPrice, setFilterPrice] = useState(queryParams?.max_price || 0)
  const { data: categoriesData, isLoading: cateLoading } = useGetCategoriesQuery()
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(1)
  const onFinish = (values) => {
    const newQueryParams = { ...queryParams, ...values }
    for (const key in values) {
      if (Object.prototype.hasOwnProperty.call(values, key)) {
        if (!(values[key] == undefined || values[key] == 0)) {
          newQueryParams[key] = values[key]
        }
      }
    }
    const filteredEntries = Object.entries(newQueryParams).filter(
      ([key, value]) => value !== undefined && value !== '' && value !== 0
    )
    const filteredObject = Object.fromEntries(filteredEntries)
    navigate(`${window.location.pathname}?${new URLSearchParams(filteredObject).toString()}`)
    refetch()
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }
  const handlePaginationChange = (page) => {
    setPage(page)
    const newQueryParams = { ...queryParams }
    newQueryParams.page = page
    if (currenRef?.current) {
      currenRef.current.scrollIntoView({ behavior: 'smooth' })
    }
    navigate(`${window.location.pathname}?${new URLSearchParams(newQueryParams).toString()}`)
    refetch()
  }
  const onChange = (value) => {
    if (+value > 0) {
      setFilterPrice(+value)
    } else {
      setFilterPrice(0)
    }
  }
  const removeUndefinedProps = (obj) => Object.fromEntries(Object.entries(obj).filter(([_, v]) => v !== undefined))
  useEffect(() => {
    if (queryParams?.page) {
      setPage(+queryParams.page)
    }
    if (queryParams?.max) {
      setFilterPrice(+queryParams.max)
    }
    setFilterPrice(+queryParams.max)
  }, [])
  useEffect(() => {
    form.setFieldsValue({
      author: queryParams?.author ? queryParams?.author : '',
      name: queryParams?.name ? queryParams?.name : '',
      published_company: queryParams?.published_company ? queryParams?.published_company : ''
    })
  }, [queryParams])
  useEffect(() => {
    if (error?.status == 404) {
      const newQueryParams = { ...queryParams }
      newQueryParams.page = 1
      setPage(1)
      setTotal(1)
      navigate(`${window.location.pathname}?${new URLSearchParams(newQueryParams).toString()}`)
      return setData([])
    }
    if (!isLoading && dataQuery?.data?.data.length) {
      setTotal(dataQuery?.data?.last_page)
      setData(dataQuery?.data?.data)
    }
  }, [isLoading, dataQuery, error])

  console.log(data)
  return (
    <div className=''>
      {/* <Breadcrumb /> */}
      {/* <img src='http://localhost:8000/storage/books/cover.png' alt='' /> */}
      <div className={cx('container-wrap')}>
        {/* <div className='flex justify-center mt-8  '>
          <img src='https://bizweb.dktcdn.net/100/441/742/collections/m-qr.png?v=1656663743390' alt='' />
        </div> */}
        <div className={cx('d-flex justify-between mt-[60px]')}>
          <div className={cx('w-[258px]  p-[15px] mb-[30px]')}>
            <div className='bg-[#f5f5f5] p-8'>
              <h3 className={cx('font-bold  text-[1.6rem] mb-[24px]')}>DANH MỤC SẢN PHẨM</h3>
              <div className={cx('')}>
                <ul>
                  <SidebarCategory categories={categoriesData?.data} />
                </ul>
              </div>
            </div>
            <div className={cx('mt-[40px]')}>
              <h4 className={cx('font-bold text-[1.6rem] mb-[24px]')}>MỨC GIÁ DƯỚI</h4>

              <Form
                name='basic'
                className='flex flex-col'
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete='off'
                layout='vertical'
                form={form}
              >
                <div>
                  <span>
                    <FormatPrice price={filterPrice * 1000 || 0} />
                  </span>
                  <Form.Item name='max'>
                    <Slider defaultValue={filterPrice} onChange={onChange} max={1000} />
                  </Form.Item>
                  <div className=''>
                    <Form.Item name='name'>
                      <Input placeholder='Tên sách' className='min-h-[40px] rounded-lg text-[16px]' />
                    </Form.Item>
                    <Form.Item name='author'>
                      <Input placeholder='Tên tác giả...' className='min-h-[40px] rounded-lg text-[16px]' />
                    </Form.Item>
                    <Form.Item name='published_company'>
                      <Input placeholder='Nhà xuất bản...' className='min-h-[40px] rounded-lg text-[16px]' />
                    </Form.Item>
                  </div>
                  <div className='flex gap-3'>
                    <Button htmlType='submit'>Tìm kiếm</Button>
                    <Button
                      htmlType='button'
                      onClick={() => {
                        form.resetFields()
                        setFilterPrice(0)
                        navigate(`${window.location.pathname}`)
                      }}
                    >
                      Làm mới
                    </Button>
                  </div>
                </div>
              </Form>
              <div className='flex flex-col'></div>
            </div>
          </div>
          <div className={cx('w-[1122px] ')}>
            <div>
              <h1 className='text-[31px] font-normal' ref={currenRef}>
                {data?.[0]?.category?.name}
              </h1>
              <div className={cx('d-flex items-center border-b-[1px] border-solid border-[#dee2e6] mb-[10px]')}>
                <div className={cx('mr-[20px]')}>Sắp xếp: </div>
                <Link
                  to={{
                    pathname: window.location.pathname,
                    search: new URLSearchParams(
                      removeUndefinedProps({
                        ...queryParams,
                        sort_name: 'asc',
                        sort_date: undefined,
                        sort_price: undefined
                      })
                    ).toString()
                  }}
                >
                  <button
                    className={cx(
                      'p-[10px] text-[#898989] border-b-[1px] border-transparent hover:border-[#bb141a] hover:text-[#df171e] hover:border-b-[1px]',
                      `${queryParams?.sort_name == 'asc' && 'text-[#df171e] !border-[#bb141a] border-b-[1px]'}`
                    )}
                  >
                    Tên A - Z
                  </button>
                </Link>
                <Link
                  to={{
                    pathname: window.location.pathname,
                    search: new URLSearchParams(
                      removeUndefinedProps({
                        ...queryParams,
                        sort_name: 'desc',
                        sort_date: undefined,
                        sort_price: undefined
                      })
                    ).toString()
                  }}
                >
                  <button
                    className={cx(
                      'p-[10px] text-[#898989] border-b-[1px] border-transparent hover:border-[#bb141a] hover:text-[#df171e] hover:border-b-[1px]',
                      `${queryParams?.sort_name == 'desc' && 'text-[#df171e] !border-[#bb141a] border-b-[1px]'}`
                    )}
                  >
                    Tên Z - A
                  </button>
                </Link>
                <Link
                  to={{
                    pathname: window.location.pathname,
                    search: new URLSearchParams(
                      removeUndefinedProps({
                        ...queryParams,
                        sort_price: 'asc',
                        sort_name: undefined,
                        sort_date: undefined
                      })
                    ).toString()
                  }}
                >
                  <button
                    className={cx(
                      'p-[10px] text-[#898989] border-b-[1px] border-transparent hover:border-[#bb141a] hover:text-[#df171e] hover:border-b-[1px]',
                      `${queryParams?.sort_price == 'asc' && 'text-[#df171e] !border-[#bb141a] border-b-[1px]'}`
                    )}
                  >
                    Giá tăng dần
                  </button>
                </Link>
                <Link
                  to={{
                    pathname: window.location.pathname,
                    search: new URLSearchParams(
                      removeUndefinedProps({
                        ...queryParams,
                        sort_price: 'desc',
                        sort_name: undefined,
                        sort_date: undefined
                      })
                    ).toString()
                  }}
                >
                  <button
                    className={cx(
                      'p-[10px] text-[#898989] border-b-[1px] border-transparent hover:border-[#bb141a] hover:text-[#df171e] hover:border-b-[1px]',
                      `${queryParams?.sort_price == 'desc' && 'text-[#df171e] !border-[#bb141a] border-b-[1px]'}`
                    )}
                  >
                    Giá giảm dần
                  </button>
                </Link>
                <Link
                  to={{
                    pathname: window.location.pathname,
                    search: new URLSearchParams(
                      removeUndefinedProps({
                        ...queryParams,
                        sort_date: 'desc',
                        sort_name: undefined,
                        sort_price: undefined
                      })
                    ).toString()
                  }}
                >
                  <button
                    className={cx(
                      'p-[10px] text-[#898989] border-b-[1px] border-transparent hover:border-[#bb141a] hover:text-[#df171e] hover:border-b-[1px]',
                      `${queryParams?.sort_date == 'desc' && 'text-[#df171e] !border-[#bb141a] border-b-[1px]'}`
                    )}
                  >
                    Hàng mới
                  </button>
                </Link>
              </div>
            </div>
            <div className='flex flex-col mb-5'>
              {isLoading ? (
                <div className='mt-5 w-full'>
                  {Array.from({ length: 3 }).map((_, index) => (
                    <PcLoading key={index} />
                  ))}
                </div>
              ) : (
                <>
                  <ul className={cx('grid grid-cols-4 gap-[25px] mb-3', `${data?.length ? 'grid' : 'hidden'}`)}>
                    {data?.map((showProductList) => (
                      <ProductCard key={showProductList.id} slug={category} books={showProductList} />
                    ))}
                  </ul>
                  {data?.length ? (
                    ''
                  ) : (
                    <div className='text-[23px] italic bg-yellow-200 px-3'>Không có sản phẩm nào</div>
                  )}
                </>
              )}
            </div>
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
      </div>
      {/* News */}
      <div className={cx('container-wrap mb-[40px]')}>
        <div>
          <h1 className='font-medium text-4xl py-5 '>Sản phẩm mua nhiều</h1>
          <div className='grid lg:grid-cols-5 gap-5 py-5 sm:grid-cols-2 md:grid-cols-4'>
            {dataTopBook &&
              dataTopBook?.data?.data.slice(0, 4)?.map((productbyCategory) => (
                <div key={productbyCategory?.id} className='px-8'>
                  <ProductCard key={productbyCategory?.id} books={productbyCategory} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListProducts

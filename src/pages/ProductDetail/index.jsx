import classNames from 'classnames/bind'
import styles from './ProductDetail.module.css'
import { useParams, useLocation } from 'react-router-dom'
import { getBook } from '../../apis'
import { useEffect, useState } from 'react'
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb'
import { useSelector } from 'react-redux'
import ProductCard from '../../components/ProductCard/ProductCard'

import Slider from 'react-slick'
const cx = classNames.bind(styles)

export default function ProductDetail() {
  const { state } = useLocation()
  // console.log(state);
  const [product, setProduct] = useState(null)
  const [productbyCategory, setProductByCategory] = useState(null)
  const { pid } = useParams()
  const fetchProductData = async () => {
    const response = await getBook(pid)
    console.log(response);
    setProduct(response.data)
  }
  const { books } = useSelector((state) => state.books)
  const { categories } = useSelector((state) => state.categories)
  const categoryId = categories.filter((item) => item.id === state)
  const apiGetIdCategories = categoryId.find((item) => item.id)
  // console.log(apiGetIdCategories?.id);
  const allProductType = books.filter((item) => item.category_id === Number(apiGetIdCategories?.id))
  // console.log(allProductType);
  let [baseQty, setBaseQty] = useState(1)
  useEffect(() => {
    if (pid) {
      fetchProductData()
    }
  }, [pid])

  useEffect(() => {
    setProductByCategory(allProductType)
  }, [state])
  const handleQuantity = (e) => {
    if (!Number(e) || Number(e) < 1) {
      return
    } else {
      setBaseQty(e)
      // console.log(e);
    }
  }

  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1
  }
  return (
    <>
      <Breadcrumb />
      <div className={cx('container mx-auto')}>
        <div className='box-border'>
          <div className='grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 mt-9'>
            <div className='mx-auto'>
              <img className='w-[280px] h-[328px] ' src={product?.image} alt='giang' />
            </div>
            <div className='lg:col-span-2 ml-6 w-2/3'>
              <div>
                <h1 className='font-normal text-4xl'>{product?.name}</h1>
                <div className='flex my-4 pb-5 border-b'>
                  <div className='flex'>
                    <p className='font-normal text-lg text-left '>Tình trạng :</p>
                    <span className='font-normal text-lg text-red-500'>Hết hàng</span>
                  </div>
                  <span className='mx-4'>|</span>
                  <div className='flex'>
                    <p className='font-normal text-lg text-left '>Mã SKU :</p>
                    <span className='font-normal text-lg text-red-500'>Đang cập nhật</span>
                  </div>
                </div>
                <h2 className='font-semibold text-4xl text-[#ba141a] my-4'>{product?.price}₫</h2>
                <div className='my-10 flex items-center'>
                  <p className='text-[#727272] font-normal text-2xl'>Số lượng :</p>
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
                      className=' p-2 text-center outline-none w-[28px] border-none focus:outline-none focus:shadow-none focus:border-none'
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
                  <button className='border w-64 h-12 rounded-full font-normal text-3xl  text-[#bb141a] pb-1 border-[#bb141a]'>
                    Mua ngay
                  </button>
                  <button className='border w-64 h-12 rounded-full font-normal text-3xl  text-[#ffffff] pb-1 mx-4 bg-[#bb141a;]'>
                    Thêm vào giỏ
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
              <div className='grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 mt-9'>
                <div className='lg:col-span-2 ml-6'>
                  <h1 className='font-medium text-4xl py-5 border-b border-black'>Mô tả sản phẩm</h1>
                  <div className='my-7 font-normal text-2xl'>{product?.description}</div>
                </div>
              </div>
            </div>
            <div className='m-6'>
              <div className='flex lg:flex-row border justify-between p-4 md:flex-col'>
                <div className='flex items-center'>
                  <div>
                    <img className='w-36' src={product?.image} alt='' />
                  </div>
                  <div className=''>
                    <h1 className='font-medium text-2xl p-2'>{product?.name}</h1>
                    <p className=' text-[#ba141a] font-medium text-2xl p-2'> {product?.price}đ</p>
                  </div>
                </div>
                <div className='flex items-center'>
                  <div className='my-10 flex items-center'>
                    <p className='text-[#727272] font-normal text-2xl'>Số lượng :</p>
                    <div className='flex items-center pl-20'>
                      <button className='border w-12 h-12 rounded-full font-medium text-3xl  text-[#ced4da] pb-1'>
                        -
                      </button>
                      <input
                        type='text'
                        name=''
                        id=''
                        value={1}
                        className=' p-2 px-4 outline-none w-[28px] border-none focus:outline-none focus:border-none'
                      />
                      <button className='border w-12 h-12 rounded-full font-medium text-3xl  text-[#ced4da] pb-1'>
                        +
                      </button>
                    </div>
                  </div>
                  <div>
                    <button className='border w-64 h-12 rounded-full font-normal text-3xl  text-[#ffffff] pb-1 mx-4 bg-[#bb141a;]'>
                      Thêm vào giỏ
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className='m-6'>
              <div>
                <h1 className='font-medium text-4xl py-5'>Sản phẩm cùng loại</h1>
               
                
                  <Slider {...settings} className='grid lg:grid-cols-5  py-5 sm:grid-cols-2 md:grid-cols-4'>
                    {productbyCategory?.map((productbyCategory) => (
                      <div key={productbyCategory?.id} className='px-8'>
                        <ProductCard key={productbyCategory?.id} books={productbyCategory} />
                      </div>
                    ))}
                       </Slider>
              
             
              </div>
            </div>
            <div className='m-6'>
              <div>
                <h1 className='font-medium text-4xl py-5 '>Sản phẩm đã xem</h1>
                <div className='grid lg:grid-cols-5 gap-5 py-5 sm:grid-cols-2 md:grid-cols-4'>
                  <div>
                    <img
                      className='w-11/12 h-11/12'
                      src='https://bizweb.dktcdn.net/thumb/large/100/441/742/products/f96d4cc1-1f2c-4e7a-99a5-d35956152e8c.jpg?v=1657509099123'
                      alt=''
                    />
                    <div className='pl-9'>
                      <h2 className='font-medium text-2xl p-3'>cau Ma Nhà Xí Hanako - Tập 11 </h2>
                      <span className='text-[#ba141a] font-medium text-2xl p-3'>28.000đ</span>
                    </div>
                  </div>
                  <div>
                    <div>
                      <img
                        src='https://bizweb.dktcdn.net/thumb/large/100/441/742/products/bb441049-87e8-475e-8f63-ec3d6249a06f.jpg?v=1657509092697'
                        alt=''
                      />
                    </div>
                    <div className='pl-9'>
                      <h2 className='font-medium text-2xl p-3'>cau Ma Nhà Xí Hanako - Tập 11 </h2>
                      <span className='text-[#ba141a] font-medium text-2xl p-3'>28.000đ</span>
                    </div>
                  </div>
                  <div>
                    <img
                      src='https://bizweb.dktcdn.net/thumb/large/100/441/742/products/bb441049-87e8-475e-8f63-ec3d6249a06f.jpg?v=1657509092697'
                      alt=''
                    />
                    <div className='pl-9'>
                      <h2 className='font-medium text-2xl p-3'>cau Ma Nhà Xí Hanako - Tập 11 </h2>
                      <span className='text-[#ba141a] font-medium text-2xl p-3'>28.000đ</span>
                    </div>
                  </div>
                  <div>
                    <img
                      src='https://bizweb.dktcdn.net/thumb/large/100/441/742/products/1508b90d-e088-47cd-89c4-9d520e336961.jpg?v=1657509086007'
                      alt=''
                    />
                    <div className='pl-9'>
                      <h2 className='font-medium text-2xl p-3'>cau Ma Nhà Xí Hanako - Tập 11 </h2>
                      <span className='text-[#ba141a] font-medium text-2xl p-3'>28.000đ</span>
                    </div>
                  </div>
                  <div>
                    <img
                      src='https://bizweb.dktcdn.net/thumb/large/100/441/742/products/e81c92c3-db6e-4e05-8a8b-fc45c94f6cb3.jpg?v=1657509094197'
                      alt=''
                    />
                    <div className='pl-9'>
                      <h2 className='font-medium text-2xl p-3'>cau Ma Nhà Xí Hanako - Tập 11 </h2>
                      <span className='text-[#ba141a] font-medium text-2xl p-3'>28.000đ</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

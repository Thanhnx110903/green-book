import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'
import BannerHome from '../../components/BannerHome'
import BlogItem from '../../components/BlogItem/BlogItem'
import Productslist from '../../components/Productslist/Productslist'
import { useGetCategoriesQuery } from '../../redux/api/category'
import { useGetPostsQuery } from '../../redux/api/post'
import styles from './Home.module.css'
import { useEffect, useState } from 'react'
import PcLoading from '../../components/PcLoading'
import parse from 'html-react-parser'
import { BackTop, FloatButton } from 'antd'
const cx = classNames.bind(styles)

export default function Home() {
  const { data: dataPosts, isLoading } = useGetPostsQuery()
  const [dataCate, setDataCate] = useState({})

  const { data: categoriesData, isLoading: cateLoading } = useGetCategoriesQuery()
  const [selectDefault, setSelectDefault] = useState(null)

  const handleSelect = (index) => {
    setSelectDefault(index)
  }

  useEffect(() => {
    if (categoriesData?.data) {
      setDataCate(categoriesData?.data?.[0])
      setSelectDefault(categoriesData?.data[0]?.slug)
    }
  }, [categoriesData, cateLoading])
  return (
    <>
      <BannerHome />
      <div>
        <div className={cx('container-wrap')}>
          <div className={cx(' justify-between mt-[60px]')}>
            <div>
              <h1 className='text-[31px] font-normal mb-[30px]'>{dataCate?.name}</h1>
              {/* <div className={cx('flex items-center gap-[20px] mb-[30px]')}>
                {!!Object.keys(dataCate).length &&
                  Object.values(dataCate.children)?.map((item, index) => {
                    return (
                      <button
                        key={index}
                        onClick={() => handleSelect(item?.slug)}
                        className={`py-2 px-5 bg-[#dddd] text-black rounded-full ${
                          item?.slug == selectDefault && '!bg-primary !text-white'
                        }`}
                      >
                        {item?.name}
                      </button>
                    )
                  })}
              </div> */}
              <div>
                <Productslist id={selectDefault} linkTo={`/${selectDefault}`} />
              </div>
            </div>
          </div>
        </div>
        <div className={cx('container-wrap')}>
          <h3 className={cx('mt-[70px] mb-[30px] text-[2.2rem] font-medium ')}>Sản phẩm mới</h3>
          <div>
            <Productslist sort_date='desc' isButton={false} max='5' linkTo={`/${selectDefault}?sort_date=desc`} />
          </div>
        </div>

        {/* <div className={cx('container-wrap')}>
          <h3 className={cx('mt-[70px] mb-[30px] text-[2.2rem] font-medium ')}>Sản phẩm bán chạy</h3>
          <div>
            {isLoading ? (
              <div className='mt-5 w-full'>
                {Array.from({ length: 5 }).map((_, index) => (
                  <PcLoading key={index} />
                ))}
              </div>
            ) : (
              <ul className={cx('grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-[25px]')}>
                {Object.values(dataTopByBook)?.map((books) => {
                  books.title
                })}
              </ul>
            )}
          </div>
        </div> */}

        {/* <div className='container-wrap'>
          <h3 className={cx('mt-[70px] mb-[30px] text-[2.2rem] font-medium ')}>Thương hiệu nổi bật</h3>
          <div className='d-flex items-center justify-between'>
            <Link to='/'>
              <img src='./src/assets/imgs/logokd.png' alt='' />
            </Link>
            <Link link='/'>
              <img src='./src/assets/imgs/logo.png' alt='' />
            </Link>
            <Link to='/'>
              <img src='./src/assets/imgs/logokd.png' alt='' />
            </Link>
            <Link to='/'>
              <img src='./src/assets/imgs/logo.png' alt='' />
            </Link>
            <Link to='/'>
              <img src='./src/assets/imgs/logokd.png' alt='' />
            </Link>
            <Link to='/'>
              <img src='./src/assets/imgs/logo.png' alt='' />
            </Link>
          </div>
        </div> */}

        <div className={cx('container-wrap')}>
          <h3 className={cx('mt-[70px] mb-[30px] text-[2.2rem] font-medium ')}>Tin Tức</h3>
          {isLoading ? (
            <div className='mt-5 w-full'>
              {Array.from({ length: 5 }).map((_, index) => (
                <PcLoading key={index} />
              ))}
            </div>
          ) : (
            <>
              <div className={cx('grid grid-cols-4 gap-[30px]', 'news-list')}>
                {dataPosts?.data?.slice(0, 4).map((item) => {
                  return <BlogItem item={item} key={item.id} />
                })}
              </div>
              <Link to='/news' className={cx('action-news', 'd-flex items-center justify-center')}>
                <p>Xem tất cả</p>
                <i className={cx('fa-solid fa-chevron-right', 'text-[1.1rem] mt-[3px] ml-[6px]')}></i>
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  )
}

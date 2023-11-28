import BannerHome from '../../components/BannerHome'
import classNames from 'classnames/bind'
import styles from './Home.module.css'
const cx = classNames.bind(styles)
import { Link } from 'react-router-dom'
import SidebarCategory from '../../components/Sidebar/SidebarCategory'
import { getCategories } from '../../redux/categories/asyncAction'
import { getBooks } from '../../redux/books/asyncAction'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import Productslist from '../../components/Productslist/Productslist'
import BlogItem from '../../components/BlogItem/BlogItem'
import { ToastContainer } from 'react-toastify'

export default function Home() {
  const dispatch = useDispatch()

  const { categories } = useSelector((state) => state.categories)
  useEffect(() => {
    dispatch(getCategories())
  }, [])
  useEffect(() => {
    dispatch(getBooks())
  }, [])
  return (
    <>
      <BannerHome />
      <div>
        {/* Home Products */}
        <div className={cx('container-wrap')}>
          <div className={cx('d-flex justify-between mt-[60px]')}>
            <div className={cx('w-[258px] ')}>
              <h3 className={cx('font-bold text-[1.6rem] mb-[24px]')}>DANH MỤC SẢN PHẨM</h3>
              <div className={cx('')}>
                <ul>
                  <SidebarCategory categories={categories} />
                  <li className={cx('text-[#616161] text-[1.6rem] pt-[10px]')}>
                    <Link to='!#'>Truyện tranh</Link>
                  </li>
                </ul>
              </div>
              <div className={cx('mt-[40px]')}>
                <h4 className={cx('font-bold text-[1.6rem] mb-[24px]')}>MỨC GIÁ</h4>
                <ul>
                  <li className={cx('d-flex items-center mb-[8px]')}>
                    <input type='checkbox' className={cx('checkbox', 'mr-[6px]')} />
                    <label htmlFor='#' className={cx('text-[1.4rem]')}>
                      Giá dưới 100.000đ
                    </label>
                  </li>
                  <li className={cx('d-flex items-center mb-[8px]')}>
                    <input type='checkbox' className={cx('checkbox', 'mr-[6px]')} />
                    <label htmlFor='#' className={cx('text-[1.4rem]')}>
                      100.000đ - 200.000đ
                    </label>
                  </li>
                  <li className={cx('d-flex items-center mb-[8px]')}>
                    <input type='checkbox' className={cx('checkbox', 'mr-[6px]')} />
                    <label htmlFor='#' className={cx('text-[1.4rem]')}>
                      200.000đ - 300.000đ
                    </label>
                  </li>
                  <li className={cx('d-flex items-center mb-[8px]')}>
                    <input type='checkbox' className={cx('checkbox', 'mr-[6px]')} />
                    <label htmlFor='#' className={cx('text-[1.4rem]')}>
                      300.000đ - 500.000đ
                    </label>
                  </li>
                  <li className={cx('d-flex items-center mb-[8px]')}>
                    <input type='checkbox' className={cx('checkbox', 'mr-[6px]')} />
                    <label htmlFor='#' className={cx('text-[1.4rem]')}>
                      Giá trên 500.000đ
                    </label>
                  </li>
                </ul>
              </div>
            </div>
            <div className={cx('w-[1122px] ')}>
              <div className={cx('d-flex items-center border-b-[1px] border-solid border-[#dee2e6] mb-[10px]')}>
                <div className={cx('mr-[20px]')}>Sắp xếp theo: </div>
                <button className={cx('p-[10px] text-[#898989]')}>Phổ biến</button>
                <button className={cx('p-[10px] text-[#898989]')}>Mới nhất</button>
                <button className={cx('p-[10px] text-[#898989]')}>Bán chạy</button>
              </div>
              <div>
                {/* Product list */}
                <Productslist />
              </div>
            </div>
          </div>
        </div>
        {/* News */}
        <div className={cx('container-wrap')}>
          <h3 className={cx('mt-[70px] mb-[30px] text-[2.2rem] font-medium hover:text-primary')}>Tin Tức</h3>
          {/* News List */}
          <div className={cx('grid grid-cols-4 gap-[30px]', 'news-list')}>
            {/* News Item */}

            <BlogItem />
            <BlogItem />
            <BlogItem />
            <BlogItem />
          </div>
          <Link to='/news' className={cx('action-news', 'd-flex items-center justify-center')}>
            <p>Xem tất cả</p>
            <i className={cx('fa-solid fa-chevron-right', 'text-[1.1rem] mt-[3px] ml-[6px]')}></i>
          </Link>
          <ToastContainer />
        </div>
      </div>
    </>
  )
}

import BannerHome from '../../components/BannerHome'
import classNames from 'classnames/bind'
import styles from './Home.module.css'
import { Link } from 'react-router-dom'
const cx = classNames.bind(styles)

export default function Home() {
  return (
    <>
      <BannerHome />
      <div>
        {/* Home Products */}
        <div className={cx('container-wrap')}>
          <div className={cx('d-flex justify-between mt-[60px]')}>
            <div className={cx('w-[258px] bg-[#f5f5f5] p-[15px] mb-[30px]')}>
              <h3 className={cx('font-bold text-[1.6rem] mb-[24px]')}>DANH MỤC SẢN PHẨM</h3>
              <div className={cx('')}>
                <ul>
                  <li className={cx('text-[#616161] text-[1.6rem] pt-[10px]')}>
                    <Link to='!#'>Văn học</Link>
                  </li>
                  <li className={cx('text-[#616161] text-[1.6rem] pt-[10px]')}>
                    <Link to='!#'>Kỹ năng sống</Link>
                  </li>
                  <li className={cx('text-[#616161] text-[1.6rem] pt-[10px]')}>
                    <Link to='!#'>Kinh tế</Link>{' '}
                  </li>
                  <li className={cx('text-[#616161] text-[1.6rem] pt-[10px]')}>
                    <Link to='!#'>Khoa học - kỹ thuật - CNTT</Link>
                  </li>
                  <li className={cx('text-[#616161] text-[1.6rem] pt-[10px]')}>
                    <Link to='!#'>Văn hóa - du lịch</Link>
                  </li>
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
                <ul className={cx('grid grid-cols-4 gap-[25px]')}>
                  {/* Product item */}
                  <li className={cx('product-item')}>
                    <Link to='/product'>
                      <img src='/src/assets/imgs/produc-01.webp' alt='' />
                    </Link>
                    <div className={cx('p-[10px]')}>
                      <Link to='/product'>
                        <p className={cx('text-[1.4rem] line-clamp-2 leading-relaxed my-[17px]')}>
                          Cậu Ma Nhà Xí Hanako - Tập 10
                        </p>
                      </Link>
                      <div className={cx('d-flex items-center justify-between')}>
                        <div className={cx('text-primary font-medium')}>
                          28000 <span>đ</span>
                        </div>
                        <div
                          className={cx(
                            'w-[30px] h-[30px] bg-primary rounded-[50%] d-flex items-center justify-center text-[#ffffff]'
                          )}
                        >
                          <i className='fa-solid fa-plus'></i>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className={cx('product-item')}>
                    <Link to='/product'>
                      <img src='/src/assets/imgs/produc-01.webp' alt='' />
                    </Link>
                    <div className={cx('p-[10px]')}>
                      <Link to='/product'>
                        <p className={cx('text-[1.4rem] line-clamp-2 leading-relaxed my-[17px]')}>
                          Cậu Ma Nhà Xí Hanako - Tập 10
                        </p>
                      </Link>
                      <div className={cx('d-flex items-center justify-between')}>
                        <div className={cx('text-primary font-medium')}>
                          28000 <span>đ</span>
                        </div>
                        <div
                          className={cx(
                            'w-[30px] h-[30px] bg-primary rounded-[50%] d-flex items-center justify-center text-[#ffffff]'
                          )}
                        >
                          <i className='fa-solid fa-plus'></i>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className={cx('product-item')}>
                    <Link to='/product'>
                      <img src='/src/assets/imgs/produc-01.webp' alt='' />
                    </Link>
                    <div className={cx('p-[10px]')}>
                      <Link to='/product'>
                        <p className={cx('text-[1.4rem] line-clamp-2 leading-relaxed my-[17px]')}>
                          Cậu Ma Nhà Xí Hanako - Tập 10
                        </p>
                      </Link>
                      <div className={cx('d-flex items-center justify-between')}>
                        <div className={cx('text-primary font-medium')}>
                          28000 <span>đ</span>
                        </div>
                        <div
                          className={cx(
                            'w-[30px] h-[30px] bg-primary rounded-[50%] d-flex items-center justify-center text-[#ffffff]'
                          )}
                        >
                          <i className='fa-solid fa-plus'></i>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className={cx('product-item')}>
                    <Link to='/product'>
                      <img src='/src/assets/imgs/produc-01.webp' alt='' />
                    </Link>
                    <div className={cx('p-[10px]')}>
                      <Link to='/product'>
                        <p className={cx('text-[1.4rem] line-clamp-2 leading-relaxed my-[17px]')}>
                          Cậu Ma Nhà Xí Hanako - Tập 10
                        </p>
                      </Link>
                      <div className={cx('d-flex items-center justify-between')}>
                        <div className={cx('text-primary font-medium')}>
                          28000 <span>đ</span>
                        </div>
                        <div
                          className={cx(
                            'w-[30px] h-[30px] bg-primary rounded-[50%] d-flex items-center justify-center text-[#ffffff]'
                          )}
                        >
                          <i className='fa-solid fa-plus'></i>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className={cx('product-item')}>
                    <Link to='/product'>
                      <img src='/src/assets/imgs/produc-01.webp' alt='' />
                    </Link>
                    <div className={cx('p-[10px]')}>
                      <Link to='/product'>
                        <p className={cx('text-[1.4rem] line-clamp-2 leading-relaxed my-[17px]')}>
                          Cậu Ma Nhà Xí Hanako - Tập 10
                        </p>
                      </Link>
                      <div className={cx('d-flex items-center justify-between')}>
                        <div className={cx('text-primary font-medium')}>
                          28000 <span>đ</span>
                        </div>
                        <div
                          className={cx(
                            'w-[30px] h-[30px] bg-primary rounded-[50%] d-flex items-center justify-center text-[#ffffff]'
                          )}
                        >
                          <i className='fa-solid fa-plus'></i>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className={cx('product-item')}>
                    <Link to='/product'>
                      <img src='/src/assets/imgs/produc-01.webp' alt='' />
                    </Link>
                    <div className={cx('p-[10px]')}>
                      <Link to='/product'>
                        <p className={cx('text-[1.4rem] line-clamp-2 leading-relaxed my-[17px]')}>
                          Cậu Ma Nhà Xí Hanako - Tập 10
                        </p>
                      </Link>
                      <div className={cx('d-flex items-center justify-between')}>
                        <div className={cx('text-primary font-medium')}>
                          28000 <span>đ</span>
                        </div>
                        <div
                          className={cx(
                            'w-[30px] h-[30px] bg-primary rounded-[50%] d-flex items-center justify-center text-[#ffffff]'
                          )}
                        >
                          <i className='fa-solid fa-plus'></i>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className={cx('product-item')}>
                    <Link to='/product'>
                      <img src='/src/assets/imgs/produc-01.webp' alt='' />
                    </Link>
                    <div className={cx('p-[10px]')}>
                      <Link to='/product'>
                        <p className={cx('text-[1.4rem] line-clamp-2 leading-relaxed my-[17px]')}>
                          Cậu Ma Nhà Xí Hanako - Tập 10
                        </p>
                      </Link>
                      <div className={cx('d-flex items-center justify-between')}>
                        <div className={cx('text-primary font-medium')}>
                          28000 <span>đ</span>
                        </div>
                        <div
                          className={cx(
                            'w-[30px] h-[30px] bg-primary rounded-[50%] d-flex items-center justify-center text-[#ffffff]'
                          )}
                        >
                          <i className='fa-solid fa-plus'></i>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className={cx('product-item')}>
                    <Link to='/product'>
                      <img src='/src/assets/imgs/produc-01.webp' alt='' />
                    </Link>
                    <div className={cx('p-[10px]')}>
                      <Link to='/product'>
                        <p className={cx('text-[1.4rem] line-clamp-2 leading-relaxed my-[17px]')}>
                          Cậu Ma Nhà Xí Hanako - Tập 10
                        </p>
                      </Link>
                      <div className={cx('d-flex items-center justify-between')}>
                        <div className={cx('text-primary font-medium')}>
                          28000 <span>đ</span>
                        </div>
                        <div
                          className={cx(
                            'w-[30px] h-[30px] bg-primary rounded-[50%] d-flex items-center justify-center text-[#ffffff]'
                          )}
                        >
                          <i className='fa-solid fa-plus'></i>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
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
            <div className={cx('news-item')}>
              <Link to='/news'>
                <img src='/src/assets/imgs/news-01.webp' alt='' />
              </Link>
              <div>
                <Link to='!#'>
                  <h4 className={cx('text-[1.8rem] font-medium my-[8px] hover:text-primary')}>
                    Bật mí phương pháp đọc sách hiệu quả nhất hiện nay!
                  </h4>
                </Link>
                <p className={cx('text-[#727272] text-[1.4rem] line-clamp-3 my-[8px]')}>
                  Có một câu nói rất nổi tiếng của nhà văn M.Go-rơ-ki được đông đảo mọi người biết đến “Sách mở ra trước
                  mắt tôi những chân
                </p>
                <Link className={cx('text-primary text-[1.4rem] hover:text-[#e01d24]')} to='!#'>
                  Đọc tiếp
                </Link>
              </div>
            </div>
            <div className={cx('news-item')}>
              <Link to='/news'>
                <img src='/src/assets/imgs/news-01.webp' alt='' />
              </Link>
              <div>
                <Link to='!#'>
                  <h4 className={cx('text-[1.8rem] font-medium my-[8px] hover:text-primary')}>
                    Bật mí phương pháp đọc sách hiệu quả nhất hiện nay!
                  </h4>
                </Link>
                <p className={cx('text-[#727272] text-[1.4rem] line-clamp-3 my-[8px]')}>
                  Có một câu nói rất nổi tiếng của nhà văn M.Go-rơ-ki được đông đảo mọi người biết đến “Sách mở ra trước
                  mắt tôi những chân
                </p>
                <Link className={cx('text-primary text-[1.4rem] hover:text-[#e01d24]')} to='!#'>
                  Đọc tiếp
                </Link>
              </div>
            </div>
            <div className={cx('news-item')}>
              <Link to='/news'>
                <img src='/src/assets/imgs/news-01.webp' alt='' />
              </Link>
              <div>
                <Link to='!#'>
                  <h4 className={cx('text-[1.8rem] font-medium my-[8px] hover:text-primary')}>
                    Bật mí phương pháp đọc sách hiệu quả nhất hiện nay!
                  </h4>
                </Link>
                <p className={cx('text-[#727272] text-[1.4rem] line-clamp-3 my-[8px]')}>
                  Có một câu nói rất nổi tiếng của nhà văn M.Go-rơ-ki được đông đảo mọi người biết đến “Sách mở ra trước
                  mắt tôi những chân
                </p>
                <Link className={cx('text-primary text-[1.4rem] hover:text-[#e01d24]')} to='!#'>
                  Đọc tiếp
                </Link>
              </div>
            </div>
            <div className={cx('news-item')}>
              <Link to='/news'>
                <img src='/src/assets/imgs/news-01.webp' alt='' />
              </Link>
              <div>
                <Link to='!#'>
                  <h4 className={cx('text-[1.8rem] font-medium my-[8px] hover:text-primary')}>
                    Bật mí phương pháp đọc sách hiệu quả nhất hiện nay!
                  </h4>
                </Link>
                <p className={cx('text-[#727272] text-[1.4rem] line-clamp-3 my-[8px]')}>
                  Có một câu nói rất nổi tiếng của nhà văn M.Go-rơ-ki được đông đảo mọi người biết đến “Sách mở ra trước
                  mắt tôi những chân
                </p>
                <Link className={cx('text-primary text-[1.4rem] hover:text-[#e01d24]')} to='!#'>
                  Đọc tiếp
                </Link>
              </div>
            </div>
          </div>
          <Link to='/news' className={cx('action-news', 'd-flex items-center justify-center')}>
            <p>Xem tất cả</p>
            <i className={cx('fa-solid fa-chevron-right', 'text-[1.1rem] mt-[3px] ml-[6px]')}></i>
          </Link>
        </div>
      </div>
    </>
  )
}

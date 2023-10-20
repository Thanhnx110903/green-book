import classNames from 'classnames/bind'
import styles from './News.module.css'
import { Link } from 'react-router-dom'

const cx = classNames.bind(styles)

export default function News() {
  return (
    <div className={cx('mb-[70px]')}>
      <div className={cx('bg-[#f6f6f6] py-[6px]')}>
        <div className={cx('container-wrap text-[1.4rem]')}>
          <Link className={cx('text-[#999]')} to='/'>
            Trang chủ /
          </Link>
          <span> Tin tức</span>
        </div>
      </div>
      <div className={cx('container-wrap')}>
        <div className={cx('d-flex justify-between mt-[70px]')}>
          <div className={cx('w-[1050px]')}>
            <h3 className={cx(' mb-[30px] text-[2.2rem] font-medium hover:text-primary')}>Tin Tức</h3>
            {/* News List */}
            <div className={cx('grid grid-cols-3 gap-[30px]', 'news-list')}>
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
                    Có một câu nói rất nổi tiếng của nhà văn M.Go-rơ-ki được đông đảo mọi người biết đến “Sách mở ra
                    trước mắt tôi những chân
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
                    Có một câu nói rất nổi tiếng của nhà văn M.Go-rơ-ki được đông đảo mọi người biết đến “Sách mở ra
                    trước mắt tôi những chân
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
                    Có một câu nói rất nổi tiếng của nhà văn M.Go-rơ-ki được đông đảo mọi người biết đến “Sách mở ra
                    trước mắt tôi những chân
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
                    Có một câu nói rất nổi tiếng của nhà văn M.Go-rơ-ki được đông đảo mọi người biết đến “Sách mở ra
                    trước mắt tôi những chân
                  </p>
                  <Link className={cx('text-primary text-[1.4rem] hover:text-[#e01d24]')} to='!#'>
                    Đọc tiếp
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className={cx('ml-[15px] pl-[15px]', 'news-left')}>
            <h4 className={cx('font-medium mb-[15px]')}>TIN NỔI BẬT</h4>
            <div>
              <div className={cx('d-flex items-center gap-[15px] py-[15px]', 'news-item')}>
                <img className={cx('w-[100px]')} src='/src/assets/imgs/news-01.webp' alt='' />
                <p>Bật mí phương pháp đọc sách hiệu quả nhất hiện nay!</p>
              </div>
              <div className={cx('d-flex items-center gap-[15px] py-[15px]', 'news-item')}>
                <img className={cx('w-[100px]')} src='/src/assets/imgs/news-01.webp' alt='' />
                <p>Bật mí phương pháp đọc sách hiệu quả nhất hiện nay!</p>
              </div>
              <div className={cx('d-flex items-center gap-[15px] py-[15px]', 'news-item')}>
                <img className={cx('w-[100px]')} src='/src/assets/imgs/news-01.webp' alt='' />
                <p>Bật mí phương pháp đọc sách hiệu quả nhất hiện nay!</p>
              </div>
              <div className={cx('d-flex items-center gap-[15px] py-[15px]', 'news-item')}>
                <img className={cx('w-[100px]')} src='/src/assets/imgs/news-01.webp' alt='' />
                <p>Bật mí phương pháp đọc sách hiệu quả nhất hiện nay!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

import React from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames/bind'
import styles from './BlogItem.module.css'
const cx = classNames.bind(styles)
const BlogItem = () => {
  return (
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
          Có một câu nói rất nổi tiếng của nhà văn M.Go-rơ-ki được đông đảo mọi người biết đến “Sách mở ra trước mắt tôi
          những chân
        </p>
        <Link className={cx('text-primary text-[1.4rem] hover:text-[#e01d24]')} to='!#'>
          Đọc tiếp
        </Link>
      </div>
    </div>
  )
}

export default BlogItem

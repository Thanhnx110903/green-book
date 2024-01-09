import React from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames/bind'
import styles from './BlogItem.module.css'
const cx = classNames.bind(styles)
const BlogItem = (item) => {
  return (
    <div className={cx('news-item')}>
      <Link to='/news'>
        <img src='/src/assets/imgs/news-01.webp' alt='' />
      </Link>
      <div>
        <Link to='!#'>
          <h4 className={cx('text-[1.8rem] font-medium my-[8px] hover:text-primary')}>{item?.item?.title}</h4>
        </Link>
        <p className={cx('text-[#727272] text-[1.4rem] line-clamp-3 my-[8px]')}>{item?.item?.content}</p>
        <Link className={cx('text-primary text-[1.4rem] hover:text-[#e01d24]')} to='!#'>
          Đọc tiếp
        </Link>
      </div>
    </div>
  )
}

export default BlogItem

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
            {isLoading ? (
              <div className='mt-5 w-full'>
                {Array.from({ length: 5 }).map((_, index) => (
                  <PcLoading key={index} />
                ))}
              </div>
            ) : (
              <div className={cx('grid grid-cols-4 gap-[30px]', 'news-list')}>
                {dataPosts?.data?.map((item) => {
                  return <BlogItem item={item} />
                })}
                {/* cm */}
              </div>
            )}
          </div>
          <div className={cx('ml-[15px] pl-[15px]', 'news-left')}>
            <h4 className={cx('font-medium mb-[15px]')}>TIN NỔI BẬT</h4>
          </div>
        </div>
      </div>
    </div>
  )
}

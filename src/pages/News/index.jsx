import classNames from 'classnames/bind'
import styles from './News.module.css'
import { Link } from 'react-router-dom'
import { useGetPostsQuery, useGetTopPostQuery } from '../../redux/api/post'
import BlogItem from '../../components/BlogItem/BlogItem'
import PcLoading from '../../components/PcLoading'

const cx = classNames.bind(styles)

export default function News() {
  const { data: dataPosts, isLoading } = useGetPostsQuery()
  const { data: dataHotPost, isLoading: isLoadingHotPost } = useGetTopPostQuery()
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
        <div className={cx('flex flex-col md:flex-row justify-between mt-[70px]')}>
          <div className={cx('w-full md:max-w-[70%] lg:max-w-[75%]')}>
            <h3 className={cx(' mb-[30px] text-[2.2rem] font-medium hover:text-primary')}>Tin Tức</h3>
            {/* News List */}
            {isLoading ? (
              <div className='mt-5 w-full'>
                {Array.from({ length: 5 }).map((_, index) => (
                  <PcLoading key={index} />
                ))}
              </div>
            ) : (
              <div className={cx('grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[30px]', 'news-list')}>
                {dataPosts?.data?.map((item) => {
                  return <BlogItem item={item} />
                })}
              </div>
            )}
          </div>
        <div className='bg-[#f6f6f6] py-2 my-2'>

        </div>
          <div className={cx('w-full md:ml-[15px] md:pl-[15px] md:max-w-[30%] lg:max-w-[25%] mt-10 md:mt-0', 'news-left')}>
            <h4 className={cx('font-medium mb-[15px]')}>TIN NỔI BẬT</h4>
            {isLoadingHotPost ? (
              <div className='mt-5 w-full'>
                {Array.from({ length: 5 }).map((_, index) => (
                  <PcLoading key={index} />
                ))}
              </div>
            ) : (
              <div>
                {dataHotPost?.data?.slice(0, 3).map((item) => {
                  return (
                    <div className={cx('d-flex items-center gap-[15px] py-[15px]', 'news-item')}>
                    <img className={cx('w-[100px]')} src={item?.image || '/src/assets/imgs/news-01.webp'} alt='' />
             
                    <p>{item?.title}</p>
                  </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

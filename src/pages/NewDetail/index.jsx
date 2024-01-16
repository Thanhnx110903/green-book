import classNames from 'classnames/bind'

import { Link, useParams } from 'react-router-dom'
import { useGetPostQuery, useGetTopPostQuery } from '../../redux/api/post'
import PcLoading from '../../components/PcLoading'
import styles from './NewsDetail.module.css'
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb'
import dayjs from 'dayjs'

const cx = classNames.bind(styles)

export default function NewDetail() {
  const { id } = useParams()
  const { data: dataHotPost, isLoading: isLoadingHotPost } = useGetTopPostQuery()
  const { data, isLoading } = useGetPostQuery(id)
  console.log(data)

  return (
    <div className={cx('mb-[70px]')}>
      <div className={cx('bg-[#f6f6f6] py-[6px]')}>
        <div className={cx('container-wrap text-[1.4rem]')}>
          <Breadcrumb
            params={[
              {
                label: 'Trang chủ',
                href: '/'
              },
              {
                label: 'Tin tức',
                href: '/news'
              },
              {
                label: data?.data?.title,
                href: '/'
              }
            ]}
            currenParam={data?.data?.title}
          />
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
              <div className={cx('  gap-2', 'news-list')}>
                <div className=''>
                  <p align='justify' className='text-justify px-4 md:px-0'>
                    <h2 className='text-3xl font-semibold uppercase mb-3'>{data?.data?.title}</h2>
                    <div> {dayjs(data?.data?.updated_at).format('dddd HH:mm DD-MM-YYYY')}</div>
                    <img
                      align='right'
                      className='text-center lg:text-right w-full lg:w-[402px] lg:h-[300px] object-cover lg:pl-5 pb-5'
                      src={data?.data?.image || '/src/assets/imgs/news-01.webp'}
                      alt=''
                    />
                    <p className={cx('text-justify mt-3')}>{data?.data?.content}</p>
                  </p>
                </div>
              </div>
            )}
          </div>
          <div className='bg-[#f6f6f6] py-2 my-2'></div>
          <div
            className={cx('w-full md:ml-[15px] md:pl-[15px] md:max-w-[30%] lg:max-w-[25%] mt-10 md:mt-10 px-4 md:px-0', 'news-left')}
          >
            <h4 className={cx('font-medium mb-[15px]')}>TIN NỔI BẬT</h4>
            {isLoadingHotPost ? (
              <div className='mt-5 w-full'>
                {Array.from({ length: 5 })?.map((_, index) => (
                  <PcLoading key={index} />
                ))}
              </div>
            ) : (
              <div>
                {dataHotPost?.data?.slice(0, 3)?.map((item) => {
                  return (
                    <Link
                      to={`/new/${item?.id}`}
                      className={cx('d-flex items-center gap-[15px] py-[15px]', 'news-item')}
                    >
                      <img className={cx('w-[100px] h-[65px]')} src={item?.image || '/src/assets/imgs/news-01.webp'} alt='' />

                      <p>{item?.title}</p>
                    </Link>
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

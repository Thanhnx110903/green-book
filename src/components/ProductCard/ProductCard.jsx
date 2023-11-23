import React, { useEffect, useState } from 'react'
import styles from './ProductCard.module.css'
import classNames from 'classnames/bind'
const cx = classNames.bind(styles)
import { Link, useNavigate } from 'react-router-dom'
import { createSlug } from '../../untils/fs'
import { useSelector } from 'react-redux'
const ProductCard = ({ books }) => {

  const { categories } = useSelector((state) => state.categories)
  // console.log(books)
  // const getPro = (books)=>{
  //   const categoriesf = categories?.find((item)=> item.id == books)
  //   return categoriesf?.name;
  // }
  const navigate = useNavigate()
  const handleNavigatetype = (name, idProduct, idCategory) => {
    navigate(`/${idProduct}/${createSlug(name)}`, { state: idCategory })
  }

  return (
    <>
      <li className={cx('product-item')} key={books?.id}>
        {/* <Link to={`/${books.id}/${createSlug(books.name)}`}> */}
        {/* src={`http://127.0.0.1:8000/storage/${books?.image}`} */}
        <img onClick={() => handleNavigatetype(books?.name, books?.id, books?.category_id)} src={`${books?.image}`} alt='' />
        {/* </Link> */}
       
        <div className={cx('p-[10px]')}>
          <Link to='/product' >
            <p  className={cx('text-[1.4rem] line-clamp-2 leading-relaxed my-[17px]')}>{books?.name}</p>
          </Link>
          <div className={cx('d-flex items-center justify-between')}>
            <div className={cx('text-primary font-medium')}>
              {books.price} <span>đ</span><p>Mã giảm giá</p>
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
    </>
  )
}

export default ProductCard

import React, { useEffect, useState } from 'react'
import styles from './ProductCard.module.css'
import classNames from 'classnames/bind'
const cx = classNames.bind(styles)
import { Link } from 'react-router-dom'
import { createSlug } from '../../untils/fs'
import { useSelector } from 'react-redux'
const ProductCard = ({books}) => {
  const { categories } = useSelector((state) => state.categories)
  const getPro = (products)=>{
    const categoriesf = categories.find((item)=> item.id == products)
    return categoriesf?.name;
  }
  return (  
    <>
      {books?.map((products) => (
        <li className={cx('product-item')} key={products.id}>
          <Link to={`/${getPro(products.category_id)}/${products.id}/${createSlug(products.name)}`}>
            <img src={products.image} alt='' />
          </Link>
          <div className={cx('p-[10px]')}>
            <Link to={`/product/${products.id}`}>
              <p className={cx('text-[1.4rem] line-clamp-2 leading-relaxed my-[17px]')}>{products.name}</p>
            </Link>
            <div className={cx('d-flex items-center justify-between')}>
                        <div className={cx('text-primary font-medium')}>
                {products.price} <span>đ</span>
              </div>
              <div   className={cx(
                            'w-[30px] h-[30px] bg-primary rounded-[50%] d-flex items-center justify-center text-[#ffffff]'
                          )}>
                <i className='fa-solid fa-plus'></i>
              </div>
            </div>
          </div>
        </li>
      ))}
    </>
  )
}

export default ProductCard

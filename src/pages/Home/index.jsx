import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'
import BannerHome from '../../components/BannerHome'
import BlogItem from '../../components/BlogItem/BlogItem'
import Productslist from '../../components/Productslist/Productslist'
import { useGetCategoriesQuery } from '../../redux/api/category'
import { useGetPostsQuery } from '../../redux/api/post'
import styles from './Home.module.css'
import { useEffect, useState } from 'react'
import PcLoading from '../../components/PcLoading'
const cx = classNames.bind(styles)

export default function Home() {}

import React, { useEffect, useState } from 'react'
import { apiGetCategories } from '../../apis/categories'
import { NavLink,Link, useNavigate } from 'react-router-dom'
import { createSlug } from '../../untils/fs'
import { useSelector } from 'react-redux'

const SidebarCategory = ({categories}) => {
  const navigate = useNavigate()
  const handleNavigatetype = (name,id)=>{
    navigate(`/${createSlug(name)}`,{state:id})
  }
  return (
    <div>
      {categories?.map((el) => (
        <li className='text-[#616161] text-[1.6rem] pt-[10px]' key={el.id}>
          <div onClick={() => handleNavigatetype(el.name,el.id)}>{el.name}</div>
        </li>
      ))}
    </div>
  )
}

export default SidebarCategory

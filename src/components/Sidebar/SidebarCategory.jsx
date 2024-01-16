import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createSlug } from '../../untils/fs'
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons'
import { Menu } from 'antd'

const convertDataForAntDMenu = (data, slug) => {
  console.log(data)
  return Object.values(data).map((item) => {
    console.log(item.slug)

    const antdItem = {
      key: item.slug.toString() + 'all',
      label: item.name,
      icon: null,
      children: [
        {
          key: `${item.slug}`,
          label: 'Tất cả',
          icon: null
        },
        ...(item.children
          ? Object.values(item.children).map((child) => ({
              key: child.slug.toString(),
              label: child.name,
              icon: null
            }))
          : [])
      ]
    }
    if (item.slug === slug) {
      antdItem.defaultOpen = true
    }

    return antdItem
  })
}

const SidebarCategory = ({ categories, slug }) => {
  const [dataSideBar, setDataSideBar] = useState([])
  const onClick = (e) => {kiêm
    if (e?.key) {
      navigate(`/${e?.key}`)
    }
  }
  const navigate = useNavigate()
  useEffect(() => {
    if (categories) {
      const convertedData = convertDataForAntDMenu(categories, slug)
      setDataSideBar(convertedData)
    }
  }, [categories])
  return (
    <div className=''>
      <Menu
        onClick={onClick}
        defaultSelectedKeys={[slug]}
        defaultOpenKeys={dataSideBar.filter((item) => item.defaultOpen).map((item) => item.key)}
        mode='inline'
        items={dataSideBar}
      />
      {/* {categories?.map((el) => {
        return (
          <li className='text-[#616161] text-[1.6rem] pt-[10px] cursor-pointer' key={el.id}>
            <div onClick={() => handleNavigatetype(el.name, el.slug)}>{el.name}</div>
            {el?.children?.length && (
              <ul>
                {el?.children?.map((item) => {
                  return <></>
                })}
              </ul>
            )}
          </li>
        )
      })} */}
    </div>
  )
}

export default SidebarCategory

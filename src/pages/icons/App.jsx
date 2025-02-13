import React, { useEffect, useState } from 'react'
import { copyRes, getSchema } from '../../utils'
import Icon from './components/Icon.jsx'

import './index.css'

import svgList from '../../constants/svgs'

export default function App() {
  const [, setJSON] = useState(getSchema())
  useEffect(() => {
    window.refresh = () => {
      setJSON(getSchema())
    }
  }, [])

  const [icons] = useState(svgList('#666'))
  const keys = Object.keys(icons)
  return (
        <div>
            <header>
                <h1>图标列表</h1>
            </header>
            <ul>
                <li>可以直接点击图标复制</li>
                <li>在简历有图标的部分粘贴图标的名称即可</li>
                <li>图标均来自<a style={
                    { color: 'blue' }
                } data-open = "true" href="https://www.iconfont.cn/collections/index" target="_blank" rel="noreferrer">iconfont</a></li>
                <li>图标格式均为SVG,欢迎贡献图标</li>
            </ul>
            <ul className="icon-list">
                {
                    keys.map((v) => <Icon handleClick={copyRes} key={v} name={v} html={icons[v]} />)
                }
            </ul>
        </div>
  )
}

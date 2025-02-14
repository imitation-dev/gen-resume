import React, { useEffect, useState } from 'react'
import { getSchema } from '../../utils'
import BaseInfo from './components/BaseInfo.jsx'
import Exps from './components/Exps.jsx'
import OtherInfo from './components/OtherInfo.jsx'
import './index.css'

export default function App() {
  const [data, setJSON] = useState(getSchema())
  useEffect(() => {
    window.refresh = () => {
      setJSON(getSchema())
    }
  }, [])
  const {
    name, position, infos = [], leftExps = [], rightExps = [],
  } = data
  return (
        <div>
            <header>
                <BaseInfo name={name} position={position} />
                <OtherInfo infos={infos} />
            </header>
            <div className="exps">
                <div className="left">
                    <Exps exps={leftExps} />
                </div>
                <div className="right">
                    <Exps exps={rightExps} />
                </div>
            </div>
        </div>
  )
}

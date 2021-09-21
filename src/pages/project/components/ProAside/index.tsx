import React from 'react'
import './index.less'

import { history } from 'umi'

import { versionType } from '@/utils/config'

export default function index({ versionList }) {
    const verLi = versionList.map(item=> 
        <li key={item._id}
            className={'list ' + (item._id === history.location.query.vid ? 'active' : '')}
            onClick={() => {
                history.push(`/project?pid=${history.location.query.pid}&vid=${item._id}`)
            }}
        >
            <div className="no">{item.no}</div>
            <div className="num">({item.countList.done}/{item.countList.count})</div>
            <div className="type">{versionType[item.type]}</div>
        </li>)
    return (
        <div className='proAside_components'>
            <div className="title">版本管理</div>
            <ul className="version">
                { verLi }
            </ul>
        </div>
    )
}

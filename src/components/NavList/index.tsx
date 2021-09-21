import React from 'react'
import {NavLink} from 'umi'
import './index.less'

export default function index() {
    return (
        <ul id='navlist_Page'>
            <li className='navLi'>
                <NavLink exact to='/'>首页</NavLink>
            </li>
            <li className='navLi'>
                <NavLink exact to='/task'>任务</NavLink>
            </li>
            <li className='navLi'>
                <NavLink exact to='/user'>成员</NavLink>
            </li>
            <li className='navLi'>
                <NavLink exact to='/needAndBug'>需求与bug</NavLink>
            </li>
        </ul>
    )
}

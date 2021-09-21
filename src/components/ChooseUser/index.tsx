import React,{ useState,useEffect } from 'react'
import './index.less'

import { url } from '@/utils/config'

export default function index({
    width, //宽度
    chooseShow,//展示选择框
    yetList,//已选列表
    notList, //未选列表
    deleteClick, //删除点击
    chooseClick, //选择点击
}) {
    const [show,setShow] = useState(chooseShow); //选择框是否显示

    useEffect(() => {
        setShow(false);
    },[chooseShow]);

    const yetLi = yetList
                    .filter(item => item.role !== 'super')
                    .map(item => <li key={item._id} className="item">
                                            {item.name}
                                            <div className="delete" onClick={e => {
                                                e.stopPropagation();
                                                deleteClick(item);
                                            }}>-</div>
                                        </li>);
    const notLi = notList
                    .filter(item => item.role !== 'super')
                    .map(item => <li className='item' key={item._id} onClick={() => {
                                    chooseClick(item)
                                }}>
                                    <img src={url + item.user_avatar} alt="" />
                                    <div className="name">{item.name}</div>
                                </li>);

    return (
        <div className='chooseUser_components' style={{
            width:width
        }}>
            <ul className="userBox container">
                { yetLi }
                <li className="item addBtn" onClick={e => {
                    e.stopPropagation();
                    setShow(true)
                }}>+添加</li>
            </ul>
            <ul className="selectBox container"
                onClick={e => e.stopPropagation()}
                style={{
                    display: show ? 'flex' : 'none'
                }}
            >
                { notLi }
            </ul>
        </div>
    )
}

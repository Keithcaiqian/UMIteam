import React from 'react'
import './index.less'

import { CheckOutlined } from '@ant-design/icons';
import StatusBtn from '@/components/StatusBtn'

import { url,taskType } from '@/utils/config'
import { dateFormat } from '@/utils/dateFormat'

export default function index(props) {
    return (
        <div className={`task_components ${props.status === 'done' && 'active'}`}>
            <div className="left">
                <div className="selectBox">
                    {
                        props.status === 'done' ?
                            <CheckOutlined /> :
                            ''
                    }
                    
                </div>
            </div>
            <div className="right">
                <div className="top">
                    <div className="no">{props.no}</div>
                    <img className='avatar' src={url + props.execute_user.user_avatar} alt="" />
                </div>
                <div className="name">{props.name}</div>
                <div className="status">
                    <StatusBtn status={props.status}/>
                </div>
                <div className="time">
                    { dateFormat(props.start_time*1000) || '开始时间' }
                    -
                    { dateFormat(props.end_time*1000) || '结束时间' }
                </div>
            </div>
        </div>
    )
}
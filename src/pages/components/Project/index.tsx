import React from 'react'
import { Progress,Button,Popconfirm, message } from 'antd';
import { url } from '@/utils/config'
import './index.less'


export default function index({
    logo,
    name,
    no,
    count_list,
    goProjectDetail,
    onDelete
}) {
    return (
        <div className='project_components' onClick={goProjectDetail}>
            <div className="top">
                <div className="img">
                    <img src={logo ? (url + logo) : require('../../../../public/images/avatar.webp')} alt="" />
                </div>
                <div className="name">{name}</div>
                <div className="no">{no}</div>
            </div>
            <div className="bottom">
                <div className="progress">
                    <Progress
                        type="circle"
                        strokeColor={{
                            '0%': '#108ee9',
                            '100%': '#87d068',
                        }}
                        percent={Math.round((count_list.done/count_list.count) * 100)}
                    />
                </div>
                <div className='deleteBtn' onClick={e => e.stopPropagation()}>
                    <Popconfirm
                        title="Are you sure to delete this project?"
                        onConfirm={onDelete}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="primary" danger>删除</Button>
                    </Popconfirm>
                </div>
            </div>
        </div>
    )
}

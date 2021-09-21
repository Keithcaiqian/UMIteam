import React from 'react'
import { Button } from 'antd'

import { url,taskType } from '@/utils/config'

export default function index({ status }) {
    if(status === 'warning'){
        return (
            <Button danger type='primary'>
                { taskType[status] }
            </Button>
        )
    }else if(status === 'doing'){
        return (
            <Button type='primary' style={{backgroundColor:'green'}}>
                { taskType[status] }
            </Button>
        )
    }else{
        return (
            <Button type='primary' ghost style={{color:'#333',backgroundColor:'#fff'}}>
                { taskType[status] }
            </Button>
        )
    }
}

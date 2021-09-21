import React from 'react'
import './index.less'
import { SmileTwoTone} from '@ant-design/icons';

export default function index({ changeStatus }) {
    return (
        <div className='addProject_components' onClick={() => {
            changeStatus();
        }}>
            <div className="ico">
                <SmileTwoTone style={{
                    fontSize:'50px'
                }}/>
            </div>
            <div className="name">创建项目</div>
        </div>
    )
}

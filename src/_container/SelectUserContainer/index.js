import React,{ useState } from 'react'
import { connect } from 'umi'
import './index.less'

import { Menu, Dropdown  } from 'antd';

import { url } from '@/utils/config'

const mapStateToProps = state => ({
    userList:state.version.user_list
})

function SelectUserContainer({userList,onChoose}) {
    const [userData,setUserData] = useState({
        name:'',
        avatar:''
    })

    const menu = userList.map( item => 
        <Menu.Item 
            className='user_components' 
            key={item._id}
            onClick={() => {
                setUserData({
                    name:item.name,
                    avatar:item.user_avatar
                })
                onChoose(item._id);
            }}
        >
            <div className="itemList">
                <img className='avatar' src={url + item.user_avatar} alt="" />
                <div className="name">{item.name}</div>
            </div>   
        </Menu.Item>
    )
    return (
        <Dropdown className='selectUser_container' trigger={['click']} overlay={<Menu>{menu}</Menu>}>
            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                <div className="itemList">
                    {
                        userData.name ?
                            <img className='avatar' src={url + userData.avatar} alt="" /> :
                            null
                    }
                    <div className="name">{userData.name || '未设置'}</div>
                </div>
            </a>
        </Dropdown>
    )
}

export default connect(mapStateToProps)(SelectUserContainer)

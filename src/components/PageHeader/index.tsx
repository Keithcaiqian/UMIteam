import React from 'react'
import { PoweroffOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { connect } from 'umi'
import './index.less'
import { url } from '@/utils/config'

const mapStateToProps = state => ({
    avatar:state.user.avatar,
    name:state.user.name
})

const mapDispatchToProps = dispatch => ({
    loginOut(){
        dispatch({
            type:'user/outUser'
        })
    }
});

function Index(props) {
    return (
        <div id="pageHeader_page">
            <div className='left'>Teamplan</div>
            <div className='center'>
                {props.children}
            </div>
            <div className='right'>
                <img className='avatar' src={url + props.avatar} alt="" /> 
                <div className="name">{props.name}</div>  
                <Button
                    type="primary"
                    icon={<PoweroffOutlined />}
                    onClick={() => {
                        props.loginOut();
                    }}
                />
            </div>
        </div>
    )
}
export default connect(mapStateToProps,mapDispatchToProps)(Index);

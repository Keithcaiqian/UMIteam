import React,{ useState } from 'react'
import './index.less'

import ProHeader from '../ProHeader'

import { connect, history } from 'umi'
import { Layout } from 'antd';
const { Header, Sider, Content } = Layout;


import ProMainNavContainer from '../../_container/ProMainNavContainer'
import ProHeaderContainer from '../../_container/ProHeaderContainer'
import AddNeedModal from '../AddNeedModal'

import { addTaskDemand } from '@/service/task'

const mapStateToProps = state => ({
    pid:state.version.pid,
    vid:state.version.vid
})


function index({ name,children,pid,vid }) {
    const [needModalShow,setNeedModalShow] = useState(false);
    // 显示创建需求modal
    const onNewNeedModal = () => {
        setNeedModalShow(true);
    }
    // 隐藏modal
    const onCloseModal = () => {
        setNeedModalShow(false);
    }
    // 创建需求确定
    const onConfirm = async (options) => {
        const res = await addTaskDemand({
            project_id:pid,
            version_id:vid,
            ...options
        })

        setNeedModalShow(false);
        history.replace(history.location.pathname + history.location.search,{
            loadVersion:true
        })
    }

    return (
        <>
            <Header className='header'>
                <ProHeader name={name}>
                    <ProHeaderContainer 
                        onNewNeedModal={onNewNeedModal}
                    />
                </ProHeader>
            </Header>
            <Content>
                <div className='ProMain_components'>
                    <div className="main">
                        <ul className="nav">    
                            <ProMainNavContainer />
                        </ul>
                        <div className="container">
                            { children }
                        </div>
                    </div>
                </div>
            </Content>
            <AddNeedModal 
                show={needModalShow} 
                onCloseModal={onCloseModal}
                onConfirm={onConfirm}    
            />
        </>
    )
}

export default connect(mapStateToProps)(index)
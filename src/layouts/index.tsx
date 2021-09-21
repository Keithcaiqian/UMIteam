import React,{ useState ,useEffect } from 'react'
import { loadingPublisher,errMsgPublisher } from '@/service/request';

import PageHeader from '../components/PageHeader'
import NavList from '../components/NavList'
import { Spin,Modal,Button,Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import { history } from 'umi';

import './index.less'
import e from '@umijs/deps/compiled/express';

export default function Layouts(props) {
    const [show,setShow] = useState(false);
    const [errShow,setErrShow] = useState({
        show:false,
        errMsg:''
    });

    // 全局loading监听
    useEffect(() => {
        function loadingChange (loadingTag:number){
            if (show !== !!loadingTag) {
                setShow(!!loadingTag);
            }
        }
        loadingPublisher.subscribe(loadingChange);
        return () => {
            loadingPublisher.unsubscribe(loadingChange)
        }
    },[show])

    // 全局报错监听
    useEffect(() => {
        function errChange (msg){
            setErrShow({
                show:true,
                errMsg:msg
            })
        }
        errMsgPublisher.subscribe(errChange);
        return () => {
            errMsgPublisher.unsubscribe(errChange)
        }
    },[errShow])

    let page;
    if(history.location.pathname === '/login'){
        page  = <div id='mainContainer'>
                    {props.children}
                </div>
    } else{
        page = <div id='mainContainer'>
                    <Layout id='layout'>
                        <Header id='header'>
                            <PageHeader>
                                <NavList />
                            </PageHeader>
                        </Header>
                        <Content>{props.children}</Content>
                    </Layout>
                </div>
    }
    return (
        <div>
            <Modal 
                visible={errShow.show} 
                closable={false}
                footer={[
                    <Button key="submit" type="primary" onClick={()=>{
                        setErrShow({
                            show:false,
                            errMsg:''
                        })
                    }}>
                        确认
                    </Button>
                ]}
            >
                <p>{ errShow.errMsg }</p>
            </Modal>
            <Spin tip="Loading..." spinning={show}>
                {page}
            </Spin>
        </div>       
    )
}



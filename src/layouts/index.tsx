import React,{ useState ,useEffect } from 'react'
import { loadingPublisher,errMsgPublisher } from '@/service/request';

import { Spin,Alert } from 'antd';
import './index.less'

export default function Layouts(props) {
    const [show,setShow] = useState(false);
    const [errShow,setErrShow] = useState({
        show:false,
        errMsg:''
    });

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

    return (
        <div>
            {   errShow.show ? <Alert
                message="Error"
                description={errShow.errMsg}
                type="error"
                closable
                onClose={() => {
                    setErrShow({
                        show:false,
                        errMsg:''
                    })
                }}
                /> : ''
            }
            <Spin tip="Loading..." spinning={show}>
                <div id='mainContainer'>
                    {props.children}
                </div>
            </Spin>
        </div>       
    )
}



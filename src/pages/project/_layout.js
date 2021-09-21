import React,{ useState , useEffect } from 'react'
import './index.less'

import { Layout } from 'antd';
import ProAside from './components/ProAside'
import ProMain from './components/ProMain'

import { getProjectData } from '@/service/project'

const {  Sider } = Layout;


export default function index({ children , history}) {
    const [name,setName] = useState(''); //项目名称
    const [version,setVersion] = useState([]); //版本

    useEffect(() => {
        (async() => {
            const res = await getProjectData(history.location.query.pid);
            setName(res.name);
            setVersion(res.version);
            if(!history.location.query.vid && res.version[0]){
                history.replace(`?pid=${history.location.query.pid}&vid=${res.version[0]._id}`)
            }
        })()
    },[])
    return (
        <>
            <Layout id='project_page'>
                <Sider className="sider">
                    <ProAside versionList={version}/>
                </Sider>
                <Layout className='version_components'>
                    <ProMain name={name}>{ children }</ProMain>
                </Layout>
            </Layout>
        </>
    )
}

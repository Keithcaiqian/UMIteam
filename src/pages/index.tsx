import React,{ useState , useEffect } from 'react';
import './index.less';

import Project from './components/Project'
import AddProject from './components/AddProject'
import AddProjectModal from './components/AddProjectModal'

import { getProjectList,deleteProjectData,addProjectData } from '@/service/project';

export default function IndexPage({history}) {
  const [getProject,setGetProject] = useState(false); //重新获取列表
  const [proList,setProList] = useState([]); //项目列表
  const [addModalStatus,setAddModal] = useState(false); //modal显示状态

  // 获取项目列表
  useEffect(() => {
    (async() => {
      const res = await getProjectList();
      setProList(res);
    })();
  },[getProject]);

  // 添加项目
  const addProject = async options => {
    await addProjectData(options);
    setAddModal(false);
    setGetProject(!getProject);
  }

  let pro = proList.map(item => 
    <Project key={item._id} {...item} 
      //删除项目 
      onDelete={async()=>{
        await deleteProjectData(item._id,item.name);
        setGetProject(!getProject);
      }} 
      // 跳到项目详情页
      goProjectDetail={() => {
        history.push('/project?pid=' + item._id)
      }}
    ></Project>
  )
  return (
    <div id='main_page'>
      <AddProjectModal 
        show={addModalStatus} 
        close={() => {
          setAddModal(false);
        }}
        addProject={addProject}
      />
      <AddProject changeStatus={() => {
        setAddModal(true);
      }}/>
      {pro}
    </div>
  );
}

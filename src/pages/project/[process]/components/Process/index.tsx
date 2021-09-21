import React, { PureComponent } from 'react'

import FlexColumLayout from '../FlexColumLayout'
import FlexRowLayout from '../FlexRowLayout'
import TaskItem from '../TaskItem'

import { getTaskDemandList } from '@/service/task'

export default class index extends PureComponent {
    state = {
        taskList:[]
    }

    async componentDidMount() {
        let res = await getTaskDataFromProcess(this.props.process)( this.props.pid, this.props.vid );
        console.log(res)
        this.setState({
            taskList: res
        })
    }
    

    render() {
        const Layout = generateLayout(this.props.activeProcess);
        console.log(this.state.taskList)
        const taskLi = this.state.taskList.map(item => <div key={item._id} style={{
            width:'20%',
            padding:'0 10px',
            margin:'4px 0',
            minWidth:'150px'
        }}>
            <TaskItem {...item}/>
        </div>)

        return (
            <Layout>
                { taskLi }
            </Layout>
        )
    }
}

// 根据项目进度来显示不同的布局
function generateLayout (process:number){
    switch(process){
        case 0:
        case 3:
            return FlexColumLayout
        default:
            return FlexRowLayout
    }
}
// 根据项目进度判断请求哪个任务数据
function getTaskDataFromProcess(process:number){
    switch(process){
        case 0:
            return getTaskDemandList;
        default:
            return getTaskDemandList;
    }
}


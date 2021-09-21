import request from './request';

/* --------------------需求------------------------ */

//获取需求列表
export async function getTaskDemandList(pid,vid){
    const resp = await request.post("/api/client/taskDemand/list", { 
        project_id: pid, 
        version_id: vid 
    });
    return resp;   
}

//添加需求
export async function addTaskDemand(options){
    const resp = await request.post("/api/client/taskDemand/add", { 
        ...options
    });
    return resp;   
}
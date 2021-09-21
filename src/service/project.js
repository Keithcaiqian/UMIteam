import request from './request';

// 获取项目列表
export async function getProjectList(account,password){
    const resp = await request.post("/api/client/project/list", {});
    return resp;
}

// 获取项目详情
export async function getProjectData(id){
    const resp = await request.post("/api/client/project/get", {id});
    return resp;
}

// 添加项目
export async function addProjectData(options){
    const resp = await request.post("/api/client/project/add", {...options});
    return resp;
}

// 删除项目
export async function deleteProjectData(id,project_name){
    const resp = await request.post("/api/client/project/delete", {id,project_name});
    return resp;
}
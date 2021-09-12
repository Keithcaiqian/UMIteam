import request from './request';

// 获取项目列表
export async function getProjectList(account,password){
    const resp = await request.post("/api/client/project/list", {});
    return resp;
}
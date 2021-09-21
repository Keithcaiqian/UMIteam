import request from './request';

// 获取研发进度列表
export async function getDevelopList(account,password){
    const resp = await request.post("/api/client/develop/list", {});
    return resp;
}
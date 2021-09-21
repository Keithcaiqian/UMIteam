import request from './request';

// 获取版本详情
export async function getVersionData(id){
    const resp = await request.post("/api/client/version/get", {id});
    return resp;
}
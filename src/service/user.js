import request from './request';

// 登录
export async function login(account,password){
    const resp = await request.post("/api/client/user/login", { account, password });
    return resp;   
}

// 获取用户信息
export async function getUserInfo(id){
    const resp = await request.post("/api/client/user/get", { id });
    return resp;   
}

// 获取用户列表
export async function getUserList(){
    const resp = await request.post("/api/client/user/list", {  });
    return resp;   
}
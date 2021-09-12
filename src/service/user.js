import request from './request';

// 登录
export async function login(account,password){
    const resp = await request.post("/api/client/user/login", { account, password });
    return resp;   
}
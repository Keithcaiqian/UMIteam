import request from './request';

// 上传图片
export async function uploadBase64(type,base64){
    const resp = await request.post("/api/tool/tool/uploadBase64", { type, base64 });
    return resp;   
}

// 上传文件
export async function uploadFile(type,file){
    const resp = await request.post("/api/tool/tool/upload", { type, file });
    return resp;   
}
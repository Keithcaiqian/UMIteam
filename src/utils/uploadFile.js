import { uploadBase64 } from '@/service/tool.js'

export function uploadFile(file,type,callback) {
    const reader = new FileReader();
    reader.addEventListener('load', async() => {
        let res = await uploadBase64(type,reader.result);
        callback(res)
    });
    reader.readAsDataURL(file);
}
//1. 发送请求的时候，如果有token，需要附带到请求头中
//2. 响应的时候，如果有token，保存token到本地（localstorage）
//3. 响应的时候，如果响应的消息码是403（没有token，token失效），在本地删除token
import axios from "axios";
import Loading from '@/utils/loading'
import ErrMsg from '@/utils/errorMsg'
import { history } from "umi";

export const loadingPublisher = new Loading();
export const errMsgPublisher = new ErrMsg();

export default (function() {
  //1. 发送请求的时候，如果有token，需要附带到请求头中
  let instance = axios;

  instance.interceptors.request.use(function (config) {
    // Do something before request is sent

    // 可以添加参数控制是否需要loading状态
    loadingPublisher.add();

    config.headers['X-CSRF-TOKEN'] = localStorage.getItem('token') || '';
    return config;
  }, function (error) {
    // Do something with request error
    errMsgPublisher.errShow(error)
    return Promise.reject(error);
  });

  instance.interceptors.response.use(
    (resp) => {

        // 可以添加参数控制是否需要loading状态
        loadingPublisher.sub();

        if(resp.data.code === 0){
            return resp.data.data;
        }else{
            errMsgPublisher.errShow(resp.data.message)
            return Promise.reject(err);
        }
    },
    (err) => {
        // 可以添加参数控制是否需要loading状态
        loadingPublisher.sub();

        //3. 响应的时候，如果响应的消息码是401（没有token，token失效），在本地删除token
        if (err.response.status === 401) {
            localStorage.removeItem("token");
            history.push('/login');
        }else{
          errMsgPublisher.errShow(err.response.data.message);
        }
        
        return Promise.reject(err);
    }
  );

  return instance;
})();

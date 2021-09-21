import { login,getUserInfo } from '@/service/user'
import { history } from 'umi'

export default {
    state:{
        userId:'',
        role:'',
        token:'',
        avatar:'',
        name:''
    },
    reducers:{
        setUser(state,{ payload }){
            return {
                ...state,
                ...payload
            }
        }
    },
    effects:{
        *loginUser({ payload },{ put,call }){
            try {
                let {user_id,role,csrf_token} = yield call(login,payload.account,payload.password);
                localStorage.setItem('userId',user_id);
                localStorage.setItem('role',role);
                localStorage.setItem('token',csrf_token);
                history.push('/')
                yield put({
                    type:'getUser',
                    payload:user_id
                })
            } catch (error) {
                console.log(error)
            }
            
        },
        *outUser(action,{ put }){
            localStorage.removeItem('userId');
            localStorage.removeItem('role');
            localStorage.removeItem('token');
            yield put({
                type:'setUser',
                payload:{
                    userId: '',
                    role: '',
                    token: '',
                }
            })
            history.push('/login')
        },
        *getUser({ payload },{ put,call }){
            try {
                let res = yield call(getUserInfo,payload);
                yield put({
                    type:'setUser',
                    payload:{
                        avatar:res.user_avatar,
                        name:res.name
                    }
                })
            } catch (error) {
                console.log(error)
            }
        }
    },
    subscriptions: {
        // 监听url
        listenUrl({ history,dispatch }){
            history.listen((newLocation) => {
                let userId = localStorage.getItem('userId');
                let role = localStorage.getItem('role');
                let token = localStorage.getItem('token');
                if(userId && role && token){
                    dispatch({
                        type:'setUser',
                        payload:{
                            userId,
                            role,
                            token
                        }
                    })
                }else{
                    history.push('/login');
                }
            })
        },
        // 获取用户信息
        getUserInfo({ history,dispatch }){
            if(history.location.pathname !== '/login'){
                dispatch({
                    type:'getUser',
                    payload:localStorage.getItem('userId')
                })
            }
        }
    },
}
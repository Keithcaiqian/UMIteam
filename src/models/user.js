import { login } from '@/service/user'
import { history } from 'umi'

export default {
    state:{
        userId:'',
        role:'',
        token:''
    },
    reducers:{
        setUser(state,{ payload }){
            return payload
        }
    },
    effects:{
        *loginUser({ payload },{ put,call }){
            try {
                let {user_id,role,csrf_token} = yield call(login,payload.account,payload.password);
                localStorage.setItem('userId',user_id);
                localStorage.setItem('role',role);
                localStorage.setItem('token',csrf_token);
                yield put({
                    type:'setUser',
                    payload:{
                        userId: user_id,
                        role: role,
                        token: csrf_token,
                    }
                })
                history.push('/')
            } catch (error) {
                console.log(error)
            }
            
        },
        *outUser(action,{ put }){
            yield put({
                type:'setUser',
                payload:{
                    userId: '',
                    role: '',
                    token: '',
                }
            })
            history.push('/login')
        }
    },
    subscriptions: {
        // 监听url
        listenUrl({ history,dispatch }){
            history.listen((newLocation) => {
                if (newLocation.pathname === "/login") {
                    localStorage.removeItem('userId');
                    localStorage.removeItem('role');
                    localStorage.removeItem('token');
                }
            })
        },
        // 根据storage判断进入哪个页面
        loginStatus({ dispatch, history }) {
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
        },
    },
}
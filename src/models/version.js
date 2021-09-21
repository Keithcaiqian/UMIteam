import { getVersionData } from '@/service/version'
import { history } from 'umi'
import regProgressPath from '@/utils/pathReg'


let isLoadVersionData = false;//是否请求过版本的数据了

export default {
    state:{
        demandCount:0,
        demandDoneCount:0,
        demandDateTime:{
            start_time:'',
            end_time:''
        },

        designCount:0,
        designDoneCount:0,
        designDateTime:{
            start_time:'',
            end_time:''
        },

        developCount:0,
        developDoneCount:0,
        developDateTime:{
            start_time:'',
            end_time:''
        },

        releaseCount:0,
        releaseDoneCount:0,
        releaseDateTime:{
            start_time:'',
            end_time:''
        },

        testCount:0,
        testDoneCount:0,
        testDateTime:{
            start_time:'',
            end_time:''
        },

        pid:'', //项目id
        vid:'', //版本id

        user_list:[],//当前版本的用户

        process:0,//项目进度  De 0 ; UI 1 ; Re 2 ; Ve 3 ; Te 4;
        activeProcess:null,//目前被选中的进度
    },
    reducers:{
        setVersion(state,{ payload }){
            return {
                ...state,
                ...payload
            }
        },
        setProcess(state,{ payload }){
            return {
                ...state,
                process:payload
            }
        },
        setActiveProcess(state,{ payload }){
            return {
                ...state,
                activeProcess:payload
            } 
        }
    },
    effects:{
        *getVersion({ payload },{ put ,call }){
            let {
                demandCount,
                demandDoneCount,
                demandDateTime,
                designCount,
                designDoneCount,
                designDateTime,
                developCount,
                developDoneCount,
                developDateTime,
                releaseCount,
                releaseDoneCount,
                releaseDateTime,
                testCount,
                testDoneCount,
                testDateTime,
                status,
                project_id,
                _id,
                user_list
            } = yield call(getVersionData,payload);

            isLoadVersionData = true;

            yield put({
                type:'setVersion',
                payload:{
                    demandCount,
                    demandDoneCount,
                    demandDateTime,
                    designCount,
                    designDoneCount,
                    designDateTime,
                    developCount,
                    developDoneCount,
                    developDateTime,
                    releaseCount,
                    releaseDoneCount,
                    releaseDateTime,
                    testCount,
                    testDoneCount,
                    testDateTime,
                    pid:project_id,
                    vid:_id,
                    user_list
                }
            })

            let process = getProcess(status)

            yield put({
                type:'setProcess',
                payload: process
            })

            // 目前项目在哪个位置，默认最后一个进度
            const res = regProgressPath('/project/:progress',history.location.pathname);
            if(res){
                process = Math.round(res[1]);
            }
            yield put({
                type:'setActiveProcess',
                payload:process
            })
            history.push(`/project/${process + history.location.search}`)
        },
    },
    subscriptions:{
        // 监听url
        listenUrl({ history,dispatch }){
            history.listen((newLocation) => {    

                // 进入项目,设置vid
                if(newLocation.pathname === '/project'){
                    if(newLocation.query.vid){
                        dispatch({
                            type:'getVersion',
                            payload:newLocation.query.vid
                        })
                    }
                }
                
                // 项目进度监听        
                const res = regProgressPath('/project/:progress',newLocation.pathname);
                if(res){
                    if(history.location.state && history.location.state.loadVersion){
                        dispatch({
                            type:'getVersion',
                            payload: newLocation.query.vid
                        })
                    }else {
                        // 加载过version数据
                        if(isLoadVersionData){
                            dispatch({
                                type:'setActiveProcess',
                                payload: +res[1]
                            })
                        }else{ //没加载过先加载
                            dispatch({
                                type:'getVersion',
                                payload: newLocation.query.vid
                            })
                        }
                    }
                }
            })
        },
    }
}

// 获取进度
function getProcess(status){
    switch(status){
        case 'De': return 0;
        case 'UI': return 1;
        case 'Re': return 2;
        case 'Ve': return 3;
        case 'Te': return 4;
    }
}
import React,{ useEffect } from 'react'
import { connect,history,NavLink } from 'umi'

import { dateFormat } from '@/utils/dateFormat'

import { SmileTwoTone,
    HeartTwoTone, 
    CheckCircleTwoTone, 
    CarTwoTone ,
    CustomerServiceTwoTone 
} from '@ant-design/icons';

function setPathToHistory(process,activeIndex){
    if(activeIndex <= process){
        history.push(`/project/${activeIndex + history.location.search}`);
    }
}

function ProMainNavContainer({
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
    process,
    activeProcess
}) {
    useEffect(() => {
        if(activeProcess > process){
            history.push(`/project/${process + history.location.search}`)        
        }
    },[activeProcess])
    return (
        <>
            <li 
                className={
                    "navLi " + 
                    (process >= 0 ? 'active ' : '') + 
                    (activeProcess === 0 ? 'superActive' : '')
                } 
                onClick={() => {
                    setPathToHistory(process,0);
                }}
            >
                <div className="ico"> <SmileTwoTone /> </div>
                <div className="right">
                    <div className="name">项目需求（{demandDoneCount}/{demandCount}）</div>
                    <div className="time">
                        {
                            dateFormat(demandDateTime.start_time * 1000,'YYYY-mm-dd','未设置')
                            + '-' +
                            dateFormat(demandDateTime.end_time * 1000,'YYYY-mm-dd','未设置')
                        }
                    </div>
                </div>
            </li>
            <li className={
                    "navLi " + 
                    (process >= 1 ? 'active ' : '') + 
                    (activeProcess === 1 ? 'superActive' : '')
                }
                onClick={() => {
                    setPathToHistory(process,1);            
                }}
            >
                <div className="ico"> <HeartTwoTone /> </div>
                <div className="right">
                    <div className="name">设计界面({designDoneCount}/{designCount})</div>
                    <div className="time">
                        {
                            dateFormat(designDateTime.start_time * 1000,'YYYY-mm-dd','未设置')
                            + '-' +
                            dateFormat(designDateTime.end_time * 1000,'YYYY-mm-dd','未设置')
                        }
                    </div>
                </div>
            </li>
            <li 
                className={
                    "navLi " + 
                    (process >= 2 ? 'active ' : '') + 
                    (activeProcess === 2 ? 'superActive' : '')
                }
                onClick={() => {
                    setPathToHistory(process,2);
                }}
            >
                <div className="ico"> <CheckCircleTwoTone /> </div>
                <div className="right">
                    <div className="name">研发({developDoneCount}/{developCount})</div>
                    <div className="time">
                        {
                            dateFormat(developDateTime.start_time * 1000,'YYYY-mm-dd','未设置')
                            + '-' +
                            dateFormat(developDateTime.end_time * 1000,'YYYY-mm-dd','未设置')
                        }
                    </div>
                </div>
            </li>
            <li className={
                    "navLi " + 
                    (process >= 3 ? 'active ' : '') + 
                    (activeProcess === 3 ? 'superActive' : '')
                }
                onClick={() => {
                    setPathToHistory(process,3);
                }}
            >
                <div className="ico"> <CarTwoTone /> </div>
                <div className="right">
                    <div className="name">发布版本({releaseDoneCount}/{releaseCount})</div>
                    <div className="time">
                        {
                            dateFormat(releaseDateTime.start_time * 1000,'YYYY-mm-dd','未设置')
                            + '-' +
                            dateFormat(releaseDateTime.end_time * 1000,'YYYY-mm-dd','未设置')
                        }
                    </div>
                </div>
            </li>
            <li className={
                    "navLi " + 
                    (process >= 4 ? 'active ' : '') + 
                    (activeProcess === 4 ? 'superActive' : '')
                }
                onClick={() => {
                    setPathToHistory(process,4);
                }}
            >
                <div className="ico"> <CustomerServiceTwoTone /> </div>
                <div className="right">
                    <div className="name">测试({testDoneCount}/{testCount})</div>
                    <div className="time">
                        {
                            dateFormat(testDateTime.start_time * 1000,'YYYY-mm-dd','未设置')
                            + '-' +
                            dateFormat(testDateTime.end_time * 1000,'YYYY-mm-dd','未设置')
                        }
                    </div>
                </div>
            </li>
        </>
    )
}




const mapStateToProps = ({ version:{
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
    process,
    activeProcess
} }) => ({
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
        process,
        activeProcess
    })


export default connect(mapStateToProps)(ProMainNavContainer);
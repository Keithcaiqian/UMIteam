import React from 'react'
import { connect } from 'umi'

import { Button } from 'antd';

const mapStateToProps = state => ({
    activeIndex:state.version.activeProcess
})

function ProHeaderContainer({ 
    activeIndex,
    onNewNeedModal 
}) {
    switch (activeIndex) {
        case 0:
            return (
                <div>
                    <Button type="primary" onClick={onNewNeedModal}>创建需求</Button>
                </div>
            );
        case 2:
            return (
                <div>
                    <Button type="primary">研发任务排期</Button>
                </div>
            );
        default:
            return <div></div>
    }

}

export default connect(mapStateToProps)(ProHeaderContainer)
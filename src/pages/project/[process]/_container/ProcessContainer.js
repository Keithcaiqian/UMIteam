import React from 'react'
import { connect } from 'umi'

import Process from '../components/Process'

const mapStateToProps = state => ({
    activeProcess:state.version.activeProcess,
    pid:state.version.pid,
    vid:state.version.vid,
})

export default connect(mapStateToProps)(Process)

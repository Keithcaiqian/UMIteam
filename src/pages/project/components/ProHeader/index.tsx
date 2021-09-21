import React from 'react'
import { Row, Col } from 'antd';

import { connect } from 'umi'

export default function index({name,children}) {
    return (
        <>
           <Row>
                <Col span={10}>{name}</Col>
                <Col span={14}>{children}</Col>
            </Row> 
        </>
    )
}

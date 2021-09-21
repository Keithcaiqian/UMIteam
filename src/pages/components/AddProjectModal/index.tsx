import React,{ useState, useEffect } from 'react'
import { Modal } from 'antd';
import ChooseUser from '@/components/ChooseUser'
import { url } from '@/utils/config'

import {  Col, Row, Form, Input, Upload,Button, Select } from 'antd';

import { uploadFile } from '@/utils/uploadFile'
import { getUserList } from '@/service/user'

export default function index({show,close,addProject}) {
    const [imageUrl, setImageUrl] = useState(false); //项目logo
    const [changeShow,setChangeShow] = useState(false);//改变选择成员的弹出状态
    const [yetList,setYetList] = useState([]);//项目负责人
    const [notList,setNotList] = useState([]); //没有被设置的成员
    const [partYetList,setPartYetList] = useState([]);//参与者
    

    useEffect(() => {
        (async () => {
            let res = await getUserList();
            setNotList(res);
        })()
    },[])

    const handleOk = () => {
        close();
    };
    
    const handleCancel = () => {
        close();
    };

    // 上传文件
    const handleChange = info  => {
        if (info.file.status === 'done') {
        
            uploadFile(info.file.originFileObj,'user',url => {
                setImageUrl(url);
            })
        }
    };
    const hanleClick = () => {
        setChangeShow(!changeShow)
    }

    // 删除项目负责人成员
    const proDeleteClick = data => {
        setNotList([...notList,data]);
        setYetList(yetList.filter(it => it !== data))
    }
    // 添加项目负责人成员
    const proChooseClick = data => {
        setYetList([...yetList,data]);
        setNotList(notList.filter(it => it !== data))
    }
    // 删除参与者成员
    const partDeleteClick = data => {
        setNotList([...notList,data]);
        setPartYetList(partYetList.filter(it => it !== data))
    }
    // 添加参与者成员
    const partChooseClick = data => {
        setPartYetList([...partYetList,data]);
        setNotList(notList.filter(it => it !== data))
    }

    // 提交表单成功
    const onFinish = (values: any) => {
        addProject({
            ...values,
            owner: yetList.map(item => item._id),
            participant:partYetList.map(item => item._id),
            logo: imageUrl || ''
        });
    };

    return (
        <Modal title="创建项目" 
            visible={show} 
            onOk={handleOk} 
            footer={null}
            onCancel={handleCancel}>      
            <Form
                onClick={hanleClick}
                name="basic"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 24 }}
                onFinish={onFinish}
                >
                <Form.Item>
                    <Row gutter={30}>
                        <Col span={16}>
                            <Form.Item
                                label="项目名称"
                                name="name"
                                rules={[{ required: true, message: '请输入项目名称!' }]}
                            >
                                <Input/>
                            </Form.Item>
                            <Form.Item
                                label="初始版本号"
                                name="version"
                                rules={[{ required: true, message: '请输入初始版本号!' }]}
                            >
                                <Input/>
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Upload
                                name="avatar"
                                accept="image/*"
                                maxCount={1}
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={false}
                                onChange={handleChange}
                            >
                                {imageUrl ? 
                                    <img src={url + imageUrl} alt="avatar" style={{ width: '100%',height:'100%' }} /> : 
                                    <div>上传</div>
                                }
                            </Upload>
                        </Col>
                    </Row>
                </Form.Item>
                <Form.Item name='description' label="项目描述">
                    <Input.TextArea />
                </Form.Item>
                <Form.Item name='owner' label="项目负责人">
                    <ChooseUser 
                        yetList={yetList} 
                        notList={notList}
                        chooseShow={changeShow} 
                        width='100%'
                        deleteClick={proDeleteClick}
                        chooseClick={proChooseClick}
                    />
                </Form.Item>
                <Form.Item name='participant' label="参与者">
                    <ChooseUser 
                        yetList={partYetList} 
                        notList={notList}
                        chooseShow={changeShow} 
                        width='100%'
                        deleteClick={partDeleteClick}
                        chooseClick={partChooseClick}
                    />
                </Form.Item>
                <Form.Item name='valid_time' label="权限有效期" rules={[{ required: true, message: '请输入权限有效期!' }]}>
                    <Select>
                        <Select.Option value="一年">一年</Select.Option>
                        <Select.Option value="一个月">一个月</Select.Option>
                        <Select.Option value="半月">半月</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}
import React,{ useState, useEffect } from 'react'
import { Modal, Form, Input, Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import SelectUserContainer from '@/_container/SelectUserContainer'

import { uploadFile } from '@/service/tool'

export default function index({ show, onCloseModal,onConfirm }) {
    const [form] = Form.useForm();

    // 选择用户
    const onChooseUser = userId => {
        form.setFieldsValue({
            'execute_user_id': userId
        })
    }

    // 关闭modal
    const handleCancel = () => {
        onCloseModal();
    }

     // 上传文件
    const normFile = (e) => {      
        if (Array.isArray(e)) {
          return e;
        }
        return e && e.fileList;
    };

    return (
        <Modal
            title='添加需求'
            visible={show}
            width={ 600 }
            onCancel={handleCancel}
            onOk={() => {
                form.submit();
            }}
        >
            <Form form={form} labelCol={{ span: 4 }}
                onFinish={value => {
                    if(value.archives_file){
                        value.archives_file = value.archives_file.map(item => ({
                            url:item.response.data,
                            name:item.name,
                            type:item.type
                        }))
                    }
                    onConfirm(value);
                }}
            >
                <Form.Item rules={[
                    {
                        required: true,
                        message: 'Please input need name',
                    }
                ]} name={'name'} label="创建新需求">
                    <Input.TextArea />
                </Form.Item>
                <Form.Item rules={[
                    {
                        required: true,
                        message: 'Please select user',
                    }
                ]} name={'execute_user_id'} label="执行者">
                    <SelectUserContainer onChoose={onChooseUser}/>
                </Form.Item>
                <Form.Item 
                    name={'archives_file'} 
                    label="上传附件"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                >
                    <Upload 
                        name="file" 
                        data={{type:'user'}}
                        headers={{'X-CSRF-TOKEN':localStorage.getItem('token')}}
                        action='/api/tool/tool/upload' 
                        listType="picture">
                        <Button icon={<UploadOutlined />}>Click to upload</Button>
                    </Upload>
                </Form.Item>
            </Form>
        </Modal>
    )
}

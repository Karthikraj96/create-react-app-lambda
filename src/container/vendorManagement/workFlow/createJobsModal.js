import React from 'react';
import { Modal, Button, Row, Col, Select, Input, DatePicker, Space,InputNumber,Form,Upload  } from 'antd';
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  FacebookOutlined,
  TwitterOutlined,
  LinkedinOutlined,
  InstagramOutlined,
  UploadOutlined
} from '@ant-design/icons';

const { TextArea } = Input;
const { RangePicker } = DatePicker;

function onChange(date, dateString) {
  console.log(date, dateString);
}
function onOk(value) {
  console.log('onOk: ', value);
}

const layout = {
    labelCol: { span: 3 },
    
  };

function CreateJobs({ isVisible, handleOk, handleCancel }) {
  return (
    <Modal destroyOnClose={true}
      style={{ top: 20 }}
      title="Create Jobs"
      visible={isVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Create"
      cancelText="Cancel"
      width={800}
      footer={[
        <Button type="primary" htmlType="submit" form="jobs">
        Submit
      </Button>
      ]}
    >
    <Form preserve={false}{...layout} name="nest-messages" id="jobs" >
      <Form.Item  label="Date" name="date" rules={[{ required: true, message: 'Please input your details!' }]}>
      <DatePicker onChange={onChange} style={{width:'100%'}} bordered={false} />
      </Form.Item>
      <Form.Item  label="Institution" name="institution" rules={[{ required: true, message: 'Please input your details!' }]}>
        <Input />
      </Form.Item>
      <Form.Item  label="Category" name="category" rules={[{ required: true, message: 'Please input your details!' }]}>
        <Input />
      </Form.Item>
      <Form.Item  label="Job ID" name="jobid" rules={[{ required: true, message: 'Please input your details!' }]}>
        <Input />
      </Form.Item>
      <Form.Item  label="Job Name" name="jobname" rules={[{ required: true, message: 'Please input your details!' }]}>
        <Input />
      </Form.Item>
      <Form.Item  label="Vendor Name" name="vendor" rules={[{ required: true, message: 'Please input your details!' }]}>
        <Input />
      </Form.Item>
    </Form>
    </Modal>
  );
}

export default CreateJobs;

import React from 'react';
import { Modal, Button, Row, Col, Select, Input, DatePicker, Space,InputNumber,Form,Upload ,Rate } from 'antd';
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
    labelCol: { span: 5 },
    
  };

function EditJobs({ isVisible, handleOk, handleCancel }) {
  return (
    <Modal destroyOnClose={true}
      style={{ top: 20 }}
      title="Edit Jobs"
      visible={isVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Create"
      cancelText="Cancel"
      width={800}
    >
    <Form preserve={false}{...layout} name="nest-messages" >
    <Form.Item  label="Change Status">
    <Select
            placeholder="Select the status"
            // onChange={this.onGenderChange}
            allowClear
          >
            <Option value="Assigned">Assigned</Option>
            <Option value="Completed">Completed</Option>
            <Option value="Cancelled">Cancelled</Option>
          </Select>
      </Form.Item>
      <Form.Item  label="Completion Date" >
      <DatePicker onChange={onChange} style={{width:'100%'}} bordered={false} />
      </Form.Item>
      <Form.Item  label="Rating">
      <Rate allowClear={true} defaultValue={3} />
      </Form.Item>
      <Form.Item  label="Comments">
        <Input />
      </Form.Item>
    </Form>
    </Modal>
  );
}

export default EditJobs;

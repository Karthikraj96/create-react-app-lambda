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

function ProposalModal({ isVisible, handleOk, handleCancel }) {
  return (
    <Modal destroyOnClose={true}
      style={{ top: 20 }}
      title="Create Proposal"
      visible={isVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Create"
      cancelText="Cancel"
      width={800}
      footer={[
        <Button type="primary" htmlType="submit" form="proposal">
        Submit
      </Button>
      ]}
    >
    <Form  preserve={false}{...layout} name="nest-messages" id="proposal">
    <Form.Item  label="Vendor Name" name="vendorname" rules={[{ required: true, message: 'Please input your details!' }]}>
    <Select
            placeholder="Select the vendor"
            // onChange={this.onGenderChange}
            allowClear
          >
            <Option value="1">1</Option>
            <Option value="2">2</Option>
          </Select>
      </Form.Item>
      <Form.Item  label="Quote" name="Quote" rules={[{ required: true, message: 'Please input your details!' }]}>
      <Input />
      </Form.Item>
      <Form.Item  label="Proposal" name="proposal" rules={[{ required: true, message: 'Please input your details!' }]}>
        <Upload name="logo" action="/upload.do" listType="picture">
          <Button icon={<UploadOutlined />}>Click to upload</Button>
        </Upload>
      </Form.Item>
      <Form.Item  label="Action" name="action" rules={[{ required: true, message: 'Please input your details!' }]}>
    <Select
            placeholder="Select the option"
            // onChange={this.onGenderChange}
            allowClear
          >
            <Option value="approve">Approve</Option>
            <Option value="decline">Decline</Option>
          </Select>
      </Form.Item>
    </Form>
    </Modal>
  );
}

export default ProposalModal;

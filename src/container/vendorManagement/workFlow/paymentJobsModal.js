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

function PaymentJobs({ isVisible, handleOk, handleCancel }) {
  return (
    <Modal destroyOnClose={true}
      style={{ top: 20 }}
      title="Payment Jobs"
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
            placeholder="Select the Payment Type"
            // onChange={this.onGenderChange}
            allowClear
          >
            <Option value="onetime">Onetime</Option>
            <Option value="installment">Installment</Option>
          </Select>
      </Form.Item>
      <Form.Item  label="Installment Type">
    <Select
            placeholder="Select the Installment"
            // onChange={this.onGenderChange}
            allowClear
          >
            <Option value="daily">Daily</Option>
            <Option value="weekly">Weekly</Option>
            <Option value="monthly">Monthly</Option>
            <Option value="Quarterly">Quarterly</Option>
            <Option value="halfyearly">HalfYearly</Option>
          </Select>
      </Form.Item>
      {/* <Form.Item  label="Completion Date" >
      <DatePicker onChange={onChange} style={{width:'100%'}} bordered={false} />
      </Form.Item> */}
      <Form.Item  label="No.of Installments">
      <Input />
      </Form.Item>
      <Form.Item  label="Amount">
      <Input />
      </Form.Item>
        <Form.Item  label="Start Date" >
      <DatePicker onChange={onChange} style={{width:'100%'}} bordered={false} />
      </Form.Item>
      <Form.Item  label="Attach Invoice">
        <Upload name="logo" action="/upload.do" listType="picture">
          <Button icon={<UploadOutlined />}>Click to upload</Button>
        </Upload>
      </Form.Item>
    </Form>
    </Modal>
  );
}

export default PaymentJobs;

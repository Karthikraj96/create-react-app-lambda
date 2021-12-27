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

function PaymentModal({ isVisible, handleOk, handleCancel }) {
  return (
    <Modal destroyOnClose={true}
      style={{ top: 20 }}
      title="Payments"
      visible={isVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Create"
      cancelText="Cancel"
      width={800}
    >
    <Form preserve={false}{...layout} name="nest-messages" >
    <Form.Item  label=" Date of Payment" >
      <DatePicker onChange={onChange} style={{width:'100%'}} bordered={false} />
      </Form.Item>
      <Form.Item  label="Amount">
      <Input />
      </Form.Item>
    <Form.Item  label="Mode of Payment">
    <Select
            placeholder="Select the Payment Type"
            // onChange={this.onGenderChange}
            allowClear
          >
            <Option value="cash">Onetime</Option>
            <Option value="cheque">Installment</Option>
            <Option value="banktransfer">Bank Transfer</Option>
          </Select>
      </Form.Item>
    </Form>
    </Modal>
  );
}

export default PaymentModal;

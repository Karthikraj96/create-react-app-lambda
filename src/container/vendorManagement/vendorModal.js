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
    labelCol: { span: 6 },
    
  };

function VendorModal({ isVisible, handleOk, handleCancel }) {
  return (
    <Modal destroyOnClose={true}
      style={{ top: 20 }}
      title="Vendor List"
      visible={isVisible}
      // onOk={handleOk}
      onCancel={handleCancel}
      okText="Create"
      cancelText="Cancel"
      width={800}
      footer={[
        <Button type="primary" htmlType="submit" form="vendor">
        Submit
      </Button>
      ]}
    >
        <h3 style={{textAlign:'center',fontWeight:'bold'}}>STATUARY DETAILS:</h3>
    <Form preserve={false}{...layout}  id="vendor" autoComplete="off" >
      <Form.Item  label="Vendor Name" name="vendorname" rules={[{ required: true, message: 'Please input your details!' }]}>
        <Input placeholder="(As per GST)" />
      </Form.Item>
      <Form.Item  label="Company Description" name="Description" rules={[{ required: true, message: 'Please input your details!' }]}>
        <Input />
      </Form.Item>
      <Form.Item  label="Vendor ID" name="vendorid" rules={[{ required: true, message: 'Please input your details!' }]}>
        <Input />
      </Form.Item>
      <Form.Item  label="Category" name="category" rules={[{ required: true, message: 'Please input your details!' }]}>
        <Input />
      </Form.Item>
      <Form.Item  label="Firm Type" name="firmtype" rules={[{ required: true, message: 'Please input your details!' }]}>
      <Select placeholder="select your Type">
          <Option value="Private Ltd ">Private Ltd </Option>
          <Option value="Limited ">Limited </Option>
          <Option value="Partnership ">Partnership </Option>
          <Option value="Proprietorship ">Proprietorship </Option>
          <Option value="others ">others </Option>
        </Select>
      </Form.Item>
      <Form.Item  label="Year of Establishment" name="yearofestablishment" rules={[{ required: true, message: 'Please input your details!' }]}>
        <Input />
      </Form.Item>
      <Form.Item  label="PAN No" name="pan" rules={[{ required: true, message: 'Please input your details!' }]}>
        <Input />
      </Form.Item>
      <Form.Item  label="GST No" name="gstno" rules={[{ required: true, message: 'Please input your details!' }]}>
        <Input />
      </Form.Item>
    <h3 style={{textAlign:'center',fontWeight:'bold'}}>COMMUNICATION:</h3>
    <Form.Item  label="Registered Address" name="address" rules={[{ required: true, message: 'Please input your details!' }]}>
        <Input />
      </Form.Item>
      <Form.Item  label="City" name="city" rules={[{ required: true, message: 'Please input your details!' }]}>
        <Input />
      </Form.Item>
      <Form.Item  label="State" name="state" rules={[{ required: true, message: 'Please input your details!' }]}>
        <Input />
      </Form.Item>
      <Form.Item  label="Pincode" name="pincode" rules={[{ required: true, message: 'Please input your details!' }]}>
        <Input />
      </Form.Item>
      <Form.Item  label="Contact Person Name" name="contact" rules={[{ required: true, message: 'Please input your details!' }]}>
        <Input />
      </Form.Item>
      <Form.Item  label="Designation" name="designation" rules={[{ required: true, message: 'Please input your details!' }]}>
        <Input />
      </Form.Item>
      <Form.Item  label="Number" name="number" rules={[{ required: true, message: 'Please input your details!' }]}>
        <Input />
      </Form.Item>
      <Form.Item  label="Mail Id" name="mailid" rules={[{ required: true, message: 'Please input your details!' }]}>
        <Input />
      </Form.Item>
      <h3 style={{textAlign:'center',fontWeight:'bold'}}>BANK DETAILS:</h3>
      <Form.Item  label="Account No" name="accountno" rules={[{ required: true, message: 'Please input your details!' }]}>
        <Input />
      </Form.Item>
      <Form.Item  label="Bank Name" name="bankname" rules={[{ required: true, message: 'Please input your details!' }]}>
        <Input />
      </Form.Item>
      <Form.Item  label="Branch" name="branch" rules={[{ required: true, message: 'Please input your details!' }]}>
        <Input />
      </Form.Item>
      <Form.Item  label="IFSC Code" name="ifsc" rules={[{ required: true, message: 'Please input your details!' }]}>
        <Input />
      </Form.Item>
      <h3 style={{textAlign:'center',fontWeight:'bold'}}>ATTACHMENT:</h3>
     
        <Form.Item  label="Incorporation Certificate" name="certificate" rules={[{ required: true, message: 'Please input your details!' }]}>
        <Upload name="logo" action="/upload.do" listType="picture">
          <Button icon={<UploadOutlined />}>Click to upload</Button>
        </Upload>
      </Form.Item>
      <Form.Item  label="GST Certificate" name="gstcertigicate" rules={[{ required: true, message: 'Please input your details!' }]}>
      <Upload name="logo" action="/upload.do" listType="picture">
          <Button icon={<UploadOutlined />}>Click to upload</Button>
        </Upload>
      </Form.Item>
      <Form.Item  label="Cancelled Cheque" name="cheque" rules={[{ required: true, message: 'Please input your details!' }]}>
      <Upload name="logo" action="/upload.do" listType="picture">
          <Button icon={<UploadOutlined />}>Click to upload</Button>
        </Upload>
      </Form.Item>
    </Form>
    </Modal>
  );
}

export default VendorModal;
